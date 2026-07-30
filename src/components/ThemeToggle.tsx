import { Sun, Moon } from 'lucide-react'
import { useAppState } from '../state/AppStateContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppState()

  return (
    <div className="flex items-center gap-1 rounded-md bg-surface-sunken p-1">
      <button
        type="button"
        onClick={() => theme !== 'light' && toggleTheme()}
        aria-pressed={theme === 'light'}
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-label transition ${
          theme === 'light' ? 'bg-surface text-ink shadow-xs' : 'text-ink-muted'
        }`}
      >
        <Sun size={16} strokeWidth={2} />
        Licht
      </button>
      <button
        type="button"
        onClick={() => theme !== 'dark' && toggleTheme()}
        aria-pressed={theme === 'dark'}
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-label transition ${
          theme === 'dark' ? 'bg-surface text-ink shadow-xs' : 'text-ink-muted'
        }`}
      >
        <Moon size={16} strokeWidth={2} />
        Donker
      </button>
    </div>
  )
}
