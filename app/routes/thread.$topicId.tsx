import { useParams, Navigate, Link } from 'react-router'
import useStore from '../store/useStore'
import CommentThread from '../components/features/thread/CommentThread'
import CommentInput from '../components/features/thread/CommentInput'
import { Comment } from '../types'

export default function Thread() {
  const { topicId } = useParams<{ topicId: string }>()
  const isAuthenticated = useStore((s) => s.isAuthenticated)
  const currentUser = useStore((s) => s.currentUser)
  const topics = useStore((s) => s.topics)
  const addComment = useStore((s) => s.addComment)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (!topicId || !topics.find((t) => t.id === topicId)) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-4">
        <p className="text-gray-500">Topic not found</p>
        <Link to="/" className="text-sm font-semibold text-[#1A3A2A] underline">
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
    <div className="flex flex-col min-h-screen">
      <CommentThread topicId={topicId} />
      <CommentInput topicId={topicId} onSubmit={handleSubmit} />
    </div>
  )
}
