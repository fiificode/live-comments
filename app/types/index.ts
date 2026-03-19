export interface User {
  id: string
  username: string
  avatarInitials: string
}

export interface Topic {
  id: string
  title: string
  subtitle: string
}

export interface Comment {
  id: string
  topicId: string
  authorUsername: string
  message: string
  timestamp: number   // Unix ms
  likes: number
  isLive?: boolean    // true if injected by Live_Simulator
  avatarUrl?: string   // optional avatar image URL
  reactions?: { [key: string]: number | undefined }  // reaction emoji -> count mapping
}

export interface StoreState {
  isAuthenticated: boolean
  currentUser: User | null
  topics: Topic[]
  activeTopicId: string | null
  commentsByTopic: Record<string, Comment[]>
  activeTab: string
  // actions
  signIn: () => void
  setActiveTopic: (id: string) => void
  addComment: (topicId: string, comment: Comment) => void
  seedComments: (topicId: string, comments: Comment[]) => void
  setActiveTab: (tab: string) => void
}
