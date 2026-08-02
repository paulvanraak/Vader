import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import type { Lesson } from '../types/lesson'
import { lessonPath } from '../lib/worldProgress'
import { useContent } from './ContentContext'
import { supabase } from '../lib/supabaseClient'
import { fetchChildren, insertChild, updateChildProgress, signOutAccount } from '../lib/account'
import { deriveAgeGroup } from '../lib/age'

export type ChildGender = 'zoon' | 'dochter'
export type AgeGroup = 'jong' | 'oud'
export type Theme = 'light' | 'dark'

export interface ChildProfile {
  id: string
  name: string
  gender: ChildGender
  birthDate: string
}

interface ChildProgress {
  completedLessonIds: string[]
  doneActionIds: string[]
  streakDays: number
}

function emptyProgress(): ChildProgress {
  return { completedLessonIds: [], doneActionIds: [], streakDays: 0 }
}

interface AppState {
  authLoading: boolean
  childrenLoaded: boolean
  session: Session | null
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
  addChild: (child: Omit<ChildProfile, 'id'>) => Promise<void>
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
  const [authLoading, setAuthLoading] = useState(true)
  const [childrenLoaded, setChildrenLoaded] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const [pinVerified, setPinVerified] = useState(false)
  const [childList, setChildList] = useState<ChildProfile[]>([])
  const [activeChildId, setActiveChildId] = useState<string | null>(null)
  const [progressByChild, setProgressByChild] = useState<Record<string, ChildProgress>>({})
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const fatherName = (session?.user.user_metadata?.father_name as string | undefined) ?? null

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Volgt de Supabase-sessie: bij inloggen, uitloggen of een ververste token
  // wordt de rest van de state (kinderen, voortgang) hieronder herladen.
  useEffect(() => {
    let cancelled = false
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) {
        setSession(data.session)
        setAuthLoading(false)
      }
    })
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })
    return () => {
      cancelled = true
      subscription.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!session) {
      setChildList([])
      setProgressByChild({})
      setActiveChildId(null)
      setChildrenLoaded(true)
      return
    }
    let cancelled = false
    setChildrenLoaded(false)
    fetchChildren()
      .then(({ profiles, progress }) => {
        if (cancelled) return
        setChildList(profiles)
        setProgressByChild(progress)
        setActiveChildId((prev) => (prev && profiles.some((p) => p.id === prev) ? prev : (profiles[0]?.id ?? null)))
        setChildrenLoaded(true)
      })
      .catch((err) => {
        console.error('Kinderen ophalen mislukt:', err)
        if (!cancelled) setChildrenLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [session?.user.id])

  const activeChild = childList.find((c) => c.id === activeChildId) ?? null
  const progress = (activeChildId && progressByChild[activeChildId]) || emptyProgress()

  const path = useMemo(() => {
    if (!activeChild || activeChild.gender !== 'zoon') return []
    return lessonPath(lessons, deriveAgeGroup(activeChild.birthDate))
  }, [activeChild, lessons])

  const todayLessonId = useMemo(() => {
    if (path.length === 0) return null
    const next = path.find((lesson) => !progress.completedLessonIds.includes(lesson.id))
    return (next ?? path[0]).id
  }, [path, progress.completedLessonIds])

  // Werkt lokale state meteen bij (zodat de UI direct reageert) en synct
  // daarna op de achtergrond naar Supabase; een mislukte sync wordt gelogd
  // maar blokkeert de gebruiker niet.
  function updateActiveProgress(updater: (prev: ChildProgress) => ChildProgress) {
    if (!activeChildId) return
    const childId = activeChildId
    setProgressByChild((prev) => {
      const next = updater(prev[childId] ?? emptyProgress())
      void updateChildProgress(childId, {
        completed_lesson_ids: next.completedLessonIds,
        done_action_ids: next.doneActionIds,
        streak_days: next.streakDays,
      }).catch((err) => console.error('Voortgang opslaan mislukt:', err))
      return { ...prev, [childId]: next }
    })
  }

  const value: AppState = {
    authLoading,
    childrenLoaded,
    session,
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
    addChild: async (child) => {
      const newChild = await insertChild(child)
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
      setPinVerified(false)
      void signOutAccount()
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
