import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/Button'
import { useOptionalAppState } from '../state/AppStateContext'
import { personalizeText } from '../lib/personalize'
import { hapticTap, hapticSuccess } from '../lib/haptics'
import { THEMA1, THEMA1_LESSEN, THEMA1_OEFENINGEN, type Oefening, type Les } from '../content/thema1'

/**
 * Speelbare versie van thema 1 in de nieuwe opzet, zodat het te testen is
 * zonder dat er iets aan de database verandert. Zie src/content/thema1.ts.
 */

type Stap =
  | { soort: 'intro' }
  | { soort: 'les'; les: Les }
  | { soort: 'oefening'; oefening: Oefening }
  | { soort: 'checkpoint' }
  | { soort: 'stil'; index: number }
  | { soort: 'einde' }

function bouwStappen(): Stap[] {
  const stappen: Stap[] = [{ soort: 'intro' }]
  for (const les of THEMA1_LESSEN) {
    stappen.push({ soort: 'les', les })
    for (const o of THEMA1_OEFENINGEN.filter((x) => x.lesId === les.id)) {
      stappen.push({ soort: 'oefening', oefening: o })
    }
  }
  stappen.push({ soort: 'checkpoint' })
  THEMA1.stilleWeken.forEach((_, i) => stappen.push({ soort: 'stil', index: i }))
  stappen.push({ soort: 'einde' })
  return stappen
}

const kaart = 'rounded-md bg-surface p-4 text-left shadow-sm ring-1 ring-surface-sunken'

