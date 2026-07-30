import { useNavigate } from 'react-router-dom'
import { User, Settings, Info, Stethoscope, LogOut, X } from 'lucide-react'
import { useAppState } from '../state/AppStateContext'

interface AppMenuProps {
  onClose: () => void
}

export function AppMenu({ onClose }: AppMenuProps) {
  const navigate = useNavigate()
  const { logout } = useAppState()

  const items = [
    { label: 'Profiel', icon: User, onClick: () => navigate('/ik') },
    { label: 'Instellingen', icon: Settings, onClick: () => navigate('/instellingen') },
    { label: 'Over FatherFlow', icon: Info, onClick: () => navigate('/over') },
    { label: 'Specialisten', icon: Stethoscope, onClick: () => navigate('/specialisten') },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 p-4" onClick={onClose}>
      <div
        role="menu"
        aria-label="Menu"
        onClick={(e) => e.stopPropagation()}
        className="force-dark animate-dissolve mt-14 w-full max-w-[260px] overflow-hidden rounded-2xl bg-surface text-ink shadow-2xl"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-label font-bold text-ink-muted">Menu</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Sluiten"
            className="flex size-8 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>
        <div className="flex flex-col border-t border-surface-sunken">
          {items.map(({ label, icon: Icon, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                onClick()
                onClose()
              }}
              className="flex items-center gap-3 px-4 py-3 text-left text-body-lg text-ink transition hover:bg-surface-sunken"
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              logout()
              onClose()
            }}
            className="flex items-center gap-3 border-t border-surface-sunken px-4 py-3 text-left text-body-lg text-danger-500 transition hover:bg-surface-sunken"
          >
            <LogOut size={18} strokeWidth={2} />
            Log uit
          </button>
        </div>
      </div>
    </div>
  )
}
