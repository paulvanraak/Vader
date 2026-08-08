import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface OnboardingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: 'light' | 'dark'
  children: ReactNode
}

const tones: Record<NonNullable<OnboardingButtonProps['tone']>, string> = {
  dark: 'bg-black text-white shadow-[inset_0px_-4px_0px_0px_rgba(255,255,255,0.9)]',
  light: 'bg-[#b1e9ff] text-black shadow-[inset_0px_-4px_0px_0px_#ffffff]',
}

export function OnboardingButton({ tone = 'light', className = '', children, ...props }: OnboardingButtonProps) {
  return (
    <button
      className={`w-full rounded-[10px] px-5 py-4 text-[20px] font-medium transition active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:pointer-events-none ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
