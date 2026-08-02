import { useState } from 'react'
import { Search, ChevronDown, Lock, CircleCheck } from 'lucide-react'
import { useAppState } from '../state/AppStateContext'
import { useContent } from '../state/ContentContext'
import { lessonsForWorld, isWorldComplete, isLessonUnlocked } from '../lib/worldProgress'
import { ChildSwitcher } from '../components/ChildSwitcher'

export function Kompas() {
  const { path, completedLessonIds } = useAppState()
  const { worlds, compassEntries } = useContent()
  const [query, setQuery] = useState('')
  const [expandedWorldId, setExpandedWorldId] = useState<number | null>(null)

  const orderedWorlds = [...worlds].reverse()

  const normalizedQuery = query.trim().toLowerCase()
  const filteredWorlds = orderedWorlds.filter((world) => {
    if (!normalizedQuery) return true
    const entry = compassEntries.find((e) => e.worldId === world.id)
    const worldLessons = lessonsForWorld(path, world.id)
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

      <ChildSwitcher />

      <div className="flex-1 overflow-y-auto px-5">
        <div className="flex flex-col gap-5 py-4 pb-6">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" strokeWidth={2} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek op onderwerp, bijvoorbeeld scherm of vergelijken"
              aria-label="Zoek in het kompas"
              className="w-full rounded-md bg-surface-sunken py-3 pl-10 pr-4 text-body text-ink outline-none placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-primary-500"
            />
          </div>

          <div className="flex flex-col gap-3">
            {filteredWorlds.map((world) => {
              const entry = compassEntries.find((e) => e.worldId === world.id)
              const worldLessons = lessonsForWorld(path, world.id)
              const firstLessonIndex = path.findIndex((l) => l.world === world.id)
              const unlocked = firstLessonIndex === -1 ? false : isLessonUnlocked(path, firstLessonIndex, completedLessonIds)
              const complete = isWorldComplete(path, world.id, completedLessonIds)
              const isExpanded = expandedWorldId === world.id

              return (
                <div
                  key={world.id}
                  className="flex flex-col overflow-hidden rounded-md bg-surface shadow-sm ring-1 ring-surface-sunken"
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
                      {!unlocked && <p className="text-caption text-ink-muted">Nog op slot</p>}
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
                        <p className="text-label text-ink">Lessen in dit onderdeel</p>
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
    </div>
  )
}
