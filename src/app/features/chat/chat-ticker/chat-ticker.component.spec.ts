import { ComponentFixture, TestBed } from '@angular/core/testing';
import { emitMessageAdded } from '@axe/core/event/domain-events';
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
});
