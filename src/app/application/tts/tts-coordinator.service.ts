import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { TtsApiClient } from '@axe/application/tts/tts-api-client';
import { TtsAssetService } from '@axe/application/tts/tts-asset.service';
import { validJob, validSession } from '@axe/application/tts/tts-network.service';
import { TtsPlaybackService } from '@axe/application/tts/tts-playback.service';
import { fileLoaded$ } from '@axe/core/event/domain-events';
import { Network } from '@axe/core/network/network';
import { networkMessage$, networkSend } from '@axe/core/network/network-messaging';
import { AudioFile } from '@axe/core/storage/audio-file';
import { AudioStorage } from '@axe/core/storage/audio-storage';
import { childrenChanged$, objectAdded$, objectChanged$, objectRemoved$ } from '@axe/core/sync/object-event-extension';
import { ObjectStore } from '@axe/core/sync/object-store';
import { GameCharacter } from '@axe/domain/character/game-character';
import { ChatMessage } from '@axe/domain/chat/chat-message';
import { ChatTab } from '@axe/domain/chat/chat-tab';
import { PeerCursor } from '@axe/domain/peer/peer-cursor';
import { eligibleMessage, textHash } from '@axe/domain/tts/tts-policy';
import { readAttachment, readVoice, TtsJob, TtsSession, TtsVoiceSettings } from '@axe/domain/tts/tts-types';

@Injectable({ providedIn: 'root' })
export class TtsCoordinatorService {
  readonly api = inject(TtsApiClient);
  readonly playback = inject(TtsPlaybackService);
  private readonly assets = inject(TtsAssetService);
  private readonly store = inject(ObjectStore);
  private readonly destroy = inject(DestroyRef);
  readonly session = signal<TtsSession | null>(null);
  readonly offers = signal<TtsSession[]>([]);
  readonly error = signal('');
  private initialized = false;
  private controller = new AbortController();
  private generating = false;
  private generationQueue: { job: TtsJob; voice: TtsVoiceSettings; text: string }[] = [];
  private hostJobs = new Map<number, TtsJob>();
  private waitingPeer: string | null = null;
  private jobs = new Map<number, TtsJob>();
  private seen = new Set<string>();
  private requesting = new Set<string>();
  private cursor = 0;
  private floor = 0;
  private lastStateRequest = 0;
  private tickTimer: ReturnType<typeof setInterval> | null = null;

