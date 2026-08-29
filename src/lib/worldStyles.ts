export interface WorldStyle {
  solidBg: string
  softBg: string
  text: string
  edgeShadow: string
  edgeShadowActive: string
  accentVar: string
  /** Diepe, donkere tint van de wereldkleur — volle achtergrond voor Inzicht/Spiegel. */
  dark: string
}

export const worldStyles: Record<number, WorldStyle> = {
  1: {
    solidBg: 'bg-accent-teal',
    softBg: 'bg-accent-teal/20',
    text: 'text-accent-teal',
    edgeShadow: 'shadow-[0_5px_0_0_var(--color-accent-teal-dark)]',
    edgeShadowActive: 'shadow-[0_1px_0_0_var(--color-accent-teal-dark)]',
    accentVar: 'var(--color-accent-teal)',
    dark: '#0f2e2b',
  },
  2: {
    solidBg: 'bg-accent-rose',
    softBg: 'bg-accent-rose/25',
    text: 'text-accent-rose-dark',
    edgeShadow: 'shadow-[0_5px_0_0_var(--color-accent-rose-dark)]',
    edgeShadowActive: 'shadow-[0_1px_0_0_var(--color-accent-rose-dark)]',
    accentVar: 'var(--color-accent-rose)',
    dark: '#361221',
  },
  3: {
    solidBg: 'bg-accent-amber',
    softBg: 'bg-accent-amber/20',
    text: 'text-accent-amber-dark',
    edgeShadow: 'shadow-[0_5px_0_0_var(--color-accent-amber-dark)]',
    edgeShadowActive: 'shadow-[0_1px_0_0_var(--color-accent-amber-dark)]',
    accentVar: 'var(--color-accent-amber)',
    dark: '#332405',
  },
  4: {
    solidBg: 'bg-primary-500',
    softBg: 'bg-primary-500/20',
    text: 'text-primary-600',
    edgeShadow: 'shadow-[0_5px_0_0_var(--color-primary-700)]',
    edgeShadowActive: 'shadow-[0_1px_0_0_var(--color-primary-700)]',
    accentVar: 'var(--color-primary-500)',
    dark: '#0b2540',
  },
  5: {
    solidBg: 'bg-accent-violet',
    softBg: 'bg-accent-violet/25',
    text: 'text-accent-violet-dark',
    edgeShadow: 'shadow-[0_5px_0_0_var(--color-accent-violet-dark)]',
    edgeShadowActive: 'shadow-[0_1px_0_0_var(--color-accent-violet-dark)]',
    accentVar: 'var(--color-accent-violet)',
    dark: '#231b45',
  },
  6: {
    solidBg: 'bg-accent-orange',
    softBg: 'bg-accent-orange/20',
    text: 'text-accent-orange',
    edgeShadow: 'shadow-[0_5px_0_0_var(--color-accent-orange-dark)]',
    edgeShadowActive: 'shadow-[0_1px_0_0_var(--color-accent-orange-dark)]',
    accentVar: 'var(--color-accent-orange)',
    dark: '#332008',
  },
}

export function getWorldStyle(worldId: number): WorldStyle {
  return worldStyles[worldId] ?? worldStyles[4]
}
