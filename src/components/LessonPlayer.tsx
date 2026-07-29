import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import type { Lesson } from '../types/lesson'
import { useAppState } from '../state/AppStateContext'
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
  const { completeLesson } = useAppState()
  const [beatIndex, setBeatIndex] = useState(0)
  const [oefeningAnswer, setOefeningAnswer] = useState<number | null>(null)
  const [isCelebrating, setIsCelebrating] = useState(false)

  const beat = lesson.beats[beatIndex]
  const isLastBeat = beatIndex === lesson.beats.length - 1
  const canAdvance = beat.type !== 'oefening' || oefeningAnswer !== null

  function handleNext() {
    setBeatIndex((i) => i + 1)
  }

  function handleClose() {
    navigate('/')
  }

  function handleChooseAction() {
    completeLesson(lesson.id)
    setIsCelebrating(true)
  }

  if (isCelebrating) {
    return <Celebration lessonTitle={lesson.title} onDone={() => navigate('/')} />
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-3 px-5 pt-5">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Sluit de les"
          className="flex size-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
        >
          <X size={18} strokeWidth={2} />
        </button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-sunken">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-orange transition-all duration-500"
            style={{ width: `${((beatIndex + 1) / lesson.beats.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {beat.type === 'haakje' && <Haakje beat={beat} />}
        {beat.type === 'inzicht' && <Inzicht beat={beat} />}
        {beat.type === 'spiegel' && <Spiegel beat={beat} />}
        {beat.type === 'voorbeeld' && <Voorbeeld beat={beat} />}
        {beat.type === 'oefening' && (
          <Oefening beat={beat} selectedIndex={oefeningAnswer} onSelect={setOefeningAnswer} />
        )}
        {beat.type === 'thuismissie' && <Thuismissie beat={beat} onChoose={handleChooseAction} />}
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
