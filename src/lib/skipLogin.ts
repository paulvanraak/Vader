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
  // Anoniem eerst. Dit is wat "geen account, geen login, geen mail" in de
  // praktijk betekent: Supabase maakt stilletjes een gebruiker aan, de vader
  // ziet er niets van, en omdat het een echte sessie is blijft RLS gelden en
  // wordt de voortgang gewoon opgeslagen. Bij de volgende keer openen keert
  // dezelfde sessie terug uit de browseropslag.
  const anon = await supabase.auth.signInAnonymously()
  if (!anon.error) return { ok: true }

  // Staat anoniem inloggen uit, dan vallen we terug op het vaste testaccount
  // als dat is ingesteld. Ook dat is een echte gebruiker.
  if (TEST_EMAIL && TEST_PASSWORD) {
    const { error } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    })
    if (!error) return { ok: true }
    return { ok: false, error: `Anoniem inloggen staat uit en het testaccount werkte niet: ${error.message}` }
  }

  return {
    ok: false,
    error:
      'Anoniem inloggen staat uit in Supabase. Zet het aan bij Authentication > ' +
      'Providers > Anonymous sign-ins. Dan is er geen account, geen login en ' +
      `geen mail nodig. (${anon.error.message})`,
  }
}
