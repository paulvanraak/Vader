export type BeatType = 'haakje' | 'inzicht' | 'spiegel' | 'voorbeeld' | 'oefening' | 'thuismissie'

export interface OefeningOptie {
  label: string
  correct: boolean
  feedback: string
}

export interface Beat {
  type: BeatType
  title?: string
  body?: string
  // alleen bij "voorbeeld"
  fout?: string
  beter?: string
  // alleen bij "oefening"
  vraag?: string
  opties?: OefeningOptie[]
  // alleen bij "thuismissie": twee losse dingen om te proberen, gekoppeld aan het onderwerp
  acties?: [string, string]
}

export interface Lesson {
  id: string
  world: number
  cohort: 'jong' | 'oud'
  title: string
  beats: Beat[]
}

export interface World {
  id: number
  title: string
  subtitle: string
}
