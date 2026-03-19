import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router'
import useStore from '../store/useStore'
import CommentThread from '../components/features/thread/CommentThread'
import CommentInput from '../components/features/thread/CommentInput'
import type { Comment } from '../types'
import { getInitialComments } from '../data/mockComments'

function buildSpecificSeedComment(topicId: string, initialComment: { username: string, message: string, avatarUrl?: string, reactions?: { [key: string]: number | undefined } }, offsetMs: number): Comment {
  return {
    id: `seed-${topicId}-${offsetMs}`,
    topicId,
    authorUsername: initialComment.username,
    message: initialComment.message,
    avatarUrl: initialComment.avatarUrl,
    reactions: initialComment.reactions,
    timestamp: Date.now() - offsetMs,
    likes: Math.floor(Math.random() * 12),
    isLive: false,
  }
}

export default function Thread() {
  const { topicId } = useParams<{ topicId: string }>()
  const isAuthenticated = useStore((s) => s.isAuthenticated)
  const currentUser = useStore((s) => s.currentUser)
  const topics = useStore((s) => s.topics)
  const addComment = useStore((s) => s.addComment)
  const commentsByTopic = useStore((s) => s.commentsByTopic)
  const seedComments = useStore((s) => s.seedComments)

  // Seed initial comments if the topic has none
  useEffect(() => {
    if (!topicId) return
    if ((commentsByTopic[topicId] ?? []).length === 0) {
      const initialComments = getInitialComments(topicId)
      const seeds = initialComments.map((comment, index) => 
        buildSpecificSeedComment(topicId, comment, (4 - index) * 60 * 1000)
      )
      seedComments(topicId, seeds)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId])

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (!topicId || !topics.find((t) => t.id === topicId)) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-4">
        <p className="text-gray-500">Topic not found</p>
        <Link
          to="/"
          className="text-sm font-semibold text-[#1A3A2A] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3A2A] rounded"
        >
          Back to topics
        </Link>
      </div>
    )
  }

  function handleSubmit(text: string) {
    if (!topicId || !currentUser) return
    const comment: Comment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      topicId,
      authorUsername: currentUser.username,
      message: text,
      timestamp: Date.now(),
      likes: 0,
    }
    addComment(topicId, comment)
  }

  return (
    <div className="min-h-screen bg-[#FFFAED] animate-page-in">
      <CommentThread topicId={topicId} />
      <CommentInput topicId={topicId} onSubmit={handleSubmit} />
    </div>
  )
}
