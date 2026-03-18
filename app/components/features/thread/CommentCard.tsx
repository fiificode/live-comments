import { useState, useEffect } from 'react'
import { Comment } from '../../../types'
import Avatar from '../../ui/Avatar'

interface CommentCardProps {
  comment: Comment
  isNew: boolean
}

function getRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp
  if (diff < 10000) return 'just now'
  if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  return `${Math.floor(diff / 3600000)}h ago`
}

export default function CommentCard({ comment, isNew }: CommentCardProps) {
  const [relTime, setRelTime] = useState(() => getRelativeTime(comment.timestamp))

  useEffect(() => {
    const id = setInterval(() => {
      setRelTime(getRelativeTime(comment.timestamp))
    }, 30000)
    return () => clearInterval(id)
  }, [comment.timestamp])

  return (
    <div className={`flex gap-3 p-4 ${isNew ? 'animate-fade-slide-up' : ''}`}>
      <Avatar username={comment.authorUsername} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-sm text-gray-900">{comment.authorUsername}</span>
          <span className="text-xs text-gray-400">{relTime}</span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{comment.message}</p>
        <button className="flex items-center gap-1 mt-2 text-xs text-gray-400 hover:text-red-400 transition-colors">
          <span>♥</span>
          <span>{comment.likes}</span>
        </button>
      </div>
    </div>
  )
}
