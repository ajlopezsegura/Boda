import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const SessionContext = createContext(null)

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function SessionProvider({ children }) {
  const location = useLocation()

  const [sessionId] = useState(() => {
    const stored = sessionStorage.getItem('tvbs_sid')
    if (stored) return stored
    const id = generateId()
    sessionStorage.setItem('tvbs_sid', id)
    return id
  })

  const [trail, setTrail]     = useState([])
  const enterTime             = useRef(Date.now())
  const prevPage              = useRef(null)

  /* ── Auto-track page views ── */
  useEffect(() => {
    const now  = Date.now()
    const page = location.pathname

    // Close previous page with duration
    if (prevPage.current) {
      const duration_ms = now - enterTime.current
      setTrail(prev => {
        const copy = [...prev]
        // Find last page_view for previous page and add duration
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].type === 'page_view' && copy[i].page === prevPage.current) {
            copy[i] = { ...copy[i], duration_ms }
            break
          }
        }
        return copy
      })
    }

    prevPage.current  = page
    enterTime.current = now

    setTrail(prev => [...prev, { type: 'page_view', page, ts: now, duration_ms: null }])
  }, [location.pathname])

  /* ── Manual event tracking ── */
  const trackEvent = useCallback((type, data = {}) => {
    setTrail(prev => [...prev, { type, ...data, ts: Date.now() }])
  }, [])

  return (
    <SessionContext.Provider value={{ sessionId, trail, trackEvent }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within SessionProvider')
  return ctx
}
