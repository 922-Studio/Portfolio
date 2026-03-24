import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Space_Grotesk, Inter} from 'next/font/google';
import {Header} from '@/components/Header';
import {BottomNav} from '@/components/BottomNav';
import {Footer} from '@/components/Footer';
import {Background} from '@/components/Background';
import {GoogleAnalytics} from '@/components/GoogleAnalytics';
import {ThemeProvider} from '@/components/ThemeProvider';
import '../globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

const descriptions: Record<string, string> = {
  en: 'I automate the tedious, build the essential — and ship things that keep running. Full-stack developer based in Bavaria, Germany.',
  de: 'Ich automatisiere das Mühsame, baue das Wesentliche — und liefere Dinge, die laufen. Full-Stack-Entwickler aus Bayern.',
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const description = descriptions[locale] ?? descriptions.en;
  const url = `https://gregor.922-studio.com/${locale}`;

  return {
    title: 'Gregor Krykon — Automation Engineer & Full-Stack Developer',
    description,
    alternates: {
      canonical: url,
      languages: {
        en: 'https://gregor.922-studio.com/en',
        de: 'https://gregor.922-studio.com/de',
        'x-default': 'https://gregor.922-studio.com/en',
      },
    },
    openGraph: {
      title: 'Gregor Krykon — Automation Engineer & Full-Stack Developer',
      description,
      url,
      siteName: 'Gregor Krykon',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Gregor Krykon',
      jobTitle: 'Automation Engineer & Full-Stack Developer',
      url: 'https://gregor.922-studio.com',
      email: 'gregor.krykon@922-studio.com',
      sameAs: [
        'https://github.com/Tannjev922',
        'https://www.linkedin.com/in/gregor-krykon-11007428a/',
        'https://www.xing.com/profile/Gregor_Krykon',
        'https://g.dev/krykon-gregor',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Grafing bei München',
        addressRegion: 'Bavaria',
        addressCountry: 'Germany',
      },
      knowsAbout: [
        'Python', 'Next.js', 'Vue.js', 'FastAPI', 'Docker', 'Kubernetes',
        'Helm', 'GitHub Actions', 'Playwright', 'Tailwind CSS', 'Shopware', 'WordPress',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Gregor Krykon',
      url: 'https://gregor.922-studio.com',
      description: descriptions[locale] ?? descriptions.en,
    },
  ];

  return (
    <html lang={locale} className={`dark ${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{__html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}}catch(e){}})()`}}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
      </head>
      <body className="font-body bg-background text-text-primary min-h-screen antialiased">
        <GoogleAnalytics />
        <ThemeProvider>
          <NextIntlClientProvider>
            <Background />
            <Header />
            <main className="relative z-10 pt-16 pb-20">
              {children}
            </main>
            <Footer />
            <BottomNav />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
