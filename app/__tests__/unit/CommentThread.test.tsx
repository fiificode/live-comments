import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CommentThread from '../../components/features/thread/CommentThread'
import useStore from '../../store/useStore'
import { SEED_TOPICS } from '../../data/topics'

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

describe('CommentThread unit tests', () => {
  it('shows empty-state message when there are no comments', () => {
    render(<CommentThread topicId="masters-2025" />)
    expect(screen.getByText('Be the first to start the conversation')).toBeTruthy()
  })

  it('renders the topic title in a header', () => {
    render(<CommentThread topicId="masters-2025" />)
    expect(screen.getByText('Masters 2025')).toBeTruthy()
  })

  it('renders with role="feed" and correct aria-label', () => {
    render(<CommentThread topicId="masters-2025" />)
    const feed = screen.getByRole('feed')
    expect(feed).toBeTruthy()
    expect(feed.getAttribute('aria-label')).toBe('Comment thread')
  })

  it('renders comment cards when comments exist', () => {
    useStore.setState({
      commentsByTopic: {
        'masters-2025': [
          {
            id: '1',
            topicId: 'masters-2025',
            authorUsername: 'GolfFan99',
            message: 'What a shot!',
            timestamp: Date.now() - 5000,
            likes: 3,
          },
        ],
      },
    })
    render(<CommentThread topicId="masters-2025" />)
    expect(screen.getByText('What a shot!')).toBeTruthy()
    expect(screen.getByText('GolfFan99')).toBeTruthy()
  })
})
