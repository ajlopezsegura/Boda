import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import { useLang } from '../i18n'
import { textoTel, enlaceTel } from '../lib/phone'

const MAX_ACOMPANANTES = 10

function fieldStyle(hasError) {
  return {
    width: '100%', backgroundColor: 'transparent', border: 'none',
    borderBottom: `1px solid ${hasError ? 'rgba(160,50,40,0.7)' : 'var(--hairline)'}`,
    color: 'var(--navy)', fontSize: '1rem', padding: '9px 0 7px',
    outline: 'none', fontFamily: '"EB Garamond", Georgia, serif', transition: 'border-color 0.2s',
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

function Choice({ options, value, onChange, columnas = 2 }) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columnas}, minmax(0, 1fr))` }}>
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
  const { wedding, t } = useLang()
  const { rsvp } = wedding
  const [f, setF] = useState({
    name: '', attending: 'yes', acompanantes: 0, nombres: [], shuttle: 'both', diet: '', message: '',
  })
  const [errors, setErrors] = useState({})

  const set = (k, v) => { setF(p => ({ ...p, [k]: v })); if (errors[k]) setErrors(e => ({ ...e, [k]: null })) }

  /* El número de acompañantes decide cuántas casillas de nombre aparecen. Se
     conservan los nombres ya escritos al subir o bajar la cifra. */
  function setAcompanantes(valor) {
    const n = Math.max(0, Math.min(MAX_ACOMPANANTES, Number(valor) || 0))
    setF(p => {
      const nombres = Array.from({ length: n }, (_, i) => p.nombres[i] ?? '')
      return { ...p, acompanantes: n, nombres }
    })
  }

  function setNombre(i, valor) {
    setF(p => {
      const nombres = [...p.nombres]
      nombres[i] = valor
      return { ...p, nombres }
    })
  }

  const autobus = {
    both: t.form.busBoth,
    out: t.form.busOut,
    back: t.form.busBack,
    none: t.form.busNone,
  }

  function buildMessage() {
    const yes = f.attending === 'yes'
    const lines = [
      `¡Hola! Confirmo asistencia a la boda de ${wedding.couple.bride} & ${wedding.couple.groom}.`,
      ``,
      `Nombre: ${f.name}`,
      `¿Asisto?: ${yes ? 'Sí, allí estaré ✈️' : 'No podré ir'}`,
    ]
    if (yes) {
      lines.push(`Acompañantes: ${f.acompanantes}`)
      f.nombres.forEach((n, i) => {
        if (n.trim()) lines.push(`  ${i + 1}. ${n.trim()}`)
      })
      lines.push(`Autobús: ${autobus[f.shuttle]}`)
      if (f.diet.trim()) lines.push(`Alergias o intolerancias: ${f.diet.trim()}`)
    }
    if (f.message.trim()) lines.push(`Mensaje: ${f.message.trim()}`)
    return lines.join('\n')
  }

  function enviar() {
    if (!f.name.trim()) { setErrors({ name: t.form.nameErr }); return }
    const asunto = `Confirmación boda ${wedding.couple.bride} & ${wedding.couple.groom} — ${f.name}`
    window.location.href =
      `mailto:${rsvp.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(buildMessage())}`
  }

  const attending = f.attending === 'yes'

  return (
    <PageScaffold
      align="center"
      title={<>{t.titles.rsvp[0]}<span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{t.titles.rsvp[1]}</span></>}
      subtitle={t.subtitles.rsvp}
      maxWidth={620}
    >
      <motion.form
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        onSubmit={e => { e.preventDefault(); enviar() }}
        className="flex flex-col gap-7 p-7 sm:p-9 text-left"
        style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--paper-deep)' }}>

        <Field label={t.form.name} error={errors.name}>
          <input type="text" value={f.name} onChange={e => set('name', e.target.value)} placeholder={t.form.namePh} style={fieldStyle(!!errors.name)} />
        </Field>

        <div className="flex flex-col gap-2">
          <span className="eyebrow" style={{ fontSize: '0.46rem', color: 'var(--gold)' }}>{t.form.coming}</span>
          <Choice options={[{ v: 'yes', l: t.form.yes }, { v: 'no', l: t.form.no }]} value={f.attending} onChange={v => set('attending', v)} />
        </div>

        {attending && (
          <>
            <Field label={t.form.guests}>
              <input type="number" inputMode="numeric" min="0" max={MAX_ACOMPANANTES}
                     value={f.acompanantes} onChange={e => setAcompanantes(e.target.value)} style={fieldStyle(false)} />
            </Field>

            {f.nombres.map((nombre, i) => (
              <Field key={i} label={t.form.companion(i + 1)}>
                <input type="text" value={nombre} onChange={e => setNombre(i, e.target.value)}
                       placeholder={t.form.companionPh} style={fieldStyle(false)} />
              </Field>
            ))}

            <div className="flex flex-col gap-2">
              <span className="eyebrow" style={{ fontSize: '0.46rem', color: 'var(--gold)' }}>{t.form.busQ}</span>
              <Choice
                options={[
                  { v: 'both', l: t.form.busBoth },
                  { v: 'out', l: t.form.busOut },
                  { v: 'back', l: t.form.busBack },
                  { v: 'none', l: t.form.busNone },
                ]}
                value={f.shuttle}
                onChange={v => set('shuttle', v)}
              />
            </div>

            <Field label={t.form.diet}>
              <input type="text" value={f.diet} onChange={e => set('diet', e.target.value)} placeholder={t.form.dietPh} style={fieldStyle(false)} />
            </Field>
          </>
        )}

        <Field label={t.form.message}>
          <textarea value={f.message} onChange={e => set('message', e.target.value)} rows={3} placeholder={t.form.messagePh}
            style={{ width: '100%', backgroundColor: 'var(--paper)', resize: 'none', outline: 'none', border: '1px solid var(--hairline)', color: 'var(--navy)', fontSize: '0.95rem', padding: '11px', lineHeight: 1.7, fontFamily: '"EB Garamond", Georgia, serif' }} />
        </Field>

        <button type="submit" data-cursor="hover"
          className="eyebrow py-4 flex items-center justify-center gap-2 transition-opacity duration-200 mt-1"
          style={{ backgroundColor: 'var(--navy)', color: 'var(--gold-soft)', fontSize: '0.56rem' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          <Plane size={14} /> {t.form.send}
        </button>
      </motion.form>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8">
        <span className="eyebrow" style={{ fontSize: '0.5rem', color: 'var(--ink-muted)' }}>{t.form.doubts}</span>
        {rsvp.contacts.map(c => (
          <a key={c.name} href={enlaceTel(c.phone)} data-cursor="hover"
             className="data no-underline" style={{ fontSize: '0.6rem', color: 'var(--gold)' }}>
            {c.name} · {textoTel(c.phone)}
          </a>
        ))}
      </div>
    </PageScaffold>
  )
}
