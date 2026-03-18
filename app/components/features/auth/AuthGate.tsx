interface AuthGateProps {
  onAuth: () => void
  onDismiss: () => void
}

export default function AuthGate({ onAuth, onDismiss }: AuthGateProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={onDismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-gate-title"
        className="w-full max-w-lg bg-white rounded-t-2xl p-6 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
        <h2 id="auth-gate-title" className="text-xl font-bold text-gray-900 mb-2">
          Become part of the conversation
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Join thousands of sports fans discussing live events.
        </p>
        <button
          onClick={onAuth}
          className="w-full py-3 rounded-xl font-bold text-white mb-3"
          style={{ backgroundColor: '#1A3A2A' }}
        >
          Sign In
        </button>
        <button
          onClick={onAuth}
          className="w-full py-3 rounded-xl font-bold border-2 border-[#1A3A2A] text-[#1A3A2A]"
        >
          Create Account
        </button>
      </div>
    </div>
  )
}
