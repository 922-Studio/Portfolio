import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from './ThemeProvider'

function TestConsumer() {
  const { theme, toggleTheme } = useTheme()
  return (
    <>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </>
  )
}

describe('ThemeProvider', () => {
  it('provides dark as the default theme', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('applies the dark class to documentElement on mount', async () => {
    await act(async () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>,
      )
    })
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('reads a stored light theme from localStorage', async () => {
    localStorage.setItem('theme', 'light')
    await act(async () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>,
      )
    })
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('reads a stored dark theme from localStorage', async () => {
    localStorage.setItem('theme', 'dark')
    await act(async () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>,
      )
    })
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles from dark to light on click', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )
    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('persists the toggled theme to localStorage', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )
    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('removes dark class from documentElement after toggling to light', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )
    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('toggles back to dark on second click', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )
    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    await user.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
