import {
  SiPython,
  SiNextdotjs,
  SiVuedotjs,
  SiDocker,
  SiKubernetes,
  SiRedis,
  SiVite,
  SiTailwindcss,
  SiGithubactions,
  SiGrafana,
  SiHelm,
  SiPrometheus,
  SiDigitalocean,
  SiAnthropic,
  SiGoogle,
  SiShopware,
  SiWordpress,
} from 'react-icons/si';
import {useTranslations} from 'next-intl';
import type {IconType} from 'react-icons';

type StackItem = {Icon: IconType | null; label: string; color: string; lightColor?: string; customIcon?: string; docUrl: string};

const CATEGORIES: {key: string; items: StackItem[]}[] = [
  {
    key: 'development',
    items: [
      {Icon: SiPython,      label: 'Python',    color: '#3776AB', docUrl: 'https://docs.python.org/3/'},
      {Icon: SiNextdotjs,   label: 'Next.js',   color: 'currentColor', docUrl: 'https://nextjs.org/docs'},
      {Icon: SiVuedotjs,    label: 'Vue.js',    color: '#4FC08D', docUrl: 'https://vuejs.org/guide/introduction'},
      {Icon: SiVite,        label: 'Vite',      color: '#646CFF', docUrl: 'https://vite.dev/guide/'},
      {Icon: SiTailwindcss, label: 'Tailwind',  color: '#06B6D4', docUrl: 'https://tailwindcss.com/docs'},
      {Icon: SiShopware,    label: 'Shopware',  color: '#189EFF', docUrl: 'https://docs.shopware.com'},
      {Icon: SiWordpress,   label: 'WordPress', color: '#21759B', docUrl: 'https://developer.wordpress.org'},
    ],
  },
  {
    key: 'infrastructure',
    items: [
      {Icon: SiDocker,        label: 'Docker',         color: '#2496ED', docUrl: 'https://docs.docker.com'},
      {Icon: SiKubernetes,    label: 'Kubernetes',     color: '#326CE5', docUrl: 'https://kubernetes.io/docs/'},
      {Icon: SiRedis,         label: 'Redis',          color: '#FF4438', docUrl: 'https://redis.io/docs/'},
      {Icon: SiHelm,          label: 'Helm',           color: '#2D3FC5', lightColor: '#0F1689', docUrl: 'https://helm.sh/docs/'},
      {Icon: null,            label: 'Linux',          color: '#FCC624', customIcon: '/icons/tux.svg', docUrl: 'https://www.kernel.org/doc/html/latest/'},
      {Icon: SiGithubactions, label: 'GitHub Actions', color: '#2088FF', docUrl: 'https://docs.github.com/en/actions'},
      {Icon: SiGrafana,       label: 'Grafana',        color: '#F46800', docUrl: 'https://grafana.com/docs/grafana/latest/'},
      {Icon: SiPrometheus,    label: 'Prometheus',     color: '#E6522C', docUrl: 'https://prometheus.io/docs/'},
    ],
  },
  {
    key: 'hosting',
    items: [
      {Icon: SiDigitalocean, label: 'DigitalOcean',     color: '#0080FF', docUrl: 'https://docs.digitalocean.com'},
      {Icon: null,           label: 'all-inkl',         color: '#E30613', docUrl: 'https://all-inkl.com/info/'},
      {Icon: SiAnthropic,    label: 'Claude',           color: '#D4A574', docUrl: 'https://docs.anthropic.com'},
      {Icon: SiGoogle,       label: 'Google Workspace', color: '#4285F4', docUrl: 'https://workspace.google.com'},
    ],
  },
];

export function StackSection() {
  const t = useTranslations('stack');

  return (
    <section id="stack" className="px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h2>

      <div className="mx-auto mt-12 max-w-3xl space-y-12">
        {CATEGORIES.map(({key, items}) => (
          <div key={key}>
            <h3 className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-text-muted">
              {t(`categories.${key}`)}
            </h3>
            <div className="grid grid-cols-3 gap-8 sm:grid-cols-4 sm:gap-10 lg:grid-cols-7">
              {items.map(({Icon, label, color, lightColor, customIcon, docUrl}) => (
                <a
                  key={label}
                  href={docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3"
                >
                  <div className="rounded-xl bg-surface p-4 transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                    {customIcon ? (
                      <img src={customIcon} alt={label} width={32} height={32} className="h-8 w-8" />
                    ) : Icon ? (
                      <Icon size={32} color={lightColor ? undefined : color} style={lightColor ? {'--icon-light': lightColor, '--icon-dark': color} as React.CSSProperties : undefined} className={lightColor ? 'stack-icon-themed' : undefined} />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center text-xs font-bold" style={{color}}>
                        ai
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-text-secondary text-center">{label}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
