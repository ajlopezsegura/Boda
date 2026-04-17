import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  computeFunnel, computeUnitScores, computeSourceDepth,
  runRules, generateReading, unitReasonText,
} from './insights'

// ─── Design tokens ───────────────────────────────────────────
const ACCENT     = '#B89848'
const COLD       = 'rgba(140,180,255,0.65)'
const GREEN      = 'rgba(91,168,120,0.85)'
const RED        = 'rgba(210,90,90,0.85)'
const GRID       = 'rgba(184,152,72,0.06)'
const TEXT_DIM   = 'rgba(244,241,234,0.4)'
const ACCENT_LOW = 'rgba(184,152,72,0.08)'

const tooltipProps = {
  contentStyle: {
    background: 'rgba(18,16,12,0.96)', border: '1px solid rgba(184,152,72,0.3)',
    fontSize: '0.65rem', letterSpacing: '0.06em', color: '#F4F1EA',
    padding: '6px 10px', borderRadius: 0,
  },
  labelStyle:  { color: 'rgba(184,152,72,0.85)', fontSize: '0.55rem', letterSpacing: '0.1em', marginBottom: 2 },
  itemStyle:   { color: '#F4F1EA', padding: 0 },
  cursor:      { stroke: 'rgba(184,152,72,0.3)', strokeDasharray: '3 3' },
}

