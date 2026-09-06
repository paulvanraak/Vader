import { THEMA1 } from './thema1'
import { THEMA2 } from './thema2'
import { THEMA3 } from './thema3'
import type { Thema } from './types'

/**
 * Alle gebouwde thema's, in de volgorde waarin ze op het pad staan. De rest
 * van de app kent alleen deze lijst; er is nergens iets hardgecodeerd op één
 * thema, zodat er alleen een bestand bij hoeft als er een thema bijkomt.
 */
export const THEMAS: Thema[] = [THEMA1, THEMA2, THEMA3]

export function vindThema(id: string | null | undefined): Thema | null {
  return THEMAS.find((t) => t.id === id) ?? null
}

export type { Thema, Les, Oefening, OefeningType, Optie, DialoogRegel } from './types'
