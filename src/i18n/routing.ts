import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'de',
  // German is the default for everyone; English only via /en or the language switcher
  localeDetection: false,
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365  // 1 year persistence per user decision
  }
});
