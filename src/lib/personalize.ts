import type { ChildProfile } from '../state/AppStateContext'
import type { Beat } from '../types/lesson'

// Benadering van de Nederlandse bezitsvorm voor namen: eindigt op s/x/z dan
// alleen een apostrof, eindigt op een klinker dan 's, anders gewoon een s.
function possessive(name: string): string {
  const lower = name.toLowerCase()
  if (/[sxz]$/.test(lower)) return `${name}'`
  if (/[aeiouy]$/.test(lower)) return `${name}'s`
  return `${name}s`
}

// Lesteksten bevatten soms de tokens {naam} en {naam_bezit}, ingevoegd in de
// CMS-content op plekken waar de naam van het kind natuurlijk past. Zonder
// actief kind (zou in de praktijk niet voorkomen tijdens een les) valt dit
// terug op de generieke voornaamwoorden die er origineel stonden.
// Naast {naam} en {naam_bezit} kan lescontent geslachtsneutraal geschreven
// worden met voornaamwoord-tokens, zodat één tekst klopt voor een zoon én
// voor een dochter. Zonder deze tokens staat er letterlijk "hij"/"hem" in de
// content en leest een dochter dus mannelijke tekst.
const PRONOUNS = {
  zoon: { hij: 'hij', hem: 'hem', zijn: 'zijn', kind: 'zoon' },
  dochter: { hij: 'zij', hem: 'haar', zijn: 'haar', kind: 'dochter' },
} as const

// Tokens mogen ook met hoofdletter geschreven worden ({Hij} aan het begin van
// een zin), dan komt het vervangende woord ook met hoofdletter terug.
const TOKEN_PATTERN = /\{(naam|naam_bezit|[Hh]ij|[Hh]em|[Zz]ijn|[Kk]ind)\}/g

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function personalizeText(text: string, child: ChildProfile | null): string {
  TOKEN_PATTERN.lastIndex = 0
  if (!TOKEN_PATTERN.test(text)) return text
  const name = child?.name?.trim()
  const p = PRONOUNS[child?.gender === 'dochter' ? 'dochter' : 'zoon']

  return text
    .replaceAll('{naam_bezit}', name ? possessive(name) : p.zijn)
    .replaceAll('{naam}', name || p.hem)
    .replace(TOKEN_PATTERN, (match, token: string) => {
      const lower = token.toLowerCase() as keyof typeof p
      const value = p[lower]
      if (value === undefined) return match
      return token[0] === token[0].toUpperCase() ? capitalize(value) : value
    })
}

export function personalizeBeat(beat: Beat, child: ChildProfile | null): Beat {
  return {
    ...beat,
    body: beat.body ? personalizeText(beat.body, child) : beat.body,
    fout: beat.fout ? personalizeText(beat.fout, child) : beat.fout,
    beter: beat.beter ? personalizeText(beat.beter, child) : beat.beter,
    vraag: beat.vraag ? personalizeText(beat.vraag, child) : beat.vraag,
    opties: beat.opties?.map((optie) => ({
      ...optie,
      label: personalizeText(optie.label, child),
      feedback: personalizeText(optie.feedback, child),
    })),
    acties: beat.acties
      ? ([personalizeText(beat.acties[0], child), personalizeText(beat.acties[1], child)] as [string, string])
      : beat.acties,
  }
}
