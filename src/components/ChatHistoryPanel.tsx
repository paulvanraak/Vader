import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { X, Plus, Pin, PinOff, Trash2, ChevronUp, ChevronDown, MessageSquare } from 'lucide-react'
import type { ChatThread } from '../lib/chatThreads'

const ACTION_WIDTH = 136

interface ChatHistoryPanelProps {
  open: boolean
  threads: ChatThread[]
  activeThreadId: string | null
  onClose: () => void
  onSelect: (thread: ChatThread) => void
  onNewChat: () => void
  onDelete: (thread: ChatThread) => void
  onTogglePin: (thread: ChatThread) => void
  onMove: (thread: ChatThread, direction: 'up' | 'down') => void
}

export function ChatHistoryPanel({
  open,
  threads,
  activeThreadId,
  onClose,
  onSelect,
  onNewChat,
  onDelete,
  onTogglePin,
  onMove,
}: ChatHistoryPanelProps) {
  const pinned = threads.filter((t) => t.pinned)
  const rest = threads.filter((t) => !t.pinned)

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-ink/30 transition-opacity ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        role="dialog"
        aria-label="Gespreksgeschiedenis"
        className={`fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-xs flex-col bg-page shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between px-4 pt-5">
          <h2 className="text-h3 text-ink">Gesprekken</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Sluiten"
            className="flex size-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <div className="shrink-0 px-4 pb-2 pt-4">
          <button
            type="button"
            onClick={onNewChat}
            className="flex w-full items-center gap-2 rounded-md border border-dashed border-primary-500 px-4 py-3 text-label font-bold text-primary-600"
          >
            <Plus size={18} strokeWidth={2.5} />
            Nieuw gesprek
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-6">
          {threads.length === 0 && (
            <p className="mt-6 px-2 text-center text-body text-ink-muted">Nog geen eerdere gesprekken.</p>
          )}

          {pinned.length > 0 && (
            <div className="mt-2">
              <p className="px-2 pb-1 text-caption font-semibold uppercase tracking-wide text-ink-muted">
                Vastgezet
              </p>
              <div className="flex flex-col gap-1.5">
                {pinned.map((thread, index) => (
                  <ThreadRow
                    key={thread.id}
                    thread={thread}
                    isActive={thread.id === activeThreadId}
                    canMoveUp={index > 0}
                    canMoveDown={index < pinned.length - 1}
                    onSelect={() => onSelect(thread)}
                    onDelete={() => onDelete(thread)}
                    onTogglePin={() => onTogglePin(thread)}
                    onMoveUp={() => onMove(thread, 'up')}
                    onMoveDown={() => onMove(thread, 'down')}
                  />
                ))}
              </div>
            </div>
          )}

          {rest.length > 0 && (
            <div className="mt-4">
              {pinned.length > 0 && (
                <p className="px-2 pb-1 text-caption font-semibold uppercase tracking-wide text-ink-muted">
                  Eerder
                </p>
              )}
              <div className="flex flex-col gap-1.5">
                {rest.map((thread, index) => (
                  <ThreadRow
                    key={thread.id}
                    thread={thread}
                    isActive={thread.id === activeThreadId}
                    canMoveUp={index > 0}
                    canMoveDown={index < rest.length - 1}
                    onSelect={() => onSelect(thread)}
                    onDelete={() => onDelete(thread)}
                    onTogglePin={() => onTogglePin(thread)}
                    onMoveUp={() => onMove(thread, 'up')}
                    onMoveDown={() => onMove(thread, 'down')}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function relativeDate(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const isSameDay = date.toDateString() === now.toDateString()
  if (isSameDay) return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) return 'Gisteren'
  return date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
}

interface ThreadRowProps {
  thread: ChatThread
  isActive: boolean
  canMoveUp: boolean
  canMoveDown: boolean
  onSelect: () => void
  onDelete: () => void
  onTogglePin: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

function ThreadRow({
  thread,
  isActive,
  canMoveUp,
  canMoveDown,
  onSelect,
  onDelete,
  onTogglePin,
  onMoveUp,
  onMoveDown,
}: ThreadRowProps) {
  const [dragX, setDragX] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [reorderMode, setReorderMode] = useState(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const baseXRef = useRef(0)
  const draggingRef = useRef(false)
  const movedRef = useRef(false)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function clearLongPress() {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    startXRef.current = e.clientX
    startYRef.current = e.clientY
    baseXRef.current = isOpen ? -ACTION_WIDTH : 0
    draggingRef.current = false
    movedRef.current = false
    clearLongPress()
    longPressTimer.current = setTimeout(() => {
      if (!movedRef.current) {
        setReorderMode((prev) => !prev)
        setIsOpen(false)
        setDragX(0)
      }
    }, 500)
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const dx = e.clientX - startXRef.current
    const dy = e.clientY - startYRef.current
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      movedRef.current = true
      clearLongPress()
    }
    if (reorderMode) return
    if (Math.abs(dx) > Math.abs(dy)) {
      draggingRef.current = true
      const next = Math.min(0, Math.max(-ACTION_WIDTH, baseXRef.current + dx))
      setDragX(next)
    }
  }

  function handlePointerUp() {
    clearLongPress()
    if (draggingRef.current) {
      const shouldOpen = dragX < -ACTION_WIDTH / 2
      setIsOpen(shouldOpen)
      setDragX(shouldOpen ? -ACTION_WIDTH : 0)
      draggingRef.current = false
      return
    }
    if (!movedRef.current && !reorderMode) {
      if (isOpen) {
        setIsOpen(false)
        setDragX(0)
      } else {
        onSelect()
      }
    }
  }

  return (
    <div className="relative overflow-hidden rounded-md">
      <div className="absolute inset-y-0 right-0 flex items-stretch" style={{ width: ACTION_WIDTH }}>
        <button
          type="button"
          onClick={() => {
            onTogglePin()
            setIsOpen(false)
            setDragX(0)
          }}
          aria-label={thread.pinned ? 'Losmaken' : 'Vastzetten'}
          className="flex w-[68px] items-center justify-center bg-ink-faint/25 text-ink"
        >
          {thread.pinned ? <PinOff size={18} strokeWidth={2} /> : <Pin size={18} strokeWidth={2} />}
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label="Verwijderen"
          className="flex w-[68px] items-center justify-center bg-danger-500 text-neutral-white"
        >
          <Trash2 size={18} strokeWidth={2} />
        </button>
      </div>

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ transform: `translateX(${dragX}px)`, touchAction: 'pan-y' }}
        className={`relative flex items-center gap-2 bg-page px-3 py-3 transition-transform ${
          draggingRef.current ? 'duration-0' : 'duration-200'
        } ${isActive ? 'bg-primary-500/10' : ''} ${reorderMode ? 'ring-2 ring-primary-500' : ''}`}
      >
        <MessageSquare size={16} strokeWidth={2} className="shrink-0 text-ink-faint" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-body-lg font-semibold text-ink">{thread.title}</p>
          <p className="text-caption text-ink-muted">{relativeDate(thread.updatedAt)}</p>
        </div>
        {thread.pinned && !reorderMode && <Pin size={14} strokeWidth={2} className="shrink-0 text-primary-500" />}
        {reorderMode && (
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              disabled={!canMoveUp}
              onClick={(e) => {
                e.stopPropagation()
                onMoveUp()
              }}
              aria-label="Omhoog"
              className="flex size-7 items-center justify-center rounded-full text-ink-muted disabled:opacity-30"
            >
              <ChevronUp size={16} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              disabled={!canMoveDown}
              onClick={(e) => {
                e.stopPropagation()
                onMoveDown()
              }}
              aria-label="Omlaag"
              className="flex size-7 items-center justify-center rounded-full text-ink-muted disabled:opacity-30"
            >
              <ChevronDown size={16} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
