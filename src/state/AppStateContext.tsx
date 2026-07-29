import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { lessons } from '../data/lessons'

export type ChildGender = 'zoon' | 'dochter'
export type AgeGroup = 'jong' | 'oud'
export type Theme = 'light' | 'dark'

interface AppState {
  onboardingComplete: boolean
  fatherName: string | null
  childGender: ChildGender | null
  ageGroup: AgeGroup | null
  streakDays: number
  completedLessonIds: string[]
  todayLessonId: string
  theme: Theme
  toggleTheme: () => void
  doneActionIds: string[]
  toggleAction: (actionId: string) => void
  completeOnboarding: (fatherName: string, childGender: ChildGender, ageGroup: AgeGroup) => void
  completeLesson: (lessonId: string) => void
}

const AppStateContext = createContext<AppState | null>(null)

function getInitialTheme(): Theme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [fatherName, setFatherName] = useState<string | null>(null)
  const [childGender, setChildGender] = useState<ChildGender | null>(null)
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null)
  const [streakDays, setStreakDays] = useState(3)
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([])
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [doneActionIds, setDoneActionIds] = useState<string[]>([])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const todayLessonId = useMemo(() => {
    const next = lessons.find((lesson) => !completedLessonIds.includes(lesson.id))
    return (next ?? lessons[0]).id
  }, [completedLessonIds])

  const value: AppState = {
    onboardingComplete,
    fatherName,
    childGender,
    ageGroup,
    streakDays,
    completedLessonIds,
    todayLessonId,
    theme,
    toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    doneActionIds,
    toggleAction: (actionId) => {
      setDoneActionIds((prev) =>
        prev.includes(actionId) ? prev.filter((id) => id !== actionId) : [...prev, actionId],
      )
    },
    completeOnboarding: (selectedFatherName, selectedGender, selectedAgeGroup) => {
      setFatherName(selectedFatherName)
      setChildGender(selectedGender)
      setAgeGroup(selectedAgeGroup)
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
