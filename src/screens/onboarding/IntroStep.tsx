import type { ComponentType } from 'react'
import { Button } from '../../components/Button'

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
    <div className="flex h-full flex-col justify-between bg-page px-7 py-10">
      <div className="flex flex-1 flex-col justify-center gap-4">
        <Icon className="stack-in size-10 text-accent-orange" />
        <p className="stack-in stack-delay-1 text-[18px] text-ink-muted">
          {step} van {total}
        </p>
        <h1 className="stack-in stack-delay-2 font-serif text-[32px] font-semibold text-ink">{title}</h1>
        <p className="stack-in stack-delay-3 text-[18px] leading-relaxed text-ink-muted">{body}</p>
      </div>
      <div className="stack-in stack-delay-4">
        <Button onClick={onNext}>Volgende</Button>
      </div>
    </div>
  )
}
