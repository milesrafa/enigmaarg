"use client"

interface RedStringProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  isActive?: boolean
}

export function RedString({ from, to, isActive = true }: RedStringProps) {
  if (!isActive) return null

  const dx = to.x - from.x
  const dy = to.y - from.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  const sagAmount = Math.min(distance * 0.12, 6)
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2 + sagAmount

  const filterId = `shadow-${from.x}-${to.x}`.replace(/\./g, '')

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.5" />
        </filter>
        <radialGradient id="pinGrad" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#c94040" />
          <stop offset="60%" stopColor="#8b2020" />
          <stop offset="100%" stopColor="#5a1515" />
        </radialGradient>
      </defs>
      
      {/* String */}
      <path
        d={`M ${from.x}% ${from.y}% Q ${midX}% ${midY}% ${to.x}% ${to.y}%`}
        fill="none"
        stroke="#8b2020"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter={`url(#${filterId})`}
      />
      
      {/* From pin */}
      <circle cx={`${from.x}%`} cy={`${from.y}%`} r="6" fill="url(#pinGrad)" filter={`url(#${filterId})`} />
      <circle cx={`${from.x}%`} cy={`${from.y}%`} r="2" fill="rgba(255,200,200,0.4)" transform="translate(-1,-1)" />
      
      {/* To pin */}
      <circle cx={`${to.x}%`} cy={`${to.y}%`} r="6" fill="url(#pinGrad)" filter={`url(#${filterId})`} />
      <circle cx={`${to.x}%`} cy={`${to.y}%`} r="2" fill="rgba(255,200,200,0.4)" transform="translate(-1,-1)" />
    </svg>
  )
}
