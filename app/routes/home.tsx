import { useState } from 'react'
import { useNavigate } from 'react-router'
import TopicList from '../components/features/topics/TopicList'
import AuthGate from '../components/features/auth/AuthGate'
import useStore from '../store/useStore'

export default function Home() {
  const navigate = useNavigate()
  const signIn = useStore((s) => s.signIn)
  const [pendingTopicId, setPendingTopicId] = useState<string | null>(null)

  function handleAuthRequired(topicId: string) {
    setPendingTopicId(topicId)
  }

  function handleAuth() {
    signIn()
    if (pendingTopicId) {
      navigate(`/thread/${pendingTopicId}`)
    }
    setPendingTopicId(null)
  }

  function handleDismiss() {
    setPendingTopicId(null)
  }

  return (
    <div>
      <TopicList onAuthRequired={handleAuthRequired} />
      {pendingTopicId && (
        <AuthGate onAuth={handleAuth} onDismiss={handleDismiss} />
      )}
    </div>
  )
}
