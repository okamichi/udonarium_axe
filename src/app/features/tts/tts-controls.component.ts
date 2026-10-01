import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TtsCoordinatorService } from '@axe/application/tts/tts-coordinator.service';
import { ChatTabList } from '@axe/domain/chat/chat-tab-list';
@Component({
  selector: 'tts-controls',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full overflow-y-auto' },
  template: ` <details open class="border-ui-border-panel border-b p-2 text-xs">
    <summary>キャラクター読み上げ {{ tts.session() ? '接続中' : '担当未選択' }}</summary>
    <p>
      セリフ内の （怒り）・（喜び）・（囁き） や （演技：強い怒りをこめて） は音声の演技に変換します。絵文字 😠 😆 👂
      も直接使えます。
    </p>
    <div class="flex flex-wrap items-center gap-2 py-2">
      <label
        ><input type="checkbox" [ngModel]="tts.playback.enabled()" (ngModelChange)="enable($event)" />
        この端末で読み上げ</label
      >
      <button type="button" (click)="tts.playback.resume()">音声を開始／再開</button>
      <label
        >音量
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          [ngModel]="tts.playback.volume()"
          (ngModelChange)="tts.playback.setVolume($event)"
      /></label>
      <span>SE音量との積 / 待機 {{ tts.playback.queued() }} 件</span>
      <button type="button" (click)="tts.playback.skip()">今のセリフをスキップ</button>
      <button type="button" (click)="tts.clearLocal()">この端末の待機を破棄</button>
    </div>
    <details>
      <summary>生成担当・接続設定（対応端末のみ）</summary>
      <p>生成担当は1台指定してください。ほかの端末は担当の通知を受けて選択します。</p>
      <label class="block"
        >Bridge URL
        <input
          type="url"
          autocomplete="off"
          placeholder="https://tts.example.com/api/tts/"
          [(ngModel)]="tts.api.bridgeUrl"
          [disabled]="busy() || tts.isHost()"
      /></label>
      <p>空欄は同じサイトのBridgeへ接続します。外部接続はHTTPS。変更するときは担当接続を解除してください。</p>
      <label>Bridge認証トークン <input type="password" autocomplete="off" [(ngModel)]="tts.api.token" /></label>
      <label
        >読み上げタブ
        <select [(ngModel)]="tabId">
          @for (tab of tabs.chatTabs; track tab.identifier) {
            @if (tab.plCanView && tab.guestCanView && !tab.isSystemTab) {
              <option [value]="tab.identifier">{{ tab.name }}</option>
            }
          }
        </select></label
      >
      <button type="button" [disabled]="busy()" (click)="start()">この端末を担当にする（接続・発声確認）</button>
      <button type="button" (click)="tts.discover()">担当を探す</button>
      @for (offer of tts.offers(); track offer.peerId) {
        <button type="button" (click)="tts.selectHost(offer.peerId)">担当 {{ offer.peerId }} を使う</button>
      }
      @if (tts.session(); as session) {
        <p>担当: {{ session.peerId }}</p>
      }
      <button type="button" (click)="tts.stopHost()">担当接続を解除</button>
      @if (tts.isHost()) {
        <button type="button" (click)="tts.clearRoom()">部屋の生成・再生待機を破棄</button>
      }
    </details>
    <p role="status">{{ tts.error() }}</p>
  </details>`,
})
export class TtsControlsComponent {
  readonly tts = inject(TtsCoordinatorService);
  readonly tabs = inject(ChatTabList);
  readonly busy = signal(false);
  tabId = this.tabs.chatTabs[0]?.identifier ?? '';
  async start(): Promise<void> {
    this.busy.set(true);
    try {
      await this.tts.startHost([this.tabId]);
    } finally {
      this.busy.set(false);
    }
  }
  enable(value: boolean): void {
    this.tts.clearLocal();
    this.tts.playback.enable(value);
    if (value && this.tts.session() && !this.tts.isHost()) this.tts.selectHost(this.tts.session()!.peerId);
  }
}
