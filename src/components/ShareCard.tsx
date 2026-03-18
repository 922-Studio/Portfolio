'use client';

import {useState, useEffect, useCallback} from 'react';
import {X, Share2} from 'lucide-react';
import {useTranslations, useLocale} from 'next-intl';
import Image from 'next/image';

export function ShareCard() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('share');
  const locale = useLocale();

  const qrSrc = locale === 'de' ? '/images/qr-de.svg' : '/images/qr-en.svg';
  const siteUrl = `gregor.922-studio.com/${locale}`;

  const close = useCallback(() => setOpen(false), []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Share button — used inline among social icons */}
      <button
        onClick={() => setOpen(true)}
        className="text-text-muted transition hover:text-text-primary"
        aria-label={t('button_label')}
      >
        <Share2 size={24} />
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={close}
        >
          {/* Card */}
          <div
            className="relative w-full max-w-[320px] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient header */}
            <div className="bg-gradient-to-br from-accent-from to-accent-to px-6 pt-8 pb-6 text-center text-white">
              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-3 right-3 rounded-full bg-white/20 p-1.5 transition hover:bg-white/30"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <h3 className="font-heading text-2xl font-bold tracking-tight">
                Gregor Krykon
              </h3>
              <p className="mt-1 text-sm font-medium text-white/85">
                Automation Engineer · Full-Stack Dev
              </p>
              <p className="mt-3 text-xs italic text-white/70">
                {t('tagline')}
              </p>
            </div>

            {/* QR + Info body */}
            <div className="bg-surface px-6 py-6 text-center">
              {/* QR Code */}
              <div className="mx-auto w-48 h-48 rounded-xl bg-white p-3 shadow-md">
                <Image
                  src={qrSrc}
                  alt={t('qr_alt')}
                  width={192}
                  height={192}
                  className="h-full w-full dark:invert-0"
                  priority
                />
              </div>

              {/* URL */}
              <p className="mt-4 text-sm font-medium text-text-secondary">
                {siteUrl}
              </p>

              {/* Scan hint */}
              <p className="mt-2 text-xs text-text-muted">
                {t('scan_hint')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
