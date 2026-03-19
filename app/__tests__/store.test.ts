import { describe, it, expect, beforeEach } from 'vitest'
import * as fc from 'fast-check'
import useStore from '../store/useStore'
import { SEED_TOPICS } from '../data/topics'
import type { Comment } from '../types'

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

// Feature: open-talk-live-comments, Property 1: addComment appends to the correct topic only
describe('P1: addComment appends to the correct topic only', () => {
  it('appends to the target topic and leaves all other topics unchanged', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 20 }),
        fc.string({ minLength: 1, maxLength: 20 }),
        fc.record({
          id: fc.string({ minLength: 1 }),
          topicId: fc.string({ minLength: 1 }),
          authorUsername: fc.string({ minLength: 1 }),
          message: fc.string({ minLength: 1 }),
          timestamp: fc.nat(),
          likes: fc.nat(),
        }),
        (targetId, otherId, partialComment) => {
          fc.pre(targetId !== otherId)

          const otherComment: Comment = {
            id: 'other-seed',
            topicId: otherId,
            authorUsername: 'OtherUser',
            message: 'Other message',
            timestamp: 0,
            likes: 0,
          }

          useStore.setState({
            commentsByTopic: {
              [targetId]: [],
              [otherId]: [otherComment],
            },
          })

          const prevOther = useStore.getState().commentsByTopic[otherId]
          const comment: Comment = { ...partialComment, topicId: targetId }

          useStore.getState().addComment(targetId, comment)

          const state = useStore.getState()
          // Target topic grows by exactly 1
          expect(state.commentsByTopic[targetId].length).toBe(1)
          expect(state.commentsByTopic[targetId][0]).toStrictEqual(comment)
          // Other topic is unchanged
          expect(state.commentsByTopic[otherId]).toStrictEqual(prevOther)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Feature: open-talk-live-comments, Property 5: signIn sets isAuthenticated and currentUser
describe('P5: signIn sets isAuthenticated and currentUser', () => {
  it('sets isAuthenticated to true and currentUser to a valid user object', () => {
    fc.assert(
      fc.property(fc.boolean(), (_dummy) => {
        useStore.setState({ isAuthenticated: false, currentUser: null })

        useStore.getState().signIn()

        const state = useStore.getState()
        expect(state.isAuthenticated).toBe(true)
        expect(state.currentUser).not.toBeNull()
        expect(typeof state.currentUser?.username).toBe('string')
        expect(state.currentUser!.username.length).toBeGreaterThan(0)
      }),
      { numRuns: 100 }
    )
  })
})
