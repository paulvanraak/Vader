// Vibration API — feature-detected, silently no-ops where unsupported
// (notably iOS Safari/PWA, which never implemented it).
function vibrate(pattern: number | number[]): void {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return
  try {
    navigator.vibrate(pattern)
  } catch {
    // Ignore: some browsers throw when vibration is blocked (e.g. no user gesture).
  }
}

/** Lichte tik — knoppen, tabs, losse selecties. */
export function hapticTap(): void {
  vibrate(10)
}

/** Iets steviger — een waarde die "vastklikt", zoals een wheel-picker die settelt. */
export function hapticTick(): void {
  vibrate(6)
}

/** Bevestiging — geslaagde actie (bv. PIN correct). */
export function hapticSuccess(): void {
  vibrate([15, 40, 15])
}

/** Foutmelding — mislukte actie (bv. PIN onjuist). */
export function hapticError(): void {
  vibrate([30, 60, 30, 60, 30])
}
