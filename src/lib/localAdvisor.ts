/**
 * Lokale, niet-AI terugvalmodus voor "Vraag het". Wordt alleen gebruikt
 * wanneer er geen serverroute bereikbaar is (bijvoorbeeld een losstaande
 * demo zonder backend). Volgt dezelfde opbouw als de systeeminstructie voor
 * het model: een erkenning, een kort psychologisch inzicht, een suggestie
 * (geen bevel), en een spiegelvraag. Dit is bewust géén AI-antwoord en wordt
 * in de UI ook zo gelabeld, want de app mag zelf niet doen alsof.
 */

interface Scenario {
  keywords: string[]
  answer: string
}

const scenarios: Scenario[] = [
  {
    keywords: ['scherm', 'telefoon', 'scrollen', 'gamen', 'social media', 'insta', 'tiktok'],
    answer:
      'Logisch dat dat schuurt, veel vaders herkennen dit. Het puberbrein is extra gevoelig voor de korte, sterke prikkels die zo\'n app geeft, dus die aantrekkingskracht is bij hem groter dan bij jou. Een optie is niet te vragen hoelang hij zit, maar wát hij kijkt, en er even bij te gaan zitten zonder commentaar. Wat zou de beste aanpak zijn als je bedenkt hoe vaak je zelf je telefoon erbij pakt als jullie samen zijn?',
  },
  {
    keywords: ['influencer', 'youtuber', 'alpha', 'tate', 'coach'],
    answer:
      'Begrijpelijk dat je schrikt van wat hij aan het kijken is. Dit soort figuren verkoopt eerst iets aantrekkelijks, namelijk erbij horen en houvast, en pas later de rest. Je zou hem kunnen vragen wat hem daarin aanspreekt, zonder oordeel, en of er ook iets in zit waar hij het zelf niet mee eens is. Wat zou de beste aanpak zijn om zelf die bron van houvast te worden?',
  },
  {
    keywords: ['vrouwen', 'meisjes', 'seksis', 'opmerking'],
    answer:
      'Zo\'n opmerking doet pijn om te horen. Een felle reactie maakt er al snel een machtsstrijd van, waardoor hij zich juist ingraaft, dat heet reactance. Rustig doorvragen waar het vandaan komt, in plaats van meteen te reageren, haalt vaak meer los. Wat zou de beste aanpak zijn als je ook kijkt naar hoe je zelf over vrouwen praat wanneer je moe of geïrriteerd bent?',
  },
  {
    keywords: ['ruzie', 'boos', 'schreeuw', 'snapt niks'],
    answer:
      'Een ruzie als deze voelt vaak zwaarder dan hij is. Op deze leeftijd zoekt hij vooral erkenning voor zijn eigen kijk op de zaak, niet per se gelijk. Hem gelijk geven op het stukje dat klopt, en vragen het je te laten zien in plaats van uit te leggen, kan de deur weer openen. Wat zou de beste aanpak zijn: reageer je op de inhoud, of vooral op de toon?',
  },
  {
    keywords: ['vriend', 'groep', 'buitensluiten', 'pesten', 'appgroep'],
    answer:
      'Vervelend om te merken dat hij hierin meegaat of erbij zwijgt. Onderzoek naar het omstandereffect laat zien dat zwijgend toekijken voor het slachtoffer weinig verschilt van meedoen, terwijl erbij willen horen op deze leeftijd nu eenmaal zwaar weegt. Vragen hoe hij zich op dat moment voelde, zonder meteen een preek, opent vaak meer dan een verwijt. Wat zou de beste aanpak zijn als je bedenkt hoe jij vroeger reageerde in zo\'n situatie?',
  },
  {
    keywords: ['faal', 'onvoldoende', 'verloren', 'gefaald', 'gezakt'],
    answer:
      'Vervelend voor hem, en fijn dat je erover nadenkt in plaats van er meteen op te reageren. Faalangst gaat zelden over de fout zelf, vaker over de verwachte reactie van jou. Rustig vragen wat er volgens hem misging, zonder dat meteen aan een gevolg te koppelen, houdt het bespreekbaar. Wat zou de beste aanpak zijn als je ook kijkt naar hoe jij zelf over je eigen fouten praat waar hij bij is?',
  },
  {
    keywords: ['onzeker', 'stoer', 'opschep', 'zelfvertrouwen'],
    answer:
      'Dat stoere gedrag is meestal een schild, geen karaktertrek: onder imponeergedrag zit vaak een broos gevoel van eigenwaarde dat nog geen woorden heeft. Nieuwsgierig vragen wat hem zo trots maakte, in plaats van hem te corrigeren, laat dat schild vanzelf kleiner worden. Wat zou de beste aanpak zijn als je ook bij jezelf nagaat of je jezelf weleens groter praat wanneer je onzeker bent?',
  },
]

const fallbackAnswer =
  'Dank dat je dit deelt, dat is niet niks. Vaak helpt het al om er rustig naar te vragen, zonder meteen een oordeel of oplossing klaar te hebben. Wat zou de beste aanpak zijn, gezien wat je op dit moment het liefste zou willen dat hij van jou merkt?'

export function generateLocalAnswer(question: string): string {
  const normalized = question.toLowerCase()
  const match = scenarios.find((scenario) => scenario.keywords.some((word) => normalized.includes(word)))
  return match ? match.answer : fallbackAnswer
}
