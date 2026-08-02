import type { Lesson } from '../types/lesson'
import { isLessonUnlocked } from './worldProgress'

export interface ActionItem {
  id: string
  action: string
  lessonId: string
  lessonTitle: string
  worldId: number
  why: string
  unlocked: boolean
}

export function getAllActions(path: Lesson[], completedLessonIds: string[]): ActionItem[] {
  const items: ActionItem[] = []
  path.forEach((lesson, lessonIndex) => {
    const thuismissie = lesson.beats.find((b) => b.type === 'thuismissie')
    const inzicht = lesson.beats.find((b) => b.type === 'inzicht')
    const unlocked = isLessonUnlocked(path, lessonIndex, completedLessonIds)
    thuismissie?.acties?.forEach((actie, actieIndex) => {
      items.push({
        id: `${lesson.id}-${actieIndex}`,
        action: actie,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        worldId: lesson.world,
        why: inzicht?.body ?? '',
        unlocked,
      })
    })
  })
  return items
}
