import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// ---------------------------------------------------------------------------
// Mock next-intl so translations resolve synchronously in tests.
// Supports dot-notation keys (e.g. t('krimispiele.title')) by walking the
// namespace object depth-first.
// ---------------------------------------------------------------------------
vi.mock('next-intl', async () => {
  const en = (await import('../../messages/en.json')).default as Record<string, unknown>

  function getByPath(obj: Record<string, unknown>, path: string): string {
    const parts = path.split('.')
    let current: unknown = obj
    for (const part of parts) {
      if (current === null || typeof current !== 'object') return path
      current = (current as Record<string, unknown>)[part]
    }
    return typeof current === 'string' ? current : path
  }

  return {
    useTranslations: (namespace: string) => {
      const ns = (en[namespace] ?? {}) as Record<string, unknown>
      return (key: string) => getByPath(ns, key)
    },
    useLocale: () => 'en',
  }
})

// ---------------------------------------------------------------------------
// Mock next/image — renders a plain <img> so alt text is queryable in tests.
// ---------------------------------------------------------------------------
vi.mock('next/image', async () => {
  const { createElement } = await import('react')
  return {
    default: ({ src, alt }: { src: string; alt: string }) =>
      createElement('img', { src, alt }),
  }
})

// ---------------------------------------------------------------------------
// Mock next/navigation — provide no-op stubs for hook dependencies.
// ---------------------------------------------------------------------------
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useParams: () => ({ locale: 'en' }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}))

// ---------------------------------------------------------------------------
// Mock @/i18n/navigation — render Link as a plain anchor so href is queryable.
// ---------------------------------------------------------------------------
vi.mock('@/i18n/navigation', async () => {
  const { createElement } = await import('react')
  return {
    Link: ({
      href,
      children,
      ...rest
    }: {
      href: string
      children: unknown
      [key: string]: unknown
    }) => createElement('a', { href, ...rest }, children as never),
    usePathname: () => '/',
    useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  }
})

// Clean up the DOM after each test to avoid cross-test leakage.
afterEach(() => {
  cleanup()
})

// ---------------------------------------------------------------------------
// In-memory localStorage — jsdom's implementation is unreliable in some envs.
// ---------------------------------------------------------------------------
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      const { [key]: _, ...rest } = store
      store = rest
    },
    clear: () => {
      store = {}
    },
    get length() {
      return Object.keys(store).length
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

// Reset localStorage and theme class before each test so tests are isolated.
beforeEach(() => {
  localStorageMock.clear()
  document.documentElement.classList.remove('dark')
})

// Provide a minimal matchMedia stub (jsdom omits it).
window.matchMedia = ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
})) as unknown as typeof window.matchMedia

// Provide a no-op ResizeObserver for components that rely on it.
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
