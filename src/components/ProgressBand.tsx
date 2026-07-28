import { HeartHandshake } from 'lucide-react'

interface ProgressBandProps {
  completed: number
  total: number
}

const stages = ['Begin', 'Groeiend', 'Hecht', 'Sterk']

export function ProgressBand({ completed, total }: ProgressBandProps) {
  const ratio = total > 0 ? Math.min(completed / total, 1) : 0
  const stageIndex = Math.min(Math.floor(ratio * (stages.length - 1)), stages.length - 1)

  return (
    <div
      role="img"
      aria-label={`Jullie band: fase ${stages[stageIndex]}, ${completed} van ${total} lessen samen doorlopen`}
      className="rounded-2xl bg-neutral-white p-5 shadow-sm ring-1 ring-neutral-100"
    >
      <div className="flex items-center gap-2">
        <HeartHandshake size={18} className="text-accent-orange" strokeWidth={2} />
        <span className="text-label text-neutral-900">Jullie band</span>
        <span className="ml-auto text-caption text-neutral-300">{stages[stageIndex]}</span>
      </div>
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-orange transition-all duration-700"
          style={{ width: `${Math.max(ratio * 100, 6)}%` }}
        />
      </div>
    </div>
  )
}
