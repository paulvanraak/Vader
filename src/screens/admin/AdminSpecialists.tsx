import { useEffect, useState } from 'react'
import { ChevronUp, ChevronDown, Trash2, Plus } from 'lucide-react'
import {
  fetchAdminSpecialists,
  createSpecialist,
  updateSpecialist,
  deleteSpecialist,
  swapSpecialistOrder,
  type AdminSpecialist,
} from '../../lib/cms'
import { useContent } from '../../state/ContentContext'

export function AdminSpecialists() {
  const { refetch } = useContent()
  const [specialists, setSpecialists] = useState<AdminSpecialist[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [draft, setDraft] = useState({ name: '', role: '', bio: '' })

  async function load() {
    try {
      setSpecialists(await fetchAdminSpecialists())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout')
    }
  }

  useEffect(() => {
    void load()
  }, [])

  async function withBusy(fn: () => Promise<void>) {
    setBusy(true)
    try {
      await fn()
      await load()
      refetch()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-label text-ink-muted">CMS</p>
        <h1 className="text-h2 text-ink">Specialisten</h1>
        <p className="mt-1 text-body text-ink-muted">Het panel dat op het Specialisten-scherm in de app verschijnt.</p>
      </div>

      {error && <p className="text-body text-danger-500">{error}</p>}
      {!specialists && <p className="text-body text-ink-muted">Laden...</p>}

      <div className="flex flex-col gap-2">
        {specialists?.map((specialist, index) => (
          <div
            key={specialist.id}
            className="flex items-start gap-2 rounded-md bg-surface p-3 shadow-sm ring-1 ring-surface-sunken"
          >
            <div className="mt-1 flex flex-col">
              <button
                type="button"
                disabled={busy || index === 0}
                onClick={() => withBusy(() => swapSpecialistOrder(specialist, specialists[index - 1]))}
                aria-label="Omhoog"
                className="text-ink-muted disabled:opacity-30"
              >
                <ChevronUp size={16} strokeWidth={2} />
              </button>
              <button
                type="button"
                disabled={busy || index === specialists.length - 1}
                onClick={() => withBusy(() => swapSpecialistOrder(specialist, specialists[index + 1]))}
                aria-label="Omlaag"
                className="text-ink-muted disabled:opacity-30"
              >
                <ChevronDown size={16} strokeWidth={2} />
              </button>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <input
                defaultValue={specialist.name}
                onBlur={(e) => withBusy(() => updateSpecialist(specialist.id, { name: e.target.value }))}
                className="w-full rounded-md bg-surface-sunken px-3 py-2 text-body-lg font-bold text-ink outline-none"
              />
              <input
                defaultValue={specialist.role}
                onBlur={(e) => withBusy(() => updateSpecialist(specialist.id, { role: e.target.value }))}
                className="w-full rounded-md bg-surface-sunken px-3 py-2 text-caption font-semibold text-primary-600 outline-none"
              />
              <textarea
                defaultValue={specialist.bio}
                onBlur={(e) => withBusy(() => updateSpecialist(specialist.id, { bio: e.target.value }))}
                rows={2}
                className="w-full resize-none rounded-md bg-surface-sunken px-3 py-2 text-body text-ink outline-none"
              />
            </div>

            <button
              type="button"
              disabled={busy}
              onClick={() => {
                if (confirm(`"${specialist.name}" verwijderen?`)) {
                  void withBusy(() => deleteSpecialist(specialist.id))
                }
              }}
              aria-label={`Verwijder ${specialist.name}`}
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-danger-500 hover:bg-surface-sunken"
            >
              <Trash2 size={16} strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-md border border-dashed border-surface-sunken p-4">
        <p className="text-label font-semibold text-ink-muted">Nieuwe specialist</p>
        <input
          value={draft.name}
          onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Naam"
          className="w-full rounded-md bg-surface-sunken px-4 py-3 text-body-lg text-ink outline-none placeholder:text-ink-faint"
        />
        <input
          value={draft.role}
          onChange={(e) => setDraft((prev) => ({ ...prev, role: e.target.value }))}
          placeholder="Rol, bijvoorbeeld Kinderpsycholoog"
          className="w-full rounded-md bg-surface-sunken px-4 py-3 text-body text-ink outline-none placeholder:text-ink-faint"
        />
        <textarea
          value={draft.bio}
          onChange={(e) => setDraft((prev) => ({ ...prev, bio: e.target.value }))}
          placeholder="Korte bio"
          rows={2}
          className="w-full resize-none rounded-md bg-surface-sunken px-4 py-3 text-body text-ink outline-none placeholder:text-ink-faint"
        />
        <button
          type="button"
          disabled={busy || !draft.name.trim() || !draft.role.trim()}
          onClick={() =>
            withBusy(async () => {
              await createSpecialist(draft.name.trim(), draft.role.trim(), draft.bio.trim())
              setDraft({ name: '', role: '', bio: '' })
            })
          }
          className="flex items-center justify-center gap-2 rounded-md border border-primary-500 py-3 text-label font-bold text-primary-600 transition disabled:opacity-40"
        >
          <Plus size={18} strokeWidth={2.5} />
          Specialist toevoegen
        </button>
      </div>
    </div>
  )
}
