import { useEffect, useState } from 'react'
import { ScanFace, Delete } from 'lucide-react'
import {
  PIN_LENGTH,
  getLockMode,
  verifyPin,
  unlockWithBiometric,
  isLockedOut,
  failedAttempts,
  disableLock,
} from '../lib/appLock'
import { hapticError, hapticSuccess, hapticTap } from '../lib/haptics'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'face', '0', 'delete']

/**
 * Ontgrendelt de sessie die al op dit toestel staat. Volgorde: biometrie als
 * die aanstaat, anders de pincode, en altijd een uitweg via de mailcode.
 */
export function AppLockScreen({ onUnlocked, onFallback }: { onUnlocked: () => void; onFallback: () => void }) {
  const mode = getLockMode()
  const [pin, setPin] = useState('')
  const [shake, setShake] = useState(false)
  const [lockedOut, setLockedOut] = useState(isLockedOut())
  const [biometricFailed, setBiometricFailed] = useState(false)

  // Biometrie meteen aanbieden bij openen, dat scheelt een tik.
  useEffect(() => {
    if (mode !== 'biometric' || lockedOut) return
    void (async () => {
      const ok = await unlockWithBiometric()
      if (ok) {
        hapticSuccess()
        onUnlocked()
      } else {
        setBiometricFailed(true)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function submit(next: string) {
    const ok = await verifyPin(next)
    if (ok) {
      hapticSuccess()
      onUnlocked()
      return
    }
    hapticError()
    setShake(true)
    setTimeout(() => {
      setShake(false)
      setPin('')
      if (isLockedOut()) setLockedOut(true)
    }, 400)
  }

  function pressDigit(digit: string) {
    if (pin.length >= PIN_LENGTH || lockedOut) return
    hapticTap()
    const next = pin + digit
    setPin(next)
    if (next.length === PIN_LENGTH) void submit(next)
  }

  function useMailCode() {
    // Terugvallen wist geen data; het slot gaat er alleen af zodat de vader
    // via de mailcode weer binnenkomt en het opnieuw kan instellen.
    disableLock()
    onFallback()
  }

  if (lockedOut) {
    return (
      <div className="flex h-full flex-col justify-center gap-5 bg-page px-7">
        <h1 className="font-serif text-h1 text-ink">Te vaak geprobeerd</h1>
        <p className="text-body-lg leading-relaxed text-ink-muted">
          Log opnieuw in met een code uit je mail. Je gegevens en voortgang blijven gewoon staan.
        </p>
        <button
          type="button"
          onClick={useMailCode}
          className="self-start rounded-full bg-ink px-6 py-3 text-label font-bold text-page"
        >
          Stuur me een code
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-center gap-8 bg-page px-7">
      <div>
        <h1 className="stack-in font-serif text-h1 text-ink">FatherFlow is vergrendeld</h1>
        {mode === 'biometric' && biometricFailed && (
          <p className="mt-2 text-body text-ink-muted">Gebruik je pincode of probeer het opnieuw.</p>
        )}
      </div>

      {mode === 'biometric' ? (
        <button
          type="button"
          onClick={() => {
            void (async () => {
              const ok = await unlockWithBiometric()
              if (ok) {
                hapticSuccess()
                onUnlocked()
              } else {
                setBiometricFailed(true)
              }
            })()
          }}
          className="flex items-center gap-3 self-start rounded-full bg-ink px-6 py-3 text-label font-bold text-page"
        >
          <ScanFace size={20} strokeWidth={2} />
          Ontgrendelen
        </button>
      ) : (
        <>
          <div className={`flex justify-center gap-4 ${shake ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
            {Array.from({ length: PIN_LENGTH }).map((_, i) => (
              <span
                key={i}
                className={`size-[18px] rounded-full border-2 border-ink transition ${
                  i < pin.length ? 'bg-ink' : 'bg-transparent'
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5">
            {KEYS.map((key) => {
              if (key === 'face') return <span key={key} />
              if (key === 'delete') {
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      hapticTap()
                      setPin((p) => p.slice(0, -1))
                    }}
                    aria-label="Verwijder cijfer"
                    className="flex size-20 items-center justify-center text-ink"
                  >
                    <Delete size={22} strokeWidth={1.75} />
                  </button>
                )
              }
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => pressDigit(key)}
                  className="flex size-20 items-center justify-center rounded-full bg-surface-sunken font-serif text-h2 text-ink transition active:bg-ink/10"
                >
                  {key}
                </button>
              )
            })}
          </div>
          {failedAttempts() > 0 && (
            <p className="text-caption text-ink-muted">
              Nog {5 - failedAttempts()} pogingen voor je een code per mail nodig hebt.
            </p>
          )}
        </>
      )}

      <button
        type="button"
        onClick={useMailCode}
        className="self-start text-body text-ink-muted underline underline-offset-2"
      >
        Ik weet het niet meer
      </button>
    </div>
  )
}
