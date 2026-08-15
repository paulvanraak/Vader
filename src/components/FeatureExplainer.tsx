import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'
import { featureExplainers, type FeatureExplainerId } from '../lib/featureExplainers'
import { hasSeenExplainer, markExplainerSeen } from '../lib/seenExplainers'

export function FeatureExplainer({ id }: { id: FeatureExplainerId }) {
  const [open, setOpen] = useState(() => !hasSeenExplainer(id))
  if (!open) return null

  const content = featureExplainers[id]
  const Icon = content.icon

  function dismiss() {
    markExplainerSeen(id)
    setOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center" onClick={dismiss}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={content.title}
        onClick={(e) => e.stopPropagation()}
        className="animate-dissolve w-full max-w-[420px] rounded-lg border border-surface-sunken bg-surface p-6 shadow-lg"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
            <Icon size={22} strokeWidth={2} />
          </span>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Sluiten"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <p className="mt-4 font-serif text-h4 font-semibold text-ink">{content.title}</p>
        <div className="mt-3 flex flex-col gap-3 text-body-lg leading-relaxed text-ink-muted">
          {content.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <Button onClick={dismiss} className="mt-5">
          Ik begrijp het
        </Button>
      </div>
    </div>
  )
}
