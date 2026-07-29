import { Eye } from 'lucide-react'
import type { Beat } from '../../types/lesson'

export function Haakje({ beat }: { beat: Beat }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex size-11 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600">
        <Eye size={22} strokeWidth={2} />
      </div>
      <p className="text-h3 text-ink">{beat.body}</p>
    </div>
  )
}
