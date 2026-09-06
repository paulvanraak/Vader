import type { Les, Oefening, Thema } from './types'

const LESSEN: Les[] = [
  {
    id: 't3-l1',
    nr: 1,
    fase: 'Herkennen',
    titel: 'Dezelfde regel, ineens oorlog',
    haakje:
      'De telefoon ging altijd om negen uur uit. Geen discussie. En nu is diezelfde regel opeens ' +
      'het bewijs dat je {hem} nergens vertrouwt.',
    inzicht:
      'De regel is niet veranderd, {naam} wel. Rond deze leeftijd gaat {hij} regels niet meer lezen ' +
      'als afspraken maar als uitspraken over wie {hij} is. "Om negen uur uit" klinkt als: ik denk ' +
      'dat jij het zelf niet kunt. Dat is wat {hij} bevecht — niet de klok. En daarom werkt harder ' +
      'vasthouden zo slecht: je bevestigt precies waar {hij} bang voor is.',
    spiegel:
      'Welke regel van vroeger vond jij het meest oneerlijk? En weet je nu waarom je ouders hem hadden?',
    thuismissie: {
      actie: 'Leg deze week bij één regel uit waaróm hij er is.',
      waarom:
        'Niet onderhandelen, alleen uitleggen. Een regel met een reden is nog steeds een regel, ' +
        'maar {hij} hoort er iets anders in.',
    },
  },
  {
    id: 't3-l2',
    nr: 2,
    fase: 'Begrijpen',
    titel: 'Wat {hij} eigenlijk vraagt',
    haakje:
      '"Waarom mag ik dat niet, iedereen mag dat." Je weet dat iedereen niet klopt. Maar dat is ' +
      'ook niet echt de vraag.',
    inzicht:
      'Wat {hij} vraagt is niet die ene avond langer. {Hij} test of {zijn} mening iets uitmaakt in ' +
      'dit huis. Op deze leeftijd is dat de belangrijkste vraag die er is: tel ik mee als iemand ' +
      'met een eigen oordeel? Een vader die nooit iets beweegt zegt nee op die vraag. Een vader ' +
      'die alles laat gaan zegt ook nee, want dan blijkt er niets te zijn om tegenaan te duwen. ' +
      'Wat werkt is beweging op de kleine dingen en vastheid op de grote.',
    spiegel:
      'Waarin luister jij écht naar {naam}? En zou {hij} dat ook zo noemen als je het {hem} vroeg?',
    thuismissie: {
      actie: 'Laat {hem} deze week één keer een regel bijstellen die er niet zoveel toe doet.',
      waarom:
        'Klein en concreet. Niet omdat de regel fout was, maar omdat {hij} merkt dat wat {hij} ' +
        'zegt ergens landt.',
    },
  },
  {
    id: 't3-l3',
    nr: 3,
    fase: 'Proberen',
    titel: 'De proef van twee weken',
    haakje:
      '{Hij} wil meer. Jij denkt: nog niet. En dan sta je tegenover elkaar met ja of nee, en ' +
      'verliest er altijd één.',
    inzicht:
      'De uitweg uit ja-of-nee is tijdelijk. Twee weken proberen, dan samen kijken. Daarmee is het ' +
      'geen machtsvraag meer maar een experiment, en experimenten kunnen mislukken zonder dat ' +
      'iemand verliest. Het levert je bovendien iets op wat geen enkele discussie geeft: bewijs. ' +
      'Ging het goed, dan heeft {hij} het verdiend en weet {hij} dat. Ging het mis, dan hoef jij ' +
      'niets te zeggen — dat heeft {hij} zelf gezien.',
    spiegel:
      'Welke vrijheid zou je {hem} durven geven als het twee weken op proef was, en je het terug ' +
      'mocht draaien zonder gedoe?',
    thuismissie: {
      actie: 'Spreek één ding af op proef, met een datum om samen terug te kijken.',
      waarom:
        'De datum is het belangrijkste deel. Zonder die datum is het geen proef maar gewoon toegeven.',
    },
  },
  {
    id: 't3-l4',
    nr: 4,
    fase: 'Volhouden',
    titel: 'Als je nee moet blijven zeggen',
    haakje:
      'Soms is het antwoord gewoon nee. En dan komt de golf: het is oneerlijk, je snapt er niets ' +
      'van, bij iedereen mag het wel.',
    inzicht:
      'Een nee die je kunt uitleggen en die blijft staan, is voor {naam} veiliger dan een nee die ' +
      'wegsmelt onder druk. Niet omdat {hij} het leuk vindt, maar omdat het betekent dat er iets ' +
      'is dat niet omvalt als {hij} hard genoeg duwt. Het geheim zit niet in strenger worden maar ' +
      'in kalmer blijven: je herhaalt hetzelfde antwoord zonder je stem te verheffen en zonder ' +
      'opnieuw te gaan uitleggen. Uitleggen doe je één keer. Daarna alleen nog herhalen.',
    spiegel:
      'Wat gebeurt er in jou als {hij} zegt dat je oneerlijk bent? En hoeveel van jouw reactie ' +
      'gaat daarover in plaats van over de regel?',
    thuismissie: {
      actie: 'Herhaal deze week één nee kalm, zonder opnieuw uit te leggen.',
      waarom:
        'Eén uitleg is genoeg. Elke volgende opent de discussie opnieuw, en dan zit je een half ' +
        'uur later nog te praten over de vraag of het wel eerlijk is.',
    },
  },
]

