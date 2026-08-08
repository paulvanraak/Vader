import { useNavigate } from 'react-router-dom'
import { User, Settings, Info, Stethoscope, LayoutGrid, LogOut, X, UserPlus, Compass } from 'lucide-react'
import { useAppState } from '../state/AppStateContext'

interface AppMenuProps {
  onClose: () => void
}

export function AppMenu({ onClose }: AppMenuProps) {
  const navigate = useNavigate()
  const { logout } = useAppState()

  const items = [
    { label: 'Profiel', icon: User, onClick: () => navigate('/ik') },
    { label: 'Kind toevoegen', icon: UserPlus, onClick: () => navigate('/kind-toevoegen') },
    { label: 'Kompas', icon: Compass, onClick: () => navigate('/kompas') },
    { label: 'Instellingen', icon: Settings, onClick: () => navigate('/instellingen') },
    { label: 'Over FatherFlow', icon: Info, onClick: () => navigate('/over') },
    { label: 'Specialisten', icon: Stethoscope, onClick: () => navigate('/specialisten') },
    { label: 'CMS', icon: LayoutGrid, onClick: () => navigate('/admin') },
  ]

  return (
    <div className="animate-dissolve fixed inset-0 z-50 flex flex-col bg-page">
      <div className="flex shrink-0 items-center justify-between px-5 pt-5">
        <p className="text-h3 font-bold text-ink">Menu</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Sluiten"
          className="flex size-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-sunken"
        >
          <X size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3 px-6">
        {items.map(({ label, icon: Icon, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              onClick()
              onClose()
            }}
            className="flex items-center gap-4 rounded-md bg-surface px-5 py-4 text-left text-body-lg font-semibold text-ink transition hover:bg-surface-sunken"
          >
            <Icon size={20} strokeWidth={2} />
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            logout()
            onClose()
          }}
          className="flex items-center gap-4 rounded-md bg-surface px-5 py-4 text-left text-body-lg font-semibold text-danger-500 transition hover:bg-surface-sunken"
        >
          <LogOut size={20} strokeWidth={2} />
          Log uit
        </button>
      </div>
    </div>
  )
}
