import { MessageCircleHeart } from 'lucide-react'
import type { Beat } from '../../types/lesson'

interface TerugkoppelingProps {
  beat: Beat
  reply: string | null
  onReply: (reply: string) => void
}

const opties = ['Ja', 'Een beetje', 'Nog niet']

export function Terugkoppeling({ beat, reply, onReply }: TerugkoppelingProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-label text-ink-muted">
        <MessageCircleHeart size={16} strokeWidth={2} />
        <span>Terugkoppeling</span>
      </div>
      <p className="text-h4 text-ink">{beat.body}</p>
      <div className="flex flex-wrap gap-2">
        {opties.map((optie) => (
          <button
            key={optie}
            type="button"
            onClick={() => onReply(optie)}
            className={`rounded-full border px-4 py-2 text-body transition ${
              reply === optie
                ? 'border-primary-500 bg-primary-500/10 text-primary-600'
                : 'border-surface-sunken bg-surface text-ink hover:border-ink-faint'
            }`}
          >
            {optie}
          </button>
        ))}
      </div>
      {reply && <p className="text-body text-ink-muted">Fijn dat je het deelt. Morgen weer een nieuw stukje.</p>}
    </div>
  )
}
