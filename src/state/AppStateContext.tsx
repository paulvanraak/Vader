import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { lessons } from '../data/lessons'

export type Concern =
  | 'scherm'
  | 'influencer'
  | 'opmerking'
  | 'onbekend'

interface AppState {
  onboardingComplete: boolean
  concern: Concern | null
  streakDays: number
  completedLessonIds: string[]
  todayLessonId: string
  completeOnboarding: (concern: Concern) => void
  completeLesson: (lessonId: string) => void
}

const AppStateContext = createContext<AppState | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [concern, setConcern] = useState<Concern | null>(null)
  const [streakDays, setStreakDays] = useState(3)
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([])

  const todayLessonId = useMemo(() => {
    const next = lessons.find((lesson) => !completedLessonIds.includes(lesson.id))
    return (next ?? lessons[0]).id
  }, [completedLessonIds])

  const value: AppState = {
    onboardingComplete,
    concern,
    streakDays,
    completedLessonIds,
    todayLessonId,
    completeOnboarding: (selectedConcern) => {
      setConcern(selectedConcern)
      setOnboardingComplete(true)
    },
    completeLesson: (lessonId) => {
      setCompletedLessonIds((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]))
      setStreakDays((prev) => prev + 1)
    },
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateContext)
  if (!ctx) {
    throw new Error('useAppState moet binnen AppStateProvider gebruikt worden.')
  }
  return ctx
}
