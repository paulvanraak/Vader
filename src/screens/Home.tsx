import { useNavigate } from 'react-router-dom'
import { Check, Lock, Play } from 'lucide-react'
import { lessons } from '../data/lessons'
import { worlds } from '../data/worlds'
import { isLessonUnlocked } from '../lib/worldProgress'
import { getWorldStyle } from '../lib/worldStyles'
import { useAppState } from '../state/AppStateContext'

export function Home() {
  const navigate = useNavigate()
  const { todayLessonId, completedLessonIds } = useAppState()
  const todayLesson = lessons.find((l) => l.id === todayLessonId) ?? lessons[0]
  const currentWorld = worlds.find((w) => w.id === todayLesson.world)

  let lastWorldId: number | null = null

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-20 bg-gradient-to-br from-primary-500 to-primary-600 px-5 py-3 text-neutral-white shadow-sm">
        <p className="text-[10px] uppercase tracking-wide text-neutral-white/70">Je bent hier</p>
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="text-body-lg font-semibold text-neutral-white/80">Wereld {currentWorld?.id}</span>
          <span className="text-h3 font-extrabold">{currentWorld?.title}</span>
        </div>
      </div>

      <div className="flex flex-col py-6 pl-5 pr-3">
        {lessons.map((lesson, index) => {
          const world = worlds.find((w) => w.id === lesson.world)
          const showBanner = lesson.world !== lastWorldId
          lastWorldId = lesson.world
          const style = getWorldStyle(lesson.world)

          const isDone = completedLessonIds.includes(lesson.id)
          const isCurrent = lesson.id === todayLessonId && !isDone
          const unlocked = isLessonUnlocked(index, completedLessonIds)

          return (
            <div key={lesson.id} className="flex w-full flex-col">
              {showBanner && world && (
                <div
                  className={`z-10 my-4 w-full rounded-xl border-l-4 px-4 py-3 text-center shadow-sm ${style.softBg}`}
                  style={{ borderLeftColor: style.accentVar }}
                >
                  <p className={`text-label-sm ${style.text}`}>Wereld {world.id}</p>
                  <p className="text-h3 font-bold text-ink">{world.title}</p>
                  <p className="text-caption text-ink-muted">{world.subtitle}</p>
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
                    className={`flex size-14 items-center justify-center rounded-full border-4 border-transparent transition active:translate-y-[4px] ${
                      isDone
                        ? `bg-success-500 text-neutral-white shadow-[0_5px_0_0_var(--color-success-700)] active:shadow-[0_1px_0_0_var(--color-success-700)]`
                        : isCurrent
                          ? `${style.solidBg} text-neutral-white ${style.edgeShadow} active:${style.edgeShadowActive}`
                          : unlocked
                            ? `${style.softBg} ${style.text} shadow-md ring-1 ring-surface-sunken hover:ring-2`
                            : 'cursor-not-allowed bg-surface-sunken text-ink-faint'
                    }`}
                  >
                    {isDone ? (
                      <Check size={22} strokeWidth={3} />
                    ) : isCurrent ? (
                      <Play size={20} strokeWidth={2} fill="currentColor" />
                    ) : unlocked ? (
                      <span className="text-body-lg">{index + 1}</span>
                    ) : (
                      <Lock size={18} strokeWidth={2} />
                    )}
                  </button>
                </div>
                <p className="flex-1 truncate text-left text-[12px] leading-tight text-ink-muted">{lesson.title}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
