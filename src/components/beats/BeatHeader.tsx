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
    <div className="flex items-center gap-3">
      <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${style.softBg} ${style.text}`}>
        <Icon size={22} strokeWidth={2} />
      </span>
      <p className="font-serif text-h4 font-semibold text-ink">{title}</p>
    </div>
  )
}
