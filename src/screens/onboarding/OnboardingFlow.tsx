import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignupScreen } from './SignupScreen'
import { LoginScreen } from './LoginScreen'
import { ChildrenQuestion } from './ChildrenQuestion'
import { HowItWorks } from './HowItWorks'

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
    // Terugkerende gebruiker: geen kind-stap, direct de app in.
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
  } else if (step === 1) {
    content = <ChildrenQuestion onNext={() => setStep(2)} />
  } else {
    content = <HowItWorks onStart={() => navigate('/')} />
  }

  return (
    <div key={`${mode}-${step}`} className="animate-dissolve h-full">
      {content}
    </div>
  )
}
