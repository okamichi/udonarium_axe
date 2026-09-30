export interface TtsVoiceSettings {
  enabled: boolean;
  profileId: string;
  styleId: string;
  caption: string;
  seed: string;
  steps: number;
  speed: number;
  voiceId?: string;
  cfgScaleText?: number;
  cfgScaleCaption?: number;
  cfgScaleSpeaker?: number;
}
export const DEFAULT_TTS_VOICE: TtsVoiceSettings = {
  enabled: false,
  profileId: 'melissa',
  styleId: 'default',
  caption: '透明感のある若い女性の声。明るく可愛らしく、クリアで聞き取りやすい声。柔らかく自然な話し方。',
  seed: '1520596899881326291',
  steps: 10,
  speed: 1,
};
export function validVoice(value: unknown): value is TtsVoiceSettings {
  if (!value || typeof value !== 'object') return false;
  const v = value as TtsVoiceSettings;
  return (
    typeof v.enabled === 'boolean' &&
    typeof v.profileId === 'string' &&
    /^[\w-]{1,64}$/.test(v.profileId) &&
    typeof v.styleId === 'string' &&
    /^[\w-]{1,64}$/.test(v.styleId) &&
    typeof v.caption === 'string' &&
    v.caption.length <= 1000 &&
    typeof v.seed === 'string' &&
    /^\d{1,19}$/.test(v.seed) &&
    BigInt(v.seed) <= 9223372036854775807n &&
    Number.isInteger(v.steps) &&
    v.steps >= 1 &&
    v.steps <= 100 &&
    Number.isFinite(v.speed) &&
    v.speed >= 0.5 &&
    v.speed <= 2 &&
    (v.voiceId === undefined || (typeof v.voiceId === 'string' && /^(?:[\w-]{1,100})?$/.test(v.voiceId))) &&
    [v.cfgScaleText, v.cfgScaleCaption, v.cfgScaleSpeaker].every(
      (scale) => scale === undefined || (Number.isFinite(scale) && scale >= 0 && scale <= 10)
    )
  );
}
export function readVoice(raw?: string): TtsVoiceSettings {
  try {
    const v: unknown = JSON.parse(raw ?? '');
    if (validVoice(v)) return v;
  } catch {
    /* absent or old data */
  }
  return { ...DEFAULT_TTS_VOICE };
}
export interface TtsAttachment {
  version: 1;
  audioIdentifier: string;
  textHash: string;
  profileId: string;
  profileRevision: string;
  mimeType: 'audio/wav';
  durationMs: number;
}
export function validAttachment(value: unknown): value is TtsAttachment {
  if (!value || typeof value !== 'object') return false;
  const a = value as TtsAttachment;
  return (
    a.version === 1 &&
    typeof a.audioIdentifier === 'string' &&
    /^[a-f0-9]{64}$/i.test(a.audioIdentifier) &&
    typeof a.textHash === 'string' &&
    /^[a-f0-9]{64}$/i.test(a.textHash) &&
    typeof a.profileId === 'string' &&
    /^[\w-]{1,64}$/.test(a.profileId) &&
    typeof a.profileRevision === 'string' &&
    a.profileRevision.length > 0 &&
    a.profileRevision.length <= 160 &&
    a.mimeType === 'audio/wav' &&
    Number.isFinite(a.durationMs) &&
    a.durationMs > 0 &&
    a.durationMs <= 60000
  );
}
export function readAttachment(raw?: string): TtsAttachment | null {
  try {
    const a: unknown = JSON.parse(raw ?? '');
    return validAttachment(a) ? a : null;
  } catch {
    return null;
  }
}
export interface TtsSession {
  protocolVersion: 1;
  peerId: string;
  epoch: string;
  tabIds: string[];
  highWater: number;
}
export interface TtsJob {
  protocolVersion: 1;
  epoch: string;
  sequence: number;
  requestId: string;
  messageId: string;
  textHash: string;
  expiresAt: number;
  attachment?: TtsAttachment;
  error?: string;
}
export type TtsStatus =
  | 'available'
  | 'queued'
  | 'generating'
  | 'waitingAsset'
  | 'playing'
  | 'ended'
  | 'failed'
  | 'expired'
  | 'cancelled'
  | '操作待ち'
  | '音声なし';
export const TTS_MAX_BYTES = 10 * 1024 * 1024;

export function ttsStatusLabel(status: TtsStatus): string {
  const labels: Record<TtsStatus, string> = {
    available: '再生可能',
    queued: '生成待ち',
    generating: '生成中',
    waitingAsset: '音声の到着待ち',
    playing: '再生中',
    ended: '再生済み',
    failed: '音声処理に失敗',
    expired: '期限切れ',
    cancelled: '取り消し',
    操作待ち: '音声の開始操作待ち',
    音声なし: '音声なし',
  };
  return labels[status];
}
