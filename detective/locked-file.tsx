"use client"

import { Lock, Eye, EyeOff, X } from "lucide-react"
import { useState } from "react"

interface LockedFileProps {
  id: string
  title: string
  content: string
  password: string
  hint?: string
  onUnlock?: (id: string) => void
  isUnlocked?: boolean
  position: { x: number; y: number }
  rotation?: number
}

export function LockedFile({
  id,
  title,
  content,
  password,
  hint,
  onUnlock,
  isUnlocked = false,
  position,
  rotation = 0,
}: LockedFileProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleUnlock = () => {
    if (passwordInput.toLowerCase() === password.toLowerCase()) {
      onUnlock?.(id)
      setError("")
      setPasswordInput("")
    } else {
      setError("Codigo incorreto. Tente novamente.")
    }
  }

  return (
    <>
      {/* Manila envelope on board */}
      <div
        className="absolute cursor-pointer lift-hover glow-hover"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: `rotate(${rotation}deg)`,
          ["--rotation" as string]: `${rotation}deg`,
          zIndex: 10,
        }}
        onClick={() => setIsOpen(true)}
      >
        {/* Push pin */}
        <div className="push-pin absolute -top-1.5 right-6 w-4 h-4 rounded-full z-10" />
        
        {/* Manila envelope */}
        <div className="manila-envelope w-36 h-28 md:w-44 md:h-32 relative overflow-hidden">
          {/* Paper texture */}
          <div className="absolute inset-0 paper-grain opacity-30" />
          
          {/* Envelope flap */}
          <div 
            className="absolute top-0 left-0 right-0 h-8"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 100%)',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
            }}
          />
          
          {/* Title label */}
          <div className="absolute top-3 left-0 right-0 px-3">
            <p className="text-[9px] text-amber-950 typewriter uppercase tracking-wider text-center font-bold">
              {title}
            </p>
          </div>
          
          {/* CONFIDENTIAL stamp */}
          <div 
            className="confidential-stamp absolute bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[8px] rounded-sm border-2"
            style={{ transform: 'translateX(-50%) rotate(-8deg)' }}
          >
            CONFIDENCIAL
          </div>
          
          {/* Access restriction sticky */}
          <div 
            className="sticky-note absolute -bottom-1 -right-1 px-2 py-1 text-[7px] text-neutral-800 font-bold"
            style={{ transform: 'rotate(6deg)' }}
          >
            {isUnlocked ? (
              <span className="text-green-700">ABERTO</span>
            ) : (
              <>
                <Lock className="w-2.5 h-2.5 inline mr-0.5" />
                ACESSO RESTRITO
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-lg w-full max-h-[85vh] overflow-auto rounded-sm manila-envelope"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 paper-grain pointer-events-none" />
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-amber-950/90 text-white hover:bg-amber-900 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {!isUnlocked ? (
              <div className="p-8 text-center relative">
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #a82020 0%, #5a1010 100%)',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.4)',
                  }}
                >
                  <Lock className="w-7 h-7 text-red-200" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-amber-950 typewriter uppercase">
                  {title}
                </h3>
                <p className="text-sm text-amber-900 mb-6">
                  Este envelope confidencial requer autorizacao.
                </p>

                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                    placeholder="Digite a senha..."
                    className="w-full px-4 py-3 bg-amber-100/80 border-2 border-amber-700 rounded text-amber-950 placeholder:text-amber-700/60 focus:border-red-800 focus:outline-none typewriter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-800"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {error && <p className="text-red-800 text-sm mb-4 font-medium">{error}</p>}

                <button
                  onClick={handleUnlock}
                  className="w-full py-3 bg-red-800 text-white rounded font-medium hover:bg-red-700 transition-colors typewriter"
                >
                  Desbloquear Envelope
                </button>

                {hint && (
                  <div className="mt-6">
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="text-sm text-amber-800 hover:text-amber-950 underline"
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
                <h3 className="text-lg font-bold text-amber-950 typewriter uppercase mb-4 pb-3 border-b-2 border-amber-800/30">
                  {title}
                </h3>
                
                <div className="p-4 rounded" style={{ background: 'rgba(255,255,255,0.3)' }}>
                  <div className="typewriter text-sm leading-relaxed text-amber-950">
                    {content.split("\n").map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
