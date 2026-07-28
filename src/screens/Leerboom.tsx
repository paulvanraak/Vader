import { useNavigate } from 'react-router-dom'
import { CircleCheck, Circle } from 'lucide-react'
import { lessons } from '../data/lessons'
import { useAppState } from '../state/AppStateContext'
import { Card } from '../components/Card'

export function Leerboom() {
  const navigate = useNavigate()
  const { completedLessonIds } = useAppState()

  return (
    <div className="flex flex-col gap-5 px-5 py-6">
      <div>
        <p className="text-label text-neutral-300">Wereld 6</p>
        <h1 className="text-h2 text-neutral-900">De online wereld</h1>
      </div>

      <div className="flex flex-col gap-3">
        {lessons.map((lesson, index) => {
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
