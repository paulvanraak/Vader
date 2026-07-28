# Vaderfiguur — klikbare demo

Een mobiele demo (React + TypeScript + Vite + Tailwind) die vaders helpt hun puberzoon te
begrijpen en weg te houden bij de manosfeer, in dagelijkse porties van drie minuten.

De designtokens (kleur, typografie, border radius, shadows) komen uit de Figma-styleguide
en zijn overgezet naar het Tailwind-thema in `src/index.css`.

## Draaien

```bash
npm install
npm run dev
```

Open de getoonde localhost-URL. De app rendert in een telefoonframe op ongeveer 390px breed.

## Vraag het (Claude API)

De adviesfunctie roept de Claude-API nooit rechtstreeks vanuit de client aan. In dev draait
een kleine Vite-middleware (`server/vitePlugin.ts` → `POST /api/ask`) die server-side de
vangrail checkt en daarna de Anthropic SDK aanroept. Voor een deploy op een platform als
Vercel staat `api/ask.ts` klaar als serverless-functie met dezelfde logica.

Zet lokaal een `.env` (zie `.env.example`):

```
ANTHROPIC_API_KEY=sk-ant-...
CLAUDE_MODEL=claude-sonnet-5
```

Zonder sleutel blijft de rest van de demo werken; "Vraag het" toont dan een nette foutmelding
in plaats van een antwoord (de vangrail zelf werkt altijd, ook zonder sleutel).

## Structuur

- `src/data/lessons.ts` — de drie lessen van Wereld 6 als data (`Lesson`/`Beat`-model).
- `src/components/beats/` — de zeven beat-presentatiecomponenten, met `Spiegel.tsx` als het
  vaste, herkenbare handtekeningmoment.
- `src/components/LessonPlayer.tsx` — speelt de beats van een les na elkaar af.
- `src/screens/` — onboarding, Vandaag, Leerboom, Kompas, Vraag het, Ik.
- `server/` — systeeminstructie, vangrail (signaalwoorden) en de Claude-aanroep.

Staat (streak, voltooide lessen, band) leeft alleen in het geheugen van de sessie, zoals
bedoeld voor deze demo.
