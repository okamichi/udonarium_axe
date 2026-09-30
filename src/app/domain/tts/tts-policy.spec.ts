import { GameCharacter } from '@axe/domain/character/game-character';
import { ChatTab } from '@axe/domain/chat/chat-tab';
import { eligibleMessage, ttsText } from '@axe/domain/tts/tts-policy';
import { DEFAULT_TTS_VOICE, readVoice, validVoice } from '@axe/domain/tts/tts-types';
describe('TTS公開範囲と声設定', () => {
  function setup() {
    const character = new GameCharacter('tts-character');
    character.ttsVoice = JSON.stringify({ ...DEFAULT_TTS_VOICE, enabled: true });
    const tab = new ChatTab('tts-tab');
    tab.initialize();
    const message = tab.addMessage({
      sendFrom: character.identifier,
      text: 'こんにちは。',
      from: 'user',
      ttsSpeech: true,
    });
    return { character, tab, message };
  }
  it('PCの公開セリフだけを許可', () => {
    const { character, tab, message } = setup();
    expect(eligibleMessage(message, character, tab, [tab.identifier])).toBe('こんにちは。');
    expect(eligibleMessage(message, character, tab, [])).toBeNull();
    tab.guestCanView = false;
    expect(eligibleMessage(message, character, tab, [tab.identifier])).toBeNull();
    tab.guestCanView = true;
    tab.plCanView = false;
    expect(eligibleMessage(message, character, tab, [tab.identifier])).toBeNull();
  });
  it('秘話・秘密・システム・ダイス結果は共有しない', () => {
    const { character, tab, message } = setup();
    for (const tag of ['secret', 'system', 'system-message', 'DiceBot secret']) {
      message.tag = tag;
      expect(eligibleMessage(message, character, tab, [tab.identifier])).toBeNull();
    }
    message.tag = 'DiceBot'; // 普通のセリフにもゲームシステムIDが付く
    expect(eligibleMessage(message, character, tab, [tab.identifier])).toBe('こんにちは。');
    message.to = 'other-user';
    expect(eligibleMessage(message, character, tab, [tab.identifier])).toBeNull();
  });
  it('XMLから復元された発言種別を認識する', () => {
    const { character, tab, message } = setup();
    message.ttsSpeech = 'true';
    expect(eligibleMessage(message, character, tab, [tab.identifier])).toBe('こんにちは。');
  });
  it('URLだけ・長文を除外し本文を切り詰めない', () => {
    expect(ttsText('<b>こんにちは</b> https://example.com')).toBe('こんにちは');
    const { character, tab, message } = setup();
    message.text = 'https://example.com';
    expect(eligibleMessage(message, character, tab, [tab.identifier])).toBeNull();
    message.text = 'あ'.repeat(301);
    expect(eligibleMessage(message, character, tab, [tab.identifier])).toBeNull();
  });
  it('固定シードの精度を保存し、古いキャラは既定で無効', () => {
    expect(readVoice().enabled).toBe(false);
    expect(readVoice(JSON.stringify(DEFAULT_TTS_VOICE)).seed).toBe('1520596899881326291');
    expect(validVoice({ ...DEFAULT_TTS_VOICE, seed: Number('1520596899881326291') })).toBe(false);
    expect(validVoice({ ...DEFAULT_TTS_VOICE, seed: '9223372036854775808' })).toBe(false);
  });
  it('古い声設定を維持し、CFGの未指定・ゼロを許可して不正値は拒否', () => {
    expect(readVoice(JSON.stringify({ ...DEFAULT_TTS_VOICE, enabled: true })).enabled).toBe(true);
    expect(validVoice({ ...DEFAULT_TTS_VOICE, cfgScaleCaption: 0, cfgScaleSpeaker: 5 })).toBe(true);
    for (const key of ['cfgScaleText', 'cfgScaleCaption', 'cfgScaleSpeaker'])
      for (const value of [-1, 11, '3', null, NaN])
        expect(validVoice({ ...DEFAULT_TTS_VOICE, [key]: value })).toBe(false);
  });
});
