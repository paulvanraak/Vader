import { lessons } from '../data/lessons'

export interface ActionItem {
  id: string
  action: string
  lessonId: string
  lessonTitle: string
  worldId: number
  why: string
}

export function getAllActions(): ActionItem[] {
  const items: ActionItem[] = []
  for (const lesson of lessons) {
    const thuismissie = lesson.beats.find((b) => b.type === 'thuismissie')
    const inzicht = lesson.beats.find((b) => b.type === 'inzicht')
    thuismissie?.acties?.forEach((actie, index) => {
      items.push({
        id: `${lesson.id}-${index}`,
        action: actie,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        worldId: lesson.world,
        why: inzicht?.body ?? '',
      })
    })
  }
  return items
}
