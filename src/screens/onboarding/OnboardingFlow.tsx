import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Radar, Sunrise } from 'lucide-react'
import { IntroStep } from './IntroStep'
import { ChildQuestion } from './ChildQuestion'
import { AgeQuestion } from './AgeQuestion'
import { HowItWorks } from './HowItWorks'
import { useAppState, type ChildGender, type AgeGroup } from '../../state/AppStateContext'

const introParts = [
  {
    icon: Users,
    title: 'Wat is FatherFlow?',
    body: 'FatherFlow helpt je je kind stap voor stap beter te begrijpen. Geen grote veranderingen in één keer, maar kleine, haalbare stappen om op te verbeteren.',
  },
  {
    icon: Radar,
    title: 'Waarom kleine stappen',
    body: 'Tussen werk, huishouden en de waan van de dag is er zelden ruimte voor een groot gesprek. Daarom werkt FatherFlow met stappen die er altijd zijn, ook op een drukke dag.',
  },
  {
    icon: Sunrise,
    title: 'Hoe het voelt',
    body: 'Geen cursus, geen huiswerk. Elke dag een klein moment dat past tussen alle andere dingen door, gebouwd om jullie band te versterken.',
  },
]

type Step = 0 | 1 | 2 | 3 | 4 | 5

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>(0)
  const [gender, setGender] = useState<ChildGender>('zoon')
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('oud')
  const { completeOnboarding } = useAppState()
  const navigate = useNavigate()

  let content: ReactNode

  if (step <= 2) {
    const part = introParts[step]
    content = (
      <IntroStep
        icon={part.icon}
        step={step + 1}
        total={introParts.length}
        title={part.title}
        body={part.body}
        onNext={() => setStep((s) => (s + 1) as Step)}
      />
    )
  } else if (step === 3) {
    content = (
      <ChildQuestion
        onNext={(selectedGender) => {
          setGender(selectedGender)
          setStep(4)
        }}
      />
    )
  } else if (step === 4) {
    content = (
      <AgeQuestion
        onNext={(selectedAgeGroup) => {
          setAgeGroup(selectedAgeGroup)
          setStep(5)
        }}
      />
    )
  } else {
    content = (
      <HowItWorks
        onStart={() => {
          completeOnboarding(gender, ageGroup)
          navigate('/')
        }}
      />
    )
  }

  return (
    <div key={step} className="animate-dissolve h-full">
      {content}
    </div>
  )
}
