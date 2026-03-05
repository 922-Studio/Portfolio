import {Github, Linkedin} from 'lucide-react';
import {LanguageSwitcher} from './LanguageSwitcher';
import {ThemeToggle} from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4">
      {/* Name/logo — left side */}
      <a href="#" className="font-heading text-lg font-bold text-gradient">
        GK
      </a>

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
