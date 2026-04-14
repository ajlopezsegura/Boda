import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Check, Loader2, ChevronDown } from 'lucide-react'
import { supabase } from '../lib/supabase'

const PROJECT_SLUG   = import.meta.env.VITE_PROJECT_SLUG   ?? 'las-conchas'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'admin'

const STATUS = {
  available: { es: 'Disponible', color: 'var(--color-accent)',  bg: 'rgba(184,152,72,0.10)' },
  reserved:  { es: 'Reservada',  color: 'rgba(255,200,80,0.9)', bg: 'rgba(255,200,80,0.09)' },
  sold:      { es: 'Vendida',    color: 'rgba(180,180,180,0.5)', bg: 'rgba(180,180,180,0.06)' },
}

/* ─── Custom status dropdown ──────────────────────────────── */
function StatusSelect({ value, onChange, disabled }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const cfg = STATUS[value] ?? STATUS.available

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Trigger button */}
      <button
        onClick={() => !disabled && setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '5px 10px 5px 12px',
          border: `1px solid ${cfg.color}`,
          background: cfg.bg,
          color: cfg.color,
          fontSize: '0.52rem', letterSpacing: '0.14em',
          fontFamily: 'inherit', cursor: disabled ? 'default' : 'pointer',
          whiteSpace: 'nowrap', minWidth: 110,
          transition: 'opacity 0.15s',
          opacity: disabled ? 0.5 : 1,
        }}>
        <span style={{ flex: 1, textAlign: 'left' }}>{cfg.es.toUpperCase()}</span>
        {disabled
          ? <Loader2 size={10} style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }} />
          : <ChevronDown size={10} style={{
              flexShrink: 0,
              transform: open ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s',
            }} />
        }
      </button>

      {/* Dropdown list */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            style={{
              position: 'absolute', right: 0, top: 'calc(100% + 4px)',
              zIndex: 50, minWidth: '100%',
              background: 'rgba(18,16,12,0.97)',
              border: '1px solid rgba(184,152,72,0.18)',
              backdropFilter: 'blur(12px)',
            }}>
            {Object.entries(STATUS).map(([key, s]) => (
              <button
                key={key}
                onClick={() => { onChange(key); setOpen(false) }}
                style={{
                  display: 'block', width: '100%',
                  padding: '9px 14px',
                  background: key === value ? s.bg : 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(184,152,72,0.07)',
                  color: s.color,
                  fontSize: '0.52rem', letterSpacing: '0.14em',
                  fontFamily: 'inherit', cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = s.bg}
                onMouseLeave={e => e.currentTarget.style.background = key === value ? s.bg : 'transparent'}>
                {s.es.toUpperCase()}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Password screen ─────────────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [pwd, setPwd]     = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (pwd === ADMIN_PASSWORD) {
      onLogin()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 400)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center"
         style={{ backgroundColor: 'var(--color-bg)' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 360, padding: '0 24px' }}>

        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <div style={{
            fontSize: '0.5rem', letterSpacing: '0.25em',
            color: 'rgba(184,152,72,0.5)', marginBottom: 8,
          }}>THE VISUALS BOUTIQUE STUDIO</div>
          <div style={{
            fontSize: '1rem', letterSpacing: '0.18em',
            color: 'var(--color-text)', fontWeight: 300,
          }}>PANEL DE GESTIÓN</div>
        </div>

        <form onSubmit={submit}>
          <motion.div
            animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
            transition={{ duration: 0.35 }}
            style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block', fontSize: '0.5rem',
              letterSpacing: '0.15em', color: 'rgba(184,152,72,0.5)',
              marginBottom: 8,
            }}>CONTRASEÑA</label>
            <input
              type="password"
              value={pwd}
              onChange={e => { setPwd(e.target.value); setError(false) }}
              autoFocus
              style={{
                width: '100%', padding: '10px 0',
                background: 'transparent', border: 'none',
                borderBottom: `1px solid ${error ? 'rgba(255,80,80,0.6)' : 'rgba(184,152,72,0.25)'}`,
                color: 'var(--color-text)',
                fontSize: '0.85rem', letterSpacing: '0.15em',
                fontFamily: 'inherit', outline: 'none',
              }}
            />
            {error && (
              <div style={{
                marginTop: 6, fontSize: '0.5rem',
                letterSpacing: '0.1em', color: 'rgba(255,80,80,0.7)',
              }}>CONTRASEÑA INCORRECTA</div>
            )}
          </motion.div>

          <button type="submit" style={{
            width: '100%', padding: '12px',
            border: '1px solid rgba(184,152,72,0.35)',
            background: 'rgba(184,152,72,0.06)',
            color: 'var(--color-accent)',
            fontSize: '0.52rem', letterSpacing: '0.2em',
            fontFamily: 'inherit', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(184,152,72,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(184,152,72,0.06)'}>
            ENTRAR
          </button>
        </form>
      </motion.div>
    </div>
  )
}

/* ─── Admin panel ─────────────────────────────────────────── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(
    () => localStorage.getItem('tvbs_admin') === ADMIN_PASSWORD
  )
  const [units,   setUnits]   = useState([])
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(null)
  const [toast,   setToast]   = useState(null)

  function handleLogin() {
    localStorage.setItem('tvbs_admin', ADMIN_PASSWORD)
    setAuthed(true)
  }

  function handleLogout() {
    localStorage.removeItem('tvbs_admin')
    setAuthed(false)
  }

  useEffect(() => {
    if (!authed) return
    supabase
      .from('units')
      .select('id, typology, floor, bedrooms, surface, price, status, has_terrace')
      .eq('project_slug', PROJECT_SLUG)
      .order('id')
      .then(({ data }) => {
        if (data) setUnits(data)
        setLoading(false)
      })
  }, [authed])

  async function updateStatus(unitId, newStatus) {
    setSaving(unitId)
    const { error } = await supabase
      .from('units')
      .update({ status: newStatus })
      .eq('id', unitId)
      .eq('project_slug', PROJECT_SLUG)

    setSaving(null)
    if (!error) {
      setUnits(prev => prev.map(u => u.id === unitId ? { ...u, status: newStatus } : u))
      showToast(`${unitId} → ${STATUS[newStatus]?.es ?? newStatus}`)
    }
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  if (!authed) return <LoginScreen onLogin={handleLogin} />

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center"
           style={{ backgroundColor: 'var(--color-bg)' }}>
        <Loader2 size={20} style={{ color: 'var(--color-accent)', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', padding: '0 0 80px' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 40px',
        borderBottom: '1px solid rgba(184,152,72,0.1)',
      }}>
        <div>
          <div style={{
            fontSize: '0.45rem', letterSpacing: '0.25em',
            color: 'rgba(184,152,72,0.45)', marginBottom: 4,
          }}>THE VISUALS BOUTIQUE STUDIO</div>
          <div style={{
            fontSize: '0.85rem', letterSpacing: '0.15em',
            color: 'var(--color-text)', fontWeight: 300,
          }}>PANEL DE GESTIÓN</div>
        </div>
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'rgba(244,241,234,0.3)', fontSize: '0.5rem',
          letterSpacing: '0.12em', fontFamily: 'inherit',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgba(244,241,234,0.6)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,241,234,0.3)'}>
          <LogOut size={13} />
          SALIR
        </button>
      </div>

      {/* Section title */}
      <div style={{ padding: '32px 40px 20px' }}>
        <div style={{
          fontSize: '0.45rem', letterSpacing: '0.2em',
          color: 'rgba(184,152,72,0.5)', marginBottom: 6,
        }}>DISPONIBILIDAD</div>
        <div style={{
          fontSize: '0.62rem', letterSpacing: '0.06em',
          color: 'rgba(244,241,234,0.35)',
        }}>{units.length} viviendas · haz clic en el estado para cambiarlo</div>
      </div>

      {/* Table */}
      <div style={{ padding: '0 40px' }}>

        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '72px 1fr 64px 72px 80px 1fr 130px',
          gap: 16, padding: '8px 16px 12px',
          borderBottom: '1px solid rgba(184,152,72,0.12)',
          fontSize: '0.42rem', letterSpacing: '0.18em',
          color: 'rgba(184,152,72,0.4)',
        }}>
          <span>VIVIENDA</span>
          <span>TIPOLOGÍA</span>
          <span>PLANTA</span>
          <span>DORM.</span>
          <span>SUP. M²</span>
          <span>PRECIO</span>
          <span style={{ textAlign: 'right' }}>ESTADO</span>
        </div>

        {/* Unit rows */}
        {units.map((unit, i) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr 64px 72px 80px 1fr 130px',
              gap: 16, padding: '13px 16px',
              borderBottom: '1px solid rgba(184,152,72,0.06)',
              alignItems: 'center',
              background: i % 2 === 0
                ? 'rgba(184,152,72,0.025)'
                : 'transparent',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(184,152,72,0.055)'}
            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'rgba(184,152,72,0.025)' : 'transparent'}>

            {/* ID */}
            <span style={{
              fontSize: '0.85rem', letterSpacing: '0.06em',
              color: 'rgba(244,241,234,0.85)', fontWeight: 300,
            }}>{unit.id}</span>

            {/* Typology */}
            <span style={{
              fontSize: '0.55rem', letterSpacing: '0.1em',
              color: 'rgba(244,241,234,0.4)',
              textTransform: 'uppercase',
            }}>{unit.typology}</span>

            {/* Floor */}
            <span style={{ fontSize: '0.6rem', color: 'rgba(244,241,234,0.4)' }}>
              {unit.floor}ª
            </span>

            {/* Bedrooms */}
            <span style={{ fontSize: '0.6rem', color: 'rgba(244,241,234,0.4)' }}>
              {unit.bedrooms}
            </span>

            {/* Surface */}
            <span style={{ fontSize: '0.6rem', color: 'rgba(244,241,234,0.4)' }}>
              {unit.surface}
            </span>

            {/* Price */}
            <span style={{
              fontSize: '0.72rem', letterSpacing: '0.04em',
              color: unit.price ? 'rgba(244,241,234,0.65)' : 'rgba(244,241,234,0.2)',
            }}>
              {unit.price ? unit.price.toLocaleString('es-ES') + ' €' : '—'}
            </span>

            {/* Status */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <StatusSelect
                value={unit.status}
                onChange={newStatus => updateStatus(unit.id, newStatus)}
                disabled={saving === unit.id}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            style={{
              position: 'fixed', bottom: 32, left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px',
              border: '1px solid rgba(184,152,72,0.3)',
              background: 'rgba(18,16,12,0.95)',
              fontSize: '0.52rem', letterSpacing: '0.12em',
              color: 'var(--color-accent)',
              backdropFilter: 'blur(8px)',
              whiteSpace: 'nowrap',
            }}>
            <Check size={12} />
            {toast.toUpperCase()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
