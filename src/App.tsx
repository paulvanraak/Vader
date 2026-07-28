import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { PhoneFrame } from './components/PhoneFrame'
import { BottomNav } from './components/BottomNav'
import { AppStateProvider, useAppState } from './state/AppStateContext'
import { OnboardingFlow } from './screens/onboarding/OnboardingFlow'
import { Home } from './screens/Home'
import { Leerboom } from './screens/Leerboom'
import { Kompas } from './screens/Kompas'
import { AskScreen } from './screens/AskScreen'
import { Ik } from './screens/Ik'
import { Les } from './screens/Les'

function TabLayout() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}

function AppRoutes() {
  const { onboardingComplete } = useAppState()

  if (!onboardingComplete) {
    return <OnboardingFlow />
  }

  return (
    <Routes>
      <Route path="/les/:id" element={<Les />} />
      <Route element={<TabLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/leerboom" element={<Leerboom />} />
        <Route path="/kompas" element={<Kompas />} />
        <Route path="/vraag-het" element={<AskScreen />} />
        <Route path="/ik" element={<Ik />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <PhoneFrame>
          <AppRoutes />
        </PhoneFrame>
      </AppStateProvider>
    </BrowserRouter>
  )
}

export default App
