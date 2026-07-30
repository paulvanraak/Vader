import type { ChildProfile } from '../state/AppStateContext'

const genderLabel: Record<ChildProfile['gender'], string> = {
  zoon: 'Zoon',
  dochter: 'Dochter',
}

const ageRange: Record<ChildProfile['ageGroup'], string> = {
  jong: '8-11',
  oud: '12-16',
}

export function childLabel(child: ChildProfile): string {
  return child.name || genderLabel[child.gender]
}

export function childSubLabel(child: ChildProfile): string {
  return `${genderLabel[child.gender]} · ${ageRange[child.ageGroup]}`
}

export function childHasContent(child: ChildProfile): boolean {
  return child.gender === 'zoon'
}
