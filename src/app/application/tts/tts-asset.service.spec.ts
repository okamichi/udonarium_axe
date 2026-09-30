import { TestBed } from '@angular/core/testing';
import { TtsAssetService } from '@axe/application/tts/tts-asset.service';
import { AudioSharingSystem } from '@axe/core/storage/audio-sharing-system';
import { AudioStorage } from '@axe/core/storage/audio-storage';
import { Playlist } from '@axe/domain/media/playlist';
import { vi } from 'vitest';
describe('TTS容量制限', () => {
  let assets: TtsAssetService;
  const storage = AudioStorage.instance;
  const ids: string[] = [];
  beforeEach(() => {
    assets = TestBed.inject(TtsAssetService);
  });
  afterEach(() => {
    for (const id of ids.splice(0)) {
      storage.delete(id);
      AudioSharingSystem.instance.excludedTts.delete(id);
    }
    vi.restoreAllMocks();
  });
  function add(id: string, tts = true) {
    ids.push(id);
    storage.add({
      identifier: id,
      ...(tts ? { category: 'tts' as const } : {}),
      name: tts ? `tts-${id}.wav` : 'BGM.wav',
      type: 'audio/wav',
      blob: new Blob(['wave']),
      url: '',
    });
  }
  it('200件超過で未使用TTSだけを破棄し、pinと通常音声を保持', () => {
    add('ordinary-audio', false);
    add('pinned-audio');
    const release = assets.pin('pinned-audio');
    for (let i = 0; i < 200; i++) add(`asset-${i}`);
    expect(storage.get('ordinary-audio')?.blob).toBeTruthy();
    expect(storage.get('pinned-audio')?.blob).toBeTruthy();
    expect(storage.get('asset-0')).toBeNull();
    expect(AudioSharingSystem.instance.excludedTts.has('asset-0')).toBe(true);
    release();
  });
  it('tts-で始まる名前の通常アップロードは削除対象にしない', () => {
    ids.push('ordinary-prefix');
    storage.add({
      identifier: 'ordinary-prefix',
      name: 'tts-user-recording.wav',
      type: 'audio/wav',
      blob: new Blob(['wave']),
      url: '',
    });
    for (let i = 0; i < 201; i++) add(`category-${i}`);
    expect(storage.get('ordinary-prefix')?.blob).toBeTruthy();
    expect(storage.get('ordinary-prefix')?.isTts).toBe(false);
  });
  it('BGM参照中・転送中のTTSを容量回収で削除しない', () => {
    const playlist = new Playlist();
    playlist.initialize();
    playlist.entries = ['playlist-audio'];
    add('playlist-audio');
    add('transferring-audio');
    vi.spyOn(AudioSharingSystem.instance, 'isTransferring').mockImplementation((id) => id === 'transferring-audio');
    for (let i = 0; i < 200; i++) add(`transfer-asset-${i}`);
    expect(storage.get('playlist-audio')?.blob).toBeTruthy();
    expect(storage.get('transferring-audio')?.blob).toBeTruthy();
    expect(assets.reserve(129 * 1024 * 1024)).toBe(false);
    expect(storage.get('playlist-audio')?.blob).toBeTruthy();
    expect(storage.get('transferring-audio')?.blob).toBeTruthy();
  });
});
