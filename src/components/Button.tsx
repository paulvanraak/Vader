import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { hapticTap } from '../lib/haptics'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

const base =
  'mx-auto flex w-[88%] max-w-[340px] items-center justify-center gap-2 rounded-full px-6 py-4 text-label transition active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-40 disabled:pointer-events-none'

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-ink text-page hover:bg-ink/90',
  secondary: 'border-2 border-ink bg-transparent text-ink hover:bg-ink/5',
}

export function Button({ variant = 'primary', className = '', children, onClick, ...props }: ButtonProps) {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    hapticTap()
    onClick?.(e)
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} onClick={handleClick} {...props}>
      {children}
    </button>
  )
}
