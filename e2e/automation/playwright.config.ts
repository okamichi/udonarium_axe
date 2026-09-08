import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: '.',
  testMatch: ['automation.spec.ts', 'mcp.spec.mts'],
  timeout: 45000,
  workers: 1,
  use: { baseURL: 'http://localhost:4310', viewport: { width: 1280, height: 900 }, trace: 'retain-on-failure' },
  webServer: {
    command: 'E2E_PORT=4310 E2E_DIST=tmp/automation-e2e/browser node e2e/serve-dist.mjs',
    cwd: '../..',
    url: 'http://localhost:4310',
    reuseExistingServer: false,
  },
});
