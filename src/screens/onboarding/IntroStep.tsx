import type { ComponentType } from 'react'
import { Button } from '../../components/Button'

interface IntroStepProps {
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
  step: number
  total: number
  title: string
  body: string
  onNext: () => void
}

export function IntroStep({ icon: Icon, step, total, title, body, onNext }: IntroStepProps) {
  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600">
          <Icon size={24} strokeWidth={2} />
        </div>
        <p className="text-label text-ink-muted">
          {step} van {total}
        </p>
        <h1 className="text-h1 font-extrabold text-ink">{title}</h1>
        <p className="text-body-lg font-semibold text-ink-muted">{body}</p>
      </div>
      <Button onClick={onNext}>Verder</Button>
    </div>
  )
}
