import { useNavigate } from 'react-router'
import useStore from '../../../store/useStore'
import TopicCard from './TopicCard'

interface TopicListProps {
  onAuthRequired: (topicId: string) => void
}

export default function TopicList({ onAuthRequired }: TopicListProps) {
  const navigate = useNavigate()
  const topics = useStore((s) => s.topics)
  const activeTopicId = useStore((s) => s.activeTopicId)
  const isAuthenticated = useStore((s) => s.isAuthenticated)
  const setActiveTopic = useStore((s) => s.setActiveTopic)

  function handleTopicClick(topicId: string) {
    setActiveTopic(topicId)
    if (isAuthenticated) {
      navigate(`/thread/${topicId}`)
    } else {
      onAuthRequired(topicId)
    }
  }

  return (
    <div className="p-4">
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          isActive={topic.id === activeTopicId}
          onClick={() => handleTopicClick(topic.id)}
        />
      ))}
    </div>
  )
}
