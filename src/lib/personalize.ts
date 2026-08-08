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
export function personalizeText(text: string, child: ChildProfile | null): string {
  if (!text.includes('{naam}') && !text.includes('{naam_bezit}')) return text
  const name = child?.name?.trim()
  return text
    .replaceAll('{naam_bezit}', name ? possessive(name) : 'zijn')
    .replaceAll('{naam}', name || 'hem')
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
