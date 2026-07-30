import { Check, ClipboardList, X } from 'lucide-react'
import type { Beat } from '../../types/lesson'
import { BeatHeader } from './BeatHeader'

interface OefeningProps {
  beat: Beat
  worldId: number
  selectedIndex: number | null
  onSelect: (index: number) => void
}

export function Oefening({ beat, worldId, selectedIndex, onSelect }: OefeningProps) {
  const hasAnswered = selectedIndex !== null
  const selectedOptie = hasAnswered ? beat.opties?.[selectedIndex] : null

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
                disabled={hasAnswered}
                onClick={() => onSelect(index)}
                className={`flex items-center justify-between gap-3 rounded-md border p-4 text-left text-body transition ${
                  isSelected
                    ? optie.correct
                      ? 'border-success-500 bg-success-500/10 text-ink'
                      : 'border-danger-500 bg-danger-500/10 text-ink'
                    : `border-surface-sunken bg-surface text-ink hover:border-ink-faint ${
                        hasAnswered ? 'opacity-50' : ''
                      }`
                }`}
              >
                <span>{optie.label}</span>
                {isSelected && (
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-neutral-white ${
                      optie.correct ? 'bg-success-500' : 'bg-danger-500'
                    }`}
                  >
                    {optie.correct ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
                  </span>
                )}
              </button>
            )
          })}
        </div>
        {hasAnswered && selectedOptie && (
          <div
            className={`rounded-md border-l-4 p-4 text-body-lg font-semibold leading-relaxed ${
              selectedOptie.correct
                ? 'border-success-500 bg-success-500/10 text-ink'
                : 'border-danger-500 bg-danger-500/10 text-ink'
            }`}
          >
            {selectedOptie.feedback}
          </div>
        )}
      </div>
    </div>
  )
}
