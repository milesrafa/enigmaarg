"use client"

import { CheckCircle2, Circle, Trophy, Lock, FileText, Image, StickyNote, FolderOpen } from "lucide-react"

interface Evidence {
  id: string
  title: string
  type: "photo" | "note" | "document" | "file" | "sticky"
  isUnlocked: boolean
}

interface EvidencePanelProps {
  evidence: Evidence[]
  totalClues: number
  unlockedClues: number
  onSelectEvidence?: (id: string) => void
  isFinalUnlocked: boolean
}

export function EvidencePanel({
  evidence,
  totalClues,
  unlockedClues,
  onSelectEvidence,
  isFinalUnlocked,
}: EvidencePanelProps) {
  const progress = (unlockedClues / totalClues) * 100

  const getTypeIcon = (type: Evidence["type"]) => {
    switch (type) {
      case "photo":
        return <Image className="w-4 h-4" />
      case "note":
        return <FileText className="w-4 h-4" />
      case "sticky":
        return <StickyNote className="w-4 h-4" />
      case "document":
        return <FileText className="w-4 h-4" />
      case "file":
        return <FolderOpen className="w-4 h-4" />
    }
  }

  return (
    <div 
      className="h-full flex flex-col border-l-2"
      style={{
        background: 'linear-gradient(180deg, oklch(0.08 0.01 40) 0%, oklch(0.06 0.01 35) 100%)',
        borderColor: 'oklch(0.2 0.02 45)',
      }}
    >
      {/* Header */}
      <div 
        className="p-5 border-b"
        style={{ borderColor: 'oklch(0.18 0.02 45)' }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div 
            className="w-10 h-10 rounded flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, oklch(0.2 0.03 50) 0%, oklch(0.15 0.02 45) 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            <span className="text-xl">🔍</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground typewriter">Evidencias</h2>
            <p className="text-[10px] text-muted-foreground">
              Quadro de investigacao
            </p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div 
        className="p-5 border-b"
        style={{ borderColor: 'oklch(0.18 0.02 45)' }}
      >
        <div className="flex justify-between text-sm mb-3">
          <span className="text-muted-foreground typewriter text-xs">Progresso</span>
          <span 
            className="font-mono text-sm font-bold"
            style={{ color: 'oklch(0.65 0.15 85)' }}
          >
            {unlockedClues}/{totalClues}
          </span>
        </div>
        
        {/* Progress bar */}
        <div 
          className="h-2 rounded-full overflow-hidden relative"
          style={{
            background: 'oklch(0.15 0.01 40)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)',
          }}
        >
          <div
            className="h-full transition-all duration-700 ease-out relative"
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(90deg, oklch(0.45 0.2 25) 0%, oklch(0.55 0.18 50) 50%, oklch(0.6 0.15 85) 100%)',
              boxShadow: '0 0 8px rgba(200, 150, 100, 0.5)',
            }}
          >
            {/* Shine effect */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
              }}
            />
          </div>
        </div>
        
        {progress === 100 && !isFinalUnlocked && (
          <p 
            className="text-xs mt-3 typewriter animate-pulse"
            style={{ color: 'oklch(0.65 0.15 85)' }}
          >
            Todas as pistas coletadas! Arquivo final desbloqueado.
          </p>
        )}
      </div>

      {/* Evidence list */}
      <div className="flex-1 overflow-auto p-4">
        <h3 
          className="text-[10px] font-semibold uppercase tracking-wider mb-4 typewriter"
          style={{ color: 'oklch(0.5 0.02 60)' }}
        >
          Pistas Coletadas
        </h3>
        <div className="space-y-2">
          {evidence.map((item) => (
            <button
              key={item.id}
              onClick={() => item.isUnlocked && onSelectEvidence?.(item.id)}
              disabled={!item.isUnlocked}
              className={`w-full flex items-center gap-3 p-3 rounded transition-all duration-200 text-left group ${
                item.isUnlocked
                  ? "cursor-pointer hover:translate-x-1"
                  : "cursor-not-allowed opacity-40"
              }`}
              style={{
                background: item.isUnlocked 
                  ? 'linear-gradient(90deg, oklch(0.15 0.02 50) 0%, oklch(0.12 0.01 45) 100%)'
                  : 'transparent',
                boxShadow: item.isUnlocked 
                  ? 'inset 0 1px 0 rgba(255,255,255,0.03), 0 2px 4px rgba(0,0,0,0.2)'
                  : 'none',
              }}
            >
              <div 
                className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                style={{
                  background: item.isUnlocked 
                    ? 'linear-gradient(135deg, oklch(0.25 0.03 50) 0%, oklch(0.2 0.02 45) 100%)'
                    : 'oklch(0.15 0.01 40)',
                  color: item.isUnlocked ? 'oklch(0.8 0.05 85)' : 'oklch(0.4 0.01 40)',
                }}
              >
                {getTypeIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p 
                  className="text-sm font-medium truncate typewriter"
                  style={{ 
                    color: item.isUnlocked ? 'oklch(0.85 0.02 60)' : 'oklch(0.45 0.01 60)' 
                  }}
                >
                  {item.title}
                </p>
                <p 
                  className="text-[10px]"
                  style={{ 
                    color: item.isUnlocked ? 'oklch(0.55 0.1 140)' : 'oklch(0.4 0.01 40)' 
                  }}
                >
                  {item.isUnlocked ? "Desbloqueado" : "Bloqueado"}
                </p>
              </div>
              {item.isUnlocked ? (
                <CheckCircle2 
                  className="w-5 h-5 flex-shrink-0" 
                  style={{ color: 'oklch(0.55 0.15 140)' }}
                />
              ) : (
                <Circle 
                  className="w-5 h-5 flex-shrink-0" 
                  style={{ color: 'oklch(0.35 0.01 40)' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Final case status */}
      <div 
        className="p-4 border-t"
        style={{ borderColor: 'oklch(0.18 0.02 45)' }}
      >
        <div
          className="p-4 rounded relative overflow-hidden"
          style={{
            background: isFinalUnlocked
              ? 'linear-gradient(135deg, oklch(0.25 0.08 85 / 0.5) 0%, oklch(0.2 0.06 75 / 0.5) 100%)'
              : 'linear-gradient(135deg, oklch(0.12 0.01 40) 0%, oklch(0.1 0.01 35) 100%)',
            border: `1px solid ${isFinalUnlocked ? 'oklch(0.5 0.12 85)' : 'oklch(0.2 0.02 40)'}`,
            boxShadow: isFinalUnlocked 
              ? '0 0 20px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
              : 'inset 0 1px 0 rgba(255,255,255,0.02)',
          }}
        >
          {/* Subtle pattern */}
          <div className="absolute inset-0 paper-grain opacity-10 pointer-events-none" />
          
          <div className="flex items-center gap-3 relative">
            {isFinalUnlocked ? (
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, oklch(0.65 0.12 85) 0%, oklch(0.5 0.1 75) 100%)',
                  boxShadow: '0 2px 8px rgba(212, 175, 55, 0.4)',
                }}
              >
                <Trophy className="w-5 h-5 text-amber-100" />
              </div>
            ) : (
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'oklch(0.15 0.01 40)',
                }}
              >
                <Lock className="w-5 h-5" style={{ color: 'oklch(0.4 0.01 40)' }} />
              </div>
            )}
            <div>
              <h4 
                className="font-bold typewriter"
                style={{ 
                  color: isFinalUnlocked ? 'oklch(0.7 0.12 85)' : 'oklch(0.5 0.01 40)' 
                }}
              >
                Arquivo Final
              </h4>
              <p 
                className="text-xs"
                style={{ color: 'oklch(0.5 0.02 60)' }}
              >
                {isFinalUnlocked
                  ? "Caso resolvido!"
                  : `Colete ${totalClues - unlockedClues} pista(s) restante(s)`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
