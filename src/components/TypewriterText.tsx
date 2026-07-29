import { useEffect, useMemo, useState } from 'react'

interface TypewriterTextProps {
  text: string
  className?: string
  speedMs?: number
}

export function TypewriterText({ text, className = '', speedMs = 65 }: TypewriterTextProps) {
  const words = useMemo(() => text.split(' '), [text])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setCount(words.length)
      return
    }

    setCount(0)
    let index = 0
    const interval = setInterval(() => {
      index += 1
      setCount(index)
      if (index >= words.length) clearInterval(interval)
    }, speedMs)

    return () => clearInterval(interval)
  }, [words, speedMs])

  const isTyping = count < words.length

  return (
    <p className={`${className} ${isTyping ? 'typewriter-cursor' : ''}`}>
      {words.slice(0, count).map((word, index) => (
        <span key={index}>
          <span className="type-word-in">{word}</span>
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}
