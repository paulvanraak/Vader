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
      <div className="flex items-center gap-2 text-label text-neutral-300">
        <CalendarCheck size={16} strokeWidth={2} />
        <span>Vanavond</span>
      </div>
      <p className="text-h4 text-neutral-900">{beat.body}</p>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isDone}
        className={`flex items-center gap-3 rounded-xl border p-4 text-left text-body transition ${
          isDone
            ? 'border-success-500 bg-success-500/10 text-neutral-900'
            : 'border-neutral-100 bg-neutral-white text-neutral-300 hover:border-neutral-300'
        }`}
      >
        <span
          className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
            isDone ? 'border-success-500 bg-success-500 text-neutral-white' : 'border-neutral-300'
          }`}
        >
          {isDone && <Check size={14} strokeWidth={3} />}
        </span>
        {isDone ? 'Gedaan, mooi zo' : 'Markeer als gedaan vanavond'}
      </button>
    </div>
  )
}
