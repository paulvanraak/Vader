import { MirrorRectangular } from 'lucide-react'
import type { Beat } from '../../types/lesson'
import { getWorldStyle } from '../../lib/worldStyles'
import { TypewriterText } from '../TypewriterText'

/**
 * Het handtekeningmoment. Vaste, herkenbare stijl die in elke les terugkomt:
 * donkere kaart in de tint van de wereld, mirror-icoon, altijd de titel "SPIEGEL".
 */
export function Spiegel({ beat, worldId }: { beat: Beat; worldId: number }) {
  const style = getWorldStyle(worldId)
  return (
    <div>
      <div className="flex items-center gap-4">
        <span
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-neutral-white/10"
          style={{ color: style.accentVar }}
        >
          <MirrorRectangular size={26} strokeWidth={2} />
        </span>
        <p className="font-serif text-h2 font-semibold uppercase tracking-wide">Spiegel</p>
      </div>
      <TypewriterText key={beat.body} text={beat.body ?? ''} className="mt-8 text-left text-h4 leading-relaxed" />
    </div>
  )
}
