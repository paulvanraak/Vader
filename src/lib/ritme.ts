/**
 * Het ritme van een thema. Model B plus een stuk C, zoals afgesproken:
 *
 * B — dagdoel zonder slot. Eén sessie per dag is je doel en houdt je streak
 *     heel. Doorgaan mag altijd; een tweede sessie telt alleen niet extra.
 *     Na drie sessies op een dag komt er een zachte opmerking, geen blokkade.
 *
 * C — het ritme volgt de thuismissie. Een volgend deel van het thema opent pas
 *     als je hebt teruggekoppeld hoe de vorige missie ging. "Niet gelukt" telt
 *     net zo goed; het gaat om de terugkoppeling, niet om de prestatie.
 *
 * En de reden dat het thema niet in tien minuten leeg is: nieuw materiaal komt
 * gedoseerd, maar de oefeningen zijn een herspeelbare pool. Je kunt vanavond
 * zo vaak oefenen als je wil, steeds met een andere trekking.
 *
 * Voorlopig in localStorage. Zodra de migratie er is verhuist dit naar de
 * database; de vorm van RitmeState is daar met opzet al op voorbereid.
 */
import type { Oefening } from '../content/types'

/**
 * 'in_checklist' is de open stand: de opdracht is uitgedeeld maar nog niet
 * teruggekoppeld. Het antwoord geef je in de checklist, niet in het thema —
 * daar hoort het thuis, want daar sta je als je het echt gedaan hebt.
 */
export type MissieAntwoord =
  | 'in_checklist'
  | 'ging_goed'
  | 'lastig'
  | 'niet_gelukt'
  | 'kind_was_er_niet'

export interface RitmeState {
  /** Welk thema loopt er nu. Null zolang er nog niet gekozen is. */
  actiefThema: string | null
  /** Afgeronde delen, op les-id. Bepaalt waar je staat op het themapad. */
  voltooid: string[]
  streak: number
  laatsteActieveDag: string | null
  sessiesVandaag: number
  /** Per oefening: hoe vaak gezien, wanneer voor het laatst, ging het mis. */
  oefeningen: Record<string, { keer: number; laatst: string; fout: boolean }>
  /** Per les: hoe de thuismissie ging. Dit opent het volgende deel. */
  missies: Record<string, MissieAntwoord>
}

const SLEUTEL = 'fatherflow.ritme.v1'

export function legeStaat(): RitmeState {
  return {
    actiefThema: null,
    voltooid: [],
    streak: 0,
    laatsteActieveDag: null,
    sessiesVandaag: 0,
    oefeningen: {},
    missies: {},
  }
}

function vandaag(): string {
  return new Date().toISOString().slice(0, 10)
}

function gisteren(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

export function laadRitme(): RitmeState {
  try {
    const ruw = localStorage.getItem(SLEUTEL)
    if (!ruw) return legeStaat()
    const s = { ...legeStaat(), ...(JSON.parse(ruw) as Partial<RitmeState>) }
    // Nieuwe dag: de teller van vandaag begint opnieuw.
    if (s.laatsteActieveDag !== vandaag()) s.sessiesVandaag = 0
    return s
  } catch {
    return legeStaat()
  }
}

export function bewaarRitme(s: RitmeState): void {
  try {
    localStorage.setItem(SLEUTEL, JSON.stringify(s))
  } catch {
    // Privémodus of geblokkeerde opslag: dan draait het gewoon zonder geheugen.
  }
}

/** Eén afgeronde sessie. Houdt de streak bij; blokkeert nooit. */
export function registreerSessie(s: RitmeState): RitmeState {
  const nu = vandaag()
  if (s.laatsteActieveDag === nu) {
    return { ...s, sessiesVandaag: s.sessiesVandaag + 1 }
  }
  // Aansluitend op gisteren telt door, anders begint de streak opnieuw op 1.
  const streak = s.laatsteActieveDag === gisteren() ? s.streak + 1 : 1
  return { ...s, streak, laatsteActieveDag: nu, sessiesVandaag: 1 }
}

export function dagdoelGehaald(s: RitmeState): boolean {
  return s.laatsteActieveDag === vandaag() && s.sessiesVandaag >= 1
}

/** Na drie sessies op één dag een zachte opmerking, geen slot. */
export function teVeelOpEenDag(s: RitmeState): boolean {
  return s.laatsteActieveDag === vandaag() && s.sessiesVandaag >= 3
}

export function noteerOefening(s: RitmeState, id: string, fout: boolean): RitmeState {
  const vorig = s.oefeningen[id]
  return {
    ...s,
    oefeningen: {
      ...s.oefeningen,
      [id]: { keer: (vorig?.keer ?? 0) + 1, laatst: new Date().toISOString(), fout },
    },
  }
}

export function noteerMissie(s: RitmeState, lesId: string, antwoord: MissieAntwoord): RitmeState {
  return { ...s, missies: { ...s.missies, [lesId]: antwoord } }
}

/**
 * Welke delen zijn open? Het eerste altijd, en daarna telkens één verder dan
 * wat je hebt afgerond. Zo staat er op het themapad altijd precies één deel
 * open te wachten.
 */
export function openLessen(s: RitmeState, lesIds: string[]): number {
  let open = 1
  for (const id of lesIds) {
    if (!s.voltooid.includes(id)) break
    open += 1
  }
  return Math.min(open, lesIds.length)
}

export function kiesThema(s: RitmeState, themaId: string): RitmeState {
  return { ...s, actiefThema: themaId }
}

export function voltooiDeel(s: RitmeState, lesId: string): RitmeState {
  if (s.voltooid.includes(lesId)) return s
  return { ...s, voltooid: [...s.voltooid, lesId] }
}

export function themaAf(s: RitmeState, lesIds: string[]): boolean {
  return lesIds.every((id) => s.voltooid.includes(id))
}

/**
 * Trekt oefeningen uit de pool. Bewust gewogen en niet willekeurig:
 * nooit gezien gaat voor eerder fout, dat gaat voor lang geleden, dat gaat
 * voor recent goed. Daarbovenop drie regels die de sessie afwisselend houden.
 */
export function trekOefeningen(pool: Oefening[], s: RitmeState, aantal = 3): Oefening[] {
  const nu = Date.now()
  const score = (o: Oefening): number => {
    const g = s.oefeningen[o.id]
    if (!g) return 1000
    const dagen = (nu - new Date(g.laatst).getTime()) / 86_400_000
    return (g.fout ? 500 : 0) + Math.min(dagen, 60) * 5 - g.keer * 10
  }

  const gesorteerd = [...pool].sort((a, b) => score(b) - score(a))
  const gekozen: Oefening[] = []
  const typesGebruikt = new Set<string>()
  let besteAanpak = 0

  for (const o of gesorteerd) {
    if (gekozen.length >= aantal) break
    if (typesGebruikt.has(o.type)) continue // nooit twee keer dezelfde vorm
    if (o.type === 'beste-aanpak' && besteAanpak >= 1) continue // hooguit één gokbare
    gekozen.push(o)
    typesGebruikt.add(o.type)
    if (o.type === 'beste-aanpak') besteAanpak += 1
  }

  // Minstens één vraag zonder goed of fout, anders voelt het als een toets.
  if (gekozen.length && gekozen.every((o) => o.scoorbaar)) {
    const zacht = gesorteerd.find((o) => !o.scoorbaar && !gekozen.includes(o))
    if (zacht) gekozen[gekozen.length - 1] = zacht
  }

  return gekozen
}
