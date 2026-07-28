import { User } from 'lucide-react'
import { lessons } from '../data/lessons'
import { useAppState, type Concern } from '../state/AppStateContext'
import { Card } from '../components/Card'

const concernLabels: Record<Concern, string> = {
  scherm: 'Hij hangt aan zijn scherm',
  influencer: 'Hij citeert een influencer',
  opmerking: 'Er valt weleens een rare opmerking',
  onbekend: 'Nog niet goed in beeld',
}

export function Ik() {
  const { concern, streakDays, completedLessonIds } = useAppState()

  return (
    <div className="flex flex-col gap-5 px-5 py-6">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
          <User size={24} strokeWidth={2} />
        </div>
        <div>
          <p className="text-caption text-neutral-300">Jouw profiel</p>
          <p className="text-h4 text-neutral-900">Zoon van twaalf tot zestien</p>
        </div>
      </div>

      <Card className="flex flex-col gap-3">
        <div className="flex justify-between text-body">
          <span className="text-neutral-300">Wat er speelt</span>
          <span className="text-neutral-900">{concern ? concernLabels[concern] : 'Nog niet ingevuld'}</span>
        </div>
        <div className="flex justify-between text-body">
          <span className="text-neutral-300">Streak</span>
          <span className="text-neutral-900">{streakDays} dagen</span>
        </div>
        <div className="flex justify-between text-body">
          <span className="text-neutral-300">Lessen afgerond</span>
          <span className="text-neutral-900">
            {completedLessonIds.length} van {lessons.length}
          </span>
        </div>
      </Card>
    </div>
  )
}
