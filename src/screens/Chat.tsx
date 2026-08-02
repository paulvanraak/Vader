import { useEffect, useRef, useState } from 'react'
import { LifeBuoy, LoaderCircle, Send, Sparkles } from 'lucide-react'
import { triggersGuardrail, REFERRAL_TEXT } from '../lib/guardrail'
import { generateLocalAnswer } from '../lib/localAdvisor'
import { ChildSwitcher } from '../components/ChildSwitcher'
import { useAppState } from '../state/AppStateContext'
import { calculateAge } from '../lib/age'

type MessageRole = 'user' | 'answer' | 'referral' | 'error'

interface ChatMessage {
  role: MessageRole
  text: string
  parts: string[]
  demo?: boolean
  greeting?: boolean
}

interface ApiMessage {
  role: 'user' | 'assistant'
  content: string
}

// Variatie in de opener zodat de chat niet elke keer met dezelfde zin begint.
const GREETINGS = [
  'Hallo! Waar loop je tegenaan?',
  'Hoi, fijn dat je er bent. Wat speelt er?',
  'Hey! Vertel, wat wil je bespreken?',
  'Gedag! Waarmee kan ik je helpen?',
  'Dag! Wat houdt je bezig vandaag?',
  'Hoi! Wat wil je even doorpraten?',
]

function randomGreeting(): ChatMessage {
  const text = GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
  return { role: 'answer', text, parts: [text], greeting: true }
}

// Het model splitst een langer antwoord soms op in 2-3 losse berichten,
// gescheiden door een regel met alleen "|||", zodat het als losse appjes
// aanvoelt in plaats van één lange alinea.
function splitParts(text: string): string[] {
  return text
    .split(/\n?\|\|\|\n?/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function toApiMessages(msgs: ChatMessage[]): ApiMessage[] {
  return msgs
    .filter((m) => m.role === 'user' || (m.role === 'answer' && !m.demo && !m.greeting))
    .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }))
}

export function Chat() {
  const { activeChild } = useAppState()
  const [messages, setMessages] = useState<ChatMessage[]>(() => [randomGreeting()])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const latestRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Blijft staan bij de bovenste bubbel van het nieuwste bericht in plaats
  // van meteen helemaal naar beneden te springen, zodat je rustig van boven
  // naar onder kan meelezen terwijl de losse appjes verschijnen.
  useEffect(() => {
    latestRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [messages.length, isLoading])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [input])

  async function handleSubmit() {
    const question = input.trim()
    if (!question || isLoading) return

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', text: question, parts: [question] }]
    setMessages(nextMessages)
    setInput('')

    // De vangrail draait client-side, meteen, vóór er ooit een model wordt
    // aangeroepen, zodat dit ook zonder serverroute altijd werkt.
    if (triggersGuardrail(question)) {
      setMessages((prev) => [...prev, { role: 'referral', text: REFERRAL_TEXT, parts: [REFERRAL_TEXT] }])
      return
    }

    setIsLoading(true)
    try {
      const child = activeChild ? { name: activeChild.name, age: calculateAge(activeChild.birthDate) } : null
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: toApiMessages(nextMessages), child }),
      })
      if (!res.ok) throw new Error('serverroute niet beschikbaar')
      const data = (await res.json()) as { type: 'answer' | 'referral' | 'error'; text: string }
      const parts = data.type === 'answer' ? splitParts(data.text) : [data.text]
      setMessages((prev) => [...prev, { role: data.type, text: data.text, parts }])
    } catch {
      // Geen serverroute bereikbaar (bijvoorbeeld deze losstaande demo).
      // Geef een eerlijk gelabeld voorbeeldantwoord in plaats van alleen een foutmelding.
      const text = generateLocalAnswer(question)
      setMessages((prev) => [...prev, { role: 'answer', text, parts: splitParts(text), demo: true }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0">
        <ChildSwitcher />
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-5">
        <div className="mt-auto flex flex-col gap-1.5 py-3">
          {messages.map((message, index) => {
            const isLast = index === messages.length - 1
            return (
              <div key={index} ref={isLast && !isLoading ? latestRef : undefined} className="flex flex-col">
                <ChatBubble message={message} />
              </div>
            )
          })}
          {isLoading && (
            <div
              ref={latestRef}
              className="flex items-center gap-2 self-start rounded-2xl rounded-bl-sm bg-surface px-4 py-3 text-body text-ink-muted shadow-xs ring-1 ring-surface-sunken"
            >
              <LoaderCircle size={16} className="animate-spin" strokeWidth={2} />
              Denkt na
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 px-5 pb-5 pt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void handleSubmit()
          }}
          className="flex items-center gap-2 rounded-md bg-surface p-3 shadow-sm ring-1 ring-surface-sunken"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void handleSubmit()
              }
            }}
            rows={1}
            placeholder="Vraag iets, bijvoorbeeld: hij sluit zich steeds meer af"
            aria-label="Beschrijf de situatie"
            className="max-h-32 flex-1 resize-none overflow-y-auto rounded-md bg-surface px-3 py-2.5 text-body-lg text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Verstuur"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-500 text-neutral-white transition hover:bg-primary-600 disabled:opacity-50"
          >
            <Send size={17} strokeWidth={2} />
          </button>
        </form>
      </div>
    </div>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.role === 'user') {
    return (
      <p className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary-500 px-4 py-3 text-body-lg text-neutral-white">
        {message.text}
      </p>
    )
  }

  if (message.role === 'referral') {
    return (
      <div className="flex max-w-[85%] items-start gap-3 self-start rounded-2xl rounded-bl-sm bg-warning-500/15 px-4 py-3 ring-1 ring-warning-500/40">
        <LifeBuoy size={20} className="mt-0.5 shrink-0 text-accent-orange" strokeWidth={2} />
        <p className="text-body text-ink">{message.text}</p>
      </div>
    )
  }

  return (
    <div className="flex max-w-[85%] flex-col gap-1 self-start">
      {message.demo && (
        <span className="flex items-center gap-1 text-caption text-ink-muted">
          <Sparkles size={12} strokeWidth={2} />
          Voorbeeldantwoord, geen live verbinding
        </span>
      )}
      <div className="flex flex-col gap-1.5">
        {message.parts.map((part, index) => (
          <p
            key={index}
            style={{ animationDelay: `${index * 650}ms` }}
            className={`animate-bubble-in rounded-2xl rounded-bl-sm px-4 py-3 text-body-lg shadow-xs ring-1 ${
              message.role === 'error'
                ? 'bg-danger-500/10 text-danger-500 ring-danger-500/20'
                : 'bg-surface text-ink ring-surface-sunken'
            }`}
          >
            {part}
          </p>
        ))}
      </div>
    </div>
  )
}
