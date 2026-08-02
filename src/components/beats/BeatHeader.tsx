import type { ComponentType } from 'react'
import { getWorldStyle } from '../../lib/worldStyles'

interface BeatHeaderProps {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  title: string
  worldId: number
}

export function BeatHeader({ icon: Icon, title, worldId }: BeatHeaderProps) {
  const style = getWorldStyle(worldId)
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className={`flex size-12 items-center justify-center rounded-full ${style.softBg} ${style.text}`}>
        <Icon size={24} strokeWidth={2} />
      </span>
      <p className="text-h4 font-extrabold uppercase tracking-wide text-ink">{title}</p>
    </div>
  )
}
