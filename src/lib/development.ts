import type { ChildGender } from '../state/AppStateContext'

/**
 * Leeftijdsspecifieke ontwikkelingsprofielen, 8 t/m 16 jaar, per geslacht.
 *
 * Onderbouwing (kernbevindingen uit de literatuur):
 * - Puberteit start bij meisjes gemiddeld 8-13 jaar (eerste teken: borstknopjes),
 *   bij jongens 9-14 jaar (eerste teken: testikelgroei). Jongens lopen ongeveer
 *   twee jaar achter. Menarche gemiddeld ~13,0 jaar; stembreuk ~13,1 jaar;
 *   eerste zaadlozing ~13,4 jaar; Tanner-stadium 5 rond 15,6 (jongens) en
 *   15,8 (meisjes).  [Tanner staging / populatieonderzoek puberteitstiming]
 * - Het limbisch systeem (emotie, beloning) rijpt vanaf ~10-12 jaar, de
 *   prefrontale cortex (overzicht, rem) pas tot in de twintiger jaren: een
 *   ontwikkelingskloof van jaren, met verhoogde dopamine-activiteit als
 *   verklaring voor risicogedrag en verveling.  [adolescente hersenontwikkeling]
 * - Jongens scoren hoger op naar-buiten-gericht gedrag tussen ~6 en 9,7 jaar;
 *   meisjes hoger op naar-binnen-gerichte klachten vanaf ~10,4 jaar. Die
 *   sekseverschillen zijn het kleinst in contact met ouders en het grootst met
 *   leeftijdsgenoten — thuis is dus de plek waar het nog zichtbaar mag zijn.
 *   [meta-analyse emotie-expressie; CBCL-onderzoek]
 * - Ouder-kindconflict piekt in de vroege adolescentie (~11-13) en is normatief:
 *   het is het mechanisme waarmee grenzen en zeggenschap opnieuw onderhandeld
 *   worden. Zelfstandigheid maakt de grootste sprong tussen 13 en 15.
 * - Sensatiezoeken piekt rond 14-15; sensatiezoeken én groepsinvloed samen
 *   voorspellen risicogedrag sterker dan elk apart, met afnemend ouderlijk zicht
 *   als aanjager.
 * - Gevoeligheid voor de negatieve kant van sociale media kent verschillende
 *   vensters: meisjes 11-13, jongens 14-15.  [Orben e.a., Nature Communications]
 * - Vroeg rijpen vergroot bij meisjes het risico op somberheid, middelengebruik
 *   en lichaamsontevredenheid; laat rijpen geeft bij jongens ontevredenheid over
 *   het lichaam en meer kans op pesten.
 * - Vaderbetrokkenheid hangt bij zonen sterker samen met minder internaliserende
 *   én externaliserende klachten en met minder middelengebruik tot in de
 *   twintiger jaren; bij dochters met veerkracht en psychologische veiligheid.
 *   Vaders zijn gemiddeld méér betrokken bij zonen dan bij dochters.
 * - Jongens praten makkelijker naast elkaar (auto, sport, klussen, koken) dan
 *   tegenover elkaar; emotionele terughoudendheid is aangeleerd, niet aangeboren.
 */

export const MIN_PROFILE_AGE = 8
export const MAX_PROFILE_AGE = 16

/**
 * Ontwikkelingsfase voor het richten van content. Bewust vier fases in plaats
 * van negen losse leeftijden: de literatuur werkt in fases, en het verschil
 * tussen 11 en 12 is kleiner dan de spreiding bínnen één leeftijd.
 *
 * De grenzen liggen per geslacht anders, omdat meisjes de puberteit gemiddeld
 * ongeveer twee jaar eerder ingaan dan jongens. Een meisje van 11 en een jongen
 * van 13 zitten ontwikkelingspsychologisch vaak in dezelfde fase — dáárom is
 * één leeftijdsgrens voor beide geslachten altijd voor de één te vroeg en voor
 * de ander te laat.
 */
export type DevelopmentBand = 'kind' | 'vroeg' | 'midden' | 'laat'

const bandUpperBounds: Record<ChildGender, { kind: number; vroeg: number; midden: number }> = {
  dochter: { kind: 9, vroeg: 12, midden: 14 },
  zoon: { kind: 10, vroeg: 13, midden: 15 },
}

