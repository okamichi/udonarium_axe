import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { ObjectChangeService } from '@axe/application/sync/object-change.service';
import { TtsCoordinatorService } from '@axe/application/tts/tts-coordinator.service';
import { AudioStorage } from '@axe/core/storage/audio-storage';
import { ChatMessage } from '@axe/domain/chat/chat-message';
import { readAttachment, ttsStatusLabel } from '@axe/domain/tts/tts-types';
@Component({
  selector: 'tts-message-audio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@if (!message().isDirect && !message().isSecret) {
    @if (attachment() || tts.playback.statuses()[message().identifier]) {
      <span class="text-ui-muted px-2 text-xs">音声: {{ statusLabel() }}</span>
      @if (attachment()) {
        <button type="button" class="text-xs" (click)="tts.replay(message())">この端末で再生</button>
      }
    }
  }`,
})
export class TtsMessageAudioComponent {
  private readonly audioVersion = signal(0);
  readonly message = input.required<ChatMessage>();
  readonly tts = inject(TtsCoordinatorService);
  private readonly changes = inject(ObjectChangeService);
  readonly attachment = computed(() => {
    this.changes.versionOf(this.message().identifier)();
    return readAttachment(this.message().ttsAttachment);
  });
  constructor() {
    AudioStorage.instance.changes.subscribe((id) => {
      if (id === this.attachment()?.audioIdentifier) this.audioVersion.update((v) => v + 1);
    }, inject(DestroyRef));
  }
  statusLabel(): string {
    const state = this.tts.playback.statuses()[this.message().identifier];
    if (this.attachment() && !this.available() && (!state || state === 'ended' || state === 'available'))
      return '音声なし';
    return ttsStatusLabel(state ?? (this.available() ? 'available' : '音声なし'));
  }
  available(): boolean {
    this.audioVersion();
    return !!AudioStorage.instance.get(this.attachment()?.audioIdentifier ?? '')?.blob;
  }
}
