import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Welcome } from './Welcome'
import { Questions } from './Questions'
import { Promise } from './Promise'
import { useAppState, type Concern } from '../../state/AppStateContext'
import { lessons } from '../../data/lessons'

export function OnboardingFlow() {
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [concern, setConcern] = useState<Concern | null>(null)
  const { completeOnboarding } = useAppState()
  const navigate = useNavigate()

  if (step === 0) {
    return <Welcome onNext={() => setStep(1)} />
  }

  if (step === 1) {
    return (
      <Questions
        onNext={(selectedConcern) => {
          setConcern(selectedConcern)
          setStep(2)
        }}
      />
    )
  }

  return (
    <Promise
      onStart={() => {
        completeOnboarding(concern ?? 'onbekend')
        navigate(`/les/${lessons[0].id}`)
      }}
    />
  )
}
