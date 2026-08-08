import { useState } from 'react'
import { Button } from '../../components/Button'
import { signIn } from '../../lib/account'

export function LoginScreen({
  onNext,
  onSwitchToSignup,
}: {
  onNext: () => void
  onSwitchToSignup?: () => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canSubmit = email.trim().length > 0 && password.length > 0 && !isSubmitting

  async function submit() {
    if (!canSubmit) return
    setError(null)
    setIsSubmitting(true)
    try {
      const { error: signInError } = await signIn(email.trim(), password)
      if (signInError) {
        setError(signInError.message)
        return
      }
      onNext()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-full flex-col justify-between bg-page px-7 py-10">
      <div className="flex flex-1 flex-col justify-center gap-6">
        <div>
          <p className="text-label text-ink-muted">Welkom terug</p>
          <h1 className="mt-2 font-serif text-h1 font-semibold text-ink">Log in bij FatherFlow</h1>
        </div>
        <div className="flex w-full flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Jouw e-mailadres"
            aria-label="E-mailadres"
            autoCapitalize="none"
            className="w-full rounded-md border border-ink-faint bg-transparent px-4 py-3.5 text-body-lg text-ink outline-none placeholder:text-ink-faint focus-visible:border-ink"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void submit()
            }}
            placeholder="Wachtwoord"
            aria-label="Wachtwoord"
            className="w-full rounded-md border border-ink-faint bg-transparent px-4 py-3.5 text-body-lg text-ink outline-none placeholder:text-ink-faint focus-visible:border-ink"
          />
          {error && <p className="text-caption font-semibold text-danger-500">{error}</p>}
          {onSwitchToSignup && (
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="mt-1 text-caption font-semibold text-ink-muted underline underline-offset-2"
            >
              Nog geen account? Registreer
            </button>
          )}
        </div>
      </div>
      <Button onClick={() => void submit()} disabled={!canSubmit}>
        {isSubmitting ? 'Bezig...' : 'Inloggen'}
      </Button>
    </div>
  )
}
