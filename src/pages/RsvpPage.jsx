import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Check, Plane } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import wedding from '../data/wedding'

function fieldStyle(hasError) {
  return {
    width: '100%', backgroundColor: 'transparent', border: 'none',
    borderBottom: `1px solid ${hasError ? 'rgba(220,70,70,0.6)' : 'rgba(184,152,72,0.25)'}`,
    color: 'var(--color-text)', fontSize: '0.85rem', padding: '8px 0 6px',
    outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s',
  }
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="label-luxury" style={{ fontSize: '0.46rem', letterSpacing: '0.15em', color: 'rgba(184,152,72,0.55)' }}>
        {label}
      </span>
      {children}
      {error && <span style={{ fontSize: '0.5rem', color: 'rgba(220,70,70,0.8)' }}>{error}</span>}
    </div>
  )
}

export default function RsvpPage() {
  const { rsvp } = wedding
  const [f, setF] = useState({ name: '', attending: 'yes', guests: '1', shuttle: 'yes', diet: '', message: '' })
  const [errors, setErrors] = useState({})

  const set = (k, v) => {
    setF(prev => ({ ...prev, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }))
  }

  function buildMessage() {
    const yes = f.attending === 'yes'
    const lines = [
      `¡Hola! Confirmo asistencia a la boda de ${wedding.couple.bride} & ${wedding.couple.groom}.`,
      ``,
      `Nombre: ${f.name}`,
      `¿Asisto?: ${yes ? 'Sí, allí estaré ✈️' : 'No podré ir 😢'}`,
    ]
    if (yes) {
      lines.push(`Nº de personas: ${f.guests}`)
      lines.push(`Autobús: ${f.shuttle === 'yes' ? 'Sí, necesito plaza' : 'No, voy por mi cuenta'}`)
      if (f.diet.trim()) lines.push(`Alergias / dieta: ${f.diet.trim()}`)
    }
    if (f.message.trim()) lines.push(`Mensaje: ${f.message.trim()}`)
    return lines.join('\n')
  }

  function validate() {
    const e = {}
    if (!f.name.trim()) e.name = 'Dinos tu nombre'
    return e
  }

  function submitWhatsApp() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    const url = `https://wa.me/${rsvp.whatsapp}?text=${encodeURIComponent(buildMessage())}`
    window.open(url, '_blank')
  }

  function submitEmail() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    const subject = `Confirmación boda ${wedding.couple.bride} & ${wedding.couple.groom} — ${f.name}`
    const url = `mailto:${rsvp.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`
    window.location.href = url
  }

  const attending = f.attending === 'yes'

  return (
    <PageScaffold
      kicker="Tarjeta de embarque"
      title="Confirma tu asistencia"
      subtitle={`Necesitamos saber si nos acompañas para reservarte plaza. Por favor, confírmanos antes del ${rsvp.deadline}.`}
      maxWidth={640}
    >
      <motion.form
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={e => e.preventDefault()}
        className="flex flex-col gap-6 p-6 sm:p-8"
        style={{ border: '1px solid rgba(184,152,72,0.2)', backgroundColor: 'var(--color-bg-card)' }}
      >
        <Field label="NOMBRE Y APELLIDOS *" error={errors.name}>
          <input type="text" value={f.name} onChange={e => set('name', e.target.value)}
            placeholder="Tu nombre" style={fieldStyle(!!errors.name)} />
        </Field>

        {/* Attending toggle */}
        <div className="flex flex-col gap-2">
          <span className="label-luxury" style={{ fontSize: '0.46rem', letterSpacing: '0.15em', color: 'rgba(184,152,72,0.55)' }}>
            ¿NOS ACOMPAÑAS?
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[{ v: 'yes', l: 'Sí, allí estaré' }, { v: 'no', l: 'No podré ir' }].map(opt => (
              <button key={opt.v} type="button" onClick={() => set('attending', opt.v)} data-cursor="hover"
                className="label-luxury py-3 transition-all duration-200"
                style={{
                  border: `1px solid ${f.attending === opt.v ? 'var(--color-accent)' : 'rgba(184,152,72,0.2)'}`,
                  backgroundColor: f.attending === opt.v ? 'rgba(184,152,72,0.08)' : 'transparent',
                  color: f.attending === opt.v ? 'var(--color-accent)' : 'rgba(244,241,234,0.5)',
                  fontSize: '0.55rem',
                }}>
                {opt.l}
              </button>
            ))}
          </div>
        </div>

        {attending && (
          <>
            <Field label="Nº DE PERSONAS (incluyéndote)" error={null}>
              <input type="number" min="1" max="10" value={f.guests}
                onChange={e => set('guests', e.target.value)} style={fieldStyle(false)} />
            </Field>

            <div className="flex flex-col gap-2">
              <span className="label-luxury" style={{ fontSize: '0.46rem', letterSpacing: '0.15em', color: 'rgba(184,152,72,0.55)' }}>
                ¿NECESITAS AUTOBÚS?
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[{ v: 'yes', l: 'Sí, resérvame plaza' }, { v: 'no', l: 'No, gracias' }].map(opt => (
                  <button key={opt.v} type="button" onClick={() => set('shuttle', opt.v)} data-cursor="hover"
                    className="label-luxury py-3 transition-all duration-200"
                    style={{
                      border: `1px solid ${f.shuttle === opt.v ? 'var(--color-accent)' : 'rgba(184,152,72,0.2)'}`,
                      backgroundColor: f.shuttle === opt.v ? 'rgba(184,152,72,0.08)' : 'transparent',
                      color: f.shuttle === opt.v ? 'var(--color-accent)' : 'rgba(244,241,234,0.5)',
                      fontSize: '0.55rem',
                    }}>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            <Field label="ALERGIAS O DIETA ESPECIAL" error={null}>
              <input type="text" value={f.diet} onChange={e => set('diet', e.target.value)}
                placeholder="Vegetariano, celíaco, alergias..." style={fieldStyle(false)} />
            </Field>
          </>
        )}

        <Field label="MENSAJE PARA LOS NOVIOS (opcional)" error={null}>
          <textarea value={f.message} onChange={e => set('message', e.target.value)} rows={3}
            placeholder="Escríbeles algo bonito..."
            style={{
              width: '100%', backgroundColor: 'transparent', resize: 'none', outline: 'none',
              border: '1px solid rgba(184,152,72,0.15)', color: 'var(--color-text)',
              fontSize: '0.8rem', padding: '10px', lineHeight: 1.7, fontFamily: 'inherit',
            }} />
        </Field>

        {/* Submit buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button type="button" onClick={submitWhatsApp} data-cursor="hover"
            className="flex-1 label-luxury py-4 flex items-center justify-center gap-2 transition-opacity duration-200"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)', fontSize: '0.58rem', letterSpacing: '0.16em' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            <MessageCircle size={14} /> Enviar por WhatsApp
          </button>
          <button type="button" onClick={submitEmail} data-cursor="hover"
            className="flex-1 label-luxury py-4 flex items-center justify-center gap-2 transition-all duration-200"
            style={{ border: '1px solid rgba(184,152,72,0.35)', color: 'var(--color-accent)', fontSize: '0.58rem', letterSpacing: '0.16em' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'rgba(184,152,72,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,152,72,0.35)'; e.currentTarget.style.backgroundColor = 'transparent' }}>
            <Mail size={14} /> Enviar por email
          </button>
        </div>

        <div className="flex items-center gap-2 justify-center">
          <Plane size={11} style={{ color: 'rgba(184,152,72,0.5)' }} />
          <p className="label-luxury text-center" style={{ fontSize: '0.44rem', color: 'rgba(244,241,234,0.35)', lineHeight: 1.8 }}>
            Al pulsar se abrirá tu app con el mensaje ya escrito · solo tienes que darle a enviar
          </p>
        </div>
      </motion.form>

      {/* Direct contacts */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8">
        <span className="label-luxury" style={{ fontSize: '0.5rem', color: 'var(--color-text-muted)' }}>
          <Check size={11} style={{ display: 'inline', color: 'var(--color-accent)', marginRight: 4 }} />
          ¿Dudas? Llámanos:
        </span>
        {rsvp.contacts.map(c => (
          <span key={c.name} className="label-luxury" style={{ fontSize: '0.55rem', color: 'var(--color-accent)' }}>
            {c.name} · {c.phone}
          </span>
        ))}
      </div>
    </PageScaffold>
  )
}
