import { useState } from 'react'
import { OnboardingButton } from './OnboardingButton'
import { signUp } from '../../lib/account'

const inputClass =
  'w-full rounded-[8px] border border-[#b1e9ff]/40 bg-transparent px-4 py-3.5 text-body-lg text-white outline-none placeholder:text-[#b1e9ff]/40 focus-visible:border-[#b1e9ff]'

// TIJDELIJK, alleen om het testen te versnellen: geen handmatig e-mailadres/
// wachtwoord meer nodig om de app in te komen. We genereren die zelf achter
// de schermen (e-mailbevestiging staat sowieso al uit in Supabase, dus dit
// levert meteen een echte sessie op). De echte signUp()-aanroep en de
// velden hieronder blijven intact voor later, alleen niet meer verplicht
// zichtbaar. Verwijder deze auto-generatie zodra we weer echte e-mail/
// wachtwoord-login willen vragen.
function generateTestCredentials(): { email: string; password: string } {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  return {
    email: `vader-${id}@fatherflow-test.local`,
    password: `${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`,
  }
}

export function SignupScreen({
  onNext,
  onSwitchToLogin,
}: {
  onNext: (name: string) => void
  onSwitchToLogin?: () => void
}) {
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [confirmationEmail, setConfirmationEmail] = useState('')

  const canSubmit = name.trim().length > 0 && !isSubmitting

  async function submit() {
    if (!canSubmit) return
    setError(null)
    setIsSubmitting(true)
    try {
      const { email, password } = generateTestCredentials()
      const { data, error: signUpError } = await signUp(name.trim(), email, password)
      if (signUpError) {
        setError(signUpError.message)
        return
      }
      if (data.session) {
        onNext(name.trim())
      } else {
        // Supabase-project vereist e-mailbevestiging: er is nog geen sessie.
        setConfirmationEmail(email)
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
          We hebben een bevestigingslink gestuurd naar {confirmationEmail}. Klik erop om je account te activeren en
          log daarna in.
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
          {error && <p className="text-caption font-semibold text-danger-500">{error}</p>}
        </div>
      </div>
      <OnboardingButton onClick={() => void submit()} disabled={!canSubmit}>
        {isSubmitting ? 'Bezig...' : 'Account aanmaken'}
      </OnboardingButton>
    </div>
  )
}
