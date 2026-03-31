import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LuxuryCursor from './components/cursor/LuxuryCursor'
import CoverPage      from './pages/CoverPage'
import ContextPage    from './pages/ContextPage'
import SelectionPage  from './pages/SelectionPage'
import ImmersionPage  from './pages/ImmersionPage'
import DecisionPage   from './pages/DecisionPage'

export default function App() {
  const location = useLocation()

  return (
    <>
      <LuxuryCursor />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"                  element={<CoverPage />} />
          <Route path="/proyecto"          element={<ContextPage />} />
          <Route path="/seleccion"         element={<SelectionPage />} />
          <Route path="/inmersion/:unitId" element={<ImmersionPage />} />
          <Route path="/decision"          element={<DecisionPage />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
