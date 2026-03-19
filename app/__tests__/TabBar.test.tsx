import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import TabBar from '../components/layout/TabBar'
import useStore from '../store/useStore'
import { SEED_TOPICS } from '../data/topics'

const TABS = ['Conversations', 'Games', 'News', 'Stats']

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

// Feature: open-talk-live-comments, Property 11: Active tab receives the indicator style
describe('P11: Active tab receives the indicator style', () => {
  it('only the active tab has aria-selected=true', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...TABS),
        (activeTab) => {
          useStore.setState({ activeTab })
          const { unmount } = render(<TabBar />)

          const tabs = screen.getAllByRole('tab')
          expect(tabs.length).toBe(4)

          tabs.forEach((tab) => {
            const isActive = tab.textContent?.includes(activeTab)
            if (isActive) {
              expect(tab.getAttribute('aria-selected')).toBe('true')
            } else {
              expect(tab.getAttribute('aria-selected')).toBe('false')
            }
          })

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
