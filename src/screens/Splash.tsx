import { WaveIcon } from './onboarding/OnboardingIcons'
import { Button } from '../components/Button'

export function Splash({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex h-full flex-col justify-between overflow-hidden bg-page px-7 pb-8 pt-16">
      <div className="flex flex-1 flex-col justify-center gap-4 text-ink">
        <WaveIcon className="stack-in h-10 w-12" />
        <p className="stack-in stack-delay-1 font-serif text-[56px] font-semibold leading-[0.95]">
          Father
          <br />
          Flow
        </p>
      </div>
      <div className="stack-in stack-delay-2">
        <Button onClick={onDone}>Let's Go</Button>
      </div>
    </div>
  )
}
