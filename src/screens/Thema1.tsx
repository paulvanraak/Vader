import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronUp, Flame } from 'lucide-react'
import { Button } from '../components/Button'
import { useOptionalAppState } from '../state/AppStateContext'
import { personalizeText } from '../lib/personalize'
import { hapticTap, hapticSuccess } from '../lib/haptics'
import {
  laadRitme, bewaarRitme, registreerSessie, noteerOefening, noteerMissie,
  trekOefeningen, teVeelOpEenDag, voltooiDeel, type RitmeState,
} from '../lib/ritme'
import { THEMA1_LESSEN, THEMA1_OEFENINGEN, type Oefening, type Les } from '../content/thema1'

/**
 * De speler van thema 1.
 *
 * Twee bewegingen, zoals afgesproken. Een les stapelt: blokken schuiven één
 * voor één van onder in en blijven staan, zodat je het inzicht nog ziet als de
 * spiegelvraag komt. Een oefening is er één per scherm; swipe omhoog en de
 * volgende komt. Tussen twee delen zit een korte ceremonie — alles fade weg,
 * even zwart, dan de fasenaam en daarna de blokken weer van onder.
 *
 * Er staat nergens "week". Iemand kan hier in tien minuten doorheen of er drie
 * weken over doen; het scherm mag daar niet over liegen. De tijd zit in de
 * streak, niet in de inhoud.
 */

type Fase =
  | { soort: 'les' }
  | { soort: 'sessie' }
  | { soort: 'missie' }

/** Swipe omhoog of een tik: allebei betekenen "volgende". */
function useSwipeOmhoog(onVolgende: () => void) {
  const start = useRef<number | null>(null)
  return {
    onTouchStart: (e: React.TouchEvent) => { start.current = e.touches[0].clientY },
    onTouchEnd: (e: React.TouchEvent) => {
      if (start.current === null) return
      const delta = start.current - e.changedTouches[0].clientY
      start.current = null
      if (delta > 45) onVolgende()
    },
  }
}

/**
 * Speelt één deel van een thema: de les, drie oefeningen, en de opdracht.
 * Daarna terug naar het themapad met een viering. Zo blijf je heen en weer
 * gaan tussen werk en overzicht, en kun je tussendoor bij je checklist,
 * je badges en de chat.
 */
export function Thema1() {
  const navigate = useNavigate()
  const { deel } = useParams()
  const index = Math.max(0, Math.min(Number(deel ?? 0), THEMA1_LESSEN.length - 1))
  const les = THEMA1_LESSEN[index]

  const activeChild = useOptionalAppState()?.activeChild ?? null
  const p = (t: string) => personalizeText(t, activeChild)

  const [ritme, setRitme] = useState<RitmeState>(laadRitme)
  const bewaar = (s: RitmeState) => { setRitme(s); bewaarRitme(s) }

  const [fase, setFase] = useState<Fase>({ soort: 'les' })
  const [overgang, setOvergang] = useState<string | null>(les.fase)

  useEffect(() => {
    const t = window.setTimeout(() => setOvergang(null), 1400)
    return () => window.clearTimeout(t)
  }, [])

  if (overgang !== null) return <Overgang label={overgang} />

  return (
    <div className="flex h-full flex-col bg-page">
      <Kop
        streak={ritme.streak}
        fase={les.fase}
        deel={index + 1}
        totaal={THEMA1_LESSEN.length}
        onTerug={() => navigate('/')}
      />

      {fase.soort === 'les' && (
        <LesBlokken les={les} p={p} onKlaar={() => setFase({ soort: 'sessie' })} />
      )}

      {fase.soort === 'sessie' && (
        <Sessie
          les={les}
          p={p}
          ritme={ritme}
          onOefening={(id, fout) => bewaar(noteerOefening(ritme, id, fout))}
          onKlaar={() => { bewaar(registreerSessie(ritme)); setFase({ soort: 'missie' }) }}
        />
      )}

      {fase.soort === 'missie' && (
        <Missie
          les={les}
          p={p}
          teVeel={teVeelOpEenDag(ritme)}
          onVerder={() => {
            let volgende = noteerMissie(ritme, les.id, 'in_checklist')
            volgende = voltooiDeel(volgende, les.id)
            bewaar(volgende)
            navigate('/', { state: { gevierd: les.id } })
          }}
        />
      )}
    </div>
  )
}

