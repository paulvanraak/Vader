import { useState, type CSSProperties } from 'react'
import { useAppState } from '../state/AppStateContext'
import { disableLock, markAsked } from '../lib/appLock'
import {
  devProfilePresets,
  birthDateForAge,
  describeBandStatus,
  skipLogin,
  hasTestUserCredentials,
  type DevProfilePreset,
} from '../lib/devTools'
import { bandLabels } from '../lib/development'

/**
 * Het testpaneel. Wordt alleen gerenderd achter __DEV_TOOLS__, en die constante
 * staat in een productiebuild op een letterlijke false, waarna de bundelaar deze
 * hele module weggooit. Zie src/lib/devTools.ts en vite.config.ts.
 *
 * Bewust met inline stijlen in plaats van Tailwind-klassen: Tailwind scant de
 * broncode en niet de bundel, dus klassen die alleen hier staan zouden anders
 * alsnog in de productie-CSS terechtkomen. Nu laat het paneel nergens een spoor
 * na. Dat het er lelijk uitziet is prima; het mag nooit voor een echt scherm
 * aangezien worden.
 */
const s = {
  fab: {
    position: 'fixed',
    right: 12,
    bottom: 96,
    zIndex: 60,
    borderRadius: 999,
    background: '#a21caf',
    color: '#fff',
    font: 'bold 11px/1 system-ui, sans-serif',
    padding: '10px 12px',
    boxShadow: '0 4px 12px rgba(0,0,0,.3)',
  },
  sheet: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 60,
    maxHeight: '80vh',
    overflowY: 'auto',
    background: '#fff',
    color: '#000',
    borderTop: '4px solid #a21caf',
    padding: 16,
    font: '13px/1.4 system-ui, sans-serif',
    boxShadow: '0 -8px 24px rgba(0,0,0,.25)',
  },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  tag: { color: '#a21caf', font: 'bold 10px/1 system-ui, sans-serif', letterSpacing: '.08em' },
  close: { background: 'none', border: 0, font: '20px/1 system-ui', padding: '0 6px' },
  label: { color: '#666', font: 'bold 10px/1 system-ui', letterSpacing: '.08em', margin: '0 0 8px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 },
  cell: { border: '1px solid #d4d4d4', borderRadius: 8, padding: 8, textAlign: 'left', background: '#fff' },
  cellOn: { border: '1px solid #a21caf', background: '#fdf4ff' },
  primary: {
    width: '100%',
    background: '#000',
    color: '#fff',
    borderRadius: 8,
    border: 0,
    padding: '10px 12px',
    textAlign: 'left',
    font: 'bold 13px/1.2 system-ui',
  },
  row: {
    border: '1px solid #d4d4d4',
    borderRadius: 8,
    padding: '10px 12px',
    textAlign: 'left',
    background: '#fff',
    marginBottom: 8,
    width: '100%',
  },
  box: { background: '#f5f5f5', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 12 },
  hint: { color: '#666', fontSize: 11, margin: '4px 0 0' },
  warn: { color: '#b45309', fontWeight: 700 },
  note: { color: '#a21caf', fontWeight: 700, fontSize: 12, marginTop: 12 },
} satisfies Record<string, CSSProperties>

