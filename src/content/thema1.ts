/**
 * Thema 1 — Contact maken. Volledig uitgewerkt in de nieuwe opzet, als losse
 * content zodat er geen migratie voor nodig is en je het meteen kunt lopen.
 *
 * Raamwerk A, "de boog": vier lessen die op elkaar staan — herkennen, begrijpen,
 * proberen, volhouden. Fundament-thema, dus hier doet de volgorde er echt toe.
 *
 * Acht weken: vier weken nieuw, twee weken consolidatie met checkpoint, twee
 * weken stil. Zie docs/FatherFlow-content-werkboek.xlsx, tabblad Jaarritme.
 *
 * Geschreven voor een zoon in de band "vroeg" (11-13). Tokens als {naam} en
 * {hij} worden door src/lib/personalize.ts vervangen.
 */

export type OefeningType =
  | 'waar-ging-het-mis'
  | 'eerste-neiging'
  | 'twee-wegen'
  | 'een-woord'
  | 'en-dan'
  | 'volgorde'
  | 'beste-aanpak'

export interface Optie {
  id: string
  label: string
  feedback: string
  /** Alleen bij 'beste-aanpak'. Bij de andere types bestaat "goed" niet. */
  correct?: boolean
}

export interface DialoogRegel {
  spreker: 'vader' | 'kind'
  tekst: string
  /** De regel waar het kantelde, bij 'waar-ging-het-mis'. */
  kantelt?: boolean
  waarom?: string
}

export interface Oefening {
  id: string
  type: OefeningType
  /** Valt er iets goed of fout te doen? Bij de helft bewust niet. */
  scoorbaar: boolean
  lesId: string
  situatie: string
  vraag: string
  opties?: Optie[]
  dialoog?: DialoogRegel[]
  /** Bij 'volgorde': de juiste volgorde. Wordt geschud voor vertoning. */
  stappen?: { tekst: string; waarom: string }[]
  /** Bij 'twee-wegen': waar de keuze werkelijk van afhangt. */
  afhangt?: string
}

export interface Les {
  id: string
  nr: number
  fase: 'Herkennen' | 'Begrijpen' | 'Proberen' | 'Volhouden'
  titel: string
  haakje: string
  inzicht: string
  spiegel: string
  thuismissie: { actie: string; waarom: string }
}

