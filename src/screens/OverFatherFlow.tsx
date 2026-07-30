import { useNavigate } from 'react-router-dom'
import { X, Waves } from 'lucide-react'

export function OverFatherFlow() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-3 px-5 pt-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Sluiten"
          className="flex size-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
        >
          <X size={18} strokeWidth={2} />
        </button>
        <h1 className="text-h3 text-ink">Over FatherFlow</h1>
      </div>

      <div className="flex flex-col gap-5 px-5 py-6">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-500 shadow-sm">
          <Waves size={26} strokeWidth={2.5} className="text-neutral-white" />
        </div>
        <p className="text-body-lg leading-relaxed text-ink">
          FatherFlow helpt vaders hun kind stap voor stap beter te begrijpen, met kleine, haalbare stappen in plaats
          van grote veranderingen ineens.
        </p>
        <p className="text-body-lg leading-relaxed text-ink">
          Elke les duurt een paar minuten en koppelt het gedrag van je kind aan je eigen aandeel daarin, met één
          concrete actie om vandaag mee te proberen.
        </p>
        <p className="text-body text-ink-muted">
          FatherFlow is geen therapie en geen crisisdienst. Bij direct gevaar bel 112.
        </p>
      </div>
    </div>
  )
}
