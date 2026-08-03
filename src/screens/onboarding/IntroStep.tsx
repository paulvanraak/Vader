import type { ComponentType } from 'react'
import { OnboardingButton } from './OnboardingButton'

interface IntroStepProps {
  icon: ComponentType<{ className?: string }>
  step: number
  total: number
  title: string
  body: string
  onNext: () => void
}

export function IntroStep({ icon: Icon, step, total, title, body, onNext }: IntroStepProps) {
  return (
    <div className="flex h-full flex-col justify-between bg-[#21283e] px-7 py-10">
      <div className="flex flex-1 flex-col justify-center gap-4">
        <Icon className="size-10 text-warning-500" />
        <p className="text-[18px] text-[#b1e9ff]">
          {step} van {total}
        </p>
        <h1 className="text-[28px] font-semibold text-white">{title}</h1>
        <p className="text-[20px] font-light leading-relaxed text-white">{body}</p>
      </div>
      <OnboardingButton onClick={onNext}>Volgende</OnboardingButton>
    </div>
  )
}
