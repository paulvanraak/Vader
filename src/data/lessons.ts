import type { Lesson } from '../types/lesson'

export const lessons: Lesson[] = [
  {
    id: '1.1',
    world: 1,
    cohort: 'oud',
    title: 'Als hij zich terugtrekt op zijn kamer',
    beats: [
      {
        type: 'haakje',
        body: 'Vroeger vertelde hij alles aan tafel. Nu verdwijnt hij meteen na het eten naar zijn kamer.',
      },
      {
        type: 'inzicht',
        body: 'Terugtrekken in de puberteit is een normale stap in de ontwikkeling van een eigen identiteit los van het gezin, niet een afwijzing van jou. Hersenonderzoek laat zien dat pubers letterlijk meer behoefte krijgen aan privacy en autonomie doordat het zelfbeeld zich losmaakt van het ouderlijk referentiekader. Dat wil niet zeggen dat de band verdwijnt, wel dat hij op een andere manier vorm krijgt.',
      },
      {
        type: 'spiegel',
        body: 'Trok jij je als tiener ook terug? Waar had je toen zelf behoefte aan van je ouders?',
      },
      {
        type: 'voorbeeld',
        fout: 'Waarom zit je toch altijd op je kamer?',
        beter: 'Ik kom zo even langs, hou je een momentje voor me vrij?',
      },
      {
        type: 'oefening',
        vraag: 'Hij trekt zich weer terug na het eten. Wat zou de beste aanpak zijn?',
        opties: [
          {
            label: 'Hem dwingen aan tafel te blijven.',
            correct: false,
            feedback: 'Dat maakt de kamer nog aantrekkelijker als vluchtplek.',
          },
          {
            label: 'Af en toe gewoon binnenlopen zonder agenda.',
            correct: true,
            feedback: 'Zo blijft het contact laagdrempelig zonder druk.',
          },
          {
            label: 'Hem er nooit meer over aanspreken.',
            correct: false,
            feedback: 'Dan verdwijnt vanzelf ieder moment van contact.',
          },
        ],
      },
      {
        type: 'thuismissie',
        acties: [
          'Loop vanavond even zijn kamer in zonder reden',
          'Vraag of je iets voor hem kunt halen, zonder gesprek te forceren',
        ],
      },
    ],
  },
  {
    id: '1.2',
    world: 1,
    cohort: 'oud',
    title: 'Waarom een goed gesprek zelden aan tafel begint',
    beats: [
      {
        type: 'haakje',
        body: 'Je probeert een gesprek te beginnen, en binnen twee zinnen krijg je alleen "ja" en "nee" terug.',
      },
      {
        type: 'inzicht',
        body: 'Directe oogcontactgesprekken voelen voor veel pubers als een verhoor. Gesprekken die ontstaan tijdens een gedeelde activiteit, zoals autorijden, koken of wandelen, verlagen de sociale druk omdat er geen oogcontact nodig is en er een gedeeld doel is. Dat is geen truc, het is simpelweg een omgeving waarin praten minder confronterend aanvoelt.',
      },
      {
        type: 'spiegel',
        body: 'Wanneer voel jij je zelf vrijer om iets lastigs te zeggen, oog in oog of naast elkaar?',
      },
      {
        type: 'voorbeeld',
        fout: 'Ga zitten, we moeten praten.',
        beter: 'Zin om mee te rijden naar de supermarkt?',
      },
      {
        type: 'oefening',
        vraag: 'Je wil iets bespreken dat gevoelig ligt. Wat zou de beste aanpak zijn?',
        opties: [
          {
            label: 'Hem aan de keukentafel zetten voor een gesprek.',
            correct: false,
            feedback: 'Dat voelt al snel als een verhoor.',
          },
          {
            label: 'Het gesprek laten ontstaan tijdens een activiteit samen.',
            correct: true,
            feedback: 'Zonder oogcontact en met een gedeeld doel praat het makkelijker.',
          },
          {
            label: 'Wachten tot hij er zelf over begint.',
            correct: false,
            feedback: 'Dat kan lang duren, en het moment gaat voorbij.',
          },
        ],
      },
      {
        type: 'thuismissie',
        acties: [
          'Stel voor om samen iets te doen zonder gesprek als doel',
          'Begin een gesprek terwijl jullie ergens anders mee bezig zijn',
        ],
      },
    ],
  },
  {
    id: '1.3',
    world: 1,
    cohort: 'oud',
    title: 'Als "gaat wel" het enige antwoord is',
    beats: [
      {
        type: 'haakje',
        body: 'Je vraagt hoe school was. "Gaat wel." Elke dag hetzelfde antwoord.',
      },
      {
        type: 'inzicht',
        body: 'Brede vragen als "hoe was het" vragen om een samenvatting, wat voor een puber vaak te veel moeite kost na een lange dag. Specifieke vragen over een klein detail, zoals een vak of een persoon, vragen om een concreet antwoord en zijn makkelijker te beantwoorden. De kwaliteit van zijn antwoord zegt dus vaak meer over de vraag dan over zijn bereidheid om te praten.',
      },
      {
        type: 'spiegel',
        body: 'Stel jij zelf ook weleens brede vragen omdat concrete vragen meer moeite kosten om te bedenken?',
      },
      {
        type: 'voorbeeld',
        fout: 'Hoe was school?',
        beter: 'Hoe ging die scheikundetoets van vanochtend?',
      },
      {
        type: 'oefening',
        vraag: 'Je krijgt weer "gaat wel" te horen. Wat zou de beste aanpak zijn?',
        opties: [
          {
            label: 'Nog een keer dezelfde brede vraag stellen.',
            correct: false,
            feedback: 'Dan krijg je waarschijnlijk hetzelfde antwoord.',
          },
          {
            label: 'Een concrete, kleine vraag stellen over iets specifieks.',
            correct: true,
            feedback: 'Een klein, concreet antwoord kost minder moeite dan een samenvatting.',
          },
          {
            label: 'Het gesprek maar laten rusten.',
            correct: false,
            feedback: 'Dan blijft het contact oppervlakkig.',
          },
        ],
      },
      {
        type: 'thuismissie',
        acties: [
          "Stel vanavond een heel specifieke vraag in plaats van 'hoe was het'",
          'Vraag naar één klein moment van zijn dag, niet naar de hele dag',
        ],
      },
    ],
  },
  {
    id: '2.1',
    world: 2,
    cohort: 'oud',
    title: 'Als een kleinigheid een woede-uitbarsting wordt',
    beats: [
      {
        type: 'haakje',
        body: 'Zijn veter breekt en hij ontploft alsof de wereld vergaat.',
      },
      {
        type: 'inzicht',
        body: 'Het emotieregulerende deel van het puberbrein, de prefrontale cortex, is nog volop in ontwikkeling, terwijl het emotionele systeem al op volle kracht draait. Kleine frustraties stapelen zich vaak onopgemerkt op tot er een druppel de emmer doet overlopen. De uitbarsting gaat zelden echt over de veter.',
      },
      {
        type: 'spiegel',
        body: 'Waar merk jij dat kleine irritaties zich bij jou opstapelen voordat je zelf uit je slof schiet?',
      },
      {
        type: 'voorbeeld',
        fout: 'Doe niet zo overdreven, het is maar een veter.',
        beter: 'Zwaar moment zeg. Wat speelt er nog meer vandaag?',
      },
      {
        type: 'oefening',
        vraag: 'Hij ontploft om iets kleins. Wat zou de beste aanpak zijn?',
        opties: [
          {
            label: 'Zeggen dat hij overdrijft.',
            correct: false,
            feedback: 'Dat maakt het gevoel alleen maar kleiner gemaakt.',
          },
          {
            label: 'Rustig blijven en vragen wat er verder nog speelt.',
            correct: true,
            feedback: 'Zo kom je bij de echte oorzaak onder de uitbarsting.',
          },
          {
            label: 'De situatie negeren tot hij is gekalmeerd.',
            correct: false,
            feedback: 'Dan blijft de echte oorzaak onbesproken.',
          },
        ],
      },
      {
        type: 'thuismissie',
        acties: [
          'Vraag na een kleine uitbarsting rustig wat er nog meer speelde die dag',
          'Blijf zelf kalm en benoem dat je ziet dat er meer aan de hand is',
        ],
      },
    ],
  },
  {
    id: '2.2',
    world: 2,
    cohort: 'oud',
    title: 'Waarom stiltes niet altijd iets verbergen',
    beats: [
      {
        type: 'haakje',
        body: 'Hij zegt al drie dagen bijna niks. Je vreest het ergste.',
      },
      {
        type: 'inzicht',
        body: 'Stiltes bij pubers duiden lang niet altijd op een probleem; ze verwerken indrukken vaker in stilte dan hardop, in tegenstelling tot volwassenen die geneigd zijn te praten om te verwerken. Doorvragen op het verkeerde moment kan een stilte juist verlengen omdat het als druk aanvoelt.',
      },
      {
        type: 'spiegel',
        body: 'Verwerk jij zelf dingen liever in stilte of door erover te praten? En verwacht je hetzelfde van hem?',
      },
      {
        type: 'voorbeeld',
        fout: 'Je zegt al dagen niks, is er iets?',
        beter: 'Ik ben er, ook als je niks wil zeggen.',
      },
      {
        type: 'oefening',
        vraag: 'Hij is al dagen stil. Wat zou de beste aanpak zijn?',
        opties: [
          {
            label: 'Net zo lang doorvragen tot hij iets zegt.',
            correct: false,
            feedback: 'Dat kan de stilte juist verlengen.',
          },
          {
            label: 'Laten weten dat je er bent, zonder te pushen.',
            correct: true,
            feedback: 'Zo blijft de deur open zonder druk.',
          },
          {
            label: 'Net doen of er niks aan de hand is.',
            correct: false,
            feedback: 'Dan voelt hij zich mogelijk nog onopgemerkter.',
          },
        ],
      },
      {
        type: 'thuismissie',
        acties: [
          'Laat hem weten dat je er bent, zonder te vragen wat er is',
          'Bied gewoon je gezelschap aan, zonder gesprek te eisen',
        ],
      },
    ],
  },
  {
    id: '2.3',
    world: 2,
    cohort: 'oud',
    title: 'Als hij jou de schuld geeft van alles',
    beats: [
      {
        type: 'haakje',
        body: 'Alles wat misgaat is opeens jouw schuld, van de wifi tot zijn humeur.',
      },
      {
        type: 'inzicht',
        body: 'Pubers projecteren onzekerheid vaak op de veiligste persoon in hun omgeving, meestal een ouder, omdat die relatie het meest bestand is tegen kritiek. Het is een vorm van vertrouwen, ook al voelt het als een aanval. Meegaan in de discussie bevestigt vaak alleen het patroon.',
      },
      {
        type: 'spiegel',
        body: 'Bij wie laat jij zelf je frustratie het makkelijkst vallen, ook als diegene er niks aan kan doen?',
      },
      {
        type: 'voorbeeld',
        fout: 'Dat is helemaal niet mijn schuld!',
        beter: 'Ik hoor dat je gefrustreerd bent. Zullen we kijken wat er echt speelt?',
      },
      {
        type: 'oefening',
        vraag: 'Hij geeft je overal de schuld van. Wat zou de beste aanpak zijn?',
        opties: [
          {
            label: 'Fel verdedigen dat het niet jouw schuld is.',
            correct: false,
            feedback: 'Dat voedt de discussie zonder de echte oorzaak te raken.',
          },
          {
            label: 'Erkennen dat hij gefrustreerd is en vragen wat er echt speelt.',
            correct: true,
            feedback: 'Zo doorbreek je het patroon zonder het verwijt te bevechten.',
          },
          {
            label: 'Hem straffen voor het onterechte verwijt.',
            correct: false,
            feedback: 'Dat bevestigt vooral dat jij de veilige plek bent om tegenaan te schoppen, zonder de frustratie te adresseren.',
          },
        ],
      },
      {
        type: 'thuismissie',
        acties: [
          'Erken zijn frustratie voordat je jezelf verdedigt',
          'Vraag rustig wat er echt aan de hand is achter het verwijt',
        ],
      },
    ],
  },
  {
    id: '3.1',
    world: 3,
    cohort: 'oud',
    title: 'Als een regel plotseling onbespreekbaar wordt',
    beats: [
      {
        type: 'haakje',
        body: 'Een regel die altijd vanzelfsprekend was, wordt opeens fel bevochten.',
      },
      {
        type: 'inzicht',
        body: 'Het testen van grenzen is een gezonde manier waarop pubers oefenen met autonomie en eigen oordeelsvorming. Regels die worden uitgelegd in plaats van opgelegd, blijken beter te beklijven omdat ze aansluiten bij zijn groeiende behoefte om zelf te begrijpen waarom iets zo is.',
      },
      {
        type: 'spiegel',
        body: 'Leg jij regels vooral uit, of vooral op? En hoe reageerde je toen jij zelf als tiener een regel oneerlijk vond?',
      },
      {
        type: 'voorbeeld',
        fout: 'Omdat ik het zeg, daarom.',
        beter: 'Laat me uitleggen waarom deze regel er is, en dan hoor ik graag wat jij ervan vindt.',
      },
      {
        type: 'oefening',
        vraag: 'Een regel wordt fel bevochten. Wat zou de beste aanpak zijn?',
        opties: [
          {
            label: 'De regel handhaven zonder uitleg.',
            correct: false,
            feedback: 'Dat voedt vooral het gevoel dat de regel willekeurig is.',
          },
          {
            label: 'Uitleggen waarom de regel er is en zijn kant horen.',
            correct: true,
            feedback: 'Zo sluit de regel aan bij zijn behoefte om het zelf te begrijpen.',
          },
          {
            label: 'De regel meteen loslaten om ruzie te voorkomen.',
            correct: false,
            feedback: 'Dan leert hij dat fel bevechten werkt.',
          },
        ],
      },
      {
        type: 'thuismissie',
        acties: [
          'Leg een keer uit waarom een regel bestaat in plaats van hem op te leggen',
          'Vraag hoe hij zelf tegen een bestaande regel aankijkt',
        ],
      },
    ],
  },
  {
    id: '3.2',
    world: 3,
    cohort: 'oud',
    title: 'Hoeveel vrijheid is genoeg?',
    beats: [
      {
        type: 'haakje',
        body: 'Hij wil later naar buiten, verder van huis, met minder controle. Jij twijfelt.',
      },
      {
        type: 'inzicht',
        body: 'Vrijheid in kleine, beheersbare stappen geven blijkt beter te werken dan alles-of-niets beslissingen. Het laat hem oefenen met verantwoordelijkheid terwijl het risico overzichtelijk blijft, en het geeft jou concrete momenten om vertrouwen op te bouwen op basis van hoe hij ermee omgaat.',
      },
      {
        type: 'spiegel',
        body: 'Waar baseer jij je grens op: op een concreet risico, of vooral op je eigen ongemak?',
      },
      {
        type: 'voorbeeld',
        fout: 'Nee, te gevaarlijk, punt uit.',
        beter: 'Laten we een kleine stap proberen en kijken hoe het gaat.',
      },
      {
        type: 'oefening',
        vraag: 'Hij vraagt om meer vrijheid dan je gewend bent. Wat zou de beste aanpak zijn?',
        opties: [
          {
            label: 'Meteen nee zeggen.',
            correct: false,
            feedback: 'Dan krijgt hij geen kans om vertrouwen op te bouwen.',
          },
          {
            label: 'Een kleine, tijdelijke stap voorstellen om te proberen.',
            correct: true,
            feedback: 'Zo bouw je vertrouwen op in behapbare stappen.',
          },
          {
            label: 'Meteen volledige vrijheid geven om discussie te vermijden.',
            correct: false,
            feedback: 'Dan mis je de kans om samen op te bouwen.',
          },
        ],
      },
      {
        type: 'thuismissie',
        acties: [
          'Stel een kleine, tijdelijke stap voor in plaats van meteen nee of ja',
          'Bespreek samen waar zijn grens en die van jou vandaan komen',
        ],
      },
    ],
  },
  {
    id: '3.3',
    world: 3,
    cohort: 'oud',
    title: 'Als hij liegt over iets kleins',
    beats: [
      {
        type: 'haakje',
        body: 'Hij zegt dat hij bij een vriend was. Later blijkt dat niet te kloppen.',
      },
      {
        type: 'inzicht',
        body: 'Kleine leugens op deze leeftijd gaan vaker over het vermijden van een verwachte, felle reactie dan over een moreel probleem. Een omgeving waarin een eerlijk antwoord minder zwaar bestraft wordt dan de leugen zelf, maakt eerlijkheid op termijn waarschijnlijker.',
      },
      {
        type: 'spiegel',
        body: 'Reageer jij op een eerlijk maar vervelend antwoord milder dan op een leugen die uitkomt?',
      },
      {
        type: 'voorbeeld',
        fout: 'Je hebt tegen me gelogen, daar sta je nu voor!',
        beter: 'Fijn dat je dit nu eerlijk vertelt. Wat maakte dat je het eerst anders zei?',
      },
      {
        type: 'oefening',
        vraag: 'Je ontdekt een kleine leugen. Wat zou de beste aanpak zijn?',
        opties: [
          {
            label: 'Hem hard straffen voor het liegen.',
            correct: false,
            feedback: 'Dat maakt een volgende leugen waarschijnlijker, niet minder.',
          },
          {
            label: 'Vragen waarom hij dacht dat liegen nodig was.',
            correct: true,
            feedback: 'Zo kom je bij de reden zonder de eerlijkheid te bestraffen.',
          },
          {
            label: 'Doen alsof je het niet gemerkt hebt.',
            correct: false,
            feedback: 'Dan blijft het patroon onbesproken.',
          },
        ],
      },
      {
        type: 'thuismissie',
        acties: [
          'Vraag waarom hij dacht dat een leugen nodig was, zonder meteen te straffen',
          'Laat een keer merken dat een eerlijk antwoord milder wordt ontvangen dan gedacht',
        ],
      },
    ],
  },
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
