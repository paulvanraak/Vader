import type { ComponentType } from 'react'
import { Home, MessageCircle, Award, ListChecks, Compass } from 'lucide-react'

export type FeatureExplainerId = 'pad' | 'chat' | 'badges' | 'checklist' | 'kompas'

interface FeatureExplainerContent {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  title: string
  body: string
}

export const featureExplainers: Record<FeatureExplainerId, FeatureExplainerContent> = {
  pad: {
    icon: Home,
    title: 'Je pad',
    body: "Korte lessen per thema. Ruiten zijn reflecties, cirkels met een bubbel zijn 'voor jou'-oefeningen uit de chat.",
  },
  chat: {
    icon: MessageCircle,
    title: 'Chat',
    body: 'Vertel wat er speelt en krijg advies op maat. Soms stelt de chat voor een oefening aan je pad toe te voegen — jij kiest zelf.',
  },
  badges: {
    icon: Award,
    title: 'Badges',
    body: 'Mijlpalen: een les, een afgeronde wereld, of een paar weken op rij volhouden.',
  },
  checklist: {
    icon: ListChecks,
    title: 'Checklist',
    body: 'Concrete acties uit je lessen om vandaag te proberen. Vink af zodra het gelukt is.',
  },
  kompas: {
    icon: Compass,
    title: 'Kompas',
    body: "Overzicht van alle thema's, ook de nog-op-slot thema's. Zoek of klap er een open.",
  },
}
