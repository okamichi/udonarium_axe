import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RolePermissionService } from '@axe/application/permission/role-permission.service';
import { ObjectChangeService } from '@axe/application/sync/object-change.service';
import { TtsCoordinatorService } from '@axe/application/tts/tts-coordinator.service';
import { AudioFile } from '@axe/core/storage/audio-file';
import { AudioPlayer, VolumeType } from '@axe/core/storage/audio-player';
import { GameCharacter } from '@axe/domain/character/game-character';
import { readVoice, TtsVoiceSettings, validVoice } from '@axe/domain/tts/tts-types';
@Component({
  selector: 'tts-character-settings',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <fieldset
    class="bg-ui-elevated border-ui-border-panel m-0 flex min-w-0 flex-col gap-1.5 rounded-sm border border-solid px-3 py-2.5 [&_label]:text-[0.82em]"
    [disabled]="!permission.canEditTabletop"
  >
    <legend class="sr-only">TTS設定</legend>
    <div
      class="border-ui-border-panel text-ui-accent mt-0 mb-2 flex items-center gap-1.25 border-b border-solid pb-1.25 text-[0.72em] font-semibold tracking-[0.06em] uppercase [&_.material-icons]:text-[14px]!"
      aria-hidden="true"
    >
      <i class="material-icons">record_voice_over</i>TTS設定
    </div>
    <label
      ><input type="checkbox" [ngModel]="voice().enabled" (ngModelChange)="update('enabled', $event)" />
      公開セリフを読み上げる</label
    >
    @if (voice().enabled) {
      <label
        >プロファイルID <input [ngModel]="voice().profileId" (change)="update('profileId', value($event))"
      /></label>
      <label>スタイルID <input [ngModel]="voice().styleId" (change)="update('styleId', value($event))" /></label>
      <label
        >声色・話し方
        <textarea
          class="w-full"
          rows="3"
          maxlength="1000"
          [ngModel]="voice().caption"
          (ngModelChange)="update('caption', $event)"
        ></textarea>
      </label>
      <label
        >固定シード
        <input type="text" inputmode="numeric" [ngModel]="voice().seed" (change)="update('seed', value($event))"
      /></label>
      <label
        >生成ステップ（1～100）
        <input type="number" min="1" max="100" [ngModel]="voice().steps" (change)="update('steps', +value($event))"
      /></label>
      <label
        >速度（0.5～2）
        <input
          type="number"
          min="0.5"
          max="2"
          step="0.1"
          [ngModel]="voice().speed"
          (change)="update('speed', +value($event))"
      /></label>
      <details>
        <summary>指示の強度（CFG・空欄はサーバ既定値）</summary>
        @for (field of guidanceFields; track field.key) {
          <label class="block">
            {{ field.label }}
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              [placeholder]="field.placeholder"
              [ngModel]="voice()[field.key]"
              (change)="update(field.key, value($event).trim() === '' ? undefined : +value($event))"
            />
          </label>
        }
        <p class="text-xs">大きいほど指示を強めます。参照音声の強度は、登録済み音声を使う場合だけ有効です。</p>
      </details>
      <label>参照音声ID <input [ngModel]="voice().voiceId ?? ''" (change)="update('voiceId', value($event))" /></label>
      <p class="text-xs">
        同じキャラの声を保つには参照音声を固定してください。声色の説明とシードだけでは、セリフによって声が変わります。参照音声IDは生成担当のTTSサーバで共通して使います。
      </p>
      <label>試聴文 <input [(ngModel)]="testText" maxlength="300" /></label>
      <div>
        <button type="button" (click)="preview()" [disabled]="busy()">この端末で試聴</button>
        <button type="button" (click)="stop()">試聴を停止</button>
        <button type="button" (click)="fixVoice()" [disabled]="busy() || !previewBlob()">
          この試聴をキャラの声として固定
        </button>
      </div>
    }
    <p role="status">{{ error() }}</p>
  </fieldset>`,
})
export class TtsCharacterSettingsComponent {
  readonly guidanceFields = [
    { key: 'cfgScaleText', label: '本文の強度', placeholder: '通常 3.0' },
    { key: 'cfgScaleCaption', label: '声色・演技指示の強度', placeholder: '通常 3.0' },
    { key: 'cfgScaleSpeaker', label: '参照音声の強度', placeholder: '通常 5.0' },
  ] as const;
  readonly character = input.required<GameCharacter>();
  readonly permission = inject(RolePermissionService);
  private readonly changes = inject(ObjectChangeService);
  private readonly tts = inject(TtsCoordinatorService);
  readonly busy = signal(false);
  readonly error = signal('');
  readonly previewBlob = signal<Blob | null>(null);
  readonly voice = computed(() => {
    this.changes.versionOf(this.character().identifier)();
    return readVoice(this.character().ttsVoice);
  });
  testText = 'こんにちは。よろしくお願いします。';
  private player: AudioPlayer | null = null;
  private controller: AbortController | null = null;
  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }
  value(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  update<K extends keyof TtsVoiceSettings>(key: K, value: TtsVoiceSettings[K]): void {
    if (!this.permission.canEditTabletop) return;
    const voice = { ...readVoice(this.character().ttsVoice), [key]: value };
    if (!validVoice(voice)) {
      this.error.set('声設定の値・範囲を確認してください');
      return;
    }
    this.error.set('');
    this.character().ttsVoice = JSON.stringify(voice);
    this.changes.notifyChanged(this.character().identifier);
    this.previewBlob.set(null);
  }
  async fixVoice(): Promise<void> {
    const blob = this.previewBlob();
    if (!blob || this.busy() || !this.permission.canEditTabletop) return;
    this.busy.set(true);
    this.error.set('');
    const character = this.character();
    const settings = character.ttsVoice;
    try {
      const id = await this.tts.api.registerVoice(blob);
      if (this.character() !== character || character.ttsVoice !== settings) {
        this.error.set('設定が変更されました。新しい設定で試聴してから固定してください。');
        return;
      }
      this.update('voiceId', id);
      this.error.set('参照音声を固定しました。次のセリフからこの声を使います。');
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : '参照音声の登録失敗');
    } finally {
      this.busy.set(false);
    }
  }
  stop(): void {
    this.controller?.abort();
    this.controller = null;
    this.player?.stop();
    this.player?.audio?.destroy();
    this.player = null;
  }
  async preview(): Promise<void> {
    this.stop();
    this.error.set('');
    this.busy.set(true);
    this.previewBlob.set(null);
    void AudioPlayer.audioContext.resume();
    const controller = (this.controller = new AbortController());
    const settings = this.character().ttsVoice;
    try {
      const result = await this.tts.api.synthesize(
        crypto.randomUUID(),
        this.testText,
        readVoice(settings),
        AbortSignal.any([controller.signal, AbortSignal.timeout(65000)])
      );
      if (controller.signal.aborted) return;
      if (this.character().ttsVoice === settings) this.previewBlob.set(result.blob);
      const audio = await AudioFile.createAsync(new File([result.blob], 'preview.wav', { type: 'audio/wav' }));
      if (controller.signal.aborted) {
        audio.destroy();
        return;
      }
      this.player = new AudioPlayer(audio);
      this.player.volumeType = VolumeType.SE;
      this.player.onError = () => this.error.set('音声を開始できません。再度試聴してください。');
      this.player.onEnded = () => this.stop();
      this.player.play();
    } catch (error) {
      if (!controller.signal.aborted) this.error.set(error instanceof Error ? error.message : '生成失敗');
    } finally {
      this.busy.set(false);
    }
  }
}
