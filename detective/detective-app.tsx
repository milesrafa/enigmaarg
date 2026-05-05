"use client"

import { useState, useMemo } from "react"
import { Menu, X } from "lucide-react"
import { InvestigationBoard } from "@/components/detective/investigation-board"
import { EvidencePanel } from "@/components/detective/evidence-panel"

// Game data - positioned for realistic desk layout
const CLUES = [
  {
    id: "photo-1",
    title: "Foto do Local",
    content: `Foto tirada no escritorio da vitima as 23:47.
    
Nota: Observe a janela - ela estava aberta, mas o alarme nao disparou. O sistema de seguranca foi desativado as 23:30.

Detalhe importante: Ha um reflexo no espelho mostrando alguem com uma jaqueta azul.`,
    type: "photo" as const,
    position: { x: 8, y: 12 },
    rotation: -4,
  },
  {
    id: "note-1",
    title: "Bilhete Misterioso",
    content: `"Encontre-me no cafe as 22h. 
Traga os documentos. 
Nao confie em ninguem da empresa.
- M"

(Encontrado na lixeira do escritorio)`,
    type: "note" as const,
    position: { x: 52, y: 8 },
    rotation: 6,
  },
  {
    id: "sticky-1",
    title: "Lembrete",
    content: `Verificar alibi do CFO
Cameras: 23:15
Placa: ABC-??47`,
    type: "sticky" as const,
    position: { x: 78, y: 5 },
    rotation: -8,
  },
  {
    id: "doc-1",
    title: "Relatorio Financeiro",
    content: `CONFIDENCIAL - Auditoria Interna

Descobertas:
- R$ 2.5 milhoes desviados nos ultimos 6 meses
- Transacoes autorizadas por 3 pessoas: CEO, CFO e Diretor de Operacoes
- Conta offshore identificada nas Ilhas Cayman

Responsavel pela auditoria: Marcos Silva (a vitima)`,
    type: "document" as const,
    isLocked: true,
    password: "cayman",
    hint: "A localizacao da conta offshore mencionada no bilhete.",
    position: { x: 25, y: 38 },
    rotation: -2,
  },
  {
    id: "photo-2",
    title: "Camera de Seguranca",
    content: `Captura da camera do estacionamento - 23:15

Veiculo identificado: Mercedes preto
Placa parcialmente visivel: ABC-XX47
Registro: Veiculo da frota corporativa

Atribuido a: Roberto Mendes (CFO)`,
    type: "photo" as const,
    position: { x: 70, y: 22 },
    rotation: 3,
  },
  {
    id: "note-2",
    title: "Anotacoes da Vitima",
    content: `Diario de Marcos - 15/03

"Descobri tudo. O esquema vai ate o topo.
R. esta envolvido, mas nao e a cabeca.
Preciso de mais provas antes de ir a policia.

Senha do cofre: o ano que tudo comecou - 2019

Amanha confronto ele."

Esta foi a ultima entrada.`,
    type: "note" as const,
    isLocked: true,
    password: "2019",
    hint: "Mencionado nas anotacoes como 'o ano que tudo comecou'.",
    position: { x: 5, y: 55 },
    rotation: -5,
  },
]

const LOCKED_FILES = [
  {
    id: "file-1",
    title: "E-mails Interceptados",
    content: `De: roberto.mendes@empresa.com
Para: contato_externo@protonmail.com
Data: 10/03

"O auditor esta ficando perto demais.
Precisamos agir antes que ele encontre as transferencias de marco.
V. concordou em ajudar. Ele tem acesso ao sistema de seguranca.

Lembre-se: sem rastros."

---

Nota do investigador: "V." refere-se a Victor Santos, chefe de seguranca.`,
    password: "rastros",
    hint: "A ultima palavra do e-mail principal.",
    position: { x: 55, y: 48 },
    rotation: 4,
  },
]

const CONNECTIONS = [
  // Photo 1 to Note 1
  { from: { x: 18, y: 22 }, to: { x: 52, y: 18 } },
  // Note 1 to Sticky
  { from: { x: 62, y: 14 }, to: { x: 78, y: 12 } },
  // Sticky to Photo 2
  { from: { x: 82, y: 18 }, to: { x: 78, y: 30 } },
  // Doc to Locked File (appears when doc unlocked)
  { from: { x: 38, y: 48 }, to: { x: 55, y: 54 }, requiredClues: ["doc-1"] },
  // Note 2 to Doc (appears when note 2 unlocked)
  { from: { x: 18, y: 65 }, to: { x: 28, y: 50 }, requiredClues: ["note-2"] },
  // Locked file to Final (appears when file unlocked)
  { from: { x: 68, y: 56 }, to: { x: 42, y: 72 }, requiredClues: ["file-1"] },
]

