import type { ChildProfile } from '../state/AppStateContext'
import { calculateAge } from './age'

const genderLabel: Record<ChildProfile['gender'], string> = {
  zoon: 'Zoon',
  dochter: 'Dochter',
}

export function childLabel(child: ChildProfile): string {
  return child.name || genderLabel[child.gender]
}

export function childSubLabel(child: ChildProfile): string {
  return `${genderLabel[child.gender]} · ${calculateAge(child.birthDate)} jaar`
}

export function childHasContent(child: ChildProfile): boolean {
  return child.gender === 'zoon'
}
