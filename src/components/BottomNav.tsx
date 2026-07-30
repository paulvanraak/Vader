import { NavLink } from 'react-router-dom'
import { Home, Compass, ListChecks } from 'lucide-react'
import type { ComponentType } from 'react'
import { getWorldStyle } from '../lib/worldStyles'
import { useAppState } from '../state/AppStateContext'

interface Tab {
  to: string
  label: string
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
}

const leftTab: Tab = { to: '/kompas', label: 'Kompas', icon: Compass }
const rightTab: Tab = { to: '/probeer-dit-eens', label: 'Checklist', icon: ListChecks }

function SideTab({ to, label, icon: Icon }: Tab) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-center transition ${
          isActive ? 'text-primary-600' : 'text-ink-faint'
        }`
      }
    >
      <Icon size={22} strokeWidth={2} />
      <span className="truncate text-caption">{label}</span>
    </NavLink>
  )
}

export function BottomNav() {
  const { path, todayLessonId } = useAppState()
  const todayLesson = path.find((l) => l.id === todayLessonId) ?? null
  const style = getWorldStyle(todayLesson?.world ?? 4)

  return (
    <nav
      aria-label="Hoofdnavigatie"
      className="relative z-30 flex shrink-0 items-end justify-between border-t border-surface-sunken bg-surface px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2"
    >
      <SideTab {...leftTab} />

      <NavLink to="/" end className="flex flex-1 flex-col items-center justify-center px-1 py-1.5 text-center">
        {({ isActive }) => (
          <span
            className={`-mt-7 flex size-16 items-center justify-center rounded-full text-neutral-white transition ${style.solidBg} ${style.edgeShadow} ${
              isActive ? 'ring-2 ring-surface' : ''
            }`}
          >
            <Home size={30} strokeWidth={2.5} />
          </span>
        )}
      </NavLink>

      <SideTab {...rightTab} />
    </nav>
  )
}
