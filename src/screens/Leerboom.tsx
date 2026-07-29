import { useNavigate } from 'react-router-dom'
import { Check, Lock, Play } from 'lucide-react'
import { lessons } from '../data/lessons'
import { worlds } from '../data/worlds'
import { useAppState } from '../state/AppStateContext'
import { isLessonUnlocked } from '../lib/worldProgress'

const zigzag = [0, 56, 0, -56]

export function Leerboom() {
  const navigate = useNavigate()
  const { completedLessonIds, todayLessonId } = useAppState()

  let lastWorldId: number | null = null

  return (
    <div className="px-5 py-6">
      <div className="mb-6">
        <p className="text-label text-ink-muted">Leerboom</p>
        <h1 className="text-h2 text-ink">Jouw pad</h1>
      </div>

      <div className="relative flex flex-col items-center pb-10">
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-1/2 w-px -translate-x-1/2 border-l-2 border-dashed border-surface-sunken"
        />

        {lessons.map((lesson, index) => {
          const world = worlds.find((w) => w.id === lesson.world)
          const showBanner = lesson.world !== lastWorldId
          lastWorldId = lesson.world

          const isDone = completedLessonIds.includes(lesson.id)
          const isCurrent = lesson.id === todayLessonId && !isDone
          const unlocked = isLessonUnlocked(index, completedLessonIds)
          const offset = zigzag[index % zigzag.length]

          return (
            <div key={lesson.id} className="flex w-full flex-col items-center">
              {showBanner && world && (
                <div className="z-10 my-4 w-full max-w-[280px] rounded-xl bg-primary-500/10 px-4 py-2.5 text-center">
                  <p className="text-label text-primary-600">
                    Wereld {world.id} · {world.title}
                  </p>
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
                  className={`flex size-16 items-center justify-center rounded-full border-4 transition ${
                    isDone
                      ? 'border-success-500/30 bg-success-500 text-neutral-white'
                      : isCurrent
                        ? 'border-primary-500/30 bg-primary-500 text-neutral-white shadow-lg'
                        : unlocked
                          ? 'border-surface-sunken bg-surface text-ink hover:border-primary-500'
                          : 'cursor-not-allowed border-surface-sunken bg-surface-sunken text-ink-faint'
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
