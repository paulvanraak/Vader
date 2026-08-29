import { supabase } from './supabaseClient'

/**
 * De inloggegevens van de testgebruiker staan in de omgeving, nooit in de repo.
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