export function getDevelopmentBand(age: number, gender: ChildGender): DevelopmentBand {
  const b = bandUpperBounds[gender]
  if (age <= b.kind) return 'kind'
  if (age <= b.vroeg) return 'vroeg'
  if (age <= b.midden) return 'midden'
  return 'laat'
}

export const bandLabels: Record<DevelopmentBand, string> = {
  kind: 'Middenkindertijd',
  vroeg: 'Vroege puberteit',
  midden: 'Midden-puberteit',
  laat: 'Late adolescentie',
}

interface SharedStage {
  phase: string
  brain: string
  social: string
}

interface SexedStage {
  body: string
  atHome: string
  needs: string
  pitfall: string
}

export interface DevelopmentProfile extends SharedStage, SexedStage {
  age: number
  gender: ChildGender
}

const sharedByAge: Record<number, SharedStage> = {
  8: {
    phase: 'Middenkindertijd',
    brain: 'Denkt concreet en logisch over wat het direct ziet en meemaakt; abstracte "wat als"-redeneringen en gevolgen op termijn zijn nog moeilijk. Herkent complexere emoties als jaloezie, spanning en dankbaarheid, maar heeft nog woorden nodig om ze te benoemen.',
    social:
      'Sociale vergelijking komt op gang. Het opgeblazen zelfbeeld van de kleutertijd maakt plaats voor een realistischer — en daarmee kwetsbaarder — beeld van eigen sterke en zwakke kanten, gemeten aan klasgenoten.',
  },
  9: {
    phase: 'Middenkindertijd',
    brain: 'Ziet oorzaak en gevolg scherper en kan zichzelf al een beetje reguleren met zelfspraak of afleiding, maar valt onder stress terug op gedrag.',
    social:
      'Vriendschappen worden selectiever en zwaarwegender; erbij horen telt harder dan volwassenen meestal inschatten. Eerste ervaringen met uitsluiting en pesten.',
  },
  10: {
    phase: 'Late middenkindertijd, drempel van de puberteit',
    brain: 'Het limbisch systeem (emotie, beloning) begint sneller te rijpen dan de prefrontale cortex (overzicht, rem). Dat verschil groeit de komende jaren uit tot een kloof van jaren — daar komt impulsiviteit vandaan, niet uit onwil.',
    social: 'Wat vrienden vinden gaat zwaarder wegen. De eigen positie in de groep wordt scherp in de gaten gehouden.',
  },
  11: {
    phase: 'Vroege puberteit',
    brain: 'Beloningsgevoeligheid neemt toe door meer dopamine-activiteit, terwijl het remsysteem achterblijft. Sterke prikkels worden aantrekkelijker en verveling wordt slechter verdragen.',
    social:
      'Identiteitsvragen komen op: wie ben ik, waar hoor ik bij. Conflict met ouders neemt toe. Dat is normaal en zelfs functioneel: zo worden grenzen en zeggenschap opnieuw onderhandeld.',
  },
  12: {
    phase: 'Vroege puberteit',
    brain: 'Abstract denken komt op gang: redeneren over mogelijkheden, hypotheses en over hoe anderen naar hem of haar kijken. Dat laatste geeft een sterke zelfbewustheid, alsof iedereen constant meekijkt.',
    social:
      'Ouder-kindconflict piekt rond deze jaren. Meningsverschillen gaan zelden echt over het onderwerp en bijna altijd over zeggenschap.',
  },
  13: {
    phase: 'Midden-puberteit',
    brain: 'De prefrontale cortex rijpt gestaag door, maar is nog jaren van volgroeid. Goede afwegingen in rust, duidelijk slechtere onder spanning of in een groep.',
    social: 'De behoefte aan zelfstandigheid stijgt sterk; tussen 13 en 15 zit de grootste sprong. Privacy wordt belangrijk.',
  },
  14: {
    phase: 'Midden-puberteit',
    brain: 'Sensatiezoeken bereikt rond deze leeftijd zijn hoogtepunt terwijl overzicht en rem nog achterlopen. Dat verschil verklaart risicogedrag beter dan "hij denkt gewoon niet na".',
    social:
      'Groepsinvloed is op zijn sterkst. Sensatiezoeken en groepsdruk samen voorspellen risicogedrag veel sterker dan elk apart, met minder ouderlijk zicht als aanjager.',
  },
  15: {
    phase: 'Late puberteit',
    brain: 'Redeneren op bijna volwassen niveau is mogelijk in rustige omstandigheden; emotie en publiek halen dat niveau nog steeds omlaag.',
    social:
      'Zelfstandigheid is grotendeels opgebouwd en de relatie verschuift naar iets gelijkwaardigers. Ouders die daar niet in meebewegen, verliezen invloed.',
  },
  16: {
    phase: 'Late adolescentie',
    brain: 'Stabielere zelfregulatie en een reëler beeld van de langere termijn, al blijft de prefrontale cortex tot in de twintiger jaren rijpen.',
    social:
      'Toekomst, relaties en eigen waarden komen centraal te staan. Invloed loopt nu via vertrouwen en gesprek, niet meer via regels.',
  },
}

