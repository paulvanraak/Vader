import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lesson } from '../types/lesson'
import { lessonPath } from '../lib/worldProgress'
import { useContent } from './ContentContext'

export type ChildGender = 'zoon' | 'dochter'
export type AgeGroup = 'jong' | 'oud'
export type Theme = 'light' | 'dark'

export interface ChildProfile {
  id: string
  name: string
  gender: ChildGender
  ageGroup: AgeGroup
}

interface ChildProgress {
  completedLessonIds: string[]
  doneActionIds: string[]
  streakDays: number
}

function emptyProgress(): ChildProgress {
  return { completedLessonIds: [], doneActionIds: [], streakDays: 0 }
}

function makeChildId(): string {
  return `child-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

interface AppState {
  onboardingComplete: boolean
  pinVerified: boolean
  verifyPin: (pin: string) => boolean
  fatherName: string | null
  children: ChildProfile[]
  activeChildId: string | null
  activeChild: ChildProfile | null
  setActiveChildId: (id: string) => void
  path: Lesson[]
  streakDays: number
  completedLessonIds: string[]
  todayLessonId: string | null
  theme: Theme
  toggleTheme: () => void
  doneActionIds: string[]
  toggleAction: (actionId: string) => void
  completeOnboarding: (fatherName: string, children: ChildProfile[]) => void
  addChild: (child: Omit<ChildProfile, 'id'>) => void
  completeLesson: (lessonId: string) => void
  logout: () => void
}

const AppStateContext = createContext<AppState | null>(null)

const PIN_CODE = '12345'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function AppStateProvider({ children: providerChildren }: { children: ReactNode }) {
  const { lessons } = useContent()
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [pinVerified, setPinVerified] = useState(false)
  const [fatherName, setFatherName] = useState<string | null>(null)
  const [childList, setChildList] = useState<ChildProfile[]>([])
  const [activeChildId, setActiveChildId] = useState<string | null>(null)
  const [progressByChild, setProgressByChild] = useState<Record<string, ChildProgress>>({})
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const activeChild = childList.find((c) => c.id === activeChildId) ?? null
  const progress = (activeChildId && progressByChild[activeChildId]) || emptyProgress()

  const path = useMemo(() => {
    if (!activeChild || activeChild.gender !== 'zoon') return []
    return lessonPath(lessons, activeChild.ageGroup)
  }, [activeChild, lessons])

  const todayLessonId = useMemo(() => {
    if (path.length === 0) return null
    const next = path.find((lesson) => !progress.completedLessonIds.includes(lesson.id))
    return (next ?? path[0]).id
  }, [path, progress.completedLessonIds])

  function updateActiveProgress(updater: (prev: ChildProgress) => ChildProgress) {
    if (!activeChildId) return
    setProgressByChild((prev) => ({
      ...prev,
      [activeChildId]: updater(prev[activeChildId] ?? emptyProgress()),
    }))
  }

  const value: AppState = {
    onboardingComplete,
    pinVerified,
    verifyPin: (pin) => {
      const ok = pin === PIN_CODE
      if (ok) setPinVerified(true)
      return ok
    },
    fatherName,
    children: childList,
    activeChildId,
    activeChild,
    setActiveChildId,
    path,
    streakDays: progress.streakDays,
    completedLessonIds: progress.completedLessonIds,
    todayLessonId,
    theme,
    toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    doneActionIds: progress.doneActionIds,
    toggleAction: (actionId) => {
      updateActiveProgress((prev) => ({
        ...prev,
        doneActionIds: prev.doneActionIds.includes(actionId)
          ? prev.doneActionIds.filter((id) => id !== actionId)
          : [...prev.doneActionIds, actionId],
      }))
    },
    completeOnboarding: (selectedFatherName, selectedChildren) => {
      const withIds = selectedChildren.map((c) => ({ ...c, id: c.id || makeChildId() }))
      setFatherName(selectedFatherName)
      setChildList(withIds)
      setActiveChildId(withIds[0]?.id ?? null)
      setProgressByChild(Object.fromEntries(withIds.map((c) => [c.id, emptyProgress()])))
      setOnboardingComplete(true)
    },
    addChild: (child) => {
      const newChild: ChildProfile = { ...child, id: makeChildId() }
      setChildList((prev) => [...prev, newChild])
      setProgressByChild((prev) => ({ ...prev, [newChild.id]: emptyProgress() }))
      setActiveChildId(newChild.id)
    },
    completeLesson: (lessonId) => {
      updateActiveProgress((prev) => ({
        ...prev,
        completedLessonIds: prev.completedLessonIds.includes(lessonId)
          ? prev.completedLessonIds
          : [...prev.completedLessonIds, lessonId],
        streakDays: prev.streakDays + 1,
      }))
    },
    logout: () => {
      setOnboardingComplete(false)
      setPinVerified(false)
      setFatherName(null)
      setChildList([])
      setActiveChildId(null)
      setProgressByChild({})
    },
  }

  return <AppStateContext.Provider value={value}>{providerChildren}</AppStateContext.Provider>
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateContext)
  if (!ctx) {
    throw new Error('useAppState moet binnen AppStateProvider gebruikt worden.')
  }
  return ctx
}
