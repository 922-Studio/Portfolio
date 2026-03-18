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
          {/* Card — fully gradient, wider padding */}
          <div
            className="relative w-full max-w-[340px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 rounded-full bg-white/20 p-1.5 transition hover:bg-white/30"
              aria-label="Close"
            >
              <X size={16} className="text-white" />
            </button>

            {/* Name & Title */}
            <div className="text-center text-white mt-2">
              <h3 className="font-heading text-2xl font-bold tracking-tight">
                Gregor Krykon
              </h3>
              <p className="mt-1 text-sm font-medium text-white/80">
                Automation Engineer · Full-Stack Dev
              </p>
            </div>

            {/* Tagline */}
            <p className="mt-4 text-center text-xs italic text-white/65">
              &ldquo;{t('tagline')}&rdquo;
            </p>

            {/* QR Code — white card inset */}
            <div className="mx-auto mt-6 w-48 h-48 rounded-2xl bg-white p-3 shadow-lg">
              <Image
                src={qrSrc}
                alt={t('qr_alt')}
                width={192}
                height={192}
                className="h-full w-full"
                priority
              />
            </div>

            {/* URL */}
            <p className="mt-5 text-center text-sm font-semibold text-white/90">
              {siteUrl}
            </p>

            {/* Scan hint */}
            <p className="mt-1.5 text-center text-xs text-white/50">
              {t('scan_hint')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
