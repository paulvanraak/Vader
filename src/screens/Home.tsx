import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Lock, Play } from 'lucide-react'
import { lessons } from '../data/lessons'
import { worlds } from '../data/worlds'
import { lessonsForWorld, isLessonUnlocked } from '../lib/worldProgress'
import { getWorldStyle } from '../lib/worldStyles'
import { useAppState } from '../state/AppStateContext'

export function Home() {
  const navigate = useNavigate()
  const { todayLessonId, completedLessonIds } = useAppState()
  const todayLesson = lessons.find((l) => l.id === todayLessonId) ?? lessons[0]
  const allDone = completedLessonIds.length === lessons.length
  const currentWorld = worlds.find((w) => w.id === todayLesson.world)
  const worldLessons = lessonsForWorld(todayLesson.world)
  const lessonPosition = worldLessons.findIndex((l) => l.id === todayLesson.id) + 1

  const rootRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollEl = rootRef.current?.closest('.overflow-y-auto') as HTMLElement | null
    const bannerEl = bannerRef.current
    if (!scrollEl || !bannerEl) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let current = 0
    let target = 0
    let raf = 0

    function onScroll() {
      target = Math.min(scrollEl!.scrollTop * 0.08, 14)
    }
    function tick() {
      current += (target - current) * 0.15
      bannerEl!.style.transform = `translateY(${current.toFixed(2)}px)`
      raf = requestAnimationFrame(tick)
    }

    scrollEl.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      scrollEl.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  let lastWorldId: number | null = null

  return (
    <div ref={rootRef} className="flex flex-col">
      <div
        ref={bannerRef}
        className="sticky top-0 z-20 rounded-b-3xl bg-gradient-to-br from-primary-500 to-primary-600 px-5 py-4 text-neutral-white shadow-xl"
      >
        <p className="text-caption uppercase tracking-wide text-neutral-white/70">Je bent hier</p>
        <p className="mt-1 text-body-lg font-semibold text-neutral-white/80">Wereld {currentWorld?.id}</p>
        <p className="text-h2 font-extrabold leading-tight">{currentWorld?.title}</p>
        {!allDone && (
          <p className="mt-1 text-caption text-neutral-white/70">
            Les {lessonPosition} van {worldLessons.length}
          </p>
        )}
      </div>

      <div className="flex flex-col px-4 pb-6 pt-6">
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

              <div className="flex w-full items-center gap-2">
                <div className="flex w-16 shrink-0 flex-col items-center">
                  {!showBanner && (
                    <div className="h-6 border-l-2 border-dashed" style={{ borderColor: style.accentVar }} />
                  )}
                  <button
                    type="button"
                    disabled={!unlocked}
                    onClick={() => unlocked && navigate(`/les/${lesson.id}`)}
                    aria-label={`Les ${index + 1}: ${lesson.title}`}
                    className={`flex size-16 items-center justify-center rounded-full border-4 border-transparent transition active:translate-y-[4px] ${
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
                      <Check size={26} strokeWidth={3} />
                    ) : isCurrent ? (
                      <Play size={24} strokeWidth={2} fill="currentColor" />
                    ) : unlocked ? (
                      <span className="text-h4">{index + 1}</span>
                    ) : (
                      <Lock size={20} strokeWidth={2} />
                    )}
                  </button>
                </div>
                <p className="flex-1 truncate text-right text-[11px] leading-tight text-ink-faint">{lesson.title}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
