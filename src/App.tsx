import { useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { BottomNav } from './components/BottomNav'
import { AppStateProvider, useAppState } from './state/AppStateContext'
import { ContentProvider } from './state/ContentContext'
import { Splash } from './screens/Splash'
import { PinScreen } from './screens/PinScreen'
import { OnboardingFlow } from './screens/onboarding/OnboardingFlow'
import { Home } from './screens/Home'
import { Kompas } from './screens/Kompas'
import { Chat } from './screens/Chat'
import { ProbeerDitEens } from './screens/ProbeerDitEens'
import { Ik } from './screens/Ik'
import { Instellingen } from './screens/Instellingen'
import { OverFatherFlow } from './screens/OverFatherFlow'
import { Specialisten } from './screens/Specialisten'
import { Les } from './screens/Les'
import { AdminLayout } from './screens/admin/AdminLayout'
import { AdminWorlds } from './screens/admin/AdminWorlds'
import { AdminWorldLessons } from './screens/admin/AdminWorldLessons'
import { AdminLessonEditor } from './screens/admin/AdminLessonEditor'
import { AdminSpecialists } from './screens/admin/AdminSpecialists'
import { AdminChatPrompt } from './screens/admin/AdminChatPrompt'

function TabLayout() {
  const location = useLocation()
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <div key={location.pathname} className="animate-dissolve flex-1 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}

function MainApp() {
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
        <Route path="/chat" element={<Chat />} />
        <Route path="/probeer-dit-eens" element={<ProbeerDitEens />} />
        <Route path="/ik" element={<Ik />} />
      </Route>
    </Routes>
  )
}

function AdminApp() {
  const { pinVerified } = useAppState()

  if (!pinVerified) {
    return <PinScreen onSuccess={() => {}} />
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminWorlds />} />
        <Route path="worlds/:worldId" element={<AdminWorldLessons />} />
        <Route path="lessons/:lessonId" element={<AdminLessonEditor />} />
        <Route path="specialisten" element={<AdminSpecialists />} />
        <Route path="chat" element={<AdminChatPrompt />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <AppStateProvider>
          <Routes>
            <Route path="/admin/*" element={<AdminApp />} />
            <Route
              path="/*"
              element={
                <AppShell>
                  <MainApp />
                </AppShell>
              }
            />
          </Routes>
        </AppStateProvider>
      </ContentProvider>
    </BrowserRouter>
  )
}

export default App
