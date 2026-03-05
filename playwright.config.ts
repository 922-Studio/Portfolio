import {defineConfig, devices} from '@playwright/test';

const port = process.env.CI ? 3099 : 3098;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['html'], ['allure-playwright', {outputFolder: 'allure-results'}]]
    : 'html',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
  ],
  webServer: {
    command: `mkdir -p .next/standalone/.next && cp -r .next/static .next/standalone/.next/static && cp -r public .next/standalone/public && PORT=${port} node .next/standalone/server.js`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  },
});
