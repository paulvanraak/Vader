import type { AgeGroup, ChildGender } from '../state/AppStateContext'

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
// Tot die per ontwikkelingsfase is herschreven, vormt dit de brug: in plaats
// van één neutrale grens op 12 jaar ligt de grens per geslacht anders, omdat
// meisjes de puberteit gemiddeld zo'n twee jaar eerder ingaan. Een meisje van
// 11 krijgt dus puber-content, een jongen van 12 nog niet — met één gedeelde
// grens was die altijd voor de één te vroeg en voor de ander te laat.
const COHORT_BOUNDARY: Record<ChildGender, number> = {
  dochter: 11,
  zoon: 13,
}

export function deriveAgeGroup(birthDateIso: string, gender: ChildGender = 'zoon'): AgeGroup {
  return calculateAge(birthDateIso) < COHORT_BOUNDARY[gender] ? 'jong' : 'oud'
}

// Startwaarde voor de scroll-wheel datumkiezer: het midden van het
// toegestane bereik (6-18 jaar), zodat er altijd een geldige datum
// geselecteerd is in plaats van een lege placeholder.
export function defaultBirthDate(today: Date = new Date()): string {
  const midAge = Math.round((MIN_AGE + MAX_AGE) / 2)
  return toIsoDate(new Date(today.getFullYear() - midAge, today.getMonth(), today.getDate()))
}

export function isValidBirthDate(birthDateIso: string): boolean {
  if (!birthDateIso) return false
  const age = calculateAge(birthDateIso)
  return age >= MIN_AGE && age <= MAX_AGE
}
