import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-neutral-white p-5 shadow-sm ring-1 ring-neutral-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
