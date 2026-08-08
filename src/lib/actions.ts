import type { Lesson } from '../types/lesson'
import type { ChildProfile } from '../state/AppStateContext'
import { isLessonUnlocked } from './worldProgress'
import { personalizeText } from './personalize'

export interface ActionItem {
  id: string
  action: string
  lessonId: string
  lessonTitle: string
  worldId: number
  why: string
  unlocked: boolean
}

export function getAllActions(path: Lesson[], completedLessonIds: string[], child: ChildProfile | null): ActionItem[] {
  const items: ActionItem[] = []
  path.forEach((lesson, lessonIndex) => {
    const thuismissie = lesson.beats.find((b) => b.type === 'thuismissie')
    const inzicht = lesson.beats.find((b) => b.type === 'inzicht')
    const unlocked = isLessonUnlocked(path, lessonIndex, completedLessonIds)
    thuismissie?.acties?.forEach((actie, actieIndex) => {
      items.push({
        id: `${lesson.id}-${actieIndex}`,
        action: personalizeText(actie, child),
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        worldId: lesson.world,
        why: inzicht?.body ? personalizeText(inzicht.body, child) : '',
        unlocked,
      })
    })
  })
  return items
}
