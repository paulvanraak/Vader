import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-surface-sunken ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
