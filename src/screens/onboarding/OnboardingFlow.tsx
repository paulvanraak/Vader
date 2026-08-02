import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Radar, Sunrise } from 'lucide-react'
import { SignupScreen } from './SignupScreen'
import { LoginScreen } from './LoginScreen'
import { IntroStep } from './IntroStep'
import { ChildrenQuestion } from './ChildrenQuestion'
import { HowItWorks } from './HowItWorks'
import { useAppState, type ChildProfile } from '../../state/AppStateContext'

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

export type OnboardingMode = 'nieuw' | 'inloggen'

export function OnboardingFlow({ mode = 'nieuw' }: { mode?: OnboardingMode }) {
  const [step, setStep] = useState(0)
  const [fatherName, setFatherName] = useState('')
  const [children, setChildren] = useState<ChildProfile[]>([])
  const { completeOnboarding } = useAppState()
  const navigate = useNavigate()

  let content: ReactNode

  if (mode === 'inloggen') {
    // Terugkerende gebruiker: geen uitlegschermen, direct van inloggen naar kinderen.
    if (step === 0) {
      content = (
        <LoginScreen
          onNext={(name) => {
            setFatherName(name)
            setStep(1)
          }}
        />
      )
    } else {
      content = (
        <ChildrenQuestion
          onNext={(selectedChildren) => {
            completeOnboarding(fatherName, selectedChildren)
            navigate('/')
          }}
        />
      )
    }
  } else if (step === 0) {
    content = (
      <SignupScreen
        onNext={(name) => {
          setFatherName(name)
          setStep(1)
        }}
      />
    )
  } else if (step <= 3) {
    const part = introParts[step - 1]
    content = (
      <IntroStep
        icon={part.icon}
        step={step}
        total={introParts.length}
        title={part.title}
        body={part.body}
        onNext={() => setStep((s) => s + 1)}
      />
    )
  } else if (step === 4) {
    content = (
      <ChildrenQuestion
        onNext={(selectedChildren) => {
          setChildren(selectedChildren)
          setStep(5)
        }}
      />
    )
  } else {
    content = (
      <HowItWorks
        onStart={() => {
          completeOnboarding(fatherName, children)
          navigate('/')
        }}
      />
    )
  }

  return (
    <div key={`${mode}-${step}`} className="animate-dissolve h-full">
      {content}
    </div>
  )
}
