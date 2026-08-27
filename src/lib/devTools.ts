/**
 * Testgereedschap voor de bouwer, en uitsluitend voor de bouwer.
 *
 * Twee regels waar dit bestand op rust:
 *
 * 1. Het paneel zit niet in een productiebundel. __DEV_TOOLS__ wordt door
 *    vite.config.ts vervangen door een letterlijke false, waarna de bundelaar
 *    de hele tak inclusief de DevPanel-module weggooit. scripts/generate-api.mjs
 *    laat de build daarnaast falen als VITE_DEV_TOOLS aanstaat in productie.
 *
 * 2. De snelle route slaat het ínloggen over, niet het account. Hij logt in als
 *    een echte, vooraf aangemaakte testgebruiker, zodat RLS onverkort van kracht
 *    blijft. Een omweg die de databeveiliging passeert test iets anders dan wat
 *    de vaders straks doen, en dan test je precies het pad niet dat kan breken.
 */
import { supabase } from './supabaseClient'
import type { ChildGender } from '../state/AppStateContext'
import { getDevelopmentBand, bandLabels, type DevelopmentBand } from './development'
import { calculateAge } from './age'

export const DEV_TOOLS_ENABLED = __DEV_TOOLS__

/**
 * De inloggegevens van de testgebruiker staan in de omgeving, nooit in de repo.
 * Zet ze op Vercel alleen in de preview-omgeving.
 */
const TEST_EMAIL = import.meta.env.VITE_DEV_TEST_EMAIL as string | undefined
const TEST_PASSWORD = import.meta.env.VITE_DEV_TEST_PASSWORD as string | undefined

export function hasTestUserCredentials(): boolean {
  return Boolean(TEST_EMAIL && TEST_PASSWORD)
}

/**
 * Inloggen overslaan zonder het account over te slaan.
 *
 * Twee routes, in deze volgorde, en allebei leveren ze een echte Supabase-sessie
 * op zodat RLS onverkort blijft gelden:
 *
 * 1. De vaste testgebruiker uit de omgeving. Voorkeursroute: je test dan steeds
 *    hetzelfde account met dezelfde kinderen en dezelfde voortgang.
 * 2. Anoniem inloggen. Ook dat is een echte gebruiker met een echt token, alleen
 *    zonder mailadres. Bruikbaar als er nog geen testaccount is ingesteld, met
 *    als nadeel dat je bij elke nieuwe sessie weer vanaf nul begint.
 *
 * Wat het nooit doet, is de sessie faken of RLS omzeilen. Dan zou je een pad
 * testen dat in productie niet bestaat.
 */
export async function skipLogin(): Promise<{ ok: boolean; error?: string }> {
  if (TEST_EMAIL && TEST_PASSWORD) {
    const { error } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    })
    if (!error) return { ok: true }
    console.warn('[dev] testgebruiker inloggen mislukt, ik probeer anoniem:', error.message)
  }

  const { error } = await supabase.auth.signInAnonymously()
  if (!error) return { ok: true }

  return {
    ok: false,
    error: TEST_EMAIL
      ? `Inloggen als testgebruiker mislukte en anoniem inloggen staat uit. (${error.message})`
      : 'Geen testaccount ingesteld en anoniem inloggen staat uit. Zet ' +
        'VITE_DEV_TEST_EMAIL en VITE_DEV_TEST_PASSWORD, of zet anonieme ' +
        'aanmeldingen aan in Supabase Auth.',
  }
}

/**
 * De acht combinaties, elk met een leeftijd die comfortabel midden in de band
 * ligt. Zo test je de band en niet per ongeluk de grens ertussen.
 */
export interface DevProfilePreset {
  gender: ChildGender
  band: DevelopmentBand
  age: number
  name: string
}

const presetAges: Record<ChildGender, Record<DevelopmentBand, number>> = {
  dochter: { kind: 8, vroeg: 11, midden: 13, laat: 15 },
  zoon: { kind: 9, vroeg: 12, midden: 14, laat: 16 },
}

const presetNames: Record<ChildGender, Record<DevelopmentBand, string>> = {
  dochter: { kind: 'Test Sara', vroeg: 'Test Noor', midden: 'Test Lieve', laat: 'Test Fenna' },
  zoon: { kind: 'Test Tim', vroeg: 'Test Daan', midden: 'Test Sem', laat: 'Test Luuk' },
}

export const devProfilePresets: DevProfilePreset[] = (['dochter', 'zoon'] as ChildGender[]).flatMap(
  (gender) =>
    (['kind', 'vroeg', 'midden', 'laat'] as DevelopmentBand[]).map((band) => ({
      gender,
      band,
      age: presetAges[gender][band],
      name: presetNames[gender][band],
    })),
)

/** Geboortedatum die vandaag precies die leeftijd oplevert, ruim van een verjaardag af. */
export function birthDateForAge(age: number): string {
  const now = new Date()
  const d = new Date(now.getFullYear() - age, now.getMonth(), 15)
  // Als de 15e van deze maand nog moet komen is het kind nog een jaar jonger;
  // een maand terugzetten houdt de leeftijd kloppend zonder randgevallen.
  if (d > now) d.setMonth(d.getMonth() - 1)
  return d.toISOString().slice(0, 10)
}

/**
 * Wat het pad op dit moment werkelijk doet voor een kind. Zolang taak 2 niet
 * gedraaid is heeft content nog geen band- en geslachtskolom, dus is er niets om
 * op te filteren. Dat staat hier eerlijk in plaats van dat het paneel een
 * terugval verzint die er niet is.
 */
export interface BandStatus {
  band: DevelopmentBand
  bandLabel: string
  age: number
  gender: ChildGender
  lessonCount: number
  fallback: string | null
}

export function describeBandStatus(
  birthDate: string,
  gender: ChildGender,
  lessonCount: number,
): BandStatus {
  const age = calculateAge(birthDate)
  const band = getDevelopmentBand(age, gender)
  let fallback: string | null = null
  if (lessonCount === 0) {
    fallback =
      gender === 'dochter'
        ? 'Leeg pad. Dochtercontent bestaat nog niet; taak 2 moet nog draaien.'
        : 'Leeg pad. Geen lessen gevonden voor deze band.'
  }
  return { band, bandLabel: bandLabels[band], age, gender, lessonCount, fallback }
}
