import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TopicCard from '../../components/features/topics/TopicCard'
import type { Topic } from '../../types'

const mockTopic: Topic = {
  id: 'masters-2025',
  title: 'Masters 2025',
  subtitle: 'Who takes the green jacket?',
}

describe('TopicCard unit tests', () => {
  it('renders the topic title and subtitle', () => {
    render(<TopicCard topic={mockTopic} isActive={false} onClick={vi.fn()} />)
    expect(screen.getByText('Masters 2025')).toBeTruthy()
    expect(screen.getByText('Who takes the green jacket?')).toBeTruthy()
  })

  it('renders a right-pointing chevron icon (SVG)', () => {
    const { container } = render(<TopicCard topic={mockTopic} isActive={false} onClick={vi.fn()} />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('applies the green left border class when isActive is true', () => {
    const { container } = render(<TopicCard topic={mockTopic} isActive={true} onClick={vi.fn()} />)
    const button = container.querySelector('button')!
    expect(button.className).toContain('border-[#1A3A2A]')
  })

  it('does not apply the active border class when isActive is false', () => {
    const { container } = render(<TopicCard topic={mockTopic} isActive={false} onClick={vi.fn()} />)
    const button = container.querySelector('button')!
    expect(button.className).toContain('border-transparent')
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<TopicCard topic={mockTopic} isActive={false} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
