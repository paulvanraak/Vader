import { useNavigate } from 'react-router-dom'
import { Check, Lock, Play } from 'lucide-react'
import { lessons } from '../data/lessons'
import { worlds } from '../data/worlds'
import { lessonsForWorld, isLessonUnlocked } from '../lib/worldProgress'
import { getWorldStyle } from '../lib/worldStyles'
import { useAppState } from '../state/AppStateContext'

const zigzag = [0, 56, 0, -56]

export function Home() {
  const navigate = useNavigate()
  const { todayLessonId, completedLessonIds } = useAppState()
  const todayLesson = lessons.find((l) => l.id === todayLessonId) ?? lessons[0]
  const allDone = completedLessonIds.length === lessons.length
  const currentWorld = worlds.find((w) => w.id === todayLesson.world)
  const worldLessons = lessonsForWorld(todayLesson.world)
  const lessonPosition = worldLessons.findIndex((l) => l.id === todayLesson.id) + 1

  let lastWorldId: number | null = null

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-20 bg-gradient-to-br from-primary-500 to-primary-600 px-5 py-4 text-neutral-white shadow-md">
        <p className="text-caption uppercase tracking-wide text-neutral-white/70">Je bent hier</p>
        <p className="mt-1 text-body-lg font-semibold text-neutral-white/80">Wereld {currentWorld?.id}</p>
        <p className="text-h2 font-extrabold leading-tight">{currentWorld?.title}</p>
        {!allDone && (
          <p className="mt-1 text-caption text-neutral-white/70">
            Les {lessonPosition} van {worldLessons.length}
          </p>
        )}
      </div>

      <div className="relative flex flex-col items-center px-5 pb-6 pt-6">
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-1/2 w-px -translate-x-1/2 border-l-2 border-dashed border-surface-sunken"
        />

        {lessons.map((lesson, index) => {
          const world = worlds.find((w) => w.id === lesson.world)
          const showBanner = lesson.world !== lastWorldId
          lastWorldId = lesson.world
          const style = getWorldStyle(lesson.world)

          const isDone = completedLessonIds.includes(lesson.id)
          const isCurrent = lesson.id === todayLessonId && !isDone
          const unlocked = isLessonUnlocked(index, completedLessonIds)
          const offset = zigzag[index % zigzag.length]

          return (
            <div key={lesson.id} className="flex w-full flex-col items-center">
              {showBanner && world && (
                <div
                  className={`z-10 my-4 w-full max-w-[280px] rounded-xl border-l-4 px-4 py-3 text-center shadow-sm ${style.softBg}`}
                  style={{ borderLeftColor: style.accentVar }}
                >
                  <p className={`text-label-sm ${style.text}`}>Wereld {world.id}</p>
                  <p className="text-h3 font-bold text-ink">{world.title}</p>
                  <p className="text-caption text-ink-muted">{world.subtitle}</p>
                </div>
              )}

              <div className="relative z-10 flex flex-col items-center gap-2 py-3">
                <button
                  type="button"
                  disabled={!unlocked}
                  onClick={() => unlocked && navigate(`/les/${lesson.id}`)}
                  aria-label={`Les ${index + 1}: ${lesson.title}`}
                  style={{ transform: `translateX(${offset}px)` }}
                  className={`flex size-16 items-center justify-center rounded-full border-4 border-transparent transition active:translate-y-[3px] ${
                    isDone
                      ? `bg-success-500 text-neutral-white shadow-[0_4px_0_0_var(--color-success-700)] active:shadow-[0_1px_0_0_var(--color-success-700)]`
                      : isCurrent
                        ? `${style.solidBg} text-neutral-white ${style.edgeShadow} active:${style.edgeShadowActive}`
                        : unlocked
                          ? `${style.softBg} ${style.text} shadow-md ring-1 ring-surface-sunken hover:ring-2`
                          : 'cursor-not-allowed bg-surface-sunken text-ink-faint'
                  }`}
                >
                  {isDone ? (
                    <Check size={26} strokeWidth={3} />
                  ) : isCurrent ? (
                    <Play size={24} strokeWidth={2} fill="currentColor" />
                  ) : unlocked ? (
                    <span className="text-h4">{index + 1}</span>
                  ) : (
                    <Lock size={20} strokeWidth={2} />
                  )}
                </button>
                {isCurrent && (
                  <div
                    style={{ transform: `translateX(${offset}px)` }}
                    className="max-w-[220px] rounded-lg bg-surface px-3 py-2 text-center shadow-sm ring-1 ring-surface-sunken"
                  >
                    <p className="text-caption text-ink-muted">Vandaag</p>
                    <p className="text-body text-ink">{lesson.title}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
