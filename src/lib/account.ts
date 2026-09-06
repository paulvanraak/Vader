import { supabase } from './supabaseClient'
import type { ChildGender, ChildProfile } from '../state/AppStateContext'

interface ChildRow {
  id: string
  name: string
  gender: ChildGender
  birth_date: string
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
  return { id: row.id, name: row.name, gender: row.gender, birthDate: row.birth_date }
}

function rowToProgress(row: ChildRow): ChildProgress {
  return {
    completedLessonIds: row.completed_lesson_ids ?? [],
    doneActionIds: row.done_action_ids ?? [],
    streakDays: row.streak_days ?? 0,
  }
}

/**
 * Laag 1 en 2 van het inlogmodel: identiteit via e-mail, terugkeer op een nieuw
 * toestel via een zescijferige code uit de mail. Er bestaat bewust geen
 * wachtwoord — dat scheelt de vader een geheim en ons een lek.
 *
 * Laag 3 (Face ID of pincode) is géén serverauthenticatie maar een slot op de
 * sessie die al op het toestel staat; die leeft in src/lib/appLock.ts.
 */
export async function sendLoginCode(email: string, fatherName?: string) {
  return supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      ...(fatherName ? { data: { father_name: fatherName } } : {}),
    },
  })
}

export async function verifyLoginCode(email: string, token: string) {
  return supabase.auth.verifyOtp({ email, token, type: 'email' })
}

/**
 * Supabase geeft technische, Engelstalige foutteksten terug. Een vader die
 * afhaakt op "otp_expired" is een verloren testvader, dus vertalen we naar wat
 * er feitelijk aan de hand is en wat hij kan doen.
 */
export function describeAuthError(message: string): string {
  const m = message.toLowerCase()
  if (m.includes('expired')) return 'Deze code is verlopen. Vraag een nieuwe aan.'
  if (m.includes('invalid') || m.includes('incorrect')) return 'Deze code klopt niet. Controleer de cijfers uit de mail.'
  if (m.includes('rate limit') || m.includes('too many') || m.includes('security purposes')) {
    return 'Je hebt het te vaak geprobeerd. Wacht een minuut en probeer opnieuw.'
  }
  if (m.includes('email') && m.includes('valid')) return 'Dit lijkt geen geldig e-mailadres.'
  return 'Versturen is niet gelukt. Controleer je verbinding en probeer opnieuw.'
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
  birthDate: string
}): Promise<ChildProfile> {
  const { data: userRes, error: userError } = await supabase.auth.getUser()
  if (userError || !userRes.user) throw new Error('Niet ingelogd.')

  const { data, error } = await supabase
    .from('children')
    .insert({ user_id: userRes.user.id, name: child.name, gender: child.gender, birth_date: child.birthDate })
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
