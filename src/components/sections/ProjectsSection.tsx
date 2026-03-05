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
};

const PROJECTS = [
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
            {/* Tags — each links to official docs */}
            <div className="flex flex-wrap gap-2 border-t border-border px-5 py-3">
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
          </div>
        ))}
      </div>
    </section>
  );
}
