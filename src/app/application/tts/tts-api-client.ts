import { Injectable } from '@angular/core';
import { TTS_MAX_BYTES, TtsVoiceSettings } from '@axe/domain/tts/tts-types';
@Injectable({ providedIn: 'root' })
export class TtsApiClient {
  // Deliberately memory-only: never stored in room data or localStorage.
  token = '';
  // Like the token, this is local to this browser session, never shared with peers.
  bridgeUrl = '';
  private endpoint(path: string): string {
    if (!this.bridgeUrl.trim()) return `/api/tts/${path}`;
    let url: URL;
    try {
      url = new URL(this.bridgeUrl.trim());
    } catch {
      throw new Error('Bridge URLは https:// から始まるURLを指定してください');
    }
    const localHttp =
      url.protocol === 'http:' &&
      location.protocol === 'http:' &&
      ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
    if ((!localHttp && url.protocol !== 'https:') || url.username || url.password || url.search || url.hash)
      throw new Error('Bridge URLはHTTPSを使用し、認証情報・クエリ・フラグメントを含めないでください');
    const basePath = url.pathname === '/' ? '/api/tts/' : `${url.pathname.replace(/\/+$/, '')}/`;
    url.pathname = basePath + path;
    return url.href;
  }
  async request(path: string, init: RequestInit = {}): Promise<Response> {
    const headers = new Headers(init.headers);
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${this.token}`);
    const response = await fetch(this.endpoint(path), {
      ...init,
      headers,
      credentials: 'omit',
      redirect: 'error',
      signal: init.signal ?? AbortSignal.timeout(65000),
    });
    if (!response.ok) {
      let error = `Bridge HTTP ${response.status}`;
      try {
        error = (await response.json()).error ?? error;
      } catch {
        /* non-JSON proxy response */
      }
      throw new Error(error);
    }
    return response;
  }
  async synthesize(
    requestId: string,
    text: string,
    voice: TtsVoiceSettings,
    signal: AbortSignal,
    useProfileDefaults = false
  ) {
    const response = await this.request('synthesize', {
      method: 'POST',
      signal,
      body: JSON.stringify({
        requestId,
        text,
        profileId: voice.profileId,
        styleId: voice.styleId,
        settings: useProfileDefaults
          ? undefined
          : {
              caption: voice.caption,
              seed: voice.seed,
              steps: voice.steps,
              speed: voice.speed,
              voiceId: voice.voiceId,
              cfgScaleText: voice.cfgScaleText,
              cfgScaleCaption: voice.cfgScaleCaption,
              cfgScaleSpeaker: voice.cfgScaleSpeaker,
            },
      }),
    });
    if (!response.headers.get('content-type')?.startsWith('audio/wav')) throw new Error('WAV以外の応答です');
    const durationMs = Number(response.headers.get('X-TTS-Duration-Ms'));
    if (!Number.isFinite(durationMs) || durationMs <= 0 || durationMs > 60000) throw new Error('音声の長さが不正です');
    const blob = await response.blob();
    if (!blob.size || blob.size > TTS_MAX_BYTES) throw new Error('音声のサイズが不正です');
    const head = new TextDecoder().decode(await blob.slice(0, 12).arrayBuffer());
    if (!head.startsWith('RIFF') || head.slice(8) !== 'WAVE') throw new Error('音声が破損しています');
    return { blob, durationMs, revision: response.headers.get('X-TTS-Profile-Revision') ?? '1' };
  }
  async registerVoice(blob: Blob): Promise<string> {
    const response = await this.request('voices', {
      method: 'POST',
      headers: { 'Content-Type': 'audio/wav' },
      body: blob,
      signal: AbortSignal.timeout(65000),
    });
    const data = await response.json();
    if (typeof data.id !== 'string' || !/^[\w-]{1,100}$/.test(data.id)) throw new Error('参照音声IDが不正です');
    return data.id;
  }
}
