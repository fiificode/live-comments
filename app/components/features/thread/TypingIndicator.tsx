interface TypingIndicatorProps {
  username: string
  visible: boolean
}

export default function TypingIndicator({ username, visible }: TypingIndicatorProps) {
  if (!visible) return null

  return (
    <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500">
      <div className="flex gap-1">
        <span className="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full inline-block" />
        <span className="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full inline-block" />
        <span className="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full inline-block" />
      </div>
      <span>{username} is typing...</span>
    </div>
  )
}
