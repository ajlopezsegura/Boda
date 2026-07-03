import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Plane } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import wedding from '../data/wedding'

function fieldStyle(hasError) {
  return {
    width: '100%', backgroundColor: 'transparent', border: 'none',
    borderBottom: `1px solid ${hasError ? 'rgba(160,50,40,0.7)' : 'var(--hairline)'}`,
    color: 'var(--navy)', fontSize: '1rem', padding: '9px 0 7px',
    outline: 'none', fontFamily: '"Cormorant Garamond", Georgia, serif', transition: 'border-color 0.2s',
  }
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="eyebrow" style={{ fontSize: '0.46rem', color: 'var(--gold)' }}>{label}</span>
      {children}
      {error && <span style={{ fontSize: '0.7rem', color: 'rgba(160,50,40,0.85)' }}>{error}</span>}
    </div>
  )
}

function Choice({ options, value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map(opt => {
        const on = value === opt.v
        return (
          <button key={opt.v} type="button" onClick={() => onChange(opt.v)} data-cursor="hover"
            className="eyebrow py-3.5 transition-all duration-200"
            style={{
              border: `1px solid ${on ? 'var(--gold)' : 'var(--hairline)'}`,
              backgroundColor: on ? 'rgba(166,129,60,0.10)' : 'transparent',
              color: on ? 'var(--gold)' : 'var(--ink-faint)',
              fontSize: '0.54rem',
            }}>
            {opt.l}
          </button>
        )
      })}
    </div>
  )
}

export default function RsvpPage() {
  const { rsvp } = wedding
  const [f, setF] = useState({ name: '', attending: 'yes', guests: '1', shuttle: 'yes', diet: '', message: '' })
  const [errors, setErrors] = useState({})

  const set = (k, v) => { setF(p => ({ ...p, [k]: v })); if (errors[k]) setErrors(e => ({ ...e, [k]: null })) }

  function buildMessage() {
    const yes = f.attending === 'yes'
    const lines = [
      `¡Hola! Confirmo asistencia a la boda de ${wedding.couple.bride} & ${wedding.couple.groom}.`,
      ``,
      `Nombre: ${f.name}`,
      `¿Asisto?: ${yes ? 'Sí, allí estaré ✈️' : 'No podré ir'}`,
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
    const e = validate(); if (Object.keys(e).length) { setErrors(e); return }
    window.open(`https://wa.me/${rsvp.whatsapp}?text=${encodeURIComponent(buildMessage())}`, '_blank')
  }
  function submitEmail() {
    const e = validate(); if (Object.keys(e).length) { setErrors(e); return }
    const subject = `Confirmación boda ${wedding.couple.bride} & ${wedding.couple.groom} — ${f.name}`
    window.location.href = `mailto:${rsvp.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`
  }

  const attending = f.attending === 'yes'

  return (
    <PageScaffold
      index="05"
      eyebrow="Boarding pass"
      title={<>Confirma tu <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>asistencia</span></>}
      subtitle={`Necesitamos saber si nos acompañas para reservarte plaza. Confírmanos, por favor, antes del ${rsvp.deadline}.`}
      maxWidth={620}
    >
      <motion.form
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        onSubmit={e => e.preventDefault()}
        className="flex flex-col gap-7 p-7 sm:p-9"
        style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--paper-deep)' }}>

        <Field label="Nombre y apellidos" error={errors.name}>
          <input type="text" value={f.name} onChange={e => set('name', e.target.value)} placeholder="Tu nombre" style={fieldStyle(!!errors.name)} />
        </Field>

        <div className="flex flex-col gap-2">
          <span className="eyebrow" style={{ fontSize: '0.46rem', color: 'var(--gold)' }}>¿Nos acompañas?</span>
          <Choice options={[{ v: 'yes', l: 'Sí, allí estaré' }, { v: 'no', l: 'No podré ir' }]} value={f.attending} onChange={v => set('attending', v)} />
        </div>

        {attending && (
          <>
            <Field label="Nº de personas (incluyéndote)">
              <input type="number" min="1" max="10" value={f.guests} onChange={e => set('guests', e.target.value)} style={fieldStyle(false)} />
            </Field>
            <div className="flex flex-col gap-2">
              <span className="eyebrow" style={{ fontSize: '0.46rem', color: 'var(--gold)' }}>¿Necesitas autobús?</span>
              <Choice options={[{ v: 'yes', l: 'Sí, resérvame plaza' }, { v: 'no', l: 'No, gracias' }]} value={f.shuttle} onChange={v => set('shuttle', v)} />
            </div>
            <Field label="Alergias o dieta especial">
              <input type="text" value={f.diet} onChange={e => set('diet', e.target.value)} placeholder="Vegetariano, celíaco, alergias…" style={fieldStyle(false)} />
            </Field>
          </>
        )}

        <Field label="Mensaje para los novios (opcional)">
          <textarea value={f.message} onChange={e => set('message', e.target.value)} rows={3} placeholder="Escríbeles algo bonito…"
            style={{ width: '100%', backgroundColor: 'var(--paper)', resize: 'none', outline: 'none', border: '1px solid var(--hairline)', color: 'var(--navy)', fontSize: '0.95rem', padding: '11px', lineHeight: 1.7, fontFamily: '"Cormorant Garamond", Georgia, serif' }} />
        </Field>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button type="button" onClick={submitWhatsApp} data-cursor="hover"
            className="flex-1 eyebrow py-4 flex items-center justify-center gap-2 transition-opacity duration-200"
            style={{ backgroundColor: 'var(--navy)', color: 'var(--gold-soft)', fontSize: '0.56rem' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            <MessageCircle size={14} /> Por WhatsApp
          </button>
          <button type="button" onClick={submitEmail} data-cursor="hover"
            className="flex-1 eyebrow py-4 flex items-center justify-center gap-2 transition-all duration-200"
            style={{ border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '0.56rem' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(166,129,60,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}>
            <Mail size={14} /> Por email
          </button>
        </div>

        <div className="flex items-center gap-2 justify-center">
          <Plane size={11} style={{ color: 'var(--ink-faint)' }} />
          <p className="eyebrow text-center" style={{ fontSize: '0.42rem', color: 'var(--ink-faint)', lineHeight: 1.8 }}>
            Se abrirá tu app con el mensaje ya escrito · solo tienes que enviarlo
          </p>
        </div>
      </motion.form>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8">
        <span className="eyebrow" style={{ fontSize: '0.5rem', color: 'var(--ink-muted)' }}>¿Dudas? Llámanos:</span>
        {rsvp.contacts.map(c => (
          <span key={c.name} className="data" style={{ fontSize: '0.6rem', color: 'var(--gold)' }}>{c.name} · {c.phone}</span>
        ))}
      </div>
    </PageScaffold>
  )
}
