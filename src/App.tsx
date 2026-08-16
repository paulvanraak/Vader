import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { BottomNav } from './components/BottomNav'
import { AppStateProvider, useAppState } from './state/AppStateContext'
import { ContentProvider } from './state/ContentContext'
import { Splash } from './screens/Splash'
import { IntroCarousel } from './screens/onboarding/IntroCarousel'
import { EmailAuthScreen } from './screens/onboarding/EmailAuthScreen'
import { AppLockScreen } from './screens/AppLockScreen'
import { LockSetupScreen } from './screens/LockSetupScreen'
import { AuthCallback } from './screens/AuthCallback'
import { isLockEnabled, hasBeenAsked } from './lib/appLock'
import { signOutAccount } from './lib/account'
import { Home } from './screens/Home'
import { Kompas } from './screens/Kompas'
import { Chat } from './screens/Chat'
import { Badges } from './screens/Badges'
import { ProbeerDitEens } from './screens/ProbeerDitEens'
import { Ik } from './screens/Ik'
import { Instellingen } from './screens/Instellingen'
import { OverFatherFlow } from './screens/OverFatherFlow'
import { Specialisten } from './screens/Specialisten'
import { AddChild } from './screens/AddChild'
import { ChildrenQuestion } from './screens/onboarding/ChildrenQuestion'
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

function FullScreenSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-page">
      <div className="size-8 animate-spin rounded-full border-2 border-ink-faint border-t-primary-500" />
    </div>
  )
}

function MainApp() {
  const { authLoading, childrenLoaded, session, children } = useAppState()
  const [showSplash, setShowSplash] = useState(true)
  const [showIntro, setShowIntro] = useState(true)
  // Laag 3: het slot op dit toestel. Staat het niet aan, dan is er niets te
  // ontgrendelen en gaan we er meteen doorheen.
  const [unlocked, setUnlocked] = useState(() => !isLockEnabled())
  const [lockAsked, setLockAsked] = useState(() => hasBeenAsked())
  // Eén keer vastgelegd zodra de kinderen geladen zijn: moet deze gebruiker
  // nog door de kind-stap heen? Bewust niet live op children.length kijken,
  // anders klapt het scherm weg zodra je het eerste kind bevestigt en kun je
  // er nooit een tweede toevoegen.
  const [needsChildSetup, setNeedsChildSetup] = useState<boolean | null>(null)

  useEffect(() => {
    if (childrenLoaded && needsChildSetup === null) {
      setNeedsChildSetup(children.length === 0)
    }
  }, [childrenLoaded, children.length, needsChildSetup])

  if (showSplash) {
    return <Splash onDone={() => setShowSplash(false)} />
  }

  if (showIntro) {
    return <IntroCarousel onDone={() => setShowIntro(false)} />
  }

  if (authLoading) {
    return <FullScreenSpinner />
  }

  // Laag 1 en 2: identiteit via mail, terugkeer via een code uit de mail.
  if (!session) {
    return (
      <div className="animate-dissolve flex h-full flex-col overflow-hidden bg-page">
        <EmailAuthScreen onNext={() => {}} />
      </div>
    )
  }

  // Laag 3: sessie staat er, maar het toestel is vergrendeld.
  if (!unlocked) {
    return (
      <AppLockScreen
        onUnlocked={() => setUnlocked(true)}
        onFallback={() => {
          setUnlocked(true)
          void signOutAccount()
        }}
      />
    )
  }

  // Eén keer aanbieden om het slot aan te zetten, daarna nooit meer.
  if (!lockAsked) {
    return (
      <LockSetupScreen
        userId={session.user.id}
        label={session.user.email ?? 'FatherFlow'}
        onDone={() => setLockAsked(true)}
      />
    )
  }

  if (!childrenLoaded) {
    return <FullScreenSpinner />
  }

  if (needsChildSetup === null) {
    return <FullScreenSpinner />
  }

  if (needsChildSetup) {
    return (
      <div className="flex h-full flex-col overflow-hidden bg-page">
        <ChildrenQuestion onNext={() => setNeedsChildSetup(false)} />
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/les/:id" element={<Les />} />
      <Route path="/instellingen" element={<Instellingen />} />
      <Route path="/over" element={<OverFatherFlow />} />
      <Route path="/specialisten" element={<Specialisten />} />
      <Route path="/kind-toevoegen" element={<AddChild />} />
      <Route path="/kompas" element={<Kompas />} />
      <Route element={<TabLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/probeer-dit-eens" element={<ProbeerDitEens />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/ik" element={<Ik />} />
      </Route>
    </Routes>
  )
}

function AdminApp() {
  const { authLoading, session } = useAppState()

  if (authLoading) return <FullScreenSpinner />

  // Het CMS zat achter een vaste democode. Nu er echte accounts zijn, is
  // ingelogd zijn de voorwaarde; dat is een echte drempel in plaats van een
  // getal dat in de bundel staat.
  if (!session) {
    return (
      <div className="flex h-full flex-col overflow-hidden bg-page">
        <EmailAuthScreen onNext={() => {}} />
      </div>
    )
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
              path="/auth/callback"
              element={
                <AppShell>
                  <AuthCallback />
                </AppShell>
              }
            />
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
