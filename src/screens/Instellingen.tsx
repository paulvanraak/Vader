import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { ThemeToggle } from '../components/ThemeToggle'

export function Instellingen() {
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
        <h1 className="font-serif text-h3 font-semibold text-ink">Instellingen</h1>
      </div>

      <div className="flex flex-col gap-6 px-5 py-6">
        <div>
          <p className="mb-2 text-label text-ink-muted">Weergave</p>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
