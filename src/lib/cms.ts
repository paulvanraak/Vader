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
