import { supabase } from './supabaseClient'
import type { Beat, BeatType, Lesson, World } from '../types/lesson'

export interface CompassEntry {
  worldId: number
  background: string
}

export interface Specialist {
  id: string
  name: string
  role: string
  bio: string
  sortOrder: number
}

export interface WorldColor {
  accent: string
  accentDark: string
  dark: string
}

export interface AppContent {
  worlds: World[]
  worldColors: Record<number, WorldColor>
  lessons: Lesson[]
  compassEntries: CompassEntry[]
  specialists: Specialist[]
}

interface WorldRow {
  id: string
  title: string
  subtitle: string
  color_accent: string
  color_accent_dark: string
  color_dark: string
  sort_order: number
}

interface LessonRow {
  id: string
  world_id: string
  cohort: 'jong' | 'oud'
  title: string
  sort_order: number
}

interface BeatRow {
  id: string
  lesson_id: string
  type: BeatType
  sort_order: number
  body: string | null
  fout: string | null
  beter: string | null
  vraag: string | null
}

interface OefeningOptieRow {
  beat_id: string
  label: string
  correct: boolean
  feedback: string
  sort_order: number
}

interface ThuismissieActieRow {
  beat_id: string
  actie: string
  sort_order: number
}

interface CompassRow {
  world_id: string
  background: string
}

interface SpecialistRow {
  id: string
  name: string
  role: string
  bio: string
  sort_order: number
}

export async function fetchContent(): Promise<AppContent> {
  const [worldsRes, lessonsRes, beatsRes, optiesRes, actiesRes, compassRes, specialistsRes] = await Promise.all([
    supabase.from('worlds').select('*').order('sort_order'),
    supabase.from('lessons').select('*').order('sort_order'),
    supabase.from('beats').select('*').order('sort_order'),
    supabase.from('oefening_opties').select('*').order('sort_order'),
    supabase.from('thuismissie_acties').select('*').order('sort_order'),
    supabase.from('compass_entries').select('*'),
    supabase.from('specialists').select('*').order('sort_order'),
  ])

  for (const res of [worldsRes, lessonsRes, beatsRes, optiesRes, actiesRes, compassRes, specialistsRes]) {
    if (res.error) throw res.error
  }

  const worldRows = (worldsRes.data ?? []) as WorldRow[]
  const lessonRows = (lessonsRes.data ?? []) as LessonRow[]
  const beatRows = (beatsRes.data ?? []) as BeatRow[]
  const optieRows = (optiesRes.data ?? []) as OefeningOptieRow[]
  const actieRows = (actiesRes.data ?? []) as ThuismissieActieRow[]
  const compassRows = (compassRes.data ?? []) as CompassRow[]
  const specialistRows = (specialistsRes.data ?? []) as SpecialistRow[]

  const worldIdToNumber = new Map<string, number>()
  const worlds: World[] = []
  const worldColors: Record<number, WorldColor> = {}
  worldRows.forEach((row) => {
    worldIdToNumber.set(row.id, row.sort_order)
    worlds.push({ id: row.sort_order, title: row.title, subtitle: row.subtitle })
    worldColors[row.sort_order] = { accent: row.color_accent, accentDark: row.color_accent_dark, dark: row.color_dark }
  })

  const optiesByBeat = new Map<string, OefeningOptieRow[]>()
  optieRows.forEach((row) => {
    const list = optiesByBeat.get(row.beat_id) ?? []
    list.push(row)
    optiesByBeat.set(row.beat_id, list)
  })

  const actiesByBeat = new Map<string, ThuismissieActieRow[]>()
  actieRows.forEach((row) => {
    const list = actiesByBeat.get(row.beat_id) ?? []
    list.push(row)
    actiesByBeat.set(row.beat_id, list)
  })

  const beatsByLesson = new Map<string, Beat[]>()
  beatRows.forEach((row) => {
    const beat: Beat = { type: row.type }
    if (row.body !== null) beat.body = row.body
    if (row.fout !== null) beat.fout = row.fout
    if (row.beter !== null) beat.beter = row.beter
    if (row.vraag !== null) beat.vraag = row.vraag
    if (row.type === 'oefening') {
      beat.opties = (optiesByBeat.get(row.id) ?? []).map((o) => ({
        label: o.label,
        correct: o.correct,
        feedback: o.feedback,
      }))
    }
    if (row.type === 'thuismissie') {
      const acties = (actiesByBeat.get(row.id) ?? []).map((a) => a.actie)
      beat.acties = [acties[0] ?? '', acties[1] ?? '']
    }
    const list = beatsByLesson.get(row.lesson_id) ?? []
    list.push(beat)
    beatsByLesson.set(row.lesson_id, list)
  })

  const lessons: Lesson[] = lessonRows.map((row) => ({
    id: row.id,
    world: worldIdToNumber.get(row.world_id) ?? 0,
    cohort: row.cohort,
    title: row.title,
    sortOrder: row.sort_order,
    beats: beatsByLesson.get(row.id) ?? [],
  }))

  const compassEntries: CompassEntry[] = compassRows.map((row) => ({
    worldId: worldIdToNumber.get(row.world_id) ?? 0,
    background: row.background,
  }))

  const specialists: Specialist[] = specialistRows.map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    sortOrder: row.sort_order,
  }))

  return { worlds, worldColors, lessons, compassEntries, specialists }
}
