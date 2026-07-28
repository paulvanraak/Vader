import { useState } from 'react'
import { Button } from '../../components/Button'
import type { Concern } from '../../state/AppStateContext'

const opties: { value: Concern; label: string }[] = [
  { value: 'scherm', label: 'Hij hangt aan zijn scherm' },
  { value: 'influencer', label: 'Hij citeert een influencer' },
  { value: 'opmerking', label: 'Er valt weleens een rare opmerking' },
  { value: 'onbekend', label: 'Ik weet het niet goed' },
]

export function Questions({ onNext }: { onNext: (concern: Concern) => void }) {
  const [selected, setSelected] = useState<Concern | null>(null)

  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col gap-8">
        <div>
          <p className="text-label text-neutral-300">Hoe oud is je zoon?</p>
          <p className="mt-2 text-h3 text-neutral-900">Twaalf tot zestien</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-label text-neutral-300">Wat speelt er nu?</p>
          <div className="flex flex-col gap-2" role="radiogroup" aria-label="Wat speelt er nu?">
            {opties.map((optie) => {
              const isSelected = selected === optie.value
              return (
                <button
                  key={optie.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelected(optie.value)}
                  className={`rounded-xl border p-4 text-left text-body transition ${
                    isSelected
                      ? 'border-primary-500 bg-primary-500/10 text-primary-600'
                      : 'border-neutral-100 bg-neutral-white text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  {optie.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <Button onClick={() => selected && onNext(selected)} disabled={!selected}>
        Verder
      </Button>
    </div>
  )
}
