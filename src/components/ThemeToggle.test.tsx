import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from './ThemeProvider'
import { ThemeToggle } from './ThemeToggle'

function renderWithTheme(initialStoredTheme?: 'light' | 'dark') {
  if (initialStoredTheme) {
    localStorage.setItem('theme', initialStoredTheme)
  }
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  )
}

describe('ThemeToggle', () => {
  it('renders a toggle button', async () => {
    await act(async () => renderWithTheme())
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows "Toggle light mode" aria-label when in dark mode', async () => {
    await act(async () => renderWithTheme('dark'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Toggle light mode')
  })

  it('shows "Toggle dark mode" aria-label when in light mode', async () => {
    await act(async () => renderWithTheme('light'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Toggle dark mode')
  })

  it('switches aria-label from light to dark after click', async () => {
    const user = userEvent.setup()
    await act(async () => renderWithTheme('dark'))
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Toggle dark mode')
  })

  it('switches aria-label from dark to light after click', async () => {
    const user = userEvent.setup()
    await act(async () => renderWithTheme('light'))
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Toggle light mode')
  })
})
