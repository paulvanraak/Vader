import { NavLink } from 'react-router-dom'
import { Home, Compass, MessageCircleQuestion, ListChecks, User } from 'lucide-react'
import type { ComponentType } from 'react'

interface Tab {
  to: string
  label: string
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
}

const sideTabs: Tab[] = [
  { to: '/kompas', label: 'Kompas', icon: Compass },
  { to: '/vraag-het', label: 'Vraag het', icon: MessageCircleQuestion },
]

const rightTabs: Tab[] = [
  { to: '/probeer-dit-eens', label: 'Probeer', icon: ListChecks },
  { to: '/ik', label: 'Ik', icon: User },
]

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
  return (
    <nav
      aria-label="Hoofdnavigatie"
      className="relative z-30 flex shrink-0 items-end justify-between border-t border-surface-sunken bg-surface px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2"
    >
      {sideTabs.map((tab) => (
        <SideTab key={tab.to} {...tab} />
      ))}

      <NavLink to="/" end className="flex flex-1 flex-col items-center justify-center px-1 py-1.5 text-center">
        {({ isActive }) => (
          <span
            className={`-mt-6 flex size-14 items-center justify-center rounded-full bg-primary-500 text-neutral-white shadow-[0_4px_0_0_var(--color-primary-700)] transition ${
              isActive ? 'ring-2 ring-primary-300' : ''
            }`}
          >
            <Home size={28} strokeWidth={2.5} />
          </span>
        )}
      </NavLink>

      {rightTabs.map((tab) => (
        <SideTab key={tab.to} {...tab} />
      ))}
    </nav>
  )
}
