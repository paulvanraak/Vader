import { WaveIcon } from './onboarding/OnboardingIcons'
import { OnboardingButton } from './onboarding/OnboardingButton'

export function Splash({ onDone }: { onDone: () => void }) {
  return (
    <div className="onboarding-photo-bg flex h-full flex-col justify-between overflow-hidden px-7 pb-8 pt-16">
      <div className="flex flex-1 flex-col justify-center gap-4 text-[#21283e]">
        <WaveIcon className="h-10 w-12" />
        <p className="text-[52px] font-extrabold leading-[0.95]">
          Father
          <br />
          Flow
        </p>
      </div>
      <OnboardingButton tone="dark" onClick={onDone}>
        Let's Go
      </OnboardingButton>
    </div>
  )
}
