import { Navigate, useParams } from 'react-router-dom'
import { lessons } from '../data/lessons'
import { LessonPlayer } from '../components/LessonPlayer'

export function Les() {
  const { id } = useParams<{ id: string }>()
  const lesson = lessons.find((l) => l.id === id)

  if (!lesson) {
    return <Navigate to="/" replace />
  }

  return <LessonPlayer lesson={lesson} />
}
