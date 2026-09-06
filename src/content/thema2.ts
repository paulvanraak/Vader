import type { Les, Oefening, Thema } from './types'

const LESSEN: Les[] = [
  {
    id: 't2-l1',
    nr: 1,
    fase: 'Herkennen',
    titel: 'Het gaat nooit om de boterham',
    haakje:
      'Een verkeerd gesneden boterham, een opmerking over {zijn} jas, en ineens staat het huis op ' +
      'z\'n kop. Je denkt: hier klopt de verhouding niet.',
    inzicht:
      'Je hebt gelijk: de verhouding klopt niet. Wat je ziet is niet de reactie op dít moment, ' +
      'maar op alles wat er die dag al in ging. School, vrienden, een blik die verkeerd viel. ' +
      '{naam} houdt dat de hele dag binnen omdat het daar moet, en thuis valt de bodem eruit. ' +
      'Dat het bij jou gebeurt is geen straf. Het is een compliment dat je nu niet zo voelt.',
    spiegel:
      'Waar ontplof jij zelf het snelst? Thuis, of op je werk? En wat zegt dat over waar je je ' +
      'veilig genoeg voelt om het te laten zien?',
    thuismissie: {
      actie: 'Vraag na de volgende uitbarsting, als het gezakt is, wat er verder nog speelde.',
      waarom:
        'Niet tijdens — dan komt er niets. Een uur later, terloops. Je vraagt niet naar de ' +
        'boterham maar naar de dag eromheen.',
    },
  },
  {
    id: 't2-l2',
    nr: 2,
    fase: 'Begrijpen',
    titel: 'Waarom praten dan niet helpt',
    haakje:
      'Je legt rustig uit waarom het niet zo\'n punt is. En het maakt het erger. Elke keer weer.',
    inzicht:
      'Tijdens een uitbarsting is het deel van {zijn} brein dat redeneert tijdelijk niet ' +
      'bereikbaar. Dat is geen onwil en geen aanstellerij; het is hoe een brein onder stress werkt, ' +
      'en bij deze leeftijd nog sterker omdat de rem nog in aanbouw is. Uitleggen tegen iemand die ' +
      'niet kan luisteren voelt voor {hem} als: hij begrijpt me niet eens. Wachten is dus geen ' +
      'zwakte. Het is de enige route die openstaat.',
    spiegel:
      'Wat deed jij als kind als iemand tijdens jouw boosheid ging uitleggen dat je overdreef?',
    thuismissie: {
      actie: 'Zeg de volgende keer niets inhoudelijks tot het gezakt is.',
      waarom:
        'Blijf in de buurt, zeg hooguit dat je er bent. Alles wat je nu uitlegt moet je straks ' +
        'toch overdoen.',
    },
  },
  {
    id: 't2-l3',
    nr: 3,
    fase: 'Proberen',
    titel: 'Rustig blijven als {hij} dat niet is',
    haakje:
      'Makkelijk gezegd. {Zijn} stem gaat omhoog, die van jou gaat mee, en tien seconden later ' +
      'staan jullie allebei te schreeuwen.',
    inzicht:
      'Emoties springen over, in beide richtingen. Dat je meegaat is normaal en geen karakterfout. ' +
      'Maar het werkt ook de andere kant op: als jij zakt, zakt {hij} mee. Niet meteen, en niet ' +
      'altijd, maar vaker dan je denkt. Je hoeft niet kalm te zíjn — je hoeft alleen langzamer te ' +
      'praten dan {hij} doet. Dat is een handeling, geen gevoel, en daarom lukt het ook op een ' +
      'avond dat je zelf op bent.',
    spiegel:
      'Wat is jouw eerste lichamelijke teken dat je erin schiet? Kaak, schouders, ademhaling? ' +
      'Als je dat kent, heb je een seconde extra.',
    thuismissie: {
      actie: 'Praat de volgende keer bewust één toon lager en langzamer dan {hij}.',
      waarom:
        'Niet zachter in wat je zegt, maar in hoe. Je hoeft er niets bij te voelen; het gaat om ' +
        'het tempo.',
    },
  },
  {
    id: 't2-l4',
    nr: 4,
    fase: 'Volhouden',
    titel: 'Als het toch misging',
    haakje:
      'Je ging mee. Je zei iets wat je niet meende. En nu zit je beneden met dat rotgevoel.',
    inzicht:
      'De ruzie is niet het probleem. Wat een kind onthoudt is wat er daarna gebeurt. Een vader ' +
      'die terugkomt en zegt dat hij te ver ging, leert {naam} iets wat geen enkele rustige avond ' +
      '{hem} kan leren: dat je een band kunt repareren. Dat is precies wat {hij} nodig heeft in ' +
      'elke relatie die {hij} nog gaat hebben. Je hoeft niet perfect te zijn. Je moet terugkomen.',
    spiegel:
      'Kwam jouw vader ooit terug na een ruzie? En wat zou het met je hebben gedaan als hij dat ' +
      'wel had gedaan?',
    thuismissie: {
      actie: 'Kom na de eerstvolgende botsing terug en benoem jouw aandeel.',
      waarom:
        'Niet "sorry maar jij ook". Alleen jouw deel, kort. Wat {hij} deed komt een andere keer, ' +
        'of helemaal niet.',
    },
  },
]

