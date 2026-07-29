import type { Lesson } from '../types/lesson'

export const lessons: Lesson[] = [
  {
    id: '4.1',
    world: 4,
    cohort: 'oud',
    title: 'Waarom hij zich groter voordoet',
    beats: [
      {
        type: 'haakje',
        body: 'Je zoon overdrijft een verhaal, of maakt een ander even klein om zelf groter te lijken. Herkenbaar?',
      },
      {
        type: 'inzicht',
        body: 'Stoerheid is meestal geen karaktertrek maar een schild. Onder de opschepperij zit vaak onzekerheid die hij nog niet met woorden kan uitdrukken. Echt zelfvertrouwen komt van gezien worden zoals hij is, niet van indruk maken. Dat schild hoeft niet weg, maar het mag wel kleiner worden naarmate hij zich veiliger voelt.',
      },
      {
        type: 'spiegel',
        body: 'En jij? Praat jij jezelf ook weleens groter als je je onzeker voelt, op je werk of thuis? Hij leert dat patroon ergens vandaan.',
      },
      {
        type: 'voorbeeld',
        fout: 'Doe niet zo opschepperig, dat staat niet leuk.',
        beter: 'Wat wilde je daarmee laten zien, denk je?',
      },
      {
        type: 'oefening',
        vraag: 'Je zoon overdrijft weer een verhaal. Wat doe je?',
        opties: [
          {
            label: 'Hem corrigeren waar het verhaal niet klopt.',
            correct: false,
            feedback: 'Dan gaat het over de feiten, niet over waarom hij ze nodig had.',
          },
          {
            label: 'Nieuwsgierig vragen wat hem zo trots maakte.',
            correct: true,
            feedback: 'Zo kom je bij het gevoel achter het verhaal, niet bij de leugen.',
          },
          {
            label: 'Er hardop om lachen.',
            correct: false,
            feedback: 'Dat voelt als afgaan, precies wat hij probeerde te voorkomen.',
          },
        ],
      },
      {
        type: 'thuismissie',
        body: 'Benoem vanavond één keer iets dat je zoon écht goed kan, zonder aanleiding nodig te hebben.',
      },
      {
        type: 'terugkoppeling',
        body: 'Hoe reageerde hij toen je hem een compliment gaf zonder aanleiding?',
      },
    ],
  },
  {
    id: '4.2',
    world: 4,
    cohort: 'oud',
    title: 'Als hij faalt en het wegstopt',
    beats: [
      {
        type: 'haakje',
        body: 'Een onvoldoende blijft in zijn tas zitten. Een verloren wedstrijd wordt weggewuifd met "boeit niet". Maar het boeit wel.',
      },
      {
        type: 'inzicht',
        body: 'Faalangst gaat zelden over het falen zelf. Het gaat over de angst voor jouw reactie of teleurstelling. Een zoon die leert dat fouten veilig zijn om te laten zien, durft later ook grotere risico\'s te nemen. Hoe jij met je eigen missers omgaat, is het voorbeeld dat blijft hangen.',
      },
      {
        type: 'spiegel',
        body: 'Hoe praat jij over je eigen fouten waar hij bij is? Verberg jij ze ook, of mag hij zien dat het misgaat en dat het oké is?',
      },
      {
        type: 'voorbeeld',
        fout: 'Een onvoldoende? Hoe kan dat nou weer?',
        beter: 'Vervelend, zeg. Wat denk je dat er misging?',
      },
      {
        type: 'oefening',
        vraag: 'Je ontdekt de onvoldoende in zijn tas. Wat werkt het best?',
        opties: [
          {
            label: 'Meteen vragen waarom hij het niet zei.',
            correct: false,
            feedback: 'Dat voegt schaamte toe aan iets dat al zwaar genoeg is.',
          },
          {
            label: 'Rustig vragen wat er volgens hem misging.',
            correct: true,
            feedback: 'Zo blijft de fout bespreekbaar in plaats van iets om te verstoppen.',
          },
          {
            label: 'Er niks van zeggen.',
            correct: false,
            feedback: 'Dan leert hij dat verstoppen werkt.',
          },
        ],
      },
      {
        type: 'thuismissie',
        body: 'Vertel vanavond zelf over een keer dat jij iets liet mislukken, en wat je ervan leerde.',
      },
      {
        type: 'terugkoppeling',
        body: 'Wat gebeurde er toen jij over je eigen misser vertelde?',
      },
    ],
  },
  {
    id: '5.1',
    world: 5,
    cohort: 'oud',
    title: 'Meegaan met de groep',
    beats: [
      {
        type: 'haakje',
        body: 'Hij vertelt over iets dat de groep deed. Het voelt niet honderd procent goed, maar hij deed mee.',
      },
      {
        type: 'inzicht',
        body: 'Erbij willen horen is in de puberteit een van de sterkste krachten die er is, sterker dan wat hij zelf goed vindt. Dat is geen zwak karakter, dat is hoe zijn brein nu prioriteert. Hij heeft geen preek nodig over ruggengraat, hij heeft oefening nodig in hardop zeggen wat hij zelf denkt.',
      },
      {
        type: 'spiegel',
        body: 'Heb jij weleens meegedaan met iets waar je achteraf spijt van had, gewoon om erbij te horen? Vertel dat gerust.',
      },
      {
        type: 'voorbeeld',
        fout: 'Waarom deed je dat nou mee, jij weet toch beter?',
        beter: 'Wat voelde jij op dat moment zelf, voordat je meedeed?',
      },
      {
        type: 'oefening',
        vraag: 'Hij vertelt dat hij meedeed met iets dat niet goed voelde. Wat is je beste zet?',
        opties: [
          {
            label: 'Zeggen dat hij een eigen mening moet hebben.',
            correct: false,
            feedback: 'Dat weet hij al. Het is makkelijker gezegd dan gedaan.',
          },
          {
            label: 'Vragen wat hem had geholpen om iets anders te doen.',
            correct: true,
            feedback: 'Zo oefen je samen een concreet alternatief voor de volgende keer.',
          },
          {
            label: 'Zeggen dat die vrienden geen goede invloed zijn.',
            correct: false,
            feedback: 'Dan gaat hij die vrienden verdedigen in plaats van nadenken.',
          },
        ],
      },
      {
        type: 'thuismissie',
        body: 'Bedenk samen één zin die hij kan gebruiken als hij een volgende keer niet mee wil doen.',
      },
      {
        type: 'terugkoppeling',
        body: 'Kwamen jullie samen tot een zin die hij zou durven zeggen?',
      },
    ],
  },
  {
    id: '5.2',
    world: 5,
    cohort: 'oud',
    title: 'Als vriendschap omslaat in buitensluiten',
    beats: [
      {
        type: 'haakje',
        body: 'Er is iemand uit de groepsapp gezet. Je zoon zegt er niks over, maar zat er wel bij.',
      },
      {
        type: 'inzicht',
        body: 'Zwijgen voelt veilig, maar voor wie buitengesloten wordt maakt het weinig verschil of iemand meedeed of erbij zat en niets zei. Je zoon heeft geen preek nodig over wat aardig is, hij weet dat al. Hij heeft hulp nodig om te zien dat stil blijven ook een keuze is, en dat een andere keuze mag.',
      },
      {
        type: 'spiegel',
        body: 'Hoe reageerde jij vroeger als iemand in jouw groep buitengesloten werd? En hoe zou je willen dat je toen had gereageerd?',
      },
      {
        type: 'voorbeeld',
        fout: 'Waarom deed je daar niks aan, dat is toch gewoon fout?',
        beter: 'Wat dacht jij op dat moment, toen het gebeurde?',
      },
      {
        type: 'oefening',
        vraag: 'Je zoon vertelt over de groepsapp. Wat is je beste eerste zet?',
        opties: [
          {
            label: 'Hem meteen zeggen dat hij die persoon terug moet toevoegen.',
            correct: false,
            feedback: 'Dat lost het voor nu op, maar hij leert er niks van voor de volgende keer.',
          },
          {
            label: 'Vragen hoe hij zich voelde toen het gebeurde.',
            correct: true,
            feedback: 'Zo ontdekt hij zelf dat zwijgen ook meedoen is, in plaats van dat jij het hem vertelt.',
          },
          {
            label: 'Er verder niet op ingaan, het is maar een appgroep.',
            correct: false,
            feedback: 'Voor wie erbuiten valt, is het dat niet.',
          },
        ],
      },
      {
        type: 'thuismissie',
        body: 'Vraag hem vanavond wat hij zou kunnen zeggen de volgende keer dat iemand buitengesloten dreigt te worden.',
      },
      {
        type: 'terugkoppeling',
        body: 'Had hij al een idee voor wat hij zou kunnen zeggen?',
      },
    ],
  },
  {
    id: '6.1',
    world: 6,
    cohort: 'oud',
    title: 'Waarom hij blijft hangen',
    beats: [
      {
        type: 'haakje',
        body: 'Je ziet je zoon eindeloos scrollen. Steeds dezelfde soort video\'s. Toeval? Nee.',
      },
      {
        type: 'inzicht',
        body: 'Het algoritme leert razendsnel wat hem vasthoudt en geeft daar steeds meer van. Het puberbrein is extra gevoelig voor sociale bevestiging en sterke prikkels, dus die lus grijpt bij hem harder dan bij jou. Dit is geen slapheid van je zoon. Het is een machine die is gebouwd om te pakken.',
      },
      {
        type: 'spiegel',
        body: 'En jij? Hoe vaak pak jij je telefoon aan tafel of op de bank? Je zoon leest jouw schermgedrag scherper dan jouw woorden. Wat laat jij zien?',
      },
      {
        type: 'voorbeeld',
        fout: 'Zit je nou alweer op dat ding? Wegleggen.',
        beter: 'Wat kijk je eigenlijk? Laat eens zien, ik snap er niks van.',
      },
      {
        type: 'oefening',
        vraag: 'Je zoon zit weer te scrollen. Wat doe je?',
        opties: [
          {
            label: 'Zijn telefoon afpakken.',
            correct: false,
            feedback: 'Dit sluit het gesprek en zet een muur op.',
          },
          {
            label: 'Vragen wat hij kijkt en echt meekijken.',
            correct: true,
            feedback: 'Zo open je het gesprek.',
          },
          {
            label: 'Niks zeggen.',
            correct: false,
            feedback: 'Dan blijft het onbesproken.',
          },
        ],
      },
      {
        type: 'thuismissie',
        body: 'Vraag vanavond één keer oprecht wat hij kijkt, en kijk mee zonder commentaar.',
      },
      {
        type: 'terugkoppeling',
        body: 'Hoe ging het? Liet hij iets zien?',
      },
    ],
  },
  {
    id: '6.2',
    world: 6,
    cohort: 'oud',
    title: 'Wat de influencer echt verkoopt',
    beats: [
      {
        type: 'haakje',
        body: 'Je zoon vindt zo\'n gozer motiverend. Sportschool, discipline, geld. Klinkt onschuldig. Tot het dat niet meer is.',
      },
      {
        type: 'inzicht',
        body: 'De verleiding begint met echte, aantrekkelijke beloftes: word sterk, word rijk, hoor erbij. En glijdt daarna langzaam af naar en vrouwen zijn het probleem. De haak is de pijn eronder, namelijk onzekerheid, eenzaamheid en ergens bij willen horen. Je zoon zoekt geen haat. Hij zoekt houvast.',
      },
      {
        type: 'spiegel',
        body: 'Waar haalt jouw zoon zijn gevoel van ik doe ertoe vandaan? Als jij die bron niet bent, zoekt hij een andere. Dat is geen verwijt, dat is de opdracht.',
      },
      {
        type: 'voorbeeld',
        fout: 'Die gast is een idioot, hoe kun je daar nou naar luisteren?',
        beter: 'Ik snap dat het motiverende deel aantrekkelijk is. Welk deel vind jij goed? En is er ook iets waar je het niet mee eens bent?',
      },
      {
        type: 'oefening',
        vraag: 'Je zoon citeert zo iemand. Wat werkt het best?',
        opties: [
          {
            label: 'De influencer belachelijk maken.',
            correct: false,
            feedback: 'Dan verdedigt hij zijn held en sluit hij zich af.',
          },
          {
            label: 'Vragen wat hij er goed én niet goed aan vindt.',
            correct: true,
            feedback: 'Zo wordt hij zelf kritisch. Dat werkt beter dan een verbod.',
          },
          {
            label: 'Verbieden erover te praten.',
            correct: false,
            feedback: 'Een verbod maakt het juist spannend.',
          },
        ],
      },
      {
        type: 'thuismissie',
        body: 'Vraag hem naar één ding dat hij goed vindt aan zo\'n influencer, en luister zonder te oordelen.',
      },
      {
        type: 'terugkoppeling',
        body: 'Lukte het om te luisteren zonder de discussie aan te gaan?',
      },
    ],
  },
  {
    id: '6.3',
    world: 6,
    cohort: 'oud',
    title: 'Als er een rare opmerking valt',
    beats: [
      {
        type: 'haakje',
        body: 'Aan tafel valt de opmerking. Iets over vrouwen dat je doet schrikken. Wat nu?',
      },
      {
        type: 'inzicht',
        body: 'In het moment kalm blijven werkt beter dan een uitbrander. Een felle reactie maakt van de opmerking een machtsstrijd, en dan graaft hij zich in. Rustig doorvragen haalt de lucht eruit en laat hem zijn eigen woorden horen.',
      },
      {
        type: 'spiegel',
        body: 'Hoe praat jij zelf over vrouwen, over zijn moeder, over de buurvrouw, als je moe of geïrriteerd bent? Hij kopieert meer van jou dan je denkt. Begin daar.',
      },
      {
        type: 'voorbeeld',
        fout: 'Zo praten we hier niet, ga naar je kamer.',
        beter: 'Oef, waar komt dat vandaan? Meen je dat echt, of hoorde je het ergens?',
      },
      {
        type: 'oefening',
        vraag: 'De opmerking valt. Wat is je eerste zet?',
        opties: [
          {
            label: 'Straffen en het gesprek sluiten.',
            correct: false,
            feedback: 'Dat laadt de opmerking juist op.',
          },
          {
            label: 'Ademen, en doorvragen waar het vandaan komt.',
            correct: true,
            feedback: 'Zo houd je de deur open zonder het goed te keuren.',
          },
          {
            label: 'Negeren en hopen dat het overwaait.',
            correct: false,
            feedback: 'Dan blijft het onbesproken.',
          },
        ],
      },
      {
        type: 'thuismissie',
        body: 'Valt er zo\'n opmerking, adem dan eerst en vraag door in plaats van te straffen. En let deze week één keer op hoe je zelf praat.',
      },
      {
        type: 'terugkoppeling',
        body: 'Lukte het om kalm te blijven? En merkte je iets aan je eigen woorden?',
      },
    ],
  },
]
