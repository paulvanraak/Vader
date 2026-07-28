import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import type { Lesson } from '../types/lesson'
import { useAppState } from '../state/AppStateContext'
import { Button } from './Button'
import { Haakje } from './beats/Haakje'
import { Inzicht } from './beats/Inzicht'
import { Spiegel } from './beats/Spiegel'
import { Voorbeeld } from './beats/Voorbeeld'
import { Oefening } from './beats/Oefening'
import { Thuismissie } from './beats/Thuismissie'
import { Terugkoppeling } from './beats/Terugkoppeling'

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const navigate = useNavigate()
  const { completeLesson } = useAppState()
  const [beatIndex, setBeatIndex] = useState(0)
  const [oefeningAnswer, setOefeningAnswer] = useState<number | null>(null)
  const [thuismissieDone, setThuismissieDone] = useState(false)
  const [terugkoppelingReply, setTerugkoppelingReply] = useState<string | null>(null)

  const beat = lesson.beats[beatIndex]
  const isLastBeat = beatIndex === lesson.beats.length - 1
  const canAdvance = beat.type !== 'oefening' || oefeningAnswer !== null

  function handleNext() {
    if (isLastBeat) {
      completeLesson(lesson.id)
      navigate('/')
      return
    }
    setBeatIndex((i) => i + 1)
  }

  function handleClose() {
    navigate('/')
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-3 px-5 pt-5">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Sluit de les"
          className="flex size-9 items-center justify-center rounded-full text-neutral-300 hover:bg-neutral-100"
        >
          <X size={18} strokeWidth={2} />
        </button>
        <div className="flex flex-1 gap-1.5">
          {lesson.beats.map((b, i) => (
            <div
              key={`${b.type}-${i}`}
              className={`h-1.5 flex-1 rounded-full ${i <= beatIndex ? 'bg-primary-500' : 'bg-neutral-100'}`}
            />
          ))}
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
        {beat.type === 'thuismissie' && (
          <Thuismissie beat={beat} isDone={thuismissieDone} onToggle={() => setThuismissieDone((d) => !d)} />
        )}
        {beat.type === 'terugkoppeling' && (
          <Terugkoppeling beat={beat} reply={terugkoppelingReply} onReply={setTerugkoppelingReply} />
        )}
      </div>

      <div className="shrink-0 px-5 pb-6 pt-2">
        <Button onClick={handleNext} disabled={!canAdvance}>
          {isLastBeat ? 'Klaar voor vandaag' : 'Verder'}
        </Button>
      </div>
    </div>
  )
}
