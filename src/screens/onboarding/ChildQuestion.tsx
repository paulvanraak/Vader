import { useState } from 'react'
import { Button } from '../../components/Button'
import type { ChildGender } from '../../state/AppStateContext'

const opties: { value: ChildGender; label: string }[] = [
  { value: 'zoon', label: 'Een zoon' },
  { value: 'dochter', label: 'Een dochter' },
]

export function ChildQuestion({ onNext }: { onNext: (gender: ChildGender) => void }) {
  const [selected, setSelected] = useState<ChildGender | null>(null)

  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col gap-6">
        <div>
          <p className="text-label text-ink-muted">Even kennismaken</p>
          <h1 className="mt-2 text-h1 text-ink">Heb je een zoon of dochter?</h1>
        </div>
        <div className="flex flex-col gap-2" role="radiogroup" aria-label="Heb je een zoon of dochter?">
          {opties.map((optie) => {
            const isSelected = selected === optie.value
            return (
              <button
                key={optie.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(optie.value)}
                className={`rounded-xl border p-4 text-left text-body-lg transition ${
                  isSelected
                    ? 'border-primary-500 bg-primary-500/10 text-primary-600'
                    : 'border-surface-sunken bg-surface text-ink hover:border-ink-faint'
                }`}
              >
                {optie.label}
              </button>
            )
          })}
        </div>
        {selected === 'dochter' && (
          <p className="text-caption text-ink-muted">
            Deze demo is nu nog gericht op vaders en zonen. Een versie voor dochters komt eraan, en we laten je
            vast zien hoe de app werkt.
          </p>
        )}
      </div>
      <Button onClick={() => selected && onNext(selected)} disabled={!selected}>
        Verder
      </Button>
    </div>
  )
}
