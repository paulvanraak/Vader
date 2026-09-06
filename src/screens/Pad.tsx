import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { useOptionalAppState } from '../state/AppStateContext'
import { personalizeText } from '../lib/personalize'
import { hapticTap } from '../lib/haptics'
import { laadRitme, openLessen } from '../lib/ritme'
import { THEMA1_LESSEN } from '../content/thema1'

/**
 * Het pad tussen thema's door.
 *
 * Bovenaan de vraag waar je nu mee zit, met een aanbeveling en de reden erbij.
 * Daaronder alle thema's, altijd zichtbaar en altijd te kiezen. Sturing zonder
 * dwang: de app zegt wat ze zou doen en waarom, jij beslist.
 */

interface Thema {
  id: string
  nr: number
  titel: string
  onder: string
  route: string | null
}

const THEMAS: Thema[] = [
  { id: 'contact', nr: 1, titel: 'Contact maken', onder: 'Bereikbaar blijven als {hij} zich terugtrekt', route: '/thema1' },
  { id: 'escaleert', nr: 2, titel: 'Als het escaleert', onder: 'Buien, stiltes en wat erachter zit', route: null },
  { id: 'regels', nr: 3, titel: 'Regels en ruimte', onder: 'Grenzen zonder machtsstrijd', route: null },
  { id: 'zelfbeeld', nr: 4, titel: 'Hoe {hij} naar zichzelf kijkt', onder: 'Falen, opscheppen en vergelijken', route: null },
  { id: 'vrienden', nr: 5, titel: 'Vrienden en de groep', onder: 'Meedoen, buitensluiten en meningen', route: null },
  { id: 'schermen', nr: 6, titel: 'Schermen en online', onder: 'Scrollen, influencers en schermtijd', route: null },
]

const ZORGEN: { label: string; thema: string; reden: string }[] = [
  { label: '{Hij} vertelt niks', thema: 'contact', reden: 'Dat is waar dit thema over gaat, en het is de basis onder alle andere.' },
  { label: 'Het loopt vaak uit de hand', thema: 'escaleert', reden: 'Ga hier heen. Maar contact maken helpt eerst, want zonder dat wordt elke botsing zwaarder.' },
  { label: 'Ruzie over regels', thema: 'regels', reden: 'Regels werken pas als er contact is. Kun je die twee combineren, doe dat.' },
  { label: '{Hij} is onzeker', thema: 'zelfbeeld', reden: 'Trager thema, geen haast. Het vraagt wel dat {hij} dingen met je deelt.' },
  { label: 'Gedoe met vrienden', thema: 'vrienden', reden: 'Urgent rond deze leeftijd, en het komt meestal vanzelf ter sprake.' },
  { label: 'Schermtijd', thema: 'schermen', reden: 'De meest voorkomende aanleiding. Prima om mee te beginnen.' },
]

export function Pad() {
  const navigate = useNavigate()
  const activeChild = useOptionalAppState()?.activeChild ?? null
  const p = (t: string) => personalizeText(t, activeChild)
  const [zorg, setZorg] = useState<string | null>(null)

  const ritme = laadRitme()
  const gedaan = openLessen(ritme, THEMA1_LESSEN.map((l) => l.id))
  const contactAf = Object.keys(ritme.missies).length >= THEMA1_LESSEN.length

  const gekozen = ZORGEN.find((z) => z.label === zorg)
  const aanbevolen = gekozen ? THEMAS.find((t) => t.id === gekozen.thema) : null

  function open(t: Thema) {
    hapticTap()
    if (t.route) navigate(t.route)
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-page">
      <div className="flex items-center gap-3 px-5 pb-2 pt-4">
        <button
          type="button" aria-label="Terug" onClick={() => navigate('/')}
          className="flex size-9 items-center justify-center rounded-full text-ink hover:bg-surface-sunken"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="blok-in flex flex-col gap-3 px-5 pb-6">
        <h1 className="font-serif text-h2 font-semibold text-ink">Waar zit je nu mee?</h1>
        <p className="text-body text-ink-muted">
          Eén tik en ik zeg wat ik zou pakken, en waarom. Je mag altijd iets anders kiezen.
        </p>
        <div className="flex flex-wrap gap-2">
          {ZORGEN.map((z) => (
            <button
              key={z.label} type="button"
              onClick={() => { hapticTap(); setZorg(z.label === zorg ? null : z.label) }}
              className={`rounded-full px-3.5 py-2 text-body transition ${
                zorg === z.label
                  ? 'bg-ink text-page'
                  : 'bg-surface text-ink ring-1 ring-surface-sunken'
              }`}
            >
              {p(z.label)}
            </button>
          ))}
        </div>

        {aanbevolen && gekozen && (
          <div className="blok-in mt-2 rounded-md border-2 border-ink p-4">
            <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">Ik zou dit pakken</p>
            <p className="mt-1 font-serif text-h4 font-semibold text-ink">{p(aanbevolen.titel)}</p>
            <p className="mt-2 text-body text-ink-muted">{p(gekozen.reden)}</p>
            <button
              type="button" onClick={() => open(aanbevolen)}
              disabled={!aanbevolen.route}
              className="mt-3 rounded-full bg-ink px-5 py-2.5 text-label text-page disabled:opacity-40"
            >
              {aanbevolen.route ? 'Openen' : 'Nog niet gebouwd'}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 px-5 pb-10">
        <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">Alle thema's</p>
        {THEMAS.map((t) => {
          const isContact = t.id === 'contact'
          const af = isContact && contactAf
          const bezig = isContact && !af && gedaan > 1
          return (
            <button
              key={t.id} type="button" onClick={() => open(t)} disabled={!t.route}
              className={`flex items-start gap-3 rounded-md p-4 text-left transition ${
                t.route ? 'bg-surface shadow-sm ring-1 ring-surface-sunken' : 'bg-surface/50 opacity-60'
              } ${aanbevolen?.id === t.id ? 'ring-2 ring-ink' : ''}`}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-ink text-body font-bold text-ink">
                {af ? <Check size={16} strokeWidth={3} /> : t.nr}
              </span>
              <span className="flex-1">
                <span className="block text-body-lg font-bold text-ink">{p(t.titel)}</span>
                <span className="block text-body text-ink-muted">{p(t.onder)}</span>
                {bezig && (
                  <span className="mt-1 block text-caption text-ink-muted">
                    {gedaan} van {THEMA1_LESSEN.length} delen open
                  </span>
                )}
                {!t.route && <span className="mt-1 block text-caption text-ink-muted">Nog niet gebouwd</span>}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
