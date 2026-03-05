import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {ArrowLeft, Mail} from 'lucide-react';
import {Link} from '@/i18n/navigation';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'impressum'});

  return {
    title: `${t('title')} — 922 Studio`,
    description: t('subheading'),
    robots: {index: true, follow: true},
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function ImpressumPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'impressum'});

  return (
    <section className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      {/* Back link */}
      <Link
        href="/"
        className="group mb-12 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-primary"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        {t('back')}
      </Link>

      {/* Heading */}
      <h1 className="font-heading text-3xl font-bold text-gradient sm:text-4xl">
        {t('heading')}
      </h1>
      <p className="mt-2 text-text-muted">{t('subheading')}</p>

      <div className="mt-12 space-y-10">
        {/* Responsible */}
        <div>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            {t('responsible')}
          </h2>
          <div className="mt-3 rounded-xl border border-border bg-surface p-5">
            <p className="font-semibold text-text-primary">{t('name')}</p>
            <p className="text-sm text-text-muted">{t('brand')}</p>
            <div className="mt-3 text-sm text-text-secondary">
              <p>{t('address_line1')}</p>
              <p>{t('address_line2')}</p>
              <p>{t('address_country')}</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            {t('contact_heading')}
          </h2>
          <div className="mt-3 rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-text-muted" />
              <div>
                <p className="text-xs text-text-muted">{t('email_label')}</p>
                <a
                  href={`mailto:${t('email')}`}
                  className="text-sm text-text-secondary underline transition-colors hover:text-text-primary"
                >
                  {t('email')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Liability */}
        <div>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            {t('liability_heading')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {t('liability_text')}
          </p>
        </div>

        {/* Dispute resolution */}
        <div>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            {t('dispute_heading')}
          </h2>
          <div className="mt-3 space-y-2 text-sm leading-relaxed text-text-secondary">
            <p>
              {t('dispute_text')}{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-text-primary"
              >
                {t('dispute_link_text')}
              </a>
            </p>
            <p>{t('dispute_note')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