export const THEMA1_LESSEN: Les[] = [
  {
    id: 't1-l1',
    nr: 1,
    fase: 'Herkennen',
    titel: 'Wanneer is het gesprek gestopt?',
    haakje:
      'Vroeger ratelde {hij} de hele weg naar huis. Nu is het "goed" en dan de oordopjes in. ' +
      'Je weet niet precies wanneer dat is omgeslagen. Dat is niet omdat je niet oplette.',
    inzicht:
      'Contact verdwijnt zelden met een klap. Het slijt. Elke keer dat een gesprek strandt, ' +
      'begin je de volgende keer iets voorzichtiger, en daardoor strandt het weer. Dat is geen ' +
      'afwijzing van {naam} en ook geen fout van jou — het is een lus die vanzelf strakker wordt. ' +
      'Het goede nieuws is dat een lus aan twee kanten los te maken is.',
    spiegel:
      'Denk aan de laatste keer dat {naam} je uit zichzelf iets vertelde. Niet iets praktisch — ' +
      'iets dat er voor {hem} toe deed. Weet je nog waar je was, en wat je aan het doen was?',
    thuismissie: {
      actie: 'Loop deze week één keer {zijn} kamer in zonder reden.',
      waarom:
        'Geen vraag, geen boodschap, geen "hoe ging het". Alleen even zijn. Dat klinkt als niks ' +
        'doen, en het is precies het tegenovergestelde: je maakt jezelf weer beschikbaar zonder ' +
        'dat er iets tegenover hoeft te staan.',
    },
  },
  {
    id: 't1-l2',
    nr: 2,
    fase: 'Begrijpen',
    titel: 'Waarom {hij} niks zegt terwijl er wel iets is',
    haakje:
      'Je ziet aan {hem} dat er iets is. Je vraagt het. "Niks." En je weet zeker dat het niet niks is.',
    inzicht:
      'Rond deze leeftijd verschuift bij wie {naam} zijn verhaal kwijt kan. Vrienden worden de ' +
      'eerste kring, ouders de tweede. Dat is geen breuk maar een verhuizing, en het hoort erbij. ' +
      'Tegelijk kan {hij} vaak nog niet benoemen wat er precies speelt — het gevoel is er eerder ' +
      'dan de woorden. "Niks" betekent dan niet "ik wil het je niet vertellen", maar "ik weet nog ' +
      'niet hoe ik dit moet zeggen". Dat is een heel ander antwoord, en het vraagt om iets anders ' +
      'van jou: geen betere vraag, maar meer tijd.',
    spiegel:
      'Wanneer vertelde jij als jongen iets aan je eigen vader? En wat deed hij toen waardoor je ' +
      'het vertelde — of juist niet?',
    thuismissie: {
      actie: 'Vertel zelf één keer iets kleins over jouw dag, zonder iets terug te vragen.',
      waarom:
        'Je laat zien hoe het eruitziet om iets te delen zonder dat het zwaar is. En omdat je niks ' +
        'terugvraagt, is er niets om zich tegen te verzetten. Dit is de traagste van de vier ' +
        'missies en meestal degene die het meest oplevert.',
    },
  },
  {
    id: 't1-l3',
    nr: 3,
    fase: 'Proberen',
    titel: 'Het gesprek dat niet aan tafel begint',
    haakje:
      'Aan tafel zitten jullie tegenover elkaar, met oogcontact en een verwachting. Dat is precies ' +
      'de opstelling waarin {naam} dichtklapt.',
    inzicht:
      'Naast elkaar praat makkelijker dan tegenover elkaar. In de auto, tijdens de afwas, onderweg ' +
      'naar de training. Geen oogcontact betekent minder druk, en een half afgeleide bezigheid ' +
      'geeft {hem} een uitweg als het te dichtbij komt — {hij} kan altijd stoppen zonder dat het ' +
      'een scène is. Die uitweg is geen zwakte van het gesprek. Die uitweg ís waarom het gesprek ' +
      'kan ontstaan.',
    spiegel:
      'Waar zijn jullie samen zonder dat er iets van jullie verwacht wordt? Als je daar geen ' +
      'antwoord op hebt, is dat het echte werk van deze week.',
    thuismissie: {
      actie: 'Begin één gesprek terwijl je samen iets anders doet.',
      waarom:
        'Rijden, lopen, klussen, afwassen. Het maakt niet uit wat, als jullie maar niet tegenover ' +
        'elkaar zitten met dit gesprek als enige doel.',
    },
  },
  {
    id: 't1-l4',
    nr: 4,
    fase: 'Volhouden',
    titel: 'Als je het drie keer probeert en er komt niks',
    haakje:
      'Je hebt het geprobeerd. Je liep binnen, je vertelde iets, je begon in de auto. En {hij} gaf ' +
      'je niks terug. Dan komt de gedachte: laat ook maar.',
    inzicht:
      'Wat je opbouwt is niet het gesprek van vanavond. Het is dat {naam} weet waar je staat als ' +
      '{hij} je een keer nodig heeft — en dat moment kies jij niet. Meestal komt het op een ' +
      'onhandig tijdstip, kort, en over iets waar je niet op rekende. Beschikbaar zijn is een ' +
      'investering waarvan je het rendement niet ziet op het moment dat je hem doet. Stoppen ' +
      'omdat er niks terugkomt, is stoppen net voordat het gaat werken.',
    spiegel:
      'Wat zou er moeten gebeuren voordat jij denkt: het werkt? En is dat een eerlijke maat, of ' +
      'vraag je iets wat een jongen van deze leeftijd nooit gaat geven?',
    thuismissie: {
      actie: 'Doe deze week één ding uit de vorige drie missies nog een keer.',
      waarom:
        'Niet iets nieuws. Hetzelfde, nog een keer, zonder resultaat te verwachten. Dat is waar ' +
        'volhouden op neerkomt.',
    },
  },
]

