/**
 * De vorm van een thema.
 *
 * Elk thema volgt raamwerk A, "de boog": vier delen die op elkaar staan —
 * herkennen, begrijpen, proberen, volhouden. Per deel een korte les, een pool
 * van vier oefeningen waaruit er drie getrokken worden, en één opdracht voor
 * thuis.
 *
 * Losse content, geen database: zo is er geen migratie nodig om dit te bekijken.
 * Geschreven voor een zoon in de band "vroeg" (11-13). Tokens als {naam} en
 * {hij} worden door src/lib/personalize.ts vervangen.
 */

export type OefeningType =
  | 'toen-en-nu'
  | 'balans'
  | 'waar-ging-het-mis'
  | 'eerste-neiging'
  | 'twee-wegen'
  | 'een-woord'
  | 'en-dan'
  | 'volgorde'
  | 'beste-aanpak'

export interface Optie {
  id: string
  label: string
  feedback: string
  /** Alleen bij 'beste-aanpak'. Bij de andere types bestaat "goed" niet. */
  correct?: boolean
}

export interface DialoogRegel {
  spreker: 'vader' | 'kind'
  tekst: string
  /** De regel waar het kantelde, bij 'waar-ging-het-mis'. */
  kantelt?: boolean
  waarom?: string
}

export interface Oefening {
  id: string
  type: OefeningType
  /** Valt er iets goed of fout te doen? Bij de helft bewust niet. */
  scoorbaar: boolean
  lesId: string
  situatie: string
  vraag: string
  opties?: Optie[]
  dialoog?: DialoogRegel[]
  /** Bij 'volgorde': de juiste volgorde. Wordt geschud voor vertoning. */
  stappen?: { tekst: string; waarom: string }[]
  /** Bij 'twee-wegen': waar de keuze werkelijk van afhangt. */
  afhangt?: string
  /** Bij 'toen-en-nu': dezelfde opties worden twee keer beantwoord — eerst over
   *  je eigen vader, dan over jezelf. De twee komen naast elkaar te staan. */
  toen?: { vraag: string; nuVraag: string; zelfde: string; anders: string }
  /** Bij 'balans': een schuif tussen twee polen. Geen goed antwoord, wel een
   *  positie, en die verschuift over de weken. */
  balans?: {
    links: string
    rechts: string
    zones: { tot: number; kop: string; tekst: string }[]
  }
}

export interface Les {
  id: string
  nr: number
  fase: 'Herkennen' | 'Begrijpen' | 'Proberen' | 'Volhouden'
  titel: string
  haakje: string
  inzicht: string
  spiegel: string
  thuismissie: { actie: string; waarom: string }
}



export interface Thema {
  id: string
  nr: number
  titel: string
  ondertitel: string
  lessen: Les[]
  oefeningen: Oefening[]
}
