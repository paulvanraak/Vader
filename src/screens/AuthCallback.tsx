import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

/**
 * Landingsplek voor de magic link uit dezelfde mail als de code. De
 * Supabase-client pikt de sessie zelf uit de URL op (detectSessionInUrl), dus
 * hier wachten we alleen tot dat gelukt is en sturen we door.
 */
export function AuthCallback() {
  const navigate = useNavigate()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      const { data } = await supabase.auth.getSession()
      if (cancelled) return
      if (data.session) {
        navigate('/', { replace: true })
      } else {
        // Even geduld: de client verwerkt de hash soms net na de eerste render.
        setTimeout(async () => {
          const retry = await supabase.auth.getSession()
          if (cancelled) return
          if (retry.data.session) navigate('/', { replace: true })
          else setFailed(true)
        }, 1200)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [navigate])

  return (
    <div className="flex h-full flex-col items-start justify-center gap-4 bg-page px-7">
      {failed ? (
        <>
          <h1 className="font-serif text-h1 text-ink">Deze link werkt niet meer</h1>
          <p className="text-body-lg leading-relaxed text-ink-muted">
            Links verlopen na korte tijd. Vraag een nieuwe code aan en log daarmee in.
          </p>
          <button
            type="button"
            onClick={() => navigate('/', { replace: true })}
            className="rounded-full bg-ink px-6 py-3 text-label font-bold text-page"
          >
            Terug naar inloggen
          </button>
        </>
      ) : (
        <div className="size-8 animate-spin rounded-full border-2 border-ink-faint border-t-primary-500" />
      )}
    </div>
  )
}
