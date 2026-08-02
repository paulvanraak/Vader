import type { AgeGroup } from '../state/AppStateContext'

const MIN_AGE = 6
const MAX_AGE = 18

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

// Voor het <input type="date"> geboortedatumveld: min = oudste toegestane
// leeftijd (18), max = jongste toegestane leeftijd (6).
export function birthDateBounds(today: Date = new Date()): { min: string; max: string } {
  const min = new Date(today.getFullYear() - MAX_AGE, today.getMonth(), today.getDate())
  const max = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate())
  return { min: toIsoDate(min), max: toIsoDate(max) }
}

export function calculateAge(birthDateIso: string, today: Date = new Date()): number {
  const birth = new Date(birthDateIso)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1
  }
  return age
}

// De contentbibliotheek is nog opgebouwd rond twee cohorten (NOVA's / PUBERS).
// Leeftijden onder de 12 krijgen de jongere cohort, 12 en ouder de oudere,
// zodat het hele bereik van 6 tot 18 jaar toch passende content krijgt.
export function deriveAgeGroup(birthDateIso: string): AgeGroup {
  return calculateAge(birthDateIso) < 12 ? 'jong' : 'oud'
}

export function isValidBirthDate(birthDateIso: string): boolean {
  if (!birthDateIso) return false
  const age = calculateAge(birthDateIso)
  return age >= MIN_AGE && age <= MAX_AGE
}
