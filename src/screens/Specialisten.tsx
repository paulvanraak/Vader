import { useNavigate } from 'react-router-dom'
import { X, UserRound } from 'lucide-react'
import { useContent } from '../state/ContentContext'

export function Specialisten() {
  const navigate = useNavigate()
  const { specialists } = useContent()

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
        <h1 className="font-serif text-h3 font-semibold text-ink">Specialisten</h1>
      </div>

      <div className="flex flex-col gap-3 px-5 py-6">
        <p className="mb-2 text-body text-ink-muted">
          De inzichten in FatherFlow zijn opgesteld met input van dit fictieve panel, ter illustratie van de demo.
        </p>
        {specialists.map((specialist) => (
          <div
            key={specialist.id}
            className="flex items-start gap-3 rounded-md bg-surface p-4 shadow-sm ring-1 ring-surface-sunken"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
              <UserRound size={22} strokeWidth={2} />
            </span>
            <div>
              <p className="text-body-lg font-bold text-ink">{specialist.name}</p>
              <p className="text-caption font-semibold text-primary-600">{specialist.role}</p>
              <p className="mt-1 text-body text-ink-muted">{specialist.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
