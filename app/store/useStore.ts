import { create } from 'zustand'
import { StoreState } from '../types'
import { SEED_TOPICS } from '../data/topics'

const useStore = create<StoreState>((set) => ({
  isAuthenticated: false,
  currentUser: null,
  topics: SEED_TOPICS,
  activeTopicId: null,
  commentsByTopic: {},
  activeTab: 'Conversations',

  signIn: () => set({
    isAuthenticated: true,
    currentUser: { id: 'me', username: 'You', avatarInitials: 'YO' }
  }),

  setActiveTopic: (id) => set({ activeTopicId: id }),

  addComment: (topicId, comment) => set((state) => ({
    commentsByTopic: {
      ...state.commentsByTopic,
      [topicId]: [...(state.commentsByTopic[topicId] ?? []), comment],
    }
  })),

  seedComments: (topicId, comments) => set((state) => ({
    commentsByTopic: { ...state.commentsByTopic, [topicId]: comments }
  })),

  setActiveTab: (tab) => set({ activeTab: tab }),
}))

export default useStore
