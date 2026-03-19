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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFAED]">
      {/* Gradient border above */}
      <div 
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, #006824, #FFDF75)" }}
      ></div>
      
      <div className="px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-[#F5EAD3] rounded-md px-4 py-3 shadow-sm border border-gray-200">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
              onKeyDown={handleKeyDown}
              aria-label="Type your comment here"
              placeholder="Type your comment here"
              className="w-full bg-transparent text-sm outline-none text-gray-900 placeholder-[#000000] focus-visible:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
