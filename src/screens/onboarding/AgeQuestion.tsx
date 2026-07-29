import { useState } from 'react'
import { Button } from '../../components/Button'
import type { AgeGroup } from '../../state/AppStateContext'

const opties: { value: AgeGroup; label: string; hint: string }[] = [
  { value: 'jong', label: 'Acht tot elf jaar', hint: 'Komt binnenkort beschikbaar' },
  { value: 'oud', label: 'Twaalf tot zestien jaar', hint: 'Wereld 4 tot en met 6 zijn klaar' },
]

export function AgeQuestion({ onNext }: { onNext: (ageGroup: AgeGroup) => void }) {
  const [selected, setSelected] = useState<AgeGroup | null>(null)

  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col gap-6">
        <div>
          <p className="text-label text-ink-muted">Leeftijd</p>
          <h1 className="mt-2 text-h1 text-ink">Hoe oud is hij of zij?</h1>
        </div>
        <div className="flex flex-col gap-2" role="radiogroup" aria-label="Hoe oud is hij of zij?">
          {opties.map((optie) => {
            const isSelected = selected === optie.value
            return (
              <button
                key={optie.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(optie.value)}
                className={`rounded-xl border p-4 text-left transition ${
                  isSelected
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-surface-sunken bg-surface hover:border-ink-faint'
                }`}
              >
                <p className={`text-body-lg ${isSelected ? 'text-primary-600' : 'text-ink'}`}>{optie.label}</p>
                <p className="text-caption text-ink-muted">{optie.hint}</p>
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
