import { useState } from 'react'
import { Search, ChevronDown, Lock, CircleCheck, LifeBuoy, LoaderCircle, Send, Sparkles } from 'lucide-react'
import { lessons } from '../data/lessons'
import { worlds } from '../data/worlds'
import { compassEntries } from '../data/compass'
import { useAppState } from '../state/AppStateContext'
import { lessonsForWorld, isWorldComplete, isLessonUnlocked } from '../lib/worldProgress'
import { triggersGuardrail, REFERRAL_TEXT } from '../lib/guardrail'
import { generateLocalAnswer } from '../lib/localAdvisor'

type MessageRole = 'user' | 'answer' | 'referral' | 'error'

interface ChatMessage {
  role: MessageRole
  text: string
  demo?: boolean
}

export function Kompas() {
  const { completedLessonIds } = useAppState()
  const [query, setQuery] = useState('')
  const [expandedWorldId, setExpandedWorldId] = useState<number | null>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const hasChat = messages.length > 0

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
      setMessages((prev) => [...prev, { role: 'answer', text: generateLocalAnswer(question), demo: true }])
    } finally {
      setIsLoading(false)
    }
  }

  const orderedWorlds = [...worlds].reverse()

  const normalizedQuery = query.trim().toLowerCase()
  const filteredWorlds = orderedWorlds.filter((world) => {
    if (!normalizedQuery) return true
    const entry = compassEntries.find((e) => e.worldId === world.id)
    const worldLessons = lessonsForWorld(world.id)
    const haystack = [world.title, world.subtitle, entry?.background ?? '', ...worldLessons.map((l) => l.title)]
      .join(' ')
      .toLowerCase()
    return haystack.includes(normalizedQuery)
  })

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 px-5 pb-3 pt-6">
        <p className="text-label text-ink-muted">Kompas</p>
        <h1 className="text-h2 text-ink">Waar je op koerst</h1>
      </div>

      <div className="shrink-0 px-5 pb-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void handleSubmit()
          }}
          className="flex items-end gap-2 rounded-2xl bg-surface p-2 shadow-sm ring-1 ring-surface-sunken"
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
            placeholder="Vraag iets, bijvoorbeeld: hij sluit zich steeds meer af"
            aria-label="Beschrijf de situatie"
            className="max-h-24 flex-1 resize-none rounded-xl bg-surface-sunken px-3 py-2.5 text-body text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Verstuur"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-500 text-neutral-white transition hover:bg-primary-600 disabled:opacity-50"
          >
            <Send size={17} strokeWidth={2} />
          </button>
        </form>
      </div>

      {hasChat ? (
        <div className="flex-1 overflow-y-auto px-5">
          <div className="flex flex-col gap-3 py-2">
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
      ) : (
        <div className="flex-1 overflow-y-auto px-5">
          <div className="flex flex-col gap-5 pb-6">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
                strokeWidth={2}
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Zoek op onderwerp, bijvoorbeeld scherm of vergelijken"
                aria-label="Zoek in het kompas"
                className="w-full rounded-xl bg-surface-sunken py-3 pl-10 pr-4 text-body text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary-500"
              />
            </div>

            <div className="flex flex-col gap-3">
              {filteredWorlds.map((world) => {
                const entry = compassEntries.find((e) => e.worldId === world.id)
                const worldLessons = lessonsForWorld(world.id)
                const firstLessonIndex = lessons.findIndex((l) => l.world === world.id)
                const unlocked = isLessonUnlocked(firstLessonIndex, completedLessonIds)
                const complete = isWorldComplete(world.id, completedLessonIds)
                const isExpanded = expandedWorldId === world.id

                return (
                  <div
                    key={world.id}
                    className="flex flex-col overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-surface-sunken"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedWorldId(isExpanded ? null : world.id)}
                      aria-expanded={isExpanded}
                      className="flex w-full items-center gap-3 p-4 text-left"
                    >
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                          complete
                            ? 'bg-success-500/15 text-success-500'
                            : unlocked
                              ? 'bg-primary-500/10 text-primary-600'
                              : 'bg-surface-sunken text-ink-faint'
                        }`}
                      >
                        {complete ? (
                          <CircleCheck size={18} strokeWidth={2} />
                        ) : unlocked ? (
                          <span className="text-label">{world.id}</span>
                        ) : (
                          <Lock size={16} strokeWidth={2} />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-caption text-ink-muted">
                          Wereld {world.id} {!unlocked && '· nog op slot'}
                        </p>
                        <p className="truncate text-body-lg text-ink">{world.title}</p>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-ink-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        strokeWidth={2}
                      />
                    </button>

                    {isExpanded && (
                      <div className="flex flex-col gap-3 border-t border-surface-sunken px-4 pb-4 pt-3">
                        <p className="text-body text-ink-muted">{entry?.background}</p>
                        <div className="flex flex-col gap-1.5">
                          <p className="text-label text-ink">Lessen in deze wereld</p>
                          {worldLessons.map((lesson, index) => (
                            <p key={lesson.id} className="text-caption text-ink-muted">
                              {index + 1}. {lesson.title}
                              {completedLessonIds.includes(lesson.id) ? ' · afgerond' : ''}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
              {filteredWorlds.length === 0 && (
                <p className="text-body text-ink-muted">Niets gevonden voor "{query}".</p>
              )}
            </div>
          </div>
        </div>
      )}
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
