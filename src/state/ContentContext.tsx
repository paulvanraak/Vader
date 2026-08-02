import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { fetchContent, type AppContent } from '../lib/content'

interface ContentState extends AppContent {
  refetch: () => void
}

const ContentContext = createContext<ContentState | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<AppContent | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    setError(null)
    fetchContent()
      .then((data) => {
        if (!cancelled) setContent(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Onbekende fout bij laden.')
      })
    return () => {
      cancelled = true
    }
  }, [attempt])

  if (error) {
    return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 bg-page px-8 text-center">
        <p className="text-body-lg font-semibold text-ink">Kon de inhoud niet laden</p>
        <p className="text-body text-ink-muted">{error}</p>
        <button
          type="button"
          onClick={() => setAttempt((a) => a + 1)}
          className="rounded-md bg-primary-500 px-5 py-2.5 text-label font-bold text-neutral-white"
        >
          Opnieuw proberen
        </button>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-page">
        <div className="size-8 animate-spin rounded-full border-2 border-ink-faint border-t-primary-500" />
      </div>
    )
  }

  return (
    <ContentContext.Provider value={{ ...content, refetch: () => setAttempt((a) => a + 1) }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent(): ContentState {
  const ctx = useContext(ContentContext)
  if (!ctx) {
    throw new Error('useContent moet binnen ContentProvider gebruikt worden.')
  }
  return ctx
}
