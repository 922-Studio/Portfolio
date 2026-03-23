import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CertificationsSection } from './CertificationsSection'

describe('CertificationsSection', () => {
  it('renders the section heading', () => {
    render(<CertificationsSection />)
    expect(screen.getByRole('heading', { level: 2, name: 'Certifications' })).toBeInTheDocument()
  })

  it('renders the certificate names', () => {
    render(<CertificationsSection />)
    expect(screen.getByText('Gen AI: Unlock Foundational Concepts')).toBeInTheDocument()
    expect(screen.getByText('Gen AI: Beyond the Chatbot')).toBeInTheDocument()
  })

  it('renders the issuer name', () => {
    render(<CertificationsSection />)
    const issuers = screen.getAllByText('Google Cloud')
    expect(issuers).toHaveLength(2)
  })

  it('renders the date', () => {
    render(<CertificationsSection />)
    const dates = screen.getAllByText('Mar 2026')
    expect(dates).toHaveLength(2)
  })

  it('renders the series label', () => {
    render(<CertificationsSection />)
    const labels = screen.getAllByText('Part of the Generative AI for Leaders specialization')
    expect(labels).toHaveLength(2)
  })

  it('renders the cards as links to the verification URLs', () => {
    render(<CertificationsSection />)
    const foundationalLink = screen.getByRole('link', { name: /Gen AI: Unlock Foundational Concepts/i })
    expect(foundationalLink).toHaveAttribute('href', 'https://coursera.org/verify/ACFDEDI153XB')
    expect(foundationalLink).toHaveAttribute('target', '_blank')
    expect(foundationalLink).toHaveAttribute('rel', 'noopener noreferrer')

    const chatbotLink = screen.getByRole('link', { name: /Gen AI: Beyond the Chatbot/i })
    expect(chatbotLink).toHaveAttribute('href', 'https://coursera.org/verify/F8W0F3S0PE3P')
    expect(chatbotLink).toHaveAttribute('target', '_blank')
    expect(chatbotLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has the correct section id for navigation', () => {
    const { container } = render(<CertificationsSection />)
    expect(container.querySelector('#certifications')).toBeInTheDocument()
  })
})
