/**
 * Laag 3 van het inlogmodel: een slot op de sessie die al op dít toestel staat.
 *
 * TWEE DINGEN OM NIET TE VERGETEN
 *
 * 1. Een WebAuthn-credential is gekoppeld aan het domein. Verhuizen we later
 *    van vader-three.vercel.app naar een eigen domein, dan vervallen álle
 *    biometrische ontgrendelingen en moet iedereen opnieuw inloggen met de
 *    mailcode. Verhuis dus vóór de test met honderd vaders, niet erna.
 *
 * 2. Dit slot beschermt de sessie op het toestel, niet het account op de
 *    server. Beloof in de tekst naar de vader dus niets over beveiliging dat we
 *    niet waarmaken. Formulering: "vergrendel de app op dit toestel."
 *
 * De pincode verlaat het apparaat nooit en wordt nergens opgeslagen, ook niet
 * gehasht in de database: we bewaren alleen een salt en een PBKDF2-digest in
 * localStorage van dit toestel.
 */

const PBKDF2_ITERATIONS = 200_000
const MAX_ATTEMPTS = 5
export const PIN_LENGTH = 6

const KEYS = {
  mode: 'ff_lock_mode',
  salt: 'ff_lock_salt',
  digest: 'ff_lock_digest',
  credentialId: 'ff_lock_credential_id',
  attempts: 'ff_lock_attempts',
  asked: 'ff_lock_asked',
} as const

export type LockMode = 'none' | 'pin' | 'biometric'

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Privé-modus of volle opslag: het slot gaat dan simpelweg niet aan.
  }
}

function remove(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* niets te doen */
  }
}

function toBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
}

function fromBase64(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (c) => c.charCodeAt(0))
}

export function getLockMode(): LockMode {
  const mode = read(KEYS.mode)
  return mode === 'pin' || mode === 'biometric' ? mode : 'none'
}

export function isLockEnabled(): boolean {
  return getLockMode() !== 'none'
}

/** Eén keer vragen of hij het slot wil. Zegt hij nee, dan vragen we het nooit meer. */
export function hasBeenAsked(): boolean {
  return read(KEYS.asked) === 'true'
}

export function markAsked(): void {
  write(KEYS.asked, 'true')
}

export function disableLock(): void {
  ;[KEYS.mode, KEYS.salt, KEYS.digest, KEYS.credentialId, KEYS.attempts].forEach(remove)
}

// --- Pincode ---------------------------------------------------------------

async function derive(pin: string, salt: Uint8Array): Promise<string> {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(pin), 'PBKDF2', false, [
    'deriveBits',
  ])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: salt as BufferSource, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    material,
    256,
  )
  return toBase64(new Uint8Array(bits))
}

export async function enablePinLock(pin: string): Promise<void> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const digest = await derive(pin, salt)
  write(KEYS.salt, toBase64(salt))
  write(KEYS.digest, digest)
  write(KEYS.mode, 'pin')
  write(KEYS.attempts, '0')
}

export async function verifyPin(pin: string): Promise<boolean> {
  const saltRaw = read(KEYS.salt)
  const expected = read(KEYS.digest)
  if (!saltRaw || !expected) return false
  const actual = await derive(pin, fromBase64(saltRaw))
  const ok = actual === expected
  write(KEYS.attempts, ok ? '0' : String(failedAttempts() + 1))
  return ok
}

export function failedAttempts(): number {
  return Number(read(KEYS.attempts) ?? '0') || 0
}

/** Na vijf misslagen valt het slot terug op de mailcode. Er wordt niets gewist. */
export function isLockedOut(): boolean {
  return failedAttempts() >= MAX_ATTEMPTS
}

export function resetAttempts(): void {
  write(KEYS.attempts, '0')
}

// --- Face ID / Touch ID ----------------------------------------------------

/**
 * Verplichte feature detection: op toestellen zonder platform authenticator
 * bieden we biometrie helemaal niet aan, zonder foutmelding.
 */
export async function isBiometricAvailable(): Promise<boolean> {
  if (typeof window === 'undefined' || !window.PublicKeyCredential) return false
  try {
    return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  } catch {
    return false
  }
}

export async function enableBiometricLock(userId: string, label: string): Promise<boolean> {
  if (!(await isBiometricAvailable())) return false
  try {
    const credential = (await navigator.credentials.create({
      publicKey: {
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        rp: { name: 'FatherFlow' },
        user: {
          id: new TextEncoder().encode(userId),
          name: label,
          displayName: label,
        },
        pubKeyCredParams: [
          { type: 'public-key', alg: -7 }, // ES256
          { type: 'public-key', alg: -257 }, // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
          residentKey: 'preferred',
        },
        timeout: 60_000,
      },
    })) as PublicKeyCredential | null
    if (!credential) return false
    write(KEYS.credentialId, toBase64(new Uint8Array(credential.rawId)))
    write(KEYS.mode, 'biometric')
    write(KEYS.attempts, '0')
    return true
  } catch {
    return false
  }
}

/**
 * Ontgrendelen met biometrie. De assertie wordt bewust niet server-side
 * geverifieerd: dit is een slot op een lokale sessie, geen inlog. Zie de
 * waarschuwing bovenaan dit bestand.
 */
export async function unlockWithBiometric(): Promise<boolean> {
  const idRaw = read(KEYS.credentialId)
  if (!idRaw) return false
  try {
    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        allowCredentials: [{ type: 'public-key', id: fromBase64(idRaw) as BufferSource }],
        userVerification: 'required',
        timeout: 60_000,
      },
    })
    if (assertion) {
      resetAttempts()
      return true
    }
    return false
  } catch {
    return false
  }
}
