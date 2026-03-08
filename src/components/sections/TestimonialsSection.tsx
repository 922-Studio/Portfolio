'use client';

import {useTranslations} from 'next-intl';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    key: 'soenke',
    image: '/images/testimonials/soenke.webp',
  },
];

export function TestimonialsSection() {
  const t = useTranslations('testimonials');

  return (
    <section id="testimonials" className="px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h2>
      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-8">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.key}
            className="rounded-xl border border-border bg-surface p-6 sm:p-8"
          >
            <blockquote className="text-base leading-relaxed text-text-secondary sm:text-lg">
              &ldquo;{t(`${item.key}.quote`)}&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                  src={item.image}
                  alt={t(`${item.key}.name`)}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-heading font-semibold">
                  {t(`${item.key}.name`)}
                </p>
                <p className="text-sm text-text-secondary">
                  {t(`${item.key}.role`)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
