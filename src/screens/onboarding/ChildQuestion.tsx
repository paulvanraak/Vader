import { useState } from 'react'
import { User } from 'lucide-react'
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
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="text-center">
          <p className="text-label text-ink-muted">Even kennismaken</p>
          <h1 className="mt-2 text-h1 font-extrabold text-ink">Heb je een zoon of dochter?</h1>
        </div>
        <div
          className="flex flex-col items-center gap-5"
          role="radiogroup"
          aria-label="Heb je een zoon of dochter?"
        >
          {opties.map((optie) => {
            const isSelected = selected === optie.value
            return (
              <button
                key={optie.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(optie.value)}
                className="flex flex-col items-center gap-2.5"
              >
                <span
                  className={`flex size-24 items-center justify-center rounded-full border-2 bg-surface-sunken transition ${
                    isSelected ? 'border-primary-500 text-primary-500' : 'border-transparent text-ink-muted'
                  }`}
                >
                  <User size={40} strokeWidth={2} />
                </span>
                <span className={`text-body-lg font-semibold ${isSelected ? 'text-primary-500' : 'text-ink'}`}>
                  {optie.label}
                </span>
              </button>
            )
          })}
        </div>
        {selected === 'dochter' && (
          <p className="text-center text-caption text-ink-muted">
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
