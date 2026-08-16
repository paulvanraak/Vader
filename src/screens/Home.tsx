import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Lock, Play, MessageCircle, HelpCircle, X } from 'lucide-react'
import { isLessonUnlocked } from '../lib/worldProgress'
import { getWorldStyle } from '../lib/worldStyles'
import { useAppState } from '../state/AppStateContext'
import { useContent } from '../state/ContentContext'
import { ChildSwitcher } from '../components/ChildSwitcher'
import { FeatureExplainer } from '../components/FeatureExplainer'
import type { PathItem, ReflectieResponse } from '../lib/pathItems'

const REFLECTIE_OPTIES: { value: ReflectieResponse; label: string }[] = [
  { value: 'ging_goed', label: 'Ging goed' },
  { value: 'lastig', label: 'Lastig' },
  { value: 'nog_niet', label: 'Nog niet gedaan' },
]

function ReflectieRow({ item, onOpen }: { item: PathItem; onOpen: () => void }) {
  const isDone = item.status === 'done'
  return (
    <div className="flex w-full items-center gap-1.5">
      <div className="flex w-14 shrink-0 flex-col items-center">
        <div className="h-6 border-l-2 border-dashed border-ink-faint" />
        <button
          type="button"
          onClick={onOpen}
          aria-label={item.title}
          className={`flex size-10 rotate-45 items-center justify-center rounded-md border-2 transition ${
            isDone
              ? 'border-transparent bg-success-500/20 text-success-600'
              : 'border-dashed border-ink-faint bg-surface text-ink-muted hover:border-primary-500'
          }`}
        >
          <span className="-rotate-45">
            {isDone ? <Check size={14} strokeWidth={3} /> : <HelpCircle size={14} strokeWidth={2} />}
          </span>
        </button>
      </div>
      <p className="flex-1 truncate text-left text-[13px] italic text-ink-muted">{item.body}</p>
    </div>
  )
}

function VoorJouRow({ item, onOpen }: { item: PathItem; onOpen: () => void }) {
  const isDone = item.status === 'done'
  return (
    <div className="flex w-full items-center gap-1.5">
      <div className="flex w-14 shrink-0 flex-col items-center">
        <div className="h-6 border-l-2 border-dashed border-primary-500/50" />
        <button
          type="button"
          onClick={onOpen}
          aria-label={item.title}
          className={`flex size-14 items-center justify-center rounded-full border-4 border-transparent transition ${
            isDone
              ? 'bg-success-500 text-neutral-white'
              : 'bg-primary-500/10 text-primary-600 ring-1 ring-primary-500/40 hover:ring-2'
          }`}
        >
          {isDone ? <Check size={20} strokeWidth={3} /> : <MessageCircle size={18} strokeWidth={2} />}
        </button>
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-600">Voor jou</p>
        <p className="truncate text-[13px] text-ink-muted">{item.title}</p>
      </div>
    </div>
  )
}

