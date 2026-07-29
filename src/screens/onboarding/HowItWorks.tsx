import { Clock, MirrorRectangular, CalendarCheck } from 'lucide-react'
import { Button } from '../../components/Button'

const stappen = [
  {
    icon: Clock,
    title: 'Elke dag drie minuten',
    body: 'Eén klein stukje per dag, geen lange cursus.',
  },
  {
    icon: MirrorRectangular,
    title: 'Een spiegelmoment',
    body: 'Elke les laat je even stilstaan bij je eigen gedrag.',
  },
  {
    icon: CalendarCheck,
    title: 'Eén ding voor vanavond',
    body: 'Concreet en klein, iets dat je meteen kunt doen.',
  },
]

export function HowItWorks({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col gap-6">
        <div>
          <p className="text-label text-ink-muted">Zo werkt het</p>
          <h1 className="mt-2 text-h1 text-ink">Drie minuten, drie stappen</h1>
        </div>
        <div className="flex flex-col gap-4">
          {stappen.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600">
                <Icon size={20} strokeWidth={2} />
              </div>
              <div>
                <p className="text-label text-ink">{title}</p>
                <p className="text-body text-ink-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={onStart}>Laten we beginnen</Button>
    </div>
  )
}
