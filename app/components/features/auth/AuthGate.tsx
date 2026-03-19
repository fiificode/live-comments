interface AuthGateProps {
  onAuth: (e?: React.FormEvent) => void
  onDismiss: () => void
}

export default function AuthGate({ onAuth, onDismiss }: AuthGateProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAuth(e);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onDismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-gate-title"
        className="w-full max-w-md mx-4 bg-[#FFFAED] rounded-2xl p-6 max-h-[90vh] overflow-y-auto animate-page-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image section */}
        <div className="relative mb-2">
          <img
            src="/InspoAuth.png"
            alt="Topic illustration"
            className="w-full aspect-video object-contain rounded-lg"
          />
     
        </div>

        {/* Text content */}
        <h2 id="auth-gate-title" className="text-[18px] font-bold text-[#000000] mb-2 text-center">
          Become part of the conversation
        </h2>
        <p className="text-[#000000] text-[16px] mb-8 text-center">
          Sign in to participate in the topic
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onAuth(e);
            }}
            className="w-full py-3 rounded-full cursor-pointer font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146623] focus-visible:ring-offset-2"
            style={{ backgroundColor: '#146623' }}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onAuth(e);
            }}
            className="w-full py-3 rounded-full cursor-pointer font-bold border-2 border-[#146623] text-[#146623] transition-colors hover:bg-[#146623]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146623] focus-visible:ring-offset-2"
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  )
}
