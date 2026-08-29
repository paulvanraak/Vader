import { Lightbulb } from 'lucide-react'
import type { Beat } from '../../types/lesson'
import { getWorldStyle } from '../../lib/worldStyles'
import { TypewriterText } from '../TypewriterText'

export function Inzicht({ beat, worldId }: { beat: Beat; worldId: number }) {
  const style = getWorldStyle(worldId)
  return (
    <div>
      <div className="flex items-center gap-4">
        <span
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-neutral-white/10"
          style={{ color: style.accentVar }}
        >
          <Lightbulb size={26} strokeWidth={2} />
        </span>
        <p className="font-serif text-h2 font-semibold uppercase tracking-wide">Inzicht</p>
      </div>
      <TypewriterText
        key={beat.body}
        text={beat.body ?? ''}
        className="mt-8 text-left text-body-lg leading-relaxed"
      />
    </div>
  )
}
