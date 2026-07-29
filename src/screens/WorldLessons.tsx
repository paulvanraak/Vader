import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CircleCheck, Circle } from 'lucide-react'
import { worlds } from '../data/worlds'
import { useAppState } from '../state/AppStateContext'
import { Card } from '../components/Card'
import { lessonsForWorld, isWorldUnlocked } from '../lib/worldProgress'

export function WorldLessons() {
  const navigate = useNavigate()
  const { worldId } = useParams<{ worldId: string }>()
  const { completedLessonIds } = useAppState()

  const world = worlds.find((w) => w.id === Number(worldId))
  if (!world) {
    return <Navigate to="/leerboom" replace />
  }
  if (!isWorldUnlocked(world.id, completedLessonIds)) {
    return <Navigate to="/leerboom" replace />
  }

  const worldLessons = lessonsForWorld(world.id)

  return (
    <div className="flex flex-col gap-5 px-5 py-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/leerboom')}
          aria-label="Terug naar werelden"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-neutral-300 hover:bg-neutral-100"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
        <div className="min-w-0">
          <p className="text-label text-neutral-300">Wereld {world.id}</p>
          <h1 className="truncate text-h2 text-neutral-900">{world.title}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {worldLessons.map((lesson, index) => {
          const isDone = completedLessonIds.includes(lesson.id)
          return (
            <Card
              key={lesson.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/les/${lesson.id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  navigate(`/les/${lesson.id}`)
                }
              }}
              className="flex cursor-pointer items-center gap-3 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              {isDone ? (
                <CircleCheck size={22} className="shrink-0 text-success-500" strokeWidth={2} />
              ) : (
                <Circle size={22} className="shrink-0 text-neutral-400" strokeWidth={2} />
              )}
              <div className="min-w-0">
                <p className="text-caption text-neutral-300">Les {index + 1}</p>
                <p className="truncate text-body-lg text-neutral-900">{lesson.title}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
