import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as fc from 'fast-check'
import CommentInput from '../components/features/thread/CommentInput'

const MAX_CHARS = 280

const whitespaceArb = fc
  .array(fc.constantFrom(' ', '\t', '\n', '\r'), { maxLength: 50 })
  .map((arr) => arr.join(''))

// Feature: open-talk-live-comments, Property 2: Empty and whitespace-only input is rejected
describe('P2: Empty and whitespace-only input is rejected', () => {
  it('submit button is disabled and onSubmit is not called for whitespace-only input', () => {
    fc.assert(
      fc.property(whitespaceArb, (whitespace) => {
        const onSubmit = vi.fn()
        const { unmount } = render(<CommentInput topicId="t1" onSubmit={onSubmit} />)

        const input = screen.getByRole('textbox', { name: /write a comment/i })
        fireEvent.change(input, { target: { value: whitespace } })

        const button = screen.getByRole('button', { name: /post comment/i })
        expect(button).toHaveProperty('disabled', true)

        fireEvent.click(button)
        expect(onSubmit).not.toHaveBeenCalled()

        unmount()
      }),
      { numRuns: 100 }
    )
  })
})

// Feature: open-talk-live-comments, Property 3: Character limit is enforced
describe('P3: Character limit is enforced', () => {
  it('input value is capped at exactly 280 characters regardless of longer input', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: MAX_CHARS, maxLength: MAX_CHARS + 200 }),
        (longText) => {
          const { unmount } = render(<CommentInput topicId="t1" onSubmit={vi.fn()} />)

          const input = screen.getByRole('textbox', { name: /write a comment/i }) as HTMLInputElement
          fireEvent.change(input, { target: { value: longText } })

          expect(input.value.length).toBe(MAX_CHARS)

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Feature: open-talk-live-comments, Property 4: Input clears after submission
describe('P4: Input clears after submission', () => {
  it('input value is empty string after submitting a valid comment via Enter key', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: MAX_CHARS }).filter((s) => s.trim().length > 0),
        (validText) => {
          const onSubmit = vi.fn()
          const { unmount } = render(<CommentInput topicId="t1" onSubmit={onSubmit} />)

          const input = screen.getByRole('textbox', { name: /write a comment/i }) as HTMLInputElement
          fireEvent.change(input, { target: { value: validText } })
          expect(input.value.length).toBeGreaterThan(0)

          fireEvent.keyDown(input, { key: 'Enter' })

          expect(input.value).toBe('')
          expect(onSubmit).toHaveBeenCalled()

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })

  it('input value is empty string after clicking the submit button', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: MAX_CHARS }).filter((s) => s.trim().length > 0),
        (validText) => {
          const onSubmit = vi.fn()
          const { unmount } = render(<CommentInput topicId="t1" onSubmit={onSubmit} />)

          const input = screen.getByRole('textbox', { name: /write a comment/i }) as HTMLInputElement
          fireEvent.change(input, { target: { value: validText } })

          const button = screen.getByRole('button', { name: /post comment/i })
          fireEvent.click(button)

          expect(input.value).toBe('')

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
