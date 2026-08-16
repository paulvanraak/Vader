# FatherFlow

Mobiele webapp die vaders helpt hun kind stap voor stap beter te begrijpen, met
korte dagelijkse stappen in plaats van grote veranderingen ineens.

**Live:** https://vader-three.vercel.app/
**Stack:** React 19 · TypeScript · Vite 8 · Tailwind v4 · React Router v7 · Supabase · Claude API

---

## 1. Wat de app doet

Vier oppervlakken, elk met een eigen rol:

| Oppervlak | Rol |
|---|---|
| **Pad** | Vaste, samengestelde leerlijn: korte lessen gegroepeerd in thema's |
| **Chat** | Vrij gesprek met leeftijdsspecifiek advies over wat er nú speelt |
| **Checklist** | Concrete acties die uit de lessen komen, om vandaag te proberen |
| **Badges** | Mijlpalen, om terug te zien hoever je gekomen bent |

Het pad en de chat zijn met elkaar verbonden: als de chat merkt dat een
onderwerp zich leent voor een oefening, stelt hij voor die aan het pad toe te
voegen. De vader beslist.

---

## 2. Twee leerlussen

Het inhoudelijke model achter de app.

- **Lus A — het vaste pad.** Samengestelde lessen per thema, in vaste volgorde.
  Voorspelbaar, gecureerd, geschreven vooraf.
- **Lus B — de meebewegende laag.** Items die ontstaan uit gedrag: een
  *voor-jou-oefening* uit een chatgesprek, of een *reflectiemoment* nadat een
  checklist-actie is afgevinkt.

Beide lussen worden gerenderd als **één pad** met drie soorten knopen, niet als
losse schermen:

| Knoop | Vorm | Herkomst |
|---|---|---|
| Les | cirkel met nummer | Lus A (CMS) |
| Voor jou | cirkel met chatbubbel | Lus B (uit chat) |
| Reflectie | ruit | Lus B (na een actie) |

---

## 3. Lesstructuur

Elke les bestaat uit zes *beats*, altijd in dezelfde volgorde:

1. **Haakje** — herkenbaar scenario dat de les opent
2. **Inzicht** — het onderliggende principe (donker scherm, typemachine-effect)
3. **Spiegel** — vraag aan de vader over zijn eigen aandeel (donker scherm)
4. **In de praktijk** — een fout en een betere reactie, naast elkaar
5. **Oefening** — meerkeuzevraag met directe feedback
6. **Thuismissie** — één of twee acties die in de Checklist landen

De beats verschillen in hoe leeftijdsgevoelig ze zijn. Dat is de sleutel tot
het contentmodel in §5.

---

## 4. Leeftijd en geslacht

Het onderscheidende deel van de app: advies is afgestemd op de **exacte
leeftijd én het geslacht** van het kind, niet op één brede "puber"-categorie.

### 4.1 Ontwikkelingsprofielen

`src/lib/development.ts` bevat profielen voor **leeftijd 8 t/m 16, per
geslacht** (18 profielen). Elk profiel beschrijft:

- **Lichamelijk** — wat er fysiek speelt
- **Brein en denken** — cognitieve en neurologische ontwikkeling
- **Sociaal-emotioneel** — de sociale wereld
- **Hoe dit thuis eruitziet** — het waarneembare gedrag
- **Wat het kind nodig heeft** — van zijn of haar vader specifiek
- **Veelgemaakte fout** — waar vaders op deze leeftijd de mist in gaan

Gedeeld-per-leeftijd materiaal (brein, sociaal) staat los van
geslachtsspecifiek materiaal (lichaam, thuis, behoefte, valkuil), omdat de
breinbevindingen op dit detailniveau niet wezenlijk per geslacht verschillen.

### 4.2 Onderbouwing

De profielen zijn gebaseerd op onderzoek, niet op aannames. Kernpunten:

- **Puberteitstiming verschilt sterk.** Meisjes starten gemiddeld 8–13 jaar
  (eerste teken: borstknopjes), jongens 9–14 (eerste teken: testikelgroei) —
  ongeveer twee jaar later. Menarche ~13,0; stembreuk ~13,1; eerste zaadlozing
  ~13,4; Tanner-stadium 5 rond 15,6 (jongens) en 15,8 (meisjes).
