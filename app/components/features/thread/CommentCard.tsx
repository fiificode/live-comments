import { useState, useEffect } from 'react'
import type { Comment } from '../../../types'
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

// Format time like in the image (e.g., "13:41 pm")
function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const period = hours >= 12 ? 'pm' : 'am'
  const displayHours = hours % 12 || 12
  const displayMinutes = minutes.toString().padStart(2, '0')
  return `${displayHours}:${displayMinutes} ${period}`
}

const REACTIONS = ['👍', '💯', '❤️', '✨', '👏']

export default function CommentCard({ comment, isNew }: CommentCardProps) {
  const [relTime, setRelTime] = useState(() => formatTime(comment.timestamp))

  useEffect(() => {
    const id = setInterval(() => {
      setRelTime(formatTime(comment.timestamp))
    }, 60000) 
    return () => clearInterval(id)
  }, [comment.timestamp])

  return (
    <div className={`flex gap-3 py-4 ${isNew ? 'animate-fade-slide-up' : ''}`}>
      <div className="flex-1 min-w-0">
      <div className='flex items-center gap-3'>
      <Avatar username={comment.authorUsername} size="sm" avatarUrl={comment.avatarUrl} />
        <div className="flex items-center gap-5">
          <span className="font-normal text-[16px] text-[#000000]">{comment.authorUsername}</span>
          <span className="text-xs font-light text-[#000000]">{relTime}</span>
        </div>
      </div>
        <p className="text-[16px] text-[#000000] font-light mb-3 mt-1">{comment.message}</p>
        
        {/* Reaction buttons - only show for existing comments, not new ones */}
        {!isNew && (
          <div className="flex gap-2">
            {REACTIONS.filter(reaction => comment.reactions?.[reaction] !== undefined).map((reaction) => (
              <button
                key={reaction}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-transparent border border-gray-300 hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                aria-label={`React with ${reaction}`}
              >
                <span>{reaction}</span>
                <span className="text-gray-600">{comment.reactions?.[reaction] || 0}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
