import { useNavigate } from 'react-router-dom'
import { Check, Lock, Play, Clock } from 'lucide-react'
import { isLessonUnlocked } from '../lib/worldProgress'
import { getWorldStyle } from '../lib/worldStyles'
import { useAppState } from '../state/AppStateContext'
import { useContent } from '../state/ContentContext'
import { ChildSwitcher } from '../components/ChildSwitcher'

export function Home() {
  const navigate = useNavigate()
  const { activeChild, path, todayLessonId, completedLessonIds } = useAppState()
  const { worlds } = useContent()

  if (activeChild && activeChild.gender === 'dochter') {
    return (
      <div className="flex flex-col">
        <ChildSwitcher />
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
            <Clock size={26} strokeWidth={2} />
          </span>
          <p className="text-h4 font-extrabold text-ink">Bijna zover</p>
          <p className="text-body text-ink-muted">
            Deze demo is nu nog gericht op zonen. Een versie voor dochters komt eraan.
          </p>
        </div>
      </div>
    )
  }

  let lastWorldId: number | null = null

  return (
    <div className="flex flex-col">
      <ChildSwitcher />
      <div className="flex flex-col py-5 pl-5 pr-3">
        {path.map((lesson, index) => {
          const world = worlds.find((w) => w.id === lesson.world)
          const showBanner = lesson.world !== lastWorldId
          lastWorldId = lesson.world
          const style = getWorldStyle(lesson.world)

          const isDone = completedLessonIds.includes(lesson.id)
          const isCurrent = lesson.id === todayLessonId && !isDone
          const unlocked = isLessonUnlocked(path, index, completedLessonIds)

          return (
            <div key={lesson.id} className="flex w-full flex-col">
              {showBanner && world && (
                <div
                  className="z-10 my-6 flex w-full items-center justify-between rounded-md border-l-4 bg-surface py-2 pl-7 pr-4 shadow-sm"
                  style={{ borderLeftColor: style.accentVar }}
                >
                  <div className="text-left">
                    <p className="text-h3 font-bold text-ink">{world.title}</p>
                    <p className="text-body text-ink-muted">{world.subtitle}</p>
                  </div>
                  <p className="text-h1 font-extrabold" style={{ color: style.accentVar }}>
                    {world.id}
                  </p>
                </div>
              )}

              <div className="flex w-full items-center gap-1.5">
                <div className="flex w-14 shrink-0 flex-col items-center">
                  {!showBanner && (
                    <div className="h-6 border-l-2 border-dashed" style={{ borderColor: style.accentVar }} />
                  )}
                  <button
                    type="button"
                    disabled={!unlocked}
                    onClick={() => unlocked && navigate(`/les/${lesson.id}`)}
                    aria-label={`Les ${index + 1}: ${lesson.title}`}
                    className={`flex items-center justify-center rounded-full border-4 border-transparent transition ${
                      isDone
                        ? `size-14 bg-success-500 text-neutral-white shadow-[0_5px_0_0_var(--color-success-700)] active:translate-y-[4px] active:shadow-[0_1px_0_0_var(--color-success-700)]`
                        : isCurrent
                          ? `size-14 ${style.solidBg} text-neutral-white ${style.edgeShadow} active:translate-y-[4px] active:${style.edgeShadowActive}`
                          : unlocked
                            ? `size-14 ${style.softBg} ${style.text} shadow-md ring-1 ring-surface-sunken hover:ring-2 active:translate-y-[4px]`
                            : 'size-11 cursor-not-allowed bg-surface-sunken text-ink-muted'
                    }`}
                  >
                    {isDone ? (
                      <Check size={22} strokeWidth={3} />
                    ) : isCurrent ? (
                      <Play size={20} strokeWidth={2} fill="currentColor" />
                    ) : unlocked ? (
                      <span className="text-body-lg">{index + 1}</span>
                    ) : (
                      <Lock size={16} strokeWidth={2.5} />
                    )}
                  </button>
                </div>
                <p className="flex-1 truncate text-left text-[13px] leading-normal text-ink-muted">{lesson.title}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
