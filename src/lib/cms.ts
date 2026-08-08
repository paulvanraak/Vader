import { supabase } from './supabaseClient'

export interface AdminWorld {
  id: string
  title: string
  subtitle: string
  sort_order: number
}

export interface AdminLesson {
  id: string
  world_id: string
  cohort: 'jong' | 'oud'
  title: string
  sort_order: number
}

export interface AdminBeat {
  id: string
  lesson_id: string
  type: 'haakje' | 'inzicht' | 'spiegel' | 'voorbeeld' | 'oefening' | 'thuismissie'
  sort_order: number
  body: string | null
  fout: string | null
  beter: string | null
  vraag: string | null
}

export interface AdminOefeningOptie {
  id: string
  beat_id: string
  label: string
  correct: boolean
  feedback: string
  sort_order: number
}

export interface AdminThuismissieActie {
  id: string
  beat_id: string
  actie: string
  sort_order: number
}

export interface AdminSpecialist {
  id: string
  name: string
  role: string
  bio: string
  sort_order: number
}

export async function fetchAdminWorlds(): Promise<AdminWorld[]> {
  const { data, error } = await supabase.from('worlds').select('*').order('sort_order')
  if (error) throw error
  return data as AdminWorld[]
}

export async function fetchAdminLessons(worldId: string): Promise<AdminLesson[]> {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('world_id', worldId)
    .order('sort_order')
  if (error) throw error
  return data as AdminLesson[]
}

export async function createWorld(title: string, subtitle: string): Promise<void> {
  const worlds = await fetchAdminWorlds()
  const nextOrder = worlds.length > 0 ? Math.max(...worlds.map((w) => w.sort_order)) + 1 : 1
  const { error } = await supabase.from('worlds').insert({
    title,
    subtitle,
    sort_order: nextOrder,
    color_accent: '#4c6fff',
    color_accent_dark: '#1b3690',
    color_dark: '#0b2540',
  })
  if (error) throw error
}

export async function updateWorld(id: string, patch: { title?: string; subtitle?: string }): Promise<void> {
  const { error } = await supabase.from('worlds').update(patch).eq('id', id)
  if (error) throw error
}

export async function deleteWorld(id: string): Promise<void> {
  const { error } = await supabase.from('worlds').delete().eq('id', id)
  if (error) throw error
}

export async function swapWorldOrder(a: AdminWorld, b: AdminWorld): Promise<void> {
  const { error: e1 } = await supabase.from('worlds').update({ sort_order: b.sort_order }).eq('id', a.id)
  if (e1) throw e1
  const { error: e2 } = await supabase.from('worlds').update({ sort_order: a.sort_order }).eq('id', b.id)
  if (e2) throw e2
}

export async function createLesson(worldId: string, cohort: 'jong' | 'oud', title: string): Promise<void> {
  const lessons = await fetchAdminLessons(worldId)
  const sameCohort = lessons.filter((l) => l.cohort === cohort)
  const nextOrder = sameCohort.length > 0 ? Math.max(...sameCohort.map((l) => l.sort_order)) + 1 : 0
  const { data: lessonRow, error } = await supabase
    .from('lessons')
    .insert({ world_id: worldId, cohort, title, sort_order: nextOrder })
    .select('id')
    .single()
  if (error) throw error

  const beatDefaults: { type: string; sort_order: number; body?: string; vraag?: string; fout?: string; beter?: string }[] = [
    { type: 'haakje', sort_order: 0, body: '' },
    { type: 'inzicht', sort_order: 1, body: '' },
    { type: 'spiegel', sort_order: 2, body: '' },
    { type: 'voorbeeld', sort_order: 3, fout: '', beter: '' },
    { type: 'oefening', sort_order: 4, vraag: '' },
    { type: 'thuismissie', sort_order: 5 },
  ]
  const { data: beatRows, error: beatsError } = await supabase
    .from('beats')
    .insert(beatDefaults.map((b) => ({ ...b, lesson_id: lessonRow.id })))
    .select('id, type')
  if (beatsError) throw beatsError

  const oefeningBeat = beatRows.find((b: { type: string }) => b.type === 'oefening')
  if (oefeningBeat) {
    const { error: optieError } = await supabase.from('oefening_opties').insert([
      { beat_id: oefeningBeat.id, label: '', correct: false, feedback: '', sort_order: 0 },
      { beat_id: oefeningBeat.id, label: '', correct: true, feedback: '', sort_order: 1 },
      { beat_id: oefeningBeat.id, label: '', correct: false, feedback: '', sort_order: 2 },
    ])
    if (optieError) throw optieError
  }

  const thuismissieBeat = beatRows.find((b: { type: string }) => b.type === 'thuismissie')
  if (thuismissieBeat) {
    const { error: actieError } = await supabase.from('thuismissie_acties').insert([
      { beat_id: thuismissieBeat.id, actie: '', sort_order: 0 },
      { beat_id: thuismissieBeat.id, actie: '', sort_order: 1 },
    ])
    if (actieError) throw actieError
  }
}

