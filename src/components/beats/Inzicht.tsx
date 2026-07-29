import { Lightbulb } from 'lucide-react'
import type { Beat } from '../../types/lesson'

export function Inzicht({ beat }: { beat: Beat }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-label text-ink-muted">
        <Lightbulb size={16} strokeWidth={2} />
        <span>Inzicht</span>
      </div>
      <p className="text-body-lg leading-relaxed text-ink">{beat.body}</p>
    </div>
  )
}
