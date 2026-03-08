'use client';

import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';

const TAG_DOCS: Record<string, string> = {
  Shopware: 'https://docs.shopware.com',
  PHP: 'https://www.php.net/docs.php',
  'all-inkl': 'https://all-inkl.com/info/',
  WordPress: 'https://developer.wordpress.org',
  HTML: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  JavaScript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  React: 'https://react.dev',
  'Node.js': 'https://nodejs.org/en/docs',
  'Socket.io': 'https://socket.io/docs/v4/',
  Docker: 'https://docs.docker.com',
  'GitHub Actions': 'https://docs.github.com/en/actions',
};

const PROJECTS = [
  {
    key: 'sweatvalley_bingo',
    image: '/images/projects/sweatvalley-bingo.png',
    tags: ['React', 'Node.js', 'Socket.io', 'Docker', 'GitHub Actions'],
    liveUrl: 'https://sweatvalley-bingo.922-studio.com',
    repoUrl: 'https://github.com/922-Studio/sweatvalley_bingo',
  },
  {
    key: 'krimispiele',
    image: '/images/projects/krimispiel.png',
    tags: ['Shopware', 'PHP', 'all-inkl'],
    liveUrl: 'https://krimispiele.com',
  },
  {
    key: 'samhain',
    image: '/images/projects/samhain.png',
    tags: ['WordPress', 'PHP', 'all-inkl'],
    liveUrl: 'https://samhain-verlag.de',
  },
  {
    key: 'krimidinnerverzeichnis',
    image: '/images/projects/krimidinnerverzeichnis.png',
    tags: ['HTML', 'JavaScript', 'all-inkl'],
    liveUrl: 'https://krimidinnerverzeichnis.de',
  },
];

export function ProjectsSection() {
  const t = useTranslations('projects');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      const cardWidth = container.firstElementChild
        ? container.firstElementChild.clientWidth + 24 // gap-6 = 24px
        : 320;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 1) {
        container.scrollTo({left: 0, behavior: 'smooth'});
      } else {
        container.scrollBy({left: cardWidth, behavior: 'smooth'});
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section id="projects" className="px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h2>
      <div
        ref={scrollRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        className="mx-auto mt-12 flex max-w-5xl gap-6 overflow-x-auto scrollbar-hide"
      >
        {PROJECTS.map((project) => (
          <div
            key={project.key}
            className="flex w-80 flex-shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-surface transition hover:border-accent-from/50"
          >
            {/* Clickable area — links to live project */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 flex-col"
            >
              {/* Project screenshot */}
              <div className="relative aspect-video bg-surface-hover">
                <Image
                  src={project.image}
                  alt={t(`${project.key}.title`)}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Content */}
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="font-heading text-lg font-semibold">
                  {t(`${project.key}.title`)}
                </h3>
                <p className="text-sm text-text-secondary">
                  {t(`${project.key}.desc`)}
                </p>
              </div>
            </a>
            {/* Links row */}
            <div className="flex items-center gap-3 border-t border-border px-5 py-2">
              {/* Tags — each links to official docs */}
              <div className="flex flex-1 flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <a
                    key={tag}
                    href={TAG_DOCS[tag]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-accent-from/15 px-2.5 py-0.5 text-xs text-accent-from transition hover:bg-accent-from/30"
                  >
                    {tag}
                  </a>
                ))}
              </div>
              {/* GitHub repo link if available */}
              {'repoUrl' in project && project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-text-secondary transition hover:text-accent-from"
                  title="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
