import { useState } from 'react'
import { IntroStep } from './IntroStep'
import { WaveIcon, DotsIcon, BarsIcon } from './OnboardingIcons'

const introParts = [
  {
    icon: WaveIcon,
    title: 'Wat is FatherFlow?',
    body: 'FatherFlow helpt je je kind stap voor stap beter te begrijpen. Geen grote veranderingen in één keer, maar kleine, haalbare stappen om op te verbeteren.',
  },
  {
    icon: DotsIcon,
    title: 'Waarom kleine stappen?',
    body: 'Tussen werk, huishouden en de waan van de dag is er zelden ruimte voor een groot gesprek. Daarom werkt FatherFlow met stappen die er altijd zijn, ook op een drukke dag.',
  },
  {
    icon: BarsIcon,
    title: 'Hoe het voelt?',
    body: 'Geen cursus, geen huiswerk. Elke dag een klein moment dat past tussen alle andere dingen door, gebouwd om jullie band te versterken.',
  },
]

export function IntroCarousel({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const part = introParts[step]

  function next() {
    if (step + 1 < introParts.length) {
      setStep((s) => s + 1)
    } else {
      onDone()
    }
  }

  return (
    <div key={step} className="animate-dissolve h-full">
      <IntroStep icon={part.icon} step={step + 1} total={introParts.length} title={part.title} body={part.body} onNext={next} />
    </div>
  )
}
