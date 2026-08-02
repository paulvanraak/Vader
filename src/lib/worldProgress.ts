import type { Lesson } from '../types/lesson'
import type { AgeGroup } from '../state/AppStateContext'

export function lessonPath(allLessons: Lesson[], ageGroup: AgeGroup): Lesson[] {
  return allLessons
    .filter((lesson) => lesson.cohort === ageGroup)
    .sort((a, b) => a.world - b.world || a.sortOrder - b.sortOrder)
}

export function lessonsForWorld(path: Lesson[], worldId: number): Lesson[] {
  return path.filter((lesson) => lesson.world === worldId)
}

export function isWorldComplete(path: Lesson[], worldId: number, completedLessonIds: string[]): boolean {
  const worldLessons = lessonsForWorld(path, worldId)
  return worldLessons.length > 0 && worldLessons.every((lesson) => completedLessonIds.includes(lesson.id))
}

export function isLessonUnlocked(path: Lesson[], lessonIndex: number, completedLessonIds: string[]): boolean {
  if (lessonIndex <= 0) return true
  const previousLesson = path[lessonIndex - 1]
  return previousLesson ? completedLessonIds.includes(previousLesson.id) : true
}
