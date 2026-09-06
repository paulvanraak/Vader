import { useLayoutEffect, useRef, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { hapticTap } from '../lib/haptics'

/**
 * De stapel: blokken komen één voor één van onder in beeld en blijven staan.
 * Wat er al stond schuift rustig mee omhoog in plaats van te verspringen.
 *
 * Stond eerst alleen in de themaspeler. Nu de onboarding dezelfde beweging
 * gebruikt staat hij hier, want twee kopieën van dezelfde animatie lopen
 * gegarandeerd uit elkaar zodra er één wordt bijgesteld.
 */
export function BlokkenStapel({ blokken, onKlaar, knop }: {
  blokken: React.ReactNode[]
  /** Wordt aangeroepen als het laatste blok er staat en je verder wil. */
  onKlaar: () => void
  /** Wat er onderaan staat als alles zichtbaar is. Geen knop: dan swipe je door. */
  knop?: (verder: () => void) => React.ReactNode
}) {
  const [zichtbaar, setZichtbaar] = useState(1)
  const alles = zichtbaar >= blokken.length
  const verder = () => {
    hapticTap()
    if (alles) onKlaar()
    else setZichtbaar((n) => Math.min(n + 1, blokken.length))
  }
  const swipe = useSwipeOmhoog(() => { if (!alles || !knop) verder() })

  // De stapel staat gecentreerd, dus bij een nieuw blok springt alles de halve
  // hoogte omhoog; die sprong draaien we terug en animeren we uit.
  const stapel = useRef<HTMLDivElement>(null)
  const vorigeHoogte = useRef(0)
  useLayoutEffect(() => {
    const el = stapel.current
    if (!el) return
    const nu = el.offsetHeight
    const delta = nu - vorigeHoogte.current
    vorigeHoogte.current = nu
    if (delta > 0 && zichtbaar > 1) {
      el.animate(
        [{ transform: `translateY(${delta / 2}px)` }, { transform: 'none' }],
        { duration: 820, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      )
    }
  }, [zichtbaar])

  return (
    <>
      <div className="flex flex-1 flex-col justify-center overflow-y-auto px-5 py-4" {...swipe}>
        <div ref={stapel} className="flex flex-col gap-4">
          {blokken.slice(0, zichtbaar).map((b, n) => (
            <div key={n} className={n === zichtbaar - 1 ? 'blok-in' : undefined}>{b}</div>
          ))}
        </div>
      </div>
      {alles && knop ? knop(verder) : <SwipeHint onClick={verder} />}
    </>
  )
}

/** Swipe omhoog of een tik: allebei betekenen "volgende". */
export function useSwipeOmhoog(onVolgende: () => void) {
  const start = useRef<number | null>(null)
  return {
    onTouchStart: (e: React.TouchEvent) => { start.current = e.touches[0].clientY },
    onTouchEnd: (e: React.TouchEvent) => {
      if (start.current === null) return
      const delta = start.current - e.changedTouches[0].clientY
      start.current = null
      if (delta > 45) onVolgende()
    },
  }
}

/** Het lichte pijltje op de plek van de knop. Ook aan te tikken. */
export function SwipeHint({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-center pb-8 pt-2">
      <button
        type="button"
        onClick={onClick}
        aria-label="Volgende"
        className="pijl-adem flex size-11 items-center justify-center rounded-full text-ink"
      >
        <ChevronUp size={26} strokeWidth={2} />
      </button>
    </div>
  )
}
