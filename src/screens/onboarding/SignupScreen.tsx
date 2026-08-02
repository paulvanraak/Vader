import { useState } from 'react'
import { UserRound } from 'lucide-react'
import { Button } from '../../components/Button'

export function SignupScreen({ onNext }: { onNext: (name: string) => void }) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const passwordsMatch = password.length >= 4 && password === confirmPassword
  const canSubmit = name.trim().length > 0 && passwordsMatch

  function submit() {
    if (canSubmit) onNext(name.trim())
  }

  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
          <UserRound size={28} strokeWidth={2} />
        </div>
        <div>
          <p className="text-label text-ink-muted">Nieuw account</p>
          <h1 className="mt-2 text-h1 font-extrabold text-ink">Maak je account aan</h1>
          <p className="mt-2 text-body text-ink-muted">Zo vind je jouw voortgang de volgende keer terug.</p>
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
            placeholder="Kies een wachtwoord"
            aria-label="Wachtwoord"
            className="w-full rounded-md bg-surface-sunken px-4 py-3 text-center text-body-lg text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary-500"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit()
            }}
            placeholder="Herhaal wachtwoord"
            aria-label="Herhaal wachtwoord"
            className="w-full rounded-md bg-surface-sunken px-4 py-3 text-center text-body-lg text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary-500"
          />
          {password.length > 0 && !passwordsMatch && (
            <p className="text-caption font-semibold text-danger-500">
              {password.length < 4 ? 'Minimaal 4 tekens.' : 'Wachtwoorden komen niet overeen.'}
            </p>
          )}
        </div>
      </div>
      <Button onClick={submit} disabled={!canSubmit}>
        Account aanmaken
      </Button>
    </div>
  )
}
