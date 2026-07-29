import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  className?: string
  speedMs?: number
}

export function TypewriterText({ text, className = '', speedMs = 16 }: TypewriterTextProps) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setShown(text)
      return
    }

    setShown('')
    let index = 0
    const interval = setInterval(() => {
      index += 1
      setShown(text.slice(0, index))
      if (index >= text.length) clearInterval(interval)
    }, speedMs)

    return () => clearInterval(interval)
  }, [text, speedMs])

  const isTyping = shown.length < text.length

  return <p className={`${className} ${isTyping ? 'typewriter-cursor' : ''}`}>{shown}</p>
}
