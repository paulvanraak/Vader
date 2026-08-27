import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Button } from '../../components/Button'
import { sendLoginCode, verifyLoginCode, describeAuthError } from '../../lib/account'

// Lazy achter de vlag, zodat de knop en alles wat eraan hangt in een
// productiebuild geen importeur meer heeft en uit de bundel valt.
const DevSkipLogin = __DEV_TOOLS__
  ? lazy(() => import('../../components/DevSkipLogin'))
  : null

const CODE_LENGTH = 6
const RESEND_COOLDOWN_SECONDS = 60

const inputClass =
  'w-full rounded-md border border-ink-faint bg-transparent px-4 py-3.5 text-body-lg text-ink outline-none placeholder:text-ink-faint focus-visible:border-ink'

/**
 * Aanmelden en inloggen zijn hetzelfde: je vult je mailadres in en krijgt een
 * code. Er is geen wachtwoord, dus ook geen "wachtwoord vergeten" en geen
 * verschil tussen een nieuwe en een terugkerende vader.
 */
export function EmailAuthScreen({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [isBusy, setIsBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [cooldown, setCooldown] = useState(0)
  const codeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  useEffect(() => {
    if (step === 'code') codeRef.current?.focus()
  }, [step])

  const emailValid = /\S+@\S+\.\S+/.test(email.trim())

  async function requestCode(isResend = false) {
    if (!emailValid || isBusy) return
    setIsBusy(true)
    setError(null)
    setNotice(null)
    try {
      const { error: err } = await sendLoginCode(email.trim(), name.trim() || undefined)
      if (err) {
        setError(describeAuthError(err.message))
        return
      }
      setStep('code')
      setCooldown(RESEND_COOLDOWN_SECONDS)
      if (isResend) setNotice('Nieuwe code verstuurd.')
    } finally {
      setIsBusy(false)
    }
  }

  async function submitCode(value: string) {
    if (value.length !== CODE_LENGTH || isBusy) return
    setIsBusy(true)
    setError(null)
    try {
      const { error: err } = await verifyLoginCode(email.trim(), value)
      if (err) {
        setError(describeAuthError(err.message))
        setCode('')
        return
      }
      onNext()
    } finally {
      setIsBusy(false)
    }
  }

  function handleCodeChange(raw: string) {
    // Plakken van de hele code moet werken, ook met spaties of streepjes ertussen.
    const digits = raw.replace(/\D/g, '').slice(0, CODE_LENGTH)
    setCode(digits)
    setError(null)
    if (digits.length === CODE_LENGTH) void submitCode(digits)
  }

  if (step === 'code') {
    return (
      <div className="relative flex h-full flex-col justify-between bg-page px-7 py-10">
      {DevSkipLogin && (
        <Suspense fallback={null}>
          <DevSkipLogin onDone={onNext} />
        </Suspense>
      )}
        <div className="flex flex-1 flex-col justify-center gap-6">
          <div className="stack-in">
            <p className="text-[18px] text-ink-muted">Check je mail</p>
            <h1 className="mt-2 font-serif text-[32px] font-semibold text-ink">Vul je code in</h1>
            <p className="mt-2 text-body text-ink-muted">
              We hebben een code van zes cijfers gestuurd naar {email.trim()}.
            </p>
          </div>

          <div className="stack-in stack-delay-1 flex flex-col gap-3">
            <input
              ref={codeRef}
              type="text"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={CODE_LENGTH}
              placeholder="000000"
              aria-label="Code uit de mail"
              className={`${inputClass} text-center font-serif text-h1 tracking-[0.4em]`}
            />
            {error && <p className="text-caption font-semibold text-danger-500">{error}</p>}
            {notice && !error && <p className="text-caption font-semibold text-success-600">{notice}</p>}

            <button
              type="button"
              onClick={() => void requestCode(true)}
              disabled={cooldown > 0 || isBusy}
              className="self-start text-body font-bold text-primary-600 underline underline-offset-2 disabled:text-ink-faint disabled:no-underline"
            >
              {cooldown > 0 ? `Nieuwe code over ${cooldown}s` : 'Stuur een nieuwe code'}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('email')
                setCode('')
                setError(null)
              }}
              className="self-start text-body text-ink-muted underline underline-offset-2"
            >
              Ander mailadres gebruiken
            </button>
          </div>
        </div>

        <div className="stack-in stack-delay-2">
          <Button onClick={() => void submitCode(code)} disabled={code.length !== CODE_LENGTH || isBusy}>
            {isBusy ? 'Bezig...' : 'Inloggen'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-full flex-col justify-between bg-page px-7 py-10">
      {DevSkipLogin && (
        <Suspense fallback={null}>
          <DevSkipLogin onDone={onNext} />
        </Suspense>
      )}
      <div className="flex flex-1 flex-col justify-center gap-6">
        <div className="stack-in">
          <p className="text-[18px] text-ink-muted">Welkom bij FatherFlow</p>
          <h1 className="mt-2 font-serif text-[32px] font-semibold text-ink">Wat is je mailadres?</h1>
          <p className="mt-2 text-body text-ink-muted">
            Je krijgt een code per mail. Geen wachtwoord om te onthouden.
          </p>
        </div>

        <div className="stack-in stack-delay-1 flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && void requestCode()}
            placeholder="jouw@mail.nl"
            aria-label="Je mailadres"
            inputMode="email"
            autoComplete="email"
            className={inputClass}
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Je naam (optioneel)"
            aria-label="Je naam"
            autoComplete="given-name"
            className={inputClass}
          />
          {error && <p className="text-caption font-semibold text-danger-500">{error}</p>}
        </div>
      </div>

      <div className="stack-in stack-delay-2">
        <Button onClick={() => void requestCode()} disabled={!emailValid || isBusy}>
          {isBusy ? 'Bezig...' : 'Stuur me een code'}
        </Button>
      </div>
    </div>
  )
}
