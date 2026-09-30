import { TtsJob, TtsSession, validAttachment } from '@axe/domain/tts/tts-types';
export function validSession(data: unknown): data is TtsSession {
  if (!data || typeof data !== 'object') return false;
  const s = data as TtsSession;
  return (
    s.protocolVersion === 1 &&
    typeof s.peerId === 'string' &&
    s.peerId.length > 0 &&
    s.peerId.length <= 200 &&
    typeof s.epoch === 'string' &&
    /^[\w-]{1,100}$/.test(s.epoch) &&
    Array.isArray(s.tabIds) &&
    s.tabIds.length <= 30 &&
    s.tabIds.every((id) => typeof id === 'string' && id.length <= 200) &&
    Number.isSafeInteger(s.highWater) &&
    s.highWater >= 0
  );
}
export function validJob(data: unknown): data is TtsJob {
  if (!data || typeof data !== 'object') return false;
  const j = data as TtsJob;
  return (
    j.protocolVersion === 1 &&
    typeof j.epoch === 'string' &&
    /^[\w-]{1,100}$/.test(j.epoch) &&
    Number.isSafeInteger(j.sequence) &&
    j.sequence > 0 &&
    typeof j.requestId === 'string' &&
    /^[\w-]{1,100}$/.test(j.requestId) &&
    typeof j.messageId === 'string' &&
    j.messageId.length > 0 &&
    j.messageId.length <= 200 &&
    typeof j.textHash === 'string' &&
    /^[a-f0-9]{64}$/.test(j.textHash) &&
    Number.isSafeInteger(j.expiresAt) &&
    j.expiresAt <= Date.now() + 95000 &&
    (j.error === undefined || (typeof j.error === 'string' && j.error.length <= 300)) &&
    (j.attachment === undefined || (validAttachment(j.attachment) && j.attachment.textHash === j.textHash))
  );
}
