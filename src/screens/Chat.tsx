import { useEffect, useRef, useState } from 'react'
import { History, LifeBuoy, LoaderCircle, Send, Sparkles, Plus, X } from 'lucide-react'
import { triggersGuardrail, REFERRAL_TEXT } from '../lib/guardrail'
import { generateLocalAnswer } from '../lib/localAdvisor'
import { ChildSwitcher } from '../components/ChildSwitcher'
import { ChatHistoryPanel } from '../components/ChatHistoryPanel'
import { FeatureExplainer } from '../components/FeatureExplainer'
import { useAppState } from '../state/AppStateContext'
import { calculateAge } from '../lib/age'
import {
  fetchThreads,
  createThread,
  updateThreadMessages,
  deleteThread,
  setThreadPinned,
  reorderThread,
  type ChatThread,
  type StoredMessage,
} from '../lib/chatThreads'

type MessageRole = 'user' | 'answer' | 'referral' | 'error'

interface ChatSuggestion {
  title: string
  body: string
}

interface ChatMessage {
  role: MessageRole
  text: string
  parts: string[]
  demo?: boolean
  greeting?: boolean
  suggestion?: ChatSuggestion
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

const SUGGESTIE_PATTERN = /^\*{0,2}SUGGESTIE:\*{0,2}\s*(.+?)\s*\|\s*(.+?)\*{0,2}$/i

// Het model zet een pad-suggestie als absoluut laatste bericht-deel na een
// "|||". Die wordt hier losgeknipt van de gewone tekstballonnen, zodat hij
// apart als kaart getoond kan worden. Tolerant voor hoofdletters en losse
// markdown-vetdruk, voor het geval het model daarvan afwijkt.
function extractSuggestion(text: string): { parts: string[]; suggestion: ChatSuggestion | undefined } {
  const parts = splitParts(text)
  const last = parts[parts.length - 1]
  const match = last?.match(SUGGESTIE_PATTERN)
  if (!match) return { parts, suggestion: undefined }
  return { parts: parts.slice(0, -1), suggestion: { title: match[1].trim(), body: match[2].trim() } }
}

function toApiMessages(msgs: ChatMessage[]): ApiMessage[] {
  return msgs
    .filter((m) => m.role === 'user' || (m.role === 'answer' && !m.demo && !m.greeting))
    .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }))
}

// Wat écht bewaard wordt: de begroeting en het "voorbeeldantwoord"-label
// horen niet in de opgeslagen geschiedenis, alleen de echte uitwisseling.
function toStoredMessages(msgs: ChatMessage[]): StoredMessage[] {
  return msgs
    .filter((m) => !m.greeting)
    .map((m) => ({ role: m.role, text: m.text, parts: m.parts, suggestion: m.suggestion }))
}

function fromStoredMessages(msgs: StoredMessage[]): ChatMessage[] {
  return msgs.map((m) => ({ role: m.role, text: m.text, parts: m.parts, suggestion: m.suggestion }))
}

const GREETING_DELAY_MS = 2000

