import { useNavigate } from 'react-router-dom'
import { PlayCircle } from 'lucide-react'
import { lessons } from '../data/lessons'
import { worlds } from '../data/worlds'
import { lessonsForWorld } from '../lib/worldProgress'
import { useAppState } from '../state/AppStateContext'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { StreakNote } from '../components/StreakNote'

export function Home() {
  const navigate = useNavigate()
  const { todayLessonId, completedLessonIds, streakDays } = useAppState()
  const todayLesson = lessons.find((l) => l.id === todayLessonId) ?? lessons[0]
  const allDone = completedLessonIds.length === lessons.length
  const world = worlds.find((w) => w.id === todayLesson.world)
  const worldLessons = lessonsForWorld(todayLesson.world)
  const lessonPosition = worldLessons.findIndex((l) => l.id === todayLesson.id) + 1

  return (
    <div className="flex flex-col gap-5 px-5 py-6">
      <div>
        <p className="text-label text-ink-muted">Vandaag</p>
        <h1 className="text-h2 text-ink">Fijn dat je er bent</h1>
      </div>

      <StreakNote days={streakDays} />

      <div className="rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 p-5 text-neutral-white shadow-md">
        <p className="text-caption uppercase tracking-wide text-neutral-white/70">Je bent hier</p>
        <p className="mt-1 text-display font-extrabold leading-none">Wereld {world?.id}</p>
        <p className="mt-2 text-body-lg font-semibold">{world?.title}</p>
        {!allDone && (
          <p className="mt-1 text-caption text-neutral-white/70">
            Les {lessonPosition} van {worldLessons.length}
          </p>
        )}
      </div>

      <Card className="flex flex-col gap-4">
        <h2 className="text-h3 text-ink">{allDone ? 'Alle werelden zijn klaar' : todayLesson.title}</h2>
        {!allDone && (
          <Button onClick={() => navigate(`/les/${todayLesson.id}`)}>
            <PlayCircle size={18} strokeWidth={2} />
            Start de les
          </Button>
        )}
      </Card>
    </div>
  )
}
