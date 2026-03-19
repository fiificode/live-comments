interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div style={{ backgroundColor: "#FFFAED" }} className="min-h-screen">
      <div className="max-w-lg mx-auto min-h-screen">{children}</div>
    </div>
  );
}
