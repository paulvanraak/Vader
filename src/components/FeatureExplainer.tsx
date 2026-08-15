import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { featureExplainers, type FeatureExplainerId } from '../lib/featureExplainers'
import { hasSeenExplainer, markExplainerSeen } from '../lib/seenExplainers'
import { hapticTap } from '../lib/haptics'

export function FeatureExplainer({ id }: { id: FeatureExplainerId }) {
  const [open, setOpen] = useState(() => !hasSeenExplainer(id))
  const cardRef = useRef<HTMLDivElement>(null)

  function dismiss() {
    hapticTap()
    markExplainerSeen(id)
    setOpen(false)
  }

  // Wegtikken buiten het kaartje sluit het — geen scherm-dekkend overlay
  // nodig, de rest van het scherm blijft zichtbaar én aantikbaar.
  useEffect(() => {
    if (!open) return
    function handlePointerDown(e: PointerEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        dismiss()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  const content = featureExplainers[id]
  const Icon = content.icon

  return (
    <div
      ref={cardRef}
      role="dialog"
      aria-modal="false"
      aria-label={content.title}
      className="animate-tooltip-in fixed inset-x-4 bottom-24 z-50 mx-auto max-w-[340px] rounded-2xl border border-white/25 bg-surface/75 p-3.5 shadow-xl backdrop-blur-xl"
    >
      <div className="flex items-start gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-primary-600">
          <Icon size={16} strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-body-lg font-semibold text-ink">{content.title}</p>
          <p className="mt-0.5 text-caption leading-snug text-ink-muted">{content.body}</p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Sluiten"
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
        >
          <X size={14} strokeWidth={2} />
        </button>
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="mt-2.5 w-full rounded-full bg-ink px-4 py-2 text-caption font-bold text-page transition active:scale-[0.98]"
      >
        Ik begrijp het
      </button>
    </div>
  )
}
