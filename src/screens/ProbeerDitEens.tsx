import { useState } from 'react'
import { Check, Lightbulb } from 'lucide-react'
import { getAllActions } from '../lib/actions'
import { getWorldStyle } from '../lib/worldStyles'
import { useAppState } from '../state/AppStateContext'
import { WhyModal } from '../components/WhyModal'
import { ChildSwitcher } from '../components/ChildSwitcher'

export function ProbeerDitEens() {
  const { path, doneActionIds, toggleAction, completedLessonIds } = useAppState()
  const [activeWhyId, setActiveWhyId] = useState<string | null>(null)

  const actions = getAllActions(path, completedLessonIds).filter((item) => item.unlocked)
  const activeItem = actions.find((item) => item.id === activeWhyId) ?? null
  const doneCount = actions.filter((item) => doneActionIds.includes(item.id)).length

  let lastLessonId: string | null = null

  return (
    <div className="flex flex-col">
      <ChildSwitcher />
      <div className="flex flex-col gap-5 px-5 pb-6 pt-4">
        <div>
          <h1 className="text-h2 text-ink">Jouw Checklist</h1>
          <p className="mt-1 text-caption text-ink-muted">
            {doneCount} van {actions.length} geprobeerd
          </p>
          {actions.length === 0 && (
            <p className="mt-3 text-body text-ink-muted">
              Speel je eerste les op het pad vrij om hier acties te ontgrendelen.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {actions.map((item) => {
            const showLessonHeader = item.lessonId !== lastLessonId
            lastLessonId = item.lessonId
            const isDone = doneActionIds.includes(item.id)
            const style = getWorldStyle(item.worldId)

            return (
              <div key={item.id} className="flex flex-col gap-2">
                {showLessonHeader && (
                  <p className={`mt-1 text-body-lg font-bold ${style.text}`}>{item.lessonTitle}</p>
                )}
                <div
                  className={`flex items-center gap-2 rounded-xl p-3 shadow-sm ring-1 ring-surface-sunken ${style.softBg}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAction(item.id)}
                    aria-pressed={isDone}
                    aria-label={isDone ? 'Markeer als niet geprobeerd' : 'Markeer als geprobeerd'}
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      isDone ? 'border-ink bg-ink text-page' : 'border-ink-faint text-transparent'
                    }`}
                  >
                    <Check size={16} strokeWidth={3} />
                  </button>
                  <p className={`flex-1 text-body-lg ${isDone ? 'text-ink-muted line-through' : 'text-ink'}`}>
                    {item.action}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveWhyId(item.id)}
                    aria-label={`Waarom dit helpt: ${item.action}`}
                    className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink hover:bg-surface-sunken"
                  >
                    <Lightbulb size={20} strokeWidth={2} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {activeItem && (
          <WhyModal title={activeItem.lessonTitle} body={activeItem.why} onClose={() => setActiveWhyId(null)} />
        )}
      </div>
    </div>
  )
}
