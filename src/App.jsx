import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import WeddingNav      from './components/layout/WeddingNav'
import CoverPage       from './pages/CoverPage'
import HistoriaPage    from './pages/HistoriaPage'
import ItinerarioPage  from './pages/ItinerarioPage'
import ViajePage       from './pages/ViajePage'
import InfoPage        from './pages/InfoPage'
import RsvpPage        from './pages/RsvpPage'

export default function App() {
  const location = useLocation()

  return (
    <>
      <WeddingNav />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"          element={<CoverPage />} />
          <Route path="/historia"  element={<HistoriaPage />} />
          <Route path="/dia"       element={<ItinerarioPage />} />
          <Route path="/viaje"     element={<ViajePage />} />
          <Route path="/info"      element={<InfoPage />} />
          <Route path="/rsvp"      element={<RsvpPage />} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
