import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LuxuryCursor      from './components/cursor/LuxuryCursor'
import CoverPage         from './pages/CoverPage'
import ContextPage       from './pages/ContextPage'
import AvailabilityPage  from './pages/AvailabilityPage'
import UnitDetailPage    from './pages/UnitDetailPage'
import ImmersionPage     from './pages/ImmersionPage'
import DecisionPage      from './pages/DecisionPage'
import ComparePage       from './pages/ComparePage'
import ContactPage       from './pages/ContactPage'
import SummaryPage       from './pages/SummaryPage'
import PrivacyPage       from './pages/PrivacyPage'

export default function App() {
  const location = useLocation()

  return (
    <>
      <LuxuryCursor />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"                        element={<CoverPage />} />
          <Route path="/proyecto"                element={<ContextPage />} />
          <Route path="/availability"            element={<AvailabilityPage />} />
          <Route path="/availability/:slug"      element={<UnitDetailPage />} />
          <Route path="/inmersion/:unitId"       element={<ImmersionPage />} />
          <Route path="/decision"                element={<DecisionPage />} />
          <Route path="/compare"                 element={<ComparePage />} />
          <Route path="/contact"                 element={<ContactPage />} />
          <Route path="/summary/:slug"           element={<SummaryPage />} />
          <Route path="/privacy"                 element={<PrivacyPage />} />
          <Route path="/seleccion"               element={<Navigate to="/availability" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
