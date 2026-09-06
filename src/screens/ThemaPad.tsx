import { useNavigate } from 'react-router-dom'
import { Check, Lock, Play, Flame } from 'lucide-react'
import { useOptionalAppState } from '../state/AppStateContext'
import { personalizeText } from '../lib/personalize'
import { hapticTap } from '../lib/haptics'
import { openLessen, themaAf, type RitmeState } from '../lib/ritme'
import { THEMA1, THEMA1_LESSEN, THEMA1_OEFENINGEN } from '../content/thema1'

/**
 * Het pad bínnen een thema. Dit is waar je steeds op terugkomt: na elk deel
 * ga je hier weer heen, zie je waar je staat, en kun je ook gewoon naar je
 * checklist, je badges of de chat. Het is het rustpunt tussen twee stukken werk.
 */
export function ThemaPad({ ritme, onOpen, onKlaar }: {
  ritme: RitmeState
  onOpen: (index: number) => void
  onKlaar: () => void
}) {
  const navigate = useNavigate()
  const activeChild = useOptionalAppState()?.activeChild ?? null
  const p = (t: string) => personalizeText(t, activeChild)

  const ids = THEMA1_LESSEN.map((l) => l.id)
  const open = openLessen(ritme, ids)
  const af = themaAf(ritme, ids)

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pb-2 pt-5">
        <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">Thema 1</p>
        <span className="flex items-center gap-1 rounded-full bg-surface-sunken px-2.5 py-1">
          <Flame size={14} className="text-accent-orange" />
          <span className="text-caption font-bold text-ink">{ritme.streak}</span>
        </span>
      </div>

      <div className="px-5 pb-5">
        <h1 className="font-serif text-h2 font-semibold text-ink">{THEMA1.titel}</h1>
        <p className="mt-1 text-body text-ink-muted">{p(THEMA1.ondertitel)}</p>
        <p className="mt-2 text-caption text-ink-muted">
          {ritme.voltooid.length} van {THEMA1_LESSEN.length} delen afgerond
        </p>
      </div>

      <div className="flex flex-col px-5 pb-8">
        {THEMA1_LESSEN.map((les, i) => {
          const gedaan = ritme.voltooid.includes(les.id)
          const nu = !gedaan && i === open - 1
          const dicht = !gedaan && !nu
          const aantal = THEMA1_OEFENINGEN.filter((o) => o.lesId === les.id).length

          return (
            <div key={les.id} className="flex gap-3">
              <div className="flex w-10 shrink-0 flex-col items-center">
                <button
                  type="button"
                  disabled={dicht}
                  aria-label={p(les.titel)}
                  onClick={() => { hapticTap(); onOpen(i) }}
                  className={`flex size-10 items-center justify-center rounded-full border-2 transition ${
                    gedaan
                      ? 'border-ink bg-ink text-page'
                      : nu
                        ? 'border-ink bg-page text-ink'
                        : 'border-ink-faint bg-page text-ink-faint'
                  }`}
                >
                  {gedaan ? <Check size={18} strokeWidth={3} />
                    : nu ? <Play size={16} strokeWidth={2.5} className="ml-0.5" />
                    : <Lock size={15} strokeWidth={2} />}
                </button>
                {i < THEMA1_LESSEN.length - 1 && (
                  <div className={`h-14 border-l-2 border-dashed ${gedaan ? 'border-ink' : 'border-ink-faint'}`} />
                )}
              </div>

              <button
                type="button"
                disabled={dicht}
                onClick={() => { hapticTap(); onOpen(i) }}
                className="flex-1 pb-6 text-left"
              >
                <p className={`text-caption font-bold uppercase tracking-wide ${nu ? 'text-ink' : 'text-ink-muted'}`}>
                  {les.fase}
                </p>
                <p className={`mt-0.5 text-body-lg ${dicht ? 'text-ink-faint' : 'text-ink'}`}>
                  {p(les.titel)}
                </p>
                {nu && (
                  <p className="mt-1 text-caption text-ink-muted">
                    {aantal} oefeningen · ongeveer 6 minuten
                  </p>
                )}
              </button>
            </div>
          )
        })}
      </div>

      {af && (
        <div className="mx-5 mb-8 rounded-md border-2 border-ink p-4">
          <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">Thema afgerond</p>
          <p className="mt-1 text-body text-ink">Je hebt alle vier de delen gehad.</p>
          <button
            type="button"
            onClick={() => { hapticTap(); onKlaar() }}
            className="mt-3 rounded-full bg-ink px-5 py-2.5 text-label text-page"
          >
            Kies je volgende thema
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => { hapticTap(); navigate('/pad') }}
        className="mx-5 mb-8 text-body text-ink-muted underline underline-offset-2"
      >
        Alle thema's bekijken
      </button>
    </div>
  )
}
