import {
  SiPython,
  SiPytest,
  SiNextdotjs,
  SiDocker,
  SiGit,
  SiKubernetes,
  SiRedis,
  SiGithubactions,
  SiGrafana,
  SiHelm,
  SiPrometheus,
  SiClaude,
  SiModelcontextprotocol,
  SiShopware,
  SiWordpress,
  SiFastapi,
  SiTypescript,
  SiReact,
  SiFlutter,
  SiPostgresql,
} from 'react-icons/si';
import {LuFactory, LuLayers, LuMessageSquareCode, LuRepeat, LuWorkflow} from 'react-icons/lu';
import {useTranslations} from 'next-intl';
import type {IconType} from 'react-icons';

type StackItem = {Icon: IconType | null; label: string; color: string; lightColor?: string; customIcon?: string; docUrl: string};

// Concept tiles without a brand icon use the accent colour.
const ACCENT = '#6366F1';

// Tiers are deliberately honest: "daily" = at work and in my own projects,
// "practical" = used at work or in my own projects, "familiar" = first experience.
const CATEGORIES: {key: string; items: StackItem[]}[] = [
  {
    key: 'ai',
    items: [
      {Icon: SiClaude,               label: 'Claude Code',         color: '#D97757', docUrl: 'https://code.claude.com/docs/en/overview'},
      {Icon: LuWorkflow,             label: 'Agent Harness',       color: ACCENT, docUrl: 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents'},
      {Icon: LuRepeat,               label: 'Loop Engineering',    color: ACCENT, docUrl: 'https://addyosmani.com/blog/loop-engineering/'},
      {Icon: LuFactory,              label: 'Factory Engineering', color: ACCENT, docUrl: 'https://nodewar.922-studio.com'},
      {Icon: LuLayers,               label: 'Context Engineering', color: ACCENT, docUrl: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents'},
      {Icon: LuMessageSquareCode,    label: 'Prompt Engineering',  color: ACCENT, docUrl: 'https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview'},
      {Icon: SiModelcontextprotocol, label: 'MCP',                 color: 'currentColor', docUrl: 'https://modelcontextprotocol.io'},
    ],
  },
  {
    key: 'daily',
    items: [
      {Icon: SiPython,        label: 'Python',         color: '#3776AB', docUrl: 'https://docs.python.org/3/'},
      {Icon: SiPytest,        label: 'Pytest',         color: '#0A9EDC', docUrl: 'https://docs.pytest.org'},
      {Icon: null,            label: 'Playwright',     color: '#2EAD33', docUrl: 'https://playwright.dev/docs/intro'},
      {Icon: SiGithubactions, label: 'GitHub Actions', color: '#2088FF', docUrl: 'https://docs.github.com/en/actions'},
      {Icon: SiGit,           label: 'Git',            color: '#F05032', docUrl: 'https://git-scm.com/doc'},
      {Icon: SiDocker,        label: 'Docker',         color: '#2496ED', docUrl: 'https://docs.docker.com'},
      {Icon: null,            label: 'Linux',          color: '#FCC624', customIcon: '/icons/tux.svg', docUrl: 'https://www.kernel.org/doc/html/latest/'},
    ],
  },
  {
    key: 'practical',
    items: [
      {Icon: null,         label: 'Allure',     color: '#A855F7', docUrl: 'https://allurereport.org/docs/'},
      {Icon: SiPrometheus, label: 'Prometheus', color: '#E6522C', docUrl: 'https://prometheus.io/docs/'},
      {Icon: SiGrafana,    label: 'Grafana',    color: '#F46800', docUrl: 'https://grafana.com/docs/grafana/latest/'},
      {Icon: SiFastapi,    label: 'FastAPI',    color: '#009688', docUrl: 'https://fastapi.tiangolo.com'},
      {Icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1', docUrl: 'https://www.postgresql.org/docs/'},
      {Icon: SiKubernetes, label: 'Kubernetes', color: '#326CE5', docUrl: 'https://kubernetes.io/docs/'},
      {Icon: SiHelm,       label: 'Helm',       color: '#2D3FC5', lightColor: '#0F1689', docUrl: 'https://helm.sh/docs/'},
      {Icon: SiShopware,   label: 'Shopware',   color: '#189EFF', docUrl: 'https://docs.shopware.com'},
      {Icon: SiWordpress,  label: 'WordPress',  color: '#21759B', docUrl: 'https://developer.wordpress.org'},
      {Icon: SiReact,      label: 'React',      color: '#61DAFB', docUrl: 'https://react.dev'},
    ],
  },
  {
    key: 'familiar',
    items: [
      {Icon: SiTypescript, label: 'TypeScript', color: '#3178C6', docUrl: 'https://www.typescriptlang.org/docs/'},
      {Icon: SiNextdotjs,  label: 'Next.js',    color: 'currentColor', docUrl: 'https://nextjs.org/docs'},
      {Icon: SiFlutter,    label: 'Flutter',    color: '#02569B', docUrl: 'https://docs.flutter.dev'},
      {Icon: SiRedis,      label: 'Redis',      color: '#FF4438', docUrl: 'https://redis.io/docs/'},
    ],
  },
];

const AGENT_TOOLS = ['Codex', 'Cursor', 'Antigravity + CLI', 'Hermes', 'OpenClaw', 'Coder', 'DeepSeek Harness'];

function TierGroup({title, hint, items}: {title: string; hint: string; items: StackItem[]}) {
  return (
    <div>
      <h3 className="mb-2 text-center text-sm font-medium uppercase tracking-wider text-text-muted">
        {title}
      </h3>
      <p className="mb-6 text-center text-xs text-text-muted">{hint}</p>
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
                  {label.slice(0, 2)}
                </span>
              )}
            </div>
            <span className="text-xs text-text-secondary text-center">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function StackSection() {
  const t = useTranslations('stack');
  const [ai, ...tiers] = CATEGORIES;

  return (
    <section id="stack" className="px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h2>

      <div className="mx-auto mt-12 max-w-3xl space-y-12">
        <TierGroup title={t(`categories.${ai.key}`)} hint={t(`levelHints.${ai.key}`)} items={ai.items} />
        <div>
          <h3 className="mb-2 text-center text-sm font-medium uppercase tracking-wider text-text-muted">
            {t('categories.agents')}
          </h3>
          <p className="mb-6 text-center text-xs text-text-muted">{t('levelHints.agents')}</p>
          <ul className="flex flex-wrap justify-center gap-3">
            {AGENT_TOOLS.map((tool) => (
              <li key={tool} className="rounded-full bg-surface px-4 py-2 text-xs text-text-secondary">
                {tool}
              </li>
            ))}
          </ul>
        </div>
        {tiers.map(({key, items}) => (
          <TierGroup key={key} title={t(`categories.${key}`)} hint={t(`levelHints.${key}`)} items={items} />
        ))}
      </div>
    </section>
  );
}