export async function deleteLesson(id: string): Promise<void> {
  const { error } = await supabase.from('lessons').delete().eq('id', id)
  if (error) throw error
}

export async function updateLessonTitle(id: string, title: string): Promise<void> {
  const { error } = await supabase.from('lessons').update({ title }).eq('id', id)
  if (error) throw error
}

export async function swapLessonOrder(a: AdminLesson, b: AdminLesson): Promise<void> {
  const { error: e1 } = await supabase.from('lessons').update({ sort_order: b.sort_order }).eq('id', a.id)
  if (e1) throw e1
  const { error: e2 } = await supabase.from('lessons').update({ sort_order: a.sort_order }).eq('id', b.id)
  if (e2) throw e2
}

export async function duplicateLesson(lessonId: string): Promise<void> {
  const { data: original, error: lessonError } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single()
  if (lessonError) throw lessonError

  const lessons = await fetchAdminLessons(original.world_id)
  const sameCohort = lessons.filter((l) => l.cohort === original.cohort)
  const nextOrder = sameCohort.length > 0 ? Math.max(...sameCohort.map((l) => l.sort_order)) + 1 : 0

  const { data: newLesson, error: insertError } = await supabase
    .from('lessons')
    .insert({
      world_id: original.world_id,
      cohort: original.cohort,
      title: `${original.title} (kopie)`,
      sort_order: nextOrder,
    })
    .select('id')
    .single()
  if (insertError) throw insertError

  const { data: beats, error: beatsError } = await supabase
    .from('beats')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('sort_order')
  if (beatsError) throw beatsError

  for (const beat of beats) {
    const { data: newBeat, error: newBeatError } = await supabase
      .from('beats')
      .insert({
        lesson_id: newLesson.id,
        type: beat.type,
        sort_order: beat.sort_order,
        body: beat.body,
        fout: beat.fout,
        beter: beat.beter,
        vraag: beat.vraag,
      })
      .select('id')
      .single()
    if (newBeatError) throw newBeatError

    if (beat.type === 'oefening') {
      const { data: opties, error: optiesError } = await supabase
        .from('oefening_opties')
        .select('*')
        .eq('beat_id', beat.id)
        .order('sort_order')
      if (optiesError) throw optiesError
      if (opties.length > 0) {
        const { error } = await supabase.from('oefening_opties').insert(
          opties.map((o) => ({
            beat_id: newBeat.id,
            label: o.label,
            correct: o.correct,
            feedback: o.feedback,
            sort_order: o.sort_order,
          })),
        )
        if (error) throw error
      }
    }

    if (beat.type === 'thuismissie') {
      const { data: acties, error: actiesError } = await supabase
        .from('thuismissie_acties')
        .select('*')
        .eq('beat_id', beat.id)
        .order('sort_order')
      if (actiesError) throw actiesError
      if (acties.length > 0) {
        const { error } = await supabase.from('thuismissie_acties').insert(
          acties.map((a) => ({ beat_id: newBeat.id, actie: a.actie, sort_order: a.sort_order })),
        )
        if (error) throw error
      }
    }
  }
}

// ---- Lesson content (beats) ----

export interface LessonDetail {
  lesson: AdminLesson
  beats: AdminBeat[]
  optiesByBeat: Record<string, AdminOefeningOptie[]>
  actiesByBeat: Record<string, AdminThuismissieActie[]>
}

