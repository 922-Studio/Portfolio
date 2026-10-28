import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProjectsSection } from './ProjectsSection'

// Prevent auto-advance timer from firing during tests
vi.useFakeTimers()

afterEach(() => {
  vi.clearAllTimers()
})

describe('ProjectsSection', () => {
  it('renders the section heading', () => {
    render(<ProjectsSection />)
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
  })

  it('renders all project titles (at least once each)', () => {
    render(<ProjectsSection />)
    // Carousel triples the slides - use getAllBy to handle duplicates
    expect(screen.getAllByText('krimispiele.com').length).toBeGreaterThan(0)
    expect(screen.getAllByText('samhain-verlag.de').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Sweatvalley Bingo').length).toBeGreaterThan(0)
    expect(screen.getAllByText('krimidinnerverzeichnis.de').length).toBeGreaterThan(0)
    expect(screen.getAllByText('My homelab').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Reusable CI/CD workflows').length).toBeGreaterThan(0)
    expect(screen.getAllByText('My dashboard').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Kicker').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Samhain content platform').length).toBeGreaterThan(0)
    expect(screen.getAllByText('My own agent harness (orchestrator) for Claude Code').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Nodewar – browser idle game').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Samhain murder-mystery dinner app').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Part-time job: IT for a medical practice').length).toBeGreaterThan(0)
  })

  it('renders Previous and Next navigation buttons', () => {
    render(<ProjectsSection />)
    expect(screen.getByRole('button', { name: 'Previous project' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next project' })).toBeInTheDocument()
  })

  it('renders clickable technology tag links', () => {
    render(<ProjectsSection />)
    expect(screen.getAllByRole('link', { name: 'React' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Docker' }).length).toBeGreaterThan(0)
  })

  it('responds to clicking the Next button without throwing', () => {
    render(<ProjectsSection />)
    fireEvent.click(screen.getByRole('button', { name: 'Next project' }))
    expect(screen.getAllByText('krimispiele.com').length).toBeGreaterThan(0)
  })

  it('responds to clicking the Previous button without throwing', () => {
    render(<ProjectsSection />)
    fireEvent.click(screen.getByRole('button', { name: 'Previous project' }))
    expect(screen.getAllByText('Sweatvalley Bingo').length).toBeGreaterThan(0)
  })

  it('only links to the public workflows repository, not to private repos', () => {
    render(<ProjectsSection />)
    const repoLinks = screen.getAllByTitle('GitHub').map((a) => a.getAttribute('href'))
    expect(new Set(repoLinks)).toEqual(
      new Set([
        'https://github.com/922-Studio/sweatvalley_bingo',
        'https://github.com/922-Studio/workflows',
      ]),
    )
  })

  it('renders tags without a docs link as plain text and with one as link', () => {
    render(<ProjectsSection />)
    expect(screen.getAllByRole('link', { name: 'FastAPI' }).length).toBeGreaterThan(0)
  })

  it('marks AI-natively built projects with the Claude Code badge', () => {
    render(<ProjectsSection />)
    // 10 of 13 cards carry the badge; the carousel renders every card three times
    expect(screen.getAllByText('Built with Claude Code')).toHaveLength(10 * 3)
  })

  it('leads with the agent harness card', () => {
    render(<ProjectsSection />)
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(titles[0]).toBe('My own agent harness (orchestrator) for Claude Code')
    expect(titles).toHaveLength(13 * 3)
  })

  it('links the Samhain app card to its public Play Store listing', () => {
    render(<ProjectsSection />)
    const links = screen
      .getAllByRole('link')
      .filter((a) => a.getAttribute('href') === 'https://play.google.com/store/apps/details?id=de.samhainverlag.krimidinner')
    expect(links).toHaveLength(3)
  })

  it('renders the medical practice card without a link', () => {
    render(<ProjectsSection />)
    const title = screen.getAllByText('Part-time job: IT for a medical practice')[0]
    expect(title.closest('a')).toBeNull()
  })

  it('renders project live links as external anchors', () => {
    render(<ProjectsSection />)
    const liveLinks = screen
      .getAllByRole('link')
      .filter((el) => el.getAttribute('rel') === 'noopener noreferrer')
    expect(liveLinks.length).toBeGreaterThan(0)
  })
})
