import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Check, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

const PROJECT_SLUG   = import.meta.env.VITE_PROJECT_SLUG   ?? 'las-conchas'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'admin'

const STATUS = {
  available: { es: 'Disponible', color: 'var(--color-accent)',       bg: 'rgba(184,152,72,0.12)' },
  reserved:  { es: 'Reservada',  color: 'rgba(255,200,80,0.9)',      bg: 'rgba(255,200,80,0.10)' },
  sold:      { es: 'Vendida',    color: 'rgba(244,241,234,0.35)',     bg: 'rgba(244,241,234,0.05)' },
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

        {/* Logo / title */}
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
          {/* Password input */}
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
                background: 'transparent',
                border: 'none',
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
  const [saving,  setSaving]  = useState(null)   // unit id being saved
  const [toast,   setToast]   = useState(null)   // success message

  function handleLogin() {
    localStorage.setItem('tvbs_admin', ADMIN_PASSWORD)
    setAuthed(true)
  }

  function handleLogout() {
    localStorage.removeItem('tvbs_admin')
    setAuthed(false)
  }

  /* fetch units */
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

  /* update status */
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

  /* ── Not authed ── */
  if (!authed) return <LoginScreen onLogin={handleLogin} />

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center"
           style={{ backgroundColor: 'var(--color-bg)' }}>
        <Loader2 size={20} style={{ color: 'var(--color-accent)', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  /* ── Panel ── */
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', padding: '0 0 80px' }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 32px',
        borderBottom: '1px solid rgba(184,152,72,0.12)',
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
      <div style={{ padding: '32px 32px 16px' }}>
        <div style={{
          fontSize: '0.45rem', letterSpacing: '0.2em',
          color: 'rgba(184,152,72,0.5)', marginBottom: 6,
        }}>DISPONIBILIDAD</div>
        <div style={{
          fontSize: '0.65rem', letterSpacing: '0.1em',
          color: 'rgba(244,241,234,0.5)',
        }}>{units.length} viviendas · haz clic en el estado para cambiarlo</div>
      </div>

      {/* Units table */}
      <div style={{ padding: '0 32px' }}>

        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 60px 80px 80px 1fr 140px',
          gap: 16, padding: '10px 16px',
          borderBottom: '1px solid rgba(184,152,72,0.1)',
          fontSize: '0.42rem', letterSpacing: '0.16em',
          color: 'rgba(184,152,72,0.4)',
        }}>
          <span>VIVIENDA</span>
          <span>TIPOLOGÍA</span>
          <span>PLANTA</span>
          <span>DORM.</span>
          <span>SUP. M²</span>
          <span>PRECIO</span>
          <span>ESTADO</span>
        </div>

        {/* Rows */}
        {units.map((unit, i) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 60px 80px 80px 1fr 140px',
              gap: 16, padding: '14px 16px',
              borderBottom: '1px solid rgba(184,152,72,0.06)',
              alignItems: 'center',
            }}>

            {/* ID */}
            <span style={{
              fontSize: '0.85rem', letterSpacing: '0.08em',
              color: 'var(--color-text)', fontWeight: 300,
            }}>{unit.id}</span>

            {/* Typology */}
            <span style={{
              fontSize: '0.55rem', letterSpacing: '0.1em',
              color: 'rgba(244,241,234,0.5)',
              textTransform: 'uppercase',
            }}>{unit.typology}</span>

            {/* Floor */}
            <span style={{
              fontSize: '0.6rem', color: 'rgba(244,241,234,0.45)',
            }}>{unit.floor}ª</span>

            {/* Bedrooms */}
            <span style={{
              fontSize: '0.6rem', color: 'rgba(244,241,234,0.45)',
            }}>{unit.bedrooms}</span>

            {/* Surface */}
            <span style={{
              fontSize: '0.6rem', color: 'rgba(244,241,234,0.45)',
            }}>{unit.surface}</span>

            {/* Price */}
            <span style={{
              fontSize: '0.7rem', letterSpacing: '0.05em',
              color: unit.price ? 'rgba(244,241,234,0.7)' : 'rgba(244,241,234,0.2)',
            }}>
              {unit.price ? unit.price.toLocaleString('es-ES') + ' €' : '—'}
            </span>

            {/* Status dropdown */}
            <div style={{ position: 'relative' }}>
              {saving === unit.id ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Loader2 size={12} style={{
                    color: 'var(--color-accent)',
                    animation: 'spin 1s linear infinite',
                  }} />
                  <span style={{ fontSize: '0.5rem', color: 'rgba(244,241,234,0.4)' }}>
                    Guardando…
                  </span>
                </div>
              ) : (
                <select
                  value={unit.status}
                  onChange={e => updateStatus(unit.id, e.target.value)}
                  style={{
                    appearance: 'none', WebkitAppearance: 'none',
                    padding: '5px 24px 5px 10px',
                    border: `1px solid ${STATUS[unit.status]?.color ?? 'rgba(184,152,72,0.3)'}`,
                    borderRadius: 2,
                    background: STATUS[unit.status]?.bg ?? 'transparent',
                    color: STATUS[unit.status]?.color ?? 'var(--color-text)',
                    fontSize: '0.5rem', letterSpacing: '0.12em',
                    fontFamily: 'inherit', cursor: 'pointer',
                    outline: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(184,152,72,0.5)' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 8px center',
                  }}>
                  <option value="available">Disponible</option>
                  <option value="reserved">Reservada</option>
                  <option value="sold">Vendida</option>
                </select>
              )}
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
              background: 'rgba(20,18,14,0.95)',
              fontSize: '0.52rem', letterSpacing: '0.12em',
              color: 'var(--color-accent)',
              backdropFilter: 'blur(8px)',
            }}>
            <Check size={12} />
            {toast.toUpperCase()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
