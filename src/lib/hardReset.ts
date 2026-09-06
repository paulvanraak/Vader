import { supabase } from './supabaseClient'

/**
 * Alles wissen en als verse gebruiker verder.
 *
 * Drie lagen, en ze moeten alle drie weg, anders ben je maar half nieuw:
 *
 * 1. De rijen in de database die van jou zijn — je kind, je voortgang, je
 *    gesprekken. Dit gaat via de gewone client en dus onder RLS: je kunt
 *    hiermee nooit iets wissen dat niet van je eigen account is.
 * 2. De sessie zelf. Met anoniem inloggen betekent uitloggen ook echt een
 *    ander account bij de volgende start; er is geen mailadres dat je terug
 *    naar hetzelfde profiel brengt.
 * 3. Alles wat op dit toestel staat: je ritme, welke uitleg je al gezien hebt,
 *    het app-slot, de bewaarde sessie van Supabase.
 *
 * Volgorde is niet vrijblijvend. Wissen kan alleen zolang de sessie er nog is,
 * dus dat gaat eerst; pas daarna uitloggen en de opslag leeggooien.
 */

export interface ResetUitkomst {
  /** Stond de opslag op dit toestel na afloop echt leeg? */
  toestelLeeg: boolean
  /** Zijn de rijen in de database ook echt weg? */
  accountLeeg: boolean
  /** Wat er misging, als er iets misging. Nooit tonen zonder uitleg erbij. */
  fout: string | null
}

async function wisAccountData(): Promise<void> {
  // Bewust getSession en niet getUser: die laatste vraagt het aan de server, en
  // dan lijkt "geen netwerk" op "geen sessie". Dat zou betekenen dat we melden
  // dat alles gewist is terwijl er niets gewist is.
  const { data } = await supabase.auth.getSession()
  const userId = data.session?.user.id
  if (!userId) return // geen sessie: er staat in de database niets van jou

  const { data: kinderen, error: kindFout } = await supabase
    .from('children')
    .select('id')
    .eq('user_id', userId)
  if (kindFout) throw kindFout

  const kindIds = (kinderen ?? []).map((k) => (k as { id: string }).id)

  // Eerst wat aan een kind hangt, dan het kind zelf. Andersom houdt de
  // vreemde sleutel het tegen.
  if (kindIds.length > 0) {
    for (const tabel of ['path_items', 'action_completions', 'earned_badges'] as const) {
      const { error: fout } = await supabase.from(tabel).delete().in('child_id', kindIds)
      if (fout) throw fout
    }
    const { error: fout } = await supabase.from('children').delete().in('id', kindIds)
    if (fout) throw fout
  }

  const { error: chatFout } = await supabase.from('chat_threads').delete().eq('user_id', userId)
  if (chatFout) throw chatFout
}

/**
 * Zonder limiet blijft de knop op "bezig" staan als het netwerk wegvalt: de
 * client blijft dan wachten en de vader kijkt tegen niets aan. Na de limiet
 * gaat het toestel alsnog leeg en hoort hij wat er niet lukte.
 */
function metTijdslimiet<T>(belofte: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    belofte,
    new Promise<T>((_, verwerp) =>
      setTimeout(() => verwerp(new Error('de verbinding reageerde niet')), ms),
    ),
  ])
}

/**
 * Supabase gooit geen Error maar een gewoon object met een message erin. Zonder
 * dit zag je altijd dezelfde algemene zin en nooit wat er echt aan de hand was.
 */
function foutTekst(err: unknown): string {
  const ruw = leesMessage(err)
  const m = ruw.toLowerCase()
  if (m.includes('fetch') || m.includes('network') || m.includes('reageerde niet')) {
    return 'geen verbinding met de server'
  }
  return ruw || 'onbekende fout'
}

function leesMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (err && typeof err === 'object' && 'message' in err) {
    const m = (err as { message?: unknown }).message
    if (typeof m === 'string' && m) return m
  }
  return ''
}

function wisToestel(): boolean {
  try {
    window.localStorage.clear()
    window.sessionStorage.clear()
    return true
  } catch {
    // Privémodus of geblokkeerde opslag. Dan stond er ook niets in.
    return false
  }
}

/**
 * Wist alles en logt uit. Roept géén reload aan — dat doet het scherm, zodat
 * het eerst nog kan laten zien wat er gebeurd is als er iets misging.
 */
export async function wisAlles(): Promise<ResetUitkomst> {
  let fout: string | null = null
  let accountLeeg = true

  try {
    await metTijdslimiet(wisAccountData(), 8000)
  } catch (err) {
    accountLeeg = false
    fout = foutTekst(err)
  }

  // Uitloggen en de opslag legen gebeuren hoe dan ook: dit toestel hoort daarna
  // schoon te zijn, ook als de database onbereikbaar was.
  try {
    await supabase.auth.signOut()
  } catch {
    // Geen netwerk: de opgeslagen sessie gaat hieronder alsnog weg.
  }

  const toestelLeeg = wisToestel()
  return { toestelLeeg, accountLeeg, fout }
}