// ─── Helpers ─────────────────────────────────────────────────
function shortDate(d) {
  return new Date(d).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
}
function lastNDays(n) {
  const arr = [], now = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now); d.setDate(d.getDate() - i); d.setHours(0,0,0,0)
    arr.push(d)
  }
  return arr
}
function groupByDay(items, getDate, days = 30) {
  return lastNDays(days).map(d => {
    const s = d.getTime(), e = s + 86400000
    return {
      date:  shortDate(d),
      count: items.filter(x => { const t = new Date(getDate(x)).getTime(); return t >= s && t < e }).length,
    }
  })
}
function formatEuro(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M€`
  if (n >= 1_000)     return `${Math.round(n / 1_000)}k€`
  return `${n}€`
}

// ─── Base card wrappers ──────────────────────────────────────
function Card({ children, style }) {
  return (
    <div style={{
      padding: '16px 18px',
      border: '1px solid rgba(184,152,72,0.1)',
      background: 'rgba(184,152,72,0.02)',
      ...style,
    }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: '0.48rem', letterSpacing: '0.2em', color: 'rgba(184,152,72,0.55)', marginBottom: 14 }}>
      {children}
    </div>
  )
}

// ─── Executive highlight card ────────────────────────────────
function HighlightCard({ label, value, sub, accent, emptyText }) {
  const isEmpty = !value && !sub
  return (
    <Card style={{
      borderColor: accent ? `${accent}33` : 'rgba(184,152,72,0.1)',
      background: accent ? `${accent}0D` : 'rgba(184,152,72,0.02)',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ fontSize: '0.48rem', letterSpacing: '0.18em', color: accent ?? 'rgba(184,152,72,0.6)' }}>
        {label}
      </div>
      {isEmpty ? (
        <div style={{ fontSize: '0.6rem', color: 'rgba(244,241,234,0.25)', lineHeight: 1.55 }}>
          {emptyText ?? 'Sin datos suficientes aún.'}
        </div>
      ) : (
        <>
          {value && (
            <div style={{
              fontSize: '1.2rem', fontWeight: 400,
              color: 'rgba(244,241,234,0.95)',
              letterSpacing: '-0.005em', lineHeight: 1.15,
            }}>
              {value}
            </div>
          )}
          {sub && (
            <div style={{
              fontSize: value ? '0.58rem' : '0.68rem',
              color: value ? 'rgba(244,241,234,0.55)' : 'rgba(244,241,234,0.82)',
              lineHeight: 1.55,
            }}>
              {sub}
            </div>
          )}
        </>
      )}
    </Card>
  )
}

// ─── Reading of the week ─────────────────────────────────────
function ReadingPanel({ reading }) {
  const blocks = [
    { label: 'Qué está pasando',  text: reading.quePasa,      color: 'rgba(244,241,234,0.75)' },
    { label: 'Qué significa',     text: reading.queSignifica, color: 'rgba(184,152,72,0.85)'  },
    { label: 'Qué harías ahora',  text: reading.queHarias,    color: GREEN                    },
  ]
  return (
    <Card>
      <SectionLabel>LECTURA DE LA SEMANA</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
        {blocks.map((b, i) => (
          <div key={b.label} style={{
            paddingLeft: i > 0 ? 20 : 0,
            paddingRight: i < blocks.length - 1 ? 20 : 0,
            borderLeft: i > 0 ? '1px solid rgba(184,152,72,0.12)' : 'none',
          }}>
            <div style={{ fontSize: '0.48rem', letterSpacing: '0.16em', color: 'rgba(184,152,72,0.55)', marginBottom: 10 }}>
              {b.label.toUpperCase()}
            </div>
            <div style={{ fontSize: '0.7rem', color: b.color, lineHeight: 1.7 }}>
              {b.text}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ─── Unit interest ranking ───────────────────────────────────
function UnitRanking({ unitScores }) {
  const top = unitScores.slice(0, 5)
  const maxScore = top[0]?.score ?? 1
  return (
    <Card>
      <SectionLabel>RANKING DE INTERÉS POR VIVIENDA</SectionLabel>
      {top.length === 0 ? (
        <div style={{ fontSize: '0.6rem', color: 'rgba(244,241,234,0.2)', padding: '16px 0' }}>
          Sin datos de navegación por vivienda todavía.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {top.map((u, i) => (
            <div key={u.unitId} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                fontSize: '0.52rem', color: 'rgba(184,152,72,0.4)',
                width: 16, flexShrink: 0, textAlign: 'right',
              }}>
                {i + 1}
              </div>
              <div style={{
                fontSize: '0.75rem', color: i === 0 ? 'var(--color-text)' : 'rgba(244,241,234,0.65)',
                fontWeight: i === 0 ? 500 : 300,
                width: 36, flexShrink: 0,
              }}>
                {u.unitId}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ height: 3, background: 'rgba(184,152,72,0.08)', marginBottom: 4 }}>
                  <div style={{
                    height: '100%',
                    width: `${(u.score / maxScore) * 100}%`,
                    background: i === 0 ? ACCENT : `rgba(184,152,72,${0.55 - i * 0.08})`,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
                <div style={{ fontSize: '0.52rem', color: 'rgba(244,241,234,0.38)', letterSpacing: '0.05em' }}>
                  {unitReasonText(u)}
                </div>
              </div>
              <div style={{
                fontSize: '0.68rem', fontWeight: 400,
                color: i === 0 ? ACCENT : 'rgba(184,152,72,0.7)',
                letterSpacing: '-0.005em',
                flexShrink: 0, width: 28, textAlign: 'right',
              }}>
                {u.score}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

// ─── Compact funnel ───────────────────────────────────────────
function CompactFunnel({ funnel }) {
  const biggestDrop = funnel
    .filter(f => f.drop != null && f.drop > 0)
    .sort((a, b) => b.drop - a.drop)[0]
  const biggestDropIdx = biggestDrop
    ? funnel.findIndex(f => f.key === biggestDrop.key)
    : -1
  const max = funnel[0]?.count ?? 1

  return (
    <Card>
      <SectionLabel>EMBUDO EJECUTIVO</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {funnel.map((step, i) => {
          const isWeak = i === biggestDropIdx
          const isGood = step.drop != null && step.drop < 20
          return (
            <div key={step.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                fontSize: '0.52rem', color: isWeak ? RED : 'rgba(244,241,234,0.4)',
                width: 124, flexShrink: 0, letterSpacing: '0.04em',
              }}>
                {step.label}
              </div>
              <div style={{ flex: 1, height: 14, background: 'rgba(184,152,72,0.06)', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: max > 0 ? `${(step.count / max) * 100}%` : '0%',
                  background: isWeak
                    ? 'rgba(210,90,90,0.4)'
                    : i === 0 ? ACCENT : `rgba(184,152,72,${0.6 - i * 0.07})`,
                  transition: 'width 0.5s ease',
                }} />
                <span style={{
                  position: 'absolute', left: 8, top: 0, bottom: 0,
                  display: 'flex', alignItems: 'center',
                  fontSize: '0.52rem', color: 'rgba(244,241,234,0.8)',
                }}>
                  {step.count} · {step.pct}%
                </span>
              </div>
              {step.drop != null && (
                <div style={{
                  width: 38, textAlign: 'right', flexShrink: 0,
                  fontSize: '0.5rem',
                  color: isWeak ? RED : isGood ? GREEN : 'rgba(244,241,234,0.3)',
                }}>
                  {step.drop > 0 ? `−${step.drop}%` : ''}
                </div>
              )}
            </div>
          )
        })}
      </div>
      {biggestDrop && (
        <div style={{
          marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(184,152,72,0.1)',
          fontSize: '0.6rem', letterSpacing: '0.04em', lineHeight: 1.55,
          color: 'rgba(244,241,234,0.55)',
        }}>
          Principal fuga entre{' '}
          <span style={{ color: 'rgba(244,241,234,0.85)' }}>{funnel[biggestDropIdx - 1]?.label.toLowerCase()}</span>
          {' '}y{' '}
          <span style={{ color: 'rgba(244,241,234,0.85)' }}>{biggestDrop.label.toLowerCase()}</span>
          {' '}—{' '}
          <span style={{ color: RED }}>{biggestDrop.drop}%</span> de pérdida.
        </div>
      )}
    </Card>
  )
}

// ─── Trend lines ─────────────────────────────────────────────
function TrendChart({ data, color, label }) {
  return (
    <Card>
      <SectionLabel>{label}</SectionLabel>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="date" stroke={TEXT_DIM} tick={{ fontSize: 10, fill: TEXT_DIM }} tickLine={false}
            axisLine={{ stroke: GRID }} interval={Math.max(0, Math.floor(data.length / 6) - 1)} />
          <YAxis stroke={TEXT_DIM} tick={{ fontSize: 10, fill: TEXT_DIM }} tickLine={false}
            axisLine={false} width={22} allowDecimals={false} />
          <Tooltip {...tooltipProps} />
          <Line type="monotone" dataKey="count" stroke={color} strokeWidth={1.5}
            dot={false} activeDot={{ r: 3, fill: color, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

// ─── Main component ───────────────────────────────────────────
export default function OverviewTab({ leads, sessions, units, mob }) {

  const funnel      = useMemo(() => computeFunnel(sessions),               [sessions])
  const unitScores  = useMemo(() => computeUnitScores(sessions, leads),     [sessions, leads])
  const sourceDepth = useMemo(() => computeSourceDepth(sessions),           [sessions])
  const rules       = useMemo(() => runRules({ sessions, leads, funnel, unitScores, sourceDepth }), [sessions, leads, funnel, unitScores, sourceDepth])
  const reading     = useMemo(() => generateReading({ sessions, leads, funnel, unitScores }),        [sessions, leads, funnel, unitScores])

  const topUnit     = unitScores[0]
  const topSource   = sourceDepth[0]
  const topRule     = rules[0]
  const biggestDrop = funnel.filter(f => f.drop != null && f.drop > 0).sort((a, b) => b.drop - a.drop)[0]
  const biggestDropPrev = biggestDrop ? funnel[funnel.findIndex(f => f.key === biggestDrop.key) - 1] : null

  // Opportunity signal
  const compareCount = sessions.filter(s => Array.isArray(s.trail) && s.trail.some(e => e.type === 'compare_add' || e.page === '/compare')).length
  const configCount  = sessions.filter(s => Array.isArray(s.trail) && s.trail.some(e => e.page?.startsWith('/inmersion/'))).length
  const formCount    = leads.length

  let signalValue = null, signalSub = null
  if (compareCount > 0 && configCount > 0 && formCount === 0) {
    signalValue = `${compareCount + configCount} acciones de alta intención`
    signalSub   = `${compareCount} comparaciones + ${configCount} en configurador, pero ningún formulario.`
  } else if (compareCount > 0 && formCount === 0) {
    signalValue = `${compareCount} comparaciones sin cierre`
    signalSub   = 'Hay interés activo, pero no se está convirtiendo en contacto.'
  } else if (configCount > 0 && formCount === 0) {
    signalValue = `${configCount} entraron en configurador`
    signalSub   = 'El configurador retiene, pero no está cerrando al formulario.'
  }

  // Trend data
  const leadsTrend    = useMemo(() => groupByDay(leads,    l => l.created_at,               30), [leads])
  const sessionsTrend = useMemo(() => groupByDay(sessions, s => s.started_at ?? s.updated_at, 30), [sessions])

  // Pipeline value
  const pipelineValue = useMemo(() => {
    let total = 0
    leads.filter(l => l.lead_temperature === 'hot').forEach(l => {
      const id = l.primary_unit_id ?? l.unit_ids?.[0]
      const unit = id ? units.find(u => u.id === id) : null
      if (unit?.price) total += unit.price
    })
    return total
  }, [leads, units])

  const weekLeads = leads.filter(l => new Date(l.created_at).getTime() >= Date.now() - 7 * 86400000).length
  const weekDelta = useMemo(() => {
    const now = Date.now(), w1 = now - 7*86400000, w2 = now - 14*86400000
    const tw = leads.filter(l => new Date(l.created_at).getTime() >= w1).length
    const lw = leads.filter(l => { const t = new Date(l.created_at).getTime(); return t >= w2 && t < w1 }).length
    if (lw === 0) return tw > 0 ? 100 : null
    return Math.round(((tw - lw) / lw) * 100)
  }, [leads])

  const conversionRate = sessions.length > 0
    ? ((leads.length / sessions.length) * 100).toFixed(1)
    : '0.0'

  const pad = mob ? '16px 16px 0' : '24px 40px 0'

  return (
    <div style={{ padding: pad, display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* ── 5 executive cards ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mob ? '1fr' : 'repeat(5, 1fr)',
        gap: 10,
      }}>
        <HighlightCard
          label="UNIDAD MÁS CALIENTE"
          value={topUnit ? `Vivienda ${topUnit.unitId}` : null}
          sub={topUnit ? unitReasonText(topUnit) : null}
          accent={ACCENT}
          emptyText="Sin datos de navegación por viviendas todavía."
        />
        <HighlightCard
          label="MAYOR FUGA"
          value={biggestDrop ? `−${biggestDrop.drop}%` : null}
          sub={biggestDropPrev ? `De ${biggestDropPrev.label.toLowerCase()} a ${biggestDrop.label.toLowerCase()}` : null}
          accent={RED}
          emptyText="Sin suficiente tráfico para detectar fugas."
        />
        <HighlightCard
          label="SEÑAL DE OPORTUNIDAD"
          value={signalValue}
          sub={signalSub}
          accent="rgba(255,180,60,0.8)"
          emptyText="Aún no hay suficiente actividad para detectar señales."
        />
        <HighlightCard
          label="FUENTE MÁS VALIOSA"
          value={topSource ? topSource.source.toUpperCase() : null}
          sub={topSource ? `Profundidad media ${topSource.avgDepth} · ${topSource.sessions} sesiones` : null}
          accent={COLD}
          emptyText="Aún no hay datos de fuentes de tráfico."
        />
        <HighlightCard
          label="ACCIÓN RECOMENDADA"
          sub={topRule?.action ?? null}
          accent={GREEN}
          emptyText="Sin actividad suficiente para recomendar una acción concreta."
        />
      </div>

      {/* ── Reading of the week ── */}
      {mob ? (
        <Card>
          <SectionLabel>LECTURA DE LA SEMANA</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'QUÉ ESTÁ PASANDO', text: reading.quePasa,      color: 'rgba(244,241,234,0.75)' },
              { label: 'QUÉ SIGNIFICA',    text: reading.queSignifica, color: 'rgba(184,152,72,0.85)'  },
              { label: 'QUÉ HARÍAS AHORA', text: reading.queHarias,    color: GREEN                    },
            ].map(b => (
              <div key={b.label}>
                <div style={{ fontSize: '0.46rem', letterSpacing: '0.14em', color: 'rgba(184,152,72,0.45)', marginBottom: 6 }}>{b.label}</div>
                <div style={{ fontSize: '0.65rem', color: b.color, lineHeight: 1.6 }}>{b.text}</div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <ReadingPanel reading={reading} />
      )}

      {/* ── Ranking + Funnel ── */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 14 }}>
        <UnitRanking unitScores={unitScores} />
        <CompactFunnel funnel={funnel} />
      </div>

      {/* ── KPI strip ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: 10,
      }}>
        {[
          { label: 'LEADS TOTALES',     value: leads.length,          sub: null,                              delta: null },
          { label: 'ESTA SEMANA',       value: weekLeads,             sub: null,                              delta: weekDelta },
          { label: 'CONVERSIÓN',        value: `${conversionRate}%`,  sub: null,                              delta: null },
          { label: 'PIPELINE CALIENTE', value: formatEuro(pipelineValue), sub: pipelineValue === 0 ? 'Sin leads calientes aún.' : null, delta: null },
        ].map(k => (
          <Card key={k.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: '0.48rem', letterSpacing: '0.15em', color: 'rgba(184,152,72,0.6)' }}>{k.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <div style={{
                fontSize: '1.35rem', fontWeight: 400,
                color: 'rgba(244,241,234,0.95)',
                letterSpacing: '-0.01em',
              }}>
                {k.value}
              </div>
              {k.delta != null && (
                <span style={{
                  fontSize: '0.55rem', letterSpacing: '0.05em',
                  color: k.delta > 0 ? 'rgba(91,168,120,0.9)' : k.delta < 0 ? 'rgba(200,90,90,0.85)' : 'rgba(244,241,234,0.3)',
                }}>
                  {k.delta > 0 ? '↑' : '↓'}{Math.abs(k.delta)}%
                </span>
              )}
            </div>
            {k.sub && (
              <div style={{ fontSize: '0.55rem', color: 'rgba(244,241,234,0.35)', lineHeight: 1.5 }}>
                {k.sub}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* ── Trend charts ── */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 14 }}>
        <TrendChart data={leadsTrend}    color={ACCENT} label="LEADS · 30 DÍAS" />
        <TrendChart data={sessionsTrend} color={COLD}   label="SESIONES · 30 DÍAS" />
      </div>

    </div>
  )
}
