import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import { SYSTEM_PROMPT as DEFAULT_SYSTEM_PROMPT } from './systemPrompt.ts'
import { triggersGuardrail, REFERRAL_TEXT } from '../src/lib/guardrail.ts'

export type AskResult =
  | { type: 'answer'; text: string }
  | { type: 'referral'; text: string }
  | { type: 'error'; text: string }

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

// Haalt de systeemprompt op uit de CMS (app_config), zodat een wijziging in
// het admin-scherm meteen doorwerkt in het volgende Chat-antwoord. Valt terug
// op de vaste prompt in systemPrompt.ts als Supabase niet bereikbaar is.
async function getSystemPrompt(): Promise<string> {
  const url = process.env.VITE_SUPABASE_URL
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anonKey) return DEFAULT_SYSTEM_PROMPT

  try {
    const supabase = createClient(url, anonKey)
    const { data, error } = await supabase.from('app_config').select('value').eq('key', 'chat_system_prompt').single()
    if (error || !data?.value) return DEFAULT_SYSTEM_PROMPT
    return data.value
  } catch {
    return DEFAULT_SYSTEM_PROMPT
  }
}

export async function handleAsk(question: string): Promise<AskResult> {
  const trimmed = question.trim()
  if (!trimmed) {
    return { type: 'error', text: 'Stel een vraag om verder te gaan.' }
  }

  // De vangrail draait altijd vóór het model wordt aangeroepen.
  if (triggersGuardrail(trimmed)) {
    return { type: 'referral', text: REFERRAL_TEXT }
  }

  try {
    const systemPrompt = await getSystemPrompt()
    const response = await getClient().messages.create({
      model: MODEL,
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: 'user', content: trimmed }],
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
