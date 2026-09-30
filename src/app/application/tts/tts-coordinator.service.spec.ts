import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TtsApiClient } from '@axe/application/tts/tts-api-client';
import { TtsAssetService } from '@axe/application/tts/tts-asset.service';
import { TtsCoordinatorService } from '@axe/application/tts/tts-coordinator.service';
import { TtsPlaybackService } from '@axe/application/tts/tts-playback.service';
import { Network } from '@axe/core/network/network';
import { networkMessage$ } from '@axe/core/network/network-messaging';
import { AudioStorage } from '@axe/core/storage/audio-storage';
import { GameCharacter } from '@axe/domain/character/game-character';
import { ChatMessage } from '@axe/domain/chat/chat-message';
import { ChatTab } from '@axe/domain/chat/chat-tab';
import { textHash } from '@axe/domain/tts/tts-policy';
import { DEFAULT_TTS_VOICE, TtsJob } from '@axe/domain/tts/tts-types';
import { TEST_PROVIDERS } from '@axe/testing/test-providers';
import { vi } from 'vitest';

describe('TTS生成担当と新規イベント', () => {
  const playback = {
    enabled: signal(true),
    statuses: signal({}),
    status: vi.fn(),
    enqueue: vi.fn(),
    clear: vi.fn(),
    revalidate: vi.fn(),
    resume: vi.fn(),
  };
  const synthesize = vi.fn();
  let coordinator: TtsCoordinatorService;
  let sent: { eventName: string; data: unknown; sendFrom: string }[];
  let character: GameCharacter;
  let tab: ChatTab;
  const response = () => ({ blob: new Blob(['test-wav'], { type: 'audio/wav' }), durationMs: 1000, revision: '1' });
  const flush = () => new Promise((resolve) => setTimeout(resolve, 30));
  beforeEach(() => {
    vi.clearAllMocks();
    sent = [];
    vi.spyOn(Network, 'peerId', 'get').mockReturnValue('host');
    vi.spyOn(Network, 'peerContext', 'get').mockReturnValue({ userId: 'host-user' } as typeof Network.peerContext);
    vi.spyOn(Network.instance, 'send').mockImplementation((ctx) => {
      const msg = ctx as { eventName: string; data: unknown; sendFrom: string };
      if (!msg.eventName.startsWith('TTS_')) return;
      const copy = structuredClone(msg);
      sent.push(copy);
      networkMessage$.emit({ ...copy, isSendFromSelf: true });
    });
    synthesize.mockResolvedValue(response());
    TestBed.configureTestingModule({
      providers: [
        ...TEST_PROVIDERS,
        { provide: TtsApiClient, useValue: { synthesize, request: vi.fn() } },
        { provide: TtsPlaybackService, useValue: playback },
        { provide: TtsAssetService, useValue: { reserve: () => true, pin: () => () => {} } },
      ],
    });
    coordinator = TestBed.inject(TtsCoordinatorService);
    coordinator.initialize();
    tab = new ChatTab();
    tab.initialize();
    character = new GameCharacter();
    character.initialize();
    character.ttsVoice = JSON.stringify({ ...DEFAULT_TTS_VOICE, enabled: true });
    coordinator.session.set({
      protocolVersion: 1,
      peerId: 'host',
      epoch: 'epoch',
      tabIds: [tab.identifier],
      highWater: 0,
    });
  });
  afterEach(() => {
    coordinator.stopHost();
    for (const audio of AudioStorage.instance.audios) if (audio.isTts) AudioStorage.instance.delete(audio.identifier);
    vi.restoreAllMocks();
  });
  function message(text = 'こんにちは。') {
    return tab.addMessage({ text, sendFrom: character.identifier, from: 'host-user', ttsSpeech: true });
  }
  function deliver(eventName: string, data: unknown, sendFrom = 'host') {
    networkMessage$.emit({ eventName, data, sendFrom, isSendFromSelf: sendFrom === 'host' });
  }
  it('ウォームアップ中の担当解除で後から担当が復活しない', async () => {
    const api = TestBed.inject(TtsApiClient);
    vi.mocked(api.request).mockResolvedValue({
      json: async () => [{ id: 'melissa', styles: ['default'] }],
    } as Response);
    let finish!: (value: ReturnType<typeof response>) => void;
    synthesize.mockImplementation(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        })
    );
    const starting = coordinator.startHost([tab.identifier]);
    await flush();
    coordinator.stopHost();
    finish(response());
    await starting;
    expect(coordinator.session()).toBeNull();
  });
  it('同じ本文の要求再送でも生成・再生は一回', async () => {
    const m = message();
    await coordinator.onNewMessage(m);
    await coordinator.onNewMessage(m);
    await flush();
    expect(synthesize).toHaveBeenCalledOnce();
    expect(playback.enqueue).toHaveBeenCalledOnce();
    const asset = sent.find((e) => e.eventName === 'TTS_ASSET')!;
    deliver('TTS_ASSET', asset.data);
    deliver('TTS_QUEUED', asset.data);
    expect(playback.enqueue).toHaveBeenCalledOnce();
    expect(m.ttsAttachment).toContain('audioIdentifier');
  });
  it('履歴追加・秘話・制限タブではAPIを呼ばない', async () => {
    message('過去ログ');
    await flush();
    expect(synthesize).not.toHaveBeenCalled();
    const secret = message();
    secret.to = 'other';
    await coordinator.onNewMessage(secret);
    const restricted = message();
    tab.guestCanView = false;
    await coordinator.onNewMessage(restricted);
    await flush();
    expect(synthesize).not.toHaveBeenCalled();
  });
  it('生成中の編集・停止で古いWAVを登録・通知しない', async () => {
    let finish!: (value: ReturnType<typeof response>) => void;
    synthesize.mockImplementation(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        })
    );
    const m = message();
    await coordinator.onNewMessage(m);
    await flush();
    m.text = '変更した本文';
    finish(response());
    await flush();
    expect(sent.some((e) => e.eventName === 'TTS_ASSET')).toBe(false);
    expect(AudioStorage.instance.audios.filter((a) => a.isTts)).toHaveLength(0);
    const second = message('次の本文');
    await coordinator.onNewMessage(second);
    await flush();
    coordinator.clearRoom();
    finish(response());
    await flush();
    expect(sent.some((e) => e.eventName === 'TTS_ASSET')).toBe(false);
  });
  it('失敗した生成の後も次のPCで続行し順序を保つ', async () => {
    synthesize.mockRejectedValueOnce(new Error('HTTP 503')).mockResolvedValue(response());
    const first = message('最初のセリフ'),
      second = message('次のセリフ');
    await Promise.all([coordinator.onNewMessage(first), coordinator.onNewMessage(second)]);
    await flush();
    const skipped = sent.find((e) => e.eventName === 'TTS_SKIP')!.data as TtsJob;
    const asset = sent.find((e) => e.eventName === 'TTS_ASSET')!.data as TtsJob;
    expect(skipped.sequence).toBe(1);
    expect(asset.sequence).toBe(2);
    expect(synthesize).toHaveBeenCalledTimes(2);
  });
  it('同名のPCでもキャラIDに対応するcaption・seedを使用', async () => {
    const other = new GameCharacter();
    other.initialize();
    other.ttsVoice = JSON.stringify({
      ...DEFAULT_TTS_VOICE,
      enabled: true,
      seed: '42',
      caption: '落ち着いた男性の声。',
    });
    const first = message('私が先に進みます。');
    const second = tab.addMessage({
      text: '私は後ろを守ります。',
      sendFrom: other.identifier,
      from: 'host-user',
      ttsSpeech: true,
    });
    await coordinator.onNewMessage(first);
    await coordinator.onNewMessage(second);
    await flush();
    expect(synthesize).toHaveBeenCalledTimes(2);
    expect(synthesize.mock.calls[0][2].seed).toBe('1520596899881326291');
    expect(synthesize.mock.calls[1][2].seed).toBe('42');
    expect(synthesize.mock.calls[1][2].caption).toBe('落ち着いた男性の声。');
  });
  it('担当・epoch・投稿者の違うイベントを拒否', async () => {
    const m = message(),
      hash = await textHash(m.text);
    deliver(
      'TTS_REQUEST',
      { protocolVersion: 1, epoch: 'epoch', requestId: 'req', messageId: m.identifier, textHash: hash },
      'wrong-peer'
    );
    deliver('TTS_ASSET', {
      protocolVersion: 1,
      epoch: 'old',
      sequence: 1,
      requestId: 'req',
      messageId: m.identifier,
      textHash: hash,
      expiresAt: Date.now() + 90000,
    });
    await flush();
    expect(synthesize).not.toHaveBeenCalled();
    expect(playback.enqueue).not.toHaveBeenCalled();
  });
  it('音声イベントがメッセージより先着した場合は同期を待って照合する', async () => {
    const hash = await textHash('同期が遅れたセリフ。');
    const job: TtsJob = {
      protocolVersion: 1,
      epoch: 'epoch',
      sequence: 1,
      requestId: 'early-asset',
      messageId: 'late-message',
      textHash: hash,
      expiresAt: Date.now() + 90000,
    };
    let completed = false;
    const valid = coordinator.validate(job).then((result) => {
      completed = true;
      return result;
    });
    await Promise.resolve();
    expect(completed).toBe(false);
    const delayed = new ChatMessage('late-message');
    delayed.text = '同期が遅れたセリフ。';
    delayed.sendFrom = character.identifier;
    delayed.from = 'host-user';
    delayed.ttsSpeech = true;
    delayed.initialize();
    tab.appendChild(delayed);
    expect(await valid).toBe(true);
  });
  it('途中参加は高水位以前を再生せず、到着順の逆転を待つ', async () => {
    coordinator.stopHost();
    deliver(
      'TTS_STATE',
      { protocolVersion: 1, peerId: 'remote', epoch: 'new-epoch', tabIds: [tab.identifier], highWater: 3 },
      'remote'
    );
    coordinator.selectHost('remote');
    deliver(
      'TTS_STATE',
      { protocolVersion: 1, peerId: 'remote', epoch: 'new-epoch', tabIds: [tab.identifier], highWater: 3 },
      'remote'
    );
    const m = message(),
      hash = await textHash(m.text);
    const make = (sequence: number): TtsJob => ({
      protocolVersion: 1,
      epoch: 'new-epoch',
      sequence,
      requestId: `req-${sequence}`,
      messageId: m.identifier,
      textHash: hash,
      expiresAt: Date.now() + 90000,
      attachment: {
        version: 1,
        audioIdentifier: 'b'.repeat(64),
        textHash: hash,
        profileId: 'melissa',
        profileRevision: '1',
        mimeType: 'audio/wav',
        durationMs: 1000,
      },
    });
    deliver('TTS_ASSET', make(3), 'remote');
    expect(playback.enqueue).not.toHaveBeenCalled();
    deliver('TTS_ASSET', make(5), 'remote');
    expect(playback.enqueue).not.toHaveBeenCalled();
    deliver('TTS_ASSET', make(4), 'remote');
    expect(playback.enqueue).toHaveBeenCalledTimes(2);
    expect(playback.enqueue.mock.calls.map((c) => c[0].sequence)).toEqual([4, 5]);
  });
});
