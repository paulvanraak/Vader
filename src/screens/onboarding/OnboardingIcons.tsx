function wavePath(y: number) {
  return `M1 ${y}c3 0 3-6 6-6s3 6 6 6 3-6 6-6 3 6 6 6 3-6 6-6 3 6 6 6 3-6 6-6 3 6 6 6`
}

interface IconProps {
  className?: string
}

export function WaveIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 50 42" fill="none" className={className} aria-hidden="true">
      <path d={wavePath(8)} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d={wavePath(21)} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d={wavePath(34)} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

export function DotsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 30 33" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="21" cy="7" r="6.5" />
      <circle cx="6" cy="15" r="5" />
      <circle cx="24" cy="25" r="4.5" />
      <circle cx="9" cy="29" r="3.5" />
    </svg>
  )
}

export function BarsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 29 31" fill="none" className={className} aria-hidden="true">
      <rect x="0" y="0" width="6" height="31" rx="3" fill="currentColor" />
      <rect x="8" y="0" width="6" height="31" rx="3" fill="currentColor" />
      <rect x="16" y="0" width="6" height="31" rx="3" fill="currentColor" />
      <rect x="23.25" y="0.8" width="5.5" height="29.4" rx="2.75" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
