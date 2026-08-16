#!/usr/bin/env node
/**
 * Genereert de afgeleide bestanden uit content/.
 *
 * api/ask.ts moet volledig self-contained blijven (geen relatieve imports; dat
 * is een harde eis van de Vercel-serverroute), dus injecteren we de
 * systeemprompt en de vangrailpatronen erin tussen markers in plaats van ze te
 * importeren. Datzelfde script schrijft server/systemPrompt.ts, zodat er
 * werkelijk maar één bron is en de kopieën niet uit elkaar kunnen lopen.
 *
 * Draait automatisch via predev en prebuild. Met --check schrijft het niets en
 * faalt het met exitcode 1 zodra een gegenereerd blok afwijkt van de bron; zo
 * loopt de build stuk in plaats van dat iemand het handmatig moet controleren.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const checkOnly = process.argv.includes('--check')

const systemPrompt = readFileSync(join(root, 'content/system-prompt.md'), 'utf8')
const guardrail = JSON.parse(readFileSync(join(root, 'content/guardrail-patterns.json'), 'utf8'))

/** Backticks en ${ } moeten ontsnapt worden, anders breekt de template literal. */
function asTemplateLiteral(text) {
  return '`' + text.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`'
}

const promptBlock = `const DEFAULT_SYSTEM_PROMPT = ${asTemplateLiteral(systemPrompt)}`

const guardrailBlock = [
  `const GUARDRAIL_PATTERNS: { id: string; regex: string }[] = ${JSON.stringify(
    guardrail.patterns.map((p) => ({ id: p.id, regex: p.regex })),
    null,
    2,
  )}`,
  '',
  `const REFERRAL_TEXT = ${JSON.stringify(guardrail.referralText)}`,
  '',
  'function triggersGuardrail(input: string): boolean {',
  '  const normalized = input.toLowerCase()',
  '  return GUARDRAIL_PATTERNS.some(({ regex }) => new RegExp(regex, "i").test(normalized))',
  '}',
  '',
  'function matchedGuardrailPattern(input: string): string | null {',
  '  const normalized = input.toLowerCase()',
  '  const hit = GUARDRAIL_PATTERNS.find(({ regex }) => new RegExp(regex, "i").test(normalized))',
  '  return hit ? hit.id : null',
  '}',
].join('\n')

/**
 * De app-kant krijgt een gegenereerde .ts in plaats van een JSON-import: dat
 * scheelt gedoe met import-attributen en houdt de bron identiek aan wat de
 * serverroute gebruikt.
 */
const clientPatternsFile = [
  '// Gegenereerd uit content/guardrail-patterns.json door scripts/generate-api.mjs.',
  '// Niet met de hand aanpassen: "npm run verify:sources" laat de build falen',
  '// zodra dit bestand afwijkt van de bron.',
  '',
  `export const GUARDRAIL_PATTERNS: { id: string; regex: string }[] = ${JSON.stringify(
    guardrail.patterns.map((p) => ({ id: p.id, regex: p.regex })),
    null,
    2,
  )}`,
  '',
  `export const REFERRAL_TEXT = ${JSON.stringify(guardrail.referralText)}`,
  '',
  `export const SAFE_EXAMPLES: string[] = ${JSON.stringify(guardrail.safeExamples, null, 2)}`,
  '',
  `export const TRIGGER_EXAMPLES: string[] = ${JSON.stringify(guardrail.triggerExamples, null, 2)}`,
  '',
].join('\n')

const targets = [
  {
    file: 'api/ask.ts',
    blocks: [
      { name: 'SYSTEM_PROMPT', content: promptBlock },
      { name: 'GUARDRAIL', content: guardrailBlock },
    ],
  },
  {
    file: 'server/systemPrompt.ts',
    blocks: [
      { name: 'SYSTEM_PROMPT', content: `export const SYSTEM_PROMPT = ${asTemplateLiteral(systemPrompt)}` },
    ],
  },
  { file: 'src/lib/generated/guardrailPatterns.ts', whole: clientPatternsFile },
]

let failed = false

for (const { file, blocks, whole } of targets) {
  const path = join(root, file)

  // Volledig gegenereerde bestanden: vergelijk of schrijf de hele inhoud.
  if (whole !== undefined) {
    let current = null
    try {
      current = readFileSync(path, 'utf8')
    } catch {
      current = null
    }
    if (current === whole) {
      console.log(`= ${file} is al actueel`)
    } else if (checkOnly) {
      console.error(`✗ ${file} wijkt af van content/. Draai "npm run generate" en commit het resultaat.`)
      failed = true
    } else {
      writeFileSync(path, whole)
      console.log(`✓ ${file} bijgewerkt uit content/`)
    }
    continue
  }

  let source = readFileSync(path, 'utf8')
  const original = source

  for (const { name, content } of blocks ?? []) {
    const start = `// <<<GENERATED:${name}>>>`
    const end = `// <<<END:${name}>>>`
    const pattern = new RegExp(
      `${start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
    )
    if (!pattern.test(source)) {
      console.error(`✗ ${file}: markers voor ${name} ontbreken (${start} ... ${end})`)
      failed = true
      continue
    }
    source = source.replace(pattern, `${start}\n${content}\n${end}`)
  }

  if (source === original) {
    console.log(`= ${file} is al actueel`)
    continue
  }

  if (checkOnly) {
    console.error(`✗ ${file} wijkt af van content/. Draai "npm run generate" en commit het resultaat.`)
    failed = true
  } else {
    writeFileSync(path, source)
    console.log(`✓ ${file} bijgewerkt uit content/`)
  }
}

// Bouwslot voor taak 6: het dev-paneel mag nooit in een productiebuild zitten.
// Dit is de enige garantie die niet van iemands geheugen afhangt. VERCEL_ENV
// staat op 'production' of 'preview' en is het signaal dat er werkelijk toe
// doet; NODE_ENV vangt het geval dat er buiten Vercel om gebouwd wordt.
const isProductionBuild =
  process.env.VERCEL_ENV === 'production' ||
  (process.env.VERCEL_ENV === undefined && process.env.NODE_ENV === 'production')

if (process.env.VITE_DEV_TOOLS === 'true' && isProductionBuild) {
  console.error(
    '✗ VITE_DEV_TOOLS staat aan terwijl dit een productiebuild is. Zet de vlag uit;\n' +
      '  het dev-paneel hoort alleen in de preview-omgeving thuis.',
  )
  failed = true
}

if (failed) process.exit(1)
