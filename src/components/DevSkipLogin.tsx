import { useState } from 'react'
import { skipLogin, hasTestUserCredentials } from '../lib/skipLogin'

/**
 * Knop rechtsboven op het inlogscherm om het inloggen over te slaan.
 *
 * Staat alleen in de bundel als __DEV_TOOLS__ waar is; de aanroeper zet de
 * vlag ervoor, zodat de bundelaar deze module in een productiebuild weggooit.
 *
 * Belangrijk: dit slaat het ínloggen over, niet het account. Er komt een echte
 * sessie uit, dus RLS blijft gewoon gelden. Zie src/lib/devTools.ts.
 *
 * De rest van de onboarding blijft staan: na het overslaan volgt gewoon het
 * app-slot en daarna de kindstap.
 */
export function DevSkipLogin({ onDone }: { onDone: () => void }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSkip() {
    if (busy) return
    setBusy(true)
    setError(null)
    const res = await skipLogin()
    setBusy(false)
    if (res.ok) {
      onDone()
      return
    }
    setError(res.error ?? 'Overslaan lukte niet.')
  }

  return (
    <div className="absolute right-4 top-4 z-50 flex max-w-[70%] flex-col items-end gap-1">
      <button
        type="button"
        onClick={() => void handleSkip()}
        disabled={busy}
        title={
          hasTestUserCredentials()
            ? 'Inloggen als de vaste testgebruiker'
            : 'Anoniem inloggen; echte sessie, dus RLS blijft gelden'
        }
        style={{
          background: '#a21caf',
          color: '#fff',
          borderRadius: 999,
          border: 0,
          padding: '8px 14px',
          font: 'bold 12px/1 system-ui, sans-serif',
          opacity: busy ? 0.5 : 1,
        }}
      >
        {busy ? 'Bezig...' : 'Sla login over'}
      </button>
      {error && (
        <p
          style={{
            background: '#fff',
            color: '#b91c1c',
            borderRadius: 8,
            padding: '8px 10px',
            font: '11px/1.35 system-ui, sans-serif',
            textAlign: 'right',
            boxShadow: '0 2px 8px rgba(0,0,0,.2)',
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default DevSkipLogin
