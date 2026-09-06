import { useEffect, useState } from 'react'
import { fetchAppConfig, updateAppConfig } from '../../lib/cms'

const CONFIG_KEY = 'chat_system_prompt'

export function AdminChatPrompt() {
  const [prompt, setPrompt] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  useEffect(() => {
    fetchAppConfig(CONFIG_KEY)
      .then(setPrompt)
      .catch((err) => setError(err instanceof Error ? err.message : 'Onbekende fout'))
  }, [])

  async function save() {
    if (prompt === null) return
    setSaving(true)
    try {
      await updateAppConfig(CONFIG_KEY, prompt)
      setSavedAt(Date.now())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-label text-ink-muted">CMS</p>
        <h1 className="text-h2 text-ink">Chat-prompt</h1>
        <p className="mt-1 text-body text-ink-muted">
          De instructie die het taalmodel gebruikt om vragen in "Vraag het" te beantwoorden.
        </p>
      </div>

      {error && <p className="text-body text-danger-500">{error}</p>}
      {prompt === null && !error && <p className="text-body text-ink-muted">Laden...</p>}

      {prompt !== null && (
        <div className="flex flex-col gap-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={16}
            className="w-full resize-y rounded-md bg-surface p-4 text-body text-ink shadow-sm ring-1 ring-surface-sunken outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => void save()}
              disabled={saving}
              className="rounded-md bg-primary-500 px-5 py-2.5 text-label font-bold text-neutral-white transition hover:bg-primary-600 disabled:opacity-50"
            >
              {saving ? 'Opslaan...' : 'Opslaan'}
            </button>
            {savedAt && Date.now() - savedAt < 3000 && (
              <span className="text-caption font-semibold text-success-500">Opgeslagen</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
