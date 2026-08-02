import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import { SYSTEM_PROMPT as DEFAULT_SYSTEM_PROMPT } from './systemPrompt.ts'
import { triggersGuardrail, REFERRAL_TEXT } from '../src/lib/guardrail.ts'

export type AskResult =
  | { type: 'answer'; text: string }
  | { type: 'referral'; text: string }
  | { type: 'error'; text: string }

export interface AskMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChildContext {
  name: string
  age: number
}

export function sanitizeChild(input: unknown): ChildContext | null {
  if (typeof input !== 'object' || input === null) return null
  const name = (input as { name?: unknown }).name
  const age = (input as { age?: unknown }).age
  if (typeof name !== 'string' || !name.trim()) return null
  if (typeof age !== 'number' || !Number.isFinite(age)) return null
  return { name: name.trim(), age }
}

// Bevestig de actuele modelnaam op docs.claude.com. Standaard: Claude Sonnet 5.
const MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-5'

let client: Anthropic | null = null

function getClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY ontbreekt in de serveromgeving.')
    }
    client = new Anthropic({ apiKey })
  }
  return client
}

// Ruwe invoer uit het request-lichaam wordt hier gevalideerd tot een schone
// berichtenlijst, zodat zowel de dev-route (vitePlugin.ts) als de
// serverless-route (api/ask.ts) dezelfde controle delen.
export function sanitizeMessages(input: unknown): AskMessage[] {
  if (!Array.isArray(input)) return []
  return input
    .map((entry): AskMessage | null => {
      if (typeof entry !== 'object' || entry === null) return null
      const role = (entry as { role?: unknown }).role === 'assistant' ? 'assistant' : 'user'
      const content = (entry as { content?: unknown }).content
      if (typeof content !== 'string' || !content.trim()) return null
      return { role, content }
    })
    .filter((m): m is AskMessage => m !== null)
}

// Haalt de systeemprompt op uit de CMS (app_config), zodat een wijziging in
// het admin-scherm meteen doorwerkt in het volgende Chat-antwoord. Valt terug
// op de vaste prompt in systemPrompt.ts als Supabase niet bereikbaar is.
async function getSystemPrompt(child: ChildContext | null): Promise<string> {
  const url = process.env.VITE_SUPABASE_URL
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY

  let base = DEFAULT_SYSTEM_PROMPT
  if (url && anonKey) {
    try {
      const supabase = createClient(url, anonKey)
      const { data, error } = await supabase
        .from('app_config')
        .select('value')
        .eq('key', 'chat_system_prompt')
        .single()
      if (!error && data?.value) base = data.value
    } catch {
      // val terug op DEFAULT_SYSTEM_PROMPT
    }
  }

  if (!child) return base

  return `${base}\n\nContext: de vader praat over zijn kind, ${child.name}, ${child.age} jaar oud. Gebruik de naam ${child.name} in je antwoorden in plaats van generieke termen als "je zoon", "hij" of "hem", zodat het echt persoonlijk aanvoelt.`
}

// messages bevat het hele gesprek tot nu toe (client stuurt steeds de volledige
// historie mee), zodat het model met echt geheugen kan reageren in plaats van
// elke vraag los te beantwoorden.
export async function handleAsk(messages: AskMessage[], child: ChildContext | null = null): Promise<AskResult> {
  const last = messages[messages.length - 1]
  const trimmed = last?.role === 'user' ? last.content.trim() : ''
  if (!trimmed) {
    return { type: 'error', text: 'Stel een vraag om verder te gaan.' }
  }

  // De vangrail draait altijd vóór het model wordt aangeroepen, en kijkt
  // alleen naar het nieuwste bericht van de vader.
  if (triggersGuardrail(trimmed)) {
    return { type: 'referral', text: REFERRAL_TEXT }
  }

  try {
    const systemPrompt = await getSystemPrompt(child)
    const response = await getClient().messages.create({
      model: MODEL,
      max_tokens: 700,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    })

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim()

    return { type: 'answer', text: text || 'Sorry, daar kwam geen antwoord uit. Probeer het nog eens.' }
  } catch (err) {
    console.error('Vraag het / Claude API fout:', err)
    return {
      type: 'error',
      text: 'Er ging iets mis bij het ophalen van een antwoord. Probeer het zo weer.',
    }
  }
}