  initialize(): void {
    if (this.initialized) return;
    this.initialized = true;
    networkMessage$.subscribe((msg) => {
      if (msg.eventName === 'CONNECT_PEER' && msg.isSendFromSelf) this.discover();
      if (
        msg.isSendFromSelf &&
        (msg.eventName === 'CLOSE_NETWORK' ||
          (msg.eventName === 'DISCONNECT_PEER' && (msg.data as { peerId?: string })?.peerId === this.session()?.peerId))
      )
        this.reset();
      if (
        msg.eventName === 'TTS_STATE_REQUEST' &&
        this.isHost() &&
        (msg.data as { protocolVersion?: number })?.protocolVersion === 1
      ) {
        this.announce(msg.sendFrom);
        const request = msg.data as { afterSequence?: number; epoch?: string };
        if (
          request.epoch === this.session()?.epoch &&
          Number.isSafeInteger(request.afterSequence) &&
          request.afterSequence! >= 0
        )
          for (const job of this.hostJobs.values())
            if (job.sequence > request.afterSequence!)
              networkSend(
                job.expiresAt <= Date.now()
                  ? 'TTS_SKIP'
                  : job.error
                    ? 'TTS_SKIP'
                    : job.attachment
                      ? 'TTS_ASSET'
                      : 'TTS_QUEUED',
                job.expiresAt <= Date.now() ? { ...job, attachment: undefined, error: '期限切れ' } : job,
                msg.sendFrom
              );
      }
      if (msg.eventName === 'TTS_STATE' && validSession(msg.data) && msg.data.peerId === msg.sendFrom) {
        const s = msg.data;
        this.offers.update((offers) => [...offers.filter((o) => o.peerId !== s.peerId), s].slice(-30));
        if (this.waitingPeer === s.peerId) {
          this.waitingPeer = null;
          this.session.set({ ...s });
          this.floor = this.cursor = s.highWater;
        }
        if (this.session()?.peerId === s.peerId && this.session()?.epoch === s.epoch) {
          this.session.set({ ...s });
          const recoveryFloor = Math.max(0, s.highWater - 200);
          this.cursor = Math.max(this.cursor, recoveryFloor);
          this.floor = Math.max(this.floor, recoveryFloor);
        }
        // Epoch changes always require explicit selection. Never restore a session from room data.
        if (this.session()?.peerId === s.peerId && this.session()?.epoch !== s.epoch) this.reset();
      }
      if (msg.eventName === 'TTS_END' && (msg.data as { protocolVersion?: number })?.protocolVersion === 1) {
        const endedEpoch = (msg.data as { epoch?: string })?.epoch;
        this.offers.update((offers) => offers.filter((o) => o.peerId !== msg.sendFrom || o.epoch !== endedEpoch));
        if (
          msg.sendFrom === this.session()?.peerId &&
          (msg.data as { epoch?: string })?.epoch === this.session()?.epoch
        )
          this.reset();
      }
      if (msg.eventName === 'TTS_REQUEST' && this.isHost())
        void this.acceptRequest(msg.data, msg.sendFrom).catch(() => this.error.set('発言の検証に失敗しました'));
      if (
        ['TTS_QUEUED', 'TTS_ASSET', 'TTS_SKIP', 'TTS_CANCEL'].includes(msg.eventName) &&
        msg.sendFrom === this.session()?.peerId &&
        validJob(msg.data) &&
        msg.data.epoch === this.session()?.epoch
      ) {
        const job = msg.data;
        if (job.sequence <= this.floor || job.sequence > this.cursor + 200) return;
        if (msg.eventName === 'TTS_CANCEL') {
          this.playback.clear();
          this.floor = Math.max(this.floor, job.sequence);
          this.cursor = Math.max(this.cursor, this.floor);
          return;
        }
        const existing = this.jobs.get(job.sequence);
        if (existing && (existing.messageId !== job.messageId || existing.textHash !== job.textHash)) return;
        this.jobs.set(job.sequence, { ...existing, ...job });
        if (msg.eventName === 'TTS_QUEUED' && !existing) this.playback.status(job.messageId, 'queued');
        if (msg.eventName === 'TTS_SKIP') {
          this.playback.status(job.messageId, 'failed');
          this.error.set(job.error ?? '生成失敗');
        }
        if (msg.eventName === 'TTS_ASSET' && !this.playback.enabled()) this.playback.status(job.messageId, 'available');
        this.drain();
      }
    }, this.destroy);
    const changed = () => {
      // Edits / visibility changes cancel pending playback too, including a currently playing line.
      void this.playback.revalidate();
    };
    objectChanged$.subscribe(changed, this.destroy);
    objectRemoved$.subscribe(changed, this.destroy);
    fileLoaded$.subscribe(() => this.stopHost(), this.destroy);
    this.tickTimer = setInterval(() => {
      this.drain();
      if (((this.session() && !this.isHost()) || this.waitingPeer) && Date.now() - this.lastStateRequest >= 5000)
        this.requestState();
      for (const map of [this.jobs])
        for (const [sequence, job] of map)
          if (job.expiresAt < Date.now() - 15000 && sequence <= this.cursor) map.delete(sequence);
    }, 1000);
    this.destroy.onDestroy(() => {
      if (this.tickTimer) clearInterval(this.tickTimer);
      this.reset();
    });
  }
  isHost(): boolean {
    return this.session()?.peerId === Network.peerId;
  }
  private requestState(): void {
    const peer = this.waitingPeer ?? this.session()?.peerId;
    if (!peer || Date.now() - this.lastStateRequest < 1000) return;
    this.lastStateRequest = Date.now();
    networkSend(
      'TTS_STATE_REQUEST',
      { protocolVersion: 1, epoch: this.session()?.epoch, afterSequence: this.cursor },
      peer
    );
  }
  discover(): void {
    networkSend('TTS_STATE_REQUEST', { protocolVersion: 1 });
  }
  async startHost(tabIds: string[]): Promise<void> {
    this.initialize();
    this.error.set('');
    this.stopHost();
    const startSignal = this.controller.signal;
    const signal = AbortSignal.any([startSignal, AbortSignal.timeout(65000)]);
    try {
      if (!tabIds.length) throw new Error('公開チャットタブを選択してください');
      await this.api.request('health', { signal });
      // A short synthesis is a real model warm-up, health alone is insufficient.
      const profiles = (await (await this.api.request('profiles', { signal })).json()) as {
        id: string;
        styles: string[];
      }[];
      if (
        !Array.isArray(profiles) ||
        !profiles.length ||
        !Array.isArray(profiles[0].styles) ||
        !profiles[0].styles.length
      )
        throw new Error('Bridgeのプロファイルがありません');
      const warmupVoice = { ...readVoice(), profileId: profiles[0].id, styleId: profiles[0].styles[0] };
      await this.api.synthesize(crypto.randomUUID(), 'こんにちは。', warmupVoice, signal, true);
      if (startSignal.aborted) return;
      this.reset();
      this.session.set({
        protocolVersion: 1,
        peerId: Network.peerId,
        epoch: crypto.randomUUID(),
        tabIds,
        highWater: 0,
      });
      this.announce();
    } catch (error) {
      if (!startSignal.aborted) this.error.set(error instanceof Error ? error.message : '接続失敗');
    }
  }
  selectHost(peerId: string): void {
    if (peerId === Network.peerId && this.isHost()) return;
    const offer = this.offers().find((s) => s.peerId === peerId);
    if (!offer) return;
    this.reset();
    this.waitingPeer = peerId;
    networkSend('TTS_STATE_REQUEST', { protocolVersion: 1 }, peerId);
    const controller = this.controller;
    setTimeout(() => {
      if (this.controller === controller && this.waitingPeer === peerId) {
        this.waitingPeer = null;
        this.error.set('担当から応答がありません。再度担当を探してください。');
      }
    }, 10000);
  }
  stopHost(): void {
    if (this.isHost()) networkSend('TTS_END', { protocolVersion: 1, epoch: this.session()?.epoch });
    this.reset();
  }
  clearRoom(): void {
    if (!this.isHost()) {
      this.playback.clear();
      return;
    }
    this.controller.abort();
    this.controller = new AbortController();
    this.generationQueue = [];
    const jobs = [...this.hostJobs.values()];
    const last = jobs.at(-1);
    for (const job of jobs) {
      job.error = 'cancelled';
      delete job.attachment;
    }
    if (last) networkSend('TTS_CANCEL', last);
    this.clearLocal();
  }
  clearLocal(): void {
    this.playback.clear();
    this.floor = this.cursor = Math.max(this.cursor, this.session()?.highWater ?? 0, ...this.jobs.keys());
  }
  private reset(): void {
    this.controller.abort();
    this.controller = new AbortController();
    this.generationQueue = [];
    this.session.set(null);
    this.waitingPeer = null;
    this.playback.clear();
    this.jobs.clear();
    this.hostJobs.clear();
    this.seen.clear();
    this.requesting.clear();
    this.cursor = this.floor = 0;
  }
  private announce(peerId?: string): void {
    const s = this.session();
    if (s && this.isHost()) networkSend('TTS_STATE', s, peerId);
  }
  async onNewMessage(message: ChatMessage): Promise<void> {
    const s = this.session();
    if (!s) return;
    const text = this.messageText(message.identifier);
    if (!text) return;
    const hash = await textHash(text);
    if (this.session()?.epoch !== s.epoch) return;
    networkSend(
      'TTS_REQUEST',
      {
        protocolVersion: 1,
        epoch: s.epoch,
        requestId: crypto.randomUUID(),
        messageId: message.identifier,
        textHash: hash,
      },
      s.peerId
    );
  }
  private messageText(id: string): string | null {
    const m = this.store.get<ChatMessage>(id);
    if (!(m instanceof ChatMessage)) return null;
    return eligibleMessage(
      m,
      this.store.get<GameCharacter>(m.sendFrom),
      this.store.get<ChatTab>(m.tabIdentifier),
      this.session()?.tabIds ?? []
    );
  }
  private async waitForMessage(job: TtsJob): Promise<void> {
    const ready = () => {
      const message = this.store.get<ChatMessage>(job.messageId);
      return message instanceof ChatMessage && message.parent && this.store.get(message.sendFrom);
    };
    if (ready() || this.store.isDeleted(job.messageId)) return;
    const signal = this.controller.signal;
    await new Promise<void>((resolve) => {
      const cleanups: (() => void)[] = [];
      const finish = () => {
        cleanups.forEach((remove) => remove());
        clearTimeout(timer);
        signal.removeEventListener('abort', finish);
        resolve();
      };
      const check = () => {
        if (ready() || this.store.isDeleted(job.messageId)) finish();
      };
      const timer = setTimeout(finish, Math.max(0, Math.min(3000, job.expiresAt - Date.now())));
      cleanups.push(
        objectAdded$.subscribe(check),
        objectChanged$.subscribe(check),
        childrenChanged$.subscribe(check),
        objectRemoved$.subscribe(check)
      );
      signal.addEventListener('abort', finish, { once: true });
      if (signal.aborted) finish();
      else check();
    });
  }
  async validate(job: TtsJob): Promise<boolean> {
    await this.waitForMessage(job);
    const text = this.messageText(job.messageId);
    return !!text && (await textHash(text)) === job.textHash;
  }
  private async acceptRequest(data: unknown, sender: string): Promise<void> {
    const d = data as TtsJob;
    const s = this.session();
    if (
      !s ||
      !d ||
      d.protocolVersion !== 1 ||
      d.epoch !== s.epoch ||
      typeof d.messageId !== 'string' ||
      d.messageId.length > 200 ||
      typeof d.requestId !== 'string' ||
      !/^[\w-]{1,100}$/.test(d.requestId) ||
      typeof d.textHash !== 'string' ||
      !/^[a-f0-9]{64}$/.test(d.textHash)
    )
      return;
    const key = `${d.messageId}:${d.textHash}`;
    if (this.seen.has(key) || this.requesting.has(key) || this.requesting.size >= 10 || this.seen.size >= 5000) return;
    this.requesting.add(key);
    try {
      let message: ChatMessage | null = null;
      for (let i = 0; i < 30 && !message; i++) {
        message = this.store.get<ChatMessage>(d.messageId);
        if (!message) await new Promise((resolve) => setTimeout(resolve, 100));
        if (this.session()?.epoch !== s.epoch) return;
      }
      if (!(message instanceof ChatMessage)) return;
      const senderCursor = this.store.getObjects(PeerCursor).find((p) => p.peerId === sender);
      if (message.from !== (sender === Network.peerId ? Network.peerContext.userId : senderCursor?.userId)) return;
      const text = this.messageText(d.messageId);
      if (!text || (await textHash(text)) !== d.textHash || this.session()?.epoch !== s.epoch) return;
      this.seen.add(key);
      const job: TtsJob = {
        protocolVersion: 1,
        epoch: s.epoch,
        requestId: d.requestId,
        messageId: d.messageId,
        textHash: d.textHash,
        sequence: this.session()!.highWater + 1,
        expiresAt: Date.now() + 90000,
      };
      this.session.set({ ...this.session()!, highWater: job.sequence });
      this.hostJobs.set(job.sequence, job);
      while (this.hostJobs.size > 200) this.hostJobs.delete(this.hostJobs.keys().next().value!);
      if (this.generationQueue.length >= 10) {
        job.error = '生成キューが満杯です';
        networkSend('TTS_SKIP', job);
        return;
      }
      networkSend('TTS_QUEUED', job);
      const character = this.store.get<GameCharacter>(message.sendFrom)!;
      this.generationQueue.push({ job, voice: readVoice(character.ttsVoice), text });
      void this.generate();
    } finally {
      this.requesting.delete(key);
    }
  }
  private async generate(): Promise<void> {
    if (this.generating) return;
    this.generating = true;
    try {
      while (this.generationQueue.length) {
        const { job, voice, text } = this.generationQueue.shift()!;
        const signal = this.controller.signal;
        try {
          if (signal.aborted || !(await this.validate(job)) || job.expiresAt <= Date.now())
            throw new Error('発言変更または期限切れ');
          this.playback.status(job.messageId, 'generating');
          const result = await this.api.synthesize(
            job.requestId,
            text,
            voice,
            AbortSignal.any([signal, AbortSignal.timeout(65000)])
          );
          if (signal.aborted || this.session()?.epoch !== job.epoch) continue;
          if (!(await this.validate(job)) || job.expiresAt <= Date.now()) throw new Error('発言変更または期限切れ');
          if (!this.assets.reserve(result.blob.size)) throw new Error('音声キャッシュが満杯です');
          const audio = await AudioFile.createAsync(
            new File([result.blob], `tts-${job.requestId}.wav`, { type: 'audio/wav' })
          );
          if (signal.aborted || this.session()?.epoch !== job.epoch || !(await this.validate(job))) {
            audio.destroy();
            continue;
          }
          if (!this.assets.reserve(result.blob.size)) {
            audio.destroy();
            throw new Error('音声キャッシュが満杯です');
          }
          const existing = AudioStorage.instance.get(audio.identifier);
          const release = this.assets.pin(audio.identifier);
          if (!existing?.blob)
            AudioStorage.instance.add({
              ...audio.toContext(),
              category: 'tts',
              name: existing?.name || audio.name,
              url: '',
            });
          audio.destroy();
          setTimeout(release, Math.max(0, job.expiresAt - Date.now()));
          job.attachment = {
            version: 1,
            audioIdentifier: audio.identifier,
            textHash: job.textHash,
            profileId: voice.profileId,
            profileRevision: result.revision,
            mimeType: 'audio/wav',
            durationMs: result.durationMs,
          };
          const message = this.store.get<ChatMessage>(job.messageId);
          if (!message) continue;
          message.ttsAttachment = JSON.stringify(job.attachment);
          networkSend('TTS_ASSET', job);
        } catch (error) {
          if (signal.aborted || this.session()?.epoch !== job.epoch) continue;
          job.error = (error instanceof Error ? error.message : '生成失敗').slice(0, 300);
          this.error.set(job.error);
          networkSend('TTS_SKIP', job);
        }
      }
    } finally {
      this.generating = false;
    }
  }
  private drain(): void {
    for (;;) {
      const job = this.jobs.get(this.cursor + 1);
      if (!job) {
        const future = [...this.jobs.keys()].some((sequence) => sequence > this.cursor + 1);
        if (future && this.session()) this.requestState();
        return;
      }
      if (!job.attachment && !job.error && job.expiresAt > Date.now()) return;
      this.cursor++;
      if (job.error || job.expiresAt <= Date.now()) continue;
      this.playback.enqueue(job, () => this.validate(job));
    }
  }
  async replay(message: ChatMessage): Promise<void> {
    const attachment = readAttachment(message.ttsAttachment);
    if (!attachment) return;
    // Saved attachments are references only: never generate from them or start on history sync.
    const text = eligibleMessage(
      message,
      this.store.get<GameCharacter>(message.sendFrom),
      this.store.get<ChatTab>(message.tabIdentifier),
      [message.tabIdentifier],
      false
    );
    if (!text || (await textHash(text)) !== attachment.textHash) {
      this.playback.status(message.identifier, 'cancelled');
      return;
    }
    const job: TtsJob = {
      protocolVersion: 1,
      epoch: 'manual',
      sequence: 1,
      requestId: crypto.randomUUID(),
      messageId: message.identifier,
      textHash: attachment.textHash,
      expiresAt: Date.now() + 90000,
      attachment,
    };
    this.playback.enqueue(
      job,
      async () => {
        const current = eligibleMessage(
          message,
          this.store.get<GameCharacter>(message.sendFrom),
          this.store.get<ChatTab>(message.tabIdentifier),
          [message.tabIdentifier],
          false
        );
        return (
          this.store.get(message.identifier) === message &&
          !!current &&
          (await textHash(current)) === attachment.textHash
        );
      },
      true
    );
    this.playback.resume();
  }
}
