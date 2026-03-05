'use client';

import {useState, useEffect, useRef} from 'react';
import {Home, User, Layers, FolderOpen, Mail} from 'lucide-react';
import {useTranslations} from 'next-intl';

const navItems = [
  {key: 'home', icon: Home, href: '#'},
  {key: 'about', icon: User, href: '#about'},
  {key: 'stack', icon: Layers, href: '#stack'},
  {key: 'projects', icon: FolderOpen, href: '#projects'},
  {key: 'contact', icon: Mail, href: '#contact'},
];

export function BottomNav() {
  const t = useTranslations('nav');
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
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
  }, []);

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-md transition-all duration-300 ${
        hidden ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.key}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs transition-colors bg-accent-from/15 text-accent-from"
            >
              <Icon size={20} strokeWidth={1.5} />
              <span>{t(item.key)}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
