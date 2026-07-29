import { CircleX, CircleCheck } from 'lucide-react'
import type { Beat } from '../../types/lesson'

export function Voorbeeld({ beat }: { beat: Beat }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-label text-ink-muted">In de praktijk</p>
      <div className="flex items-start gap-3 rounded-xl bg-danger-500/10 p-4">
        <CircleX size={20} className="mt-0.5 shrink-0 text-danger-500" strokeWidth={2} />
        <p className="text-body text-ink">{beat.fout}</p>
      </div>
      <div className="flex items-start gap-3 rounded-xl bg-success-500/10 p-4">
        <CircleCheck size={20} className="mt-0.5 shrink-0 text-success-500" strokeWidth={2} />
        <p className="text-body text-ink">{beat.beter}</p>
      </div>
    </div>
  )
}
