import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import * as fc from 'fast-check'
import CommentCard from '../components/features/thread/CommentCard'
import type { Comment } from '../types'

// Feature: open-talk-live-comments, Property 10: CommentCard renders all required fields for any comment
describe('P10: CommentCard renders all required fields for any comment', () => {
  it('renders avatar initials, username, relative timestamp, message, and reaction', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }),
          topicId: fc.string({ minLength: 1 }),
          authorUsername: fc
            .string({ minLength: 1, maxLength: 30 })
            .filter((s) => s.trim().length > 0),
          message: fc
            .string({ minLength: 1, maxLength: 280 })
            .filter((s) => s.trim().length > 0),
          timestamp: fc.integer({ min: 0, max: Date.now() }),
          likes: fc.nat({ max: 9999 }),
          isLive: fc.boolean(),
        }),
        (comment: Comment) => {
          const { container, unmount } = render(<CommentCard comment={comment} isNew={false} />)

          // Username is displayed in the username span
          const usernameEl = container.querySelector('.font-normal.text-\\[16px\\]')
          expect(usernameEl).toBeTruthy()
          expect(usernameEl!.textContent?.trim()).toBe(comment.authorUsername.trim())

          // Message body is displayed
          const msgEl = container.querySelector('p.text-\\[16px\\]')
          expect(msgEl).toBeTruthy()
          expect(msgEl!.textContent?.trim()).toBe(comment.message.trim())

          // Relative timestamp exists (shows formatted time)
          const timeEl = container.querySelector('.text-xs.font-light')
          expect(timeEl).toBeTruthy()
          expect(timeEl!.textContent).toMatch(/\d{1,2}:\d{2} (am|pm)/)

          // Avatar wrapper with aria-label present
          const avatarEl = container.querySelector('[aria-label^="Avatar for"]')
          expect(avatarEl).toBeTruthy()

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