function Kop({ streak, fase, deel, totaal, onTerug }: {
  streak: number; fase: string | null; deel: number; totaal: number; onTerug: () => void
}) {
  return (
    <div className="flex items-center gap-3 px-5 pb-3 pt-4">
      <button
        type="button" aria-label="Terug" onClick={onTerug}
        className="flex size-9 items-center justify-center rounded-full text-ink hover:bg-surface-sunken"
      >
        <ArrowLeft size={20} />
      </button>
      <div className="flex-1">
        {fase && (
          <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">
            {fase} · {deel} van {totaal}
          </p>
        )}
      </div>
      <span className="flex items-center gap-1 rounded-full bg-surface-sunken px-2.5 py-1">
        <Flame size={14} className="text-accent-orange" />
        <span className="text-caption font-bold text-ink">{streak}</span>
      </span>
    </div>
  )
}

function Overgang({ label }: { label: string }) {
  const [toonLabel, setToonLabel] = useState(false)
  useEffect(() => {
    // Eerst even alleen zwart. Die stilte is het halve effect.
    const t = window.setTimeout(() => setToonLabel(true), 320)
    return () => window.clearTimeout(t)
  }, [])
  return (
    <div className="flex h-full w-full items-center justify-center bg-ink px-8">
      {toonLabel && (
        <p className="fase-in text-center font-serif text-h1 font-semibold text-page">{label}</p>
      )}
    </div>
  )
}

/** Het lichte pijltje op de plek van de knop. Ook aan te tikken. */
function SwipeHint({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-center pb-8 pt-2">
      <button
        type="button"
        onClick={onClick}
        aria-label="Volgende"
        className="pijl-adem flex size-11 items-center justify-center rounded-full text-ink"
      >
        <ChevronUp size={26} strokeWidth={2} />
      </button>
    </div>
  )
}

