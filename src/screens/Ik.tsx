import { User } from 'lucide-react'
import { lessons } from '../data/lessons'
import { useAppState } from '../state/AppStateContext'
import { Card } from '../components/Card'
import { ThemeToggle } from '../components/ThemeToggle'

const genderLabel: Record<string, string> = {
  zoon: 'zoon',
  dochter: 'dochter',
}

const ageLabel: Record<string, string> = {
  jong: 'acht tot elf jaar',
  oud: 'twaalf tot zestien jaar',
}

export function Ik() {
  const { childGender, ageGroup, streakDays, completedLessonIds } = useAppState()

  return (
    <div className="flex flex-col gap-5 px-5 py-6">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
          <User size={24} strokeWidth={2} />
        </div>
        <div>
          <p className="text-caption text-ink-muted">Jouw profiel</p>
          <p className="text-h4 text-ink">
            {childGender ? genderLabel[childGender] : 'Kind'} van {ageGroup ? ageLabel[ageGroup] : 'onbekende leeftijd'}
          </p>
        </div>
      </div>

      <Card className="flex flex-col gap-3">
        <div className="flex justify-between text-body">
          <span className="text-ink-muted">Streak</span>
          <span className="text-ink">{streakDays} dagen</span>
        </div>
        <div className="flex justify-between text-body">
          <span className="text-ink-muted">Lessen afgerond</span>
          <span className="text-ink">
            {completedLessonIds.length} van {lessons.length}
          </span>
        </div>
      </Card>

      <div>
        <p className="mb-2 text-label text-ink-muted">Weergave</p>
        <ThemeToggle />
      </div>
    </div>
  )
}
