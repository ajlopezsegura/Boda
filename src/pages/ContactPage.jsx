import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Check, Car, Package } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

const STATUS_CONFIG = {
  available: { es: 'Disponible', en: 'Available', color: 'var(--color-accent)',  bg: 'rgba(184,152,72,0.12)' },
  reserved:  { es: 'Reservada',  en: 'Reserved',  color: 'rgba(255,200,80,0.9)', bg: 'rgba(255,200,80,0.10)' },
  sold:      { es: 'Vendida',    en: 'Sold',       color: 'rgba(244,241,234,0.3)',bg: 'rgba(244,241,234,0.05)'},
}

const INTENTS = [
  { id: 'info',     es: 'Solicitar información',    en: 'Request information'    },
  { id: 'visit',    es: 'Solicitar visita',          en: 'Request a visit'        },
  { id: 'call',     es: 'Agendar llamada',           en: 'Schedule a call'        },
  { id: 'interest', es: 'Me interesa esta vivienda', en: "I'm interested"         },
]

const SUBMIT_LABEL = {
  info:     { es: 'ENVIAR SOLICITUD',   en: 'SEND REQUEST'      },
  visit:    { es: 'SOLICITAR VISITA',   en: 'REQUEST VISIT'     },
  call:     { es: 'AGENDAR LLAMADA',    en: 'SCHEDULE CALL'     },
  interest: { es: 'CONFIRMAR INTERÉS',  en: 'CONFIRM INTEREST'  },
}

const labelSty = { fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(184,152,72,0.5)' }

function fieldStyle(hasError) {
  return {
    width: '100%', backgroundColor: 'transparent', border: 'none',
    borderBottom: `1px solid ${hasError ? 'rgba(220,70,70,0.6)' : 'rgba(184,152,72,0.25)'}`,
    color: 'var(--color-text)', fontSize: '0.78rem', padding: '8px 0 6px',
    outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s',
  }
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="label-luxury" style={{ fontSize: '0.44rem', letterSpacing: '0.15em', color: 'rgba(184,152,72,0.5)' }}>
        {label}
      </span>
      {children}
      {error && (
        <span style={{ fontSize: '0.44rem', color: 'rgba(220,70,70,0.75)', fontFamily: 'inherit' }}>
          {error}
        </span>
      )}
    </div>
  )
}