const FINAL_REVEAL = {
  title: "Conclusao do Caso",
  content: `CASO RESOLVIDO - RELATORIO FINAL

Culpados identificados:
- Roberto Mendes (CFO) - Mentor do esquema de desvio
- Victor Santos (Seguranca) - Cumplice, desativou o alarme

Cronologia:
23:30 - Victor desativa o sistema de seguranca
23:47 - Roberto entra pelo estacionamento
00:15 - Crime cometido

Evidencia decisiva: E-mails interceptados ligando ambos ao esquema e ao planejamento do crime.

Marcos Silva descobriu o desvio de R$ 2.5 milhoes e foi silenciado antes de revelar a verdade.

Prisoes efetuadas. Caso encerrado.`,
  position: { x: 35, y: 70 },
}

export default function DetectiveApp() {
  const [unlockedClues, setUnlockedClues] = useState<string[]>([
    "photo-1",
    "note-1",
    "photo-2",
    "sticky-1",
  ])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleUnlockClue = (id: string) => {
    if (!unlockedClues.includes(id)) {
      setUnlockedClues((prev) => [...prev, id])
    }
  }

  const allClueIds = useMemo(() => {
    return [...CLUES.map((c) => c.id), ...LOCKED_FILES.map((f) => f.id)]
  }, [])

  const totalClues = allClueIds.length
  const unlockedCount = unlockedClues.length
  const isFinalUnlocked = unlockedCount === totalClues

  const evidenceItems = useMemo(() => {
    return [
      ...CLUES.map((c) => ({
        id: c.id,
        title: c.title,
        type: c.type,
        isUnlocked: unlockedClues.includes(c.id),
      })),
      ...LOCKED_FILES.map((f) => ({
        id: f.id,
        title: f.title,
        type: "file" as const,
        isUnlocked: unlockedClues.includes(f.id),
      })),
    ]
  }, [unlockedClues])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main board area */}
      <div className="flex-1 relative">
        {/* Header overlay */}
        <header 
          className="absolute top-0 left-0 right-0 z-30 p-4"
          style={{
            background: 'linear-gradient(180deg, rgba(20, 15, 10, 0.95) 0%, rgba(20, 15, 10, 0.8) 50%, transparent 100%)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Case badge */}
              <div 
                className="px-4 py-2 rounded relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.2 0.04 50) 0%, oklch(0.15 0.03 45) 100%)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
                  border: '1px solid oklch(0.25 0.03 50)',
                }}
              >
                <div className="absolute inset-0 paper-grain opacity-20" />
                <div className="relative">
                  <p 
                    className="text-[10px] typewriter"
                    style={{ color: 'oklch(0.5 0.02 60)' }}
                  >
                    CASO ATIVO
                  </p>
                  <h1 
                    className="text-xl font-bold typewriter"
                    style={{ color: 'oklch(0.85 0.05 85)' }}
                  >
                    #47 - O Misterio do Escritorio
                  </h1>
                </div>
              </div>
            </div>

            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-3 rounded transition-all"
              style={{
                background: 'linear-gradient(135deg, oklch(0.2 0.03 50) 0%, oklch(0.15 0.02 45) 100%)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" style={{ color: 'oklch(0.8 0.02 60)' }} />
              ) : (
                <Menu className="w-5 h-5" style={{ color: 'oklch(0.8 0.02 60)' }} />
              )}
            </button>
          </div>
        </header>

        {/* Investigation board */}
        <InvestigationBoard
          clues={CLUES}
          lockedFiles={LOCKED_FILES}
          connections={CONNECTIONS}
          unlockedClues={unlockedClues}
          onUnlockClue={handleUnlockClue}
          finalReveal={FINAL_REVEAL}
          isFinalUnlocked={isFinalUnlocked}
        />
      </div>

      {/* Sidebar - desktop */}
      <aside className="hidden lg:block w-80">
        <EvidencePanel
          evidence={evidenceItems}
          totalClues={totalClues}
          unlockedClues={unlockedCount}
          isFinalUnlocked={isFinalUnlocked}
        />
      </aside>

      {/* Sidebar - mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{ background: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="absolute right-0 top-0 bottom-0 w-80 max-w-full animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <EvidencePanel
              evidence={evidenceItems}
              totalClues={totalClues}
              unlockedClues={unlockedCount}
              isFinalUnlocked={isFinalUnlocked}
            />
          </aside>
        </div>
      )}
    </div>
  )
}
