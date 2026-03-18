import useStore from '../../store/useStore'

const TABS = ['Conversations', 'Games', 'News', 'Stats']

export default function TabBar() {
  const activeTab = useStore((s) => s.activeTab)
  const setActiveTab = useStore((s) => s.setActiveTab)

  return (
    <div
      role="tablist"
      className="flex border-b border-black/10 bg-white/80 backdrop-blur-sm"
    >
      {TABS.map((tab) => {
        const isActive = tab === activeTab
        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-semibold relative transition-colors ${
              isActive ? 'text-[#1A3A2A]' : 'text-gray-400'
            }`}
          >
            {tab}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: '#F5A623' }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
