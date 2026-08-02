import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, X } from 'lucide-react'
import {
  fetchLessonDetail,
  updateBeat,
  updateOefeningOptie,
  updateThuismissieActie,
  type LessonDetail,
} from '../../lib/cms'
import { useContent } from '../../state/ContentContext'

const beatLabels: Record<string, string> = {
  haakje: 'Haakje',
  inzicht: 'Inzicht',
  spiegel: 'Spiegel',
  voorbeeld: 'Voorbeeld',
  oefening: 'Oefening',
  thuismissie: 'Checklist (thuismissie)',
}

export function AdminLessonEditor() {
  const navigate = useNavigate()
  const { lessonId } = useParams<{ lessonId: string }>()
  const { refetch } = useContent()
  const [detail, setDetail] = useState<LessonDetail | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  async function load() {
    if (!lessonId) return
    try {
      setDetail(await fetchLessonDetail(lessonId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout')
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId])

  async function save(fn: () => Promise<void>) {
    try {
      await fn()
      setSavedAt(Date.now())
      refetch()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout')
    }
  }

  if (error) return <p className="text-body text-danger-500">{error}</p>
  if (!detail) return <p className="text-body text-ink-muted">Laden...</p>

  const { lesson, beats, optiesByBeat, actiesByBeat } = detail

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(`/admin/worlds/${lesson.world_id}`)}
          aria-label="Terug naar lessen"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
        <div className="min-w-0">
          <p className="text-label text-ink-muted">
            CMS · {lesson.cohort === 'jong' ? "NOVA's" : 'PUBERS'}
            {savedAt && Date.now() - savedAt < 2000 ? ' · Opgeslagen' : ''}
          </p>
          <h1 className="truncate text-h2 text-ink">{lesson.title}</h1>
        </div>
      </div>

      {beats.map((beat) => (
        <div key={beat.id} className="flex flex-col gap-3 rounded-md bg-surface p-4 shadow-sm ring-1 ring-surface-sunken">
          <p className="text-label font-bold uppercase tracking-wide text-ink-muted">{beatLabels[beat.type]}</p>

          {(beat.type === 'haakje' || beat.type === 'inzicht' || beat.type === 'spiegel') && (
            <textarea
              defaultValue={beat.body ?? ''}
              onBlur={(e) => save(() => updateBeat(beat.id, { body: e.target.value }))}
              rows={beat.type === 'inzicht' ? 5 : 3}
              className="w-full resize-none rounded-md bg-surface-sunken px-3 py-2.5 text-body text-ink outline-none"
            />
          )}

          {beat.type === 'voorbeeld' && (
            <div className="flex flex-col gap-3">
              <div>
                <p className="mb-1 text-caption font-semibold text-danger-500">Fout</p>
                <textarea
                  defaultValue={beat.fout ?? ''}
                  onBlur={(e) => save(() => updateBeat(beat.id, { fout: e.target.value }))}
                  rows={2}
                  className="w-full resize-none rounded-md bg-surface-sunken px-3 py-2.5 text-body text-ink outline-none"
                />
              </div>
              <div>
                <p className="mb-1 text-caption font-semibold text-success-500">Beter</p>
                <textarea
                  defaultValue={beat.beter ?? ''}
                  onBlur={(e) => save(() => updateBeat(beat.id, { beter: e.target.value }))}
                  rows={2}
                  className="w-full resize-none rounded-md bg-surface-sunken px-3 py-2.5 text-body text-ink outline-none"
                />
              </div>
            </div>
          )}

          {beat.type === 'oefening' && (
            <div className="flex flex-col gap-3">
              <div>
                <p className="mb-1 text-caption font-semibold text-ink-muted">Vraag</p>
                <textarea
                  defaultValue={beat.vraag ?? ''}
                  onBlur={(e) => save(() => updateBeat(beat.id, { vraag: e.target.value }))}
                  rows={2}
                  className="w-full resize-none rounded-md bg-surface-sunken px-3 py-2.5 text-body text-ink outline-none"
                />
              </div>
              {(optiesByBeat[beat.id] ?? []).map((optie, index) => (
                <div key={optie.id} className="flex flex-col gap-2 rounded-md border border-surface-sunken p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-caption font-semibold text-ink-muted">Optie {index + 1}</p>
                    <button
                      type="button"
                      onClick={() =>
                        save(() => updateOefeningOptie(optie.id, { correct: !optie.correct })).then(() => load())
                      }
                      aria-label={optie.correct ? 'Markeer als fout antwoord' : 'Markeer als goed antwoord'}
                      className={`flex items-center gap-1 rounded-md px-2 py-1 text-caption font-bold ${
                        optie.correct ? 'bg-success-500/15 text-success-500' : 'bg-danger-500/10 text-danger-500'
                      }`}
                    >
                      {optie.correct ? <Check size={14} strokeWidth={2.5} /> : <X size={14} strokeWidth={2.5} />}
                      {optie.correct ? 'Goed antwoord' : 'Fout antwoord'}
                    </button>
                  </div>
                  <input
                    defaultValue={optie.label}
                    onBlur={(e) => save(() => updateOefeningOptie(optie.id, { label: e.target.value }))}
                    placeholder="Antwoordoptie"
                    className="w-full rounded-md bg-surface-sunken px-3 py-2 text-body text-ink outline-none"
                  />
                  <input
                    defaultValue={optie.feedback}
                    onBlur={(e) => save(() => updateOefeningOptie(optie.id, { feedback: e.target.value }))}
                    placeholder="Feedback bij deze keuze"
                    className="w-full rounded-md bg-surface-sunken px-3 py-2 text-caption text-ink-muted outline-none"
                  />
                </div>
              ))}
            </div>
          )}

          {beat.type === 'thuismissie' && (
            <div className="flex flex-col gap-2">
              {(actiesByBeat[beat.id] ?? []).map((actie, index) => (
                <div key={actie.id}>
                  <p className="mb-1 text-caption font-semibold text-ink-muted">Actie {index + 1}</p>
                  <input
                    defaultValue={actie.actie}
                    onBlur={(e) => save(() => updateThuismissieActie(actie.id, e.target.value))}
                    className="w-full rounded-md bg-surface-sunken px-3 py-2.5 text-body text-ink outline-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
