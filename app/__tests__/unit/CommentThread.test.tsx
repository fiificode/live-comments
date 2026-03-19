import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
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

function renderWithRouter(component: React.ReactElement) {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  )
}

beforeEach(() => {
  resetStore()
})

describe('CommentThread unit tests', () => {
  it('shows empty-state message when there are no comments', () => {
    renderWithRouter(<CommentThread topicId="masters-2025" />)
    expect(screen.getByText('Be the first to start the conversation')).toBeTruthy()
  })

  it('renders the topic title in a header', () => {
    renderWithRouter(<CommentThread topicId="masters-2025" />)
    expect(screen.getByText('Rory Mcllroy: deep dive')).toBeTruthy()
  })

  it('renders with role="feed" and correct aria-label', () => {
    renderWithRouter(<CommentThread topicId="masters-2025" />)
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
            authorUsername: 'TestUser',
            message: 'Test comment',
            timestamp: Date.now(),
            likes: 0,
          }
        ]
      }
    })
    renderWithRouter(<CommentThread topicId="masters-2025" />)
    expect(screen.getByText('Test comment')).toBeTruthy()
    expect(screen.getByText('TestUser')).toBeTruthy()
  })
})