export default function ContactPage() {
  const navigate           = useNavigate()
  const { units: allUnits } = useProject()
  const { lang, toggle }   = useLang()

  // ── Read context ──────────────────────────────────────────────────────────────
  const ctx = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('tvbs_lead_context') ?? 'null') }
    catch { return null }
  }, [])

  const units = useMemo(() => {
    if (!ctx?.unit_ids || !allUnits) return []
    return ctx.unit_ids.map(id => allUnits.find(u => u.id === id)).filter(Boolean)
  }, [ctx, allUnits])

  const primaryUnit = useMemo(
    () => units.find(u => u.id === ctx?.primary_unit_id) ?? units[0] ?? null,
    [units, ctx]
  )
  const isMulti = units.length > 1

  // ── Form state ────────────────────────────────────────────────────────────────
  const [intent,     setIntent]     = useState('info')
  const [fields,     setFields]     = useState({ name: '', email: '', phone: '', message: '', preferred_date: '' })
  const [errors,     setErrors]     = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)

  const setField = (k, v) => {
    setFields(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }))
  }

  const showDate = intent === 'visit' || intent === 'call'

  // ── Validation ────────────────────────────────────────────────────────────────
  function validate() {
    const errs = {}
    const t = (es, en) => lang === 'es' ? es : en
    if (!fields.name.trim())  errs.name  = t('Campo obligatorio', 'Required field')
    if (!fields.email.trim()) errs.email = t('Campo obligatorio', 'Required field')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = t('Email no válido', 'Invalid email')
    if (!fields.phone.trim()) errs.phone = t('Campo obligatorio', 'Required field')
    else if (fields.phone.replace(/\D/g, '').length < 7) errs.phone = t('Teléfono no válido', 'Invalid phone number')
    return errs
  }

  // ── Submit ────────────────────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSubmitting(true)
    const payload = {
      timestamp:           new Date().toISOString(),
      source_page:         ctx?.source ?? 'unknown',
      intent,
      unit_ids:            ctx?.unit_ids ?? [],
      primary_unit_id:     ctx?.primary_unit_id ?? null,
      comparison_unit_ids: isMulti ? (ctx?.unit_ids ?? []) : [],
      unit_snapshot:       units.map(u => ({
        unit_id: u.id, unit_name: u.name, price: u.price,
        bedrooms: u.bedrooms, built_area_m2: u.built_area_m2,
        typology: u.typology, floor: u.floor, status: u.status,
        orientation: u.orientation, terrace_area_m2: u.terrace_area_m2,
      })),
      contact: {
        name:           fields.name.trim(),
        email:          fields.email.trim(),
        phone:          fields.phone.trim(),
        preferred_date: showDate && fields.preferred_date ? fields.preferred_date : null,
        message:        fields.message.trim() || null,
      },
    }

    localStorage.setItem('tvbs_lead', JSON.stringify(payload))
    console.log('[TVBS Lead]', payload)

    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1200)
  }

  // ── No context guard ──────────────────────────────────────────────────────────
  if (!ctx || units.length === 0) {
    return (
      <PageTransition>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5"
          style={{ backgroundColor: 'var(--color-bg)' }}>
          <p className="display-heading text-text/20"
            style={{ fontSize: 'clamp(1rem,4vw,1.5rem)', letterSpacing: '0.1em', textAlign: 'center' }}>
            {lang === 'es' ? 'SELECCIONA UNA VIVIENDA PRIMERO' : 'SELECT A UNIT FIRST'}
          </p>
          <button onClick={() => navigate('/availability')} data-cursor="hover"
            className="label-luxury px-6 py-3 transition-all duration-300"
            style={{ border: '1px solid rgba(184,152,72,0.3)', color: 'rgba(184,152,72,0.6)', fontSize: '0.58rem' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,152,72,0.3)'; e.currentTarget.style.color = 'rgba(184,152,72,0.6)' }}>
            {lang === 'es' ? '← Ver disponibilidad' : '← View availability'}
          </button>
        </div>
      </PageTransition>
    )
  }

  const backPath = ctx.back_path ?? '/availability'
  const st       = primaryUnit ? STATUS_CONFIG[primaryUnit.status] : null

  return (
    <PageTransition>
      <div className="absolute inset-0 flex flex-col overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* ── Header ── */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 sm:px-10 py-4"
          style={{ borderBottom: '1px solid rgba(184,152,72,0.12)' }}>
          <button onClick={() => navigate(backPath)} data-cursor="hover"
            className="flex items-center gap-2 label-luxury transition-colors duration-300"
            style={{ color: 'rgba(244,241,234,0.45)', fontSize: '0.6rem' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,241,234,0.45)'}>
            <ChevronLeft size={14} />
            {ctx.source === 'comparator'
              ? (lang === 'es' ? 'Comparador' : 'Comparator')
              : (lang === 'es' ? 'Ficha' : 'Unit detail')
            }
          </button>
          <span className="label-luxury text-text/40 hidden sm:block" style={{ fontSize: '0.55rem' }}>
            {isMulti
              ? (lang === 'es' ? 'SOLICITUD DE INFORMACIÓN' : 'INFORMATION REQUEST')
              : `${primaryUnit?.name ?? ''} · ${lang === 'es' ? 'SOLICITUD' : 'REQUEST'}`
            }
          </span>
          <button onClick={toggle} data-cursor="hover"
            className="flex items-center gap-2 label-luxury" style={{ fontSize: '0.6rem' }}>
            <span style={{ color: lang === 'es' ? 'var(--color-text)' : 'rgba(244,241,234,0.35)' }}>ES</span>
            <span style={{ color: 'var(--color-accent)' }}>|</span>
            <span style={{ color: lang === 'en' ? 'var(--color-text)' : 'rgba(244,241,234,0.35)' }}>EN</span>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="px-6 sm:px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

            {/* ── LEFT: Unit context ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="flex flex-col gap-6">

              <div>
                <p className="label-luxury mb-4" style={labelSty}>
                  {isMulti
                    ? (lang === 'es' ? 'VIVIENDAS SELECCIONADAS' : 'SELECTED UNITS')
                    : (lang === 'es' ? 'VIVIENDA' : 'UNIT')
                  }
                </p>

                {isMulti ? (
                  // Multi-unit list (from comparator)
                  <div className="flex flex-col gap-2">
                    {units.map(u => {
                      const s = STATUS_CONFIG[u.status]
                      const isPrimary = u.id === ctx.primary_unit_id
                      return (
                        <div key={u.id}
                          className="flex items-center gap-3 py-3 px-3"
                          style={{
                            border: `1px solid ${isPrimary ? 'rgba(184,152,72,0.35)' : 'rgba(184,152,72,0.1)'}`,
                            backgroundColor: isPrimary ? 'rgba(184,152,72,0.04)' : 'transparent',
                          }}>
                          {u.hero_image && (
                            <div className="flex-shrink-0 overflow-hidden" style={{ width: 56, height: 42 }}>
                              <img src={u.hero_image} alt={u.name}
                                className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="display-heading text-text" style={{ fontSize: '0.85rem', letterSpacing: '0.06em' }}>
                                {u.name}
                              </p>
                              {isPrimary && (
                                <span className="label-luxury px-1.5 py-0.5"
                                  style={{ fontSize: '0.38rem', color: 'var(--color-accent)', border: '1px solid rgba(184,152,72,0.3)' }}>
                                  {lang === 'es' ? 'PRINCIPAL' : 'PRIMARY'}
                                </span>
                              )}
                            </div>
                            <p className="label-luxury" style={{ fontSize: '0.46rem', color: 'rgba(184,152,72,0.5)' }}>
                              {u.typology} · {u.bedrooms}{lang === 'es' ? ' dorm.' : ' beds'} · {u.built_area_m2} m²
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <span className="label-luxury px-2 py-0.5"
                              style={{ fontSize: '0.42rem', color: s.color, backgroundColor: s.bg, border: `1px solid ${s.color}` }}>
                              {lang === 'es' ? s.es : s.en}
                            </span>
                            <span className="display-heading"
                              style={{ fontSize: '0.72rem', color: u.status === 'sold' ? 'rgba(244,241,234,0.2)' : 'var(--color-accent)' }}>
                              {u.status === 'sold' ? '—' : u.price.toLocaleString('es-ES') + ' €'}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  // Single unit card
                  primaryUnit && (
                    <div style={{ border: '1px solid rgba(184,152,72,0.15)' }}>
                      {primaryUnit.hero_image && (
                        <div className="overflow-hidden" style={{ height: 160 }}>
                          <img src={primaryUnit.hero_image} alt={primaryUnit.name}
                            className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
                        </div>
                      )}
                      <div className="p-4 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="display-heading text-text" style={{ fontSize: '1.1rem', letterSpacing: '0.08em' }}>
                              {primaryUnit.name}
                            </p>
                            <p className="label-luxury mt-0.5" style={{ fontSize: '0.48rem', color: 'rgba(184,152,72,0.5)' }}>
                              {primaryUnit.typology}
                            </p>
                          </div>
                          {st && (
                            <span className="label-luxury px-2.5 py-1 flex-shrink-0"
                              style={{ fontSize: '0.44rem', color: st.color, backgroundColor: st.bg, border: `1px solid ${st.color}` }}>
                              {lang === 'es' ? st.es : st.en}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label: lang === 'es' ? 'Planta'  : 'Floor',   value: `${primaryUnit.floor}ª`           },
                            { label: lang === 'es' ? 'Dorm.'   : 'Beds',    value: primaryUnit.bedrooms               },
                            { label: lang === 'es' ? 'Sup.'    : 'Area',    value: `${primaryUnit.built_area_m2} m²` },
                            { label: lang === 'es' ? 'Orient.' : 'Orient.', value: primaryUnit.orientation            },
                          ].map(s => (
                            <div key={s.label}>
                              <p className="label-luxury" style={{ fontSize: '0.42rem', color: 'rgba(184,152,72,0.4)' }}>{s.label}</p>
                              <p className="label-luxury text-text/70" style={{ fontSize: '0.58rem' }}>{s.value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-2"
                          style={{ borderTop: '1px solid rgba(184,152,72,0.1)' }}>
                          <p className="display-heading"
                            style={{ fontSize: '1rem', color: primaryUnit.status === 'sold' ? 'rgba(244,241,234,0.2)' : 'var(--color-accent)' }}>
                            {primaryUnit.status === 'sold' ? '—' : primaryUnit.price.toLocaleString('es-ES') + ' €'}
                          </p>
                          <div className="flex gap-2">
                            {primaryUnit.parking_included && (
                              <div className="flex items-center gap-1 label-luxury"
                                style={{ fontSize: '0.44rem', color: 'rgba(184,152,72,0.5)' }}>
                                <Car size={9} style={{ color: 'var(--color-accent)' }} />
                                {lang === 'es' ? 'Garaje' : 'Parking'}
                              </div>
                            )}
                            {primaryUnit.storage_included && (
                              <div className="flex items-center gap-1 label-luxury"
                                style={{ fontSize: '0.44rem', color: 'rgba(184,152,72,0.5)' }}>
                                <Package size={9} style={{ color: 'var(--color-accent)' }} />
                                {lang === 'es' ? 'Trastero' : 'Storage'}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Commercial note — desktop only */}
              <div className="hidden lg:block" style={{ borderTop: '1px solid rgba(184,152,72,0.08)', paddingTop: '1.5rem' }}>
                <p className="label-luxury" style={{ fontSize: '0.47rem', color: 'rgba(184,152,72,0.38)', lineHeight: 1.95 }}>
                  {lang === 'es'
                    ? 'Nuestro equipo comercial revisará tu solicitud y se pondrá en contacto en un plazo máximo de 24 horas.'
                    : 'Our sales team will review your request and contact you within 24 hours.'
                  }
                </p>
              </div>
            </motion.div>

            {/* ── RIGHT: Intent + Form ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-8">

              <AnimatePresence mode="wait">
                {submitted ? (

                  // ── Success state ─────────────────────────────────────────────
                  <motion.div key="success"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                    className="flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center flex-shrink-0"
                        style={{ width: 38, height: 38, border: '1px solid var(--color-accent)' }}>
                        <Check size={16} style={{ color: 'var(--color-accent)' }} />
                      </div>
                      <div>
                        <p className="display-heading text-text"
                          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', letterSpacing: '0.1em' }}>
                          {lang === 'es' ? 'SOLICITUD ENVIADA' : 'REQUEST SENT'}
                        </p>
                        <p className="label-luxury mt-1" style={{ fontSize: '0.5rem', color: 'rgba(184,152,72,0.5)' }}>
                          {lang === 'es' ? 'Te contactaremos en breve' : "We'll be in touch shortly"}
                        </p>
                      </div>
                    </div>

                    <p className="font-sans font-light text-text/50" style={{ fontSize: '0.8rem', lineHeight: 1.85 }}>
                      {lang === 'es'
                        ? `Hemos recibido tu ${INTENTS.find(i => i.id === intent)?.es.toLowerCase() ?? 'solicitud'}${primaryUnit ? ` sobre ${isMulti ? 'las viviendas seleccionadas' : primaryUnit.name}` : ''}. Nuestro equipo se pondrá en contacto en un máximo de 24 horas.`
                        : `We've received your ${INTENTS.find(i => i.id === intent)?.en.toLowerCase() ?? 'request'}${primaryUnit ? ` regarding ${isMulti ? 'the selected units' : primaryUnit.name}` : ''}. Our team will contact you within 24 hours.`
                      }
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button onClick={() => navigate(backPath)} data-cursor="hover"
                        className="flex-1 label-luxury py-3.5 flex items-center justify-center transition-all duration-300"
                        style={{ border: '1px solid rgba(184,152,72,0.3)', color: 'rgba(184,152,72,0.6)', fontSize: '0.55rem' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,152,72,0.3)'; e.currentTarget.style.color = 'rgba(184,152,72,0.6)' }}>
                        {ctx.source === 'comparator'
                          ? (lang === 'es' ? '← Volver al comparador' : '← Back to comparator')
                          : (lang === 'es' ? '← Volver a la ficha' : '← Back to unit')
                        }
                      </button>
                      <button onClick={() => navigate('/availability')} data-cursor="hover"
                        className="flex-1 label-luxury py-3.5 flex items-center justify-center transition-all duration-300"
                        style={{ border: '1px solid rgba(184,152,72,0.12)', color: 'rgba(244,241,234,0.3)', fontSize: '0.55rem' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(184,152,72,0.3)'; e.currentTarget.style.color = 'rgba(244,241,234,0.6)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,152,72,0.12)'; e.currentTarget.style.color = 'rgba(244,241,234,0.3)' }}>
                        {lang === 'es' ? 'Ver más viviendas →' : 'Browse more units →'}
                      </button>
                    </div>
                  </motion.div>

                ) : (

                  // ── Form ─────────────────────────────────────────────────────
                  <motion.div key="form" className="flex flex-col gap-7">

                    {/* Intent selector */}
                    <div>
                      <p className="label-luxury mb-3" style={labelSty}>
                        {lang === 'es' ? 'TIPO DE CONSULTA' : 'ENQUIRY TYPE'}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {INTENTS.map(i => (
                          <button key={i.id} onClick={() => setIntent(i.id)} data-cursor="hover"
                            className="label-luxury px-3 py-3 text-left transition-all duration-200"
                            style={{
                              border: `1px solid ${intent === i.id ? 'var(--color-accent)' : 'rgba(184,152,72,0.2)'}`,
                              backgroundColor: intent === i.id ? 'rgba(184,152,72,0.07)' : 'transparent',
                              color: intent === i.id ? 'var(--color-accent)' : 'rgba(244,241,234,0.45)',
                              fontSize: '0.52rem',
                            }}>
                            {lang === 'es' ? i.es : i.en}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Fields */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

                      <Field label={lang === 'es' ? 'NOMBRE *' : 'NAME *'} error={errors.name}>
                        <input type="text" value={fields.name}
                          onChange={e => setField('name', e.target.value)}
                          placeholder={lang === 'es' ? 'Tu nombre completo' : 'Your full name'}
                          style={fieldStyle(!!errors.name)} />
                      </Field>

                      <Field label="EMAIL *" error={errors.email}>
                        <input type="email" value={fields.email}
                          onChange={e => setField('email', e.target.value)}
                          placeholder={lang === 'es' ? 'tu@email.com' : 'your@email.com'}
                          style={fieldStyle(!!errors.email)} />
                      </Field>

                      <Field label={lang === 'es' ? 'TELÉFONO *' : 'PHONE *'} error={errors.phone}>
                        <input type="tel" value={fields.phone}
                          onChange={e => setField('phone', e.target.value)}
                          placeholder={lang === 'es' ? '+34 600 000 000' : '+1 000 000 0000'}
                          style={fieldStyle(!!errors.phone)} />
                      </Field>

                      {/* Preferred date — only for visit/call */}
                      <AnimatePresence>
                        {showDate && (
                          <motion.div key="date"
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
                            style={{ overflow: 'hidden' }}>
                            <Field label={lang === 'es' ? 'FECHA PREFERIDA' : 'PREFERRED DATE'} error={null}>
                              <input type="date" value={fields.preferred_date}
                                onChange={e => setField('preferred_date', e.target.value)}
                                style={{ ...fieldStyle(false), colorScheme: 'dark' }} />
                            </Field>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Field label={lang === 'es' ? 'MENSAJE (OPCIONAL)' : 'MESSAGE (OPTIONAL)'} error={null}>
                        <textarea value={fields.message}
                          onChange={e => setField('message', e.target.value)}
                          placeholder={lang === 'es' ? 'Cualquier detalle relevante...' : 'Any relevant details...'}
                          rows={3}
                          style={{
                            width: '100%', backgroundColor: 'transparent', resize: 'none', outline: 'none',
                            border: '1px solid rgba(184,152,72,0.15)', color: 'var(--color-text)',
                            fontSize: '0.72rem', padding: '10px', lineHeight: 1.7, fontFamily: 'inherit',
                            transition: 'border-color 0.2s',
                          }} />
                      </Field>

                      {/* Mobile commercial note */}
                      <p className="label-luxury lg:hidden"
                        style={{ fontSize: '0.45rem', color: 'rgba(184,152,72,0.32)', lineHeight: 1.95 }}>
                        {lang === 'es'
                          ? 'Nuestro equipo se pondrá en contacto en un máximo de 24 horas.'
                          : 'Our team will contact you within 24 hours.'
                        }
                      </p>

                      <button type="submit" data-cursor="hover" disabled={submitting}
                        className="w-full label-luxury py-4 flex items-center justify-center gap-2 transition-opacity duration-200"
                        style={{
                          backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)',
                          fontSize: '0.6rem', letterSpacing: '0.18em',
                          opacity: submitting ? 0.6 : 1,
                        }}
                        onMouseEnter={e => { if (!submitting) e.currentTarget.style.opacity = '0.88' }}
                        onMouseLeave={e => e.currentTarget.style.opacity = submitting ? '0.6' : '1'}>
                        {submitting
                          ? (lang === 'es' ? 'ENVIANDO...' : 'SENDING...')
                          : (lang === 'es' ? SUBMIT_LABEL[intent].es : SUBMIT_LABEL[intent].en)
                        }
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </div>
    </PageTransition>
  )
}
