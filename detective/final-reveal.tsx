"use client"

import { Lock, Trophy, X } from "lucide-react"
import { useState } from "react"

interface FinalRevealProps {
  isUnlocked: boolean
  content: string
  title: string
  position: { x: number; y: number }
}

export function FinalReveal({ isUnlocked, content, title, position }: FinalRevealProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={`absolute ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          zIndex: isUnlocked ? 15 : 5,
        }}
        onClick={() => isUnlocked && setIsOpen(true)}
      >
        <div className={`relative ${isUnlocked ? 'lift-hover' : ''}`} style={{ ["--rotation" as string]: '0deg' }}>
          {/* Final file folder */}
          <div 
            className={`final-file w-48 h-32 md:w-56 md:h-36 relative overflow-hidden ${isUnlocked ? 'animate-unlock-glow' : ''}`}
            style={{
              borderRadius: '4px',
              background: isUnlocked 
                ? 'linear-gradient(145deg, #4a4a4a 0%, #2d2d2d 50%, #1d1d1d 100%)'
                : 'linear-gradient(145deg, #3d3d3d 0%, #2d2d2d 50%, #1d1d1d 100%)',
            }}
          >
            {/* Paper texture */}
            <div className="absolute inset-0 paper-grain opacity-20" />
            
            {/* Folder tab */}
            <div 
              className="absolute -top-2 left-6 w-20 h-4 rounded-t"
              style={{
                background: isUnlocked 
                  ? 'linear-gradient(180deg, #5a5a5a 0%, #3d3d3d 100%)'
                  : 'linear-gradient(180deg, #4a4a4a 0%, #3d3d3d 100%)',
              }}
            />
            
            {/* Lock / Trophy icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
                style={{
                  background: isUnlocked 
                    ? 'radial-gradient(circle at 30% 30%, #d4af37 0%, #a8852d 60%, #8b6914 100%)'
                    : 'rgba(60,60,60,0.8)',
                  boxShadow: isUnlocked 
                    ? '0 4px 15px rgba(212, 175, 55, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)'
                    : '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                {isUnlocked ? (
                  <Trophy className="w-7 h-7 text-amber-100" />
                ) : (
                  <Lock className="w-7 h-7 text-neutral-400" />
                )}
              </div>
              
              <p 
                className="text-xs typewriter font-bold uppercase tracking-wider"
                style={{ color: isUnlocked ? '#d4af37' : '#888' }}
              >
                ARQUIVO FINAL
              </p>
              <p className="text-[9px] text-neutral-500 mt-1">
                {isUnlocked ? 'Clique para revelar' : 'Colete todas as pistas para desbloquear'}
              </p>
            </div>
            
            {/* Metal clasp */}
            <div 
              className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full"
              style={{
                background: 'linear-gradient(180deg, #888 0%, #666 50%, #888 100%)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && isUnlocked && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] overflow-auto"
            style={{
              background: 'linear-gradient(145deg, #1a1815 0%, #0f0d0a 100%)',
              boxShadow: '0 0 60px rgba(212, 175, 55, 0.25), 0 25px 50px rgba(0,0,0,0.5)',
              border: '2px solid #d4af37',
              borderRadius: '4px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 paper-grain opacity-10 pointer-events-none" />
            
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-amber-600/60" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-amber-600/60" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-amber-600/60" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-amber-600/60" />

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-12 relative">
              {/* Header */}
              <div className="text-center mb-8">
                <div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #d4af37 0%, #a8852d 60%, #8b6914 100%)',
                    boxShadow: '0 4px 20px rgba(212, 175, 55, 0.5), inset 0 2px 8px rgba(255,255,255,0.2)',
                  }}
                >
                  <Trophy className="w-10 h-10 text-amber-100" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 typewriter text-amber-500">
                  {title}
                </h2>
                <div 
                  className="w-40 h-0.5 mx-auto"
                  style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }}
                />
              </div>

              {/* Document */}
              <div 
                className="relative p-6 rounded"
                style={{
                  background: 'linear-gradient(180deg, #f5f0e6 0%, #e8dcc8 100%)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                <div className="absolute inset-0 paper-grain rounded pointer-events-none" />
                
                <div className="typewriter text-neutral-800 leading-relaxed text-sm relative">
                  {content.split("\n").map((line, i) => (
                    <p key={i} className={`mb-2 ${line.startsWith('-') ? 'pl-4' : ''}`}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-amber-600/80 typewriter text-sm">
                  Parabens, detetive! Voce resolveu o caso.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
