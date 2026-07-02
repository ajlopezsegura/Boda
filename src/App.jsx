import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
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
import AdminPage        from './pages/AdminPage'
import ContactCTA       from './components/ui/ContactCTA'
import { useProject }    from './context/ProjectContext'

export default function App() {
  const location        = useLocation()
  const { loading }     = useProject()

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex flex-col items-center gap-4">
          <div style={{
            width: 32, height: 32, border: '1px solid rgba(184,152,72,0.3)',
            borderTopColor: 'var(--color-accent)', borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <LuxuryCursor />
      <ContactCTA />
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
          <Route path="/admin"                   element={<AdminPage />} />
          <Route path="/seleccion"               element={<Navigate to="/availability" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
