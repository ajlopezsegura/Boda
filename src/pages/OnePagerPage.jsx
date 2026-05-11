import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MessageCircle } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'

const ACCENT = 'var(--color-accent)'
const EASE   = [0.32, 0.72, 0.24, 1]

// Replace with the real numbers once you give them to me
const CONTACT = {
  email:    'info@thevisualsboutique.com',
  whatsapp: '+34 600 000 000',
  whatsappHref: 'https://wa.me/34600000000',
  demoUrl:  'https://demo.thevisualsboutique.com',
}

function useIsMobile(bp = 768) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < bp)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`)
    const h  = e => setM(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [bp])
  return m
}

// ─── Building blocks ──────────────────────────────────────────────────────
function Eyebrow({ children, color = 'rgba(184,152,72,0.7)' }) {
  return (
    <div className="label-luxury" style={{
      fontSize: '0.52rem', letterSpacing: '0.32em',
      color, marginBottom: 18,
    }}>
      {children}
    </div>
  )
}

function Title({ children, size = 'lg' }) {
  const fs = size === 'xl'
    ? 'clamp(1.6rem, 5vw, 2.8rem)'
    : size === 'md'
      ? 'clamp(1.1rem, 3vw, 1.5rem)'
      : 'clamp(1.3rem, 4vw, 2rem)'
  return (
    <h2 className="display-heading" style={{
      fontSize: fs,
      letterSpacing: '0.06em',
      lineHeight: 1.15,
      color: '#ffffff',
      whiteSpace: 'pre-line',
    }}>
      {children}
    </h2>
  )
}

function Rule({ width = 36 }) {
  return (
    <div style={{
      height: 1, width, backgroundColor: ACCENT,
      margin: '24px 0',
    }} />
  )
}

function Body({ children, muted = false }) {
  return (
    <p style={{
      fontSize: 'clamp(0.76rem, 2vw, 0.88rem)',
      lineHeight: 1.75,
      color: muted ? 'rgba(244,241,234,0.6)' : 'rgba(244,241,234,0.82)',
      letterSpacing: '0.01em',
    }}>
      {children}
    </p>
  )
}

function Section({ children, divider = true, mob }) {
  return (
    <section style={{
      padding: mob ? '56px 24px' : '110px 64px',
      maxWidth: 1180,
      margin: '0 auto',
      width: '100%',
      borderTop: divider ? '1px solid rgba(184,152,72,0.12)' : 'none',
    }}>
      {children}
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function OnePagerPage() {
  const navigate = useNavigate()
  const mob = useIsMobile()

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section style={{
          minHeight: mob ? '92vh' : '100vh',
          padding: mob ? '88px 24px 56px' : '120px 64px 88px',
          maxWidth: 1180, margin: '0 auto',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="label-luxury"
            style={{
              fontSize: '0.5rem', letterSpacing: '0.28em',
              color: 'rgba(184,152,72,0.6)',
            }}>
            THE VISUALS BOUTIQUE·STUDIO
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE }}>
            <Eyebrow>PERSPECTIVA</Eyebrow>
            <Title size="xl">{'LA FORMA VISIBLE\nDEL VALOR'}</Title>
            <Rule width={48} />
            <div style={{ maxWidth: 620 }}>
              <Body>
                Estudio boutique para proyectos de alto valor. Identidad,
                producción visual y sistemas de venta digital bajo una misma
                dirección — para que un producto premium se vea, se entienda y
                se venda como tal.
              </Body>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              fontSize: '0.48rem', letterSpacing: '0.22em',
              color: 'rgba(184,152,72,0.4)',
            }}
            className="label-luxury">
            MARBELLA · MADRID
          </motion.div>
        </section>

        {/* ── Why ──────────────────────────────────────────────────────── */}
        <Section mob={mob}>
          <Eyebrow>EL PROBLEMA</Eyebrow>
          <Title>{'TRES PROVEEDORES\nQUE NO SE HABLAN'}</Title>
          <Rule />
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 24 : 60, maxWidth: 980 }}>
            <Body>
              En proyectos de alto valor conviven, normalmente, una agencia de
              branding, un estudio de renders y una agencia digital. Cada uno
              aporta su pieza. Ninguna habla con las otras.
            </Body>
            <Body>
              El resultado es un proyecto premium contado con tres voces
              distintas. Se diluye la propuesta, se duplica el coste y la
              experiencia comercial queda desordenada justo donde más
              importa: la decisión de compra.
            </Body>
          </div>
        </Section>

        {/* ── Three disciplines ────────────────────────────────────────── */}
        <Section mob={mob}>
          <Eyebrow>UN MISMO EQUIPO</Eyebrow>
          <Title>{'TRES DISCIPLINAS\nUNA DIRECCIÓN'}</Title>
          <Rule />

          <div style={{
            display: 'grid',
            gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)',
            gap: mob ? 32 : 36,
            marginTop: 28,
          }}>
            {[
              {
                tag: '01 · IDENTIDAD',
                title: 'MARCA',
                body: 'Naming, sistema visual, manuales y dirección de arte. La marca del proyecto, no el adorno.',
              },
              {
                tag: '02 · PRODUCCIÓN VISUAL',
                title: 'IMAGEN',
                body: 'Renders 3D, fotografía, vídeo y motion. Cómo se ve el producto antes de existir y cómo se cuenta cuando ya existe.',
              },
              {
                tag: '03 · SISTEMA DE VENTA',
                title: 'EXPERIENCIA',
                body: 'Web, configurador, panel comercial. El recorrido del comprador y la inteligencia para el equipo que vende.',
              },
            ].map(d => (
              <div key={d.tag} style={{
                padding: '24px 0 0',
                borderTop: '1px solid rgba(184,152,72,0.22)',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <div className="label-luxury" style={{
                  fontSize: '0.48rem', letterSpacing: '0.22em',
                  color: 'rgba(184,152,72,0.7)',
                }}>
                  {d.tag}
                </div>
                <h3 className="display-heading" style={{
                  fontSize: 'clamp(1rem, 2.4vw, 1.3rem)',
                  letterSpacing: '0.08em', color: '#ffffff',
                }}>{d.title}</h3>
                <Body>{d.body}</Body>
              </div>
            ))}
          </div>

          <div style={{ marginTop: mob ? 32 : 48, maxWidth: 640 }}>
            <Body muted>
              Una misma dirección creativa atraviesa las tres disciplinas.
              No hay traspasos entre proveedores: hay un proyecto.
            </Body>
          </div>
        </Section>

        {/* ── Process ──────────────────────────────────────────────────── */}
        <Section mob={mob}>
          <Eyebrow>CÓMO TRABAJAMOS</Eyebrow>
          <Title>{'CUATRO PASOS\nUN ÚNICO HILO'}</Title>
          <Rule />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 12 }}>
            {[
              {
                n: '01',
                t: 'Descubrimiento',
                b: 'Entendemos el activo, sus públicos, sus objeciones y la decisión que necesitamos facilitar.',
              },
              {
                n: '02',
                t: 'Dirección visual',
                b: 'Marca, lenguaje y narrativa. Las decisiones que cuelgan de aquí condicionan todo lo demás.',
              },
              {
                n: '03',
                t: 'Producción',
                b: 'Renders, foto, vídeo y diseño. Material visual coherente entre canales y formatos.',
              },
              {
                n: '04',
                t: 'Sistema de venta',
                b: 'Web, configurador y panel comercial. Cada interacción del comprador deja contexto para el equipo.',
              },
            ].map((s, i) => (
              <div key={s.n} style={{
                display: 'grid',
                gridTemplateColumns: mob ? '40px 1fr' : '80px 1fr 1fr',
                gap: mob ? 16 : 48,
                padding: mob ? '20px 0' : '28px 0',
                borderBottom: '1px solid rgba(184,152,72,0.12)',
                alignItems: 'baseline',
              }}>
                <div className="label-luxury" style={{
                  fontSize: '0.55rem', letterSpacing: '0.22em',
                  color: ACCENT,
                }}>{s.n}</div>
                <h4 className="display-heading" style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
                  letterSpacing: '0.06em', color: '#ffffff',
                }}>{s.t.toUpperCase()}</h4>
                {!mob && <Body>{s.b}</Body>}
                {mob && <div style={{ gridColumn: '2 / 3' }}><Body>{s.b}</Body></div>}
              </div>
            ))}
          </div>
        </Section>

        {/* ── Case ─────────────────────────────────────────────────────── */}
        <Section mob={mob}>
          <Eyebrow>CASO DESTACADO</Eyebrow>
          <Title>{'LAS CONCHAS\nMARBELLA'}</Title>
          <Rule />
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 24 : 60, maxWidth: 980 }}>
            <Body>
              Promoción residencial de 24 unidades en primera línea de playa.
              Marca, dossier visual, renders interiores y exteriores,
              configurador de materiales y sistema de venta digital con panel
              comercial — todo bajo una misma dirección creativa.
            </Body>
            <Body muted>
              La demo recoge el recorrido completo: del relato del proyecto al
              cierre del lead cualificado, con la lectura comercial que llega
              al equipo de ventas en tiempo real.
            </Body>
          </div>

          <a href={CONTACT.demoUrl} target="_blank" rel="noopener noreferrer"
            data-cursor="hover"
            className="label-luxury"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              marginTop: 32, padding: '13px 28px',
              border: '1px solid rgba(184,152,72,0.7)',
              background: 'rgba(184,152,72,0.08)',
              color: ACCENT,
              fontSize: '0.6rem', letterSpacing: '0.22em',
              textDecoration: 'none',
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background  = 'rgba(184,152,72,0.18)'
              e.currentTarget.style.borderColor = ACCENT
              e.currentTarget.style.color       = '#ffffff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background  = 'rgba(184,152,72,0.08)'
              e.currentTarget.style.borderColor = 'rgba(184,152,72,0.7)'
              e.currentTarget.style.color       = ACCENT
            }}>
            VER DEMO COMPLETA
            <ArrowRight size={13} />
          </a>
        </Section>

        {/* ── Who we work with ─────────────────────────────────────────── */}
        <Section mob={mob}>
          <Eyebrow>PARA QUIÉN</Eyebrow>
          <Title>{'CLIENTES CON\nALGO QUE DEFENDER'}</Title>
          <Rule />
          <div style={{
            display: 'grid',
            gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: mob ? 16 : 32,
            marginTop: 12,
          }}>
            {[
              'Promotores residenciales',
              'Desarrolladores y fondos',
              'Hoteles y resorts',
              'Marcas premium',
            ].map(t => (
              <div key={t} style={{
                padding: '20px 0',
                borderTop: '1px solid rgba(184,152,72,0.22)',
              }}>
                <span className="label-luxury" style={{
                  fontSize: '0.6rem', letterSpacing: '0.14em',
                  color: 'rgba(244,241,234,0.78)',
                }}>{t}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Investment ───────────────────────────────────────────────── */}
        <Section mob={mob}>
          <Eyebrow>INVERSIÓN</Eyebrow>
          <Title>{'CADA PROYECTO\nSU PROPIO ALCANCE'}</Title>
          <Rule />
          <div style={{ maxWidth: 720 }}>
            <Body>
              No hay paquetes cerrados. Tras la primera conversación
              proponemos un alcance específico según activo, calendario y
              objetivos comerciales.
            </Body>
            <div style={{ height: 24 }} />
            <Body muted>
              Como orientación: proyectos integrados desde 15.000 €.
              Disciplinas sueltas (identidad, renders, sistema digital) según
              alcance. Mantenimiento opcional desde 400 €/mes.
            </Body>
          </div>
        </Section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section style={{
          padding: mob ? '72px 24px 96px' : '140px 64px 140px',
          maxWidth: 1180, margin: '0 auto',
          borderTop: '1px solid rgba(184,152,72,0.12)',
          textAlign: 'center',
        }}>
          <Eyebrow>SIGUIENTE PASO</Eyebrow>
          <Title size="xl">{'AGENDAR UNA\nCONVERSACIÓN'}</Title>
          <div style={{ height: 8 }} />
          <div style={{ height: 1, width: 48, backgroundColor: ACCENT, margin: '32px auto' }} />

          <div style={{
            display: 'flex',
            flexDirection: mob ? 'column' : 'row',
            gap: mob ? 14 : 18,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 12,
          }}>
            <a href={`mailto:${CONTACT.email}`} data-cursor="hover"
              className="label-luxury"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '15px 32px',
                background: ACCENT,
                color: 'var(--color-bg)',
                fontSize: '0.62rem', letterSpacing: '0.22em',
                textDecoration: 'none',
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              <Mail size={14} />
              {CONTACT.email.toUpperCase()}
            </a>

            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer"
              data-cursor="hover"
              className="label-luxury"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '15px 32px',
                border: '1px solid rgba(184,152,72,0.5)',
                background: 'transparent',
                color: ACCENT,
                fontSize: '0.62rem', letterSpacing: '0.22em',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(184,152,72,0.1)'
                e.currentTarget.style.borderColor = ACCENT
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(184,152,72,0.5)'
              }}>
              <MessageCircle size={14} />
              WHATSAPP DIRECTO
            </a>
          </div>

          <div style={{ marginTop: 56 }}>
            <span className="label-luxury" style={{
              fontSize: '0.46rem', letterSpacing: '0.28em',
              color: 'rgba(184,152,72,0.42)',
            }}>
              THE VISUALS BOUTIQUE·STUDIO
            </span>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer style={{
          padding: '32px 24px',
          textAlign: 'center',
          borderTop: '1px solid rgba(184,152,72,0.08)',
        }}>
          <span className="label-luxury" style={{
            fontSize: '0.42rem', letterSpacing: '0.22em',
            color: 'rgba(184,152,72,0.3)',
          }}>
            DOCUMENTO INTERNO · TVBS {new Date().getFullYear()}
          </span>
        </footer>
      </div>
    </PageTransition>
  )
}
