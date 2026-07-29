import { useNavigate } from 'react-router-dom'
import { CircleCheck, Lock, ChevronRight } from 'lucide-react'
import { worlds } from '../data/worlds'
import { useAppState } from '../state/AppStateContext'
import { Card } from '../components/Card'
import { lessonsForWorld, isWorldComplete, isWorldUnlocked } from '../lib/worldProgress'

export function Leerboom() {
  const navigate = useNavigate()
  const { completedLessonIds } = useAppState()

  return (
    <div className="flex flex-col gap-5 px-5 py-6">
      <div>
        <p className="text-label text-ink-muted">Leerboom</p>
        <h1 className="text-h2 text-ink">Werelden</h1>
      </div>

      <div className="flex flex-col gap-3">
        {worlds.map((world, index) => {
          const worldLessons = lessonsForWorld(world.id)
          const done = worldLessons.filter((lesson) => completedLessonIds.includes(lesson.id)).length
          const complete = isWorldComplete(world.id, completedLessonIds)
          const unlocked = isWorldUnlocked(world.id, completedLessonIds)

          return (
            <Card
              key={world.id}
              role="button"
              tabIndex={unlocked ? 0 : -1}
              aria-disabled={!unlocked}
              onClick={() => unlocked && navigate(`/leerboom/${world.id}`)}
              onKeyDown={(e) => {
                if (unlocked && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  navigate(`/leerboom/${world.id}`)
                }
              }}
              className={`flex items-center gap-4 transition ${
                unlocked
                  ? 'cursor-pointer hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                  : 'opacity-60'
              }`}
            >
              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-full text-label ${
                  complete
                    ? 'bg-success-500/15 text-success-500'
                    : unlocked
                      ? 'bg-primary-500/10 text-primary-600'
                      : 'bg-surface-sunken text-ink-faint'
                }`}
              >
                {complete ? (
                  <CircleCheck size={22} strokeWidth={2} />
                ) : unlocked ? (
                  <span aria-hidden="true">{index + 4}</span>
                ) : (
                  <Lock size={18} strokeWidth={2} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-caption text-ink-muted">
                  Wereld {world.id} · {done}/{worldLessons.length} lessen
                </p>
                <p className="truncate text-body-lg text-ink">{world.title}</p>
                <p className="truncate text-caption text-ink-muted">{world.subtitle}</p>
              </div>
              {unlocked && <ChevronRight size={18} className="shrink-0 text-ink-muted" strokeWidth={2} />}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
