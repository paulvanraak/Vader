import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

const base =
  'mx-auto flex w-[88%] max-w-[340px] items-center justify-center gap-2 rounded-md px-5 py-3.5 text-label transition-[transform,box-shadow,background-color] duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary-500 text-neutral-white shadow-[0_6px_0_0_var(--color-primary-700)] hover:bg-primary-600 active:translate-y-[5px] active:shadow-[0_1px_0_0_var(--color-primary-700)]',
  secondary:
    'bg-surface text-ink shadow-[0_6px_0_0_var(--color-ink-faint)] hover:bg-surface-sunken active:translate-y-[5px] active:shadow-[0_1px_0_0_var(--color-ink-faint)]',
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
