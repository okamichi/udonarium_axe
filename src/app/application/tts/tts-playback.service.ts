import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { TtsAssetService } from '@axe/application/tts/tts-asset.service';
import { AudioFile } from '@axe/core/storage/audio-file';
import { AudioPlayer, VolumeType } from '@axe/core/storage/audio-player';
import { AudioStorage } from '@axe/core/storage/audio-storage';
import { TtsJob, TtsStatus } from '@axe/domain/tts/tts-types';

export function waitForAudio(id: string, signal: AbortSignal, timeout = 15000): Promise<AudioFile> {
  return new Promise((resolve, reject) => {
    const storage = AudioStorage.instance;
    let remove = () => {};
    const finish = (error?: Error, audio?: AudioFile) => {
      remove();
      clearTimeout(timer);
      signal.removeEventListener('abort', abort);
      if (error) reject(error);
      else resolve(audio!);
    };
    const check = () => {
      const audio = storage.get(id);
      if (audio?.blob) finish(undefined, audio);
    };
    const abort = () => finish(new Error('cancelled'));
    const timer = setTimeout(() => finish(new Error('expired')), timeout);
    remove = storage.changes.subscribe(check);
    signal.addEventListener('abort', abort, { once: true });
    if (signal.aborted) abort();
    else check();
  });
}
@Injectable({ providedIn: 'root' })
export class TtsPlaybackService {
  private readonly assets = inject(TtsAssetService);
  readonly enabled = signal(false);
  readonly volume = signal(1);
  readonly statuses = signal<Record<string, TtsStatus>>({});
  readonly queued = signal(0);
  private readonly player = new AudioPlayer();
  private queue: { job: TtsJob; validate: () => Promise<boolean>; release: () => void }[] = [];
  private current: (typeof this.queue)[number] | null = null;
  private controller: AbortController | null = null;
  private generation = 0;
  constructor() {
    this.player.volumeType = VolumeType.SE;
    inject(DestroyRef).onDestroy(() => this.clear());
  }
  status(id: string, value: TtsStatus) {
    this.statuses.update((s) => {
      const next = { ...s, [id]: value };
      const keys = Object.keys(next);
      if (keys.length > 500) delete next[keys[0]];
      return next;
    });
  }
  enable(value: boolean): void {
    this.enabled.set(value);
    if (!value) this.clear();
    else {
      void AudioPlayer.audioContext.resume();
      this.resume();
    }
  }
  setVolume(value: number) {
    const v = Math.max(0, Math.min(1, value));
    this.volume.set(v);
    this.player.volume = v;
  }
  enqueue(job: TtsJob, validate: () => Promise<boolean>, manual = false) {
    if ((!manual && !this.enabled()) || !job.attachment || this.queue.length >= 20) return;
    this.queue.push({ job, validate, release: this.assets.pin(job.attachment.audioIdentifier) });
    this.queued.set(this.queue.length);
    void this.next();
  }
  skip(): void {
    this.generation++;
    this.controller?.abort();
    this.controller = null;
    this.player.stop();
    this.player.onEnded = null;
    this.player.onError = null;
    if (this.current) {
      this.status(this.current.job.messageId, 'cancelled');
      this.current.release();
    }
    this.current = null;
    void this.next();
  }
  clear(): void {
    for (const item of this.queue) {
      this.status(item.job.messageId, 'cancelled');
      item.release();
    }
    this.queue = [];
    this.queued.set(0);
    this.skip();
  }
  async revalidate(): Promise<void> {
    const item = this.current;
    if (item && !(await item.validate()) && this.current === item) this.skip();
  }
  resume(): void {
    void AudioPlayer.audioContext.resume();
    if (this.current && this.statuses()[this.current.job.messageId] === '操作待ち') {
      const item = this.current;
      if (item.job.expiresAt < Date.now()) {
        this.skip();
        return;
      }
      void item.validate().then((valid) => {
        if (this.current !== item) return;
        if (valid) this.player.play();
        else this.skip();
      });
    } else void this.next();
  }
  private async next(): Promise<void> {
    if (this.current || !this.queue.length) return;
    const item = (this.current = this.queue.shift()!);
    this.queued.set(this.queue.length);
    const generation = ++this.generation;
    const controller = (this.controller = new AbortController());
    const finish = (status: TtsStatus) => {
      if (generation !== this.generation) return;
      this.generation++;
      controller.abort();
      this.player.onEnded = null;
      this.player.onError = null;
      this.player.onStarted = null;
      this.player.stop();
      this.status(item.job.messageId, status);
      item.release();
      this.current = null;
      void this.next();
    };
    const expiry = setTimeout(
      () => {
        if (generation === this.generation) {
          controller.abort();
          finish('expired');
        }
      },
      Math.max(0, item.job.expiresAt - Date.now())
    );
    controller.signal.addEventListener('abort', () => clearTimeout(expiry), { once: true });
    this.player.onEnded = () => {
      clearTimeout(expiry);
      finish('ended');
    };
    this.player.onStarted = () => {
      if (generation === this.generation) this.status(item.job.messageId, 'playing');
    };
    this.player.onError = (error) => {
      if (generation !== this.generation) return;
      if ((error as { name?: string })?.name === 'NotAllowedError') this.status(item.job.messageId, '操作待ち');
      else {
        clearTimeout(expiry);
        finish('failed');
      }
    };
    try {
      if (Date.now() >= item.job.expiresAt || !(await item.validate())) {
        clearTimeout(expiry);
        finish('expired');
        return;
      }
      if (generation !== this.generation) return;
      this.status(item.job.messageId, 'waitingAsset');
      const audio = await waitForAudio(item.job.attachment!.audioIdentifier, controller.signal);
      if (generation !== this.generation) return;
      if (!(await item.validate())) {
        clearTimeout(expiry);
        finish('cancelled');
        return;
      }
      if (generation !== this.generation) return;
      this.player.volume = this.volume();
      this.player.play(audio);
    } catch {
      clearTimeout(expiry);
      finish('expired');
    }
  }
}
