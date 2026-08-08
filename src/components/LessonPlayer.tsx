import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import type { Lesson } from '../types/lesson'
import { useAppState } from '../state/AppStateContext'
import { getWorldStyle } from '../lib/worldStyles'
import { personalizeBeat } from '../lib/personalize'
import { Button } from './Button'
import { Celebration } from './Celebration'
import { Haakje } from './beats/Haakje'
import { Inzicht } from './beats/Inzicht'
import { Spiegel } from './beats/Spiegel'
import { Voorbeeld } from './beats/Voorbeeld'
import { Oefening } from './beats/Oefening'
import { Thuismissie } from './beats/Thuismissie'

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const navigate = useNavigate()
  const { completeLesson, activeChild } = useAppState()
  const [beatIndex, setBeatIndex] = useState(0)
  const [oefeningAnswer, setOefeningAnswer] = useState<number | null>(null)
  const [isCelebrating, setIsCelebrating] = useState(false)

  const beat = personalizeBeat(lesson.beats[beatIndex], activeChild)
  const isLastBeat = beatIndex === lesson.beats.length - 1
  const canAdvance = beat.type !== 'oefening' || oefeningAnswer !== null
  const style = getWorldStyle(lesson.world)
  const isDarkBeat = beat.type === 'inzicht' || beat.type === 'spiegel'

  function handleNext() {
    setBeatIndex((i) => i + 1)
  }

  function handleClose() {
    navigate('/')
  }

  function handleFinishLesson() {
    completeLesson(lesson.id)
    setIsCelebrating(true)
  }

  if (isCelebrating) {
    return <Celebration lessonTitle={lesson.title} onDone={() => navigate('/')} />
  }

  return (
    <div
      className={`flex h-full flex-col transition-colors duration-300 ${isDarkBeat ? 'text-neutral-white' : ''}`}
      style={isDarkBeat ? { backgroundColor: style.dark } : undefined}
    >
      <div className="flex shrink-0 items-center gap-3 px-5 pt-5">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Sluit de les"
          className={`flex size-9 items-center justify-center rounded-full ${
            isDarkBeat ? 'text-neutral-white/70 hover:bg-neutral-white/10' : 'text-ink-muted hover:bg-surface-sunken'
          }`}
        >
          <X size={18} strokeWidth={2} />
        </button>
        <div
          className={`h-2 flex-1 overflow-hidden rounded-full ${isDarkBeat ? 'bg-neutral-white/15' : 'bg-surface-sunken'}`}
        >
          <div
            className="h-full rounded-full bg-ink transition-all duration-500"
            style={{ width: `${((beatIndex + 1) / lesson.beats.length) * 100}%` }}
          />
        </div>
      </div>

      <p
        className="shrink-0 px-5 pt-3 text-left text-body font-bold leading-snug"
        style={{ color: style.accentVar }}
      >
        {lesson.title}
      </p>

      <div key={beatIndex} className="animate-dissolve flex-1 overflow-y-auto px-5 py-6">
        {beat.type === 'haakje' && <Haakje beat={beat} worldId={lesson.world} />}
        {beat.type === 'inzicht' && <Inzicht beat={beat} worldId={lesson.world} />}
        {beat.type === 'spiegel' && <Spiegel beat={beat} worldId={lesson.world} />}
        {beat.type === 'voorbeeld' && <Voorbeeld beat={beat} worldId={lesson.world} />}
        {beat.type === 'oefening' && (
          <Oefening beat={beat} worldId={lesson.world} selectedIndex={oefeningAnswer} onSelect={setOefeningAnswer} />
        )}
        {beat.type === 'thuismissie' && (
          <Thuismissie beat={beat} worldId={lesson.world} onDone={handleFinishLesson} />
        )}
      </div>

      {!isLastBeat && (
        <div className="shrink-0 px-5 pb-6 pt-2">
          <Button onClick={handleNext} disabled={!canAdvance}>
            Verder
          </Button>
        </div>
      )}
    </div>
  )
}