- **De limbisch/prefrontale kloof.** Emotie- en beloningscircuits rijpen vanaf
  ~10–12 jaar, de prefrontale cortex pas tot in de twintiger jaren. Die kloof
  van jaren, plus verhoogde dopaminegevoeligheid, verklaart impulsiviteit beter
  dan "hij denkt niet na".
- **Jongens en meisjes uiten spanning anders, en het kantelt.** Jongens hoger
  op naar-buiten-gericht gedrag tot ~9,7 jaar; meisjes hoger op naar-binnen
  gerichte klachten vanaf ~10,4 jaar. Cruciaal: die verschillen zijn het
  *kleinst in contact met ouders* — thuis is dus waar een jongen het nog laat
  zien, en een stil meisje is niet automatisch in orde.
- **Conflict piekt vroeg (11–13); zelfstandigheid springt het hardst 13–15.**
  Conflict is daar normatief: zo wordt zeggenschap opnieuw onderhandeld.
- **Sensatiezoeken piekt ~14–15** en versterkt elkaar met groepsinvloed;
  afnemend ouderlijk zicht is een sleutelmediator.
- **Sociale media kent aparte gevoelige vensters per geslacht:** meisjes 11–13,
  jongens 14–15.
- **Rijpingstiming snijdt twee kanten op:** vroeg rijpende meisjes lopen meer
  risico op somberheid en lichaamsontevredenheid; laat rijpende jongens op
  lichaamsontevredenheid en pesten.
- **Vaderbetrokkenheid werkt anders per geslacht:** bij zonen sterkste verband
  met internaliserende én externaliserende klachten en later middelengebruik;
  bij dochters met veerkracht en psychologische veiligheid — en vaders trekken
  zich statistisch eerder terug bij dochters.
- **Jongens praten makkelijker naast elkaar** (auto, sport, koken) dan
  tegenover elkaar; emotionele terughoudendheid is aangeleerd, niet aangeboren.

### 4.3 Ontwikkelingsfases (bands)

Voor het richten van content werkt de app met **vier fases**, niet met negen
losse leeftijden. De spreiding *binnen* één leeftijd is groter dan het verschil
*tussen* twee opeenvolgende leeftijden, en de literatuur werkt zelf in fases.

De grenzen liggen **per geslacht anders**:

| Fase | Dochter | Zoon |
|---|---|---|
| `kind` — middenkindertijd | 8–9 | 8–10 |
| `vroeg` — vroege puberteit | 10–12 | 11–13 |
| `midden` — midden-puberteit | 13–14 | 14–15 |
| `laat` — late adolescentie | 15–16 | 16 |

Een meisje van 11 en een jongen van 13 zitten in dezelfde fase. Daarom is
**één gedeelde leeftijdsgrens altijd voor de één te vroeg en voor de ander te
laat**. Dat is de kern van het hele model.

### 4.4 Waar het doorwerkt

- **Chat** — bouwt een compacte briefing uit het profiel en stuurt die mee met
  elk verzoek. Het model redeneert vanuit die fase, maar noemt geen
  leeftijdsgemiddelden of onderzoekstermen, en volgt de beschrijving van de
  vader als zijn kind eerder of later is dan gemiddeld.
- **Pad** — `deriveAgeGroup()` past de geslachtsverschuiving toe op de huidige
  twee contentcohorten: dochters gaan over op 11, zonen op 13, in plaats van
  iedereen op 12.

---

## 5. Contentmodel

### 5.1 Personalisatie-tokens

Lescontent wordt geschreven met tokens in plaats van vaste voornaamwoorden,
zodat één tekst klopt voor een zoon én voor een dochter:

| Token | Zoon | Dochter |
|---|---|---|
| `{naam}` | de naam van het kind | idem |
| `{naam_bezit}` | bezitsvorm van de naam | idem |
| `{hij}` / `{Hij}` | hij / Hij | zij / Zij |
| `{hem}` / `{Hem}` | hem / Hem | haar / Haar |
| `{zijn}` / `{Zijn}` | zijn / Zijn | haar / Haar |
| `{kind}` / `{Kind}` | zoon / Zoon | dochter / Dochter |

Hoofdletterversies bestaan voor zinsbegin. Vervanging gebeurt in
`src/lib/personalize.ts`, vlak voor het renderen.

