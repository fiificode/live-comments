export default function Header() {
  return (
    <div
      style={{ backgroundColor: '#1A3A2A' }}
      className="relative h-40 flex flex-col justify-end p-4 overflow-hidden"
    >
      {/* Sports image placeholder */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-transparent to-black" />
      <div className="relative z-10">
        <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">Open Talk</p>
        <h1 className="text-3xl font-black text-white tracking-tight">FANZONE</h1>
      </div>
    </div>
  )
}
