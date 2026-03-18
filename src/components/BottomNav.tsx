'use client';

import {useState, useEffect, useRef} from 'react';
import {Home, User, Layers, FolderOpen, MessageCircle, Mail} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {usePathname} from '@/i18n/navigation';
import {Link} from '@/i18n/navigation';

const navItems = [
  {key: 'home', icon: Home, hash: ''},
  {key: 'about', icon: User, hash: '#about'},
  {key: 'stack', icon: Layers, hash: '#stack'},
  {key: 'projects', icon: FolderOpen, hash: '#projects'},
  {key: 'testimonials', icon: MessageCircle, hash: '#testimonials'},
  {key: 'contact', icon: Mail, hash: '#contact'},
];

export function BottomNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const isHome = pathname === '/';
  const alwaysVisible = !isHome;
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (alwaysVisible) return;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 50) {
        setHidden(false);
      } else if (currentY < lastScrollY.current) {
        setHidden(false); // scrolling up
      } else {
        setHidden(true); // scrolling down
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, [alwaysVisible]);

  return (
    <nav
      data-always-visible={alwaysVisible || undefined}
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-md transition-all duration-300 ${
        !alwaysVisible && hidden ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const className = "flex flex-col items-center gap-0.5 px-1.5 sm:px-3 py-1.5 rounded-xl text-[10px] sm:text-xs transition-colors bg-accent-from/15 text-accent-from min-w-0";

          if (isHome) {
            return (
              <a
                key={item.key}
                href={item.hash || '#'}
                className={className}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span>{t(item.key)}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.key}
              href={`/${item.hash}`}
              className={className}
            >
              <Icon size={20} strokeWidth={1.5} />
              <span>{t(item.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
