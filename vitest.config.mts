import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import AllureReporter from 'allure-vitest/reporter'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // Pin the project root to the directory containing vitest.config.mts.
    // Without this, Vitest's searchForWorkspaceRoot walks up to the git root
    // (one level above on CI runners that check out into a workspace dir),
    // causing setupFiles and other relative paths to resolve against the wrong
    // directory. Identical fix applied to HomeUI in PR #113.
    root: path.resolve(__dirname, '.'),
    environment: 'jsdom',
    setupFiles: process.env.ALLURE_RESULTS_DIR
      ? ['allure-vitest/setup', path.resolve(__dirname, './src/test/setup.ts')]
      : [path.resolve(__dirname, './src/test/setup.ts')],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
    reporters: process.env.ALLURE_RESULTS_DIR
      ? [
          'verbose',
          new AllureReporter({ resultsDir: process.env.ALLURE_RESULTS_DIR }),
        ]
      : ['verbose'],
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: [
        'src/test/**',
        'src/**/*.test.tsx',
        'src/**/*.test.ts',
        'src/app/**',
        'src/i18n/**',
        'src/proxy.ts',
      ],
      reporter: ['text', 'cobertura'],
      reportsDirectory: 'reports',
    },
  },
})
