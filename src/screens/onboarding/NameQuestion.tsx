import { useState } from 'react'
import { UserRound } from 'lucide-react'
import { Button } from '../../components/Button'

export function NameQuestion({ onNext }: { onNext: (name: string) => void }) {
  const [name, setName] = useState('')

  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
          <UserRound size={28} strokeWidth={2} />
        </div>
        <div>
          <p className="text-label text-ink-muted">Even voorstellen</p>
          <h1 className="mt-2 text-h1 font-extrabold text-ink">Hoe mogen we je noemen?</h1>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && name.trim()) onNext(name.trim())
          }}
          placeholder="Jouw naam"
          aria-label="Jouw naam"
          className="w-full max-w-xs rounded-md bg-surface-sunken px-4 py-3 text-center text-body-lg text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary-500"
        />
      </div>
      <Button onClick={() => name.trim() && onNext(name.trim())} disabled={!name.trim()}>
        Verder
      </Button>
    </div>
  )
}
