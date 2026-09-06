import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Check, Flame } from 'lucide-react'
import { ChildSwitcher } from '../components/ChildSwitcher'
import { FeatureExplainer } from '../components/FeatureExplainer'
import { ThemaPad } from './ThemaPad'
import { useOptionalAppState } from '../state/AppStateContext'
import { personalizeText } from '../lib/personalize'
import { hapticTap, hapticSuccess } from '../lib/haptics'
import { laadRitme, bewaarRitme, kiesThema, type RitmeState } from '../lib/ritme'
import { THEMA1, THEMA1_LESSEN } from '../content/thema1'

/**
 * Home is het pad. Drie standen:
 *
 * 1. Nog geen thema gekozen — uitleg van het ritme, en je kiest je eerste thema.
 * 2. Een thema loopt — het themapad met de delen erin. Hier kom je na elk deel
 *    op terug, met een viering, en van hieruit ga je ook naar je checklist,
 *    je badges of de chat.
 * 3. Thema af — je kiest je volgende.
 */
export function Home() {
  const navigate = useNavigate()
  const locatie = useLocation()
  const activeChild = useOptionalAppState()?.activeChild ?? null
  const p = (t: string) => personalizeText(t, activeChild)

  const [ritme, setRitme] = useState<RitmeState>(laadRitme)
  const bewaar = (s: RitmeState) => { setRitme(s); bewaarRitme(s) }

  const gevierd = (locatie.state as { gevierd?: string } | null)?.gevierd ?? null
  const [viering, setViering] = useState<string | null>(gevierd)

  useEffect(() => {
    if (gevierd) {
      hapticSuccess()
      window.history.replaceState({}, '')
    }
  }, [gevierd])

  if (!ritme.actiefThema) {
    return <RitmeUitleg p={p} onKies={() => bewaar(kiesThema(ritme, 'thema-1'))} />
  }

  return (
    <div className="flex flex-col">
      <ChildSwitcher />
      {viering && (
        <Viering
          lesId={viering}
          p={p}
          streak={ritme.streak}
          onSluit={() => setViering(null)}
        />
      )}
      <ThemaPad
        ritme={ritme}
        onOpen={(i) => navigate(`/thema1/${i}`)}
        onKlaar={() => navigate('/pad')}
      />
      <FeatureExplainer id="pad" />
    </div>
  )
}

function Viering({ lesId, p, streak, onSluit }: {
  lesId: string; p: (t: string) => string; streak: number; onSluit: () => void
}) {
  const les = THEMA1_LESSEN.find((l) => l.id === lesId)
  const nr = THEMA1_LESSEN.findIndex((l) => l.id === lesId) + 1
  if (!les) return null
  return (
    <div className="blok-in mx-5 mt-4 rounded-md border-2 border-ink bg-surface p-5">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-ink text-page">
          <Check size={16} strokeWidth={3} />
        </span>
        <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">
          {les.fase} afgerond
        </p>
      </div>
      <p className="mt-3 font-serif text-h3 font-semibold leading-snug text-ink">{p(les.titel)}</p>
      <p className="mt-2 text-body text-ink-muted">
        Deel {nr} van {THEMA1_LESSEN.length}. Je opdracht staat in je checklist.
      </p>
      <div className="mt-3 flex items-center gap-2">
        <Flame size={16} className="text-accent-orange" />
        <span className="text-body text-ink">{streak} {streak === 1 ? 'dag' : 'dagen'} op rij</span>
      </div>
      <button
        type="button"
        onClick={() => { hapticTap(); onSluit() }}
        className="mt-4 text-body font-bold text-primary-600 underline underline-offset-2"
      >
        Sluiten
      </button>
    </div>
  )
}

function RitmeUitleg({ p, onKies }: { p: (t: string) => string; onKies: () => void }) {
  const [stap, setStap] = useState(0)
  const blokken = [
    <div key="k">
      <h1 className="font-serif text-h1 font-semibold text-ink">Zo werkt het</h1>
      <p className="mt-2 text-body-lg text-ink">
        Geen cursus die je uitzit. Een ritme dat meeloopt met {p('{naam}')}.
      </p>
    </div>,
    <Uitleg key="1" kop="Eén thema tegelijk" tekst={
      'Je kiest zelf waar je mee begint. Een thema heeft vier delen; elk deel is een korte les, ' +
      'drie oefeningen en één ding om thuis te doen.'
    } />,
    <Uitleg key="2" kop="Zo lang als jij wil" tekst={
      'Er staat nergens hoeveel weken je erover moet doen. Doe je het in één avond, prima. ' +
      'Spreid je het over een maand, ook prima.'
    } />,
    <Uitleg key="3" kop="Eén keer per dag is genoeg" tekst={
      'Dat houdt je reeks heel. Vaker mag, maar het telt niet extra — verdeeld over meer dagen ' +
      'werkt gewoon beter.'
    } />,
    <Uitleg key="4" kop="De oefeningen kennen geen goed antwoord" tekst={
      'Bij de meeste in elk geval niet. Opvoeden werkt niet zo. Je oefent afwegen, niet het ' +
      'juiste vakje aankruisen.'
    } />,
  ]
  const alles = stap >= blokken.length - 1

  return (
    <div className="flex h-full flex-col bg-page">
      <div className="flex flex-1 flex-col justify-center overflow-y-auto px-5 py-6">
        <div className="flex flex-col gap-4">
          {blokken.slice(0, stap + 1).map((b, n) => (
            <div key={n} className={n === stap ? 'blok-in' : undefined}>{b}</div>
          ))}
        </div>

        {alles && (
          <div className="blok-in mt-8">
            <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">
              Waar wil je beginnen?
            </p>
            <button
              type="button"
              onClick={() => { hapticTap(); onKies() }}
              className="mt-3 w-full rounded-md border-2 border-ink bg-surface p-4 text-left"
            >
              <span className="block text-body-lg font-bold text-ink">{p(THEMA1.titel)}</span>
              <span className="mt-1 block text-body text-ink-muted">{p(THEMA1.ondertitel)}</span>
              <span className="mt-2 block text-caption text-ink-muted">
                Aanbevolen om mee te starten · 4 delen
              </span>
            </button>
            <p className="mt-3 text-caption text-ink-muted">
              De andere vijf thema's zijn nog niet gebouwd. Straks kies je hier zelf.
            </p>
          </div>
        )}
      </div>

      {!alles && (
        <div className="flex justify-center pb-8 pt-2">
          <button
            type="button"
            onClick={() => { hapticTap(); setStap((n) => n + 1) }}
            aria-label="Volgende"
            className="pijl-adem flex size-11 items-center justify-center rounded-full text-ink"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

function Uitleg({ kop, tekst }: { kop: string; tekst: string }) {
  return (
    <div className="rounded-md bg-surface p-4 shadow-sm ring-1 ring-surface-sunken">
      <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">{kop}</p>
      <p className="mt-2 text-body text-ink">{tekst}</p>
    </div>
  )
}
