import { Eye } from 'lucide-react'
import type { Beat } from '../../types/lesson'
import { BeatHeader } from './BeatHeader'

export function Haakje({ beat, worldId }: { beat: Beat; worldId: number }) {
  return (
    <div className="flex flex-col gap-6">
      <BeatHeader icon={Eye} title="Haakje" worldId={worldId} />
      <p className="text-left text-h3 text-ink">{beat.body}</p>
    </div>
  )
}
