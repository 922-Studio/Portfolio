import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CertificationsSection } from './CertificationsSection'

describe('CertificationsSection', () => {
  it('renders the section heading', () => {
    render(<CertificationsSection />)
    expect(screen.getByRole('heading', { level: 2, name: 'Certifications' })).toBeInTheDocument()
  })

  it('renders the certificate name', () => {
    render(<CertificationsSection />)
    expect(screen.getByText('Gen AI: Beyond the Chatbot')).toBeInTheDocument()
  })

  it('renders the issuer name', () => {
    render(<CertificationsSection />)
    expect(screen.getByText('Google Cloud')).toBeInTheDocument()
  })

  it('renders the date', () => {
    render(<CertificationsSection />)
    expect(screen.getByText('Mar 2026')).toBeInTheDocument()
  })

  it('renders the series label', () => {
    render(<CertificationsSection />)
    expect(screen.getByText('Part of the Generative AI for Leaders specialization')).toBeInTheDocument()
  })

  it('renders the card as a link to the verification URL', () => {
    render(<CertificationsSection />)
    const link = screen.getByRole('link', { name: /Gen AI: Beyond the Chatbot/i })
    expect(link).toHaveAttribute('href', 'https://coursera.org/verify/F8W0F3S0PE3P')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has the correct section id for navigation', () => {
    const { container } = render(<CertificationsSection />)
    expect(container.querySelector('#certifications')).toBeInTheDocument()
  })
})
