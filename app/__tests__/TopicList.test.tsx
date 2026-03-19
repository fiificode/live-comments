import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router'
import TopicList from '../components/features/topics/TopicList'
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

describe('TopicList', () => {
  it('navigates to thread when authenticated', async () => {
    useStore.setState({ isAuthenticated: true })

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<TopicList onAuthRequired={vi.fn()} />} />
          <Route path="/thread/:topicId" element={<div>Thread</div>} />
        </Routes>
      </MemoryRouter>
    )

    await userEvent.click(screen.getByRole('button', { name: /Masters 2025/i }))

    expect(screen.getByText(/Thread/i)).toBeTruthy()
  })
})