export function Thema1() {
  const navigate = useNavigate()
  const activeChild = useOptionalAppState()?.activeChild ?? null
  const stappen = useMemo(bouwStappen, [])
  const [i, setI] = useState(0)
  // Per stap onthouden of de oefening beantwoord is; zonder dit zou de
  // verder-knop op een oefeningscherm nooit verschijnen.
  const [beantwoord, setBeantwoord] = useState<Record<number, boolean>>({})
  const stap = stappen[i]

  const p = (t: string) => personalizeText(t, activeChild)
  const verder = () => {
    hapticTap()
    setI((n) => Math.min(n + 1, stappen.length - 1))
  }

  const fasen = THEMA1_LESSEN.length
  const voortgang = Math.round((i / (stappen.length - 1)) * 100)

  return (
    <div className="flex h-full flex-col bg-page">
      <div className="flex items-center gap-3 px-5 pb-2 pt-4">
        <button
          type="button"
          aria-label="Terug"
          onClick={() => (i === 0 ? navigate('/') : setI((n) => n - 1))}
          className="flex size-9 items-center justify-center rounded-full text-ink hover:bg-surface-sunken"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-sunken">
          <div className="h-full rounded-full bg-ink transition-all" style={{ width: `${voortgang}%` }} />
        </div>
      </div>

      <div key={i} className="animate-dissolve flex-1 overflow-y-auto px-5 pb-8 pt-2">
        {stap.soort === 'intro' && (
          <div className="flex flex-col gap-4">
            <p className="text-caption uppercase tracking-wide text-ink-muted">
              Thema 1 · {THEMA1.weken} weken · {fasen} lessen
            </p>
            <h1 className="font-serif text-h1 font-semibold text-ink">{THEMA1.intro.kop}</h1>
            <p className="text-body-lg text-ink">{p(THEMA1.ondertitel)}</p>
            {THEMA1.intro.tekst.split('\n\n').map((r, n) => (
              <p key={n} className="text-body text-ink-muted">{p(r)}</p>
            ))}
            <div className={kaart}>
              <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">Wat het oplevert</p>
              <p className="mt-2 text-body text-ink">{p(THEMA1.intro.belofte)}</p>
            </div>
          </div>
        )}

        {stap.soort === 'les' && <LesScherm les={stap.les} p={p} />}
        {stap.soort === 'oefening' && (
          <OefeningScherm
            key={stap.oefening.id}
            oefening={stap.oefening}
            p={p}
            onBeantwoord={() => setBeantwoord((b) => ({ ...b, [i]: true }))}
          />
        )}

        {stap.soort === 'checkpoint' && (
          <div className="flex flex-col gap-4">
            <p className="text-caption uppercase tracking-wide text-ink-muted">Week 5 en 6 · checkpoint</p>
            <h1 className="font-serif text-h2 font-semibold text-ink">{THEMA1.checkpoint.kop}</h1>
            <p className="text-body text-ink-muted">{p(THEMA1.checkpoint.tekst)}</p>
            <div className={kaart}>
              <p className="text-body text-ink">
                Vijf vragen uit het hele thema komen hier door elkaar terug, plus een terugblik op
                de vier thuismissies.
              </p>
              <ul className="mt-3 flex flex-col gap-1">
                {THEMA1_LESSEN.map((l) => (
                  <li key={l.id} className="text-body text-ink-muted">· {p(l.thuismissie.actie)}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {stap.soort === 'stil' && (
          <div className="flex flex-col gap-4">
            <p className="text-caption uppercase tracking-wide text-ink-muted">
              Week {THEMA1.stilleWeken[stap.index].week} · stille week
            </p>
            <h1 className="font-serif text-h2 font-semibold text-ink">{THEMA1.stilleWeken[stap.index].kop}</h1>
            <p className="text-body text-ink-muted">{p(THEMA1.stilleWeken[stap.index].tekst)}</p>
            <div className={kaart}>
              <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">Opfrisser</p>
              <p className="mt-2 text-body text-ink">
                {p(
                  THEMA1_OEFENINGEN.find((o) => o.id === THEMA1.stilleWeken[stap.index].opfrisser)?.vraag ??
                    '',
                )}
              </p>
            </div>
            <button type="button" className="self-start text-body font-bold text-primary-600 underline">
              Ik wil nu al door →
            </button>
          </div>
        )}

        {stap.soort === 'einde' && (
          <div className="flex flex-col gap-4">
            <h1 className="font-serif text-h1 font-semibold text-ink">Einde van het thema</h1>
            <p className="text-body text-ink-muted">
              Acht weken gehad. Hierna kies je zelf welk thema je opent.
            </p>
          </div>
        )}
      </div>

      <div className="pb-6 pt-2">
        <Button
          onClick={verder}
          disabled={i === stappen.length - 1 || (stap.soort === 'oefening' && !beantwoord[i])}
        >
          {stap.soort === 'intro' ? 'Beginnen' : stap.soort === 'oefening' ? 'Volgende' : 'Verder'}
        </Button>
      </div>
    </div>
  )
}

function LesScherm({ les, p }: { les: Les; p: (t: string) => string }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-caption uppercase tracking-wide text-ink-muted">
        Week {les.nr} · {les.fase}
      </p>
      <h1 className="font-serif text-h2 font-semibold leading-snug text-ink">{p(les.titel)}</h1>
      <p className="text-body-lg text-ink">{p(les.haakje)}</p>
      <div className={kaart}>
        <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">Inzicht</p>
        <p className="mt-2 whitespace-pre-line text-body text-ink">{p(les.inzicht)}</p>
      </div>
      <div className={kaart}>
        <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">Spiegel</p>
        <p className="mt-2 text-body text-ink">{p(les.spiegel)}</p>
      </div>
      <div className="rounded-md border-2 border-ink p-4">
        <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">Deze week</p>
        <p className="mt-2 text-body-lg font-bold text-ink">{p(les.thuismissie.actie)}</p>
        <p className="mt-2 text-body text-ink-muted">{p(les.thuismissie.waarom)}</p>
      </div>
    </div>
  )
}

const TYPE_LABEL: Record<Oefening['type'], string> = {
  'waar-ging-het-mis': 'Waar ging het mis',
  'eerste-neiging': 'Jouw eerste neiging',
  'twee-wegen': 'Twee redelijke wegen',
  'een-woord': 'Eén woord verschil',
  'en-dan': 'En dan?',
  volgorde: 'Zet op volgorde',
  'beste-aanpak': 'Beste aanpak',
}

function OefeningScherm({
  oefening,
  p,
  onBeantwoord,
}: {
  oefening: Oefening
  p: (t: string) => string
  onBeantwoord: () => void
}) {
  const [gekozen, setGekozen] = useState<string | null>(null)
  const [volgorde, setVolgorde] = useState<number[]>([])

  const optie = oefening.opties?.find((o) => o.id === gekozen)
  const dialoogRegel = oefening.dialoog?.[Number(gekozen)]
  const volgordeKlaar = volgorde.length === (oefening.stappen?.length ?? 0)

  function kies(id: string, goed?: boolean) {
    setGekozen(id)
    if (goed) hapticSuccess()
    else hapticTap()
    onBeantwoord()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-caption font-bold text-ink-muted">
          {TYPE_LABEL[oefening.type]}
        </span>
        {!oefening.scoorbaar && (
          <span className="text-caption text-ink-muted">geen goed of fout</span>
        )}
      </div>

      <p className="text-body-lg text-ink">{p(oefening.situatie)}</p>
      <p className="font-serif text-h3 font-semibold text-ink">{p(oefening.vraag)}</p>

      {oefening.dialoog && (
        <div className="flex flex-col gap-2">
          {oefening.dialoog.map((r, n) => {
            const gekozenRegel = gekozen === String(n)
            const toon = gekozen !== null
            return (
              <button
                key={n}
                type="button"
                disabled={toon}
                onClick={() => kies(String(n), r.kantelt)}
                className={`${kaart} ${
                  toon && r.kantelt
                    ? 'ring-2 ring-success-600'
                    : gekozenRegel
                      ? 'ring-2 ring-danger-500'
                      : ''
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

      {oefening.opties && (
        <div className="flex flex-col gap-2">
          {oefening.opties.map((o) => (
            <button
              key={o.id}
              type="button"
              disabled={gekozen !== null}
              onClick={() => kies(o.id, o.correct)}
              className={`${kaart} ${
                gekozen !== null && o.correct
                  ? 'ring-2 ring-success-600'
                  : gekozen === o.id
                    ? 'ring-2 ring-ink'
                    : ''
              }`}
            >
              <span className="block text-body-lg text-ink">{p(o.label)}</span>
            </button>
          ))}
        </div>
      )}

      {oefening.stappen && (
        <div className="flex flex-col gap-2">
          {oefening.stappen.map((s, n) => {
            const pos = volgorde.indexOf(n)
            return (
              <button
                key={n}
                type="button"
                disabled={pos !== -1}
                onClick={() => {
                  hapticTap()
                  setVolgorde((v) => {
                    const next = [...v, n]
                    if (next.length === (oefening.stappen?.length ?? 0)) onBeantwoord()
                    return next
                  })
                }}
                className={`${kaart} flex items-center gap-3 ${pos !== -1 ? 'opacity-60' : ''}`}
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

      {dialoogRegel && (
        <Feedback
          kop={dialoogRegel.kantelt ? 'Precies daar' : 'Net niet'}
          tekst={p(
            dialoogRegel.kantelt
              ? (dialoogRegel.waarom ?? '')
              : (oefening.dialoog?.find((r) => r.kantelt)?.waarom ?? ''),
          )}
        />
      )}
      {optie && <Feedback kop={oefening.scoorbaar && optie.correct ? 'Klopt' : 'Wat dit oplevert'} tekst={p(optie.feedback)} />}
      {optie && oefening.afhangt && <Feedback kop="Waar het van afhangt" tekst={p(oefening.afhangt)} />}
      {volgordeKlaar &&
        volgorde.map((n, pos) => (
          <Feedback key={n} kop={`${pos + 1}. ${p(oefening.stappen![n].tekst)}`} tekst={p(oefening.stappen![n].waarom)} />
        ))}
    </div>
  )
}

function Feedback({ kop, tekst }: { kop: string; tekst: string }) {
  return (
    <div className="animate-dissolve rounded-md bg-surface-sunken p-4">
      <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">{kop}</p>
      <p className="mt-2 text-body text-ink">{tekst}</p>
    </div>
  )
}
