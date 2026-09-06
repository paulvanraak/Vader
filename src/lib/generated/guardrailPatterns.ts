// Gegenereerd uit content/guardrail-patterns.json door scripts/generate-api.mjs.
// Niet met de hand aanpassen: "npm run verify:sources" laat de build falen
// zodra dit bestand afwijkt van de bron.

export const GUARDRAIL_PATTERNS: { id: string; regex: string }[] = [
  {
    "id": "zelfmoord",
    "regex": "\\bzelfmoord\\w*"
  },
  {
    "id": "zelfdoding",
    "regex": "\\bzelfdoding\\w*"
  },
  {
    "id": "suicide",
    "regex": "\\bsuicid\\w*"
  },
  {
    "id": "zelfbeschadiging",
    "regex": "\\bzelfbeschadig\\w*"
  },
  {
    "id": "automutilatie",
    "regex": "\\bautomutilat\\w*"
  },
  {
    "id": "dood-willen",
    "regex": "\\bik wil (niet meer leven|dood)\\b"
  },
  {
    "id": "niet-meer-leven",
    "regex": "\\b(niet meer wil(len)? leven|geen zin meer om te leven|er niet meer wil(len)? zijn)\\b"
  },
  {
    "id": "eind-maken",
    "regex": "\\ber een eind aan maken\\b"
  },
  {
    "id": "zichzelf-iets-aandoen",
    "regex": "\\b(mezelf|zichzelf|zich) iets aan(doen|gedaan)\\b"
  },
  {
    "id": "snijden",
    "regex": "\\bsnijd\\w* in (mezelf|zichzelf|zijn arm|haar arm|zijn armen|haar armen)\\b"
  },
  {
    "id": "geweld",
    "regex": "\\bgeweld(?!ig)\\w*"
  },
  {
    "id": "mishandeling",
    "regex": "\\bmishandel\\w*"
  },
  {
    "id": "misbruik",
    "regex": "\\b(seksueel misbruik|misbruikt door)\\b"
  },
  {
    "id": "in-elkaar-slaan",
    "regex": "\\bin elkaar (slaan|geslagen|geschopt)\\b"
  },
  {
    "id": "vermoorden",
    "regex": "\\bvermoord\\w*"
  },
  {
    "id": "ombrengen",
    "regex": "\\bombrengen\\b"
  },
  {
    "id": "dood-maken",
    "regex": "\\b(dood ?maken|van kant maken)\\b"
  },
  {
    "id": "wapen",
    "regex": "\\b(wapen|wapens|pistool|vuurwapen)\\b"
  },
  {
    "id": "mes-dreiging",
    "regex": "\\b(mes erbij|met een mes bedreig\\w*|trok een mes)\\b"
  },
  {
    "id": "bedreigd",
    "regex": "\\b(bedreigd met|concrete dreiging|doodsbedreiging\\w*)\\b"
  }
]

export const REFERRAL_TEXT = "Dit klinkt zwaarder dan waar deze app voor bedoeld is, en je hoeft dit niet alleen op te lossen. Neem contact op met Veilig Thuis via 0800 2000, of met je huisarts. Bij direct gevaar bel 112."

export const SAFE_EXAMPLES: string[] = [
  "dat ging geweldig",
  "hij is een geweldige jongen",
  "ze vond het geweldig op kamp",
  "ik ben het zat",
  "hij maakt me gek",
  "ik word er gek van",
  "ik heb het helemaal gehad vandaag",
  "hij drijft me tot wanhoop",
  "ik kan hem wel wurgen van frustratie, bij wijze van spreken",
  "we hadden weer eens ruzie",
  "hij sloeg de deur dicht",
  "ik was vandaag te streng tegen hem",
  "hij zit de hele dag te gamen",
  "hij vertelt me niets meer",
  "ik voel me machteloos"
]

export const TRIGGER_EXAMPLES: string[] = [
  "hij zegt dat hij niet meer wil leven",
  "ik denk dat mijn zoon aan zelfmoord denkt",
  "ze heeft het over zelfdoding",
  "hij snijdt in zichzelf",
  "hij wil zichzelf iets aandoen",
  "er is geweld thuis",
  "mijn ex mishandelt hem",
  "hij werd in elkaar geslagen op school",
  "hij is bedreigd met een mes",
  "er ligt een wapen in huis",
  "hij zegt dat hij zijn broer wil vermoorden"
]