const sexedByAge: Record<ChildGender, Record<number, SexedStage>> = {
  zoon: {
    8: {
      body: 'Nog vóór de puberteit. Soms al bijnierrijping: lichaamsgeur en wat schaamhaar, zonder dat de echte puberteit begonnen is.',
      atHome:
        'Spanning komt eruit als gedrag in plaats van als woorden: druk, boos, clownesk of juist stil. Jongens laten op deze leeftijd meer naar-buiten-gericht gedrag zien dan meisjes.',
      needs: 'Dat je zijn gedrag leest als signaal in plaats van als karakter, en dat je veel sámen doet in plaats van tegenover hem te gaan zitten praten.',
      pitfall: 'Vragen "waarom deed je dat?". Hij weet het meestal echt niet — hij mist de woorden, niet de wil.',
    },
    9: {
      body: 'Meestal nog geen zichtbare puberteit, wel gestage groei en meer kracht.',
      atHome: 'Wil laten zien wat hij kan. Faalervaringen komen hard aan en worden weggelachen of boos weggeduwd.',
      needs: 'Erkenning voor inzet in plaats van resultaat, en ruimte om te verliezen zonder gezichtsverlies.',
      pitfall: 'Meteen corrigeren of het overnemen als iets hem niet lukt. Dat bevestigt precies waar hij bang voor is.',
    },
    10: {
      body: 'Bij een deel begint de puberteit nu: het eerste teken is groei van de testikels, meestal onopgemerkt. Gemiddeld start het rond 11-12, ongeveer twee jaar later dan bij meisjes.',
      atHome: 'Schommelt tussen kind en bijna-puber. Wil nog wel knuffelen, maar niet waar anderen bij zijn.',
      needs: 'Dat je zijn wisselende behoefte aan nabijheid volgt zonder er iets van te vinden.',
      pitfall: 'Plagen met "je bent toch geen klein jongetje meer". Hij is op dit moment allebei tegelijk.',
    },
    11: {
      body: 'Vaak de start van de puberteit: testikelgroei en begin van schaamhaar, de groeispurt moet nog komen. Klasgenoten, vooral meisjes, lopen zichtbaar voor.',
      atHome: 'Kortere lont, vaker de deur dicht. Ergernis is regelmatig schaamte of onzekerheid in vermomming.',
      needs: 'Rustige, voorspelbare grenzen én de boodschap dat hij er nog steeds helemaal bij hoort als hij uit zijn slof schiet.',
      pitfall: 'Terugvechten op toon in plaats van reageren op inhoud.',
    },
    12: {
      body: 'De groeispurt komt op gang, schouders worden breder, meer zweet en huidproblemen. De onderlinge verschillen in de klas zijn enorm en dat is een bron van stille onzekerheid.',
      atHome: 'Vergelijkt zich met wie verder is. Laat rijpen geeft ontevredenheid over het lichaam, vooral over spieren, en vergroot de kans op pesten.',
      needs: 'Feitelijke, ontspannen informatie dat iedereen zijn eigen tempo heeft — het liefst zijdelings, niet als groot gesprek.',
      pitfall: 'Wachten met "het gesprek" tot hij erom vraagt. Dat doet hij niet.',
    },
    13: {
      body: 'Stembreuk ligt gemiddeld rond 13 jaar, de eerste zaadlozing rond 13,5. Veel lichamelijke verandering in korte tijd.',
      atHome: 'Wil privacy en zeggenschap, hangt vaker op zijn kamer en praat eerder zijdelings dan tegenover je.',
      needs: 'Gesprekken naast elkaar in plaats van tegenover elkaar: in de auto, tijdens sport, klussen of koken. Dat verlaagt de drempel merkbaar.',
      pitfall: 'Frontale gesprekken met oogcontact aan tafel — precies de opstelling waarin hij dichtklapt.',
    },
    14: {
      body: 'Midden in de groeispurt, met veel slaapbehoefte en een verschoven bioritme: later moe, later wakker.',
      atHome: 'Vrienden wegen zwaarder dan jij. Rond 14-15 is hij het gevoeligst voor de negatieve kant van sociale media.',
      needs: 'Zicht houden zonder te controleren: weten waar hij is en met wie, terwijl je hem ruimte geeft. Afnemend ouderlijk zicht is een van de sterkste voorspellers van risicogedrag.',
      pitfall: 'Kiezen tussen alles loslaten of alles vastpakken. Het werkzame midden is warm blijven én blijven volgen.',
    },
    15: {
      body: 'Bijna volgroeid, al loopt de lengtegroei bij jongens langer door dan bij meisjes.',
      atHome: 'Onderhandelt scherp en heeft vaak gelijk. Trekt zich terug zodra hij zich als kind behandeld voelt.',
      needs: 'Echte zeggenschap over wat van hem is, en een vader die zijn eigen fouten hardop benoemt. Voordoen werkt bij jongens beter dan uitleggen.',
      pitfall: 'Gelijk willen krijgen. Je wint de discussie en verliest het gesprek.',
    },
    16: {
      body: 'Lichamelijk grotendeels volwassen; het laatste puberteitsstadium valt gemiddeld rond 15,5 jaar.',
      atHome: 'Eigen leven en eigen agenda. Contact is iets wat je actief moet organiseren.',
      needs: 'Aangesproken worden als bijna-volwassene, en een vader die beschikbaar blijft zonder te claimen. Betrokken vaders verlagen aantoonbaar het risico op middelengebruik, tot ver in de twintig.',
      pitfall: 'Denken dat hij je niet meer nodig heeft omdat hij er niet meer om vraagt.',
    },
  },
  dochter: {
    8: {
      body: 'Bij een deel van de meisjes begint de puberteit nu al: eerste borstontwikkeling vanaf 8 jaar valt binnen het normale bereik.',
      atHome: 'Vaak verbaal sterker dan jongens van dezelfde leeftijd. Verdriet en spanning worden eerder verteld, maar ook eerder naar binnen gekeerd.',
      needs: 'Dat je luistert zonder meteen op te lossen, en dat je haar lichaam neutraal bespreekbaar maakt vóórdat ze het verhaal van anderen krijgt.',
      pitfall: 'Het lichamelijke helemaal aan moeder overlaten. Juist een vader die er ontspannen over doet, haalt er schaamte af.',
    },
    9: {
      body: 'Voor veel meisjes de start van zichtbare puberteit: borstknopjes, en de groeispurt begint eerder dan bij jongens.',
      atHome: 'Kan heftig reageren op opmerkingen over uiterlijk, ook op goedbedoelde.',
      needs: 'Complimenten die niet over uiterlijk gaan, maar over wat ze doet, kiest en doorzet.',
      pitfall: 'Grappen over haar lichaam of kleding. Die blijven jaren hangen.',
    },
    10: {
      body: 'De puberteit is bij veel meisjes gaande. Vanaf ongeveer deze leeftijd laten meisjes gemiddeld meer naar-binnen-gerichte klachten zien dan jongens: piekeren, spanning, somberheid.',
      atHome: 'Meer stemmingswisselingen, en problemen worden vaker binnengehouden dan uitgeageerd.',
      needs: 'Dat je actief vraagt hoe het gaat, want ze laat het minder aan gedrag zien dan een jongen zou doen.',
      pitfall: 'Aannemen dat het goed gaat omdat er geen gedoe is.',
    },
    11: {
      body: 'Volop in de puberteit; de groeispurt piekt vaak rond deze leeftijd.',
      atHome: 'Rond 11-13 is ze het gevoeligst voor de negatieve kant van sociale media — eerder dus dan jongens.',
      needs: 'Gesprek over wat ze online ziet en wat dat met haar doet, zonder dat het een verhoor wordt. Vroeg rijpen vergroot het risico op somberheid en op optrekken met oudere kinderen.',
      pitfall: 'Sociale media alleen als tijdsprobleem behandelen in plaats van als sociaal-emotioneel probleem.',
    },
    12: {
      body: 'De menstruatie komt voor veel meisjes in zicht; gemiddeld rond 13 jaar, met een grote spreiding.',
      atHome: 'Sterk gericht op hoe ze overkomt; de zelfbewustheid is hoog.',
      needs: 'Een vader die niet ongemakkelijk wordt: praktisch, kalm en zonder plagen.',
      pitfall: 'Je terugtrekken uit ongemak. Zij leest dat als afwijzing van wie ze aan het worden is.',
    },
    13: {
      body: 'De menstruatie begint gemiddeld rond deze leeftijd; de lichamelijke ontwikkeling is grotendeels op gang.',
      atHome: 'Wil zelf beslissen over uiterlijk, tijd en vrienden. Conflicten gaan over zeggenschap, niet over het onderwerp.',
      needs: 'Zeggenschap teruggeven waar dat kan, en blijven vragen zonder te forceren.',
      pitfall: 'Regels stellen zonder uitleg. Op deze leeftijd kost dat direct vertrouwen.',
    },
    14: {
      body: 'De groei loopt richting eindlengte; lichamelijk vaak verder dan jongens uit dezelfde klas.',
      atHome: 'Vriendschappen zijn intens en kunnen even intens klappen. Sociale pijn is echte pijn.',
      needs: 'Serieus genomen worden in vriendschapsdrama, niet gerelativeerd.',
      pitfall: '"Dat waait wel over." Vaak waar, maar het helpt nooit op het moment zelf.',
    },
    15: {
      body: 'Lichamelijk grotendeels volgroeid; het laatste puberteitsstadium valt gemiddeld rond 15,5-16 jaar.',
      atHome: 'Meer eigen leven, minder vanzelfsprekend contact.',
      needs: 'Een vader die belangstelling blijft tonen zonder te sturen. Vaderbetrokkenheid hangt bij dochters samen met veerkracht en zelfvertrouwen.',
      pitfall: 'Minder investeren omdat het "vanzelf goed gaat". Vaders trekken zich bij dochters gemiddeld eerder terug dan bij zonen.',
    },
    16: {
      body: 'Lichamelijk volwassen.',
      atHome: 'Denkt na over toekomst, relaties en wie ze wil zijn.',
      needs: 'Gesprekken van gelijk aan gelijk, en de ervaring dat haar mening echt meetelt.',
      pitfall: 'Beschermen waar meedenken gevraagd wordt.',
    },
  },
}