> **Let op bij het schrijven van content:** in het Nederlands is *zijn* zowel
> het bezittelijk voornaamwoord als het werkwoord. Alleen het bezittelijke
> gebruik wordt getokeniseerd. "Dat kan lastig **zijn**" blijft ongewijzigd.

### 5.2 Wat wel en niet per leeftijd varieert

| Beat | Varieert per fase? | Waarom |
|---|---|---|
| Haakje | **Altijd** | Het concrete scenario is de hele functie |
| In de praktijk | **Altijd** | Letterlijke dialoog — 8 en 15 verschillen volledig |
| Thuismissie | **Altijd** | Wat je doet verschilt volledig |
| Oefening | Meestal | Zit vast aan het scenario |
| Inzicht | **Zelden** | "Boosheid is vaak schaamte" klopt op 8 én op 16 |
| Spiegel | **Zelden** | Gericht op de vader, niet op het kind |

Dus: **schrijf het principe één keer, varieer het concrete.** Dat verlaagt de
marginale kosten per fase van zes beats naar ongeveer vier.

### 5.3 Waarom niet per jaar

| Aanpak | Lesvarianten | Oordeel |
|---|---|---|
| Per jaar × geslacht | 324 | Niet haalbaar |
| 4 fases × geslacht, volledig gedupliceerd | 144 | Verspilling — dupliceert leeftijdsonafhankelijke principes |
| **4 fases + tokens + gelaagde varianten** | **~72 + ~14 geslachtsspecifiek** | **Aanbevolen** |

Tokens maken de geslachtsdimensie goedkoop: aparte content is alleen nodig waar
het *lichaam* verschilt (menstruatie, zaadlozing, spiermassa) — grofweg 20% van
de lessen, niet 100%.

---

## 6. Datamodel (Supabase)

**Content (publiek leesbaar, bewerkt via `/admin`)**

| Tabel | Inhoud |
|---|---|
| `worlds` | Thema's, met accentkleuren |
| `lessons` | Lessen, gekoppeld aan een wereld en een cohort |
| `beats` | De zes beats per les |
| `oefening_opties` | Antwoordopties met feedback |
| `thuismissie_acties` | Acties die in de Checklist landen |
| `compass_entries` | Achtergrondtekst per thema, voor het Kompas |
| `specialists` | Fictief expertpanel |
| `app_config` | O.a. de chat-systeemprompt |

**Gebruikersdata (RLS: `auth.uid() = user_id`, of via `children`)**

| Tabel | Inhoud |
|---|---|
| `children` | Naam, geslacht, geboortedatum, voortgang |
| `chat_threads` | Gesprekken, vastzetbaar en herordenbaar |
| `path_items` | Voor-jou- en reflectie-items (lus B) |
| `action_completions` | Wanneer een actie is afgevinkt — voedt de streak |
| `earned_badges` | Behaalde mijlpalen |

---

## 7. Chat-architectuur

De systeemprompt bestaat op **drie plekken die identiek moeten blijven**:

1. `api/ask.ts` — `DEFAULT_SYSTEM_PROMPT` (fallback)
2. `server/systemPrompt.ts` — lokale ontwikkeling
3. Supabase `app_config.chat_system_prompt` — de bron die in productie wint

> `api/ask.ts` moet **volledig self-contained** blijven: geen relatieve imports.
> Dat is een harde eis van de Vercel-serverroute. Daarom wordt de
> ontwikkelingsbriefing client-side gebouwd en meegestuurd, niet geïmporteerd.

**Gedragsregels in de prompt:**
- Antwoorden zijn kort en worden gesplitst in 2–3 losse berichten met `|||`,
  zodat het als appjes leest in plaats van als een essay.
- Een padsuggestie komt als allerlaatste deel, in het formaat
  `SUGGESTIE: Titel|Omschrijving`, dat de client eruit knipt en als kaart toont.
- Een vangrail draait **client-side, vóór** er een model wordt aangeroepen, en
  verwijst bij crisissignalen direct door. Die werkt dus ook zonder serverroute.

---

## 8. Vormgeving

Redactioneel fintech-palet: crème ondergrond, inktzwart, en platte verzadigde
accenten per thema (oranje, roze-lila, olijf, blauw, geel).

- **Typografie** — Inter voor koppen en cijfers, Manrope voor UI-tekst
- **Uitlijning** — alles links uitgelijnd. Twee bewuste uitzonderingen:
  chatbubbels van de vader (rechts, universele chatconventie) en badge-tegels
  (gecentreerd, leest beter in een raster)
