import { Sparkles } from 'lucide-react'

const dayWords = ['nul', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven']

function dayLabel(days: number): string {
  if (days <= 0) return 'Vandaag beginnen jullie.'
  const word = days < dayWords.length ? dayWords[days] : String(days)
  const noun = days === 1 ? 'dag' : 'dagen'
  return `${word.charAt(0).toUpperCase()}${word.slice(1)} ${noun} op rij even stilgestaan`
}

export function StreakNote({ days }: { days: number }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-primary-500/10 px-4 py-3 text-body text-primary-600">
      <Sparkles size={16} strokeWidth={2} />
      <span>{dayLabel(days)}</span>
    </div>
  )
}
