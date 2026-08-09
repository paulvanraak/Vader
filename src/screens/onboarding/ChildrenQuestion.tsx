import { useState } from 'react'
import { User, Check } from 'lucide-react'
import { Button } from '../../components/Button'
import { WheelDatePicker } from '../../components/WheelDatePicker'
import { useAppState, type ChildGender, type ChildProfile } from '../../state/AppStateContext'
import { childLabel, childSubLabel } from '../../lib/child'
import { birthDateBounds, defaultBirthDate, isValidBirthDate } from '../../lib/age'

const genderOpties: { value: ChildGender; label: string }[] = [
  { value: 'zoon', label: 'Jongen' },
  { value: 'dochter', label: 'Meisje' },
]

const { min: minBirthDate, max: maxBirthDate } = birthDateBounds()

export function ChildrenQuestion({ onNext }: { onNext: () => void }) {
  const { children, addChild } = useAppState()
  const [draftName, setDraftName] = useState('')
  const [draftBirthDate, setDraftBirthDate] = useState(defaultBirthDate)
  const [draftGender, setDraftGender] = useState<ChildGender | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canAdd = draftName.trim().length > 0 && isValidBirthDate(draftBirthDate) && draftGender !== null

  async function handleAddChild() {
    if (!canAdd || !draftGender) return
    setIsSaving(true)
    setError(null)
    try {
      await addChild({ name: draftName.trim(), gender: draftGender, birthDate: draftBirthDate })
      setDraftName('')
      setDraftBirthDate(defaultBirthDate())
      setDraftGender(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kind toevoegen is niet gelukt.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col gap-8 overflow-y-auto text-left">
        <div className="stack-in">
          <p className="text-label text-ink-muted">Even kennismaken</p>
          <h1 className="mt-2 font-serif text-h1 font-semibold text-ink">Over wie gaat het?</h1>
          <p className="mt-2 text-body text-ink-muted">Voeg één of meerdere kinderen toe.</p>
        </div>

        {children.length > 0 && (
          <div className="stack-in stack-delay-1 flex flex-col divide-y divide-surface-sunken border-y border-surface-sunken">
            {children.map((child: ChildProfile) => (
              <div key={child.id} className="flex items-center gap-3 py-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
                  <User size={18} strokeWidth={2} />
                </span>
                <div className="flex-1">
                  <p className="text-body-lg font-semibold text-ink">{childLabel(child)}</p>
                  <p className="text-caption text-ink-muted">{childSubLabel(child)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={`stack-in ${children.length > 0 ? 'stack-delay-2' : 'stack-delay-1'} flex flex-col gap-5`}>
          <p className="text-label font-semibold text-ink-muted">
            {children.length > 0 ? 'Nog een kind toevoegen' : 'Kind toevoegen'}
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
            <p className="mb-2 text-label text-ink-muted">Geboortedatum</p>
            <div className="rounded-md bg-surface-sunken px-2">
              <WheelDatePicker value={draftBirthDate} onChange={setDraftBirthDate} min={minBirthDate} max={maxBirthDate} />
            </div>
          </div>

          <div>
            <p className="mb-2 text-label text-ink-muted">Jongen of meisje?</p>
            <div className="flex flex-col gap-2" role="radiogroup" aria-label="Jongen of meisje?">
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

          {draftGender === 'dochter' && (
            <p className="text-caption text-ink-muted">
              Deze demo is nu nog gericht op zonen. Een versie voor dochters komt eraan.
            </p>
          )}

          {draftBirthDate && !isValidBirthDate(draftBirthDate) && (
            <p className="text-caption font-semibold text-danger-500">FatherFlow is bedoeld voor kinderen van 6 tot 18 jaar.</p>
          )}

          {error && <p className="text-caption font-semibold text-danger-500">{error}</p>}

          <button
            type="button"
            onClick={() => void handleAddChild()}
            disabled={isSaving || !canAdd}
            className="flex items-center justify-center gap-2 rounded-md border border-primary-500 py-3 text-label font-bold text-primary-600 transition disabled:opacity-40"
          >
            {isSaving ? 'Bezig...' : 'Bevestigen'}
          </button>
        </div>
      </div>
      <div className="stack-in stack-delay-3">
        <Button onClick={() => children.length > 0 && onNext()} disabled={children.length === 0}>
          Verder
        </Button>
      </div>
    </div>
  )
}
