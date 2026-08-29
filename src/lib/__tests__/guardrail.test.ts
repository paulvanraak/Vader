/**
 * Vangrailtest in twee richtingen. Draait in de build via "npm run test:guardrail".
 *
 * De tweede lijst is de belangrijkste. Onterecht afgaan is óók een fout, en het
 * is de fout die testvaders wegjaagt: "ik ben het zat" en "hij maakt me gek"
 * zijn gewone vadertaal, geen crisis. Zonder deze richting groeit de
 * signaalwoordenlijst vanzelf tot hij op alles afgaat.
 */
import { SAFE_EXAMPLES, TRIGGER_EXAMPLES } from '../generated/guardrailPatterns.ts'
import { triggersGuardrail, matchedGuardrailPattern } from '../guardrail'

let failures = 0

function expectTrigger(text: string) {
  if (!triggersGuardrail(text)) {
    console.error(`✗ had moeten afgaan, maar deed dat niet: "${text}"`)
    failures++
  }
}

function expectSafe(text: string) {
  const hit = matchedGuardrailPattern(text)
  if (hit) {
    console.error(`✗ ging onterecht af op patroon "${hit}": "${text}"`)
    failures++
  }
}

for (const text of TRIGGER_EXAMPLES) expectTrigger(text)
for (const text of SAFE_EXAMPLES) expectSafe(text)

// Regressie: 'geweld' als substring liet de vangrail ook op 'geweldig' afgaan.
expectSafe('dat ging geweldig')
expectSafe('wat een geweldige dag samen')
expectTrigger('er is geweld in huis')

// Regressie: samenstellingen moeten wél blijven afgaan.
expectTrigger('hij heeft zelfmoordgedachten')

const total = TRIGGER_EXAMPLES.length + SAFE_EXAMPLES.length + 4
if (failures > 0) {
  throw new Error(`${failures} van ${total} vangrailcontroles gefaald.`)
}
console.log(`✓ vangrail: ${total} controles geslaagd, in beide richtingen.`)
