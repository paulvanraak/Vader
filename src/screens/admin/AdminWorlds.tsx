import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronUp, ChevronDown, Trash2, Plus } from 'lucide-react'
import {
  fetchAdminWorlds,
  createWorld,
  deleteWorld,
  swapWorldOrder,
  updateWorld,
  type AdminWorld,
} from '../../lib/cms'
import { useContent } from '../../state/ContentContext'

export function AdminWorlds() {
  const navigate = useNavigate()
  const { refetch } = useContent()
  const [worlds, setWorlds] = useState<AdminWorld[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [newSubtitle, setNewSubtitle] = useState('')
  const [busy, setBusy] = useState(false)

  async function load() {
    try {
      setWorlds(await fetchAdminWorlds())
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
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-3 px-5 pt-5">
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Terug"
          className="flex size-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
        <div>
          <p className="text-label text-ink-muted">CMS</p>
          <h1 className="text-h3 text-ink">Werelden</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {error && <p className="mb-4 text-body text-danger-500">{error}</p>}

        {!worlds && <p className="text-body text-ink-muted">Laden...</p>}

        <div className="flex flex-col gap-2">
          {worlds?.map((world, index) => (
            <div
              key={world.id}
              className="flex items-center gap-2 rounded-md bg-surface p-3 shadow-sm ring-1 ring-surface-sunken"
            >
              <div className="flex flex-col">
                <button
                  type="button"
                  disabled={busy || index === 0}
                  onClick={() => withBusy(() => swapWorldOrder(world, worlds[index - 1]))}
                  aria-label="Omhoog"
                  className="text-ink-muted disabled:opacity-30"
                >
                  <ChevronUp size={16} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  disabled={busy || index === worlds.length - 1}
                  onClick={() => withBusy(() => swapWorldOrder(world, worlds[index + 1]))}
                  aria-label="Omlaag"
                  className="text-ink-muted disabled:opacity-30"
                >
                  <ChevronDown size={16} strokeWidth={2} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/admin/worlds/${world.id}`)}
                className="min-w-0 flex-1 text-left"
              >
                <input
                  value={world.title}
                  onChange={(e) => {
                    const title = e.target.value
                    setWorlds((prev) => prev?.map((w) => (w.id === world.id ? { ...w, title } : w)) ?? prev)
                  }}
                  onBlur={(e) => withBusy(() => updateWorld(world.id, { title: e.target.value }))}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full truncate bg-transparent text-body-lg font-bold text-ink outline-none"
                />
                <input
                  value={world.subtitle}
                  onChange={(e) => {
                    const subtitle = e.target.value
                    setWorlds((prev) => prev?.map((w) => (w.id === world.id ? { ...w, subtitle } : w)) ?? prev)
                  }}
                  onBlur={(e) => withBusy(() => updateWorld(world.id, { subtitle: e.target.value }))}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full truncate bg-transparent text-caption text-ink-muted outline-none"
                />
              </button>

              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  if (confirm(`"${world.title}" en alle lessen erin verwijderen?`)) {
                    void withBusy(() => deleteWorld(world.id))
                  }
                }}
                aria-label={`Verwijder ${world.title}`}
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-danger-500 hover:bg-surface-sunken"
              >
                <Trash2 size={16} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-md border border-dashed border-surface-sunken p-4">
          <p className="text-label font-semibold text-ink-muted">Nieuwe wereld</p>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Titel"
            className="w-full rounded-md bg-surface-sunken px-4 py-3 text-body-lg text-ink outline-none placeholder:text-ink-faint"
          />
          <input
            value={newSubtitle}
            onChange={(e) => setNewSubtitle(e.target.value)}
            placeholder="Subtitel"
            className="w-full rounded-md bg-surface-sunken px-4 py-3 text-body text-ink outline-none placeholder:text-ink-faint"
          />
          <button
            type="button"
            disabled={busy || !newTitle.trim()}
            onClick={() =>
              withBusy(async () => {
                await createWorld(newTitle.trim(), newSubtitle.trim())
                setNewTitle('')
                setNewSubtitle('')
              })
            }
            className="flex items-center justify-center gap-2 rounded-md border border-primary-500 py-3 text-label font-bold text-primary-600 transition disabled:opacity-40"
          >
            <Plus size={18} strokeWidth={2.5} />
            Wereld toevoegen
          </button>
        </div>
      </div>
    </div>
  )
}