export function DevPanel() {
  const { session, children, activeChild, addChild, setActiveChildId, path, resetProgress, logout } =
    useAppState()
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState<string | null>(null)

  async function run(label: string, fn: () => Promise<void> | void) {
    setBusy(true)
    setNote(null)
    try {
      await fn()
      setNote(label)
    } catch (err) {
      setNote(err instanceof Error ? err.message : 'Er ging iets mis.')
    } finally {
      setBusy(false)
    }
  }

  /**
   * Eén tik op een combinatie doet alles wat je daarna toch zou doen: slot uit,
   * onboarding overgeslagen, en een testkind dat bij die band hoort. Bestaat het
   * al, dan wordt het geselecteerd in plaats van nog eens aangemaakt.
   */
  async function jumpToPreset(preset: DevProfilePreset) {
    disableLock()
    markAsked()
    const existing = children.find((c) => c.name === preset.name && c.gender === preset.gender)
    if (existing) {
      setActiveChildId(existing.id)
      return
    }
    await addChild({
      name: preset.name,
      gender: preset.gender,
      birthDate: birthDateForAge(preset.age),
    })
  }

  if (!open) {
    return (
      <button type="button" style={s.fab} onClick={() => setOpen(true)}>
        DEV
      </button>
    )
  }

  const status = activeChild
    ? describeBandStatus(activeChild.birthDate, activeChild.gender, path.length)
    : null

  return (
    <div style={s.sheet}>
      <div style={s.head}>
        <span style={s.tag}>DEV-PANEEL — NIET IN PRODUCTIE</span>
        <button type="button" style={s.close} onClick={() => setOpen(false)}>
          ×
        </button>
      </div>

      {!session && (
        <div style={{ marginBottom: 16 }}>
          <button
            type="button"
            style={s.primary}
            disabled={busy}
            onClick={() =>
              void run('Ingelogd als testgebruiker.', async () => {
                const res = await skipLogin()
                if (!res.ok) throw new Error(res.error)
              })
            }
          >
            Inloggen als testgebruiker
          </button>
          <p style={s.hint}>
            {hasTestUserCredentials()
              ? 'Echt account, dus RLS blijft gewoon van kracht.'
              : 'Zet eerst VITE_DEV_TEST_EMAIL en VITE_DEV_TEST_PASSWORD in je omgeving.'}
          </p>
        </div>
      )}

      <p style={s.label}>SPRING NAAR EEN PROFIEL</p>
      <div style={s.grid}>
        {devProfilePresets.map((preset) => {
          const on = activeChild?.name === preset.name && activeChild?.gender === preset.gender
          return (
            <button
              key={`${preset.gender}-${preset.band}`}
              type="button"
              disabled={busy || !session}
              style={{ ...s.cell, ...(on ? s.cellOn : null), opacity: busy || !session ? 0.4 : 1 }}
              onClick={() => void run(`Actief: ${preset.name}.`, () => jumpToPreset(preset))}
            >
              <strong style={{ display: 'block', fontSize: 12 }}>
                {preset.gender === 'dochter' ? 'Dochter' : 'Zoon'} {preset.age}
              </strong>
              <span style={{ display: 'block', fontSize: 11, color: '#555' }}>
                {bandLabels[preset.band]}
              </span>
            </button>
          )
        })}
      </div>

      {status && (
        <div style={s.box}>
          <p style={{ margin: 0 }}>
            <strong>Actieve band:</strong> {status.bandLabel} ({status.band}) — {status.gender},{' '}
            {status.age} jaar
          </p>
          <p style={{ margin: '4px 0 0' }}>
            <strong>Lessen in het pad:</strong> {status.lessonCount}
          </p>
          <p style={{ margin: '4px 0 0', ...(status.fallback ? s.warn : { color: '#555' }) }}>
            <strong>Terugval:</strong> {status.fallback ?? 'geen, dit is de eigen band'}
          </p>
        </div>
      )}

      <button
        type="button"
        style={{ ...s.row, opacity: busy ? 0.5 : 1 }}
        disabled={busy}
        onClick={() =>
          void run('App-slot uit.', () => {
            disableLock()
            markAsked()
          })
        }
      >
        App-slot uitzetten
      </button>
      <button
        type="button"
        style={{ ...s.row, opacity: busy || !activeChild ? 0.5 : 1 }}
        disabled={busy || !activeChild}
        onClick={() =>
          void run('Voortgang gereset.', async () => {
            if (activeChild) await resetProgress(activeChild.id)
          })
        }
      >
        Voortgang van dit testkind resetten
      </button>
      <button
        type="button"
        style={{ ...s.row, opacity: busy ? 0.5 : 1 }}
        disabled={busy}
        onClick={() => void run('Uitgelogd.', () => logout())}
      >
        Uitloggen
      </button>

      {note && <p style={s.note}>{note}</p>}
    </div>
  )
}

export default DevPanel
