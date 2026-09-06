import { useState } from 'react'
import { WaveIcon } from './onboarding/OnboardingIcons'
import { Button } from '../components/Button'
import { hapticTap } from '../lib/haptics'
import { wisAlles } from '../lib/hardReset'

/**
 * Het eerste scherm. Daaronder, klein, de nooduitgang: alles wissen en als
 * verse gebruiker beginnen.
 *
 * Twee dingen bewust zo:
 *
 * - Hij staat er alleen zolang er automatisch ingelogd wordt. Dat is de stand
 *   waarin er nog gebouwd en getest wordt. Zet VITE_AUTO_LOGIN=false voor de
 *   test met echte vaders en de knop verdwijnt vanzelf; niemand wil zijn eigen
 *   voortgang per ongeluk wegvegen op het openingsscherm.
 * - Hij vraagt eerst na. Wissen kan niet terug, dus één tik mag nooit genoeg
 *   zijn. Geen verstopte knop, geen misleidende tekst: er staat precies wat er
 *   weggaat.
 */
export function Splash({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex h-full flex-col justify-between overflow-hidden bg-page px-7 pb-8 pt-16">
      <div className="flex flex-1 flex-col justify-center gap-4 text-ink">
        <WaveIcon className="stack-in h-10 w-12" />
        <p className="stack-in stack-delay-1 font-serif text-[56px] font-semibold leading-[0.95]">
          Father
          <br />
          Flow
        </p>
      </div>
      <div className="stack-in stack-delay-2 flex flex-col gap-4">
        <Button onClick={onDone}>Let's Go</Button>
        {__AUTO_LOGIN__ && <OpnieuwBeginnen />}
      </div>
    </div>
  )
}

function OpnieuwBeginnen() {
  const [vraagt, setVraagt] = useState(false)
  const [bezig, setBezig] = useState(false)
  const [fout, setFout] = useState<string | null>(null)

  async function wis() {
    hapticTap()
    setBezig(true)
    setFout(null)
    const uitkomst = await wisAlles()
    if (uitkomst.fout) {
      // Dit toestel is wél leeg; alleen in de database bleef iets staan. Dat
      // hoor je te weten voordat je denkt dat alles weg is.
      setFout(uitkomst.fout)
      setBezig(false)
      return
    }
    // Harde herlaadbeurt: alle staat in het geheugen gaat mee weg, en de app
    // start als een gebruiker die hier nog nooit geweest is.
    window.location.replace('/')
  }

  if (!vraagt) {
    return (
      <button
        type="button"
        onClick={() => { hapticTap(); setVraagt(true) }}
        className="mx-auto text-caption text-ink-faint underline underline-offset-2"
      >
        Opnieuw beginnen
      </button>
    )
  }

  return (
    <div className="rounded-md border-2 border-ink bg-surface p-4">
      <p className="text-body-lg font-bold text-ink">Alles wissen?</p>
      <p className="mt-1 text-body text-ink-muted">
        Je kind, je voortgang, je badges en je gesprekken gaan weg. Je begint als een
        gebruiker die hier nog nooit geweest is. Dit kan niet terug.
      </p>
      {fout && (
        <p className="mt-2 text-caption font-semibold text-danger-500">
          Dit toestel is leeg, maar wissen in de database lukte niet: {fout}
        </p>
      )}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled={bezig}
          onClick={() => void wis()}
          className="rounded-full bg-ink px-5 py-2.5 text-label text-page disabled:opacity-40"
        >
          {bezig ? 'Bezig…' : 'Ja, wis alles'}
        </button>
        <button
          type="button"
          disabled={bezig}
          onClick={() => { hapticTap(); setVraagt(false); setFout(null) }}
          className="rounded-full px-5 py-2.5 text-label text-ink"
        >
          Nee, laat staan
        </button>
      </div>
    </div>
  )
}
