import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CHAT_TICKER_SELECTION_EVENT_NAME,
  ChatTickerSelectionService,
} from '@axe/application/chat/chat-ticker-selection.service';
import { ObjectChangeService } from '@axe/application/sync/object-change.service';
import { TabletopService } from '@axe/application/tabletop/tabletop.service';
import { emitMessageAdded } from '@axe/core/event/domain-events';
import { localDispatch } from '@axe/core/network/network-messaging';
import { ChatMessage } from '@axe/domain/chat/chat-message';
import { ChatTab } from '@axe/domain/chat/chat-tab';
import { ChatTabList } from '@axe/domain/chat/chat-tab-list';
import { TICKER_CHAT_TAB_IDENTIFIER } from '@axe/domain/chat/constants';
import { ChatTickerComponent } from '@axe/features/chat/chat-ticker/chat-ticker.component';
import { TEST_PROVIDERS } from '@axe/testing/test-providers';

describe('ChatTickerComponent', () => {
  let fixture: ComponentFixture<ChatTickerComponent>;
  let component: ChatTickerComponent;
  let tickerTab: ChatTab;
  const messages: ChatMessage[] = [];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ChatTickerComponent],
      providers: [...TEST_PROVIDERS],
    }).compileComponents();

    tickerTab = ChatTabList.instance.ensureTickerTab();
    fixture = TestBed.createComponent(ChatTickerComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    for (const message of messages.splice(0)) message.destroy();
    tickerTab.destroy();
  });

  function post(identifier: string, text: string): void {
    const message = new ChatMessage(identifier);
    message.initialize();
    message.name = '案内役';
    message.text = text;
    messages.push(message);
    emitMessageAdded({ tabIdentifier: TICKER_CHAT_TAB_IDENTIFIER, messageIdentifier: message.identifier });
  }

  function select(identifier: string, name: string, text: string): ChatMessage {
    const message = new ChatMessage(identifier);
    message.initialize();
    message.name = name;
    message.text = text;
    messages.push(message);
    localDispatch(CHAT_TICKER_SELECTION_EVENT_NAME, { messageIdentifier: message.identifier });
    return message;
  }

  function currentText(): string {
    const internal = component as unknown as { currentText: () => string };
    return internal.currentText();
  }

  it('replaces the ticker immediately on every consecutive post', () => {
    post('ticker-first', '最初の案内');
    expect(currentText()).toBe('案内役：最初の案内　◆');

    post('ticker-second', '次の案内');
    expect(currentText()).toBe('案内役：次の案内　◆');
  });

  it('temporarily replaces the ticker with any selected public message', () => {
    // Instantiates the listener before dispatching the room event.
    expect(TestBed.inject(ChatTickerSelectionService)).toBeTruthy();

    select('manual-first', '騎士', '北門を守る');
    expect(currentText()).toBe('騎士：北門を守る　◆');

    const internal = component as unknown as { cycleStartedAt: number | null };
    internal.cycleStartedAt = 123;
    select('manual-second', '魔術師', '詠唱を開始');
    expect(currentText()).toBe('魔術師：詠唱を開始　◆');
    expect(internal.cycleStartedAt).toBeNull();
  });

  it('lets the next ticker-tab post take over a manually selected message', () => {
    select('manual-before-post', '斥候', '橋を確認中');
    expect(currentText()).toContain('橋を確認中');

    post('ticker-after-manual', 'ラウンド開始');
    expect(currentText()).toBe('案内役：ラウンド開始　◆');
  });

  it('keeps using the ticker tab visibility and speed settings for a manual selection', () => {
    const table = TestBed.inject(TabletopService).currentTable;
    const objectChange = TestBed.inject(ObjectChangeService);
    table.mode2d = true;
    table.multiAngleTickerEnabled = false;
    table.multiAngleTickerPixelsPerSecond = 88;

    select('manual-while-hidden', 'GM', '待機してください');
    expect(currentText()).toBe('GM：待機してください　◆');
    expect(component.isVisible()).toBe(false);

    table.multiAngleTickerEnabled = true;
    objectChange.notifyChanged(table.identifier);

    expect(component.isVisible()).toBe(true);
    const internal = component as unknown as { pixelsPerSecond: () => number };
    expect(internal.pixelsPerSecond()).toBe(88);
  });
});
