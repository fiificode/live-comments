import type { Topic } from "../../../types";

interface TopicCardProps {
  topic: Topic;
  isActive: boolean;
  onClick: () => void;
}

export default function TopicCard({
  topic,
  isActive,
  onClick,
}: TopicCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex cursor-pointer items-center justify-between p-4 mb-2 rounded-lg text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3A2A] focus-visible:ring-offset-2 ${
        isActive
          ? " bg-[#146623] shadow text-white"
          : "border-l-4 border-transparent bg-[#F5EAD3] hover:shadow-md text-gray-900"
      }`}
    >
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center">
          <p className={`font-bold text-[18px] truncate ${isActive ? "text-white" : "text-[#000000]"}`}>{topic.title}</p>
        </div>
        <p className={`text-[16px] font-extralight text-wrap ${isActive ? "text-white" : "text-[#000000]"}`}>{topic.subtitle}</p>
      </div>
      <svg
        className={`w-5 h-5 shrink-0 ml-2 self-start ${isActive ? "text-white" : "text-[#000000]"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}
