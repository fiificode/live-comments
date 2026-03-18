interface AppShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div style={{ backgroundColor: '#F5F0E8' }} className="min-h-screen">
      <div className="max-w-lg mx-auto min-h-screen relative">
        {children}
      </div>
    </div>
  )
}
