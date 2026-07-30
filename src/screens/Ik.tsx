import { User } from 'lucide-react'
import { useAppState } from '../state/AppStateContext'
import { Card } from '../components/Card'
import { childLabel } from '../lib/child'

export function Ik() {
  const { fatherName, children, activeChildId, setActiveChildId, streakDays, completedLessonIds, path } =
    useAppState()

  return (
    <div className="flex flex-col gap-5 px-5 py-6 pr-16">
      <div className="flex items-center gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
          <User size={24} strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <p className="text-caption text-ink-muted">Jouw profiel</p>
          <p className="truncate text-h4 text-ink">{fatherName ?? 'Vader'}</p>
        </div>
      </div>

      <div>
        <p className="mb-2 text-label text-ink-muted">Jouw kinderen</p>
        <div className="flex flex-col gap-2">
          {children.map((child) => {
            const isActive = child.id === activeChildId
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => setActiveChildId(child.id)}
                className={`flex items-center justify-between rounded-xl border p-3 text-left transition ${
                  isActive
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-surface-sunken bg-surface hover:border-ink-faint'
                }`}
              >
                <span className={`text-body-lg font-semibold ${isActive ? 'text-primary-600' : 'text-ink'}`}>
                  {childLabel(child)}
                </span>
                {isActive && <span className="text-caption font-semibold text-primary-600">Actief</span>}
              </button>
            )
          })}
        </div>
      </div>

      <Card className="flex flex-col gap-3">
        <div className="flex justify-between text-body">
          <span className="text-ink-muted">Streak</span>
          <span className="text-ink">{streakDays} dagen</span>
        </div>
        <div className="flex justify-between text-body">
          <span className="text-ink-muted">Lessen afgerond</span>
          <span className="text-ink">
            {completedLessonIds.length} van {path.length}
          </span>
        </div>
      </Card>
    </div>
  )
}
