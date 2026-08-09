import { Clock, MirrorRectangular, CalendarCheck } from 'lucide-react'
import { Button } from '../../components/Button'

const stappen = [
  {
    icon: Clock,
    title: 'Een dagelijks moment',
    body: 'Compact en gericht, geen cursus die tijd vraagt die er niet is.',
  },
  {
    icon: MirrorRectangular,
    title: 'Een spiegelmoment',
    body: 'Elke les koppelt het gedrag van je kind aan je eigen aandeel daarin.',
  },
  {
    icon: CalendarCheck,
    title: 'Eén concrete actie',
    body: 'Direct toepasbaar, zonder verdere voorbereiding.',
  },
]

export function HowItWorks({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col gap-6">
        <div className="stack-in">
          <p className="text-label text-ink-muted">Zo werkt het</p>
          <h1 className="mt-2 font-serif text-h1 font-semibold text-ink">FatherFlow</h1>
        </div>
        <div className="flex flex-col gap-4">
          {stappen.map(({ icon: Icon, title, body }, index) => (
            <div key={title} className={`stack-in stack-delay-${index + 1} flex items-start gap-3`}>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-500/10 text-primary-600">
                <Icon size={20} strokeWidth={2} />
              </div>
              <div>
                <p className="text-label font-bold text-ink">{title}</p>
                <p className="text-body font-semibold text-ink-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="stack-in stack-delay-4">
        <Button onClick={onStart}>Laten we beginnen</Button>
      </div>
    </div>
  )
}
