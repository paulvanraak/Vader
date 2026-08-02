import { useState } from 'react'
import { UserRound } from 'lucide-react'
import { Button } from '../../components/Button'
import { signUp } from '../../lib/account'

export function SignupScreen({
  onNext,
  onSwitchToLogin,
}: {
  onNext: (name: string) => void
  onSwitchToLogin?: () => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  const passwordsMatch = password.length >= 6 && password === confirmPassword
  const canSubmit = name.trim().length > 0 && email.trim().length > 0 && passwordsMatch && !isSubmitting

  async function submit() {
    if (!canSubmit) return
    setError(null)
    setIsSubmitting(true)
    try {
      const { data, error: signUpError } = await signUp(name.trim(), email.trim(), password)
      if (signUpError) {
        setError(signUpError.message)
        return
      }
      if (data.session) {
        onNext(name.trim())
      } else {
        // Supabase-project vereist e-mailbevestiging: er is nog geen sessie.
        setNeedsConfirmation(true)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (needsConfirmation) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
          <UserRound size={28} strokeWidth={2} />
        </div>
        <h1 className="text-h2 font-extrabold text-ink">Check je e-mail</h1>
        <p className="text-body text-ink-muted">
          We hebben een bevestigingslink gestuurd naar {email.trim()}. Klik erop om je account te activeren en log
          daarna in.
        </p>
        {onSwitchToLogin && (
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-body-lg font-bold text-primary-600 underline underline-offset-2"
          >
            Naar inloggen
          </button>
        )}
      </div>
    )
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Jouw e-mailadres"
            aria-label="E-mailadres"
            autoCapitalize="none"
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
              if (e.key === 'Enter') void submit()
            }}
            placeholder="Herhaal wachtwoord"
            aria-label="Herhaal wachtwoord"
            className="w-full rounded-md bg-surface-sunken px-4 py-3 text-center text-body-lg text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary-500"
          />
          {password.length > 0 && !passwordsMatch && (
            <p className="text-caption font-semibold text-danger-500">
              {password.length < 6 ? 'Minimaal 6 tekens.' : 'Wachtwoorden komen niet overeen.'}
            </p>
          )}
          {error && <p className="text-caption font-semibold text-danger-500">{error}</p>}
          {onSwitchToLogin && (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="mt-1 text-caption font-semibold text-ink-muted underline underline-offset-2"
            >
              Heb je al een account? Log in
            </button>
          )}
        </div>
      </div>
      <Button onClick={() => void submit()} disabled={!canSubmit}>
        {isSubmitting ? 'Bezig...' : 'Account aanmaken'}
      </Button>
    </div>
  )
}
