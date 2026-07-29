import type { ComponentType } from 'react'

interface BeatHeaderProps {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  title: string
}

export function BeatHeader({ icon: Icon, title }: BeatHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
        <Icon size={24} strokeWidth={2} />
      </span>
      <p className="text-h4 font-extrabold uppercase tracking-wide text-ink">{title}</p>
    </div>
  )
}
