'use client';

import {useTranslations} from 'next-intl';
import {SiCoursera, SiGooglecloud} from 'react-icons/si';

const CERTIFICATIONS = [
  {
    key: 'gen_ai_beyond_chatbot',
    issuerIcon: SiGooglecloud,
    issuerColor: '#4285F4',
    platformIcon: SiCoursera,
    platformColor: '#0056D2',
    verifyUrl: 'https://coursera.org/verify/F8W0F3S0PE3P',
    series: 'generative_ai_for_leaders',
  },
];

export function CertificationsSection() {
  const t = useTranslations('certifications');

  return (
    <section id="certifications" className="px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h2>

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        {CERTIFICATIONS.map((cert) => {
          const IssuerIcon = cert.issuerIcon;
          const PlatformIcon = cert.platformIcon;

          return (
            <a
              key={cert.key}
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
            >
              <div className="flex items-center justify-between">
                <IssuerIcon size={28} color={cert.issuerColor} />
                <PlatformIcon size={20} color={cert.platformColor} />
              </div>

              <h3 className="mt-4 font-heading text-lg font-semibold leading-snug">
                {t(`${cert.key}.name`)}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {t(`${cert.key}.issuer`)}
              </p>
              <p className="mt-0.5 text-xs text-text-muted">
                {t(`${cert.key}.date`)}
              </p>

              {cert.series && (
                <p className="mt-3 text-xs text-text-muted italic">
                  {t(`series.${cert.series}`)}
                </p>
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
}
