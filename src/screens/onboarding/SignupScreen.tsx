import { useState } from 'react'
import { Button } from '../../components/Button'
import { signUp } from '../../lib/account'

const inputClass =
  'w-full rounded-md border border-ink-faint bg-transparent px-4 py-3.5 text-body-lg text-ink outline-none placeholder:text-ink-faint focus-visible:border-ink'

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
      <div className="flex h-full flex-col justify-center gap-4 bg-page px-7 text-left">
        <h1 className="font-serif text-h1 text-ink">Check je e-mail</h1>
        <p className="text-body-lg leading-relaxed text-ink-muted">
          We hebben een bevestigingslink gestuurd naar {confirmationEmail}. Klik erop om je account te activeren en
          log daarna in.
        </p>
        {onSwitchToLogin && (
          <button type="button" onClick={onSwitchToLogin} className="text-body-lg font-bold text-primary-600 underline underline-offset-2">
            Naar inloggen
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-between bg-page px-7 py-10">
      <div className="flex flex-1 flex-col justify-center gap-6">
        <div>
          <p className="text-[18px] text-ink-muted">Even voorstellen</p>
          <h1 className="mt-2 font-serif text-[32px] font-semibold text-ink">Wat is je naam?</h1>
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
      <Button onClick={() => void submit()} disabled={!canSubmit}>
        {isSubmitting ? 'Bezig...' : 'Account aanmaken'}
      </Button>
    </div>
  )
}
