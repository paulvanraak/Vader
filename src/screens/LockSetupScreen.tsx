import { useEffect, useState } from 'react'
import { ScanFace, KeyRound } from 'lucide-react'
import { Button } from '../components/Button'
import {
  PIN_LENGTH,
  enableBiometricLock,
  enablePinLock,
  isBiometricAvailable,
  markAsked,
} from '../lib/appLock'
import { hapticSuccess, hapticTap } from '../lib/haptics'

/**
 * Wordt één keer getoond, na de eerste keer inloggen. Zegt de vader nee, dan
 * vragen we het nooit meer. Het slot is optioneel, niet verplicht.
 *
 * Let op de formulering: dit vergrendelt de app op dít toestel. Het is geen
 * beveiliging van het account op de server, dus beloven we dat ook niet.
 */
export function LockSetupScreen({ userId, label, onDone }: { userId: string; label: string; onDone: () => void }) {
  const [biometricPossible, setBiometricPossible] = useState(false)
  const [mode, setMode] = useState<'choice' | 'pin'>('choice')
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void isBiometricAvailable().then(setBiometricPossible)
  }, [])

  function skip() {
    markAsked()
    onDone()
  }

  async function enableBiometric() {
    hapticTap()
    const ok = await enableBiometricLock(userId, label)
    markAsked()
    if (ok) {
      hapticSuccess()
      onDone()
    } else {
      setError('Dat lukte niet. Je kunt in plaats daarvan een pincode instellen.')
      setMode('pin')
    }
  }

  async function savePin() {
    if (pin.length !== PIN_LENGTH) {
      setError(`Kies een pincode van ${PIN_LENGTH} cijfers.`)
      return
    }
    if (pin !== confirmPin) {
      setError('De twee codes zijn niet gelijk.')
      return
    }
    await enablePinLock(pin)
    markAsked()
    hapticSuccess()
    onDone()
  }

  if (mode === 'pin') {
    return (
      <div className="flex h-full flex-col justify-between bg-page px-7 py-10">
        <div className="flex flex-1 flex-col justify-center gap-5">
          <h1 className="font-serif text-[32px] font-semibold text-ink">Kies een pincode</h1>
          <p className="text-body text-ink-muted">Zes cijfers. Die blijven op dit toestel en gaan nergens heen.</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, PIN_LENGTH))}
            inputMode="numeric"
            placeholder="Pincode"
            aria-label="Pincode"
            className="w-full rounded-md border border-ink-faint bg-transparent px-4 py-3.5 text-center font-serif text-h2 tracking-[0.4em] text-ink outline-none focus-visible:border-ink"
          />
          <input
            type="password"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, PIN_LENGTH))}
            inputMode="numeric"
            placeholder="Nog een keer"
            aria-label="Pincode bevestigen"
            className="w-full rounded-md border border-ink-faint bg-transparent px-4 py-3.5 text-center font-serif text-h2 tracking-[0.4em] text-ink outline-none focus-visible:border-ink"
          />
          {error && <p className="text-caption font-semibold text-danger-500">{error}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <Button onClick={() => void savePin()}>Pincode instellen</Button>
          <button type="button" onClick={skip} className="text-body text-ink-muted underline underline-offset-2">
            Overslaan
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-between bg-page px-7 py-10">
      <div className="flex flex-1 flex-col justify-center gap-5">
        <h1 className="stack-in font-serif text-[32px] font-semibold text-ink">App vergrendelen?</h1>
        <p className="stack-in stack-delay-1 text-body-lg leading-relaxed text-ink-muted">
          Je kunt FatherFlow op dit toestel vergrendelen, zodat niet iedereen die je telefoon oppakt je gesprekken
          kan lezen. Je hoeft dit niet te doen.
        </p>
        {error && <p className="text-caption font-semibold text-danger-500">{error}</p>}
      </div>

      <div className="stack-in stack-delay-2 flex flex-col gap-3">
        {biometricPossible && (
          <Button onClick={() => void enableBiometric()}>
            <ScanFace size={18} strokeWidth={2} />
            Face ID gebruiken
          </Button>
        )}
        <Button variant="secondary" onClick={() => setMode('pin')}>
          <KeyRound size={18} strokeWidth={2} />
          Pincode instellen
        </Button>
        <button type="button" onClick={skip} className="text-body text-ink-muted underline underline-offset-2">
          Niet nu
        </button>
      </div>
    </div>
  )
}
