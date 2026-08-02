import { useState } from 'react'
import { Lock } from 'lucide-react'
import { Button } from '../../components/Button'

export function LoginScreen({ onNext }: { onNext: (name: string) => void }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const canSubmit = name.trim().length > 0 && password.length > 0

  function submit() {
    if (canSubmit) onNext(name.trim())
  }

  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
          <Lock size={28} strokeWidth={2} />
        </div>
        <div>
          <p className="text-label text-ink-muted">Welkom terug</p>
          <h1 className="mt-2 text-h1 font-extrabold text-ink">Log in bij FatherFlow</h1>
        </div>
        <div className="flex w-full max-w-xs flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jouw naam"
            aria-label="Jouw naam"
            className="w-full rounded-md bg-surface-sunken px-4 py-3 text-center text-body-lg text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit()
            }}
            placeholder="Wachtwoord"
            aria-label="Wachtwoord"
            className="w-full rounded-md bg-surface-sunken px-4 py-3 text-center text-body-lg text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>
      </div>
      <Button onClick={submit} disabled={!canSubmit}>
        Inloggen
      </Button>
    </div>
  )
}
