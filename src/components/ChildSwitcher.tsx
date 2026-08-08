import { useAppState } from '../state/AppStateContext'
import { childLabel } from '../lib/child'

export function ChildSwitcher() {
  const { children, activeChildId, setActiveChildId } = useAppState()

  if (children.length <= 1) return null

  return (
    <div className="flex gap-2 overflow-x-auto px-5 pb-1 pt-4">
      {children.map((child) => {
        const isActive = child.id === activeChildId
        return (
          <button
            key={child.id}
            type="button"
            onClick={() => setActiveChildId(child.id)}
            className={`shrink-0 rounded-md px-3.5 py-2 text-body font-bold transition ${
              isActive ? 'bg-primary-500 text-neutral-white' : 'bg-surface-sunken text-ink-muted'
            }`}
          >
            {childLabel(child)}
          </button>
        )
      })}
    </div>
  )
}
