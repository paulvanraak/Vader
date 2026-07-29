import { lessons } from '../data/lessons'

export function lessonsForWorld(worldId: number) {
  return lessons.filter((lesson) => lesson.world === worldId)
}

export function isWorldComplete(worldId: number, completedLessonIds: string[]): boolean {
  const worldLessons = lessonsForWorld(worldId)
  return worldLessons.length > 0 && worldLessons.every((lesson) => completedLessonIds.includes(lesson.id))
}

export function isLessonUnlocked(lessonIndex: number, completedLessonIds: string[]): boolean {
  if (lessonIndex <= 0) return true
  const previousLesson = lessons[lessonIndex - 1]
  return completedLessonIds.includes(previousLesson.id)
}
