import { useState } from 'react'
import { LifeBuoy, LoaderCircle, Send, Sparkles } from 'lucide-react'
import { triggersGuardrail, REFERRAL_TEXT } from '../lib/guardrail'
import { generateLocalAnswer } from '../lib/localAdvisor'

type MessageRole = 'user' | 'answer' | 'referral' | 'error'

interface ChatMessage {
  role: MessageRole
  text: string
  demo?: boolean
}

export function AskScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit() {
    const question = input.trim()
    if (!question || isLoading) return

    setMessages((prev) => [...prev, { role: 'user', text: question }])
    setInput('')

    // De vangrail draait client-side, meteen, vóór er ooit een model wordt
    // aangeroepen, zodat dit ook zonder serverroute altijd werkt.
    if (triggersGuardrail(question)) {
      setMessages((prev) => [...prev, { role: 'referral', text: REFERRAL_TEXT }])
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      if (!res.ok) throw new Error('serverroute niet beschikbaar')
      const data = (await res.json()) as { type: 'answer' | 'referral' | 'error'; text: string }
      setMessages((prev) => [...prev, { role: data.type, text: data.text }])
    } catch {
      // Geen serverroute bereikbaar (bijvoorbeeld deze losstaande demo).
      // Geef een eerlijk gelabeld voorbeeldantwoord in plaats van alleen een foutmelding.
      setMessages((prev) => [
        ...prev,
        { role: 'answer', text: generateLocalAnswer(question), demo: true },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 px-5 pb-3 pt-6">
        <p className="text-label text-ink-muted">Vraag het</p>
        <h1 className="text-h2 text-ink">Wat speelt er?</h1>
        <p className="mt-2 text-caption text-ink-muted">
          Deze app is geen therapie en geen crisisdienst. Bij direct gevaar bel 112.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        {messages.length === 0 && (
          <p className="mt-4 text-body-lg text-ink-muted">
            Beschrijf de situatie in je eigen woorden. Je krijgt een kort, concreet antwoord.
          </p>
        )}

        <div className="flex flex-col gap-3 py-4">
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 self-start rounded-2xl bg-surface px-4 py-3 text-body text-ink-muted shadow-xs ring-1 ring-surface-sunken">
              <LoaderCircle size={16} className="animate-spin" strokeWidth={2} />
              Denkt na
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          void handleSubmit()
        }}
        className="flex shrink-0 items-end gap-2 border-t border-surface-sunken bg-surface px-4 py-3"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              void handleSubmit()
            }
          }}
          rows={1}
          placeholder="Beschrijf de situatie…"
          aria-label="Beschrijf de situatie"
          className="max-h-24 flex-1 resize-none rounded-xl bg-surface-sunken px-4 py-3 text-body text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          aria-label="Verstuur"
          className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-500 text-neutral-white transition hover:bg-primary-600 disabled:opacity-50"
        >
          <Send size={18} strokeWidth={2} />
        </button>
      </form>
    </div>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.role === 'user') {
    return (
      <p className="max-w-[85%] self-end rounded-2xl bg-primary-500 px-4 py-3 text-body-lg text-neutral-white">
        {message.text}
      </p>
    )
  }

  if (message.role === 'referral') {
    return (
      <div className="flex max-w-[85%] items-start gap-3 self-start rounded-2xl bg-warning-500/15 px-4 py-3 ring-1 ring-warning-500/40">
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
      <p
        className={`rounded-2xl px-4 py-3 text-body-lg shadow-xs ring-1 ${
          message.role === 'error'
            ? 'bg-danger-500/10 text-danger-500 ring-danger-500/20'
            : 'bg-surface text-ink ring-surface-sunken'
        }`}
      >
        {message.text}
      </p>
    </div>
  )
}