export const THEMA1_OEFENINGEN: Oefening[] = [
  {
    id: 't1-o1',
    type: 'waar-ging-het-mis',
    scoorbaar: true,
    lesId: 't1-l1',
    situatie: '{naam} komt thuis van school.',
    vraag: 'Vier regels. Waar kantelde het?',
    dialoog: [
      { spreker: 'vader', tekst: 'Hé, hoe was het?' },
      { spreker: 'kind', tekst: 'Goed.' },
      {
        spreker: 'vader',
        tekst: 'Alleen goed? Er moet toch iets gebeurd zijn.',
        kantelt: true,
        waarom:
          'Hier wordt "goed" afgekeurd als antwoord. {naam} hoort: wat ik gaf was niet genoeg. ' +
          'De volgende keer begint {hij} dus lager, of helemaal niet. Niet de vraag was fout — ' +
          'het afwijzen van het antwoord was fout.',
      },
      { spreker: 'kind', tekst: '...Nee. Ik ga naar boven.' },
    ],
  },
  {
    id: 't1-o2',
    type: 'eerste-neiging',
    scoorbaar: false,
    lesId: 't1-l1',
    situatie: '{naam} loopt binnen, zegt niks, en gaat meteen naar boven.',
    vraag: 'Wat is je eerste neiging? Kies wat je écht zou doen.',
    opties: [
      {
        id: 'a',
        label: '{Hem} terugroepen. Even normaal gedag zeggen.',
        feedback:
          'Begrijpelijk — het voelt onbeleefd en je wil niet dat dat de norm wordt. Wat het ' +
          'meestal oplevert is dat het eerste gesprek van de dag over omgangsvormen gaat in ' +
          'plaats van over {hem}. Bewaar die correctie voor een moment waarop er verder niks speelt.',
      },
      {
        id: 'b',
        label: 'Achter {hem} aan lopen en vragen wat er is.',
        feedback:
          'Je merkt iets en je wil erbij zijn. Dat klopt. Het risico is de timing: op het moment ' +
          'dat {hij} net binnen is, is {hij} nog aan het landen. Dezelfde vraag een uur later ' +
          'krijgt vaak een heel ander antwoord.',
      },
      {
        id: 'c',
        label: 'Niks doen. {Hem} laten.',
        feedback:
          'Vaak de verstandigste eerste zet — mits het geen gewoonte wordt. Het verschil tussen ' +
          'ruimte geven en er niet zijn, is of je later op de avond alsnog even langsloopt.',
      },
      {
        id: 'd',
        label: 'Geïrriteerd raken en dat inslikken.',
        feedback:
          'Dit is het eerlijkste antwoord dat er in deze lijst staat, en waarschijnlijk het meest ' +
          'voorkomende. Ingeslikte irritatie komt er later uit op een moment dat er iets anders ' +
          'speelt. Als je het herkent, is het al minder sturend.',
      },
    ],
  },
  {
    id: 't1-o3',
    type: 'twee-wegen',
    scoorbaar: false,
    lesId: 't1-l2',
    situatie: '{naam} is al twee dagen stiller dan normaal.',
    vraag: 'Twee wegen. Welke past hier?',
    afhangt:
      'Het hangt af van hoe lang het al duurt. Eén stille avond is meestal moeheid en heeft geen ' +
      'gesprek nodig. Twee dagen is een patroon, en dan is wachten niet langer geduld maar ' +
      'afwezigheid. De vuistregel die de meeste vaders helpt: één dag laten, bij de tweede iets zeggen.',
    opties: [
      {
        id: 'a',
        label: 'Nog even laten. {Hij} komt wel als {hij} eraan toe is.',
        feedback:
          'Werkt als {hij} normaal gesproken wél naar je toe komt. Let op het woord "even" — ' +
          'als dat gisteren ook al je antwoord was, is het geen ruimte meer.',
      },
      {
        id: 'b',
        label: 'Benoemen dat je het ziet, zonder een vraag te stellen.',
        feedback:
          '"Je bent stil de laatste dagen. Ik zeg er verder niks van, ik zag het gewoon." Dat is ' +
          'geen vraag, dus er hoeft niks beantwoord te worden, en tegelijk weet {hij} dat je het ziet. ' +
          'Dit is bijna altijd veilig.',
      },
    ],
  },
  {
    id: 't1-o4',
    type: 'een-woord',
    scoorbaar: true,
    lesId: 't1-l2',
    situatie: 'Je wil weten wat er speelde op school.',
    vraag: 'Twee zinnen die één woord schelen. Welke opent meer?',
    opties: [
      {
        id: 'a',
        label: 'Waarom deed je dat?',
        feedback:
          '"Waarom" vraagt om een rechtvaardiging. Het antwoord is bijna altijd "weet ik niet" of ' +
          'een verdediging, want de vraag zet {hem} in de beklaagdenbank — ook als je het zo niet bedoelt.',
      },
      {
        id: 'b',
        label: 'Wat gebeurde er?',
        correct: true,
        feedback:
          '"Wat" vraagt om een verhaal in plaats van een verantwoording. Dezelfde nieuwsgierigheid, ' +
          'maar {hij} hoeft zichzelf niet te verdedigen om antwoord te geven. Dit ene woord is de ' +
          'grootste winst in dit hele thema.',
      },
    ],
  },
  {
    id: 't1-o5',
    type: 'en-dan',
    scoorbaar: false,
    lesId: 't1-l2',
    situatie: '{naam} vertelt iets kleins over een ruzie in de klas. Jij zegt: "Dat had je toch gewoon kunnen negeren?"',
    vraag: 'Wat gebeurt er dan meestal?',
    opties: [
      {
        id: 'a',
        label: '{Hij} legt uit waarom dat niet kon.',
        feedback:
          'Kan, maar dan gaat het gesprek over of {hij} gelijk had. Niet over wat het met {hem} deed.',
      },
      {
        id: 'b',
        label: '{Hij} haalt {zijn} schouders op en stopt met vertellen.',
        feedback:
          'Dit is meestal wat er gebeurt. {Hij} kwam met een verhaal en kreeg een oplossing terug. ' +
          'De volgende keer vertelt {hij} het net iets minder. Zo slijt contact — niet door ruzie, ' +
          'maar door goedbedoelde adviezen.',
      },
      {
        id: 'c',
        label: '{Hij} wordt boos op jou.',
        feedback:
          'Gebeurt soms, en het is dan eigenlijk het gunstigste van de drie: boosheid is nog contact. ' +
          'Schouderophalen is het einde van het gesprek.',
      },
    ],
  },
  {
    id: 't1-o6',
    type: 'volgorde',
    scoorbaar: true,
    lesId: 't1-l3',
    situatie: '{naam} komt thuis en gooit {zijn} tas neer. Er is duidelijk iets.',
    vraag: 'Zet de drie stappen in de volgorde die het meest oplevert.',
    stappen: [
      {
        tekst: 'Benoemen wat je ziet',
        waarom: 'Eerst laten merken dat je het ziet. Zonder oordeel, zonder vraag. "Er is iets."',
      },
      {
        tekst: 'Wachten',
        waarom:
          'De stap die de meeste vaders overslaan, en de belangrijkste. Vijf seconden stilte is ' +
          'lang, en precies daarin komt vaak het eerste echte zinnetje.',
      },
      {
        tekst: 'Eén concrete vraag',
        waarom:
          'Pas als er ruimte is. Klein en specifiek — "wat gebeurde er in de pauze", niet "hoe was je dag".',
      },
    ],
  },
  {
    id: 't1-o7',
    type: 'twee-wegen',
    scoorbaar: false,
    lesId: 't1-l3',
    situatie: 'Jullie zitten in de auto. {naam} vertelt uit zichzelf iets over een vriend.',
    vraag: 'Twee wegen. Welke past hier?',
    afhangt:
      'Het hangt af van wie er praat. Vertelt {hij} door, dan is stil blijven het beste wat je kunt ' +
      'doen — elke vraag is dan een onderbreking. Stokt het, dan helpt één vraag om het weer op gang ' +
      'te brengen. De kunst is merken welke van de twee er gebeurt, en dat merk je alleen door even ' +
      'niets te zeggen.',
    opties: [
      {
        id: 'a',
        label: 'Doorvragen, nu {hij} toch praat.',
        feedback:
          'De verleiding is groot, want er is eindelijk een opening. Maar drie vragen achter elkaar ' +
          'verandert een verhaal in een verhoor, en dan sluit de opening weer.',
      },
      {
        id: 'b',
        label: 'Hummen en verder rijden.',
        feedback:
          'Klinkt als te weinig doen. Is meestal precies genoeg. "Hm" betekent: ik luister, ga door. ' +
          'De langste verhalen komen na de kortste reacties.',
      },
    ],
  },
  {
    id: 't1-o8',
    type: 'beste-aanpak',
    scoorbaar: true,
    lesId: 't1-l4',
    situatie: '{naam} zegt op een dinsdagavond laat, in de deuropening: "Pap, mag ik wat vragen?"',
    vraag: 'Dit is het moment waar je al weken op wacht. Wat doe je?',
    opties: [
      {
        id: 'a',
        label: 'Zeggen dat het laat is en dat het morgen ook kan.',
        feedback:
          'Praktisch gezien redelijk. Alleen: {hij} koos dit moment niet toevallig. Laat, in een ' +
          'deuropening, half weggedraaid — dat is hoe deze leeftijd iets moeilijks aansnijdt. ' +
          'Morgen is het weg.',
      },
      {
        id: 'b',
        label: 'Alles neerleggen en zeggen: ja, kom.',
        correct: true,
        feedback:
          'Dit is de zeldzame keer dat er wél één duidelijk beter antwoord is. Deze momenten zijn ' +
          'schaars, ze duren kort, en ze komen op een onhandig tijdstip. Alles waar je mee bezig ' +
          'was kan wachten.',
      },
      {
        id: 'c',
        label: 'Vragen of het belangrijk is.',
        feedback:
          'Goed bedoeld, maar je legt de drempel terug bij {hem}. Een jongen die het al eng vond ' +
          'om te beginnen, zegt dan "laat maar".',
      },
    ],
  },
]

