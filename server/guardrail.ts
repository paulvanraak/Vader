/**
 * Signaalwoordenlijst voor de vangrail. Losstaand en makkelijk uitbreidbaar,
 * per de instructie in CLAUDE.md deel 7. Controle gebeurt server-side,
 * vóór elke aanroep van het model.
 */
export const SIGNAL_WORDS: string[] = [
  // Zelfbeschadiging / zelfdoding
  'zelfmoord',
  'zelfdoding',
  'zelfbeschadiging',
  'suicide',
  'ik wil dood',
  'ik ga dood',
  'niet meer wil leven',
  'geen zin meer om te leven',
  'mezelf iets aandoen',
  'snijden in mezelf',
  // Geweld / dreiging
  'geweld',
  'mishandeling',
  'mishandelen',
  'in elkaar slaan',
  'vermoorden',
  'ombrengen',
  'dood maken',
  'wapen',
  'mes erbij',
  'pistool',
  'bedreigd met',
  'concrete dreiging',
]

export function triggersGuardrail(input: string): boolean {
  const normalized = input.toLowerCase()
  return SIGNAL_WORDS.some((word) => normalized.includes(word))
}

export const REFERRAL_TEXT =
  'Dit klinkt zwaarder dan waar deze app voor bedoeld is, en je hoeft dit niet alleen op te lossen. Neem contact op met Veilig Thuis via 0800 2000, of met je huisarts. Bij direct gevaar bel 112.'
