import { Sparkles } from 'lucide-react'
import type { Beat } from '../../types/lesson'
import { BeatHeader } from './BeatHeader'

interface ThuismissieProps {
  beat: Beat
  onChoose: (actie: string) => void
}

export function Thuismissie({ beat, onChoose }: ThuismissieProps) {
  return (
    <div className="flex flex-col gap-6">
      <BeatHeader icon={Sparkles} title="Probeer dit eens" />
      <div className="flex flex-col gap-4">
        <p className="text-left text-body text-ink-muted">Kies wat het beste bij het moment past.</p>
        <div className="flex flex-col gap-3">
          {beat.acties?.map((actie) => (
            <button
              key={actie}
              type="button"
              onClick={() => onChoose(actie)}
              className="rounded-xl border border-surface-sunken bg-surface p-4 text-left text-body-lg text-ink transition hover:border-primary-500 hover:bg-primary-500/10"
            >
              {actie}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
