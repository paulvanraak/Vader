import type { ComponentType } from 'react'
import { Home, MessageCircle, Award, ListChecks, Compass } from 'lucide-react'

export type FeatureExplainerId = 'pad' | 'chat' | 'badges' | 'checklist' | 'kompas'

interface FeatureExplainerContent {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  title: string
  body: string[]
}

export const featureExplainers: Record<FeatureExplainerId, FeatureExplainerContent> = {
  pad: {
    icon: Home,
    title: 'Je pad',
    body: [
      "Dit is jouw pad: een opeenvolging van korte lessen, opgedeeld in thema's met elk een eigen kleur.",
      "Onderweg zie je ook andere vormen: een ruit is een reflectiemoment over iets wat je hebt geprobeerd, en een cirkel met een chatbubbel is een 'voor jou'-oefening die uit een gesprek in de chat is ontstaan.",
      'Werk op je eigen tempo. Een nieuwe les ontgrendelt pas zodra de vorige is afgerond.',
    ],
  },
  chat: {
    icon: MessageCircle,
    title: 'Chat',
    body: [
      'Vertel hier gewoon wat er speelt met je kind. Je krijgt concreet advies, toegespitst op de leeftijd en situatie die je beschrijft.',
      "Op gepaste momenten stelt de chat voor om een korte oefening toe te voegen aan je pad, als dat aansluit bij wat je vertelt. Je ziet dat dan als een los kaartje onder het antwoord — jij bepaalt zelf of je 'm toevoegt of laat liggen.",
      'Je gesprekken worden bewaard, zodat je ze later kan terugvinden of kan vastzetten.',
    ],
  },
  badges: {
    icon: Award,
    title: 'Badges',
    body: [
      'Badges markeren mijlpalen: een eerste les, een afgeronde wereld, een oefening die je met je kind hebt gedaan, of een aantal weken op rij dat je iets echt hebt toegepast.',
      'Ze zijn geen doel op zich, maar een manier om terug te zien hoever je al gekomen bent.',
    ],
  },
  checklist: {
    icon: ListChecks,
    title: 'Checklist',
    body: [
      'Elke les levert één of twee concrete acties op die hier verschijnen: dingen om vandaag of deze week met je kind te proberen.',
      'Vink ze af zodra je ze hebt gedaan. Tik op het lampje voor een korte uitleg waarom die actie helpt.',
    ],
  },
  kompas: {
    icon: Compass,
    title: 'Kompas',
    body: [
      "Het kompas geeft een overzicht van alle thema's, ook de thema's die nog op slot zitten.",
      'Zoek op een onderwerp om snel te vinden waar iets over gaat, of klap een thema open om te zien welke lessen erbij horen.',
    ],
  },
}
