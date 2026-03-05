import {useTranslations} from 'next-intl';
import {Mail, Github, Linkedin} from 'lucide-react';
import {SiDiscord, SiTelegram, SiWhatsapp} from 'react-icons/si';

export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h2>

      <div className="mx-auto mt-8 max-w-md text-center">
        <p className="text-text-secondary">{t('text')}</p>

        <a
          href="mailto:gregor@922-studio.com"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-from px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          <Mail size={18} />
          {t('email_label')}
        </a>

        <div className="mt-6 flex justify-center gap-6">
          <a
            href="https://github.com/Tannjev922"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition hover:text-text-primary"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/gregor-krykon-11007428a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition hover:text-text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://discord.com/users/tannjev922"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition hover:text-text-primary"
            aria-label="Discord"
          >
            <SiDiscord size={24} />
          </a>
          <a
            href="https://t.me/Gregor_0203"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition hover:text-text-primary"
            aria-label="Telegram"
          >
            <SiTelegram size={24} />
          </a>
          <a
            href="https://wa.me/4915737997074"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition hover:text-text-primary"
            aria-label="WhatsApp"
          >
            <SiWhatsapp size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
