import { NavLink } from 'react-router-dom'
import { Home, TreeDeciduous, Compass, MessageCircleQuestion, User } from 'lucide-react'
import type { ComponentType } from 'react'

interface Tab {
  to: string
  label: string
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
}

const tabs: Tab[] = [
  { to: '/', label: 'Vandaag', icon: Home },
  { to: '/leerboom', label: 'Leerboom', icon: TreeDeciduous },
  { to: '/kompas', label: 'Kompas', icon: Compass },
  { to: '/vraag-het', label: 'Vraag het', icon: MessageCircleQuestion },
  { to: '/ik', label: 'Ik', icon: User },
]

export function BottomNav() {
  return (
    <nav
      aria-label="Hoofdnavigatie"
      className="flex shrink-0 items-stretch justify-between border-t border-neutral-100 bg-neutral-white px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2"
    >
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-center transition ${
              isActive ? 'text-primary-600' : 'text-neutral-400'
            }`
          }
        >
          <Icon size={22} strokeWidth={2} />
          <span className="truncate text-caption">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
