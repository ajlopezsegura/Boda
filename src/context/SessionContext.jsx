import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const SessionContext = createContext(null)
const PROJECT_SLUG = (import.meta.env.VITE_PROJECT_SLUG ?? 'las-conchas').trim()

/* Pages that should never be tracked */
const EXCLUDED = ['/admin', '/privacy']

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function getDeviceType() {
  const ua = navigator.userAgent
  if (/iPad/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return 'tablet'
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return 'mobile'
  return 'desktop'
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

  // trailRef is always current (updated synchronously on every mutation)
  // trail state is derived — only used to expose trail to consumers (ContactPage)
  const trailRef  = useRef([{ type: 'device_info', device: getDeviceType(), ts: Date.now() }])
  const [trail, setTrail] = useState(trailRef.current)

  const enterTime = useRef(Date.now())
  const prevPage  = useRef(null)

  // ── Save session to Supabase ──────────────────────────────────────────────
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
    } catch { /* silent — analytics must never break the app */ }
  }, [sessionId])

  // ── Auto-track page views ─────────────────────────────────────────────────
  useEffect(() => {
    const now  = Date.now()
    const page = location.pathname

    if (EXCLUDED.some(p => page.startsWith(p))) return

    // Close previous page: find its page_view entry and stamp duration_ms
    if (prevPage.current && !EXCLUDED.some(p => prevPage.current.startsWith(p))) {
      const duration_ms = now - enterTime.current
      let found = false
      const updated = trailRef.current.map(e => {
        if (!found && e.type === 'page_view' && e.page === prevPage.current && e.duration_ms === null) {
          found = true
          return { ...e, duration_ms }
        }
        return e
      })
      if (found) {
        trailRef.current = updated
        setTrail(updated)
      }
    }

    prevPage.current  = page
    enterTime.current = now

    // Prevent duplicate entries (React StrictMode fires effects twice in dev)
    const last = trailRef.current[trailRef.current.length - 1]
    if (last?.type === 'page_view' && last?.page === page) return

    const next = [...trailRef.current, { type: 'page_view', page, ts: now, duration_ms: null }]
    trailRef.current = next
    setTrail(next)

    // Persist after every navigation so admin always sees up-to-date data
    saveSession(false)
  }, [location.pathname, saveSession])

  // ── Save on tab hide and on page unload (belt + suspenders) ──────────────
  useEffect(() => {
    function onHide()   { if (document.visibilityState === 'hidden') saveSession(false) }
    function onUnload() { saveSession(false) }
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('beforeunload', onUnload)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('beforeunload', onUnload)
    }
  }, [saveSession])

  // ── Manual event tracking ─────────────────────────────────────────────────
  // Updates trailRef synchronously so saveSession() always reads fresh data
  const trackEvent = useCallback((type, data = {}) => {
    const event = { type, ...data, ts: Date.now() }
    trailRef.current = [...trailRef.current, event]
    setTrail(prev => [...prev, event])
  }, [])

  // ── Mark as converted (call after lead insert) ────────────────────────────
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
