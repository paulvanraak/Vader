import { Lightbulb } from 'lucide-react'
import type { Beat } from '../../types/lesson'
import { TypewriterText } from '../TypewriterText'

export function Inzicht({ beat }: { beat: Beat }) {
  return (
    <div className="rounded-2xl bg-neutral-900 p-6 text-neutral-white shadow-lg">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-neutral-white/10 text-primary-500">
          <Lightbulb size={26} strokeWidth={2} />
        </span>
        <p className="text-h3 font-extrabold uppercase tracking-wide">Inzicht</p>
      </div>
      <TypewriterText
        key={beat.body}
        text={beat.body ?? ''}
        className="mt-6 text-left text-body-lg leading-relaxed"
      />
    </div>
  )
}
