import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import useStore from '../../../store/useStore'
import CommentCard from './CommentCard'
import { useLiveComments } from '../../../hooks/useLiveComments'
import NewCommentsPill from './NewCommentsPill'
import TypingIndicator from './TypingIndicator'
import Toast from '../../ui/Toast'

interface CommentThreadProps {
  topicId: string
}

export default function CommentThread({ topicId }: CommentThreadProps) {
  const navigate = useNavigate()
  const topics = useStore((s) => s.topics)
  const commentsByTopic = useStore((s) => s.commentsByTopic)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isAtBottomRef = useRef(true)
  const prevCountRef = useRef(0)
  const [unreadCount, setUnreadCount] = useState(0)

  const { typingUser, showToast, toastMessage } = useLiveComments(topicId)

  const topic = topics.find((t) => t.id === topicId)
  const comments = commentsByTopic[topicId] ?? []

  function scrollToBottom() {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50
    isAtBottomRef.current = atBottom
    if (atBottom) {
      setUnreadCount(0)
    }
  }, [])

  // Scroll to bottom on initial mount
  useEffect(() => {
    scrollToBottom()
    prevCountRef.current = (commentsByTopic[topicId] ?? []).length
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId])

  // Auto-scroll or increment pill when new comments arrive
  useEffect(() => {
    const newCount = comments.length
    const diff = newCount - prevCountRef.current
    if (diff > 0) {
      if (isAtBottomRef.current) {
        scrollToBottom()
      } else {
        setUnreadCount((prev) => prev + diff)
      }
    }
    prevCountRef.current = newCount
  }, [comments.length])

  function handlePillTap() {
    scrollToBottom()
    setUnreadCount(0)
    isAtBottomRef.current = true
  }

  return (
    <div className="h-screen flex flex-col">
      <Toast message={toastMessage} visible={showToast} />
      
      {/* Fixed Header */}
      <div className="px-4 pt-6 bg-[#FFFAED] shrink-0">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center cursor-pointer text-[#000000] mb-4 text-xs font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          BACK
        </button>
        
        {topic && (
          <>
            <h1 className="text-[18px] font-bold mb-0 text-[#000000]">{topic.title}</h1>
            <p className="text-[16px] text-[#000000] mb-4">{topic.subtitle}</p>
          </>
        )}
      </div>
        
      {/* Green line */}
      <div 
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, #006824, #FFDF75)" }}
      ></div>

      {/* Scrollable Comments section */}
      <div
        ref={scrollRef}
        role="feed"
        aria-label="Comment thread"
        className="flex-1 overflow-y-auto px-4 pb-32"
        onScroll={handleScroll}
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
        {typingUser && (
          <TypingIndicator username={typingUser} visible={true} />
        )}
      </div>
      
      <NewCommentsPill count={unreadCount} onTap={handlePillTap} />
    </div>
  )
}
