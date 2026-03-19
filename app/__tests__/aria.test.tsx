import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import AuthGate from '../components/features/auth/AuthGate'
import TabBar from '../components/layout/TabBar'
import CommentInput from '../components/features/thread/CommentInput'
import useStore from '../store/useStore'
import { SEED_TOPICS } from '../data/topics'

function resetStore() {
  useStore.setState({
    isAuthenticated: false,
    currentUser: null,
    topics: SEED_TOPICS,
    activeTopicId: null,
    commentsByTopic: {},
    activeTab: 'Conversations',
  })
}

beforeEach(() => {
  resetStore()
})

// Feature: open-talk-live-comments, Property 12: ARIA attributes are present on key components
describe('P12: ARIA attributes are present on key components', () => {
  it('AuthGate has role="dialog", aria-modal="true", and aria-labelledby', () => {
    fc.assert(
      fc.property(fc.boolean(), (_dummy) => {
        const { unmount } = render(<AuthGate onAuth={vi.fn()} onDismiss={vi.fn()} />)

        const dialog = screen.getByRole('dialog')
        expect(dialog).toBeTruthy()
        expect(dialog.getAttribute('aria-modal')).toBe('true')
        expect(dialog.getAttribute('aria-labelledby')).toBeTruthy()

        unmount()
      }),
      { numRuns: 20 }
    )
  })

  it('TabBar has role="tablist" and each tab has role="tab" with aria-selected', () => {
    fc.assert(
      fc.property(fc.boolean(), (_dummy) => {
        const { unmount } = render(<TabBar />)

        const tablist = screen.getByRole('tablist')
        expect(tablist).toBeTruthy()

        const tabs = screen.getAllByRole('tab')
        expect(tabs.length).toBe(4)
        tabs.forEach((tab) => {
          const ariaSelected = tab.getAttribute('aria-selected')
          expect(ariaSelected === 'true' || ariaSelected === 'false').toBe(true)
        })

        unmount()
      }),
      { numRuns: 20 }
    )
  })

  it('CommentInput has aria-label on text field and submit button', () => {
    fc.assert(
      fc.property(fc.boolean(), (_dummy) => {
        const { unmount } = render(<CommentInput topicId="t1" onSubmit={vi.fn()} />)

        const input = screen.getByRole('textbox', { name: /write a comment/i })
        expect(input).toBeTruthy()

        const button = screen.getByRole('button', { name: /post comment/i })
        expect(button).toBeTruthy()

        unmount()
      }),
      { numRuns: 20 }
    )
  })
})
