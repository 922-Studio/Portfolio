'use client';

import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {useState} from 'react';

const PHOTOS = [
  '/images/about/photo1.JPG',
  '/images/about/photo2.JPG',
  '/images/about/photo3.JPG',
];

const POSITIONS = [
  // Back-left
  'left-0 top-4 h-36 w-28 -rotate-6 z-10',
  // Center (largest, front)
  'left-1/2 top-1/2 h-52 w-40 -translate-x-1/2 -translate-y-1/2 rotate-2 z-30',
  // Front-right
  'bottom-4 right-0 h-36 w-28 rotate-3 z-20',
];

export function AboutSection() {
  const t = useTranslations('about');
  const [order, setOrder] = useState([0, 1, 2]);

  const rotate = () => {
    setOrder((prev) => [prev[2], prev[0], prev[1]]);
  };

  return (
    <section id="about" className="px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h2>

      <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Left column: text */}
        <div className="lg:flex-1 flex flex-col gap-4">
          <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
            {t('body1')}
          </p>
          <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
            {t('body2')}
          </p>
          <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
            {t('body3')}
          </p>
          <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
            {t('body4')}
          </p>
        </div>

        {/* Right column: clickable photo stack */}
        <div
          className="relative mx-auto h-72 w-64 cursor-pointer lg:h-80 lg:w-72"
          onClick={rotate}
        >
          {order.map((photoIdx, posIdx) => (
            <div
              key={photoIdx}
              className={`absolute overflow-hidden rounded-xl border border-border transition-all duration-500 ease-in-out ${POSITIONS[posIdx]}`}
            >
              <Image src={PHOTOS[photoIdx]} alt="" fill className="object-cover" />
            </div>
          ))}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-text-muted whitespace-nowrap">
            {t('photos_label')}
          </span>
        </div>
      </div>
    </section>
  );
}
