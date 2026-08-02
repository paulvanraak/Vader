import { supabase } from './supabaseClient'
import type { ChildGender, AgeGroup, ChildProfile } from '../state/AppStateContext'

interface ChildRow {
  id: string
  name: string
  gender: ChildGender
  age_group: AgeGroup
  completed_lesson_ids: string[] | null
  done_action_ids: string[] | null
  streak_days: number | null
}

export interface ChildProgress {
  completedLessonIds: string[]
  doneActionIds: string[]
  streakDays: number
}

function rowToChild(row: ChildRow): ChildProfile {
  return { id: row.id, name: row.name, gender: row.gender, ageGroup: row.age_group }
}

function rowToProgress(row: ChildRow): ChildProgress {
  return {
    completedLessonIds: row.completed_lesson_ids ?? [],
    doneActionIds: row.done_action_ids ?? [],
    streakDays: row.streak_days ?? 0,
  }
}

export async function signUp(fatherName: string, email: string, password: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { father_name: fatherName } },
  })
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOutAccount() {
  await supabase.auth.signOut()
}

export async function fetchChildren(): Promise<{
  profiles: ChildProfile[]
  progress: Record<string, ChildProgress>
}> {
  const { data, error } = await supabase.from('children').select('*').order('created_at', { ascending: true })
  if (error) throw error
  const rows = (data ?? []) as ChildRow[]
  return {
    profiles: rows.map(rowToChild),
    progress: Object.fromEntries(rows.map((row) => [row.id, rowToProgress(row)])),
  }
}

export async function insertChild(child: {
  name: string
  gender: ChildGender
  ageGroup: AgeGroup
}): Promise<ChildProfile> {
  const { data: userRes, error: userError } = await supabase.auth.getUser()
  if (userError || !userRes.user) throw new Error('Niet ingelogd.')

  const { data, error } = await supabase
    .from('children')
    .insert({ user_id: userRes.user.id, name: child.name, gender: child.gender, age_group: child.ageGroup })
    .select()
    .single()
  if (error) throw error
  return rowToChild(data as ChildRow)
}

export async function updateChildProgress(
  childId: string,
  patch: Partial<{ completed_lesson_ids: string[]; done_action_ids: string[]; streak_days: number }>,
): Promise<void> {
  const { error } = await supabase.from('children').update(patch).eq('id', childId)
  if (error) throw error
}
