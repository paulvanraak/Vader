import { useState } from 'react'
import { User, Star, Flame, X, Plus, Check } from 'lucide-react'
import { Button } from '../../components/Button'
import type { ChildGender, AgeGroup, ChildProfile } from '../../state/AppStateContext'
import { childLabel, childSubLabel } from '../../lib/child'

const genderOpties: { value: ChildGender; label: string }[] = [
  { value: 'zoon', label: 'Zoon' },
  { value: 'dochter', label: 'Dochter' },
]

const ageOpties: { value: AgeGroup; label: string; range: string; icon: typeof Star }[] = [
  { value: 'jong', label: "NOVA's", range: '8-11', icon: Star },
  { value: 'oud', label: 'PUBERS', range: '12-16', icon: Flame },
]

function makeDraftId(): string {
  return `draft-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function ChildrenQuestion({ onNext }: { onNext: (children: ChildProfile[]) => void }) {
  const [added, setAdded] = useState<ChildProfile[]>([])
  const [draftName, setDraftName] = useState('')
  const [draftGender, setDraftGender] = useState<ChildGender | null>(null)
  const [draftAge, setDraftAge] = useState<AgeGroup | null>(null)

  function addChild() {
    if (!draftName.trim() || !draftGender || !draftAge) return
    setAdded((prev) => [
      ...prev,
      { id: makeDraftId(), name: draftName.trim(), gender: draftGender, ageGroup: draftAge },
    ])
    setDraftName('')
    setDraftGender(null)
    setDraftAge(null)
  }

  function removeChild(id: string) {
    setAdded((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col gap-8 overflow-y-auto text-left">
        <div>
          <p className="text-label text-ink-muted">Even kennismaken</p>
          <h1 className="mt-2 text-h1 font-extrabold text-ink">Over wie gaat het?</h1>
          <p className="mt-2 text-body text-ink-muted">Voeg één of meerdere kinderen toe.</p>
        </div>

        {added.length > 0 && (
          <div className="flex flex-col divide-y divide-surface-sunken border-y border-surface-sunken">
            {added.map((child) => (
              <div key={child.id} className="flex items-center gap-3 py-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
                  <User size={18} strokeWidth={2} />
                </span>
                <div className="flex-1">
                  <p className="text-body-lg font-semibold text-ink">{childLabel(child)}</p>
                  <p className="text-caption text-ink-muted">{childSubLabel(child)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeChild(child.id)}
                  aria-label={`Verwijder ${childLabel(child)}`}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-5">
          <p className="text-label font-semibold text-ink-muted">
            {added.length > 0 ? 'Nog een kind toevoegen' : 'Kind toevoegen'}
          </p>

          <div>
            <p className="mb-2 text-label text-ink-muted">Naam</p>
            <input
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Bijvoorbeeld Sam"
              aria-label="Naam van je kind"
              className="w-full rounded-md bg-surface-sunken px-4 py-3 text-body-lg text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary-500"
            />
          </div>

          <div>
            <p className="mb-2 text-label text-ink-muted">Zoon of dochter?</p>
            <div className="flex flex-col gap-2" role="radiogroup" aria-label="Zoon of dochter?">
              {genderOpties.map((optie) => {
                const isSelected = draftGender === optie.value
                return (
                  <button
                    key={optie.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setDraftGender(optie.value)}
                    className={`flex items-center justify-between rounded-md border px-4 py-3 text-left text-body-lg font-semibold transition ${
                      isSelected
                        ? 'border-primary-500 bg-primary-500/10 text-primary-600'
                        : 'border-surface-sunken bg-surface text-ink hover:border-ink-faint'
                    }`}
                  >
                    {optie.label}
                    {isSelected && <Check size={18} strokeWidth={2.5} />}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-label text-ink-muted">Hoe oud?</p>
            <div className="flex flex-col gap-2" role="radiogroup" aria-label="Hoe oud?">
              {ageOpties.map((optie) => {
                const isSelected = draftAge === optie.value
                const Icon = optie.icon
                return (
                  <button
                    key={optie.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setDraftAge(optie.value)}
                    className={`flex items-center gap-3 rounded-md border px-4 py-3 text-left transition ${
                      isSelected
                        ? 'border-primary-500 bg-primary-500/10 text-primary-600'
                        : 'border-surface-sunken bg-surface text-ink hover:border-ink-faint'
                    }`}
                  >
                    <Icon size={18} strokeWidth={2} />
                    <span className="flex-1">
                      <span className="block text-body-lg font-semibold">{optie.label}</span>
                      <span className="block text-caption text-ink-muted">{optie.range} jaar</span>
                    </span>
                    {isSelected && <Check size={18} strokeWidth={2.5} />}
                  </button>
                )
              })}
            </div>
          </div>

          {draftGender === 'dochter' && (
            <p className="text-caption text-ink-muted">
              Deze demo is nu nog gericht op zonen. Een versie voor dochters komt eraan.
            </p>
          )}

          <button
            type="button"
            onClick={addChild}
            disabled={!draftName.trim() || !draftGender || !draftAge}
            className="flex items-center justify-center gap-2 rounded-md border border-primary-500 py-3 text-label font-bold text-primary-600 transition disabled:opacity-40"
          >
            <Plus size={18} strokeWidth={2.5} />
            Bevestigen
          </button>
        </div>
      </div>
      <Button onClick={() => added.length > 0 && onNext(added)} disabled={added.length === 0}>
        Verder
      </Button>
    </div>
  )
}
