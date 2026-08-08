import { useState } from 'react'
import { ScanFace, Delete } from 'lucide-react'
import { useAppState } from '../state/AppStateContext'

const PIN_LENGTH = 5
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'face', '0', 'delete']

export function PinScreen({ onSuccess }: { onSuccess: () => void }) {
  const { verifyPin } = useAppState()
  const [pin, setPin] = useState('')
  const [shake, setShake] = useState(false)

  function pressDigit(digit: string) {
    if (pin.length >= PIN_LENGTH) return
    const next = pin + digit
    setPin(next)
    if (next.length === PIN_LENGTH) {
      const ok = verifyPin(next)
      if (ok) {
        onSuccess()
      } else {
        setShake(true)
        setTimeout(() => {
          setShake(false)
          setPin('')
        }, 400)
      }
    }
  }

  function pressBackspace() {
    setPin((prev) => prev.slice(0, -1))
  }

  function pressFaceId() {
    verifyPin('12345')
    onSuccess()
  }

  return (
    <div className="onboarding-photo-bg flex h-full flex-col items-center justify-center gap-14 px-6 text-center text-black">
      <p className="text-h3 font-medium">Ontgrendel Father Flow</p>

      <div className={`flex gap-4 ${shake ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
        {Array.from({ length: PIN_LENGTH }).map((_, index) => (
          <span
            key={index}
            className={`size-[18px] rounded-full border-2 border-black transition ${
              index < pin.length ? 'bg-black' : 'bg-transparent'
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {KEYS.map((key) => {
          if (key === 'face') {
            return (
              <button
                key={key}
                type="button"
                onClick={pressFaceId}
                aria-label="Ontgrendel met FaceID"
                className="flex size-20 items-center justify-center text-black"
              >
                <ScanFace size={26} strokeWidth={1.75} />
              </button>
            )
          }
          if (key === 'delete') {
            return (
              <button
                key={key}
                type="button"
                onClick={pressBackspace}
                aria-label="Verwijder cijfer"
                className="flex size-20 items-center justify-center text-black"
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
              className="flex size-20 items-center justify-center rounded-full bg-white text-h2 font-semibold text-black shadow-sm transition active:bg-white/70"
            >
              {key}
            </button>
          )
        })}
      </div>
    </div>
  )
}
