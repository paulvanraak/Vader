import { ClipboardList } from 'lucide-react'
import type { Beat } from '../../types/lesson'

interface OefeningProps {
  beat: Beat
  selectedIndex: number | null
  onSelect: (index: number) => void
}

export function Oefening({ beat, selectedIndex, onSelect }: OefeningProps) {
  const hasAnswered = selectedIndex !== null

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-label text-neutral-300">
        <ClipboardList size={16} strokeWidth={2} />
        <span>Oefening</span>
      </div>
      <p className="text-h4 text-neutral-900">{beat.vraag}</p>
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
              className={`rounded-xl border p-4 text-left text-body transition ${
                isSelected
                  ? optie.correct
                    ? 'border-success-500 bg-success-500/10'
                    : 'border-primary-500 bg-primary-500/10'
                  : 'border-neutral-100 bg-neutral-white hover:border-neutral-300'
              }`}
            >
              {optie.label}
            </button>
          )
        })}
      </div>
      {hasAnswered && (
        <p className="text-body text-neutral-300">{beat.opties?.[selectedIndex].feedback}</p>
      )}
    </div>
  )
}
