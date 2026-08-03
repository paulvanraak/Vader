import { useState } from 'react'
import { OnboardingButton } from './OnboardingButton'
import { signUp } from '../../lib/account'

const inputClass =
  'w-full rounded-[8px] border border-[#b1e9ff]/40 bg-transparent px-4 py-3.5 text-body-lg text-white outline-none placeholder:text-[#b1e9ff]/40 focus-visible:border-[#b1e9ff]'

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
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-[#21283e] px-8 text-center">
        <h1 className="text-[28px] font-semibold text-white">Check je e-mail</h1>
        <p className="text-[18px] font-light leading-relaxed text-white/80">
          We hebben een bevestigingslink gestuurd naar {email.trim()}. Klik erop om je account te activeren en log
          daarna in.
        </p>
        {onSwitchToLogin && (
          <button type="button" onClick={onSwitchToLogin} className="text-body-lg font-bold text-[#b1e9ff] underline underline-offset-2">
            Naar inloggen
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-between bg-[#21283e] px-7 py-10">
      <div className="flex flex-1 flex-col justify-center gap-6">
        <div>
          <p className="text-[18px] text-[#b1e9ff]">Even voorstellen</p>
          <h1 className="mt-2 text-[28px] font-semibold text-white">Wat is je naam?</h1>
        </div>
        <div className="flex w-full flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jouw naam"
            aria-label="Jouw naam"
            className={inputClass}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Jouw e-mailadres"
            aria-label="E-mailadres"
            autoCapitalize="none"
            className={inputClass}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Kies een wachtwoord"
            aria-label="Wachtwoord"
            className={inputClass}
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
            className={inputClass}
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
              className="mt-1 text-caption font-semibold text-[#b1e9ff]/70 underline underline-offset-2"
            >
              Heb je al een account? Log in
            </button>
          )}
        </div>
      </div>
      <OnboardingButton onClick={() => void submit()} disabled={!canSubmit}>
        {isSubmitting ? 'Bezig...' : 'Account aanmaken'}
      </OnboardingButton>
    </div>
  )
}
