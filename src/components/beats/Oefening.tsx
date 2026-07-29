import { ClipboardList } from 'lucide-react'
import type { Beat } from '../../types/lesson'
import { getWorldStyle } from '../../lib/worldStyles'
import { BeatHeader } from './BeatHeader'

interface OefeningProps {
  beat: Beat
  worldId: number
  selectedIndex: number | null
  onSelect: (index: number) => void
}

export function Oefening({ beat, worldId, selectedIndex, onSelect }: OefeningProps) {
  const hasAnswered = selectedIndex !== null
  const style = getWorldStyle(worldId)

  return (
    <div className="flex flex-col gap-6">
      <BeatHeader icon={ClipboardList} title="Oefening" worldId={worldId} />
      <div className="flex flex-col gap-4">
        <p className="text-left text-h4 text-ink">{beat.vraag}</p>
        <div className="flex flex-col gap-2" role="radiogroup" aria-label={beat.vraag}>
          {beat.opties?.map((optie, index) => {
            const isSelected = selectedIndex === index
            return (
              <button
                key={optie.label}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelect(index)}
                style={isSelected ? { borderColor: style.accentVar } : undefined}
                className={`rounded-xl border p-4 text-left text-body transition ${
                  isSelected ? style.softBg : 'border-surface-sunken bg-surface hover:border-ink-faint'
                }`}
              >
                {optie.label}
              </button>
            )
          })}
        </div>
        {hasAnswered && (
          <p className="text-body text-ink-muted">{beat.opties?.[selectedIndex].feedback}</p>
        )}
      </div>
    </div>
  )
}
