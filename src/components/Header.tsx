'use client';

import {useState, useEffect, useRef} from 'react';
import {Github, Linkedin} from 'lucide-react';
import {usePathname} from '@/i18n/navigation';
import {Link} from '@/i18n/navigation';
import {LanguageSwitcher} from './LanguageSwitcher';
import {ThemeToggle} from './ThemeToggle';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
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
    <header
      className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4  transition-all duration-300 ${
        hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Name/logo — left side */}
      {isHome ? (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
          }}
          className="font-heading text-lg font-bold text-gradient"
        >
          GK
        </a>
      ) : (
        <Link href="/" className="font-heading text-lg font-bold text-gradient">
          GK
        </Link>
      )}

      {/* Right side — social icons + theme toggle + language pill */}
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/Tannjev922"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-text-primary transition-colors"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/gregor-krykon-11007428a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-text-primary transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
