interface NewCommentsPillProps {
  count: number
  onTap: () => void
}

export default function NewCommentsPill({ count, onTap }: NewCommentsPillProps) {
  if (count === 0) return null

  return (
    <button
      onClick={onTap}
      className="absolute cursor-pointer bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg z-30 transition-transform hover:scale-105"
      style={{ backgroundColor: '#1A3A2A' }}
    >
      <span>{count} new comment{count !== 1 ? 's' : ''}</span>
      <span>↓</span>
    </button>
  )
}
