const COLORS = [
  '#E57373', '#F06292', '#BA68C8', '#7986CB',
  '#4FC3F7', '#4DB6AC', '#81C784', '#FFD54F',
  '#FF8A65', '#A1887F',
]

function hashUsername(username: string): number {
  let hash = 0
  for (let i = 0; i < username.length; i++) {
    hash = (hash * 31 + username.charCodeAt(i)) % COLORS.length
  }
  return hash
}

function getInitials(username: string): string {
  return username
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('')
}

interface AvatarProps {
  username: string
  size?: 'sm' | 'md'
}

export default function Avatar({ username, size = 'md' }: AvatarProps) {
  const color = COLORS[hashUsername(username)]
  const initials = getInitials(username)
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ backgroundColor: color }}
      aria-label={`Avatar for ${username}`}
    >
      {initials}
    </div>
  )
}
