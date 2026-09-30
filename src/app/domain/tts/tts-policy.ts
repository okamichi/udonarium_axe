import { GameCharacter } from '@axe/domain/character/game-character';
import { ChatMessage } from '@axe/domain/chat/chat-message';
import { ChatTab } from '@axe/domain/chat/chat-tab';
import { readVoice } from '@axe/domain/tts/tts-types';

export function ttsText(text: string): string {
  return text
    .replace(/<\/?[a-z][^>]*>/gi, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
export function eligibleMessage(
  message: ChatMessage,
  character: GameCharacter | null,
  tab: ChatTab | null,
  tabIds: readonly string[],
  requireEnabled = true
): string | null {
  if (
    !(character instanceof GameCharacter) ||
    !(tab instanceof ChatTab) ||
    !message.parent ||
    (message.ttsSpeech !== true && message.ttsSpeech !== 'true') ||
    !tabIds.includes(tab.identifier) ||
    tab.isSystemTab ||
    !tab.plCanView ||
    !tab.guestCanView ||
    message.isDirect ||
    message.isSecret ||
    message.isSystem ||
    message.isSystemMessage ||
    message.isOutOfStory ||
    (message.tag ?? '').match(/secret|system/i) ||
    (requireEnabled && !readVoice(character.ttsVoice).enabled)
  )
    return null;
  const text = ttsText(message.text ?? '');
  return text && [...text].length <= 300 ? text : null;
}
export async function textHash(text: string): Promise<string> {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('');
}
