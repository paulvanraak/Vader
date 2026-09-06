import { GUARDRAIL_PATTERNS, REFERRAL_TEXT } from './generated/guardrailPatterns.ts'

/**
 * De vangrail draait in twee lagen. Deze client-side laag is snel en werkt ook
 * zonder netwerk; api/ask.ts draait dezelfde controle server-side zodat hij niet
 * te omzeilen is door de route rechtstreeks aan te roepen.
 *
 * Beide lezen uit content/guardrail-patterns.json — hier via het gegenereerde
 * generated/guardrailPatterns.ts, daar via injectie in de route zelf, omdat die
 * self-contained moet blijven. "npm run verify:sources" laat de build falen
 * zodra een van die kopieën afwijkt van de bron.
 */
export { GUARDRAIL_PATTERNS, REFERRAL_TEXT }

/** Welk patroon afging, of null. Gebruikt voor logging zonder gebruikerstekst. */
export function matchedGuardrailPattern(input: string): string | null {
  const normalized = input.toLowerCase()
  const hit = GUARDRAIL_PATTERNS.find(({ regex }) => new RegExp(regex, 'i').test(normalized))
  return hit ? hit.id : null
}

export function triggersGuardrail(input: string): boolean {
  return matchedGuardrailPattern(input) !== null
}
