import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignupScreen } from './SignupScreen'
import { LoginScreen } from './LoginScreen'
import { IntroStep } from './IntroStep'
import { ChildrenQuestion } from './ChildrenQuestion'
import { HowItWorks } from './HowItWorks'
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

export type OnboardingMode = 'nieuw' | 'inloggen'

interface OnboardingFlowProps {
  mode?: OnboardingMode
  onSwitchMode?: (mode: OnboardingMode) => void
}

export function OnboardingFlow({ mode = 'nieuw', onSwitchMode }: OnboardingFlowProps) {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  let content: ReactNode

  if (mode === 'inloggen') {
    // Terugkerende gebruiker: geen uitlegschermen en geen kind-stap, direct de app in.
    // Een kind toevoegen kan daarna via het menu.
    content = (
      <LoginScreen
        onNext={() => navigate('/')}
        onSwitchToSignup={onSwitchMode && (() => onSwitchMode('nieuw'))}
      />
    )
  } else if (step === 0) {
    content = (
      <SignupScreen
        onNext={() => setStep(1)}
        onSwitchToLogin={onSwitchMode && (() => onSwitchMode('inloggen'))}
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
    content = <ChildrenQuestion onNext={() => setStep(5)} />
  } else {
    content = <HowItWorks onStart={() => navigate('/')} />
  }

  return (
    <div key={`${mode}-${step}`} className="animate-dissolve h-full">
      {content}
    </div>
  )
}