export function Chat() {
  const { activeChild, addVoorJouItem } = useAppState()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isGreetingPending, setIsGreetingPending] = useState(true)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [threads, setThreads] = useState<ChatThread[]>([])
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [suggestionStatus, setSuggestionStatus] = useState<Record<number, 'added' | 'dismissed'>>({})
  const latestRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  async function handleAddSuggestion(index: number, suggestion: ChatSuggestion) {
    try {
      await addVoorJouItem(suggestion)
      setSuggestionStatus((prev) => ({ ...prev, [index]: 'added' }))
    } catch (err) {
      console.error('Suggestie toevoegen aan pad mislukt:', err)
    }
  }

  // De eerste opener komt niet meteen, maar pas na een korte stilte, zodat
  // het niet aanvoelt alsof de bot al klaarzat te wachten.
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prev) => (prev.length === 0 ? [randomGreeting()] : prev))
      setIsGreetingPending(false)
    }, GREETING_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    fetchThreads()
      .then(setThreads)
      .catch((err) => console.error('Gesprekken laden mislukt:', err))
  }, [])

  // Blijft staan bij de bovenste bubbel van het nieuwste bericht in plaats
  // van meteen helemaal naar beneden te springen, zodat je rustig van boven
  // naar onder kan meelezen terwijl de losse appjes verschijnen.
  useEffect(() => {
    latestRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [messages.length, isLoading, isGreetingPending])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [input])

  async function persist(updated: ChatMessage[]) {
    const stored = toStoredMessages(updated)
    if (stored.length === 0) return
    try {
      if (activeThreadId) {
        const current = threads.find((t) => t.id === activeThreadId)
        await updateThreadMessages(activeThreadId, stored, !current?.pinned)
        setThreads((prev) =>
          prev
            .map((t) =>
              t.id === activeThreadId
                ? {
                    ...t,
                    messages: stored,
                    updatedAt: new Date().toISOString(),
                    sortOrder: t.pinned ? t.sortOrder : Date.now(),
                  }
                : t,
            )
            .sort((a, b) => (a.pinned === b.pinned ? b.sortOrder - a.sortOrder : a.pinned ? -1 : 1)),
        )
        return
      }
      const firstUser = stored.find((m) => m.role === 'user')
      if (!firstUser) return
      const thread = await createThread(firstUser.text, stored)
      setActiveThreadId(thread.id)
      setThreads((prev) => [thread, ...prev])
    } catch (err) {
      console.error('Gesprek opslaan mislukt:', err)
    }
  }

  async function handleSubmit() {
    const question = input.trim()
    if (!question || isLoading) return

    const withUser: ChatMessage[] = [...messages, { role: 'user', text: question, parts: [question] }]
    setMessages(withUser)
    setInput('')

    // De vangrail draait client-side, meteen, vóór er ooit een model wordt
    // aangeroepen, zodat dit ook zonder serverroute altijd werkt.
    if (triggersGuardrail(question)) {
      const final = [...withUser, { role: 'referral' as const, text: REFERRAL_TEXT, parts: [REFERRAL_TEXT] }]
      setMessages(final)
      void persist(final)
      return
    }

    setIsLoading(true)
    try {
      const child = activeChild ? { name: activeChild.name, age: calculateAge(activeChild.birthDate) } : null
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: toApiMessages(withUser), child }),
      })
      if (!res.ok) throw new Error('serverroute niet beschikbaar')
      const data = (await res.json()) as { type: 'answer' | 'referral' | 'error'; text: string }
      const { parts, suggestion } =
        data.type === 'answer' ? extractSuggestion(data.text) : { parts: [data.text], suggestion: undefined }
      const final = [...withUser, { role: data.type, text: data.text, parts, suggestion }]
      setMessages(final)
      void persist(final)
    } catch {
      // Geen serverroute bereikbaar (bijvoorbeeld deze losstaande demo).
      // Geef een eerlijk gelabeld voorbeeldantwoord in plaats van alleen een foutmelding.
      const text = generateLocalAnswer(question)
      const final = [...withUser, { role: 'answer' as const, text, parts: splitParts(text), demo: true }]
      setMessages(final)
      void persist(final)
    } finally {
      setIsLoading(false)
    }
  }

  function startNewChat() {
    setMessages([randomGreeting()])
    setIsGreetingPending(false)
    setActiveThreadId(null)
    setIsPanelOpen(false)
  }

  function openThread(thread: ChatThread) {
    setMessages(fromStoredMessages(thread.messages))
    setIsGreetingPending(false)
    setActiveThreadId(thread.id)
    setIsPanelOpen(false)
  }

  async function handleDeleteThread(thread: ChatThread) {
    if (!confirm(`Gesprek "${thread.title}" verwijderen?`)) return
    try {
      await deleteThread(thread.id)
      setThreads((prev) => prev.filter((t) => t.id !== thread.id))
      if (activeThreadId === thread.id) {
        startNewChat()
      }
    } catch (err) {
      console.error('Gesprek verwijderen mislukt:', err)
    }
  }

  async function handleTogglePin(thread: ChatThread) {
    const nextPinned = !thread.pinned
    setThreads((prev) =>
      prev
        .map((t) => (t.id === thread.id ? { ...t, pinned: nextPinned, sortOrder: Date.now() } : t))
        .sort((a, b) => (a.pinned === b.pinned ? b.sortOrder - a.sortOrder : a.pinned ? -1 : 1)),
    )
    try {
      await setThreadPinned(thread.id, nextPinned)
    } catch (err) {
      console.error('Vastzetten mislukt:', err)
    }
  }

  function handleMoveThread(thread: ChatThread, direction: 'up' | 'down') {
    setThreads((prevAll) => {
      const group = prevAll.filter((t) => t.pinned === thread.pinned).sort((a, b) => b.sortOrder - a.sortOrder)
      const idx = group.findIndex((t) => t.id === thread.id)
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1
      if (idx === -1 || targetIdx < 0 || targetIdx >= group.length) return prevAll
      const target = group[targetIdx]
      const newSelfOrder = target.sortOrder
      const newTargetOrder = thread.sortOrder
      void reorderThread(thread.id, newSelfOrder)
      void reorderThread(target.id, newTargetOrder)
      return prevAll
        .map((t) => {
          if (t.id === thread.id) return { ...t, sortOrder: newSelfOrder }
          if (t.id === target.id) return { ...t, sortOrder: newTargetOrder }
          return t
        })
        .sort((a, b) => (a.pinned === b.pinned ? b.sortOrder - a.sortOrder : a.pinned ? -1 : 1))
    })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-2 px-2 pt-2">
        <button
          type="button"
          onClick={() => setIsPanelOpen(true)}
          aria-label="Gespreksgeschiedenis"
          className="flex size-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
        >
          <History size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="shrink-0">
        <ChildSwitcher />
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-5">
        <div className="mt-auto flex flex-col gap-3 py-3">
          {messages.map((message, index) => {
            const isLast = index === messages.length - 1
            return (
              <div key={index} ref={isLast && !isLoading ? latestRef : undefined} className="flex flex-col">
                <ChatBubble message={message} />
                {message.suggestion && suggestionStatus[index] !== 'dismissed' && (
                  <SuggestionCard
                    suggestion={message.suggestion}
                    added={suggestionStatus[index] === 'added'}
                    onAdd={() => void handleAddSuggestion(index, message.suggestion!)}
                    onDismiss={() => setSuggestionStatus((prev) => ({ ...prev, [index]: 'dismissed' }))}
                  />
                )}
              </div>
            )
          })}
          {isGreetingPending && messages.length === 0 && (
            <div ref={latestRef}>
              <TypingDots />
            </div>
          )}
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

      <ChatHistoryPanel
        open={isPanelOpen}
        threads={threads}
        activeThreadId={activeThreadId}
        onClose={() => setIsPanelOpen(false)}
        onSelect={openThread}
        onNewChat={startNewChat}
        onDelete={(thread) => void handleDeleteThread(thread)}
        onTogglePin={(thread) => void handleTogglePin(thread)}
        onMove={handleMoveThread}
      />
      <FeatureExplainer id="chat" />
    </div>
  )
}