const OEFENINGEN: Oefening[] = [
  // ------------------------------------------------------------- deel 1
  {
    id: 't2-o1', type: 'waar-ging-het-mis', scoorbaar: true, lesId: 't2-l1',
    situatie: '{naam} komt binnen en er ligt geen brood meer.',
    vraag: 'Waar kantelde het?',
    dialoog: [
      { spreker: 'kind', tekst: 'Er is ook nooit iets in dit huis.' },
      { spreker: 'vader', tekst: 'Er ligt anders een hele fruitschaal.' },
      {
        spreker: 'kind', tekst: 'Boeiend.',
      },
      {
        spreker: 'vader', tekst: 'Doe eens even normaal tegen mij.',
        kantelt: true,
        waarom:
          'Tot hier ging het over brood. Vanaf hier gaat het over respect, en dat is een gevecht ' +
          'dat niemand wint. De zin ervoor was nog te negeren; deze eist een reactie.',
      },
    ],
  },
  {
    id: 't2-o2', type: 'eerste-neiging', scoorbaar: false, lesId: 't2-l1',
    situatie: '{naam} slaat de deur dicht en schreeuwt dat je nooit luistert.',
    vraag: 'Wat is je eerste neiging?',
    opties: [
      { id: 'a', label: 'Achter {hem} aan en dit uitpraten.',
        feedback: 'De behoefte om het nú op te lossen is groot. Maar je gaat een gesprek voeren met iemand die op dit moment niet kan luisteren, en dan wordt het een tweede ruzie bovenop de eerste.' },
      { id: 'b', label: 'Terugschreeuwen dat het zo niet gaat.',
        feedback: 'Eerlijk, en het gebeurt in de beste huizen. Het kost je alleen de positie die je straks nodig hebt: iemand die er nog is als het gezakt is.' },
      { id: 'c', label: 'Niks doen en het laten zakken.',
        feedback: 'Meestal het verstandigst, mits je erná terugkomt. Laten zakken zonder terugkomen is geen rust geven maar wegkijken.' },
      { id: 'd', label: 'Zelf de deur uit lopen.',
        feedback: 'Als je merkt dat je er zelf in schiet, is dit beter dan blijven en ontploffen. Zeg dan wel even dat je zo terugkomt, anders leest {hij} het als weglopen.' },
    ],
  },
  {
    id: 't2-o3', type: 'toen-en-nu', scoorbaar: false, lesId: 't2-l1',
    situatie: 'Twee keer dezelfde vraag.',
    vraag: 'Toen en nu',
    toen: {
      vraag: 'Wat deed jouw vader als jij boos werd?',
      nuVraag: 'En wat doe jij als {naam} boos wordt?',
      zelfde: 'Je reageert zoals er op jou gereageerd werd. Dat gaat vanzelf, zeker als je moe bent. De vraag is of je het zou kiezen als je erover nadacht.',
      anders: 'Je doet het anders dan je zelf meekreeg. Dat kost energie, want je hebt er geen model voor — je bedenkt het elke keer opnieuw.',
    },
    opties: [
      { id: 'a', label: 'Harder terug', feedback: '' },
      { id: 'b', label: 'Straffen', feedback: '' },
      { id: 'c', label: 'Negeren tot het over was', feedback: '' },
      { id: 'd', label: 'Erbij blijven', feedback: '' },
    ],
  },
  {
    id: 't2-o4', type: 'balans', scoorbaar: false, lesId: 't2-l1',
    situatie: 'Als {naam} ontploft om iets kleins.',
    vraag: 'Waar zit jouw reactie meestal?',
    balans: {
      links: 'Grens stellen', rechts: 'Ruimte geven',
      zones: [
        { tot: 33, kop: 'Ver naar grens stellen',
          tekst: 'Duidelijkheid is goed, maar een grens tijdens een uitbarsting landt zelden. Diezelfde grens, een uur later gesteld, werkt bijna altijd beter.' },
        { tot: 66, kop: 'Ertussenin',
          tekst: 'Waar het meestal moet zitten: nu ruimte, straks de grens. Let erop dat "straks" ook echt komt.' },
        { tot: 100, kop: 'Ver naar ruimte geven',
          tekst: 'Ruimte werkt, tot er nooit meer een gesprek achteraan komt. Dan leert {hij} dat een uitbarsting alles wegneemt — ook het gesprek.' },
      ],
    },
  },

  // ------------------------------------------------------------- deel 2
  {
    id: 't2-o5', type: 'twee-wegen', scoorbaar: false, lesId: 't2-l2',
    situatie: '{naam} is midden in een uitbarsting.',
    vraag: 'Twee wegen. Welke past hier?',
    afhangt:
      'Het hangt af van of {hij} nog in de kamer wil zijn. Blijft {hij}, dan is stil naast {hem} ' +
      'zitten sterker dan wat je ook kunt zeggen. Loopt {hij} weg, dan is volgen meestal ' +
      'achtervolgen. De regel: jij gaat niet weg, maar je gaat ook niet achter {hem} aan.',
    opties: [
      { id: 'a', label: 'In de kamer blijven, niks zeggen.',
        feedback: 'Aanwezig zijn zonder eisen. Voor de meeste jongens van deze leeftijd het maximum dat op dat moment binnenkomt.' },
      { id: 'b', label: 'Zeggen dat je in de keuken bent als {hij} wil praten.',
        feedback: 'Ook goed, en soms beter: je geeft ruimte én een deur die openstaat. Zeg het één keer, niet drie keer.' },
    ],
  },
  {
    id: 't2-o6', type: 'een-woord', scoorbaar: true, lesId: 't2-l2',
    situatie: 'Het is gezakt. Je wil erop terugkomen.',
    vraag: 'Twee openingen. Welke werkt?',
    opties: [
      { id: 'a', label: 'Waarom werd je nou zo boos?',
        feedback: '"Waarom" vraagt om een verklaring die {hij} zelf niet heeft. Het meest waarschijnlijke antwoord is "weet ik niet", en dan zit je vast.' },
      { id: 'b', label: 'Het was nogal wat, hè.', correct: true,
        feedback: 'Geen vraag maar een vaststelling. Er hoeft niets beantwoord te worden, en juist daarom komt er meestal iets. Een constatering opent verder dan een vraag.' },
    ],
  },
  {
    id: 't2-o7', type: 'toen-en-nu', scoorbaar: false, lesId: 't2-l2',
    situatie: 'Twee keer dezelfde vraag.',
    vraag: 'Toen en nu',
    toen: {
      vraag: 'Mocht jij thuis boos zijn?',
      nuVraag: 'En mag {naam} boos zijn bij jou?',
      zelfde: 'Wat jij meekreeg over boosheid geef je door. Dat is het krachtigste stuk opvoeding dat er bestaat, en het gaat vrijwel zonder woorden.',
      anders: 'Je geeft {hem} meer of minder ruimte dan jij kreeg. Beide kunnen kloppen — als het maar een keuze is en geen reflex.',
    },
    opties: [
      { id: 'a', label: 'Ja, gewoon', feedback: '' },
      { id: 'b', label: 'Zolang het netjes bleef', feedback: '' },
      { id: 'c', label: 'Liever niet', feedback: '' },
      { id: 'd', label: 'Absoluut niet', feedback: '' },
    ],
  },
  {
    id: 't2-o8', type: 'balans', scoorbaar: false, lesId: 't2-l2',
    situatie: 'Tijdens een uitbarsting.',
    vraag: 'Hoeveel praat jij?',
    balans: {
      links: 'Ik zeg bijna niks', rechts: 'Ik blijf uitleggen',
      zones: [
        { tot: 33, kop: 'Ver naar stil',
          tekst: 'Vaak precies goed. Zorg alleen dat stilte niet als afkeuring overkomt — een hand op een schouder doet dan meer dan een zin.' },
        { tot: 66, kop: 'Ertussenin',
          tekst: 'Prima, zolang wat je zegt geen uitleg is maar aanwezigheid. "Ik ben hier" is genoeg.' },
        { tot: 100, kop: 'Ver naar uitleggen',
          tekst: 'Dit is de meest voorkomende valkuil, en het komt uit goede wil. Alleen luistert er op dat moment niemand, en {hij} hoort vooral dat je niet stopt.' },
      ],
    },
  },

  // ------------------------------------------------------------- deel 3
  {
    id: 't2-o9', type: 'volgorde', scoorbaar: true, lesId: 't2-l3',
    situatie: 'Het escaleert en je merkt dat je zelf omhoog gaat.',
    vraag: 'Zet de drie stappen in de volgorde die werkt.',
    stappen: [
      { tekst: 'Merken dat je zelf omhoog gaat', waarom: 'Zonder dit gaat de rest niet. Het is de kaak, de schouders, de ademhaling — jouw eigen eerste teken.' },
      { tekst: 'Langzamer gaan praten', waarom: 'Een handeling, geen gevoel. Daarom lukt het ook als je zelf op bent. Tempo doet meer dan volume.' },
      { tekst: 'Pas daarna iets zeggen over de inhoud', waarom: 'Wat je zegt telt pas als de toon eronder klopt. Andersom werkt het niet, hoe goed je woorden ook zijn.' },
    ],
  },
  {
    id: 't2-o10', type: 'en-dan', scoorbaar: false, lesId: 't2-l3',
    situatie: 'Midden in de ruzie zeg je: "Zo praat je niet tegen mij."',
    vraag: 'Wat gebeurt er dan meestal?',
    opties: [
      { id: 'a', label: '{Hij} houdt op.',
        feedback: 'Soms, aan de buitenkant. Van binnen is het meestal niet voorbij maar ingeslikt, en dan komt het er morgen ergens anders uit.' },
      { id: 'b', label: 'Het wordt harder.',
        feedback: 'Meestal dit. Je hebt een tweede onderwerp geopend — de toon — terwijl het eerste nog loopt. Twee ruzies tegelijk zijn niet te winnen.' },
      { id: 'c', label: '{Hij} loopt weg.',
        feedback: 'Ook vaak, en niet het slechtste. Weglopen is bij deze leeftijd regelmatig een poging om het níét erger te maken.' },
    ],
  },
  {
    id: 't2-o11', type: 'toen-en-nu', scoorbaar: false, lesId: 't2-l3',
    situatie: 'Twee keer dezelfde vraag.',
    vraag: 'Toen en nu',
    toen: {
      vraag: 'Hoe klonk jouw vader als hij kwaad was?',
      nuVraag: 'En hoe klink jij?',
      zelfde: 'Je hoort hem terug in jezelf. Bijna iedere vader kent dat moment, en het is schrikken. Het is ook het punt waarop je kunt kiezen.',
      anders: 'Je klinkt anders dan hij. Dat is geen toeval en geen karakter — dat heb je gedaan.',
    },
    opties: [
      { id: 'a', label: 'Hard en luid', feedback: '' },
      { id: 'b', label: 'Kort en scherp', feedback: '' },
      { id: 'c', label: 'IJzig stil', feedback: '' },
      { id: 'd', label: 'Hij werd niet kwaad', feedback: '' },
    ],
  },
  {
    id: 't2-o12', type: 'balans', scoorbaar: false, lesId: 't2-l3',
    situatie: 'Als het thuis oploopt.',
    vraag: 'Hoe snel schiet jij erin?',
    balans: {
      links: 'Ik blijf makkelijk kalm', rechts: 'Ik ga zo mee',
      zones: [
        { tot: 33, kop: 'Ver naar kalm',
          tekst: 'Mooi, mits het echt kalm is en geen ingeslikte irritatie. Kinderen voelen het verschil feilloos, ook als je niets zegt.' },
        { tot: 66, kop: 'Ertussenin',
          tekst: 'Het eerlijkste antwoord voor de meeste vaders. Je gaat soms mee, en je herstelt. Dat is genoeg.' },
        { tot: 100, kop: 'Ver naar meegaan',
          tekst: 'Dan is jouw eerste teken kennen het belangrijkste dat je uit dit thema haalt. Eén seconde eerder merken scheelt de hele avond.' },
      ],
    },
  },

  // ------------------------------------------------------------- deel 4
  {
    id: 't2-o13', type: 'beste-aanpak', scoorbaar: true, lesId: 't2-l4',
    situatie: 'Je bent te ver gegaan. Je zei iets wat je niet meende, en {hij} zit boven.',
    vraag: 'Wat doe je?',
    opties: [
      { id: 'a', label: 'Wachten tot het overwaait en morgen normaal doen.',
        feedback: 'Het waait over, maar er blijft iets liggen. Wat {hij} onthoudt is niet de ruzie maar dat er niemand terugkwam.' },
      { id: 'b', label: 'Naar boven en zeggen dat jij te ver ging.', correct: true,
        feedback: 'Een van de weinige momenten met één duidelijk beter antwoord. Je hoeft niets recht te praten en niets te vragen — alleen jouw deel benoemen. Dat leert {hem} dat een band te repareren is.' },
      { id: 'c', label: 'Sorry zeggen, maar wel uitleggen wat {hij} fout deed.',
        feedback: 'Dan is het geen herstel maar een tweede ronde. Alles na het woord "maar" wist wat ervoor stond.' },
    ],
  },
  {
    id: 't2-o14', type: 'twee-wegen', scoorbaar: false, lesId: 't2-l4',
    situatie: 'Je komt terug na de ruzie. {Hij} reageert niet.',
    vraag: 'Twee wegen. Welke past hier?',
    afhangt:
      'Het hangt af van wat je nodig hebt. Wil je dat het uitgepraat is, dan vraag je iets — maar ' +
      'dan maak je het herstel afhankelijk van {zijn} antwoord. Zeg je alleen jouw deel en ga je ' +
      'weg, dan ligt het er, en kan {hij} het oppakken wanneer {hij} eraan toe is. Meestal is dat ' +
      'de sterkere zet, ook al voelt hij onaf.',
    opties: [
      { id: 'a', label: 'Vragen of het goed is tussen jullie.',
        feedback: 'Begrijpelijk, want je wil het weten. Maar je legt de last van het herstel bij {hem}, en dat is precies andersom.' },
      { id: 'b', label: 'Jouw deel zeggen en weer weggaan.',
        feedback: 'Onbevredigend voor jou, en meestal het effectiefst. Je vraagt niets terug, dus er is niets om je tegen te verzetten.' },
    ],
  },
  {
    id: 't2-o15', type: 'toen-en-nu', scoorbaar: false, lesId: 't2-l4',
    situatie: 'Twee keer dezelfde vraag.',
    vraag: 'Toen en nu',
    toen: {
      vraag: 'Zei jouw vader ooit dat hij te ver was gegaan?',
      nuVraag: 'En zeg jij dat tegen {naam}?',
      zelfde: 'Je herhaalt het patroon dat je kent. Als dat herstel was, heb je iets zeldzaams meegekregen. Zo niet, dan is dit de plek om te breken.',
      anders: 'Je doet iets wat je zelf nooit zag. Er is geen moeilijker vorm van opvoeden dan iets doen waar je geen voorbeeld van hebt.',
    },
    opties: [
      { id: 'a', label: 'Ja, regelmatig', feedback: '' },
      { id: 'b', label: 'Een enkele keer', feedback: '' },
      { id: 'c', label: 'Nooit', feedback: '' },
      { id: 'd', label: 'Hij deed alsof er niks was', feedback: '' },
    ],
  },
  {
    id: 't2-o16', type: 'balans', scoorbaar: false, lesId: 't2-l4',
    situatie: 'Na een botsing.',
    vraag: 'Wie zet meestal de eerste stap?',
    balans: {
      links: 'Ik', rechts: '{Hij}',
      zones: [
        { tot: 33, kop: 'Meestal jij',
          tekst: 'Zo hoort het op deze leeftijd. Een jongen van dertien heeft de woorden nog niet en de moed vaak ook niet. Dat jij begint, is geen zwakte.' },
        { tot: 66, kop: 'Om en om',
          tekst: 'Mooi. Dat betekent dat {hij} het aandurft, en dat is deels omdat jij het hebt voorgedaan.' },
        { tot: 100, kop: 'Meestal {hij}',
          tekst: 'Let hierop. Als een kind altijd de eerste stap moet zetten, leert het dat het conflict zijn schuld is. Dat gaat verder dan deze ruzie.' },
      ],
    },
  },
]

export const THEMA2: Thema = {
  id: 'escaleert',
  nr: 2,
  titel: 'Als het escaleert',
  ondertitel: 'Buien, stiltes en wat erachter zit',
  lessen: LESSEN,
  oefeningen: OEFENINGEN,
}
