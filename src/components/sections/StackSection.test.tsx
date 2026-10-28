import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StackSection } from './StackSection'

describe('StackSection', () => {
  it('renders the AI group, the agent tools and the three honest tiers', () => {
    render(<StackSection />)
    const groups = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(groups).toEqual(['AI development', 'More agent tools', 'Daily', 'Hands-on', 'Familiar'])
  })

  it('shows AI topics as plain icon tiles with short labels only', () => {
    render(<StackSection />)
    for (const label of [
      'Claude Code',
      'Agent Harness',
      'Loop Engineering',
      'Context Engineering',
      'Prompt Engineering',
      'MCP',
    ]) {
      const link = screen.getByRole('link', { name: label })
      expect(link.getAttribute('href')).toMatch(/^https:\/\//)
      expect(link.textContent).toBe(label)
    }
  })

  it('places tools in the junior tiers', () => {
    render(<StackSection />)
    expect(screen.getByRole('link', { name: 'Git' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Kubernetes' })).toBeInTheDocument()
    expect(screen.queryByText('Vue.js')).toBeNull()
  })

  it('lists Claude Code only once', () => {
    render(<StackSection />)
    expect(screen.getAllByText('Claude Code')).toHaveLength(1)
  })
})
