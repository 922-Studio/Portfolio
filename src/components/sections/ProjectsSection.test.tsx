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

  it('renders all four project titles (at least once each)', () => {
    render(<ProjectsSection />)
    // Carousel triples the slides — use getAllBy to handle duplicates
    expect(screen.getAllByText('krimispiele.com').length).toBeGreaterThan(0)
    expect(screen.getAllByText('samhain-verlag.de').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Sweatvalley Bingo').length).toBeGreaterThan(0)
    expect(screen.getAllByText('krimidinnerverzeichnis.de').length).toBeGreaterThan(0)
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

  it('renders project live links as external anchors', () => {
    render(<ProjectsSection />)
    const liveLinks = screen
      .getAllByRole('link')
      .filter((el) => el.getAttribute('rel') === 'noopener noreferrer')
    expect(liveLinks.length).toBeGreaterThan(0)
  })
})
