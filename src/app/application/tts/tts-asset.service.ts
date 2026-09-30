import { DestroyRef, inject, Injectable } from '@angular/core';
import { AudioPlayer } from '@axe/core/storage/audio-player';
import { AudioSharingSystem } from '@axe/core/storage/audio-sharing-system';
import { AudioStorage } from '@axe/core/storage/audio-storage';
import { ObjectStore } from '@axe/core/sync/object-store';
import { CutIn } from '@axe/domain/media/cut-in';
import { Jukebox } from '@axe/domain/media/jukebox';
import { Playlist } from '@axe/domain/media/playlist';
import { TTS_MAX_BYTES } from '@axe/domain/tts/tts-types';
@Injectable({ providedIn: 'root' })
export class TtsAssetService {
  private readonly entries = new Map<string, { used: number; pins: number }>();
  private readonly storage = AudioStorage.instance;
  constructor() {
    this.storage.changes.subscribe((id) => {
      const audio = this.storage.get(id);
      if (!audio?.isTts) return;
      if (audio.blob && audio.blob.size > TTS_MAX_BYTES) {
        this.remove(id);
        return;
      }
      if (!this.entries.has(id)) this.entries.set(id, { used: Date.now(), pins: 0 });
      this.trim();
    }, inject(DestroyRef));
  }
  pin(id: string): () => void {
    const entry = this.entries.get(id) ?? { used: Date.now(), pins: 0 };
    entry.pins++;
    entry.used = Date.now();
    this.entries.set(id, entry);
    AudioSharingSystem.instance.ttsPreferred.add(id);
    return () => {
      entry.pins--;
      entry.used = Date.now();
      if (!entry.pins) AudioSharingSystem.instance.ttsPreferred.delete(id);
      this.trim();
    };
  }
  reserve(bytes: number): boolean {
    return this.trim(bytes, 1);
  }
  private trim(extraBytes = 0, extraCount = 0): boolean {
    const usage = () => [...this.entries.keys()].reduce((n, id) => n + (this.storage.get(id)?.blob?.size ?? 0), 0);
    for (const [id, entry] of [...this.entries].sort((a, b) => a[1].used - b[1].used)) {
      if (usage() + extraBytes <= 128 * 1024 * 1024 && this.entries.size + extraCount <= 200) return true;
      if (!entry.pins && !AudioSharingSystem.instance.isTransferring(id) && !this.inUseElsewhere(id)) this.remove(id);
    }
    return usage() + extraBytes <= 128 * 1024 * 1024 && this.entries.size + extraCount <= 200;
  }
  private inUseElsewhere(id: string): boolean {
    const store = ObjectStore.instance;
    return (
      store.getObjects(Jukebox).some((j) => j.audioIdentifier === id) ||
      store.getObjects(Playlist).some((p) => p.entries.includes(id)) ||
      store.getObjects(CutIn).some((c) => c.audioIdentifier === id)
    );
  }
  private remove(id: string): void {
    // Files carrying this reserved category are session-only TTS assets.
    if (!this.storage.get(id)?.isTts) {
      this.entries.delete(id);
      return;
    }
    AudioSharingSystem.instance.excludedTts.add(id);
    this.entries.delete(id);
    this.storage.delete(id);
    AudioPlayer.removeCache(id);
  }
}
