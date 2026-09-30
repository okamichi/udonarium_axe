import { validJob, validSession } from '@axe/application/tts/tts-network.service';
describe('TTSイベント検証', () => {
  const job = {
    protocolVersion: 1,
    epoch: 'epoch',
    sequence: 1,
    requestId: 'request',
    messageId: 'message',
    textHash: 'a'.repeat(64),
    expiresAt: Date.now() + 90000,
  };
  it('未知の版と不正値を拒否', () => {
    expect(validJob(job)).toBe(true);
    for (const override of [
      { protocolVersion: 2 },
      { sequence: -1 },
      { textHash: 'invalid' },
      { expiresAt: Infinity },
      { messageId: 'a'.repeat(201) },
      { attachment: {} },
    ])
      expect(validJob({ ...job, ...override })).toBe(false);
  });
  it('担当通知の大きさを制限', () => {
    expect(validSession({ protocolVersion: 1, peerId: 'peer', epoch: 'epoch', tabIds: ['tab'], highWater: 1 })).toBe(
      true
    );
    expect(
      validSession({ protocolVersion: 1, peerId: 'peer', epoch: 'epoch', tabIds: Array(31).fill('tab'), highWater: 1 })
    ).toBe(false);
  });
});
