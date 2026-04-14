import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const SessionContext = createContext(null)
const PROJECT_SLUG     = import.meta.env.VITE_PROJECT_SLUG ?? 'las-conchas'

/* Pages that should never be tracked */
const EXCLUDED = ['/admin', '/privacy']

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

  const [trail, setTrail]   = useState([])
  const enterTime           = useRef(Date.now())
  const prevPage            = useRef(null)
  const trailRef            = useRef([])  // always-current ref for async callbacks

  /* Keep ref in sync with state */
  useEffect(() => { trailRef.current = trail }, [trail])

  /* ── Auto-track page views ── */
  useEffect(() => {
    const now  = Date.now()
    const page = location.pathname

    // Skip excluded pages (admin, privacy)
    if (EXCLUDED.some(p => page.startsWith(p))) return

    // Close previous page with duration
    if (prevPage.current && !EXCLUDED.some(p => prevPage.current.startsWith(p))) {
      const duration_ms = now - enterTime.current
      setTrail(prev => {
        const copy = [...prev]
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

    // Prevent duplicate entries (React StrictMode fires effects twice in dev)
    setTrail(prev => {
      const last = prev[prev.length - 1]
      if (last?.type === 'page_view' && last?.page === page) return prev
      return [...prev, { type: 'page_view', page, ts: now, duration_ms: null }]
    })
  }, [location.pathname])

  /* ── Save session to Supabase ── */
  const saveSession = useCallback(async (converted = false) => {
    const t = trailRef.current
    if (t.length === 0) return
    try {
      await supabase.from('page_sessions').upsert({
        session_id:   sessionId,
        project_slug: PROJECT_SLUG,
        trail:        t,
        pages_count:  t.filter(e => e.type === 'page_view').length,
        converted,
        updated_at:   new Date().toISOString(),
      }, { onConflict: 'session_id' })
    } catch { /* silent — analytics should never break the app */ }
  }, [sessionId])

  /* ── Auto-save when tab goes hidden ── */
  useEffect(() => {
    function onHide() {
      if (document.visibilityState === 'hidden') saveSession(false)
    }
    document.addEventListener('visibilitychange', onHide)
    return () => document.removeEventListener('visibilitychange', onHide)
  }, [saveSession])

  /* ── Manual event tracking ── */
  const trackEvent = useCallback((type, data = {}) => {
    setTrail(prev => [...prev, { type, ...data, ts: Date.now() }])
  }, [])

  /* ── Mark as converted (call after lead insert) ── */
  const markConverted = useCallback(() => saveSession(true), [saveSession])

  return (
    <SessionContext.Provider value={{ sessionId, trail, trackEvent, markConverted }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within SessionProvider')
  return ctx
}
