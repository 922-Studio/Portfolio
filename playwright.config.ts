import {defineConfig, devices} from '@playwright/test';

const isCI = !!process.env.CI;
const port = isCI ? 3099 : 3098;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI
    ? [
        ['list'],
        ['allure-playwright', {outputFolder: 'allure-results'}],
      ]
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
    reuseExistingServer: !isCI,
  },
});
