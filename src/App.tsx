import { useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { AppShell } from './components/AppShell'
import { BottomNav } from './components/BottomNav'
import { AppMenu } from './components/AppMenu'
import { AppStateProvider, useAppState } from './state/AppStateContext'
import { Splash } from './screens/Splash'
import { PinScreen } from './screens/PinScreen'
import { OnboardingFlow } from './screens/onboarding/OnboardingFlow'
import { Home } from './screens/Home'
import { Kompas } from './screens/Kompas'
import { ProbeerDitEens } from './screens/ProbeerDitEens'
import { Ik } from './screens/Ik'
import { Instellingen } from './screens/Instellingen'
import { OverFatherFlow } from './screens/OverFatherFlow'
import { Specialisten } from './screens/Specialisten'
import { Les } from './screens/Les'

function TabLayout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Menu"
        className="absolute right-4 top-4 z-40 flex size-10 items-center justify-center rounded-full bg-surface/90 text-ink shadow-md ring-1 ring-surface-sunken backdrop-blur transition"
      >
        <Menu size={18} strokeWidth={2} />
      </button>
      {menuOpen && <AppMenu onClose={() => setMenuOpen(false)} />}
      <div key={location.pathname} className="animate-dissolve flex-1 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}

function AppRoutes() {
  const { pinVerified, onboardingComplete } = useAppState()
  const [showSplash, setShowSplash] = useState(true)

  if (showSplash) {
    return <Splash onDone={() => setShowSplash(false)} />
  }

  if (!pinVerified) {
    return <PinScreen onSuccess={() => {}} />
  }

  if (!onboardingComplete) {
    return (
      <div className="force-dark flex h-full flex-col overflow-hidden bg-page">
        <OnboardingFlow />
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/les/:id" element={<Les />} />
      <Route path="/instellingen" element={<Instellingen />} />
      <Route path="/over" element={<OverFatherFlow />} />
      <Route path="/specialisten" element={<Specialisten />} />
      <Route element={<TabLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/kompas" element={<Kompas />} />
        <Route path="/probeer-dit-eens" element={<ProbeerDitEens />} />
        <Route path="/ik" element={<Ik />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </AppStateProvider>
    </BrowserRouter>
  )
}

export default App
