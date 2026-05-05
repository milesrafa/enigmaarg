"use client"

import { X, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface ClueCardProps {
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
  onUnlock?: (id: string) => void
  isUnlocked?: boolean
}

export function ClueCard({
  id,
  title,
  content,
  type,
  imageUrl,
  timestamp,
  isLocked = false,
  password,
  hint,
  position,
  rotation = 0,
  onUnlock,
  isUnlocked = false,
}: ClueCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleUnlock = () => {
    if (passwordInput.toLowerCase() === password?.toLowerCase()) {
      onUnlock?.(id)
      setError("")
      setPasswordInput("")
    } else {
      setError("Senha incorreta. Tente novamente.")
    }
  }

  const isAccessible = !isLocked || isUnlocked

  const renderCard = () => {
    switch (type) {
      case "photo":
        return (
          <div className="relative lift-hover glow-hover cursor-pointer" style={{ ["--rotation" as string]: `${rotation}deg` }}>
            {/* Tape at top */}
            <div 
              className="tape absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 z-10"
              style={{ transform: `translateX(-50%) rotate(${-3 + Math.random() * 6}deg)` }}
            />
            
            {/* Polaroid frame */}
            <div className="polaroid w-32 h-40 md:w-40 md:h-48">
              {/* Photo area */}
              <div className="relative w-full aspect-square bg-neutral-900 overflow-hidden">
                {imageUrl ? (
                  <Image 
                    src={imageUrl} 
                    alt={title}
                    fill
                    className="object-cover"
                    style={{ filter: 'contrast(1.1) saturate(0.9)' }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900" />
                )}
                
                {/* Film grain */}
                <div className="absolute inset-0 paper-grain opacity-40" />
                
                {/* Timestamp overlay for security cam */}
                {timestamp && (
                  <div 
                    className="absolute top-2 right-2 px-2 py-0.5 text-[9px] typewriter"
                    style={{ 
                      background: 'rgba(0,0,0,0.7)', 
                      color: '#00ff00',
                      textShadow: '0 0 5px #00ff00'
                    }}
                  >
                    {timestamp}
                  </div>
                )}
                
                {/* Lock overlay */}
                {isLocked && !isUnlocked && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                    <Lock className="w-8 h-8 text-white/80" />
                    <div 
                      className="sticky-note px-2 py-1 text-[8px] text-neutral-800 font-bold"
                      style={{ transform: 'rotate(-5deg)' }}
                    >
                      PRECISA DE ACESSO
                    </div>
                  </div>
                )}
              </div>
              
              {/* Caption */}
              <div className="pt-3 px-1 text-center">
                <p className="text-[10px] text-neutral-600 typewriter uppercase tracking-wide">
                  {title}
                </p>
              </div>
            </div>
            
            {/* Push pin */}
            <div className="push-pin absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-20" />
          </div>
        )

      case "note":
        return (
          <div className="relative lift-hover glow-hover cursor-pointer" style={{ ["--rotation" as string]: `${rotation}deg` }}>
            {/* Push pin */}
            <div className="push-pin absolute -top-1.5 left-6 w-4 h-4 rounded-full z-10" />
            
            {/* Aged paper */}
            <div className="aged-paper paper-lines w-40 h-52 md:w-48 md:h-60 relative overflow-hidden">
              {/* Paper texture */}
              <div className="absolute inset-0 paper-grain" />
              
              {/* Title */}
              <div className="relative p-4 pt-5">
                <h4 className="text-xs font-bold text-neutral-800 typewriter uppercase tracking-wide border-b border-neutral-400/30 pb-2 mb-3">
                  {title}
                </h4>
                
                {/* Content preview */}
                <div className="text-[11px] text-neutral-700 handwritten leading-relaxed line-clamp-6">
                  {content.split('\n').slice(0, 4).map((line, i) => (
                    <p key={i} className="mb-1">{line}</p>
                  ))}
                </div>
                
                {/* Signature at bottom */}
                <div className="absolute bottom-4 right-4 text-sm handwritten text-neutral-600">
                  -M
                </div>
              </div>
              
              {/* Torn edge at bottom */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-4"
                style={{
                  background: 'inherit',
                  maskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q5 7 10 10 T20 10 T30 10 T40 10 T50 10 T60 10 T70 10 T80 10 T90 10 T100 10 V0 H0 Z' fill='black'/%3E%3C/svg%3E")`,
                  maskSize: '100% 100%',
                }}
              />
            </div>
          </div>
        )

      case "sticky":
        return (
          <div className="relative lift-hover glow-hover cursor-pointer" style={{ ["--rotation" as string]: `${rotation}deg` }}>
            {/* Sticky note */}
            <div className="sticky-note w-28 h-28 md:w-32 md:h-32 relative">
              {/* Folded corner effect */}
              <div 
                className="absolute bottom-0 right-0 w-5 h-5"
                style={{
                  background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%)',
                }}
              />
              
              {/* Content */}
              <div className="p-3 pt-2">
                <p className="text-[10px] text-neutral-800 handwritten leading-relaxed">
                  {content}
                </p>
              </div>
            </div>
          </div>
        )

      case "document":
        return (
          <div className="relative lift-hover glow-hover cursor-pointer" style={{ ["--rotation" as string]: `${rotation}deg` }}>
            {/* Push pin */}
            <div className="push-pin absolute -top-1.5 left-8 w-4 h-4 rounded-full z-10" />
            
            {/* Document paper */}
            <div 
              className="w-40 h-52 md:w-48 md:h-60 relative overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #f8f6f0 0%, #f0ede4 100%)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.35), 0 10px 25px rgba(0,0,0,0.25)',
              }}
            >
              {/* Paper texture */}
              <div className="absolute inset-0 paper-grain opacity-50" />
              
              {/* Red margin line */}
              <div className="absolute top-0 bottom-0 left-8 w-px bg-red-300/60" />
              
              {/* Paper clip */}
              <div 
                className="absolute -top-2 right-6 w-8 h-12"
                style={{
                  background: 'linear-gradient(90deg, #b8b8b8 0%, #e8e8e8 30%, #d0d0d0 50%, #e0e0e0 70%, #c0c0c0 100%)',
                  clipPath: 'polygon(20% 0, 80% 0, 80% 100%, 60% 100%, 60% 20%, 40% 20%, 40% 100%, 20% 100%)',
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              />
              
              {/* Content */}
              <div className="relative p-4 pt-5 pl-12">
                <h4 className="text-[10px] font-bold text-neutral-700 typewriter uppercase tracking-wider mb-2">
                  {title}
                </h4>
                
                {/* Fake text lines */}
                <div className="space-y-2 mt-4">
                  {[1,2,3,4,5].map(i => (
                    <div 
                      key={i}
                      className="h-1.5 bg-neutral-300/70 rounded"
                      style={{ width: `${60 + Math.random() * 30}%` }}
                    />
                  ))}
                </div>
              </div>
              
              {/* CONFIDENTIAL stamp */}
              {isLocked && !isUnlocked && (
                <div 
                  className="confidential-stamp absolute bottom-8 left-1/2 -translate-x-1/2 px-3 py-1.5 text-[10px] rounded-sm"
                  style={{ transform: 'translateX(-50%) rotate(-15deg)' }}
                >
                  CONFIDENCIAL
                </div>
              )}
              
              {/* Lock indicator sticky note */}
              {isLocked && !isUnlocked && (
                <div 
                  className="sticky-note absolute bottom-3 right-2 px-2 py-1.5 text-[8px] text-neutral-800"
                  style={{ transform: 'rotate(3deg)' }}
                >
                  <Lock className="w-3 h-3 inline mr-1" />
                  Senha necessaria
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {/* Card on board */}
      <div
        className="absolute transition-transform duration-300"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: `rotate(${rotation}deg)`,
          zIndex: 10,
        }}
        onClick={() => setIsOpen(true)}
      >
        {renderCard()}
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-lg w-full max-h-[85vh] overflow-auto rounded-sm"
            style={{
              background: type === "sticky"
                ? 'linear-gradient(135deg, #fff9b1 0%, #ffe968 100%)'
                : type === "note"
                ? 'linear-gradient(135deg, #e8dcc8 0%, #cfc0a8 100%)'
                : '#f8f6f0',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 paper-grain pointer-events-none" />
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-neutral-800/90 text-white hover:bg-neutral-700 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {isLocked && !isUnlocked ? (
              <div className="p-8 text-center relative">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(139, 30, 30, 0.15)' }}>
                  <Lock className="w-10 h-10 text-red-800" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-neutral-800 typewriter">
                  Documento Bloqueado
                </h3>
                <p className="text-sm text-neutral-600 mb-6">
                  Este documento requer uma senha para acessar.
                </p>

                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                    placeholder="Digite a senha..."
                    className="w-full px-4 py-3 bg-white/80 border-2 border-neutral-400 rounded text-neutral-800 placeholder:text-neutral-400 focus:border-red-700 focus:outline-none typewriter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {error && <p className="text-red-700 text-sm mb-4">{error}</p>}

                <button
                  onClick={handleUnlock}
                  className="w-full py-3 bg-red-800 text-white rounded font-medium hover:bg-red-700 transition-colors typewriter"
                >
                  Desbloquear
                </button>

                {hint && (
                  <div className="mt-6">
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="text-sm text-neutral-500 hover:text-neutral-700 underline"
                    >
                      {showHint ? "Esconder dica" : "Mostrar dica"}
                    </button>
                    {showHint && (
                      <div className="sticky-note mt-3 p-3 text-sm text-neutral-800 handwritten mx-auto max-w-xs" style={{ transform: 'rotate(-2deg)' }}>
                        Dica: {hint}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 relative">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-neutral-300/50">
                  <h3 className="text-lg font-bold text-neutral-800 typewriter uppercase">
                    {title}
                  </h3>
                </div>
                
                {type === "photo" && imageUrl && (
                  <div className="relative aspect-video mb-4 bg-neutral-900 rounded overflow-hidden">
                    <Image src={imageUrl} alt={title} fill className="object-cover" />
                    {timestamp && (
                      <div className="absolute top-2 right-2 px-2 py-1 text-xs typewriter bg-black/70 text-green-400">
                        {timestamp}
                      </div>
                    )}
                  </div>
                )}
                
                <div className={`leading-relaxed text-neutral-700 ${type === "note" || type === "sticky" ? "handwritten text-base" : "typewriter text-sm"}`}>
                  {content.split("\n").map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
