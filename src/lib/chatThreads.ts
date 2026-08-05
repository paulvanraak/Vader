import { supabase } from './supabaseClient'

export interface StoredMessage {
  role: 'user' | 'answer' | 'referral' | 'error'
  text: string
  parts: string[]
}

export interface ChatThread {
  id: string
  title: string
  messages: StoredMessage[]
  pinned: boolean
  sortOrder: number
  updatedAt: string
}

interface ThreadRow {
  id: string
  title: string
  messages: StoredMessage[]
  pinned: boolean
  sort_order: number
  updated_at: string
}

function rowToThread(row: ThreadRow): ChatThread {
  return {
    id: row.id,
    title: row.title,
    messages: row.messages ?? [],
    pinned: row.pinned,
    sortOrder: row.sort_order,
    updatedAt: row.updated_at,
  }
}

// Titel wordt één keer bepaald bij het aanmaken van het gesprek, op basis
// van de eerste echte vraag van de vader, net als bij Claude's eigen chat.
function makeTitle(firstUserText: string): string {
  const trimmed = firstUserText.trim().replace(/\s+/g, ' ')
  if (trimmed.length <= 42) return trimmed
  return `${trimmed.slice(0, 42).trimEnd()}…`
}

// Ruwe telling voor badge-evaluatie ("eerste gesprek"). Threads zijn
// gekoppeld aan de vader (user_id), niet aan een specifiek kind, dus dit
// telt gesprekken over alle kinderen heen.
export async function fetchChatThreadCount(): Promise<number> {
  const { count, error } = await supabase.from('chat_threads').select('id', { count: 'exact', head: true })
  if (error) throw error
  return count ?? 0
}

export async function fetchThreads(): Promise<ChatThread[]> {
  const { data, error } = await supabase
    .from('chat_threads')
    .select('*')
    .order('pinned', { ascending: false })
    .order('sort_order', { ascending: false })
  if (error) throw error
  return (data ?? []).map(rowToThread)
}

export async function createThread(firstUserText: string, messages: StoredMessage[]): Promise<ChatThread> {
  const { data: userRes, error: userError } = await supabase.auth.getUser()
  if (userError || !userRes.user) throw new Error('Niet ingelogd.')

  const { data, error } = await supabase
    .from('chat_threads')
    .insert({
      user_id: userRes.user.id,
      title: makeTitle(firstUserText),
      messages,
      sort_order: Date.now(),
    })
    .select()
    .single()
  if (error) throw error
  return rowToThread(data as ThreadRow)
}

// bumpOrder tilt een niet-vastgezet gesprek naar de bovenkant van zijn groep
// bij een nieuw bericht, zoals een gewone chatapp. Voor vastgezette gesprekken
// wordt de volgorde met opzet niet aangeraakt, zodat verder chatten een
// handmatig gepinde volgorde niet doorelkaar gooit.
export async function updateThreadMessages(
  threadId: string,
  messages: StoredMessage[],
  bumpOrder: boolean,
): Promise<void> {
  const patch: Record<string, unknown> = { messages, updated_at: new Date().toISOString() }
  if (bumpOrder) patch.sort_order = Date.now()
  const { error } = await supabase.from('chat_threads').update(patch).eq('id', threadId)
  if (error) throw error
}

export async function deleteThread(threadId: string): Promise<void> {
  const { error } = await supabase.from('chat_threads').delete().eq('id', threadId)
  if (error) throw error
}

// Pinnen zet het gesprek meteen bovenaan zijn groep door het de nieuwste
// sort_order te geven.
export async function setThreadPinned(threadId: string, pinned: boolean): Promise<void> {
  const { error } = await supabase.from('chat_threads').update({ pinned, sort_order: Date.now() }).eq('id', threadId)
  if (error) throw error
}

export async function reorderThread(threadId: string, sortOrder: number): Promise<void> {
  const { error } = await supabase.from('chat_threads').update({ sort_order: sortOrder }).eq('id', threadId)
  if (error) throw error
}
