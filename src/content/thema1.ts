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
  | 'toen-en-nu'
  | 'balans'
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
  /** Bij 'toen-en-nu': dezelfde opties worden twee keer beantwoord — eerst over
   *  je eigen vader, dan over jezelf. De twee komen naast elkaar te staan. */
  toen?: { vraag: string; nuVraag: string; zelfde: string; anders: string }
  /** Bij 'balans': een schuif tussen twee polen. Geen goed antwoord, wel een
   *  positie, en die verschuift over de weken. */
  balans?: {
    links: string
    rechts: string
    zones: { tot: number; kop: string; tekst: string }[]
  }
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
      'Je weet niet precies wanneer dat omsloeg.',
    inzicht:
      'Contact verdwijnt zelden met een klap. Het slijt. Elke keer dat een gesprek strandt, ' +
      'begin je de volgende keer voorzichtiger, en daardoor strandt het weer. Geen afwijzing ' +
      'van {naam}, geen fout van jou — een lus die vanzelf strakker wordt. En een lus is aan ' +
      'twee kanten los te maken.',
    spiegel:
      'Denk aan de laatste keer dat {naam} je uit zichzelf iets vertelde dat er voor {hem} toe ' +
      'deed. Weet je nog waar je was, en wat je aan het doen was?',
    thuismissie: {
      actie: 'Loop deze week één keer {zijn} kamer in zonder reden.',
      waarom:
        'Geen vraag, geen boodschap. Alleen even zijn. Dat lijkt niks doen en is het ' +
        'tegenovergestelde: je maakt jezelf beschikbaar zonder dat er iets tegenover hoeft te staan.',
    },
  },
  {
    id: 't1-l2',
    nr: 2,
    fase: 'Begrijpen',
    titel: 'Waarom {hij} niks zegt terwijl er wel iets is',
    haakje: 'Je ziet aan {hem} dat er iets is. Je vraagt het. "Niks." En je weet wel beter.',
    inzicht:
      'Rond deze leeftijd verschuift bij wie {naam} zijn verhaal kwijt kan. Vrienden worden de ' +
      'eerste kring, ouders de tweede. Geen breuk maar een verhuizing. Tegelijk kan {hij} vaak ' +
      'nog niet benoemen wat er speelt — het gevoel is er eerder dan de woorden. "Niks" betekent ' +
      'dan niet "ik vertel het je niet", maar "ik weet nog niet hoe ik dit moet zeggen". Dat ' +
      'vraagt geen betere vraag van jou, maar meer tijd.',
    spiegel:
      'Wanneer vertelde jij als jongen iets aan je eigen vader? En wat deed hij waardoor je het ' +
      'vertelde — of juist niet?',
    thuismissie: {
      actie: 'Vertel zelf één keer iets kleins over jouw dag, zonder iets terug te vragen.',
      waarom:
        'Je laat zien hoe delen eruitziet zonder dat het zwaar is. En omdat je niks terugvraagt, ' +
        'is er niets om zich tegen te verzetten.',
    },
  },
  {
    id: 't1-l3',
    nr: 3,
    fase: 'Proberen',
    titel: 'Het gesprek dat niet aan tafel begint',
    haakje:
      'Aan tafel zitten jullie tegenover elkaar, met oogcontact en een verwachting. Precies de ' +
      'opstelling waarin {naam} dichtklapt.',
    inzicht:
      'Naast elkaar praat makkelijker dan tegenover elkaar. In de auto, bij de afwas, onderweg ' +
      'naar de training. Geen oogcontact is minder druk, en een half afgeleide bezigheid geeft ' +
      '{hem} een uitweg als het te dichtbij komt. Die uitweg is geen zwakte van het gesprek. ' +
      'Die uitweg ís waarom het gesprek kan ontstaan.',
    spiegel:
      'Waar zijn jullie samen zonder dat er iets van jullie verwacht wordt? Als je daar geen ' +
      'antwoord op hebt, is dat het werk van deze week.',
    thuismissie: {
      actie: 'Begin één gesprek terwijl je samen iets anders doet.',
      waarom:
        'Rijden, lopen, klussen, afwassen. Wat dan ook, als jullie maar niet tegenover elkaar ' +
        'zitten met dit gesprek als enige doel.',
    },
  },
  {
    id: 't1-l4',
    nr: 4,
    fase: 'Volhouden',
    titel: 'Als je het drie keer probeert en er komt niks',
    haakje:
      'Je liep binnen, je vertelde iets, je begon in de auto. En {hij} gaf je niks terug. Dan ' +
      'komt de gedachte: laat ook maar.',
    inzicht:
      'Wat je opbouwt is niet het gesprek van vanavond. Het is dat {naam} weet waar je staat als ' +
      '{hij} je nodig heeft — en dat moment kies jij niet. Het komt op een onhandig tijdstip, ' +
      'kort, en over iets waar je niet op rekende. Beschikbaar zijn levert pas veel later iets ' +
      'op. Stoppen omdat er niks terugkomt, is stoppen vlak voordat het gaat werken.',
    spiegel:
      'Wat zou er moeten gebeuren voordat jij denkt: het werkt? En is dat een eerlijke maat?',
    thuismissie: {
      actie: 'Doe deze week één ding uit de vorige drie missies nog een keer.',
      waarom: 'Niet iets nieuws. Hetzelfde, nog een keer, zonder resultaat te verwachten.',
    },
  },
]

