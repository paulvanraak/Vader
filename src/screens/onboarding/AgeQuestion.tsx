import { useState } from 'react'
import { Star, Flame } from 'lucide-react'
import { Button } from '../../components/Button'
import type { AgeGroup } from '../../state/AppStateContext'

const opties: {
  value: AgeGroup
  icon: typeof Star
  range: string
  title: string
  hint: string
}[] = [
  {
    value: 'jong',
    icon: Star,
    range: '8-11',
    title: "NOVA's",
    hint: 'Komt binnenkort beschikbaar',
  },
  {
    value: 'oud',
    icon: Flame,
    range: '12-16',
    title: 'PUBERS',
    hint: 'Wereld 1 tot en met 6 zijn klaar',
  },
]

export function AgeQuestion({ onNext }: { onNext: (ageGroup: AgeGroup) => void }) {
  const [selected, setSelected] = useState<AgeGroup | null>(null)

  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col gap-6">
        <div>
          <p className="text-label text-ink-muted">Leeftijd</p>
          <h1 className="mt-2 text-h1 font-extrabold text-ink">Hoe oud is hij of zij?</h1>
        </div>
        <div className="flex flex-col gap-3" role="radiogroup" aria-label="Hoe oud is hij of zij?">
          {opties.map((optie) => {
            const isSelected = selected === optie.value
            const Icon = optie.icon
            return (
              <button
                key={optie.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(optie.value)}
                className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                  isSelected
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-surface-sunken bg-surface hover:border-ink-faint'
                }`}
              >
                <span
                  className={`flex size-14 shrink-0 flex-col items-center justify-center rounded-xl ${
                    isSelected ? 'bg-primary-500 text-neutral-white' : 'bg-surface-sunken text-ink-muted'
                  }`}
                >
                  <Icon size={18} strokeWidth={2} />
                  <span className="text-caption font-bold">{optie.range}</span>
                </span>
                <div>
                  <p className={`text-h4 font-extrabold ${isSelected ? 'text-primary-500' : 'text-ink'}`}>
                    {optie.title}
                  </p>
                  <p className="text-caption text-ink-muted">{optie.hint}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      <Button onClick={() => selected && onNext(selected)} disabled={!selected}>
        Verder
      </Button>
    </div>
  )
}
