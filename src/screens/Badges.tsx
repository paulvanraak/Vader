import { useState } from 'react'
import { Lock, X } from 'lucide-react'
import { useAppState } from '../state/AppStateContext'
import { useContent } from '../state/ContentContext'
import { badgeCatalog, type BadgeDef } from '../lib/badges'
import { ChildSwitcher } from '../components/ChildSwitcher'

export function Badges() {
  const { earnedBadgeCodes } = useAppState()
  const { worlds } = useContent()
  const [activeBadge, setActiveBadge] = useState<BadgeDef | null>(null)

  const catalog = badgeCatalog(worlds)
  const earnedCount = catalog.filter((b) => earnedBadgeCodes[b.code]).length

  return (
    <div className="flex flex-col">
      <ChildSwitcher />
      <div className="flex flex-col gap-5 px-5 pb-6 pt-4">
        <div>
          <h1 className="text-h2 text-ink">Badges</h1>
          <p className="mt-1 text-caption text-ink-muted">
            {earnedCount} van {catalog.length} behaald
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {catalog.map((badge) => {
            const earned = Boolean(earnedBadgeCodes[badge.code])
            const Icon = badge.icon
            return (
              <button
                key={badge.code}
                type="button"
                onClick={() => setActiveBadge(badge)}
                className="flex flex-col items-center gap-2 rounded-md bg-surface p-3 text-center shadow-sm ring-1 ring-surface-sunken"
              >
                <span
                  className={`flex size-14 items-center justify-center rounded-full ${
                    earned ? 'bg-primary-500/15 text-primary-600' : 'bg-surface-sunken text-ink-faint'
                  }`}
                >
                  {earned ? <Icon size={26} strokeWidth={2} /> : <Lock size={20} strokeWidth={2} />}
                </span>
                <p className={`text-caption leading-tight ${earned ? 'text-ink' : 'text-ink-faint'}`}>
                  {badge.title}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {activeBadge && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
          onClick={() => setActiveBadge(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeBadge.title}
            onClick={(e) => e.stopPropagation()}
            className="force-dark animate-dissolve w-full max-w-[420px] rounded-md bg-surface p-6 text-ink shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-full ${
                  earnedBadgeCodes[activeBadge.code]
                    ? 'bg-primary-500/15 text-primary-500'
                    : 'bg-surface-sunken text-ink-faint'
                }`}
              >
                {earnedBadgeCodes[activeBadge.code] ? (
                  <activeBadge.icon size={22} strokeWidth={2} />
                ) : (
                  <Lock size={20} strokeWidth={2} />
                )}
              </span>
              <button
                type="button"
                onClick={() => setActiveBadge(null)}
                aria-label="Sluiten"
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>
            <p className="mt-4 text-caption uppercase tracking-wide text-ink-muted">
              {earnedBadgeCodes[activeBadge.code] ? 'Behaald' : 'Nog niet behaald'}
            </p>
            <p className="mt-1 text-h4 text-ink">{activeBadge.title}</p>
            <p className="mt-3 text-body-lg leading-relaxed text-ink-muted">{activeBadge.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}
