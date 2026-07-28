import { Button } from '../../components/Button'

export function Promise({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex h-full flex-col justify-between px-6 py-10">
      <div className="flex flex-1 flex-col justify-center gap-4">
        <h1 className="text-h1 text-neutral-900">De belofte</h1>
        <p className="text-body-lg text-neutral-300">
          Drie minuten per dag. Geen preken, wel begrip. En elke les eindigt met één ding dat je vanavond kunt doen.
        </p>
      </div>
      <Button onClick={onStart}>Start mijn eerste les</Button>
    </div>
  )
}
