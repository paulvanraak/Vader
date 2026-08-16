import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import type { Lesson } from '../types/lesson'
import { lessonPath } from '../lib/worldProgress'
import { useContent } from './ContentContext'
import { supabase } from '../lib/supabaseClient'
import { fetchChildren, insertChild, updateChildProgress, signOutAccount } from '../lib/account'
import { deriveAgeGroup } from '../lib/age'
import { getAllActions } from '../lib/actions'
import {
  fetchPathItems,
  createReflectieItem,
  createVoorJouItem,
  resolveReflectieItem,
  resolveVoorJouItem,
  type PathItem,
  type ReflectieResponse,
} from '../lib/pathItems'
import { fetchActionCompletions, logActionCompletion, type ActionCompletion } from '../lib/actionCompletions'
import { computeConnectionStreakWeeks } from '../lib/streak'
import { evaluateBadges, fetchEarnedBadges, awardBadges } from '../lib/badges'
import { fetchChatThreadCount } from '../lib/chatThreads'
import { resetProgressForChild } from '../lib/resetProgress'

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
  pathItems: PathItem[]
  connectionStreakWeeks: number
  earnedBadgeCodes: Record<string, string>
  resolveReflectie: (itemId: string, response: ReflectieResponse) => Promise<void>
  resolveVoorJou: (itemId: string) => Promise<void>
  addVoorJouItem: (item: { title: string; body: string }) => Promise<void>
  resetProgress: (childId: string) => Promise<void>
}

const AppStateContext = createContext<AppState | null>(null)

