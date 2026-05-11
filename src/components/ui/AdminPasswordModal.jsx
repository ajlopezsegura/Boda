import { useEffect, useState } from 'react'
import JourneyModal from './JourneyModal'

const STORAGE_KEY = 'tvbs_seen_admin_password_hint_v1'

export default function AdminPasswordModal({ password }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // TODO: re-enable once-per-visitor by checking localStorage[STORAGE_KEY]
    const id = setTimeout(() => setOpen(true), 350)
    return () => clearTimeout(id)
  }, [])

  function dismiss() {
    setOpen(false)
  }

  return (
    <JourneyModal
      open={open}
      onClose={dismiss}
      eyebrow="DEMO · ACCESO PROTEGIDO"
      title="PANEL DE VENTAS"
      body={[
        'En producción, este panel está restringido al promotor y a su equipo comercial. Cada cliente accede solo a sus propios leads, con credenciales propias y cumplimiento GDPR.',
        <>
          Para que veas qué hay dentro durante la demo, te dejamos la contraseña:{' '}
          <span style={{
            display: 'inline-block',
            padding: '2px 10px',
            margin: '0 2px',
            border: '1px solid rgba(184,152,72,0.45)',
            background: 'rgba(184,152,72,0.08)',
            color: 'var(--color-accent)',
            letterSpacing: '0.18em',
            fontWeight: 500,
          }}>{password}</span>
        </>,
      ]}
      button="ACCEDER"
    />
  )
}
