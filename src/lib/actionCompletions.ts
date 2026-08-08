import { supabase } from './supabaseClient'

export interface ActionCompletion {
  actionId: string
  completedAt: string
}

export async function fetchActionCompletions(childId: string): Promise<ActionCompletion[]> {
  const { data, error } = await supabase
    .from('action_completions')
    .select('action_id, completed_at')
    .eq('child_id', childId)
    .order('completed_at', { ascending: true })
  if (error) throw error
  return (data ?? []).map((row: { action_id: string; completed_at: string }) => ({
    actionId: row.action_id,
    completedAt: row.completed_at,
  }))
}

export async function logActionCompletion(childId: string, actionId: string): Promise<ActionCompletion> {
  const { data, error } = await supabase
    .from('action_completions')
    .insert({ child_id: childId, action_id: actionId })
    .select('action_id, completed_at')
    .single()
  if (error) throw error
  return { actionId: data.action_id, completedAt: data.completed_at }
}
