export interface WorldStyle {
  solidBg: string
  softBg: string
  text: string
  edgeShadow: string
  edgeShadowActive: string
  accentVar: string
}

export const worldStyles: Record<number, WorldStyle> = {
  1: {
    solidBg: 'bg-accent-teal',
    softBg: 'bg-accent-teal/10',
    text: 'text-accent-teal',
    edgeShadow: 'shadow-[0_4px_0_0_var(--color-accent-teal-dark)]',
    edgeShadowActive: 'shadow-[0_1px_0_0_var(--color-accent-teal-dark)]',
    accentVar: 'var(--color-accent-teal)',
  },
  2: {
    solidBg: 'bg-accent-rose',
    softBg: 'bg-accent-rose/10',
    text: 'text-accent-rose',
    edgeShadow: 'shadow-[0_4px_0_0_var(--color-accent-rose-dark)]',
    edgeShadowActive: 'shadow-[0_1px_0_0_var(--color-accent-rose-dark)]',
    accentVar: 'var(--color-accent-rose)',
  },
  3: {
    solidBg: 'bg-accent-amber',
    softBg: 'bg-accent-amber/10',
    text: 'text-accent-amber',
    edgeShadow: 'shadow-[0_4px_0_0_var(--color-accent-amber-dark)]',
    edgeShadowActive: 'shadow-[0_1px_0_0_var(--color-accent-amber-dark)]',
    accentVar: 'var(--color-accent-amber)',
  },
  4: {
    solidBg: 'bg-primary-500',
    softBg: 'bg-primary-500/10',
    text: 'text-primary-600',
    edgeShadow: 'shadow-[0_4px_0_0_var(--color-primary-700)]',
    edgeShadowActive: 'shadow-[0_1px_0_0_var(--color-primary-700)]',
    accentVar: 'var(--color-primary-500)',
  },
  5: {
    solidBg: 'bg-accent-violet',
    softBg: 'bg-accent-violet/10',
    text: 'text-accent-violet',
    edgeShadow: 'shadow-[0_4px_0_0_var(--color-accent-violet-dark)]',
    edgeShadowActive: 'shadow-[0_1px_0_0_var(--color-accent-violet-dark)]',
    accentVar: 'var(--color-accent-violet)',
  },
  6: {
    solidBg: 'bg-accent-orange',
    softBg: 'bg-accent-orange/10',
    text: 'text-accent-orange',
    edgeShadow: 'shadow-[0_4px_0_0_var(--color-accent-orange-dark)]',
    edgeShadowActive: 'shadow-[0_1px_0_0_var(--color-accent-orange-dark)]',
    accentVar: 'var(--color-accent-orange)',
  },
}

export function getWorldStyle(worldId: number): WorldStyle {
  return worldStyles[worldId] ?? worldStyles[4]
}