export const THEMA1 = {
  id: 'thema-1',
  titel: 'Contact maken',
  ondertitel: 'Hoe je bereikbaar blijft als {hij} zich terugtrekt',
  raamwerk: 'A — De boog',
  weken: 8,
  intro: {
    kop: 'Contact maken',
    tekst:
      'Vier lessen die op elkaar staan: eerst zien wat er gebeurd is, dan begrijpen waaróm, dan iets ' +
      'anders proberen, en dan volhouden als er niet meteen iets terugkomt.\n\n' +
      'Acht weken. Vier weken nieuw, twee weken oefenen, twee weken rust. Er zijn acht oefeningen; ' +
      'je krijgt er drie per keer, steeds in een andere mix.',
    belofte:
      'Aan het eind weet je niet hoe je {naam} aan het praten krijgt. Dat kan niemand. Je weet wél ' +
      'wat je zelf doet waardoor {hij} stopt, en dat is het enige waar je invloed op hebt.',
  },
  checkpoint: {
    kop: 'Contact maken — afgerond',
    tekst:
      'Zes weken, vier lessen, acht oefeningen. Hieronder wat je koos, niet wat je goed had.',
    vragen: ['t1-o1', 't1-o4', 't1-o5', 't1-o6', 't1-o8'],
  },
  stilleWeken: [
    {
      week: 7,
      kop: 'Geen nieuw thema deze twee weken',
      tekst:
        'Dit is ingebouwde rust, geen gat. Je pad staat niet stil: je gewoontes lopen door, en er ' +
        'komt af en toe een korte opfrisser langs.',
      opfrisser: 't1-o4',
    },
    {
      week: 8,
      kop: 'Merk je er iets van?',
      tekst:
        'Twee weken geleden rondde je Contact maken af. Niet of het gelukt is — of je er iets van merkt.',
      opfrisser: 't1-o6',
    },
  ],
} as const
