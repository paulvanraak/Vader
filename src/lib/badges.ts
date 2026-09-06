import { Footprints, MessageCircle, CheckCircle2, Trophy, Sparkles, Flame, HeartHandshake } from 'lucide-react'
import type { ComponentType } from 'react'
import { supabase } from './supabaseClient'
import type { Lesson, World } from '../types/lesson'

export type BadgeCategory = 'start' | 'wereld' | 'onderwerp' | 'streak' | 'reflectie'

export interface BadgeDef {
  code: string
  category: BadgeCategory
  title: string
  description: string
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
}

// Badges zijn bewust in code beheerd (niet in de CMS): de vader ontwerpt zelf
// het uiterlijk, en de set groeit vooral via de onderwerp-badges hieronder,
// die dynamisch ontstaan uit echte gesprekken in plaats van vooraf bedacht te
// worden.
const STATIC_BADGES: Record<string, BadgeDef> = {
  eersteLes: {
    code: 'eerste_les',
    category: 'start',
    title: 'Eerste stap',
    description: 'Je hebt je eerste les afgerond. Het pad is begonnen.',
    icon: Footprints,
  },
  eersteGesprek: {
    code: 'eerste_gesprek',
    category: 'start',
    title: 'Eerste gesprek',
    description: 'Je hebt voor het eerst een vraag gesteld in de chat.',
    icon: MessageCircle,
  },
  eersteActie: {
    code: 'eerste_actie',
    category: 'start',
    title: 'Eerste actie',
    description: 'Je hebt je eerste checklist-actie thuis geprobeerd.',
    icon: CheckCircle2,
  },
  streak2: {
    code: 'streak_2',
    category: 'streak',
    title: '2 weken op rij',
    description: 'Twee weken achter elkaar minstens één echt moment met je kind.',
    icon: Flame,
  },
  streak4: {
    code: 'streak_4',
    category: 'streak',
    title: '4 weken op rij',
    description: 'Vier weken achter elkaar volgehouden. Dit begint een gewoonte te worden.',
    icon: Flame,
  },
  streak8: {
    code: 'streak_8',
    category: 'streak',
    title: '8 weken op rij',
    description: 'Acht weken op rij. Dit zit inmiddels in jullie ritme, niet meer alleen in de app.',
    icon: Flame,
  },
  reflectieEerlijk: {
    code: 'reflectie_eerlijk',
    category: 'reflectie',
    title: 'Eerlijke reflectie',
    description: 'Je hebt 5 keer eerlijk teruggeblikt op hoe iets ging, ook als het lastig was.',
    icon: HeartHandshake,
  },
}

export function worldBadge(world: World): BadgeDef {
  return {
    code: `wereld_${world.id}`,
    category: 'wereld',
    title: `${world.title} afgerond`,
    description: `Je hebt alle lessen in "${world.title}" doorlopen.`,
    icon: Trophy,
  }
}

export function slugifyTopic(title: string): string {
  // NFD splitst bv. "é" in "e" + een apart accent-teken, dat vervolgens
  // gewoon wegvalt als "niet a-z0-9" — geen aparte unicode-range nodig.
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

export function topicBadge(title: string): BadgeDef {
  const slug = slugifyTopic(title)
  return {
    code: `onderwerp_${slug}`,
    category: 'onderwerp',
    title: `${title} aangepakt`,
    description: `Je hebt een onderwerp uit je eigen gesprekken vertaald naar een echte oefening, en teruggeblikt op hoe het ging.`,
    icon: Sparkles,
  }
}

export interface BadgeEvalContext {
  worlds: World[]
  path: Lesson[]
  completedLessonIds: string[]
  chatThreadCount: number
  actionCompletionsCount: number
  connectionStreakWeeks: number
  resolvedReflectionCount: number
  resolvedTopicTitles: string[]
  alreadyEarnedCodes: Set<string>
}

// Geeft alleen de badges terug die nu voor het eerst verdiend zijn, zodat de
// aanroeper ze zowel kan opslaan als (later) kan tonen als nieuw behaald.
export function evaluateBadges(ctx: BadgeEvalContext): BadgeDef[] {
  const newly: BadgeDef[] = []
  const seen = new Set<string>()

  function maybeAward(def: BadgeDef, earned: boolean) {
    if (!earned || ctx.alreadyEarnedCodes.has(def.code) || seen.has(def.code)) return
    seen.add(def.code)
    newly.push(def)
  }

  maybeAward(STATIC_BADGES.eersteLes, ctx.completedLessonIds.length >= 1)
  maybeAward(STATIC_BADGES.eersteGesprek, ctx.chatThreadCount >= 1)
  maybeAward(STATIC_BADGES.eersteActie, ctx.actionCompletionsCount >= 1)
  maybeAward(STATIC_BADGES.streak2, ctx.connectionStreakWeeks >= 2)
  maybeAward(STATIC_BADGES.streak4, ctx.connectionStreakWeeks >= 4)
  maybeAward(STATIC_BADGES.streak8, ctx.connectionStreakWeeks >= 8)
  maybeAward(STATIC_BADGES.reflectieEerlijk, ctx.resolvedReflectionCount >= 5)

  for (const world of ctx.worlds) {
    const worldLessons = ctx.path.filter((l) => l.world === world.id)
    const complete = worldLessons.length > 0 && worldLessons.every((l) => ctx.completedLessonIds.includes(l.id))
    maybeAward(worldBadge(world), complete)
  }

  for (const title of ctx.resolvedTopicTitles) {
    maybeAward(topicBadge(title), true)
  }

  return newly
}

// Volledige catalogus voor het badges-overzicht: alle statische badges plus
// een wereld-badge per bestaande wereld. Onderwerp-badges verschijnen in het
// overzicht pas zodra ze daadwerkelijk verdiend zijn (die staan niet vooraf
// vast, dus worden apart meegegeven vanuit de aanroeper).
export function badgeCatalog(worlds: World[]): BadgeDef[] {
  return [...Object.values(STATIC_BADGES), ...worlds.map(worldBadge)]
}

interface EarnedBadgeRow {
  badge_code: string
  earned_at: string
}

export async function fetchEarnedBadges(childId: string): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from('earned_badges')
    .select('badge_code, earned_at')
    .eq('child_id', childId)
  if (error) throw error
  return Object.fromEntries((data as EarnedBadgeRow[] | null ?? []).map((row) => [row.badge_code, row.earned_at]))
}

export async function awardBadges(childId: string, codes: string[]): Promise<void> {
  if (codes.length === 0) return
  const { error } = await supabase
    .from('earned_badges')
    .upsert(
      codes.map((code) => ({ child_id: childId, badge_code: code })),
      { onConflict: 'child_id,badge_code', ignoreDuplicates: true },
    )
  if (error) throw error
}
