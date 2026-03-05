'use client';

import {Sun, Moon} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {useTheme} from './ThemeProvider';

export function ThemeToggle() {
  const t = useTranslations('theme');
  const {theme, toggleTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-2 text-text-secondary transition-colors hover:text-text-primary"
      aria-label={isDark ? t('toggle_light') : t('toggle_dark')}
    >
      {mounted ? (
        isDark ? <Sun size={20} /> : <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
}
