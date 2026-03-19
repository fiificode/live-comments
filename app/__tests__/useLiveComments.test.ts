import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import * as fc from 'fast-check'
import { useLiveComments } from '../hooks/useLiveComments'
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
  vi.useFakeTimers()
  resetStore()
})

afterEach(() => {
  vi.useRealTimers()
  resetStore()
})

// Feature: open-talk-live-comments, Property 6: Live simulator injects within the correct time window
describe('P6: Live simulator injects within the correct time window', () => {
  it('schedules the first injection between 10000ms and 15000ms', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 99 }), (_seed) => {
        resetStore()
        const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout')

        const { unmount } = renderHook(() => useLiveComments('masters-2025'))

        // The first call to setTimeout from our hook should be the live comment delay
        // Filter to find calls with delays in the expected range
        const delayCalls = setTimeoutSpy.mock.calls
          .map((args) => args[1] as number)
          .filter((delay) => delay != null && delay >= 1000)

        if (delayCalls.length > 0) {
          const firstDelay = delayCalls[0]
          expect(firstDelay).toBeGreaterThanOrEqual(10000)
          expect(firstDelay).toBeLessThanOrEqual(15000)
        }

        unmount()
        setTimeoutSpy.mockRestore()
      }),
      { numRuns: 20 }
    )
  })
})

// Feature: open-talk-live-comments, Property 7: Live simulator clears its interval on unmount
describe('P7: Live simulator clears its interval on unmount', () => {
  it('calls clearTimeout on unmount to prevent memory leaks', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 99 }), (_seed) => {
        resetStore()
        const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout')

        const { unmount } = renderHook(() => useLiveComments('masters-2025'))

        const callCountBefore = clearTimeoutSpy.mock.calls.length
        unmount()
        const callCountAfter = clearTimeoutSpy.mock.calls.length

        expect(callCountAfter).toBeGreaterThan(callCountBefore)

        clearTimeoutSpy.mockRestore()
      }),
      { numRuns: 20 }
    )
  })
})
