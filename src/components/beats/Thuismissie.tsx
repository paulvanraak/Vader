import { Sparkles } from 'lucide-react'
import type { Beat } from '../../types/lesson'
import { getWorldStyle } from '../../lib/worldStyles'
import { BeatHeader } from './BeatHeader'

interface ThuismissieProps {
  beat: Beat
  worldId: number
  onChoose: (actie: string) => void
}

export function Thuismissie({ beat, worldId, onChoose }: ThuismissieProps) {
  const style = getWorldStyle(worldId)
  return (
    <div className="flex flex-col gap-6">
      <BeatHeader icon={Sparkles} title="Probeer dit eens" worldId={worldId} />
      <div className="flex flex-col gap-4">
        <p className="text-left text-body text-ink-muted">Kies wat het beste bij het moment past.</p>
        <div className="flex flex-col gap-3">
          {beat.acties?.map((actie) => (
            <button
              key={actie}
              type="button"
              onClick={() => onChoose(actie)}
              className="rounded-xl border border-surface-sunken bg-surface p-4 text-left text-body-lg text-ink transition"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = style.accentVar
                e.currentTarget.style.backgroundColor = `color-mix(in oklab, ${style.accentVar} 10%, transparent)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = ''
                e.currentTarget.style.backgroundColor = ''
              }}
            >
              {actie}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
