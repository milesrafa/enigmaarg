"use client"

import { ClueCard } from "./clue-card"
import { LockedFile } from "./locked-file"
import { RedString } from "./red-string"
import { FinalReveal } from "./final-reveal"

interface Clue {
  id: string
  title: string
  content: string
  type: "photo" | "note" | "document" | "sticky"
  imageUrl?: string
  timestamp?: string
  isLocked?: boolean
  password?: string
  hint?: string
  position: { x: number; y: number }
  rotation?: number
}

interface LockedFileData {
  id: string
  title: string
  content: string
  password: string
  hint?: string
  position: { x: number; y: number }
  rotation?: number
}

interface Connection {
  from: { x: number; y: number }
  to: { x: number; y: number }
  requiredClues?: string[]
}

interface InvestigationBoardProps {
  clues: Clue[]
  lockedFiles: LockedFileData[]
  connections: Connection[]
  unlockedClues: string[]
  onUnlockClue: (id: string) => void
  finalReveal: {
    title: string
    content: string
    position: { x: number; y: number }
  }
  isFinalUnlocked: boolean
}

export function InvestigationBoard({
  clues,
  lockedFiles,
  connections,
  unlockedClues,
  onUnlockClue,
  finalReveal,
  isFinalUnlocked,
}: InvestigationBoardProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Wooden desk background */}
      <div className="absolute inset-0 wood-desk" />
      
      {/* Scratches overlay */}
      <div className="absolute inset-0 scratches pointer-events-none" />
      
      {/* Dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-amber-100/30 rounded-full animate-dust"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>
      
      {/* Lamp light effect */}
      <div className="absolute inset-0 pointer-events-none animate-lamp-flicker">
        <div 
          className="absolute"
          style={{
            top: '-5%',
            right: '0%',
            width: '50%',
            height: '60%',
            background: 'radial-gradient(ellipse at 100% 0%, rgba(255, 180, 100, 0.12) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Coffee stain decorations */}
      <div className="coffee-stain absolute w-28 h-28 pointer-events-none" style={{ bottom: '5%', left: '5%', opacity: 0.5 }} />
      <div className="coffee-stain absolute w-20 h-20 pointer-events-none" style={{ top: '60%', right: '12%', opacity: 0.3 }} />

      {/* Magnifying glass decoration */}
      <div 
        className="absolute pointer-events-none opacity-40"
        style={{ bottom: '8%', left: '35%' }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="24" cy="24" r="18" stroke="#8b7355" strokeWidth="4" fill="none" />
          <circle cx="24" cy="24" r="14" stroke="#a08060" strokeWidth="1" fill="rgba(255,255,255,0.05)" />
          <line x1="38" y1="38" x2="55" y2="55" stroke="#5d4d3a" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>

      {/* Scattered newspaper clipping */}
      <div 
        className="absolute pointer-events-none opacity-60"
        style={{ bottom: '3%', right: '3%', transform: 'rotate(15deg)' }}
      >
        <div 
          className="w-40 h-24 p-2 overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #e8e0d0 0%, #d8cfc0 100%)',
            boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
          }}
        >
          <div className="paper-grain absolute inset-0" />
          <p className="text-[7px] font-bold text-neutral-800 typewriter uppercase">EMPRESA ENVOLVIDA EM</p>
          <p className="text-[7px] font-bold text-neutral-800 typewriter uppercase">ESQUEMA MILIONARIO</p>
          <div className="mt-1 space-y-0.5">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-1 bg-neutral-400/50 rounded" style={{ width: `${60 + Math.random() * 30}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Summary note at bottom */}
      <div 
        className="absolute pointer-events-none"
        style={{ bottom: '12%', left: '8%', transform: 'rotate(-3deg)' }}
      >
        <div className="aged-paper w-44 h-36 p-3 relative">
          <div className="paper-grain absolute inset-0" />
          <p className="text-[9px] text-neutral-700 typewriter font-bold mb-2 relative">O que sabemos ate agora?</p>
          <div className="text-[8px] text-neutral-600 handwritten space-y-1 relative">
            <p>- Encontro as 22h</p>
            <p>- Documentos importantes</p>
            <p>- Alguem esta envolvido ate o topo</p>
            <p>- Marcos tinha provas</p>
            <p className="text-red-700">???</p>
          </div>
        </div>
      </div>

      {/* Red strings connecting clues */}
      {connections.map((connection, index) => {
        const isActive =
          !connection.requiredClues ||
          connection.requiredClues.every((id) => unlockedClues.includes(id))
        return (
          <RedString
            key={index}
            from={connection.from}
            to={connection.to}
            isActive={isActive}
          />
        )
      })}

      {/* Clue cards */}
      {clues.map((clue) => (
        <ClueCard
          key={clue.id}
          {...clue}
          isUnlocked={!clue.isLocked || unlockedClues.includes(clue.id)}
          onUnlock={onUnlockClue}
        />
      ))}

      {/* Locked files (manila envelopes) */}
      {lockedFiles.map((file) => (
        <LockedFile
          key={file.id}
          {...file}
          isUnlocked={unlockedClues.includes(file.id)}
          onUnlock={onUnlockClue}
        />
      ))}

      {/* Final reveal */}
      <FinalReveal
        isUnlocked={isFinalUnlocked}
        title={finalReveal.title}
        content={finalReveal.content}
        position={finalReveal.position}
      />
    </div>
  )
}
