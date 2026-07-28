import { MirrorRectangular } from 'lucide-react'
import type { Beat } from '../../types/lesson'

/**
 * Het handtekeningmoment. Vaste, herkenbare stijl die in elke les terugkomt:
 * donkere kaart, mirror-icoon, altijd de titel "De spiegel".
 */
export function Spiegel({ beat }: { beat: Beat }) {
  return (
    <div className="rounded-2xl bg-neutral-900 p-6 text-neutral-white shadow-lg">
      <div className="flex items-center gap-2 text-label-sm uppercase tracking-wide text-accent-orange">
        <MirrorRectangular size={18} strokeWidth={2} />
        <span>De spiegel</span>
      </div>
      <p className="mt-4 text-h4 leading-snug">{beat.body}</p>
    </div>
  )
}
