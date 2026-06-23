# Portfolio

Personal portfolio website for Gregor Krykon — Automation Engineer and Full-Stack Developer.

**Live**: [gregor.922-studio.com](https://gregor.922-studio.com)
**Root redirect**: `922-studio.com` permanently redirects to `gregor.922-studio.com`

Single-page site with sections: Hero, About, Stack, Projects (carousel), Certifications, Testimonials, Contact, Impressum. Dark/light theme with class-based switching. Fully responsive.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 (App Router, standalone output) |
| Language | TypeScript 5+ |
| UI | React 19.2.3, Tailwind CSS 4.2.1 |
| Icons | lucide-react 0.575.0, react-icons 5.5.0 |
| i18n | next-intl 4.8.3 (EN / DE) |
| Analytics | Google Analytics 4 |
| Testing | Vitest 2.1.9, Playwright 1.58.2 |
| Linting | ESLint 9 |

## Multi-Language Support

Routing is locale-first via `[locale]` segments (`/en/`, `/de/`). Locales are configured in `src/i18n/routing.ts`. Translation files live in `messages/en.json` and `messages/de.json`. When changing copy, always update both files.

## Quick Start

### Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Docker

```bash
docker compose up --build
```

The container runs on port 3000. Traefik handles domain routing and TLS on the server.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID (build-time arg) |

The GA measurement ID is injected as a Docker build argument (`--build-arg`) and baked into the static output at build time.

## Testing

### Unit tests (Vitest)

```bash
npm run test:unit          # watch mode
npm run test:unit:ci       # single run
npm run test:coverage      # with coverage report
```

Unit tests cover: `robots.ts`, `sitemap.ts`, `ThemeProvider`, `ThemeToggle`, `ShareCard`, `CertificationsSection`, `ProjectsSection`.

### E2E tests (Playwright)

```bash
npm run test:install       # install Chromium (first time)
npm run test               # run Playwright tests
```

E2E fixtures cover: buttons, carousel, theme-toggle, impressum. Runs in Chromium with 2 retries. Reports: Allure + HTML.

## Deployment

- **Registry**: `registry.922-studio.com` (private Docker registry)
- **Image name**: `portfolio`
- **Container port**: 3000
- **Traefik routing**: `gregor.922-studio.com` → port 3000; `922-studio.com` → permanent redirect to `gregor.922-studio.com`
- **Network**: `proxy` (external Traefik network)
- **Server path**: `/home/lab/portfolio`

## CI/CD Pipeline

Triggered on push to `main` or manual dispatch. Uses reusable workflows from `922-Studio/workflows`.

```
cancel-previous → version → build (parallel: tests) → push-prod → kick-off-e2e → notify
```

| Job | Description |
|-----|-------------|
| `cancel-previous-runs` | Cancels any in-progress pipeline for the same branch |
| `version` | Creates a new semver tag |
| `build` | Builds Docker image on runner (no push) |
| `tests` | Runs Vitest with coverage, reports to Allure server |
| `push-prod` | Pushes image to private registry with `prod` and `prod-vX.Y.Z` tags |
| `kick-off-e2e` | Triggers the `e2e.yml` workflow on the polaris runner |
| `notify-success` | Discord notification on success |
| `notify-failure` | Discord notification + GitHub issue on failure |

After a successful deploy, verify at [gregor.922-studio.com](https://gregor.922-studio.com).

## Project Structure

```
src/
  app/
    [locale]/           # Locale-aware routes (en, de)
      layout.tsx        # Root layout with metadata, fonts, theme
      page.tsx          # Home page (all sections)
      impressum/        # Impressum page
    globals.css         # CSS custom properties, theme variables, animations
    robots.ts           # robots.txt generation
    sitemap.ts          # sitemap.xml generation
  components/
    sections/           # Page sections (Hero, About, Stack, Projects, ...)
    Header.tsx
    Footer.tsx
    ThemeProvider.tsx
    ThemeToggle.tsx
    LanguageSwitcher.tsx
    GoogleAnalytics.tsx
  i18n/
    routing.ts          # Locale config (en, de)
messages/
  en.json               # English translations
  de.json               # German translations
```

## Dependencies

- **HomeStructure**: Traefik proxy network (`proxy`) and reverse proxy config
- **workflows**: Reusable CI/CD workflows (`922-Studio/workflows`)