export async function fetchLessonDetail(lessonId: string): Promise<LessonDetail> {
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single()
  if (lessonError) throw lessonError

  const { data: beats, error: beatsError } = await supabase
    .from('beats')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('sort_order')
  if (beatsError) throw beatsError

  const beatIds = (beats as AdminBeat[]).map((b) => b.id)

  const { data: opties, error: optiesError } = await supabase
    .from('oefening_opties')
    .select('*')
    .in('beat_id', beatIds)
    .order('sort_order')
  if (optiesError) throw optiesError

  const { data: acties, error: actiesError } = await supabase
    .from('thuismissie_acties')
    .select('*')
    .in('beat_id', beatIds)
    .order('sort_order')
  if (actiesError) throw actiesError

  const optiesByBeat: Record<string, AdminOefeningOptie[]> = {}
  ;(opties as AdminOefeningOptie[]).forEach((o) => {
    optiesByBeat[o.beat_id] = [...(optiesByBeat[o.beat_id] ?? []), o]
  })

  const actiesByBeat: Record<string, AdminThuismissieActie[]> = {}
  ;(acties as AdminThuismissieActie[]).forEach((a) => {
    actiesByBeat[a.beat_id] = [...(actiesByBeat[a.beat_id] ?? []), a]
  })

  return { lesson: lesson as AdminLesson, beats: beats as AdminBeat[], optiesByBeat, actiesByBeat }
}

export async function updateBeat(
  id: string,
  patch: Partial<Pick<AdminBeat, 'body' | 'fout' | 'beter' | 'vraag'>>,
): Promise<void> {
  const { error } = await supabase.from('beats').update(patch).eq('id', id)
  if (error) throw error
}

export async function updateOefeningOptie(
  id: string,
  patch: Partial<Pick<AdminOefeningOptie, 'label' | 'correct' | 'feedback'>>,
): Promise<void> {
  const { error } = await supabase.from('oefening_opties').update(patch).eq('id', id)
  if (error) throw error
}

export async function updateThuismissieActie(id: string, actie: string): Promise<void> {
  const { error } = await supabase.from('thuismissie_acties').update({ actie }).eq('id', id)
  if (error) throw error
}

// ---- Specialists ----

export async function fetchAdminSpecialists(): Promise<AdminSpecialist[]> {
  const { data, error } = await supabase.from('specialists').select('*').order('sort_order')
  if (error) throw error
  return data as AdminSpecialist[]
}

export async function createSpecialist(name: string, role: string, bio: string): Promise<void> {
  const specialists = await fetchAdminSpecialists()
  const nextOrder = specialists.length > 0 ? Math.max(...specialists.map((s) => s.sort_order)) + 1 : 0
  const { error } = await supabase.from('specialists').insert({ name, role, bio, sort_order: nextOrder })
  if (error) throw error
}

export async function updateSpecialist(
  id: string,
  patch: Partial<Pick<AdminSpecialist, 'name' | 'role' | 'bio'>>,
): Promise<void> {
  const { error } = await supabase.from('specialists').update(patch).eq('id', id)
  if (error) throw error
}

export async function deleteSpecialist(id: string): Promise<void> {
  const { error } = await supabase.from('specialists').delete().eq('id', id)
  if (error) throw error
}

export async function swapSpecialistOrder(a: AdminSpecialist, b: AdminSpecialist): Promise<void> {
  const { error: e1 } = await supabase.from('specialists').update({ sort_order: b.sort_order }).eq('id', a.id)
  if (e1) throw e1
  const { error: e2 } = await supabase.from('specialists').update({ sort_order: a.sort_order }).eq('id', b.id)
  if (e2) throw e2
}

// ---- Kompas (compass_entries, one row per world) ----

export async function fetchCompassEntry(worldId: string): Promise<string> {
  const { data, error } = await supabase
    .from('compass_entries')
    .select('background')
    .eq('world_id', worldId)
    .maybeSingle()
  if (error) throw error
  return data?.background ?? ''
}

export async function upsertCompassEntry(worldId: string, background: string): Promise<void> {
  const { error } = await supabase.from('compass_entries').upsert({ world_id: worldId, background })
  if (error) throw error
}

// ---- App config (e.g. Chat system prompt) ----

export async function fetchAppConfig(key: string): Promise<string> {
  const { data, error } = await supabase.from('app_config').select('value').eq('key', key).maybeSingle()
  if (error) throw error
  return data?.value ?? ''
}

export async function updateAppConfig(key: string, value: string): Promise<void> {
  const { error } = await supabase.from('app_config').upsert({ key, value, updated_at: new Date().toISOString() })
  if (error) throw error
}
