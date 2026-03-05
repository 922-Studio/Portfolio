'use client';

import {Link, usePathname} from '@/i18n/navigation';
import {useParams} from 'next/navigation';

export function LanguageSwitcher() {
  const params = useParams();
  const currentLocale = params.locale as string;
  const pathname = usePathname();

  return (
    <div className="relative flex items-center rounded-full border border-border bg-surface/50 p-0.5 text-sm">
      {/* Sliding indicator — absolutely positioned behind active label */}
      <div
        className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-accent-from/20 transition-transform duration-300 ease-in-out"
        style={{
          transform: currentLocale === 'de' ? 'translateX(calc(100% + 4px))' : 'translateX(0)',
        }}
      />
      <Link
        href={pathname}
        locale="en"
        scroll={false}
        className={`relative z-10 px-3 py-1 rounded-full font-medium transition-colors duration-200 ${
          currentLocale === 'en' ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        EN
      </Link>
      <Link
        href={pathname}
        locale="de"
        scroll={false}
        className={`relative z-10 px-3 py-1 rounded-full font-medium transition-colors duration-200 ${
          currentLocale === 'de' ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        DE
      </Link>
    </div>
  );
}
