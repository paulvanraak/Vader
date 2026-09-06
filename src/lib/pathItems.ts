import { supabase } from './supabaseClient'

export type PathItemType = 'voor_jou' | 'reflectie'
export type ReflectieResponse = 'ging_goed' | 'lastig' | 'nog_niet'

export interface PathItem {
  id: string
  childId: string
  type: PathItemType
  status: 'pending' | 'done'
  title: string
  body: string
  sourceLessonId: string | null
  linkedActionId: string | null
  insertAfterLessonId: string | null
  response: ReflectieResponse | null
  createdAt: string
  resolvedAt: string | null
}

interface PathItemRow {
  id: string
  child_id: string
  type: PathItemType
  status: 'pending' | 'done'
  title: string
  body: string
  source_lesson_id: string | null
  linked_action_id: string | null
  insert_after_lesson_id: string | null
  response: ReflectieResponse | null
  created_at: string
  resolved_at: string | null
}

function rowToPathItem(row: PathItemRow): PathItem {
  return {
    id: row.id,
    childId: row.child_id,
    type: row.type,
    status: row.status,
    title: row.title,
    body: row.body,
    sourceLessonId: row.source_lesson_id,
    linkedActionId: row.linked_action_id,
    insertAfterLessonId: row.insert_after_lesson_id,
    response: row.response,
    createdAt: row.created_at,
    resolvedAt: row.resolved_at,
  }
}

export async function fetchPathItems(childId: string): Promise<PathItem[]> {
  const { data, error } = await supabase
    .from('path_items')
    .select('*')
    .eq('child_id', childId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return (data as PathItemRow[] | null ?? []).map(rowToPathItem)
}

// Reflectie-intermezzo: wordt aangemaakt zodra een checklist-actie is
// afgevinkt, en verschijnt de eerstvolgende keer dat het pad wordt geopend.
export async function createReflectieItem(params: {
  childId: string
  title: string
  body: string
  linkedActionId: string
  insertAfterLessonId: string | null
}): Promise<PathItem> {
  const { data, error } = await supabase
    .from('path_items')
    .insert({
      child_id: params.childId,
      type: 'reflectie',
      title: params.title,
      body: params.body,
      linked_action_id: params.linkedActionId,
      insert_after_lesson_id: params.insertAfterLessonId,
    })
    .select()
    .single()
  if (error) throw error
  return rowToPathItem(data as PathItemRow)
}

// Voor-jou-oefening: ontstaat wanneer een chatsuggestie wordt bevestigd.
export async function createVoorJouItem(params: {
  childId: string
  title: string
  body: string
  sourceLessonId: string | null
  insertAfterLessonId: string | null
}): Promise<PathItem> {
  const { data, error } = await supabase
    .from('path_items')
    .insert({
      child_id: params.childId,
      type: 'voor_jou',
      title: params.title,
      body: params.body,
      source_lesson_id: params.sourceLessonId,
      insert_after_lesson_id: params.insertAfterLessonId,
    })
    .select()
    .single()
  if (error) throw error
  return rowToPathItem(data as PathItemRow)
}

export async function resolveReflectieItem(itemId: string, response: ReflectieResponse): Promise<void> {
  const { error } = await supabase
    .from('path_items')
    .update({ status: 'done', response, resolved_at: new Date().toISOString() })
    .eq('id', itemId)
  if (error) throw error
}

export async function resolveVoorJouItem(itemId: string): Promise<void> {
  const { error } = await supabase
    .from('path_items')
    .update({ status: 'done', resolved_at: new Date().toISOString() })
    .eq('id', itemId)
  if (error) throw error
}
