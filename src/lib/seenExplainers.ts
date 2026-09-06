const STORAGE_KEY = 'fatherflow_seen_explainers'

function readSeen(): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

export function hasSeenExplainer(id: string): boolean {
  return readSeen().has(id)
}

export function markExplainerSeen(id: string): void {
  const seen = readSeen()
  seen.add(id)
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen]))
  } catch {
    // Privé-browsen of volle opslag: negeren, dan verschijnt de uitleg gewoon nog eens.
  }
}
