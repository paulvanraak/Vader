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
        body: 'Stoerheid is zelden een karaktertrek, vaker een schild. Ontwikkelingspsychologen zien dit terug bij bijna elke puber: zolang het gevoel van eigenwaarde nog broos is, compenseert hij dat met imponeren. Onder de opschepperij zit meestal onzekerheid die hij nog niet met woorden kan vangen. Blijvend zelfvertrouwen komt niet van indruk maken, maar van het gevoel gezien te worden zoals hij werkelijk is. Dat schild hoeft niet in één keer weg, het wordt vanzelf kleiner naarmate hij zich veiliger voelt.',
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
        vraag: 'Je zoon overdrijft weer een verhaal. Wat zou de beste aanpak zijn?',
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
        acties: ['Benoem iets dat hij écht goed kan, zonder aanleiding', 'Vraag wat hem zo trots maakte op zijn verhaal'],
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
        body: 'Faalangst gaat zelden over het falen zelf, vaker over de verwachte reactie van de mensen van wie hij afhankelijk is. Psychologen noemen dat de behoefte aan psychologische veiligheid: pas als fouten maken veilig aanvoelt, durft iemand ze ook te laten zien. Een zoon die leert dat missers bespreekbaar zijn, durft later grotere risico\'s te nemen. En omdat kinderen vooral leren van wat ze zien, niet van wat er wordt gezegd, is de manier waarop jij met je eigen missers omgaat het voorbeeld dat blijft hangen.',
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
        vraag: 'Je ontdekt de onvoldoende in zijn tas. Wat zou de beste aanpak zijn?',
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
        acties: [
          'Vertel over een moment dat jij zelf iets liet mislukken',
          'Vraag rustig wat er volgens hem misging',
        ],
      },
    ],
  },
  {
    id: '4.3',
    world: 4,
    cohort: 'oud',
    title: 'Als hij zichzelf vergelijkt met iedereen',
    beats: [
      {
        type: 'haakje',
        body: 'Hij zucht dat een klasgenoot alles beter kan: sportiever, populairder, slimmer. Zelf voelt hij zich dan klein.',
      },
      {
        type: 'inzicht',
        body: 'Jezelf vergelijken met anderen is van alle tijden, de sociale-vergelijkingstheorie beschrijft het al decennia. Maar social media legt hem vooral de succesmomenten van honderden anderen voor, nooit hun gewone, onzekere dagen. Dat is statistisch al een oneerlijke wedstrijd. Eigenwaarde die is opgebouwd uit eigen waarden en ervaringen blijkt veel stabieler dan eigenwaarde die meebeweegt met wie er net langsscrolt.',
      },
      {
        type: 'spiegel',
        body: 'Vergelijk jij jezelf ook weleens met anderen, en laat je dat weleens merken aan hem?',
      },
      {
        type: 'voorbeeld',
        fout: 'Iedereen is toch ergens goed in, jij ook.',
        beter: 'Waarin voel jij je zelf wél goed, los van wat een ander kan?',
      },
      {
        type: 'oefening',
        vraag: 'Hij vergelijkt zich weer met een klasgenoot. Wat zou de beste aanpak zijn?',
        opties: [
          {
            label: 'Zeggen dat de vergelijking niet klopt.',
            correct: false,
            feedback: 'Dan ga je in discussie over feiten, niet over zijn gevoel.',
          },
          {
            label: 'Vragen waar hij zelf trots op is.',
            correct: true,
            feedback: 'Zo verschuift het gesprek van vergelijken naar eigen waarde.',
          },
          {
            label: 'Zeggen dat vergelijken zinloos is.',
            correct: false,
            feedback: 'Dat klopt, maar het stopt het gevoel niet.',
          },
        ],
      },
      {
        type: 'thuismissie',
        acties: [
          'Noem iets waar hij deze week trots op leek',
          'Vraag waarin hij zichzelf goed vindt, los van anderen',
        ],
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
        body: 'Erbij willen horen is in de puberteit een van de sterkste krachten die er bestaat, sterker vaak dan wat hij zelf goed vindt. Hersenonderzoek laat zien waarom: het beloningssysteem reageert in deze jaren extra sterk op sociale acceptatie, terwijl het deel van de hersenen dat afweegt en remt nog volop in ontwikkeling is. Dat is geen zwak karakter, dat is een brein dat nog aan het groeien is. Hij heeft dan ook geen preek nodig over ruggengraat, maar oefening in het hardop zeggen van wat hij zelf denkt.',
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
        vraag: 'Hij vertelt dat hij meedeed met iets dat niet goed voelde. Wat zou de beste aanpak zijn?',
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
        acties: [
          'Bedenk samen een zin voor de volgende keer dat hij niet mee wil doen',
          'Vraag wat hem had geholpen om anders te kiezen',
        ],
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
        body: 'Zwijgen voelt veilig, maar sociaalpsychologisch onderzoek naar het omstandereffect laat zien dat voor wie buitengesloten wordt, meedoen en zwijgend toekijken vaak hetzelfde effect hebben. Je zoon weet heus wel wat aardig is, een preek daarover voegt weinig toe. Wat hij wel kan gebruiken, is het besef dat stil blijven ook een keuze is, en dat een andere keuze mag: die stap wordt kleiner naarmate hij vaker ervaart dat jij er zonder oordeel met hem over praat.',
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
        vraag: 'Je zoon vertelt over de groepsapp. Wat zou de beste aanpak zijn?',
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
        acties: [
          'Vraag hoe hij zich voelde toen het gebeurde',
          'Bedenk samen wat hij kan zeggen de volgende keer',
        ],
      },
    ],
  },
  {
    id: '5.3',
    world: 5,
    cohort: 'oud',
    title: 'Als een vriendschap uit elkaar groeit',
    beats: [
      {
        type: 'haakje',
        body: 'Zijn beste vriend van vroeger trekt nu met een andere groep op. Je zoon doet alsof het hem niks doet.',
      },
      {
        type: 'inzicht',
        body: 'Vriendschappen verschuiven enorm in de puberteit. Ontwikkelingspsycholoog Erik Erikson noemde dit de zoektocht naar identiteit: vrienden wisselen mee met wie hij op dat moment probeert te zijn. Het gemis van een oude vriendschap doet daarom toch pijn, ook als hij dat wegwuift, want het is een vorm van verlies waar weinig woorden voor bestaan op die leeftijd. Hij hoeft er niet lang bij stil te staan, maar het mag wel bestaan als jij de ruimte ervoor geeft.',
      },
      {
        type: 'spiegel',
        body: 'Ben jij zelf weleens een vriendschap kwijtgeraakt in die jaren? Hoe voelde dat, en wat had je toen nodig?',
      },
      {
        type: 'voorbeeld',
        fout: 'Maak toch gewoon nieuwe vrienden.',
        beter: 'Dat moet toch wel wennen zijn, die andere groep.',
      },
      {
        type: 'oefening',
        vraag: 'Hij vertelt terloops over zijn oude vriend die nu ergens anders bij hoort. Wat zou de beste aanpak zijn?',
        opties: [
          {
            label: 'Voorstellen dat hij nieuwe vrienden zoekt.',
            correct: false,
            feedback: 'Dat lost iets op wat nog niet erkend is.',
          },
          {
            label: 'Benoemen dat dat toch wennen moet zijn.',
            correct: true,
            feedback: 'Zo mag het gevoel er zijn zonder dat je het groter maakt dan het is.',
          },
          {
            label: 'Er niet op ingaan, het is maar een vriendschap.',
            correct: false,
            feedback: 'Voor hem is het waarschijnlijk meer dan dat.',
          },
        ],
      },
      {
        type: 'thuismissie',
        acties: [
          'Vraag wie hij deze week het meest zag optrekken',
          'Benoem dat die andere groep wel wennen moet zijn',
        ],
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
        body: 'Het algoritme leert razendsnel wat hem vasthoudt en geeft daar steeds meer van, elke like en elke nieuwe video geeft een piek in het beloningssysteem. Het puberbrein is daar extra gevoelig voor: de zoektocht naar sterke prikkels en sociale bevestiging staat op zijn hoogtepunt, terwijl het vermogen om zichzelf te stoppen nog moet doorgroeien. Die combinatie maakt de lus bij hem sterker dan bij jou. Dit is geen slapheid van je zoon. Het is een systeem dat precies is gebouwd om vast te houden, tegen een brein dat nog leert om nee te zeggen.',
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
        vraag: 'Je zoon zit weer te scrollen. Wat zou de beste aanpak zijn?',
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
        acties: ['Vraag oprecht wat hij aan het kijken is', 'Kijk een keer mee, zonder commentaar'],
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
        body: 'De verleiding begint met echte, aantrekkelijke beloftes: word sterk, word rijk, hoor ergens bij. Onderzoekers naar dit soort onlinegemeenschappen noemen dat de instapfase, precies de gevoelens die op deze leeftijd toch al spelen. Pas geleidelijk glijdt de boodschap af naar vrouwen zijn het probleem. De echte haak zit niet in het vrouwbeeld, maar in de pijn eronder: onzekerheid, eenzaamheid, het verlangen om ergens bij te horen. Je zoon zoekt daar geen haat. Hij zoekt houvast, op een plek die hem dat gemakkelijk lijkt te geven.',
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
        vraag: 'Je zoon citeert zo iemand. Wat zou de beste aanpak zijn?',
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
        acties: [
          'Vraag naar één ding dat hij goed vindt aan die influencer',
          'Vraag of er ook iets is waar hij het niet mee eens is',
        ],
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
        body: 'In het moment kalm blijven werkt beter dan een uitbrander. Psychologen noemen het reactance: hoe feller de afkeuring, hoe steviger iemand zich vastklampt aan wat hij net zei, puur om zijn eigen standpunt te verdedigen. Rustig doorvragen haalt juist de druk eraf en laat hem zijn eigen woorden terughoren, vaak schrikt hij daar zelf het meest van.',
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
        vraag: 'De opmerking valt. Wat zou de beste aanpak zijn?',
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
        acties: [
          'Adem eerst, en vraag dan waar het vandaan komt',
          'Let deze week eens op hoe je zelf over vrouwen praat',
        ],
      },
    ],
  },
]
