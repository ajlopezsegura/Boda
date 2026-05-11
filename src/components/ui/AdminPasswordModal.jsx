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
      eyebrow="DEMO · ACCESO RESERVADO"
      title={'PANEL DE GESTIÓN\nPROTEGIDO'}
      body={[
        'Esta zona está reservada al equipo comercial. En la demo te dejamos pasar para que veas el otro lado de la experiencia.',
        <>
          La contraseña es{' '}
          <span style={{
            display: 'inline-block',
            padding: '2px 10px',
            margin: '0 2px',
            border: '1px solid rgba(184,152,72,0.45)',
            background: 'rgba(184,152,72,0.08)',
            color: 'var(--color-accent)',
            letterSpacing: '0.22em',
            fontWeight: 500,
          }}>{password}</span>
        </>,
      ]}
      button="ENTENDIDO"
    />
  )
}
