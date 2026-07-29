import { worlds } from '../data/worlds'
import { lessons } from '../data/lessons'

export function lessonsForWorld(worldId: number) {
  return lessons.filter((lesson) => lesson.world === worldId)
}

export function isWorldComplete(worldId: number, completedLessonIds: string[]): boolean {
  const worldLessons = lessonsForWorld(worldId)
  return worldLessons.length > 0 && worldLessons.every((lesson) => completedLessonIds.includes(lesson.id))
}

export function isWorldUnlocked(worldId: number, completedLessonIds: string[]): boolean {
  const index = worlds.findIndex((world) => world.id === worldId)
  if (index <= 0) return true
  const previousWorld = worlds[index - 1]
  return isWorldComplete(previousWorld.id, completedLessonIds)
}
