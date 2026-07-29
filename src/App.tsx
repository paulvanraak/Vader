import { useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation, NavLink } from 'react-router-dom'
import { User } from 'lucide-react'
import { AppShell } from './components/AppShell'
import { BottomNav } from './components/BottomNav'
import { AppStateProvider, useAppState } from './state/AppStateContext'
import { Splash } from './screens/Splash'
import { OnboardingFlow } from './screens/onboarding/OnboardingFlow'
import { Home } from './screens/Home'
import { Kompas } from './screens/Kompas'
import { ProbeerDitEens } from './screens/ProbeerDitEens'
import { Ik } from './screens/Ik'
import { Les } from './screens/Les'

function TabLayout() {
  const location = useLocation()
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <NavLink
        to="/ik"
        aria-label="Jouw profiel"
        className={({ isActive }) =>
          `absolute right-4 top-4 z-40 flex size-10 items-center justify-center rounded-full bg-surface/90 text-ink shadow-md ring-1 ring-surface-sunken backdrop-blur transition ${
            isActive ? 'ring-2 ring-primary-500' : ''
          }`
        }
      >
        <User size={18} strokeWidth={2} />
      </NavLink>
      <div key={location.pathname} className="animate-dissolve flex-1 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}

function AppRoutes() {
  const { onboardingComplete } = useAppState()
  const [showSplash, setShowSplash] = useState(true)

  if (showSplash) {
    return <Splash onDone={() => setShowSplash(false)} />
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