export const THEMA1_OEFENINGEN: Oefening[] = [
  // ---------------------------------------------------------------- les 1
  {
    id: 't1-o1',
    type: 'waar-ging-het-mis',
    scoorbaar: true,
    lesId: 't1-l1',
    situatie: '{naam} komt thuis van school.',
    vraag: 'Waar kantelde het?',
    dialoog: [
      { spreker: 'vader', tekst: 'Hé, hoe was het?' },
      { spreker: 'kind', tekst: 'Goed.' },
      {
        spreker: 'vader',
        tekst: 'Alleen goed? Er moet toch iets gebeurd zijn.',
        kantelt: true,
        waarom:
          'Hier wordt "goed" afgekeurd als antwoord. {naam} hoort: wat ik gaf was niet genoeg. ' +
          'De volgende keer begint {hij} lager, of niet. Niet de vraag was fout — het afwijzen ' +
          'van het antwoord was fout.',
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
        label: '{Hem} terugroepen voor een normale begroeting.',
        feedback:
          'Begrijpelijk, je wil niet dat dit de norm wordt. Wat het oplevert is dat het eerste ' +
          'gesprek van de dag over omgangsvormen gaat in plaats van over {hem}.',
      },
      {
        id: 'b',
        label: 'Achter {hem} aan lopen en vragen wat er is.',
        feedback:
          'Je merkt iets en wil erbij zijn. Het risico is de timing: net binnen is {hij} nog aan ' +
          'het landen. Dezelfde vraag een uur later krijgt vaak een ander antwoord.',
      },
      {
        id: 'c',
        label: 'Niks doen. {Hem} laten.',
        feedback:
          'Vaak de verstandigste eerste zet, mits het geen gewoonte wordt. Het verschil tussen ' +
          'ruimte geven en er niet zijn, is of je later alsnog even langsloopt.',
      },
      {
        id: 'd',
        label: 'Geïrriteerd raken en dat inslikken.',
        feedback:
          'Het eerlijkste antwoord in deze lijst, en waarschijnlijk het meest voorkomende. ' +
          'Ingeslikte irritatie komt er later uit, op een moment dat er iets anders speelt.',
      },
    ],
  },
  {
    id: 't1-o3',
    type: 'toen-en-nu',
    scoorbaar: false,
    lesId: 't1-l1',
    situatie: 'Twee keer dezelfde vraag. Eerst over vroeger, dan over nu.',
    vraag: 'Toen en nu',
    toen: {
      vraag: 'Als jij als jongen stil was, wat deed jouw vader dan?',
      nuVraag: 'En als {naam} stil is — wat doe jij?',
      zelfde:
        'Je doet wat je zelf kreeg. Dat is niet fout, het is het diepste spoor dat er ligt. De ' +
        'vraag is alleen of je het kiest of dat het je overkomt.',
      anders:
        'Je doet het anders dan jouw vader. Dat kost meer dan het lijkt, want je hebt er geen ' +
        'voorbeeld voor. Dat je het toch doet is het antwoord op deze oefening.',
    },
    opties: [
      { id: 'a', label: 'Erop afgaan en doorvragen', feedback: '' },
      { id: 'b', label: 'Met rust laten', feedback: '' },
      { id: 'c', label: 'Er niks van merken', feedback: '' },
      { id: 'd', label: 'Er later op terugkomen', feedback: '' },
    ],
  },
  {
    id: 't1-o4',
    type: 'balans',
    scoorbaar: false,
    lesId: 't1-l1',
    situatie: '{naam} is de laatste tijd vaker op {zijn} kamer.',
    vraag: 'Waar sta jij op dit moment?',
    balans: {
      links: 'Ruimte geven',
      rechts: 'Erbovenop zitten',
      zones: [
        {
          tot: 33,
          kop: 'Ver naar ruimte',
          tekst:
            'Ruimte is goed, tot het afwezigheid wordt. De vraag om jezelf te stellen: wanneer ' +
            'was je voor het laatst uit jezelf even bij {hem}?',
        },
        {
          tot: 66,
          kop: 'In het midden',
          tekst:
            'Waar de meeste vaders willen zitten. Let op dat het een keuze blijft en geen ' +
            'gemiddelde van twee uitersten die je afwisselt.',
        },
        {
          tot: 100,
          kop: 'Ver naar erbovenop',
          tekst:
            'Betrokken zijn is niet hetzelfde als aanwezig zijn. Bij deze leeftijd levert een ' +
            'stap terug vaak meer op dan een stap naar voren.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------- les 2
  {
    id: 't1-o5',
    type: 'twee-wegen',
    scoorbaar: false,
    lesId: 't1-l2',
    situatie: '{naam} is al twee dagen stiller dan normaal.',
    vraag: 'Twee wegen. Welke past hier?',
    afhangt:
      'Het hangt af van hoe lang het duurt. Eén stille avond is meestal moeheid. Twee dagen is ' +
      'een patroon, en dan is wachten geen geduld meer maar afwezigheid. Vuistregel: één dag ' +
      'laten, bij de tweede iets zeggen.',
    opties: [
      {
        id: 'a',
        label: 'Nog even laten. {Hij} komt wel.',
        feedback:
          'Werkt als {hij} normaal wél naar je toe komt. Let op het woord "even" — als dat ' +
          'gisteren ook je antwoord was, is het geen ruimte meer.',
      },
      {
        id: 'b',
        label: 'Benoemen dat je het ziet, zonder vraag.',
        feedback:
          '"Je bent stil de laatste dagen. Ik zeg er verder niks van." Geen vraag, dus niks te ' +
          'beantwoorden, en toch weet {hij} dat je het ziet. Bijna altijd veilig.',
      },
    ],
  },
  {
    id: 't1-o6',
    type: 'een-woord',
    scoorbaar: true,
    lesId: 't1-l2',
    situatie: 'Je wil weten wat er speelde op school.',
    vraag: 'Twee zinnen, één woord verschil. Welke opent meer?',
    opties: [
      {
        id: 'a',
        label: 'Waarom deed je dat?',
        feedback:
          '"Waarom" vraagt om een rechtvaardiging. Het antwoord is bijna altijd "weet ik niet" ' +
          'of een verdediging — de vraag zet {hem} in de beklaagdenbank.',
      },
      {
        id: 'b',
        label: 'Wat gebeurde er?',
        correct: true,
        feedback:
          '"Wat" vraagt om een verhaal in plaats van een verantwoording. Dezelfde ' +
          'nieuwsgierigheid, maar {hij} hoeft zich niet te verdedigen. Dit ene woord is de ' +
          'grootste winst in dit thema.',
      },
    ],
  },
  {
    id: 't1-o7',
    type: 'en-dan',
    scoorbaar: false,
    lesId: 't1-l2',
    situatie:
      '{naam} vertelt over een ruzie in de klas. Jij zegt: "Dat had je toch kunnen negeren?"',
    vraag: 'Wat gebeurt er dan meestal?',
    opties: [
      {
        id: 'a',
        label: '{Hij} legt uit waarom dat niet kon.',
        feedback: 'Kan. Maar dan gaat het gesprek over gelijk hebben, niet over wat het met {hem} deed.',
      },
      {
        id: 'b',
        label: '{Hij} haalt {zijn} schouders op en stopt.',
        feedback:
          'Dit gebeurt meestal. {Hij} kwam met een verhaal en kreeg een oplossing terug. De ' +
          'volgende keer vertelt {hij} het net iets minder. Zo slijt contact — niet door ruzie, ' +
          'maar door goedbedoeld advies.',
      },
      {
        id: 'c',
        label: '{Hij} wordt boos op jou.',
        feedback:
          'Gebeurt soms, en is dan het gunstigst van de drie: boosheid is nog contact. ' +
          'Schouderophalen is het einde van het gesprek.',
      },
    ],
  },
  {
    id: 't1-o8',
    type: 'toen-en-nu',
    scoorbaar: false,
    lesId: 't1-l2',
    situatie: 'Twee keer dezelfde vraag.',
    vraag: 'Toen en nu',
    toen: {
      vraag: 'Wist jouw vader wat er bij jou speelde?',
      nuVraag: 'En weet jij wat er bij {naam} speelt?',
      zelfde:
        'Je zit op dezelfde plek als je vader. Dat kan prima zijn — of het is precies waar je ' +
        'vanaf wil. Alleen jij weet welke van de twee.',
      anders:
        'Er zit verschil tussen wat je kreeg en wat je geeft. Dat verschil is geen toeval; ' +
        'iemand heeft dat gedaan, en dat ben jij.',
    },
    opties: [
      { id: 'a', label: 'Vrijwel altijd', feedback: '' },
      { id: 'b', label: 'De grote dingen wel', feedback: '' },
      { id: 'c', label: 'Zelden', feedback: '' },
      { id: 'd', label: 'Nooit', feedback: '' },
    ],
  },
  {
    id: 't1-o9',
    type: 'balans',
    scoorbaar: false,
    lesId: 't1-l2',
    situatie: 'Als er iets is, maar {hij} zegt het niet.',
    vraag: 'Waar zit jouw reflex?',
    balans: {
      links: 'Wachten tot {hij} komt',
      rechts: 'Zelf beginnen',
      zones: [
        {
          tot: 33,
          kop: 'Ver naar wachten',
          tekst:
            'Wachten respecteert {zijn} tempo. Het risico is dat {hij} het leest als: het ' +
            'interesseert hem niet. Beschikbaar zijn moet je af en toe laten merken.',
        },
        {
          tot: 66,
          kop: 'Ertussenin',
          tekst:
            'Meestal de bruikbaarste plek: zelf iets zeggen, maar zonder een antwoord te eisen. ' +
            'Benoemen zonder vraagteken.',
        },
        {
          tot: 100,
          kop: 'Ver naar beginnen',
          tekst:
            'Initiatief is goed, tot het een verhoor wordt. Als {hij} vaker "niks" zegt dan ' +
            'vroeger, is dat meestal een reactie op de hoeveelheid vragen.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------- les 3
  {
    id: 't1-o10',
    type: 'volgorde',
    scoorbaar: true,
    lesId: 't1-l3',
    situatie: '{naam} komt thuis en gooit {zijn} tas neer. Er is duidelijk iets.',
    vraag: 'Zet de drie stappen in de volgorde die het meest oplevert.',
    stappen: [
      { tekst: 'Benoemen wat je ziet', waarom: 'Eerst laten merken dat je het ziet. Zonder oordeel, zonder vraag.' },
      {
        tekst: 'Wachten',
        waarom:
          'De stap die de meeste vaders overslaan, en de belangrijkste. Vijf seconden stilte is ' +
          'lang, en daarin komt vaak het eerste echte zinnetje.',
      },
      {
        tekst: 'Eén concrete vraag',
        waarom: 'Pas als er ruimte is. Klein en specifiek — niet "hoe was je dag".',
      },
    ],
  },
  {
    id: 't1-o11',
    type: 'twee-wegen',
    scoorbaar: false,
    lesId: 't1-l3',
    situatie: 'In de auto vertelt {naam} uit zichzelf iets over een vriend.',
    vraag: 'Twee wegen. Welke past hier?',
    afhangt:
      'Het hangt af van wie er praat. Vertelt {hij} door, dan is stil blijven het beste — elke ' +
      'vraag is een onderbreking. Stokt het, dan helpt één vraag. Dat merk je alleen door even ' +
      'niets te zeggen.',
    opties: [
      {
        id: 'a',
        label: 'Doorvragen, nu {hij} toch praat.',
        feedback:
          'De verleiding is groot. Maar drie vragen achter elkaar maakt van een verhaal een ' +
          'verhoor, en dan sluit de opening weer.',
      },
      {
        id: 'b',
        label: 'Hummen en verder rijden.',
        feedback:
          'Klinkt als te weinig, is meestal precies genoeg. "Hm" betekent: ik luister, ga door. ' +
          'De langste verhalen komen na de kortste reacties.',
      },
    ],
  },
  {
    id: 't1-o12',
    type: 'toen-en-nu',
    scoorbaar: false,
    lesId: 't1-l3',
    situatie: 'Twee keer dezelfde vraag.',
    vraag: 'Toen en nu',
    toen: {
      vraag: 'Waar praatte jij met jouw vader, als je praatte?',
      nuVraag: 'En waar praat jij met {naam}?',
      zelfde:
        'Dezelfde plek. Dat werkt blijkbaar, of je hebt nooit een andere geprobeerd. Deze week ' +
        'is een goed moment om dat te testen.',
      anders:
        'Een andere plek dan waar jij het leerde. Dat betekent dat je iets bewust hebt gekozen ' +
        'in plaats van overgenomen.',
    },
    opties: [
      { id: 'a', label: 'Aan tafel', feedback: '' },
      { id: 'b', label: 'In de auto of onderweg', feedback: '' },
      { id: 'c', label: 'Tijdens klussen of sport', feedback: '' },
      { id: 'd', label: 'Nergens echt', feedback: '' },
    ],
  },
  {
    id: 't1-o13',
    type: 'balans',
    scoorbaar: false,
    lesId: 't1-l3',
    situatie: 'Een gesprek dat je wil voeren.',
    vraag: 'Hoe pak jij dat meestal aan?',
    balans: {
      links: 'Even gaan zitten',
      rechts: 'Terwijl je iets doet',
      zones: [
        {
          tot: 33,
          kop: 'Ver naar gaan zitten',
          tekst:
            'Een aangekondigd gesprek is voor deze leeftijd zwaar. Het woord "even praten" ' +
            'maakt de drempel hoger dan het onderwerp.',
        },
        {
          tot: 66,
          kop: 'Allebei',
          tekst: 'Prima. Bewaar het gaan zitten voor wat echt zwaar is, en doe de rest ergens onderweg.',
        },
        {
          tot: 100,
          kop: 'Ver naar onderweg',
          tekst:
            'Goed voor het dagelijkse. Let er wel op dat er íets is waar je wel tegenover elkaar ' +
            'zit — anders wordt alles terloops, ook wat dat niet verdient.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------- les 4
  {
    id: 't1-o14',
    type: 'beste-aanpak',
    scoorbaar: true,
    lesId: 't1-l4',
    situatie: '{naam} zegt op een dinsdag laat, in de deuropening: "Pap, mag ik wat vragen?"',
    vraag: 'Dit is het moment waar je op wachtte. Wat doe je?',
    opties: [
      {
        id: 'a',
        label: 'Zeggen dat het laat is en dat het morgen ook kan.',
        feedback:
          'Praktisch redelijk. Alleen koos {hij} dit moment niet toevallig: laat, in een ' +
          'deuropening, half weggedraaid. Zo snijdt deze leeftijd iets moeilijks aan. Morgen is ' +
          'het weg.',
      },
      {
        id: 'b',
        label: 'Alles neerleggen en zeggen: ja, kom.',
        correct: true,
        feedback:
          'De zeldzame keer dat er wél één beter antwoord is. Deze momenten zijn schaars, kort, ' +
          'en komen op een onhandig tijdstip. Alles waar je mee bezig was kan wachten.',
      },
      {
        id: 'c',
        label: 'Vragen of het belangrijk is.',
        feedback:
          'Goed bedoeld, maar je legt de drempel terug bij {hem}. Een jongen die het al eng vond, ' +
          'zegt dan "laat maar".',
      },
    ],
  },
  {
    id: 't1-o15',
    type: 'toen-en-nu',
    scoorbaar: false,
    lesId: 't1-l4',
    situatie: 'De laatste keer.',
    vraag: 'Toen en nu',
    toen: {
      vraag: 'Hield jouw vader vol als jij niks teruggaf?',
      nuVraag: 'En houd jij het vol bij {naam}?',
      zelfde:
        'Je herhaalt wat je kent. Als dat volhouden was, heb je geluk gehad. Als het opgeven ' +
        'was, is dít de plek om het te doorbreken.',
      anders:
        'Je doet het anders dan je vader deed. Dat is precies waar dit thema over ging, en je ' +
        'was er blijkbaar al mee bezig voordat de app erover begon.',
    },
    opties: [
      { id: 'a', label: 'Ja, hij bleef komen', feedback: '' },
      { id: 'b', label: 'Soms', feedback: '' },
      { id: 'c', label: 'Nee, hij liet het los', feedback: '' },
      { id: 'd', label: 'Hij probeerde het nooit', feedback: '' },
    ],
  },
  {
    id: 't1-o16',
    type: 'balans',
    scoorbaar: false,
    lesId: 't1-l4',
    situatie: 'Na een paar weken proberen.',
    vraag: 'Wat verwacht je van jezelf?',
    balans: {
      links: 'Er zijn is genoeg',
      rechts: 'Er moet iets uitkomen',
      zones: [
        {
          tot: 33,
          kop: 'Ver naar er zijn',
          tekst:
            'De gezondste plek voor deze leeftijd, en de moeilijkste om vol te houden. Zolang je ' +
            'niet stiekem toch zit te wachten op bewijs.',
        },
        {
          tot: 66,
          kop: 'Ertussenin',
          tekst:
            'Eerlijk. Niemand doet dit helemaal zonder verwachting. Merk alleen op wanneer die ' +
            'verwachting in je stem gaat zitten.',
        },
        {
          tot: 100,
          kop: 'Ver naar resultaat',
          tekst:
            'Dan wordt elk gesprek een test die {hij} kan zakken. Dat voelt {hij}, en het is de ' +
            'snelste manier om de deur weer dicht te krijgen.',
        },
      ],
    },
  },
]

export const THEMA1 = {
  id: 'thema-1',
  titel: 'Contact maken',
  ondertitel: 'Bereikbaar blijven als {hij} zich terugtrekt',
  raamwerk: 'A — De boog',
  intro: {
    kop: 'Contact maken',
    tekst:
      'Vier delen die op elkaar staan: zien wat er gebeurd is, begrijpen waarom, iets anders ' +
      'proberen, en volhouden als er niet meteen iets terugkomt.\n\n' +
      'Elke dag opent één nieuw deel. Oefenen kan zo vaak je wil — er zijn er zestien en je ' +
      'krijgt er steeds drie, in een andere mix.',
    belofte:
      'Aan het eind weet je niet hoe je {naam} aan het praten krijgt. Dat kan niemand. Je weet ' +
      'wél wat je zelf doet waardoor {hij} stopt.',
  },
  checkpoint: {
    kop: 'Contact maken — afgerond',
    tekst: 'Vier delen, zestien oefeningen. Hieronder wat je koos, niet wat je goed had.',
    vragen: ['t1-o1', 't1-o6', 't1-o7', 't1-o10', 't1-o14'],
  },
} as const
