import { Sparkles } from 'lucide-react'
import type { Beat } from '../../types/lesson'
import { BeatHeader } from './BeatHeader'
import { Button } from '../Button'

interface ThuismissieProps {
  beat: Beat
  worldId: number
  onDone: () => void
}

export function Thuismissie({ beat, worldId, onDone }: ThuismissieProps) {
  return (
    <div className="flex flex-col gap-6">
      <BeatHeader icon={Sparkles} title="Checklist" worldId={worldId} />
      <div className="flex flex-col gap-4">
        <p className="text-left text-body text-ink-muted">Dit komt in je Checklist te staan.</p>
        <div className="flex flex-col gap-3">
          {beat.acties?.map((actie) => (
            <div
              key={actie}
              className="flex items-center gap-3 rounded-md bg-surface p-3 shadow-sm ring-1 ring-surface-sunken"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-ink-faint" />
              <p className="flex-1 text-left text-body-lg text-ink">{actie}</p>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={onDone}>OK</Button>
    </div>
  )
}
