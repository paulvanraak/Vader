import { NavLink, Outlet } from 'react-router-dom'
import { Compass, Stethoscope, MessageCircle, Smartphone } from 'lucide-react'

const navItems = [
  { to: '/admin', label: 'Werelden & lessen', icon: Compass, end: true },
  { to: '/admin/specialisten', label: 'Specialisten', icon: Stethoscope, end: false },
  { to: '/admin/chat', label: 'Chat-prompt', icon: MessageCircle, end: false },
]

export function AdminLayout() {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-page text-ink md:flex-row">
      <nav className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-surface-sunken bg-surface px-4 py-3 md:w-60 md:flex-col md:items-stretch md:gap-2 md:border-b-0 md:border-r md:px-4 md:py-6">
        <p className="hidden px-2 pb-2 text-label font-bold text-ink md:block">FatherFlow CMS</p>
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-body font-semibold transition ${
                isActive ? 'bg-primary-500/10 text-primary-600' : 'text-ink-muted hover:bg-surface-sunken'
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            <span className="whitespace-nowrap">{label}</span>
          </NavLink>
        ))}
        <a
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-body text-ink-muted hover:bg-surface-sunken md:mt-auto"
        >
          <Smartphone size={18} strokeWidth={2} />
          <span className="whitespace-nowrap">Naar de app</span>
        </a>
      </nav>
      <div className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl px-5 py-6 md:px-8 md:py-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
