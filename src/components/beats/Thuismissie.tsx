import { CalendarCheck, Check } from 'lucide-react'
import type { Beat } from '../../types/lesson'

interface ThuismissieProps {
  beat: Beat
  isDone: boolean
  onToggle: () => void
}

export function Thuismissie({ beat, isDone, onToggle }: ThuismissieProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-label text-ink-muted">
        <CalendarCheck size={16} strokeWidth={2} />
        <span>Vanavond</span>
      </div>
      <p className="text-h4 text-ink">{beat.body}</p>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isDone}
        className={`flex items-center gap-3 rounded-xl border p-4 text-left text-body transition ${
          isDone
            ? 'border-success-500 bg-success-500/10 text-ink'
            : 'border-surface-sunken bg-surface text-ink-muted hover:border-ink-faint'
        }`}
      >
        <span
          className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
            isDone ? 'border-success-500 bg-success-500 text-neutral-white' : 'border-ink-faint'
          }`}
        >
          {isDone && <Check size={14} strokeWidth={3} />}
        </span>
        {isDone ? 'Gedaan, mooi zo' : 'Markeer als gedaan vanavond'}
      </button>
    </div>
  )
}
