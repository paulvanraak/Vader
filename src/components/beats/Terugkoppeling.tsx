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
      <div className="flex items-center gap-2 text-label text-neutral-300">
        <MessageCircleHeart size={16} strokeWidth={2} />
        <span>Terugkoppeling</span>
      </div>
      <p className="text-h4 text-neutral-900">{beat.body}</p>
      <div className="flex flex-wrap gap-2">
        {opties.map((optie) => (
          <button
            key={optie}
            type="button"
            onClick={() => onReply(optie)}
            className={`rounded-full border px-4 py-2 text-body transition ${
              reply === optie
                ? 'border-primary-500 bg-primary-500/10 text-primary-600'
                : 'border-neutral-100 bg-neutral-white text-neutral-900 hover:border-neutral-300'
            }`}
          >
            {optie}
          </button>
        ))}
      </div>
      {reply && <p className="text-body text-neutral-300">Fijn dat je het deelt. Morgen weer een nieuw stukje.</p>}
    </div>
  )
}