const OEFENINGEN: Oefening[] = [
  // ------------------------------------------------------------- deel 1
  {
    id: 't3-o1', type: 'waar-ging-het-mis', scoorbaar: true, lesId: 't3-l1',
    situatie: 'Het is negen uur. De telefoon moet uit.',
    vraag: 'Waar kantelde het?',
    dialoog: [
      { spreker: 'vader', tekst: 'Negen uur. Telefoon.' },
      { spreker: 'kind', tekst: 'Nog vijf minuten, ik zit midden in iets.' },
      {
        spreker: 'vader', tekst: 'Nee. Dit is de afspraak en dat weet je.',
        kantelt: true,
        waarom:
          'De afspraak klopt, maar hier wordt het een machtsvraag. "Dat weet je" zegt: hier valt ' +
          'niet over te praten, ook niet over vijf minuten. Precies de bevestiging die {hij} zocht.',
      },
      { spreker: 'kind', tekst: 'Je vertrouwt me gewoon nooit.' },
    ],
  },
  {
    id: 't3-o2', type: 'eerste-neiging', scoorbaar: false, lesId: 't3-l1',
    situatie: '{naam} zegt dat je regels belachelijk zijn en dat niemand thuis zoveel moet.',
    vraag: 'Wat is je eerste neiging?',
    opties: [
      { id: 'a', label: 'Uitleggen dat het bij anderen anders ligt.',
        feedback: 'Feitelijk vaak waar, en toch verlies je. Je gaat in discussie over andere gezinnen in plaats van over jullie afspraak.' },
      { id: 'b', label: 'Zeggen dat het zo is en klaar.',
        feedback: 'Soms nodig. Alleen: als dit je enige antwoord is, hoort {hij} dat {zijn} mening niet meetelt — en dat is precies waar het gevecht over gaat.' },
      { id: 'c', label: 'Vragen wat {hij} dan een redelijke regel vindt.',
        feedback: 'Riskant en vaak vruchtbaar. Je hoeft {zijn} voorstel niet over te nemen; dat je het vraagt is al het halve antwoord.' },
      { id: 'd', label: 'Er niet op ingaan.',
        feedback: 'Werkt om de ruzie te vermijden, maar de vraag blijft liggen en komt volgende week harder terug.' },
    ],
  },
  {
    id: 't3-o3', type: 'toen-en-nu', scoorbaar: false, lesId: 't3-l1',
    situatie: 'Twee keer dezelfde vraag.',
    vraag: 'Toen en nu',
    toen: {
      vraag: 'Legden jouw ouders uit waarom een regel er was?',
      nuVraag: 'En leg jij dat uit aan {naam}?',
      zelfde: 'Je doet het zoals je het kent. Als dat uitleggen was, heb je iets goeds meegekregen; zo niet, dan is dit waar het kan veranderen.',
      anders: 'Je legt meer of minder uit dan je zelf kreeg. Merk op wat dat je kost, en of het het waard is.',
    },
    opties: [
      { id: 'a', label: 'Altijd', feedback: '' },
      { id: 'b', label: 'Als ik erom vroeg', feedback: '' },
      { id: 'c', label: 'Zelden', feedback: '' },
      { id: 'd', label: 'Nooit, het was gewoon zo', feedback: '' },
    ],
  },
  {
    id: 't3-o4', type: 'balans', scoorbaar: false, lesId: 't3-l1',
    situatie: 'Als {naam} een regel aanvecht.',
    vraag: 'Waar sta jij?',
    balans: {
      links: 'Regel is regel', rechts: 'Alles bespreekbaar',
      zones: [
        { tot: 33, kop: 'Ver naar regel is regel',
          tekst: 'Duidelijkheid geeft rust, en op deze leeftijd is de prijs dat {hij} het leest als: mijn mening doet er niet toe. Dat is precies waar het gevecht over gaat.' },
        { tot: 66, kop: 'Ertussenin',
          tekst: 'De bruikbaarste plek: beweging op de kleine dingen, vastheid op de grote. Zorg dat {hij} het verschil kent.' },
        { tot: 100, kop: 'Ver naar bespreekbaar',
          tekst: 'Meepraten is goed, tot er niets meer overeind staat. Een puber heeft iets nodig om tegenaan te duwen; zonder dat blijft {hij} duwen tot {hij} het vindt.' },
      ],
    },
  },

  // ------------------------------------------------------------- deel 2
  {
    id: 't3-o5', type: 'twee-wegen', scoorbaar: false, lesId: 't3-l2',
    situatie: '{naam} wil een uur later thuis zijn dan afgesproken.',
    vraag: 'Twee wegen. Welke past hier?',
    afhangt:
      'Het hangt af van hoe vaak {hij} het vraagt. Is dit de eerste keer in maanden, dan is ja ' +
      'zeggen goedkoop en levert het veel op. Is het elke week, dan gaat het niet meer over het ' +
      'uur maar over of de afspraak iets betekent — en dan is een proef beter dan een uitzondering.',
    opties: [
      { id: 'a', label: 'Deze keer ja, als uitzondering.',
        feedback: 'Werkt als het echt een uitzondering is en je dat benoemt. Zonder die woorden wordt een uitzondering vanzelf de nieuwe regel.' },
      { id: 'b', label: 'Voorstellen het twee weken op proef te doen.',
        feedback: 'Sterker als het vaker speelt: geen gunst maar een afspraak met een einddatum, waar jullie samen op terugkijken.' },
    ],
  },
  {
    id: 't3-o6', type: 'een-woord', scoorbaar: true, lesId: 't3-l2',
    situatie: '{Hij} vraagt of {hij} langer weg mag.',
    vraag: 'Twee antwoorden. Welke houdt het gesprek open?',
    opties: [
      { id: 'a', label: 'Nee, want dat hebben we zo afgesproken.',
        feedback: 'Klopt, en sluit af. "Want dat hebben we afgesproken" is geen reden maar een verwijzing naar een reden — en dat voelt {hij}.' },
      { id: 'b', label: 'Nee, en ik snap dat dat rot is.', correct: true,
        feedback: 'Zelfde antwoord, ander effect. Je geeft niet toe en je erkent wel wat het voor {hem} betekent. Dat haalt de meeste lucht uit een discussie.' },
    ],
  },
  {
    id: 't3-o7', type: 'toen-en-nu', scoorbaar: false, lesId: 't3-l2',
    situatie: 'Twee keer dezelfde vraag.',
    vraag: 'Toen en nu',
    toen: {
      vraag: 'Kon jij thuis iets voor elkaar krijgen door erover te praten?',
      nuVraag: 'En lukt dat {naam} bij jou?',
      zelfde: 'Wat jij leerde over of praten helpt, geef je door. Dat bepaalt of {hij} straks met je praat of om je heen werkt.',
      anders: 'Bij {hem} werkt het anders dan bij jou. Dat is een keuze die je hebt gemaakt, of nu kunt maken.',
    },
    opties: [
      { id: 'a', label: 'Ja, vaak', feedback: '' },
      { id: 'b', label: 'Soms', feedback: '' },
      { id: 'c', label: 'Zelden', feedback: '' },
      { id: 'd', label: 'Nooit, dat had geen zin', feedback: '' },
    ],
  },
  {
    id: 't3-o8', type: 'balans', scoorbaar: false, lesId: 't3-l2',
    situatie: 'Als {hij} een voorstel doet.',
    vraag: 'Hoe vaak beweegt er iets?',
    balans: {
      links: 'Bijna nooit', rechts: 'Bijna altijd',
      zones: [
        { tot: 33, kop: 'Bijna nooit',
          tekst: 'Dan leert {hij} dat praten niets oplevert, en gaat {hij} op zoek naar een andere route. Meestal is dat de route om je heen.' },
        { tot: 66, kop: 'Soms',
          tekst: 'Precies genoeg. {Hij} hoeft niet vaak te winnen; {hij} moet weten dat het kán.' },
        { tot: 100, kop: 'Bijna altijd',
          tekst: 'Dan is er weinig om zich toe te verhouden. Vrijheid zonder rand voelt op deze leeftijd eerder als onverschilligheid dan als vertrouwen.' },
      ],
    },
  },

  // ------------------------------------------------------------- deel 3
  {
    id: 't3-o9', type: 'volgorde', scoorbaar: true, lesId: 't3-l3',
    situatie: 'Je wil iets op proef afspreken.',
    vraag: 'Zet de drie stappen in de juiste volgorde.',
    stappen: [
      { tekst: 'Benoemen wat {hij} wil', waarom: 'Eerst laten merken dat je gehoord hebt wat de vraag is. Zonder dat is de rest een truc.' },
      { tekst: 'Samen een proef en een datum afspreken', waarom: 'De datum maakt het een proef in plaats van toegeven. Zet hem ook echt ergens.' },
      { tekst: 'Op die datum samen terugkijken', waarom: 'De stap die het vaakst sneuvelt, en de enige die de proef betekenis geeft. Sla je hem over, dan was het gewoon ja.' },
    ],
  },
  {
    id: 't3-o10', type: 'en-dan', scoorbaar: false, lesId: 't3-l3',
    situatie: 'Je zegt: "We proberen het twee weken, dan kijken we samen."',
    vraag: 'Wat gebeurt er dan meestal?',
    opties: [
      { id: 'a', label: '{Hij} gaat akkoord.',
        feedback: 'Vaak wel. Een proef voelt niet als winnen of verliezen, en dat is precies waarom er ruimte ontstaat.' },
      { id: 'b', label: '{Hij} vindt twee weken te lang.',
        feedback: 'Kan. Onderhandel dan over de duur, niet over de proef zelf — de vorm is belangrijker dan het getal.' },
      { id: 'c', label: '{Hij} denkt dat je hem later toch afwijst.',
        feedback: 'Gebeurt als eerdere proeven nooit zijn geëvalueerd. Dan is de datum nakomen belangrijker dan de uitkomst.' },
    ],
  },
  {
    id: 't3-o11', type: 'toen-en-nu', scoorbaar: false, lesId: 't3-l3',
    situatie: 'Twee keer dezelfde vraag.',
    vraag: 'Toen en nu',
    toen: {
      vraag: 'Kreeg jij vrijheid in stappen of in één keer?',
      nuVraag: 'En hoe geef jij het aan {naam}?',
      zelfde: 'Je geeft het zoals je het kreeg. Werkte dat voor jou, dan is dat een goede reden. Werkte het niet, dan is dat een betere.',
      anders: 'Je doet het anders dan bij jou gebeurde. Dat is meestal geen toeval maar een correctie.',
    },
    opties: [
      { id: 'a', label: 'In kleine stappen', feedback: '' },
      { id: 'b', label: 'Op een leeftijd, ineens', feedback: '' },
      { id: 'c', label: 'Ik pakte het zelf', feedback: '' },
      { id: 'd', label: 'Nauwelijks', feedback: '' },
    ],
  },
  {
    id: 't3-o12', type: 'balans', scoorbaar: false, lesId: 't3-l3',
    situatie: 'Bij een nieuwe vrijheid.',
    vraag: 'Wat weegt bij jou het zwaarst?',
    balans: {
      links: 'Wat er mis kan gaan', rechts: 'Wat {hij} kan leren',
      zones: [
        { tot: 33, kop: 'Ver naar risico',
          tekst: 'Begrijpelijk, en het is je werk. Let er alleen op dat een kind dat nooit iets mag proberen ook nooit kan laten zien dat het kan.' },
        { tot: 66, kop: 'Allebei',
          tekst: 'De plek waar de proef vandaan komt: risico beperken door het klein en tijdelijk te houden.' },
        { tot: 100, kop: 'Ver naar leren',
          tekst: 'Vertrouwen geeft ruimte, mits er een vangnet onder ligt. Een proef zonder terugkijkmoment is geen vertrouwen maar loslaten.' },
      ],
    },
  },

  // ------------------------------------------------------------- deel 4
  {
    id: 't3-o13', type: 'beste-aanpak', scoorbaar: true, lesId: 't3-l4',
    situatie: 'Je hebt nee gezegd en uitgelegd waarom. {Hij} blijft doorgaan, harder en harder.',
    vraag: 'Wat doe je?',
    opties: [
      { id: 'a', label: 'Nog een keer uitleggen, misschien landt het nu.',
        feedback: 'De verleiding is groot en het werkt averechts: elke nieuwe uitleg opent de discussie opnieuw. Na de derde ronde gaat het niet meer over de regel.' },
      { id: 'b', label: 'Hetzelfde antwoord kalm herhalen, zonder nieuwe argumenten.', correct: true,
        feedback: 'Hier is wel één duidelijk beter antwoord. Uitleggen doe je één keer; daarna herhalen. Kalm blijven is het hele werk — niet strenger worden.' },
      { id: 'c', label: 'Boos worden zodat {hij} stopt.',
        feedback: 'Werkt op de korte termijn, en verplaatst het onderwerp naar jouw boosheid. De volgende keer begint {hij} harder, want zo eindigde het vorige keer.' },
    ],
  },
  {
    id: 't3-o14', type: 'twee-wegen', scoorbaar: false, lesId: 't3-l4',
    situatie: 'Hij houdt vol dat het oneerlijk is.',
    vraag: 'Twee wegen. Welke past hier?',
    afhangt:
      'Het hangt af van of het gesprek nog ergens over gaat. Zit er een echt argument in, dan is ' +
      'luisteren geen zwakte. Gaat het alleen nog over volhouden tot jij zwicht, dan is verder ' +
      'praten meedoen aan een wedstrijd. De vuistregel: nieuwe informatie verdient een gesprek, ' +
      'herhaling niet.',
    opties: [
      { id: 'a', label: 'Zeggen dat je begrijpt dat {hij} het oneerlijk vindt, en het gesprek sluiten.',
        feedback: 'Erkennen zonder toegeven. Dit is bijna altijd veilig, en het scheelt vaak een half uur.' },
      { id: 'b', label: 'Vragen wat {hij} zelf een eerlijke afspraak zou vinden.',
        feedback: 'Sterk als er ruimte is, riskant als je die ruimte niet hebt. Vraag dit alleen als je bereid bent om iets met het antwoord te doen.' },
    ],
  },
  {
    id: 't3-o15', type: 'toen-en-nu', scoorbaar: false, lesId: 't3-l4',
    situatie: 'Twee keer dezelfde vraag.',
    vraag: 'Toen en nu',
    toen: {
      vraag: 'Hield jouw vader een nee vol?',
      nuVraag: 'En houd jij het vol bij {naam}?',
      zelfde: 'Je herhaalt wat je zag. Merk op of dat een keuze is of een gewoonte — dat scheelt in hoe je het brengt.',
      anders: 'Je doet het anders. Als dat betekent dat je vaker meebeweegt, let dan op of er nog iets vaststaat; en als het strenger is, waar dat vandaan komt.',
    },
    opties: [
      { id: 'a', label: 'Altijd, er viel niet aan te tornen', feedback: '' },
      { id: 'b', label: 'Meestal wel', feedback: '' },
      { id: 'c', label: 'Hij zwichtte vaak', feedback: '' },
      { id: 'd', label: 'Er waren nauwelijks regels', feedback: '' },
    ],
  },
  {
    id: 't3-o16', type: 'balans', scoorbaar: false, lesId: 't3-l4',
    situatie: 'Als je nee hebt gezegd en {hij} blijft duwen.',
    vraag: 'Wat gebeurt er meestal?',
    balans: {
      links: 'Ik houd het vol', rechts: 'Ik zwicht',
      zones: [
        { tot: 33, kop: 'Ver naar volhouden',
          tekst: 'Goed, mits het kalm gebeurt. Volhouden met stemverheffing leert {hij} dat het uiteindelijk over macht gaat, niet over de afspraak.' },
        { tot: 66, kop: 'Wisselend',
          tekst: 'Het echte risico zit hier: als het onvoorspelbaar is, loont doorduwen. Kies bewust waar je vast bent en waar niet.' },
        { tot: 100, kop: 'Ver naar zwichten',
          tekst: 'Begrijpelijk als je moe bent, en het duurste op termijn. Elke keer dat volhouden loont, wordt de volgende discussie langer.' },
      ],
    },
  },
]

export const THEMA3: Thema = {
  id: 'regels',
  nr: 3,
  titel: 'Regels en ruimte',
  ondertitel: 'Grenzen zonder machtsstrijd',
  lessen: LESSEN,
  oefeningen: OEFENINGEN,
}
