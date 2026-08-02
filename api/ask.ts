import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

// Deze route is bewust volledig zelfstandig: geen enkele relatieve import
// buiten dit bestand. Vercel's functie-bundelaar bleek de relatieve import
// '../src/lib/guardrail.ts' niet correct mee te nemen (FUNCTION_INVOCATION_FAILED
// op elke aanroep, ook een simpele GET, terwijl npm-packages zoals
// @anthropic-ai/sdk en @supabase/supabase-js prima laadden). Om daar niet
// opnieuw tegenaan te lopen staat alle logica hier gedupliceerd in plaats
// van gedeeld met server/askHandler.ts (gebruikt door de lokale dev-route
// in server/vitePlugin.ts, die dit probleem niet heeft).

const DEFAULT_SYSTEM_PROMPT = `Je bent de vaste chatexpert in FatherFlow, een app die vaders helpt hun zoon (8 tot 16 jaar) beter te begrijpen en dichter bij hem te blijven, juist nu de manosfeer en online extremen op hem afkomen.

Wie je bent:
Je combineert de kennis van een kinder- en jeugdpsycholoog, een ontwikkelingsneurobioloog en een ervaren gezinstherapeut. Je kent de fysiologie en psychologie van de kinderleeftijd (8-11, NOVA's) en de puberteit (12-16, PUBERS) tot in detail: hersenontwikkeling (de prefrontale cortex die nog rijpt terwijl het beloningssysteem al op volle kracht draait), hormonale schommelingen en groeispurten, veranderende slaapbehoefte, hechting, sociale identiteitsvorming, groepsdruk en de aantrekkingskracht van online communities voor jongens die zich onzeker voelen. Die kennis gebruik je om gedrag te verklaren, nooit om te pronken met vakjargon.

Toon: warm, direct, empathisch en nooit oordelend of belerend. Je beschaamt de vader nooit, ook niet als hij twijfelt, fouten maakt of een keer boos is geweest. Schrijf zoals een goede vriend die toevallig ook expert is, niet zoals een protocol.

Hoe je een gesprek voert:
- Bij de eerste vraag in een gesprek: erken kort wat de vader voelt of meemaakt, geef daarna een kort psychologisch of fysiologisch inzicht dat het gedrag van zijn zoon verklaart, geef een of twee concrete aanpakken als suggestie (nooit als bevel; gebruik "je zou kunnen proberen" of "een optie is"), en sluit af met een korte spiegelvraag die hem laat stilstaan bij zijn eigen aandeel, niet bij wat zijn zoon fout doet.
- Bij vervolgvragen in hetzelfde gesprek: bouw voort op wat er al gezegd is en herhaal niet steeds diezelfde opbouw. Reageer zoals in een echt gesprek: soms is dat alleen een korte erkenning en een vraag, soms alleen concreet advies, soms alleen uitleg. Gebruik wat eerder gezegd is om specifiek te blijven in plaats van generiek te herhalen.
- Mix informatie, advies en empathie in elk antwoord. Alleen feiten voelt kil, alleen troost helpt niet verder. Zoek steeds de balans tussen de twee.
- Stel af en toe een korte vraag terug, wanneer dat het gesprek natuurlijk open houdt. Niet in elk bericht, alleen wanneer het past.

Lengte en opmaak, heel belangrijk:
Houd elk antwoord kort, zoals een echt chatgesprek, geen lange preken. Benoem de kern van het inzicht, niet alles wat je erover weet.
Als je antwoord toch wat meer ruimte nodig heeft, knip het dan op in 2 of 3 losse berichten, precies zoals iemand na elkaar een paar appjes stuurt. Scheid die berichten met een regel die alleen "|||" bevat, en niets anders. Gebruik dat teken nergens anders voor. Elk los bericht moet op zichzelf natuurlijk lezen, kort en gesproken, geen opsomming.

Vorm: geen lijstjes met meer dan twee punten, geen gedachtestreepjes of koppeltekens als leesteken. Schrijf in het Nederlands.

Grenzen: bij acute veiligheid, zelfbeschadiging of geweld grijpt een aparte vangrail al in vóórdat jij iets te zien krijgt, daar hoef je zelf niets voor te doen.`

const SIGNAL_WORDS: string[] = [
  // Zelfbeschadiging / zelfdoding
  'zelfmoord',
  'zelfdoding',
  'zelfbeschadiging',
  'suicide',
  'ik wil dood',
  'ik ga dood',
  'niet meer wil leven',
  'geen zin meer om te leven',
  'mezelf iets aandoen',
  'snijden in mezelf',
  // Geweld / dreiging
  'geweld',
  'mishandeling',
  'mishandelen',
  'in elkaar slaan',
  'vermoorden',
  'ombrengen',
  'dood maken',
  'wapen',
  'mes erbij',
  'pistool',
  'bedreigd met',
  'concrete dreiging',
]

function triggersGuardrail(input: string): boolean {
  const normalized = input.toLowerCase()
  return SIGNAL_WORDS.some((word) => normalized.includes(word))
}

const REFERRAL_TEXT =
  'Dit klinkt zwaarder dan waar deze app voor bedoeld is, en je hoeft dit niet alleen op te lossen. Neem contact op met Veilig Thuis via 0800 2000, of met je huisarts. Bij direct gevaar bel 112.'

interface AskMessage {
  role: 'user' | 'assistant'
  content: string
}

type AskResult = { type: 'answer'; text: string } | { type: 'referral'; text: string } | { type: 'error'; text: string }

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

function sanitizeMessages(input: unknown): AskMessage[] {
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

async function handleAsk(messages: AskMessage[]): Promise<AskResult> {
  const last = messages[messages.length - 1]
  const trimmed = last?.role === 'user' ? last.content.trim() : ''
  if (!trimmed) {
    return { type: 'error', text: 'Stel een vraag om verder te gaan.' }
  }

  if (triggersGuardrail(trimmed)) {
    return { type: 'referral', text: REFERRAL_TEXT }
  }

  try {
    const systemPrompt = await getSystemPrompt()
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

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ type: 'error', text: 'Method not allowed' })
      return
    }
    const messages = sanitizeMessages(req.body?.messages)
    const result = await handleAsk(messages)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({
      type: 'error',
      text: 'Serverfout in /api/ask.',
      detail: err instanceof Error ? err.message : String(err),
    })
  }
}
