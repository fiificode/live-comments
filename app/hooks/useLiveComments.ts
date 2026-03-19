import { useState, useEffect, useRef } from 'react'
import useStore from '../store/useStore'
import { getTopicMockData } from '../data/mockComments'
import type { Comment } from '../types'

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function useLiveComments(topicId: string) {
  const addComment = useStore((s) => s.addComment)
  const [typingUser, setTypingUser] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Get topic-specific mock data
    const mockData = getTopicMockData(topicId)
    const { usernames, messages } = mockData

    function scheduleNext() {
      const delay = randomBetween(10000, 15000)
      intervalRef.current = setTimeout(() => {
        const username = randomItem(usernames)
        const message = randomItem(messages)

        // Show typing indicator for 1–2 seconds
        setTypingUser(username)
        const typingDuration = randomBetween(1000, 2000)

        setTimeout(() => {
          setTypingUser(null)
          const comment: Comment = {
            id: `live-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            topicId,
            authorUsername: username,
            message,
            timestamp: Date.now(),
            likes: 0,
            isLive: true,
          }
          addComment(topicId, comment)
          setToastMessage(`${username} commented`)
          setShowToast(true)
          setTimeout(() => setShowToast(false), 3000)
          scheduleNext()
        }, typingDuration)
      }, delay)
    }

    scheduleNext()

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [topicId, addComment])

  return { typingUser, showToast, toastMessage }
}
