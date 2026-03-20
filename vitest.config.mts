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
    environment: 'jsdom',
    setupFiles: process.env.ALLURE_RESULTS_DIR
      ? ['allure-vitest/setup', './src/test/setup.ts']
      : ['./src/test/setup.ts'],
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
