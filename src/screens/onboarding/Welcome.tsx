import { Button } from '../../components/Button'

export function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col justify-center gap-4">
        <h1 className="text-h1 text-neutral-900">Je bent niet gek, dit is moeilijk.</h1>
        <p className="text-body-lg text-neutral-300">
          We doen het samen, in stukjes van drie minuten. Vanavond heb je al iets in handen.
        </p>
      </div>
      <Button onClick={onNext}>Begin</Button>
    </div>
  )
}