function getInitialTheme(): Theme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function AppStateProvider({ children: providerChildren }: { children: ReactNode }) {
  const { lessons, worlds } = useContent()
  const [authLoading, setAuthLoading] = useState(true)
  const [childrenLoaded, setChildrenLoaded] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const [childList, setChildList] = useState<ChildProfile[]>([])
  const [activeChildId, setActiveChildId] = useState<string | null>(null)
  const [progressByChild, setProgressByChild] = useState<Record<string, ChildProgress>>({})
  const [pathItemsByChild, setPathItemsByChild] = useState<Record<string, PathItem[]>>({})
  const [actionCompletionsByChild, setActionCompletionsByChild] = useState<Record<string, ActionCompletion[]>>({})
  const [earnedBadgesByChild, setEarnedBadgesByChild] = useState<Record<string, Record<string, string>>>({})
  const [chatThreadCount, setChatThreadCount] = useState(0)
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
      setPathItemsByChild({})
      setActionCompletionsByChild({})
      setEarnedBadgesByChild({})
      setChatThreadCount(0)
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

        // Extra data voor het doorlopende pad (badges, streak, reflecties)
        // laden op de achtergrond; blokkeert de rest van de app niet.
        void fetchChatThreadCount()
          .then((count) => {
            if (!cancelled) setChatThreadCount(count)
          })
          .catch((err) => console.error('Aantal gesprekken ophalen mislukt:', err))

        for (const profile of profiles) {
          void Promise.all([
            fetchPathItems(profile.id),
            fetchActionCompletions(profile.id),
            fetchEarnedBadges(profile.id),
          ])
            .then(([items, completions, earned]) => {
              if (cancelled) return
              setPathItemsByChild((prev) => ({ ...prev, [profile.id]: items }))
              setActionCompletionsByChild((prev) => ({ ...prev, [profile.id]: completions }))
              setEarnedBadgesByChild((prev) => ({ ...prev, [profile.id]: earned }))
            })
            .catch((err) => console.error('Padgegevens ophalen mislukt:', err))
        }
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
  const pathItems = (activeChildId && pathItemsByChild[activeChildId]) || []
  const actionCompletions = (activeChildId && actionCompletionsByChild[activeChildId]) || []
  const earnedBadgeCodes = (activeChildId && earnedBadgesByChild[activeChildId]) || {}

  const path = useMemo(() => {
    if (!activeChild || activeChild.gender !== 'zoon') return []
    return lessonPath(lessons, deriveAgeGroup(activeChild.birthDate, activeChild.gender))
  }, [activeChild, lessons])

  const todayLessonId = useMemo(() => {
    if (path.length === 0) return null
    const next = path.find((lesson) => !progress.completedLessonIds.includes(lesson.id))
    return (next ?? path[0]).id
  }, [path, progress.completedLessonIds])

  const connectionStreakWeeks = useMemo(
    () => computeConnectionStreakWeeks(actionCompletions.map((c) => c.completedAt)),
    [actionCompletions],
  )

  // Kernlogica voor het badgesysteem: wordt na elke relevante mutatie
  // aangeroepen (les afgerond, actie afgevinkt, reflectie ingevuld, "voor
  // jou"-oefening afgesloten). Neemt de huidige state als basis, met
  // optionele overrides voor waarden die net gewijzigd zijn maar de state
  // nog niet hebben bereikt (React batcht setState asynchroon).
  async function evaluateAndAwardBadges(overrides: {
    completedLessonIds?: string[]
    actionCompletionsCount?: number
    connectionStreakWeeks?: number
    resolvedReflectionCount?: number
    resolvedTopicTitles?: string[]
  }) {
    if (!activeChildId) return
    const childId = activeChildId
    const currentItems = pathItemsByChild[childId] ?? []
    const alreadyEarned = new Set(Object.keys(earnedBadgesByChild[childId] ?? {}))

    const newly = evaluateBadges({
      worlds,
      path,
      completedLessonIds: overrides.completedLessonIds ?? progress.completedLessonIds,
      chatThreadCount,
      actionCompletionsCount: overrides.actionCompletionsCount ?? actionCompletions.length,
      connectionStreakWeeks: overrides.connectionStreakWeeks ?? connectionStreakWeeks,
      resolvedReflectionCount:
        overrides.resolvedReflectionCount ??
        currentItems.filter((i) => i.type === 'reflectie' && i.status === 'done').length,
      resolvedTopicTitles: overrides.resolvedTopicTitles ?? [],
      alreadyEarnedCodes: alreadyEarned,
    })
    if (newly.length === 0) return

    const codes = newly.map((b) => b.code)
    try {
      await awardBadges(childId, codes)
      setEarnedBadgesByChild((prev) => {
        const existing = prev[childId] ?? {}
        const now = new Date().toISOString()
        const merged = { ...existing }
        for (const code of codes) merged[code] = now
        return { ...prev, [childId]: merged }
      })
    } catch (err) {
      console.error('Badge toekennen mislukt:', err)
    }
  }

  const value: AppState = {
    authLoading,
    childrenLoaded,
    session,
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
      if (!activeChildId) return
      const childId = activeChildId
      const prevProgress = progressByChild[childId] ?? emptyProgress()
      const turningOn = !prevProgress.doneActionIds.includes(actionId)
      const nextDone = turningOn
        ? [...prevProgress.doneActionIds, actionId]
        : prevProgress.doneActionIds.filter((id) => id !== actionId)
      const nextProgress: ChildProgress = { ...prevProgress, doneActionIds: nextDone }
      setProgressByChild((prev) => ({ ...prev, [childId]: nextProgress }))
      void updateChildProgress(childId, {
        completed_lesson_ids: nextProgress.completedLessonIds,
        done_action_ids: nextProgress.doneActionIds,
        streak_days: nextProgress.streakDays,
      }).catch((err) => console.error('Voortgang opslaan mislukt:', err))

      if (!turningOn) return

      // Loggen voor de connectie-streak, en een reflectie-intermezzo
      // klaarzetten voor de eerstvolgende keer dat het pad wordt geopend.
      void (async () => {
        try {
          const completion = await logActionCompletion(childId, actionId)
          const prevCompletions = actionCompletionsByChild[childId] ?? []
          setActionCompletionsByChild((prev) => ({ ...prev, [childId]: [...prevCompletions, completion] }))

          const items = getAllActions(path, nextProgress.completedLessonIds, activeChild)
          const item = items.find((i) => i.id === actionId)
          if (item) {
            const reflectie = await createReflectieItem({
              childId,
              title: 'Hoe ging het?',
              body: `Hoe ging het met: "${item.action}"?`,
              linkedActionId: actionId,
              insertAfterLessonId: item.lessonId,
            })
            setPathItemsByChild((prev) => ({ ...prev, [childId]: [...(prev[childId] ?? []), reflectie] }))
          }

          const streakWeeks = computeConnectionStreakWeeks([
            ...prevCompletions.map((c) => c.completedAt),
            completion.completedAt,
          ])
          void evaluateAndAwardBadges({
            actionCompletionsCount: prevCompletions.length + 1,
            connectionStreakWeeks: streakWeeks,
          })
        } catch (err) {
          console.error('Actie-afronding verwerken mislukt:', err)
        }
      })()
    },
    addChild: async (child) => {
      const newChild = await insertChild(child)
      setChildList((prev) => [...prev, newChild])
      setProgressByChild((prev) => ({ ...prev, [newChild.id]: emptyProgress() }))
      setPathItemsByChild((prev) => ({ ...prev, [newChild.id]: [] }))
      setActionCompletionsByChild((prev) => ({ ...prev, [newChild.id]: [] }))
      setEarnedBadgesByChild((prev) => ({ ...prev, [newChild.id]: {} }))
      setActiveChildId(newChild.id)
    },
    completeLesson: (lessonId) => {
      if (!activeChildId) return
      const childId = activeChildId
      const prevProgress = progressByChild[childId] ?? emptyProgress()
      if (prevProgress.completedLessonIds.includes(lessonId)) return
      const nextCompleted = [...prevProgress.completedLessonIds, lessonId]
      const nextProgress: ChildProgress = {
        ...prevProgress,
        completedLessonIds: nextCompleted,
        streakDays: prevProgress.streakDays + 1,
      }
      setProgressByChild((prev) => ({ ...prev, [childId]: nextProgress }))
      void updateChildProgress(childId, {
        completed_lesson_ids: nextProgress.completedLessonIds,
        done_action_ids: nextProgress.doneActionIds,
        streak_days: nextProgress.streakDays,
      }).catch((err) => console.error('Voortgang opslaan mislukt:', err))
      void evaluateAndAwardBadges({ completedLessonIds: nextCompleted })
    },
    logout: () => {
      void signOutAccount()
    },
    pathItems,
    connectionStreakWeeks,
    earnedBadgeCodes,
    resolveReflectie: async (itemId, response) => {
      if (!activeChildId) return
      const childId = activeChildId
      await resolveReflectieItem(itemId, response)
      const nextItems = (pathItemsByChild[childId] ?? []).map((it) =>
        it.id === itemId
          ? { ...it, status: 'done' as const, response, resolvedAt: new Date().toISOString() }
          : it,
      )
      setPathItemsByChild((prev) => ({ ...prev, [childId]: nextItems }))
      const resolvedCount = nextItems.filter((i) => i.type === 'reflectie' && i.status === 'done').length
      void evaluateAndAwardBadges({ resolvedReflectionCount: resolvedCount })
    },
    resolveVoorJou: async (itemId) => {
      if (!activeChildId) return
      const childId = activeChildId
      const item = (pathItemsByChild[childId] ?? []).find((i) => i.id === itemId)
      await resolveVoorJouItem(itemId)
      setPathItemsByChild((prev) => ({
        ...prev,
        [childId]: (prev[childId] ?? []).map((it) =>
          it.id === itemId ? { ...it, status: 'done' as const, resolvedAt: new Date().toISOString() } : it,
        ),
      }))
      if (item) void evaluateAndAwardBadges({ resolvedTopicTitles: [item.title] })
    },
    addVoorJouItem: async ({ title, body }) => {
      if (!activeChildId) return
      const childId = activeChildId
      const item = await createVoorJouItem({
        childId,
        title,
        body,
        sourceLessonId: null,
        insertAfterLessonId: todayLessonId,
      })
      setPathItemsByChild((prev) => ({ ...prev, [childId]: [...(prev[childId] ?? []), item] }))
    },
    resetProgress: async (childId) => {
      await resetProgressForChild(childId)
      setProgressByChild((prev) => ({ ...prev, [childId]: emptyProgress() }))
      setPathItemsByChild((prev) => ({ ...prev, [childId]: [] }))
      setActionCompletionsByChild((prev) => ({ ...prev, [childId]: [] }))
      setEarnedBadgesByChild((prev) => ({ ...prev, [childId]: {} }))
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
