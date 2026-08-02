import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronUp, ChevronDown, Trash2, Copy, Plus } from 'lucide-react'
import {
  fetchAdminLessons,
  fetchAdminWorlds,
  createLesson,
  deleteLesson,
  duplicateLesson,
  swapLessonOrder,
  updateLessonTitle,
  type AdminLesson,
  type AdminWorld,
} from '../../lib/cms'
import { useContent } from '../../state/ContentContext'

const cohorts: { value: 'jong' | 'oud'; label: string }[] = [
  { value: 'jong', label: "NOVA's (8-11)" },
  { value: 'oud', label: 'PUBERS (12-16)' },
]

export function AdminWorldLessons() {
  const navigate = useNavigate()
  const { worldId } = useParams<{ worldId: string }>()
  const { refetch } = useContent()
  const [world, setWorld] = useState<AdminWorld | null>(null)
  const [lessons, setLessons] = useState<AdminLesson[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [newTitles, setNewTitles] = useState<Record<'jong' | 'oud', string>>({ jong: '', oud: '' })

  async function load() {
    if (!worldId) return
    try {
      const [worlds, lessonRows] = await Promise.all([fetchAdminWorlds(), fetchAdminLessons(worldId)])
      setWorld(worlds.find((w) => w.id === worldId) ?? null)
      setLessons(lessonRows)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout')
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worldId])

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
          onClick={() => navigate('/admin')}
          aria-label="Terug"
          className="flex size-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
        <div>
          <p className="text-label text-ink-muted">CMS</p>
          <h1 className="text-h3 text-ink">{world?.title ?? 'Lessen'}</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {error && <p className="mb-4 text-body text-danger-500">{error}</p>}
        {!lessons && <p className="text-body text-ink-muted">Laden...</p>}

        {lessons &&
          cohorts.map(({ value: cohort, label }) => {
            const cohortLessons = lessons.filter((l) => l.cohort === cohort)
            return (
              <div key={cohort} className="mb-8 flex flex-col gap-2">
                <p className="text-label font-semibold text-ink-muted">{label}</p>

                {cohortLessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-2 rounded-md bg-surface p-3 shadow-sm ring-1 ring-surface-sunken"
                  >
                    <div className="flex flex-col">
                      <button
                        type="button"
                        disabled={busy || index === 0}
                        onClick={() => withBusy(() => swapLessonOrder(lesson, cohortLessons[index - 1]))}
                        aria-label="Omhoog"
                        className="text-ink-muted disabled:opacity-30"
                      >
                        <ChevronUp size={16} strokeWidth={2} />
                      </button>
                      <button
                        type="button"
                        disabled={busy || index === cohortLessons.length - 1}
                        onClick={() => withBusy(() => swapLessonOrder(lesson, cohortLessons[index + 1]))}
                        aria-label="Omlaag"
                        className="text-ink-muted disabled:opacity-30"
                      >
                        <ChevronDown size={16} strokeWidth={2} />
                      </button>
                    </div>

                    <input
                      value={lesson.title}
                      onChange={(e) => {
                        const title = e.target.value
                        setLessons((prev) => prev?.map((l) => (l.id === lesson.id ? { ...l, title } : l)) ?? prev)
                      }}
                      onBlur={(e) => withBusy(() => updateLessonTitle(lesson.id, e.target.value))}
                      className="min-w-0 flex-1 truncate bg-transparent text-body-lg text-ink outline-none"
                    />

                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => withBusy(() => duplicateLesson(lesson.id))}
                      aria-label={`Dupliceer ${lesson.title}`}
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
                    >
                      <Copy size={16} strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        if (confirm(`"${lesson.title}" verwijderen?`)) {
                          void withBusy(() => deleteLesson(lesson.id))
                        }
                      }}
                      aria-label={`Verwijder ${lesson.title}`}
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-danger-500 hover:bg-surface-sunken"
                    >
                      <Trash2 size={16} strokeWidth={2} />
                    </button>
                  </div>
                ))}

                <div className="flex items-center gap-2 rounded-md border border-dashed border-surface-sunken p-3">
                  <input
                    value={newTitles[cohort]}
                    onChange={(e) => setNewTitles((prev) => ({ ...prev, [cohort]: e.target.value }))}
                    placeholder="Titel van nieuwe les"
                    className="min-w-0 flex-1 bg-transparent text-body text-ink outline-none placeholder:text-ink-faint"
                  />
                  <button
                    type="button"
                    disabled={busy || !newTitles[cohort].trim() || !worldId}
                    onClick={() =>
                      withBusy(async () => {
                        await createLesson(worldId as string, cohort, newTitles[cohort].trim())
                        setNewTitles((prev) => ({ ...prev, [cohort]: '' }))
                      })
                    }
                    className="flex shrink-0 items-center gap-1 rounded-md border border-primary-500 px-3 py-2 text-caption font-bold text-primary-600 disabled:opacity-40"
                  >
                    <Plus size={14} strokeWidth={2.5} />
                    Les toevoegen
                  </button>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
