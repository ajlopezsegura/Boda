import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AppShell from './components/layout/AppShell'
import LuxuryCursor from './components/cursor/LuxuryCursor'
import SplashPage from './pages/SplashPage'
import LandingPage from './pages/LandingPage'
import MapPage from './pages/MapPage'
import SpacePage from './pages/SpacePage'

export default function App() {
  const location = useLocation()
  const isSplash = location.pathname === '/'

  return (
    <>
      <LuxuryCursor />
      {!isSplash && <AppShell />}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"          element={<SplashPage />} />
          <Route path="/home"      element={<LandingPage />} />
          <Route path="/map"       element={<MapPage />} />
          <Route path="/space/:id" element={<SpacePage />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
