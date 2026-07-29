import { useEffect } from 'react'
import { Waves } from 'lucide-react'

export function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 300)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-[#0f1115] px-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary-500 shadow-lg">
        <Waves size={32} strokeWidth={2.5} className="text-neutral-white" />
      </div>
      <p className="text-display text-neutral-white">
        Father<span className="text-primary-500">Flow</span>
      </p>
    </div>
  )
}
