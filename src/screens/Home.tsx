import { useNavigate } from 'react-router-dom'
import { Clock, PlayCircle } from 'lucide-react'
import { lessons } from '../data/lessons'
import { useAppState } from '../state/AppStateContext'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { ProgressBand } from '../components/ProgressBand'
import { StreakNote } from '../components/StreakNote'

export function Home() {
  const navigate = useNavigate()
  const { todayLessonId, completedLessonIds, streakDays } = useAppState()
  const todayLesson = lessons.find((l) => l.id === todayLessonId) ?? lessons[0]
  const allDone = completedLessonIds.length === lessons.length

  return (
    <div className="flex flex-col gap-5 px-5 py-6">
      <div>
        <p className="text-label text-neutral-300">Vandaag</p>
        <h1 className="text-h2 text-neutral-900">Fijn dat je er bent</h1>
      </div>

      <StreakNote days={streakDays} />

      <Card className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-caption text-neutral-300">
          <Clock size={14} strokeWidth={2} />
          <span>Drie minuten · Wereld 6</span>
        </div>
        <h2 className="text-h3 text-neutral-900">
          {allDone ? 'Alle lessen van Wereld 6 zijn klaar' : todayLesson.title}
        </h2>
        {!allDone && (
          <Button onClick={() => navigate(`/les/${todayLesson.id}`)}>
            <PlayCircle size={18} strokeWidth={2} />
            Start de les
          </Button>
        )}
      </Card>

      <ProgressBand completed={completedLessonIds.length} total={lessons.length} />
    </div>
  )
}