- **Knoppen** — massief zwarte pillen, geen slagschaduwen
- **Beweging** — `stack-in` laat elementen na elkaar binnenkomen in de
  onboarding; `dissolve` tussen schermen; alles respecteert
  `prefers-reduced-motion`
- **Haptiek** — `src/lib/haptics.ts`, met feature-detectie. Werkt op Android;
  iOS Safari heeft de Vibration API nooit geïmplementeerd, daar is het een
  stille no-op

**Uitleg per feature** — bij het eerste bezoek aan een oppervlak verschijnt een
kleine, doorschijnende tooltip onderin (glaseffect, achtergrond blijft zichtbaar
en bedienbaar). Wegklikken kan met "Ik begrijp het" of door ernaast te tikken.
Onthouden per feature in `localStorage`.

---

## 9. Belangrijke bestanden

```
src/lib/development.ts      Ontwikkelingsprofielen 8-16 × geslacht, fases
src/lib/personalize.ts      Token-vervanging (naam + voornaamwoorden)
src/lib/age.ts              Leeftijdsberekening, cohortgrens per geslacht
src/lib/badges.ts           Badgecatalogus en toekenning
src/lib/guardrail.ts        Crisisdetectie, client-side
src/lib/featureExplainers.ts Uitlegteksten per feature
api/ask.ts                  Chat-serverroute (self-contained!)
server/systemPrompt.ts      Kopie van de prompt voor lokale ontwikkeling
src/state/AppStateContext   Sessie, kinderen, voortgang, paditems
src/state/ContentContext    CMS-content, met realtime sync
```

---

## 10. Ontwikkelen

```bash
npm run dev        # dev server op :5173
npx tsc --noEmit   # typecheck
npm run build      # productiebuild
```

**Deploy** — Vercel, met `main` als productiebranch. Werk op een feature-branch
en merge naar `main`; beide worden gepusht.

**Bij het wijzigen van de systeemprompt** — pas alle drie de kopieën aan en
controleer dat ze byte-identiek zijn:

```bash
python3 -c "
import re
a=open('api/ask.ts').read(); b=open('server/systemPrompt.ts').read()
g=lambda s: re.search(r'SYSTEM_PROMPT\s*=\s*\`(.*?)\`', s, re.S).group(1)
print('identiek:', g(a)==g(b), len(g(a)))"
```

---

## 11. Status en vervolg

**Klaar**

- Volledig pad, chat, checklist, badges, kompas
- CMS op `/admin` met realtime sync naar de app
- Echte accounts en persistentie (Supabase Auth + RLS)
- Leeftijds- en geslachtsspecifiek advies in de chat (8–16, 18 profielen)
- Fasemodel met geslachtsverschuiving; cohortgrens gecorrigeerd
- Alle lescontent getokeniseerd — **het pad werkt nu voor zonen én dochters**

**Volgende stappen**

1. **Splits `oud`** (nu 13–18, veel te breed) in `midden` en `laat`. Grootste
   kwaliteitswinst voor ~18 nieuwe lesinstanties. Vereist
   `lessons.cohort` → `lessons.band`, plus een nullable `lessons.gender`
   (null = beide), en aanpassing van de CMS-editor.
2. **Volledige vier fases** plus de ~14 geslachtsspecifieke lichaamslessen.
3. **Wereld "Dopamine & Aandacht"** (5 lessen), gebaseerd op het vijfstappen-
   raamwerk: waarden herontdekken, grenzen stellen, vervangen in plaats van
   verbieden, triggers wegnemen, vieren.

**Tijdelijk, vóór livegang terugdraaien**

- Signup slaat e-mail en wachtwoord over en genereert wegwerp-inloggegevens
  (`SignupScreen.tsx`) — bedoeld om testen te versnellen. De echte `signUp()`
  is intact.
- E-mailbevestiging staat uit in Supabase; er is nog geen SMTP-provider.

> **Redactionele opmerking:** puberteits- en lichaamscontent voor dochters
> verdient inhoudelijke review voordat die naar echte vaders gaat. Een vader
> die leest over de eerste menstruatie van zijn dochter is een moment waarop
> toon zwaarder weegt dan correctheid.
