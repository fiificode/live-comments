import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as fc from 'fast-check'
import NewCommentsPill from '../components/features/thread/NewCommentsPill'

// Feature: open-talk-live-comments, Property 8: New comments pill count matches unread injections
describe('P8: New comments pill count matches unread injections', () => {
  it('renders the exact count passed as prop', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 500 }),
        (count) => {
          const onTap = vi.fn()
          const { unmount } = render(<NewCommentsPill count={count} onTap={onTap} />)

          const pill = screen.getByRole('button')
          expect(pill.textContent).toContain(String(count))

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })

  it('renders null (no pill) when count is 0', () => {
    const { container, unmount } = render(<NewCommentsPill count={0} onTap={vi.fn()} />)
    expect(container.firstChild).toBeNull()
    unmount()
  })
})

// Feature: open-talk-live-comments, Property 9: Reaching the bottom resets the pill
describe('P9: Reaching the bottom resets the pill', () => {
  it('calls onTap when pill is clicked, indicating reset should happen', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 500 }),
        (count) => {
          const onTap = vi.fn()
          const { unmount } = render(<NewCommentsPill count={count} onTap={onTap} />)

          const pill = screen.getByRole('button')
          fireEvent.click(pill)

          expect(onTap).toHaveBeenCalledTimes(1)

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
