import { Topic } from '../../../types'

interface TopicCardProps {
  topic: Topic
  isActive: boolean
  onClick: () => void
}

export default function TopicCard({ topic, isActive, onClick }: TopicCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 bg-white mb-2 rounded-lg text-left transition-all ${
        isActive ? 'border-l-4 border-[#1A3A2A]' : 'border-l-4 border-transparent'
      }`}
    >
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-900 truncate">{topic.title}</p>
        <p className="text-sm text-gray-500 truncate">{topic.subtitle}</p>
      </div>
      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}
