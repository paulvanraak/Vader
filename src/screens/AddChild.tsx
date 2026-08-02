import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Star, Flame, Check } from 'lucide-react'
import { Button } from '../components/Button'
import { useAppState, type ChildGender, type AgeGroup } from '../state/AppStateContext'

const genderOpties: { value: ChildGender; label: string }[] = [
  { value: 'zoon', label: 'Zoon' },
  { value: 'dochter', label: 'Dochter' },
]

const ageOpties: { value: AgeGroup; label: string; range: string; icon: typeof Star }[] = [
  { value: 'jong', label: "NOVA's", range: '8-11', icon: Star },
  { value: 'oud', label: 'PUBERS', range: '12-16', icon: Flame },
]

export function AddChild() {
  const navigate = useNavigate()
  const { addChild } = useAppState()
  const [name, setName] = useState('')
  const [gender, setGender] = useState<ChildGender | null>(null)
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canSubmit = name.trim().length > 0 && gender !== null && ageGroup !== null && !isSaving

  async function submit() {
    if (!canSubmit || !gender || !ageGroup) return
    setIsSaving(true)
    setError(null)
    try {
      await addChild({ name: name.trim(), gender, ageGroup })
      navigate(-1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kind toevoegen is niet gelukt.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-3 px-5 pt-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Sluiten"
          className="flex size-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
        >
          <X size={18} strokeWidth={2} />
        </button>
        <h1 className="text-h3 text-ink">Kind toevoegen</h1>
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-y-auto px-5 py-6">
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-2 text-label text-ink-muted">Naam</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bijvoorbeeld Sam"
              aria-label="Naam van je kind"
              className="w-full rounded-md bg-surface-sunken px-4 py-3 text-body-lg text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary-500"
            />
          </div>

          <div>
            <p className="mb-2 text-label text-ink-muted">Zoon of dochter?</p>
            <div className="flex flex-col gap-2" role="radiogroup" aria-label="Zoon of dochter?">
              {genderOpties.map((optie) => {
                const isSelected = gender === optie.value
                return (
                  <button
                    key={optie.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setGender(optie.value)}
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
                const isSelected = ageGroup === optie.value
                const Icon = optie.icon
                return (
                  <button
                    key={optie.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setAgeGroup(optie.value)}
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

          {gender === 'dochter' && (
            <p className="text-caption text-ink-muted">
              Deze demo is nu nog gericht op zonen. Een versie voor dochters komt eraan.
            </p>
          )}

          {error && <p className="text-caption font-semibold text-danger-500">{error}</p>}
        </div>

        <Button onClick={() => void submit()} disabled={!canSubmit}>
          {isSaving ? 'Bezig...' : 'Kind toevoegen'}
        </Button>
      </div>
    </div>
  )
}
