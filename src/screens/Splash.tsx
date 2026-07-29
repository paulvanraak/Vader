import { Waves } from 'lucide-react'
import { Button } from '../components/Button'

export function Splash({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 bg-[#0f1115] px-6 text-center">
      <div className="flex flex-col items-center gap-5">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-primary-500 shadow-lg">
          <Waves size={40} strokeWidth={2.5} className="text-neutral-white" />
        </div>
        <p className="text-display text-neutral-white">
          Father<span className="text-primary-500">Flow</span>
        </p>
      </div>
      <Button onClick={onDone}>Let's go</Button>
    </div>
  )
}
