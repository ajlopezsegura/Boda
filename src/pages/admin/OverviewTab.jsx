import { useMemo } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = {
  accent:    '#B89848',
  accentDim: 'rgba(184,152,72,0.35)',
  accentLow: 'rgba(184,152,72,0.08)',
  hot:       'rgba(255,140,0,0.85)',
  cold:      'rgba(140,180,255,0.65)',
  textDim:   'rgba(244,241,234,0.4)',
  grid:      'rgba(184,152,72,0.06)',
}

function shortDate(d) {
  return new Date(d).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
}

function lastNDays(n) {
  const arr = []
  const now = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    d.setHours(0, 0, 0, 0)
    arr.push(d)
  }
  return arr
}

function groupByDay(items, getDate, days = 30) {
  const dates = lastNDays(days)
  return dates.map(d => {
    const dayStart = d.getTime()
    const dayEnd   = dayStart + 86400000
    const count = items.filter(item => {
      const raw = getDate(item)
      if (!raw) return false
      const t = new Date(raw).getTime()
      return t >= dayStart && t < dayEnd
    }).length
    return { date: shortDate(d), count }
  })
}

export default function OverviewTab({ leads, sessions, units, mob }) {

  const leadsTrend = useMemo(
    () => groupByDay(leads, l => l.created_at, 30),
    [leads]
  )

  const sessionsTrend = useMemo(
    () => groupByDay(sessions, s => s.started_at ?? s.updated_at, 30),
    [sessions]
  )

  const conversionRate = useMemo(() => {
    if (sessions.length === 0) return '0.0'
    return ((leads.length / sessions.length) * 100).toFixed(1)
  }, [leads, sessions])

  const weekDelta = useMemo(() => {
    const now = Date.now()
    const weekAgo     = now - 7  * 86400000
    const twoWeeksAgo = now - 14 * 86400000
    const thisWeek = leads.filter(l => new Date(l.created_at).getTime() >= weekAgo).length
    const lastWeek = leads.filter(l => {
      const t = new Date(l.created_at).getTime()
      return t >= twoWeeksAgo && t < weekAgo
    }).length
    if (lastWeek === 0) return thisWeek > 0 ? 100 : null
    return Math.round(((thisWeek - lastWeek) / lastWeek) * 100)
  }, [leads])

  const pipelineValue = useMemo(() => {
    const hot = leads.filter(l => l.lead_temperature === 'hot')
    let total = 0
    hot.forEach(l => {
      const unitId = l.primary_unit_id ?? l.unit_ids?.[0]
      if (unitId) {
        const unit = units.find(u => u.id === unitId)
        if (unit?.price) total += unit.price
      }
    })
    return total
  }, [leads, units])

  const topSources = useMemo(() => {
    const counts = {}
    sessions.forEach(s => {
      const src = (s.referrer || 'directo').toUpperCase()
      counts[src] = (counts[src] || 0) + 1
    })
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [sessions])

  const weekLeads = leads.filter(l =>
    new Date(l.created_at).getTime() >= Date.now() - 7 * 86400000
  ).length

  return (
    <div style={{ padding: mob ? '16px 16px 0' : '24px 40px 0' }}>

      {/* KPI row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: mob ? 8 : 14,
        marginBottom: mob ? 14 : 22,
      }}>
        <KPICard label="LEADS TOTALES" value={leads.length} />
        <KPICard label="ESTA SEMANA" value={weekLeads} delta={weekDelta} />
        <KPICard label="CONVERSIÓN" value={`${conversionRate}%`} />
        <KPICard
          label="PIPELINE CALIENTE"
          value={pipelineValue > 0 ? formatEuro(pipelineValue) : '—'}
        />
      </div>

      {/* Trends */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mob ? '1fr' : '1fr 1fr',
        gap: 14,
        marginBottom: 14,
      }}>
        <ChartCard title="LEADS · ÚLTIMOS 30 DÍAS">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={leadsTrend} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
              <CartesianGrid stroke={COLORS.grid} vertical={false} />
              <XAxis
                dataKey="date"
                stroke={COLORS.textDim}
                tick={{ fontSize: 10, fill: COLORS.textDim }}
                tickLine={false}
                axisLine={{ stroke: COLORS.grid }}
                interval={Math.max(0, Math.floor(leadsTrend.length / 6) - 1)}
              />
              <YAxis
                stroke={COLORS.textDim}
                tick={{ fontSize: 10, fill: COLORS.textDim }}
                tickLine={false}
                axisLine={false}
                width={22}
                allowDecimals={false}
              />
              <Tooltip {...tooltipProps} />
              <Line
                type="monotone"
                dataKey="count"
                stroke={COLORS.accent}
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 3, fill: COLORS.accent, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="SESIONES · ÚLTIMOS 30 DÍAS">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={sessionsTrend} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
              <CartesianGrid stroke={COLORS.grid} vertical={false} />
              <XAxis
                dataKey="date"
                stroke={COLORS.textDim}
                tick={{ fontSize: 10, fill: COLORS.textDim }}
                tickLine={false}
                axisLine={{ stroke: COLORS.grid }}
                interval={Math.max(0, Math.floor(sessionsTrend.length / 6) - 1)}
              />
              <YAxis
                stroke={COLORS.textDim}
                tick={{ fontSize: 10, fill: COLORS.textDim }}
                tickLine={false}
                axisLine={false}
                width={22}
                allowDecimals={false}
              />
              <Tooltip {...tooltipProps} />
              <Line
                type="monotone"
                dataKey="count"
                stroke={COLORS.cold}
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 3, fill: COLORS.cold, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top sources */}
      <ChartCard title="TOP FUENTES DE TRÁFICO">
        {topSources.length === 0 ? (
          <div style={{
            padding: '40px 0', textAlign: 'center',
            color: 'rgba(244,241,234,0.2)',
            fontSize: '0.6rem', letterSpacing: '0.1em',
          }}>
            AÚN NO HAY DATOS
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={Math.max(140, topSources.length * 36)}>
            <BarChart
              data={topSources}
              layout="vertical"
              margin={{ top: 4, right: 24, bottom: 4, left: 0 }}
            >
              <CartesianGrid stroke={COLORS.grid} horizontal={false} />
              <XAxis
                type="number"
                stroke={COLORS.textDim}
                tick={{ fontSize: 10, fill: COLORS.textDim }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke={COLORS.textDim}
                tick={{ fontSize: 10, fill: COLORS.textDim }}
                tickLine={false}
                axisLine={false}
                width={90}
              />
              <Tooltip {...tooltipProps} cursor={{ fill: COLORS.accentLow }} />
              <Bar dataKey="count" fill={COLORS.accent} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  )
}

/* ─── Helpers ──────────────────────────────── */

function formatEuro(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M€`
  if (n >= 1_000)     return `${Math.round(n / 1_000)}k€`
  return `${n}€`
}

function KPICard({ label, value, delta }) {
  const deltaColor =
    delta == null             ? 'rgba(244,241,234,0.3)' :
    delta > 0                 ? 'rgba(91,168,120,0.9)'  :
    delta < 0                 ? 'rgba(200,100,100,0.85)' :
                                'rgba(244,241,234,0.35)'

  return (
    <div style={{
      padding: '14px 18px',
      border: '1px solid rgba(184,152,72,0.12)',
      background: 'rgba(184,152,72,0.025)',
    }}>
      <div style={{
        fontSize: '0.5rem', letterSpacing: '0.15em',
        color: 'rgba(184,152,72,0.6)', marginBottom: 8,
      }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
        <div style={{
          fontSize: '1.3rem', color: 'var(--color-text)',
          fontWeight: 300, letterSpacing: '0.03em',
        }}>{value}</div>
        {delta != null && (
          <span style={{
            fontSize: '0.58rem', letterSpacing: '0.06em', color: deltaColor,
            display: 'inline-flex', alignItems: 'center', gap: 2,
          }}>
            {delta > 0 ? '↑' : delta < 0 ? '↓' : '·'}
            {Math.abs(delta)}% vs semana anterior
          </span>
        )}
      </div>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div style={{
      padding: '16px 18px',
      border: '1px solid rgba(184,152,72,0.08)',
      background: 'rgba(184,152,72,0.015)',
    }}>
      <div style={{
        fontSize: '0.5rem', letterSpacing: '0.18em',
        color: 'rgba(184,152,72,0.55)', marginBottom: 14,
      }}>{title}</div>
      {children}
    </div>
  )
}

const tooltipProps = {
  contentStyle: {
    background: 'rgba(18,16,12,0.96)',
    border: '1px solid rgba(184,152,72,0.3)',
    fontSize: '0.65rem',
    letterSpacing: '0.06em',
    color: '#F4F1EA',
    padding: '6px 10px',
    borderRadius: 0,
  },
  labelStyle: {
    color: 'rgba(184,152,72,0.85)',
    fontSize: '0.55rem',
    letterSpacing: '0.1em',
    marginBottom: 2,
  },
  itemStyle: { color: '#F4F1EA', padding: 0 },
  cursor: { stroke: 'rgba(184,152,72,0.3)', strokeDasharray: '3 3' },
}