function Midden({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col justify-center overflow-y-auto px-5 pb-8">{children}</div>
}

function LesBlokken({ les, p, onKlaar }: { les: Les; p: (t: string) => string; onKlaar: () => void }) {
  const blokken = [
    <h1 key="t" className="font-serif text-h2 font-semibold leading-snug text-ink">{p(les.titel)}</h1>,
    <p key="h" className="text-body-lg text-ink">{p(les.haakje)}</p>,
    <Kaart key="i" kop="Inzicht">{p(les.inzicht)}</Kaart>,
    <Kaart key="s" kop="Spiegel">{p(les.spiegel)}</Kaart>,
    // De opdracht staat bewust niet hier maar op het scherm na de oefeningen,
    // anders krijg je hem twee keer te zien.
  ]
  const [zichtbaar, setZichtbaar] = useState(1)
  const alles = zichtbaar >= blokken.length
  const volgende = () => {
    hapticTap()
    if (alles) onKlaar()
    else setZichtbaar((n) => Math.min(n + 1, blokken.length))
  }
  const swipe = useSwipeOmhoog(volgende)

  // Wat er al stond schuift rustig mee omhoog in plaats van te verspringen.
  // De stapel staat gecentreerd, dus bij een nieuw blok springt alles de halve
  // hoogte omhoog; die sprong draaien we terug en animeren we uit.
  const stapel = useRef<HTMLDivElement>(null)
  const vorigeHoogte = useRef(0)
  useLayoutEffect(() => {
    const el = stapel.current
    if (!el) return
    const nu = el.offsetHeight
    const delta = nu - vorigeHoogte.current
    vorigeHoogte.current = nu
    if (delta > 0 && zichtbaar > 1) {
      el.animate(
        [{ transform: `translateY(${delta / 2}px)` }, { transform: 'none' }],
        { duration: 820, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      )
    }
  }, [zichtbaar])

  return (
    <>
      {/* Gecentreerd: wat relevant is hoort midden in beeld te staan. Nieuwe
          blokken schuiven er van onder bij en duwen de rest kalm omhoog. */}
      <div className="flex flex-1 flex-col justify-center overflow-y-auto px-5 py-4" {...swipe}>
        <div ref={stapel} className="flex flex-col gap-4">
          {blokken.slice(0, zichtbaar).map((b, n) => (
            <div key={n} className={n === zichtbaar - 1 ? 'blok-in' : undefined}>{b}</div>
          ))}
        </div>
      </div>
      <SwipeHint onClick={volgende} />
    </>
  )
}

function Kaart({ kop, children }: { kop: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md bg-surface p-4 shadow-sm ring-1 ring-surface-sunken">
      <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">{kop}</p>
      <p className="mt-2 text-body text-ink">{children}</p>
    </div>
  )
}

function Sessie({ les, p, ritme, onOefening, onKlaar }: {
  les: Les; p: (t: string) => string; ritme: RitmeState
  onOefening: (id: string, fout: boolean) => void; onKlaar: () => void
}) {
  const pool = useMemo(() => THEMA1_OEFENINGEN.filter((o) => o.lesId === les.id), [les.id])
  const set = useMemo(() => trekOefeningen(pool, ritme, Math.min(3, pool.length)), [pool])
  const [i, setI] = useState(0)
  const [beantwoord, setBeantwoord] = useState(false)

  const laatste = i + 1 >= set.length
  const volgende = () => {
    hapticTap()
    if (!laatste) { setI(i + 1); setBeantwoord(false) } else onKlaar()
  }
  // Binnen de sessie swipe je door; alleen aan het eind van het hoofdstuk
  // staat er een knop, en dan is de swipe uit.
  const swipe = useSwipeOmhoog(() => { if (beantwoord && !laatste) volgende() })

  return (
    <>
      <div className="flex flex-1 flex-col justify-center overflow-y-auto px-5 pb-4" {...swipe}>
        <p className="mb-3 text-caption text-ink-muted">Oefening {i + 1} van {set.length}</p>
        <OefeningKaart
          key={set[i].id}
          oefening={set[i]}
          p={p}
          onBeantwoord={(fout) => { setBeantwoord(true); onOefening(set[i].id, fout) }}
        />
      </div>
      {laatste ? (
        <div className="pb-6">
          <Button onClick={volgende} disabled={!beantwoord}>Klaar</Button>
        </div>
      ) : beantwoord ? (
        <SwipeHint onClick={volgende} />
      ) : (
        <div className="pb-8 pt-2" style={{ height: 60 }} />
      )}
    </>
  )
}

const TYPE_LABEL: Record<Oefening['type'], string> = {
  'toen-en-nu': 'Toen en nu',
  balans: 'Schuif de balans',
  'waar-ging-het-mis': 'Waar ging het mis',
  'eerste-neiging': 'Jouw eerste neiging',
  'twee-wegen': 'Twee redelijke wegen',
  'een-woord': 'Eén woord verschil',
  'en-dan': 'En dan?',
  volgorde: 'Zet op volgorde',
  'beste-aanpak': 'Beste aanpak',
}

const knop = 'rounded-md bg-surface p-4 text-left shadow-sm ring-1 ring-surface-sunken'

function OefeningKaart({ oefening: o, p, onBeantwoord }: {
  oefening: Oefening; p: (t: string) => string; onBeantwoord: (fout: boolean) => void
}) {
  const [gekozen, setGekozen] = useState<string | null>(null)
  const [tweede, setTweede] = useState<string | null>(null)
  const [volgorde, setVolgorde] = useState<number[]>([])
  const [schuif, setSchuif] = useState(50)
  const [balansKlaar, setBalansKlaar] = useState(false)

  const optie = o.opties?.find((x) => x.id === gekozen)
  const regel = o.dialoog?.[Number(gekozen)]

  function kies(id: string, goed?: boolean) {
    setGekozen(id)
    if (goed) hapticSuccess(); else hapticTap()
    if (o.type !== 'toen-en-nu') onBeantwoord(o.scoorbaar ? !goed : false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="blok-in flex items-center gap-2">
        <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-caption font-bold text-ink-muted">
          {TYPE_LABEL[o.type]}
        </span>
        {!o.scoorbaar && <span className="text-caption text-ink-muted">geen goed of fout</span>}
      </div>
      <p className="blok-in text-body-lg text-ink">{p(o.situatie)}</p>

      {/* --- Toen en nu: dezelfde vraag twee keer, daarna naast elkaar ------ */}
      {o.type === 'toen-en-nu' && o.toen && (
        <>
          <p className="blok-in font-serif text-h3 font-semibold text-ink">
            {gekozen === null ? p(o.toen.vraag) : p(o.toen.nuVraag)}
          </p>
          {(gekozen === null || tweede === null) && (
            <div className="flex flex-col gap-2">
              {o.opties?.map((x) => (
                <button
                  key={x.id} type="button"
                  className={`${knop} blok-in`}
                  onClick={() => {
                    hapticTap()
                    if (gekozen === null) setGekozen(x.id)
                    else { setTweede(x.id); onBeantwoord(false) }
                  }}
                >
                  <span className="text-body-lg text-ink">{p(x.label)}</span>
                </button>
              ))}
            </div>
          )}
          {gekozen !== null && tweede !== null && (
            <>
              <div className="blok-in grid grid-cols-2 gap-3">
                <div className="rounded-md bg-surface-sunken p-3">
                  <p className="text-caption font-bold uppercase text-ink-muted">Jouw vader</p>
                  <p className="mt-1 text-body text-ink">{p(o.opties!.find((x) => x.id === gekozen)!.label)}</p>
                </div>
                <div className="rounded-md border-2 border-ink p-3">
                  <p className="text-caption font-bold uppercase text-ink-muted">Jij</p>
                  <p className="mt-1 text-body text-ink">{p(o.opties!.find((x) => x.id === tweede)!.label)}</p>
                </div>
              </div>
              <Feedback kop={gekozen === tweede ? 'Hetzelfde' : 'Anders'}
                tekst={p(gekozen === tweede ? o.toen.zelfde : o.toen.anders)} />
            </>
          )}
        </>
      )}

      {/* --- Schuif de balans ---------------------------------------------- */}
      {o.type === 'balans' && o.balans && (
        <>
          <p className="blok-in font-serif text-h3 font-semibold text-ink">{p(o.vraag)}</p>
          <div className="blok-in flex flex-col gap-2">
            <input
              type="range" min={0} max={100} value={schuif}
              onChange={(e) => setSchuif(Number(e.target.value))}
              onPointerUp={() => { if (!balansKlaar) { setBalansKlaar(true); hapticTap(); onBeantwoord(false) } }}
              onKeyUp={() => { if (!balansKlaar) { setBalansKlaar(true); onBeantwoord(false) } }}
              aria-label={`${p(o.balans.links)} tot ${p(o.balans.rechts)}`}
              className="w-full accent-ink"
            />
            <div className="flex justify-between">
              <span className="text-caption text-ink-muted">{p(o.balans.links)}</span>
              <span className="text-caption text-ink-muted">{p(o.balans.rechts)}</span>
            </div>
          </div>
          {balansKlaar && (() => {
            const zone = o.balans!.zones.find((z) => schuif <= z.tot) ?? o.balans!.zones.at(-1)!
            return <Feedback kop={zone.kop} tekst={p(zone.tekst)} />
          })()}
        </>
      )}

      {/* --- De overige types ---------------------------------------------- */}
      {o.type !== 'toen-en-nu' && o.type !== 'balans' && (
        <p className="blok-in font-serif text-h3 font-semibold text-ink">{p(o.vraag)}</p>
      )}

      {o.dialoog && (
        <div className="flex flex-col gap-2">
          {o.dialoog.map((r, n) => {
            const toon = gekozen !== null
            return (
              <button
                key={n} type="button" disabled={toon} onClick={() => kies(String(n), r.kantelt)}
                className={`${knop} blok-in ${
                  toon && r.kantelt ? 'ring-2 ring-success-600'
                    : gekozen === String(n) ? 'ring-2 ring-danger-500' : ''
                }`}
              >
                <span className="text-caption font-bold uppercase text-ink-muted">
                  {r.spreker === 'vader' ? 'Jij' : p('{naam}')}
                </span>
                <span className="mt-1 block text-body-lg text-ink">{p(r.tekst)}</span>
              </button>
            )
          })}
        </div>
      )}

      {o.opties && o.type !== 'toen-en-nu' && (
        <div className="flex flex-col gap-2">
          {o.opties.map((x) => (
            <button
              key={x.id} type="button" disabled={gekozen !== null} onClick={() => kies(x.id, x.correct)}
              className={`${knop} blok-in ${
                gekozen !== null && x.correct ? 'ring-2 ring-success-600'
                  : gekozen === x.id ? 'ring-2 ring-ink' : ''
              }`}
            >
              <span className="text-body-lg text-ink">{p(x.label)}</span>
            </button>
          ))}
        </div>
      )}

      {o.stappen && (
        <div className="flex flex-col gap-2">
          {o.stappen.map((s, n) => {
            const pos = volgorde.indexOf(n)
            return (
              <button
                key={n} type="button" disabled={pos !== -1}
                onClick={() => {
                  hapticTap()
                  setVolgorde((v) => {
                    const next = [...v, n]
                    if (next.length === o.stappen!.length) {
                      onBeantwoord(next.some((x, idx) => x !== idx))
                    }
                    return next
                  })
                }}
                className={`${knop} blok-in flex items-center gap-3 ${pos !== -1 ? 'opacity-60' : ''}`}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-ink text-caption font-bold text-ink">
                  {pos === -1 ? '' : pos + 1}
                </span>
                <span className="text-body-lg text-ink">{p(s.tekst)}</span>
              </button>
            )
          })}
        </div>
      )}

      {regel && (
        <Feedback
          kop={regel.kantelt ? 'Precies daar' : 'Net niet'}
          tekst={p(regel.kantelt ? (regel.waarom ?? '') : (o.dialoog?.find((r) => r.kantelt)?.waarom ?? ''))}
        />
      )}
      {optie && optie.feedback && (
        <Feedback kop={o.scoorbaar && optie.correct ? 'Klopt' : 'Wat dit oplevert'} tekst={p(optie.feedback)} />
      )}
      {optie && o.afhangt && <Feedback kop="Waar het van afhangt" tekst={p(o.afhangt)} />}
      {o.stappen && volgorde.length === o.stappen.length &&
        volgorde.map((n, pos) => (
          <Feedback key={n} kop={`${pos + 1}. ${p(o.stappen![n].tekst)}`} tekst={p(o.stappen![n].waarom)} />
        ))}
    </div>
  )
}

function Feedback({ kop, tekst }: { kop: string; tekst: string }) {
  return (
    <div className="blok-in rounded-md bg-surface-sunken p-4">
      <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">{kop}</p>
      <p className="mt-2 text-body text-ink">{tekst}</p>
    </div>
  )
}

function Missie({ les, p, teVeel, onVerder }: {
  les: Les; p: (t: string) => string; teVeel: boolean; onVerder: () => void
}) {
  return (
    <>
      <Midden>
        <div className="blok-in flex flex-col gap-4">
          <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">Doe dit</p>
          <p className="font-serif text-h3 font-semibold leading-snug text-ink">
            {p(les.thuismissie.actie)}
          </p>
          <p className="text-body text-ink-muted">{p(les.thuismissie.waarom)}</p>
          <p className="text-caption text-ink-muted">
            Staat vanaf nu in je checklist. Daar vertel je hoe het ging.
          </p>
          {teVeel && (
            <p className="text-caption text-ink-muted">
              Je hebt vandaag al flink wat gedaan. Het mag, maar verdeeld over meer dagen werkt beter.
            </p>
          )}
        </div>
      </Midden>
      <div className="pb-6"><Button onClick={onVerder}>Verder</Button></div>
    </>
  )
}
