import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ShareCard } from './ShareCard'

describe('ShareCard', () => {
  it('renders the share button', () => {
    render(<ShareCard />)
    expect(screen.getByRole('button', { name: 'Share this page' })).toBeInTheDocument()
  })

  it('does not show the modal initially', () => {
    render(<ShareCard />)
    expect(screen.queryByTestId('share-modal')).not.toBeInTheDocument()
  })

  it('opens the modal when the share button is clicked', async () => {
    const user = userEvent.setup()
    render(<ShareCard />)
    await user.click(screen.getByRole('button', { name: 'Share this page' }))
    expect(screen.getByTestId('share-modal')).toBeInTheDocument()
  })

  it('closes the modal when Escape is pressed', async () => {
    const user = userEvent.setup()
    render(<ShareCard />)
    await user.click(screen.getByRole('button', { name: 'Share this page' }))
    await user.keyboard('{Escape}')
    expect(screen.queryByTestId('share-modal')).not.toBeInTheDocument()
  })

  it('closes the modal when the overlay is clicked', async () => {
    const user = userEvent.setup()
    render(<ShareCard />)
    await user.click(screen.getByRole('button', { name: 'Share this page' }))
    // Click the backdrop (data-testid="share-modal"), not the inner card
    await user.click(screen.getByTestId('share-modal'))
    expect(screen.queryByTestId('share-modal')).not.toBeInTheDocument()
  })

  it('shows the EN QR code by default (locale = en)', async () => {
    const user = userEvent.setup()
    render(<ShareCard />)
    await user.click(screen.getByRole('button', { name: 'Share this page' }))
    const img = screen.getByAltText('QR code to website')
    expect(img).toHaveAttribute('src', '/images/qr-en.svg')
  })

  it('shows the correct site URL in the modal', async () => {
    const user = userEvent.setup()
    render(<ShareCard />)
    await user.click(screen.getByRole('button', { name: 'Share this page' }))
    expect(screen.getByText('gregor.922-studio.com/en')).toBeInTheDocument()
  })

  it('locks body scroll when the modal is open', async () => {
    const user = userEvent.setup()
    render(<ShareCard />)
    await user.click(screen.getByRole('button', { name: 'Share this page' }))
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body scroll when the modal is closed', async () => {
    const user = userEvent.setup()
    render(<ShareCard />)
    await user.click(screen.getByRole('button', { name: 'Share this page' }))
    await user.keyboard('{Escape}')
    expect(document.body.style.overflow).toBe('')
  })

  it('sets data-share-open on documentElement when modal is open', async () => {
    const user = userEvent.setup()
    render(<ShareCard />)
    await user.click(screen.getByRole('button', { name: 'Share this page' }))
    expect(document.documentElement.hasAttribute('data-share-open')).toBe(true)
  })

  it('removes data-share-open from documentElement when modal is closed', async () => {
    const user = userEvent.setup()
    render(<ShareCard />)
    await user.click(screen.getByRole('button', { name: 'Share this page' }))
    await user.keyboard('{Escape}')
    expect(document.documentElement.hasAttribute('data-share-open')).toBe(false)
  })
})
