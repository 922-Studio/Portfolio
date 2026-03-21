'use client';

import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {useCallback, useEffect, useRef, useState} from 'react';

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

const CARD_WIDTH_SM = 280; // mobile
const CARD_WIDTH_LG = 320; // sm+
const GAP = 24; // gap-6

export function ProjectsSection() {
  const t = useTranslations('projects');
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(PROJECTS.length);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [paused, setPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH_LG);
  const touchStartX = useRef(0);

  const totalSlides = PROJECTS.length;
  const slides = [...PROJECTS, ...PROJECTS, ...PROJECTS];
  const step = cardWidth + GAP;

  // Measure container width + determine card size
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      setCardWidth(window.innerWidth < 640 ? CARD_WIDTH_SM : CARD_WIDTH_LG);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Center the current card in the viewport
  const offset = (containerWidth - cardWidth) / 2 - currentIndex * step;

  const goNext = useCallback(() => {
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const goPrev = useCallback(() => {
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // After transition ends, snap back to middle set if needed
  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.propertyName !== 'transform') return;
      if (currentIndex >= totalSlides * 2) {
        setTransitionEnabled(false);
        setCurrentIndex((prev) => prev - totalSlides);
      } else if (currentIndex < totalSlides) {
        setTransitionEnabled(false);
        setCurrentIndex((prev) => prev + totalSlides);
      }
    },
    [currentIndex, totalSlides],
  );

  // Pause when tab is hidden to prevent index drifting while transitions can't fire
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setPaused(true);
      } else {
        // Normalize index back to middle set before resuming
        setTransitionEnabled(false);
        setCurrentIndex((prev) => {
          const normalized = ((prev - totalSlides) % totalSlides + totalSlides) % totalSlides + totalSlides;
          return normalized;
        });
        setPaused(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [totalSlides]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [paused, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setPaused(false);
  };

  return (
    <section id="projects" className="px-6 py-20 sm:px-20">
      <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h2>

      <div
        className="relative mx-auto mt-12 max-w-5xl"
      >
        {/* Carousel viewport */}
        <div ref={containerRef} className="overflow-hidden py-2">
          <div
            className={`flex gap-6 ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{transform: `translateX(${offset}px)`}}
            onTransitionEnd={handleTransitionEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((project, i) => (
              <div
                key={`${project.key}-${i}`}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="flex flex-shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-accent-from/40 hover:shadow-md hover:shadow-accent-from/10"
                style={{width: `${cardWidth}px`}}
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 flex-col"
                >
                  <div className="relative aspect-video bg-surface-hover">
                    <Image
                      src={project.image}
                      alt={t(`${project.key}.title`)}
                      fill
                      className="object-cover"
                    />
                  </div>
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
        </div>

        {/* Left arrow */}
        <button
          onClick={goPrev}
          aria-label="Previous project"
          className="absolute left-0 sm:-left-14 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-surface/80 sm:bg-surface/40 p-2 opacity-70 sm:opacity-50 backdrop-blur-sm transition hover:bg-surface/70 hover:opacity-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right arrow */}
        <button
          onClick={goNext}
          aria-label="Next project"
          className="absolute right-0 sm:-right-14 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-surface/80 sm:bg-surface/40 p-2 opacity-70 sm:opacity-50 backdrop-blur-sm transition hover:bg-surface/70 hover:opacity-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
