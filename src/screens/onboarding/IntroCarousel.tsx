import { useState } from 'react'
import { Button } from '../../components/Button'
import { BlokkenStapel } from '../../components/BlokkenStapel'
import { WaveIcon, DotsIcon, BarsIcon } from './OnboardingIcons'

/**
 * De introductie, in dezelfde beweging als de rest van de app.
 *
 * Waarom niet meer drie schermen met een knop eronder: de app werkt overal met
 * een stapel die van onder opbouwt en een swipe omhoog. Als de onboarding dat
 * anders doet, leer je hier een bediening aan die je binnen twee minuten weer
 * moet afleren. De knop staat er alleen bij het laatste hoofdstuk, precies
 * zoals in een thema.
 *
 * De tekst is bijgewerkt naar het thema-model: geen "elke dag een les", maar
 * één thema tegelijk, in stukken die af zijn. Wat het ritme precies is staat
 * op het beginscherm zelf; hier zou het alleen dubbel zijn.
 */
const hoofdstukken = [
  {
    icon: WaveIcon,
    titel: 'Wat is FatherFlow?',
    regels: [
      'Je kind van acht tot zestien verandert sneller dan je kunt bijhouden. Dit helpt je begrijpen wat er gebeurt.',
      'Je werkt aan één thema tegelijk. Contact maken, botsingen, regels — je kiest zelf waar je begint.',
    ],
  },
  {
    icon: DotsIcon,
    titel: 'Hoe het werkt',
    regels: [
      'Een thema bestaat uit vier stukken. Een kort inzicht, een paar oefeningen, en één ding om thuis te doen.',
      'Zes minuten per keer. Geen huiswerk dat zich opstapelt als je een week overslaat.',
    ],
  },
  {
    icon: BarsIcon,
    titel: 'Geen toets',
    regels: [
      'De meeste oefeningen hebben geen goed antwoord. Je oefent afwegen, niet het juiste vakje aankruisen.',
      'En je hoort steeds waaróm iets werkt, zodat je het zelf kunt herhalen als het er echt toe doet.',
    ],
  },
]

export function IntroCarousel({ onDone }: { onDone: () => void }) {
  const [stap, setStap] = useState(0)
  const hoofdstuk = hoofdstukken[stap]
  const Icon = hoofdstuk.icon
  const laatste = stap + 1 >= hoofdstukken.length

  const blokken = [
    <div key="k" className="flex flex-col gap-4">
      <Icon className="size-10 text-accent-orange" />
      <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">
        {stap + 1} van {hoofdstukken.length}
      </p>
      <h1 className="font-serif text-h1 font-semibold leading-tight text-ink">{hoofdstuk.titel}</h1>
    </div>,
    // De twee regels komen samen op, niet één voor één. Ze horen bij elkaar:
    // de tweede maakt de eerste pas af, en los na elkaar leest het als twee
    // losse mededelingen. In een thema is elk blok een eigen gedachte en klopt
    // die opbouw wel; hier niet.
    <div key="r" className="flex flex-col gap-4">
      {hoofdstuk.regels.map((regel, n) => (
        <p key={n} className="text-body-lg leading-relaxed text-ink-muted">{regel}</p>
      ))}
    </div>,
  ]

  return (
    // De sleutel per stap: elk hoofdstuk komt opnieuw van onder in beeld in
    // plaats van dat de tekst stilletjes verwisselt.
    <div key={stap} className="hoofdstuk-in flex h-full flex-col bg-page px-2">
      <BlokkenStapel
        blokken={blokken}
        onKlaar={() => (laatste ? onDone() : setStap((s) => s + 1))}
        knop={laatste ? (verder) => (
          <div className="px-3 pb-6">
            <Button onClick={verder}>Laten we beginnen</Button>
          </div>
        ) : undefined}
      />
    </div>
  )
}
