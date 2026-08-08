import { CircleX, CircleCheck, MessageSquareText } from 'lucide-react'
import type { Beat } from '../../types/lesson'
import { getWorldStyle } from '../../lib/worldStyles'
import { BeatHeader } from './BeatHeader'

export function Voorbeeld({ beat, worldId }: { beat: Beat; worldId: number }) {
  const style = getWorldStyle(worldId)
  return (
    <div className="flex flex-col gap-6">
      <BeatHeader icon={MessageSquareText} title="In de praktijk" worldId={worldId} />
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3 rounded-md bg-danger-500/10 p-4">
          <CircleX size={20} className="mt-0.5 shrink-0 text-danger-500" strokeWidth={2} />
          <p className="text-body text-ink">{beat.fout}</p>
        </div>
        <div className={`flex items-start gap-3 rounded-md p-4 ${style.softBg}`}>
          <CircleCheck size={20} className={`mt-0.5 shrink-0 ${style.text}`} strokeWidth={2} />
          <p className="text-body text-ink">{beat.beter}</p>
        </div>
      </div>
    </div>
  )
}
