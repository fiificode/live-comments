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
  avatarUrl?: string
}

export default function Avatar({ username, size = 'md', avatarUrl }: AvatarProps) {
  const color = COLORS[hashUsername(username)]
  const initials = getInitials(username)
  const sizeClass = size === 'sm' ? 'w-[26px] h-[26px] text-xs' : 'w-10 h-10 text-sm'

  if (avatarUrl) {
    return (
      <div
        className={`${sizeClass} rounded-full flex items-center justify-center font-bold text-white shrink-0 overflow-hidden`}
        aria-label={`Avatar for ${username}`}
      >
        <img 
          src={avatarUrl} 
          alt={`${username}'s avatar`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget
            const parent = target.parentElement
            if (parent) {
              // Fallback to colored background with initials
              parent.style.backgroundColor = color
              parent.innerHTML = `<span class="${sizeClass} rounded-full flex items-center justify-center font-bold text-white shrink-0" style="background-color: ${color}">${initials}</span>`
            }
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-bold text-white shrink-0`}
      style={{ backgroundColor: color }}
      aria-label={`Avatar for ${username}`}
    >
      {initials}
    </div>
  )
}
