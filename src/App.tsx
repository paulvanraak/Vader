import { useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { BottomNav } from './components/BottomNav'
import { AppStateProvider, useAppState } from './state/AppStateContext'
import { Splash } from './screens/Splash'
import { OnboardingFlow } from './screens/onboarding/OnboardingFlow'
import { Home } from './screens/Home'
import { Kompas } from './screens/Kompas'
import { AskScreen } from './screens/AskScreen'
import { ProbeerDitEens } from './screens/ProbeerDitEens'
import { Ik } from './screens/Ik'
import { Les } from './screens/Les'

function TabLayout() {
  const location = useLocation()
  return (
    <div className="flex h-full flex-col overflow-hidden">
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
        <Route path="/vraag-het" element={<AskScreen />} />
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