function SuggestionCard({
  suggestion,
  added,
  onAdd,
  onDismiss,
}: {
  suggestion: ChatSuggestion
  added: boolean
  onAdd: () => void
  onDismiss: () => void
}) {
  if (added) {
    return (
      <div className="mt-1 max-w-[85%] self-start rounded-2xl bg-success-500/10 px-4 py-3 text-body text-success-700 ring-1 ring-success-500/30">
        Toegevoegd aan je pad.
      </div>
    )
  }

  return (
    <div className="mt-1 flex max-w-[85%] flex-col gap-2 self-start rounded-2xl bg-primary-500/10 px-4 py-3 ring-1 ring-primary-500/30">
      <p className="text-caption font-semibold uppercase tracking-wide text-primary-600">Voor jou, op je pad?</p>
      <p className="text-body-lg text-ink">{suggestion.title}</p>
      <p className="text-body text-ink-muted">{suggestion.body}</p>
      <div className="mt-1 flex gap-2">
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-md bg-primary-500 px-3 py-2 text-caption font-bold text-neutral-white transition hover:bg-primary-600"
        >
          <Plus size={14} strokeWidth={2.5} />
          Toevoegen aan pad
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="flex items-center gap-1.5 rounded-md px-3 py-2 text-caption font-semibold text-ink-muted transition hover:bg-surface-sunken"
        >
          <X size={14} strokeWidth={2.5} />
          Niet nu
        </button>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex w-fit items-center gap-1.5 self-start rounded-2xl rounded-bl-sm bg-surface px-4 py-3.5 shadow-xs ring-1 ring-surface-sunken">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{ animationDelay: `${i * 150}ms` }}
          className="size-1.5 animate-bounce rounded-full bg-ink-faint"
        />
      ))}
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
      <div className="flex flex-col gap-2.5">
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
