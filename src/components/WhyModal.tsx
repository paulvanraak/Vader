import { X, Lightbulb } from 'lucide-react'

interface WhyModalProps {
  title: string
  body: string
  onClose: () => void
}

export function WhyModal({ title, body, onClose }: WhyModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Waarom: ${title}`}
        onClick={(e) => e.stopPropagation()}
        className="animate-dissolve w-full max-w-[420px] rounded-lg border border-surface-sunken bg-surface p-6 text-ink shadow-lg"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-primary-500">
            <Lightbulb size={22} strokeWidth={2} />
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Sluiten"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <p className="mt-4 text-caption uppercase tracking-wide text-ink-muted">Waarom dit helpt</p>
        <p className="mt-1 font-serif text-h4 font-semibold text-ink">{title}</p>
        <p className="mt-3 text-body-lg leading-relaxed text-ink-muted">{body}</p>
      </div>
    </div>
  )
}
