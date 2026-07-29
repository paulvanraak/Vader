/**
 * Lokale, niet-AI terugvalmodus voor "Vraag het". Wordt alleen gebruikt
 * wanneer er geen serverroute bereikbaar is (bijvoorbeeld een losstaande
 * demo zonder backend). Volgt dezelfde opbouw als de systeeminstructie voor
 * het model: een erkenning, één of twee concrete stappen, en een
 * spiegelvraag. Dit is bewust géén AI-antwoord en wordt in de UI ook zo
 * gelabeld, want de app mag zelf niet doen alsof.
 */

interface Scenario {
  keywords: string[]
  answer: string
}

const scenarios: Scenario[] = [
  {
    keywords: ['scherm', 'telefoon', 'scrollen', 'gamen', 'social media', 'insta', 'tiktok'],
    answer:
      'Logisch dat dat schuurt, veel vaders herkennen dit. Probeer vanavond niet te vragen hoelang hij zit, maar wát hij kijkt, en kijk gewoon even mee zonder commentaar. En de spiegel: hoe vaak pak jij zelf je telefoon erbij als jullie samen zijn?',
  },
  {
    keywords: ['influencer', 'youtuber', 'alpha', 'tate', 'coach'],
    answer:
      'Snap dat je schrikt van wat hij aan het kijken is. Vraag oprecht wat hem daarin aanspreekt, zonder oordeel, en vraag ook of er iets in zit waar hij het zelf niet mee eens is. En de spiegel: waar haalt hij nu zijn gevoel van ertoe doen vandaan, en kun jij daar meer van zijn?',
  },
  {
    keywords: ['vrouwen', 'meisjes', 'seksis', 'opmerking'],
    answer:
      'Zo\'n opmerking doet pijn om te horen, dat is begrijpelijk. Adem eerst, en vraag dan rustig door waar het vandaan komt in plaats van meteen te straffen. En de spiegel: hoe praat jij zelf over vrouwen als je moe of geïrriteerd bent?',
  },
  {
    keywords: ['ruzie', 'boos', 'schreeuw', 'snapt niks'],
    answer:
      'Een ruzie als deze voelt vaak zwaarder dan hij is. Geef hem gelijk op het stukje dat klopt, en vraag hem het je te laten zien in plaats van uit te leggen. En de spiegel: reageerde jij op de inhoud, of op de toon?',
  },
  {
    keywords: ['vriend', 'groep', 'buitensluiten', 'pesten', 'appgroep'],
    answer:
      'Vervelend om te merken dat hij hierin meegaat of erbij zwijgt. Vraag hem hoe hij zich op dat moment voelde, zonder dat meteen een preek te maken. En de spiegel: hoe reageerde jij vroeger als iemand in jouw groep buitengesloten werd?',
  },
  {
    keywords: ['faal', 'onvoldoende', 'verloren', 'gefaald', 'gezakt'],
    answer:
      'Vervelend voor hem, en fijn dat je erover nadenkt in plaats van er meteen op te reageren. Vraag rustig wat er volgens hem misging, zonder dat meteen te koppelen aan een gevolg. En de spiegel: hoe praat jij over je eigen fouten waar hij bij is?',
  },
  {
    keywords: ['onzeker', 'stoer', 'opschep', 'zelfvertrouwen'],
    answer:
      'Dat stoere gedrag is meestal een schild, geen karakter. Vraag eens nieuwsgierig wat hem zo trots maakte in plaats van hem te corrigeren. En de spiegel: praat jij jezelf ook weleens groter als je je onzeker voelt?',
  },
]

const fallbackAnswer =
  'Dank dat je dit deelt, dat is niet niks. Neem vanavond een klein moment om er rustig naar te vragen, zonder meteen een oordeel of oplossing klaar te hebben. En de spiegel: wat zou jij op dit moment het liefste willen dat hij van jou merkt?'

export function generateLocalAnswer(question: string): string {
  const normalized = question.toLowerCase()
  const match = scenarios.find((scenario) => scenario.keywords.some((word) => normalized.includes(word)))
  return match ? match.answer : fallbackAnswer
}
