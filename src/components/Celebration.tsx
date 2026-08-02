import { useEffect } from 'react'
import { PartyPopper } from 'lucide-react'

const confettiDots = [
  { color: 'bg-primary-500', left: '20%', delay: '0s' },
  { color: 'bg-success-500', left: '35%', delay: '0.1s' },
  { color: 'bg-warning-500', left: '50%', delay: '0.05s' },
  { color: 'bg-accent-orange', left: '65%', delay: '0.15s' },
  { color: 'bg-primary-500', left: '80%', delay: '0.08s' },
]

interface CelebrationProps {
  lessonTitle: string
  onDone: () => void
}

export function Celebration({ lessonTitle, onDone }: CelebrationProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1800)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        {confettiDots.map((dot, i) => (
          <span
            key={i}
            className={`celebration-confetti absolute top-0 size-2.5 rounded-full ${dot.color}`}
            style={{ left: dot.left, animationDelay: dot.delay }}
          />
        ))}
      </div>

      <div className="celebration-badge flex size-16 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
        <PartyPopper size={32} strokeWidth={2} />
      </div>
      <h1 className="text-h2 text-ink">Mooi gedaan</h1>
      <p className="text-body-lg text-ink-muted">{lessonTitle}, klaar voor vandaag.</p>
    </div>
  )
}