function clampAge(age: number): number {
  if (!Number.isFinite(age)) return MIN_PROFILE_AGE
  return Math.min(MAX_PROFILE_AGE, Math.max(MIN_PROFILE_AGE, Math.round(age)))
}

export function getDevelopmentProfile(age: number, gender: ChildGender): DevelopmentProfile {
  const key = clampAge(age)
  return { age: key, gender, ...sharedByAge[key], ...sexedByAge[gender][key] }
}

/**
 * Compacte briefing die als context aan het chatmodel wordt meegegeven, zodat
 * advies klopt voor déze leeftijd en dit geslacht in plaats van voor "een puber".
 */
export function buildDevelopmentBrief(name: string, age: number, gender: ChildGender): string {
  const p = getDevelopmentProfile(age, gender)
  const kind = gender === 'zoon' ? 'jongen' : 'meisje'
  const outOfRange =
    age < MIN_PROFILE_AGE || age > MAX_PROFILE_AGE
      ? ` (${name} is ${age}; dit profiel is dat van ${p.age} jaar, het dichtstbijzijnde dat we hebben)`
      : ''

  return [
    `Ontwikkelingsprofiel van ${name}, ${p.age} jaar, ${kind}${outOfRange} — fase: ${p.phase}.`,
    `Lichamelijk: ${p.body}`,
    `Brein en denken: ${p.brain}`,
    `Sociaal-emotioneel: ${p.social}`,
    `Hoe dit thuis eruitziet: ${p.atHome}`,
    `Wat ${name} nu van ${gender === 'dochter' ? 'haar' : 'zijn'} vader nodig heeft: ${p.needs}`,
    `Veelgemaakte fout op deze leeftijd: ${p.pitfall}`,
  ].join('\n')
}
