import { useState } from 'react'

const MAX_CHARS = 280

interface CommentInputProps {
  topicId: string
  onSubmit: (text: string) => void
}

export default function CommentInput({ topicId: _topicId, onSubmit }: CommentInputProps) {
  const [text, setText] = useState('')

  const trimmed = text.trim()
  const isDisabled = trimmed.length === 0

  function handleSubmit() {
    if (isDisabled) return
    onSubmit(trimmed)
    setText('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !isDisabled) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="w-full max-w-lg px-4 pb-4 pt-2" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
            onKeyDown={handleKeyDown}
            aria-label="Write a comment"
            placeholder="Write a comment..."
            className="flex-1 bg-transparent text-sm outline-none text-gray-900 placeholder-gray-400"
          />
          <span className={`text-xs flex-shrink-0 ${text.length >= MAX_CHARS ? 'text-red-400' : 'text-gray-400'}`}>
            {text.length}/{MAX_CHARS}
          </span>
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            aria-label="Post comment"
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDisabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'text-white'
            }`}
            style={isDisabled ? {} : { backgroundColor: '#1A3A2A' }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  )
}