function ReflectieSheet({ item, onClose }: { item: PathItem; onClose: () => void }) {
  const { resolveReflectie } = useAppState()
  const [isSaving, setIsSaving] = useState(false)

  async function choose(response: ReflectieResponse) {
    setIsSaving(true)
    try {
      await resolveReflectie(item.id, response)
      onClose()
    } catch (err) {
      console.error('Reflectie opslaan mislukt:', err)
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        onClick={(e) => e.stopPropagation()}
        className="animate-dissolve w-full max-w-[420px] rounded-lg border border-surface-sunken bg-surface p-6 shadow-lg"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
            <HelpCircle size={22} strokeWidth={2} />
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Sluiten"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <p className="mt-4 text-caption uppercase tracking-wide text-ink-muted">Even terugblikken</p>
        <p className="mt-1 font-serif text-h4 font-semibold text-ink">{item.body}</p>
        <div className="mt-5 flex flex-col gap-2">
          {REFLECTIE_OPTIES.map((optie) => (
            <button
              key={optie.value}
              type="button"
              disabled={isSaving}
              onClick={() => void choose(optie.value)}
              className="rounded-md bg-surface-sunken px-4 py-3 text-body-lg font-semibold text-ink transition hover:bg-primary-500/10 disabled:opacity-50"
            >
              {optie.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function VoorJouSheet({ item, onClose }: { item: PathItem; onClose: () => void }) {
  const { resolveVoorJou } = useAppState()
  const [isSaving, setIsSaving] = useState(false)
  const isDone = item.status === 'done'

  async function markDone() {
    setIsSaving(true)
    try {
      await resolveVoorJou(item.id)
      onClose()
    } catch (err) {
      console.error('Voor-jou-oefening afronden mislukt:', err)
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        onClick={(e) => e.stopPropagation()}
        className="animate-dissolve w-full max-w-[420px] rounded-lg border border-surface-sunken bg-surface p-6 shadow-lg"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
            <MessageCircle size={20} strokeWidth={2} />
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Sluiten"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <p className="mt-4 text-caption uppercase tracking-wide text-primary-600">Voor jou, uit je gesprek</p>
        <p className="mt-1 font-serif text-h4 font-semibold text-ink">{item.title}</p>
        <p className="mt-3 text-body-lg leading-relaxed text-ink-muted">{item.body}</p>
        {!isDone && (
          <button
            type="button"
            disabled={isSaving}
            onClick={() => void markDone()}
            className="mt-5 w-full rounded-md bg-primary-500 px-4 py-3 text-label font-bold text-neutral-white transition hover:bg-primary-600 disabled:opacity-50"
          >
            {isSaving ? 'Bezig...' : 'Dit hebben we geprobeerd'}
          </button>
        )}
      </div>
    </div>
  )
}

export function Home() {
  const navigate = useNavigate()
  const { path, todayLessonId, completedLessonIds, pathItems } = useAppState()
  const { worlds } = useContent()
  const [activeReflectie, setActiveReflectie] = useState<PathItem | null>(null)
  const [activeVoorJou, setActiveVoorJou] = useState<PathItem | null>(null)

  let lastWorldId: number | null = null
  const lastLessonId = path.length > 0 ? path[path.length - 1].id : null
  const trailingItems = pathItems.filter(
    (item) => !item.insertAfterLessonId || !path.some((l) => l.id === item.insertAfterLessonId),
  )

  return (
    <div className="flex flex-col">
      <ChildSwitcher />
      <div className="flex flex-col py-5 pl-5 pr-3">
        {path.map((lesson, index) => {
          const world = worlds.find((w) => w.id === lesson.world)
          const showBanner = lesson.world !== lastWorldId
          lastWorldId = lesson.world
          const style = getWorldStyle(lesson.world)

          const isDone = completedLessonIds.includes(lesson.id)
          const isCurrent = lesson.id === todayLessonId && !isDone
          const unlocked = isLessonUnlocked(path, index, completedLessonIds)
          const anchoredItems = pathItems.filter((item) => item.insertAfterLessonId === lesson.id)

          return (
            <div key={lesson.id} className="flex w-full flex-col">
              {showBanner && world && (
                <div className={`z-10 my-6 flex w-full items-center justify-between rounded-lg py-4 pl-6 pr-5 ${style.softBg}`}>
                  <div className="text-left">
                    <p className="font-serif text-h2 font-semibold text-ink">{world.title}</p>
                    <p className="text-body text-ink-muted">{world.subtitle}</p>
                  </div>
                  <p className={`font-serif text-display font-semibold ${style.text}`}>{world.id}</p>
                </div>
              )}

              <div className="flex w-full items-center gap-1.5">
                <div className="flex w-14 shrink-0 flex-col items-center">
                  {!showBanner && (
                    <div className="h-6 border-l-2 border-dashed" style={{ borderColor: style.accentVar }} />
                  )}
                  <button
                    type="button"
                    disabled={!unlocked}
                    onClick={() => unlocked && navigate(`/les/${lesson.id}`)}
                    aria-label={`Les ${index + 1}: ${lesson.title}`}
                    className={`flex items-center justify-center rounded-full transition ${
                      isDone
                        ? 'size-14 bg-success-500 text-neutral-white'
                        : isCurrent
                          ? `size-14 ${style.solidBg} text-neutral-white`
                          : unlocked
                            ? `size-14 ${style.softBg} ${style.text}`
                            : 'size-11 cursor-not-allowed bg-surface-sunken text-ink-faint'
                    }`}
                  >
                    {isDone ? (
                      <Check size={22} strokeWidth={3} />
                    ) : isCurrent ? (
                      <Play size={20} strokeWidth={2} fill="currentColor" />
                    ) : unlocked ? (
                      <span className="text-body-lg text-ink">{index + 1}</span>
                    ) : (
                      <Lock size={16} strokeWidth={2.5} />
                    )}
                  </button>
                </div>
                <p className="flex-1 truncate text-left text-[13px] leading-normal text-ink-muted">{lesson.title}</p>
              </div>

              {anchoredItems.map((item) =>
                item.type === 'reflectie' ? (
                  <ReflectieRow key={item.id} item={item} onOpen={() => setActiveReflectie(item)} />
                ) : (
                  <VoorJouRow key={item.id} item={item} onOpen={() => setActiveVoorJou(item)} />
                ),
              )}
            </div>
          )
        })}

        {lastLessonId &&
          trailingItems.map((item) =>
            item.type === 'reflectie' ? (
              <ReflectieRow key={item.id} item={item} onOpen={() => setActiveReflectie(item)} />
            ) : (
              <VoorJouRow key={item.id} item={item} onOpen={() => setActiveVoorJou(item)} />
            ),
          )}
      </div>

      {activeReflectie && <ReflectieSheet item={activeReflectie} onClose={() => setActiveReflectie(null)} />}
      {activeVoorJou && <VoorJouSheet item={activeVoorJou} onClose={() => setActiveVoorJou(null)} />}
      <FeatureExplainer id="pad" />
    </div>
  )
}
