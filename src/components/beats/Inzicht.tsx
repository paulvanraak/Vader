import { Lightbulb } from 'lucide-react'
import type { Beat } from '../../types/lesson'
import { getWorldStyle } from '../../lib/worldStyles'
import { TypewriterText } from '../TypewriterText'

export function Inzicht({ beat, worldId }: { beat: Beat; worldId: number }) {
  const style = getWorldStyle(worldId)
  return (
    <div>
      <div className="flex flex-col items-center gap-4 text-center">
        <span
          className="flex size-14 items-center justify-center rounded-full bg-neutral-white/10"
          style={{ color: style.accentVar }}
        >
          <Lightbulb size={26} strokeWidth={2} />
        </span>
        <p className="text-h1 font-extrabold uppercase leading-relaxed tracking-wide">Inzicht</p>
      </div>
      <TypewriterText
        key={beat.body}
        text={beat.body ?? ''}
        className="mt-8 text-left text-body-lg leading-relaxed"
      />
    </div>
  )
}
