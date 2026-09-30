import { TestBed } from '@angular/core/testing';
import { TtsAssetService } from '@axe/application/tts/tts-asset.service';
import { TtsPlaybackService, waitForAudio } from '@axe/application/tts/tts-playback.service';
import { AudioFile } from '@axe/core/storage/audio-file';
import { AudioPlayer } from '@axe/core/storage/audio-player';
import { AudioStorage } from '@axe/core/storage/audio-storage';
import { TtsJob } from '@axe/domain/tts/tts-types';
import { vi } from 'vitest';
describe('TTS音声待ち・停止', () => {
  afterEach(() => vi.restoreAllMocks());
  it('プレースホルダーでは完了せず実体到着を待つ', async () => {
    const store = AudioStorage.instance;
    const id = 'tts-test-arrival';
    store.add(AudioFile.createEmpty(id));
    const controller = new AbortController();
    let complete = false;
    const promise = waitForAudio(id, controller.signal).then(() => {
      complete = true;
    });
    await Promise.resolve();
    expect(complete).toBe(false);
    store.add({ identifier: id, name: 'tts-test.wav', blob: new Blob(['wave']), type: 'audio/wav', url: '' });
    await promise;
    expect(complete).toBe(true);
    store.delete(id);
  });
  it('中止と期限で購読を解除', async () => {
    const store = AudioStorage.instance,
      listeners = store.changes.listenerCount;
    const controller = new AbortController();
    const promise = waitForAudio('missing', controller.signal);
    controller.abort();
    await expect(promise).rejects.toThrow('cancelled');
    expect(store.changes.listenerCount).toBe(listeners);
    await expect(waitForAudio('missing', new AbortController().signal, 1)).rejects.toThrow('expired');
    expect(store.changes.listenerCount).toBe(listeners);
  });
  it('onEndedを待って次へ進み、手動再生も同じキューで重ならない', async () => {
    const played: string[] = [];
    let endPlayback: (() => void) | null = null;
    vi.spyOn(AudioPlayer.prototype, 'play').mockImplementation(function (this: AudioPlayer, audio) {
      endPlayback = this.onEnded;
      played.push(audio!.identifier);
      this.onStarted?.();
    });
    vi.spyOn(AudioPlayer.prototype, 'stop').mockImplementation(() => {});
    TestBed.configureTestingModule({ providers: [{ provide: TtsAssetService, useValue: { pin: () => () => {} } }] });
    const service = TestBed.inject(TtsPlaybackService);
    service.enabled.set(true);
    const make = (id: string, sequence: number): TtsJob => ({
      protocolVersion: 1,
      epoch: 'test',
      sequence,
      requestId: id,
      messageId: id,
      textHash: 'a'.repeat(64),
      expiresAt: Date.now() + 90000,
      attachment: {
        version: 1,
        audioIdentifier: id,
        textHash: 'a'.repeat(64),
        profileId: 'melissa',
        profileRevision: '1',
        mimeType: 'audio/wav',
        durationMs: 1000,
      },
    });
    for (const id of ['first-audio', 'second-audio'])
      AudioStorage.instance.add({
        identifier: id,
        name: 'tts-test.wav',
        blob: new Blob(['wave']),
        type: 'audio/wav',
        url: '',
      });
    service.enqueue(make('first-audio', 1), async () => true);
    service.enqueue(make('second-audio', 2), async () => true, true);
    await new Promise((resolve) => setTimeout(resolve, 1));
    expect(played).toEqual(['first-audio']);
    (endPlayback as (() => void) | null)?.();
    await new Promise((resolve) => setTimeout(resolve, 1));
    expect(played).toEqual(['first-audio', 'second-audio']);
    (endPlayback as (() => void) | null)?.();
    expect(service.statuses()['second-audio']).toBe('ended');
    service.clear();
    for (const id of ['first-audio', 'second-audio']) AudioStorage.instance.delete(id);
  });
  it('停止直後の到着で再生を再開しない。BGMの停止は呼ばない', async () => {
    const release = vi.fn();
    const play = vi.spyOn(AudioPlayer.prototype, 'play').mockImplementation(() => {});
    vi.spyOn(AudioPlayer.prototype, 'stop').mockImplementation(() => {});
    const stopAll = vi.spyOn(AudioPlayer, 'stopAllSE');
    TestBed.configureTestingModule({ providers: [{ provide: TtsAssetService, useValue: { pin: () => release } }] });
    const service = TestBed.inject(TtsPlaybackService);
    const job: TtsJob = {
      protocolVersion: 1,
      epoch: 'test',
      sequence: 1,
      requestId: 'test',
      messageId: 'msg',
      textHash: 'a'.repeat(64),
      expiresAt: Date.now() + 90000,
      attachment: {
        version: 1,
        audioIdentifier: 'pending-audio',
        textHash: 'a'.repeat(64),
        profileId: 'melissa',
        profileRevision: '1',
        mimeType: 'audio/wav',
        durationMs: 1000,
      },
    };
    service.enabled.set(true);
    service.enqueue(job, async () => true);
    await Promise.resolve();
    service.clear();
    AudioStorage.instance.add({
      identifier: 'pending-audio',
      name: 'tts-test.wav',
      blob: new Blob(['wave']),
      type: 'audio/wav',
      url: '',
    });
    await new Promise((resolve) => setTimeout(resolve, 1));
    expect(play).not.toHaveBeenCalled();
    expect(stopAll).not.toHaveBeenCalled();
    expect(release).toHaveBeenCalledOnce();
    AudioStorage.instance.delete('pending-audio');
  });
});
