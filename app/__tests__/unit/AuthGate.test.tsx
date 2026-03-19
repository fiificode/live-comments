import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AuthGate from '../../components/features/auth/AuthGate'

describe('AuthGate unit tests', () => {
  it('renders "Become part of the conversation"', () => {
    render(<AuthGate onAuth={vi.fn()} onDismiss={vi.fn()} />)
    expect(screen.getByText('Become part of the conversation')).toBeTruthy()
  })

  it('renders Sign In and Create Account buttons', () => {
    render(<AuthGate onAuth={vi.fn()} onDismiss={vi.fn()} />)
    expect(screen.getByRole('button', { name: /sign in/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /create account/i })).toBeTruthy()
  })

  it('calls onAuth when Sign In is clicked', () => {
    const onAuth = vi.fn()
    render(<AuthGate onAuth={onAuth} onDismiss={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(onAuth).toHaveBeenCalledTimes(1)
  })

  it('calls onAuth when Create Account is clicked', () => {
    const onAuth = vi.fn()
    render(<AuthGate onAuth={onAuth} onDismiss={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))
    expect(onAuth).toHaveBeenCalledTimes(1)
  })

  it('calls onDismiss when backdrop is clicked', () => {
    const onDismiss = vi.fn()
    const { container } = render(<AuthGate onAuth={vi.fn()} onDismiss={onDismiss} />)
    // Click the backdrop overlay (the outermost div)
    fireEvent.click(container.firstChild as Element)
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })
})
