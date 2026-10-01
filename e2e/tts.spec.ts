import { once } from 'node:events';
import { readFileSync } from 'node:fs';
import type { AddressInfo } from 'node:net';

import { expect, test as base } from '@playwright/test';

import { createCharacter, openChatSettingsMenuItem, waitAppReady } from './helpers';

const test = base.extend<{ realBridge: string | null }>({
  // Playwright requires a destructured first argument even when no fixtures are used.
  // eslint-disable-next-line no-empty-pattern
  realBridge: async ({}, use) => {
    if (!process.env['TTS_REAL_E2E']) {
      await use(null);
      return;
    }
    const { createBridge } = await import('../tools/tts-bridge/server.mjs');
    const profiles = JSON.parse(readFileSync('tools/tts-bridge/profiles.json', 'utf8'));
    const server = createBridge({ token: 'test-token-memory-only', profiles });
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    try {
      await use(`http://127.0.0.1:${(server.address() as AddressInfo).port}`);
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  },
});

function wav(): Buffer {
  const b = Buffer.alloc(44 + 16000);
  b.write('RIFF');
  b.writeUInt32LE(b.length - 8, 4);
  b.write('WAVEfmt ', 8);
  b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20);
  b.writeUInt16LE(1, 22);
  b.writeUInt32LE(8000, 24);
  b.writeUInt32LE(16000, 28);
  b.writeUInt16LE(2, 32);
  b.writeUInt16LE(16, 34);
  b.write('data', 36);
  b.writeUInt32LE(16000, 40);
  return b;
}
test('PCの固定シード・声色で生成し、本文を先に表示して一回再生する', async ({ page, realBridge }) => {
  test.setTimeout(realBridge ? 90000 : 30000);
  await page.addInitScript(() => {
    localStorage.setItem('ui-local-mode', '1');
    localStorage.setItem('ui-lang', 'ja');
  });
  let requests = 0;
  const bridgeRequests: string[] = [];
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  let speechSettings: { seed?: string; caption?: string; cfgScaleCaption?: number; voiceId?: string } = {};
  let speechText = '';
  await page.route('**/api/tts/**', async (route) => {
    bridgeRequests.push(route.request().url());
    if (!realBridge && route.request().url().endsWith('/voices'))
      return route.fulfill({ json: { id: 'axe-test-voice' } });
    if (!realBridge && route.request().url().endsWith('/health'))
      return route.fulfill({ json: { status: 'ok', loaded: true } });
    if (route.request().url().endsWith('/synthesize')) {
      requests++;
      const body = route.request().postDataJSON();
      if (requests > 1) {
        speechSettings = body.settings;
        speechText = body.text;
        await gate;
      }
      if (realBridge)
        return route.fulfill({
          response: await route.fetch({ url: realBridge + new URL(route.request().url()).pathname, timeout: 65000 }),
        });
      return route.fulfill({
        body: wav(),
        contentType: 'audio/wav',
        headers: {
          'X-TTS-Duration-Ms': '1000',
          'X-TTS-Profile-Revision': 'test-1',
          'Access-Control-Expose-Headers': 'X-TTS-Duration-Ms, X-TTS-Profile-Revision',
        },
      });
    }
    if (realBridge)
      return route.fulfill({
        response: await route.fetch({ url: realBridge + new URL(route.request().url()).pathname }),
      });
    return route.fulfill({ json: [{ id: 'melissa', styles: ['default'] }] });
  });
  await waitAppReady(page);
  await createCharacter(page);
  await page.locator('game-character').filter({ hasText: '新しいキャラクター' }).first().dispatchEvent('contextmenu');
  await page.locator('context-menu').getByText('詳細を表示').click();
  const sheet = page.locator('game-character-sheet');
  await sheet.getByRole('button', { name: /設定/ }).first().click();
  const voice = page.locator('tts-character-settings');
  await voice.getByLabel('公開セリフを読み上げる').check();
  await expect(voice.getByLabel('固定シード')).toHaveValue('1520596899881326291');
  await voice.getByLabel('声色・話し方').fill('落ち着いた女性の声。');
  await voice.getByText('指示の強度（CFG・空欄はサーバ既定値）', { exact: true }).click();
  await voice.getByLabel('声色・演技指示の強度', { exact: true }).fill('3.5');
  await voice.getByLabel('固定シード').focus();
  await page
    .locator('ui-panel')
    .filter({ has: sheet })
    .locator('button')
    .filter({ hasText: /^\s*close\s*$/ })
    .first()
    .dispatchEvent('click');
  const controls = page.locator('tts-controls');
  await expect(page.locator('chat-window tts-controls')).toHaveCount(0);
  await openChatSettingsMenuItem(page, 'TTS設定');
  await controls.getByLabel('この端末で読み上げ').check();
  await controls.getByText('生成担当・接続設定（対応端末のみ）', { exact: true }).click();
  if (!realBridge) await controls.getByLabel('Bridge URL', { exact: true }).fill('https://tts.example.com/api/tts/');
  await controls.getByLabel('Bridge認証トークン').fill('test-token-memory-only');
  await controls.getByRole('button', { name: 'この端末を担当にする（接続・発声確認）' }).click();
  await expect(controls.locator('summary').first()).toContainText('接続中', { timeout: realBridge ? 65000 : 5000 });
  await expect(controls.getByLabel('Bridge URL', { exact: true })).toBeDisabled();
  if (!realBridge) expect(bridgeRequests.every((url) => new URL(url).origin === 'https://tts.example.com')).toBe(true);
  await page
    .locator('ui-panel')
    .filter({ has: controls })
    .locator('button')
    .filter({ hasText: /^\s*close\s*$/ })
    .first()
    .dispatchEvent('click');
  const speaker = page.locator('chat-input ng-select[name="send-from"]');
  await speaker.click();
  await page.locator('.ng-dropdown-panel').getByRole('option', { name: '新しいキャラクター', exact: true }).click();
  const input = page.locator('textarea.chat-input');
  await input.fill('[感情:喜び]こんにちは。[演技:囁き]テストのセリフです。');
  await input.press('Enter');
  const row = page
    .locator('chat-message')
    .filter({ hasText: '[感情:喜び]こんにちは。[演技:囁き]テストのセリフです。' });
  await expect(row).toBeVisible();
  await expect.poll(() => requests).toBe(2);
  expect(speechSettings.seed).toBe('1520596899881326291');
  expect(speechSettings.caption).toBe('落ち着いた女性の声。');
  expect(speechSettings.cfgScaleCaption).toBe(3.5);
  expect(speechText).toBe('[感情:喜び]こんにちは。[演技:囁き]テストのセリフです。');
  release();
  await expect(row.locator('tts-message-audio')).toContainText('再生済み', { timeout: 10000 });
  expect(requests).toBe(2); // ウォームアップ1回 + セリフ1回
  await row.getByRole('button', { name: 'この端末で再生' }).click();
  await expect(row.locator('tts-message-audio')).toContainText('再生中');
  await expect(row.locator('tts-message-audio')).toContainText('再生済み', { timeout: 10000 });
  expect(requests).toBe(2);

  // Editing the voice after the generation host has started must affect both preview and chat.
  await page.locator('game-character').filter({ hasText: '新しいキャラクター' }).first().dispatchEvent('contextmenu');
  await page.locator('context-menu').getByText('詳細を表示').click();
  await sheet.getByRole('button', { name: /設定/ }).first().click();
  await voice.getByLabel('声色・話し方').fill('低く渋い中年男性の声。ゆっくり落ち着いた話し方。');
  await voice.getByLabel('固定シード').fill('152059689988132');
  await voice.getByRole('button', { name: 'この端末で試聴', exact: true }).click();
  await expect.poll(() => requests).toBe(3);
  expect(speechSettings.caption).toBe('低く渋い中年男性の声。ゆっくり落ち着いた話し方。');
  expect(speechSettings.seed).toBe('152059689988132');
  await expect(voice.getByRole('button', { name: 'この端末で試聴', exact: true })).toBeEnabled({ timeout: 65000 });
  await voice.getByRole('button', { name: 'この試聴をキャラの声として固定', exact: true }).click();
  await expect(voice.getByLabel('参照音声ID')).toHaveValue(/^axe-[\w-]+$/);
  const referenceId = await voice.getByLabel('参照音声ID').inputValue();
  await page
    .locator('ui-panel')
    .filter({ has: sheet })
    .locator('button')
    .filter({ hasText: /^\s*close\s*$/ })
    .first()
    .dispatchEvent('click');
  await input.fill('こんにちは。変更した声で、次の冒険についてお話しします。');
  await input.press('Enter');
  await expect.poll(() => requests).toBe(4);
  expect(speechSettings.caption).toBe('低く渋い中年男性の声。ゆっくり落ち着いた話し方。');
  expect(speechSettings.seed).toBe('152059689988132');
  expect(speechSettings.voiceId).toBe(referenceId);
  const nextRow = page
    .locator('chat-message')
    .filter({ hasText: 'こんにちは。変更した声で、次の冒険についてお話しします。' });
  await expect(nextRow.locator('tts-message-audio')).toContainText('再生済み', { timeout: 65000 });
});
