import { useEffect } from 'react'

export function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 300)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 bg-primary-600 px-6 text-center">
      <p className="text-display text-neutral-white">Vaderschap</p>
      <p className="text-caption uppercase tracking-wide text-neutral-white/70">Werktitel</p>
    </div>
  )
}
