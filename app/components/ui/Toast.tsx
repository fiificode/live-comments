interface ToastProps {
  message: string
  visible: boolean
}

export default function Toast({ message, visible }: ToastProps) {
  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex px-4 py-2 max-w-sm rounded-full items-center justify-center text-sm font-semibold text-white shadow-lg transition-all duration-300 text-center ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
      style={{ backgroundColor: '#1A3A2A' }}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  )
}
