import { useRef } from 'react'
import useStore from '../../../store/useStore'
import CommentCard from './CommentCard'

interface CommentThreadProps {
  topicId: string
}

export default function CommentThread({ topicId }: CommentThreadProps) {
  const topics = useStore((s) => s.topics)
  const commentsByTopic = useStore((s) => s.commentsByTopic)
  const scrollRef = useRef<HTMLDivElement>(null)

  const topic = topics.find((t) => t.id === topicId)
  const comments = commentsByTopic[topicId] ?? []

  return (
    <div className="flex flex-col h-full">
      {topic && (
        <div className="px-4 py-3 border-b border-black/10">
          <h2 className="font-bold text-gray-900">{topic.title}</h2>
        </div>
      )}
      <div
        ref={scrollRef}
        role="feed"
        aria-label="Comment thread"
        className="flex-1 overflow-y-auto pb-24"
      >
        {comments.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
            Be the first to start the conversation
          </div>
        ) : (
          comments.map((comment, index) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              isNew={index === comments.length - 1}
            />
          ))
        )}
      </div>
    </div>
  )
}
