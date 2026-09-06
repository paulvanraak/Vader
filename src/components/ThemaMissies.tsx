import { useState } from 'react'
import { Check } from 'lucide-react'
import { useOptionalAppState } from '../state/AppStateContext'
import { personalizeText } from '../lib/personalize'
import { hapticTap } from '../lib/haptics'
import { laadRitme, bewaarRitme, noteerMissie, type MissieAntwoord, type RitmeState } from '../lib/ritme'
import { THEMAS } from '../content/themas'

/**
 * De opdrachten uit een thema komen hier terecht, niet in het thema zelf. Daar
 * krijg je ze; hier vertel je hoe het ging — op het moment dat je het echt
 * gedaan hebt, of niet.
 *
 * "Niet gelukt" en "was er niet" zijn volwaardige antwoorden. Een lijst waar je
 * alleen ja op kunt zeggen, leert liegen.
 */
const ANTWOORDEN: { waarde: MissieAntwoord; label: string }[] = [
  { waarde: 'ging_goed', label: 'Ging goed' },
  { waarde: 'lastig', label: 'Was lastig' },
  { waarde: 'niet_gelukt', label: 'Niet gelukt' },
  { waarde: 'kind_was_er_niet', label: '{naam} was er niet' },
]

const LABEL: Record<string, string> = {
  ging_goed: 'Ging goed',
  lastig: 'Was lastig',
  niet_gelukt: 'Niet gelukt',
  kind_was_er_niet: 'Was er niet',
}

export function ThemaMissies() {
  const activeChild = useOptionalAppState()?.activeChild ?? null
  const p = (t: string) => personalizeText(t, activeChild)
  const [ritme, setRitme] = useState<RitmeState>(laadRitme)
  const [openId, setOpenId] = useState<string | null>(null)

  // Per thema gegroepeerd, zodat je ziet waar een opdracht vandaan komt als je
  // meerdere thema's door hebt.
  const groepen = THEMAS
    .map((t) => ({ thema: t, lessen: t.lessen.filter((l) => ritme.missies[l.id]) }))
    .filter((g) => g.lessen.length > 0)
  if (groepen.length === 0) return null

  function antwoord(lesId: string, a: MissieAntwoord) {
    hapticTap()
    const volgende = noteerMissie(ritme, lesId, a)
    setRitme(volgende)
    bewaarRitme(volgende)
    setOpenId(null)
  }

  return (
    <div className="flex flex-col gap-8">
      {groepen.map(({ thema, lessen }) => (
        <div key={thema.id} className="flex flex-col gap-3">
          <div>
            <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">
              Uit {p(thema.titel)}
            </p>
            <p className="mt-1 text-body text-ink-muted">
              Vertel hoe het ging. Elk antwoord telt, ook als het er niet van kwam.
            </p>
          </div>

          {lessen.map((les) => {
            const status = ritme.missies[les.id]
            const open = status === 'in_checklist'
            return (
              <div key={les.id} className="rounded-md bg-surface p-4 shadow-sm ring-1 ring-surface-sunken">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border-2 ${
                      open ? 'border-ink-faint text-transparent' : 'border-ink bg-ink text-page'
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <div className="flex-1">
                    <p className={`text-body-lg ${open ? 'text-ink' : 'text-ink-muted line-through'}`}>
                      {p(les.thuismissie.actie)}
                    </p>
                    {!open && (
                      <p className="mt-1 text-caption text-ink-muted">{LABEL[status] ?? ''}</p>
                    )}
                  </div>
                </div>

                {open && openId !== les.id && (
                  <button
                    type="button"
                    onClick={() => { hapticTap(); setOpenId(les.id) }}
                    className="mt-3 text-body font-bold text-primary-600 underline underline-offset-2"
                  >
                    Hoe ging het?
                  </button>
                )}

                {open && openId === les.id && (
                  <div className="mt-3 flex flex-col gap-2">
                    {ANTWOORDEN.map((a) => (
                      <button
                        key={a.waarde}
                        type="button"
                        onClick={() => antwoord(les.id, a.waarde)}
                        className="rounded-md bg-surface-sunken px-3 py-2.5 text-left text-body text-ink"
                      >
                        {p(a.label)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
