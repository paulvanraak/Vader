import type { Lesson } from '../types/lesson'

export const lessons: Lesson[] = [
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
