import useStore from "../../store/useStore";

const TABS = ["Conversations", "Games", "News", "Stats"];

export default function TabBar() {
  const activeTab = useStore((s) => s.activeTab);
  const setActiveTab = useStore((s) => s.setActiveTab);

  return (
    <div role="tablist" className="flex mt-4 px-4 relative">
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, #006824, #FFDF75)" }}
      />
      {TABS.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-semibold relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1A3A2A] ${
              isActive ? "text-[#1A3A2A]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: "#006824" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
