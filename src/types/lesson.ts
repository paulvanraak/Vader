export type BeatType =
  | 'haakje'
  | 'inzicht'
  | 'spiegel'
  | 'voorbeeld'
  | 'oefening'
  | 'thuismissie'
  | 'terugkoppeling'

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
