// ─── Scoring weights ────────────────────────────────────────
const W = {
  unit_view:    1,
  compare:      3,
  configurator: 3,
  decision:     5,
  form_submit:  8,
  return_visit: 2,
  dwell_bonus:  1,
}
const DWELL_THRESHOLD_S = 60

// ─── Funnel definition ──────────────────────────────────────
export const FUNNEL_STEPS = [
  { key: 'llegaron',     label: 'Llegaron',           check: () => true },
  { key: 'proyecto',     label: 'Vio el proyecto',    check: t => t.some(e => e.type === 'page_view' && e.page === '/proyecto') },
  { key: 'unidad',       label: 'Abrió una vivienda', check: t => t.some(e => e.type === 'page_view' && e.page?.startsWith('/availability/') && e.page !== '/availability') },
  { key: 'configurador', label: 'Configurador',       check: t => t.some(e => e.type === 'page_view' && e.page?.startsWith('/inmersion/')) },
  { key: 'comparo',      label: 'Comparó',            check: t => t.some(e => e.page === '/compare' || e.type === 'compare_add') },
  { key: 'decision',     label: 'Decisión',           check: t => t.some(e => e.type === 'page_view' && e.page === '/decision') },
  { key: 'contacto',     label: 'Formulario',         check: (_, s) => s.converted },
]

// ─── Compute funnel ──────────────────────────────────────────
export function computeFunnel(sessions) {
  const total = sessions.length
  return FUNNEL_STEPS.map(step => {
    const count = sessions.filter(s => {
      const t = Array.isArray(s.trail) ? s.trail : []
      return step.check(t, s)
    }).length
    return { key: step.key, label: step.label, count, pct: total > 0 ? Math.round((count / total) * 100) : 0 }
  }).map((item, i, arr) => ({
    ...item,
    drop: i > 0 && arr[i - 1].count > 0
      ? Math.round((1 - item.count / arr[i - 1].count) * 100)
      : null,
  }))
}

// ─── Unit interest scores ────────────────────────────────────
export function computeUnitScores(sessions, leads) {
  const scores  = {}
  const reasons = {}

  function ensure(id) {
    const k = String(id)
    if (!scores[k])  scores[k]  = 0
    if (!reasons[k]) reasons[k] = { views: 0, compares: 0, config: 0, decision: 0, leads: 0 }
    return k
  }

  sessions.forEach(s => {
    const trail     = Array.isArray(s.trail) ? s.trail : []
    const isReturn  = (s.visit_number ?? 1) > 1
    const rBonus    = isReturn ? W.return_visit : 0

    trail.forEach(e => {
      // Unit page views
      if (e.type === 'page_view' && e.page?.startsWith('/availability/')) {
        const id = e.page.replace('/availability/', '')
        if (!id || id === 'availability') return
        const k = ensure(id)
        scores[k] += W.unit_view + rBonus
        if (e.duration_ms && e.duration_ms / 1000 > DWELL_THRESHOLD_S) scores[k] += W.dwell_bonus
        reasons[k].views++
      }
      // Compare events
      if (e.type === 'compare_add' && e.unit_id) {
        const k = ensure(e.unit_id)
        scores[k] += W.compare
        reasons[k].compares++
      }
      // Configurator
      if (e.type === 'page_view' && e.page?.startsWith('/inmersion/')) {
        const id = e.page.replace('/inmersion/', '')
        if (!id) return
        const k = ensure(id)
        scores[k] += W.configurator
        reasons[k].config++
      }
    })

    // Decision bonus to all units viewed in that session
    const hasDecision = trail.some(e => e.type === 'page_view' && e.page === '/decision')
    if (hasDecision) {
      const visited = [...new Set(
        trail
          .filter(e => e.type === 'page_view' && e.page?.startsWith('/availability/'))
          .map(e => e.page.replace('/availability/', ''))
          .filter(Boolean)
      )]
      visited.forEach(id => {
        const k = ensure(id)
        scores[k] += W.decision
        reasons[k].decision++
      })
    }
  })

  // Lead submissions
  leads.forEach(l => {
    const id = l.primary_unit_id ?? l.unit_ids?.[0]
    if (!id) return
    const k = ensure(id)
    scores[k] += W.form_submit
    reasons[k].leads++
  })

  return Object.entries(scores)
    .map(([unitId, score]) => ({ unitId, score, ...reasons[unitId] }))
    .sort((a, b) => b.score - a.score)
}

// ─── Unit reason label ───────────────────────────────────────
export function unitReasonText(r) {
  if (!r) return 'Actividad detectada'
  const p = []
  if (r.leads   > 0)  p.push('formulario enviado')
  if (r.decision > 0) p.push('llevó a decisión')
  if (r.config  > 0)  p.push('en configurador')
  if (r.compares > 0) p.push('comparada')
  if (r.views   > 1)  p.push(`${r.views} vistas`)
  return p.length ? p.join(' · ') : 'Interés detectado'
}

// ─── Traffic depth score by source ──────────────────────────
export function computeSourceDepth(sessions) {
  const totals = {}, counts = {}

  sessions.forEach(s => {
    const trail = Array.isArray(s.trail) ? s.trail : []
    const src   = s.referrer || trail.find(e => e.type === 'device_info')?.referrer || 'directo'

    let depth = 1
    trail.forEach(e => {
      if (e.type !== 'page_view') return
      if (e.page === '/proyecto')                                  depth += 1
      if (e.page?.startsWith('/availability/') && e.page !== '/availability') depth += 2
      if (e.page === '/compare')                                   depth += 3
      if (e.page?.startsWith('/inmersion/'))                       depth += 3
      if (e.page === '/decision')                                  depth += 4
    })
    trail.filter(e => e.type === 'compare_add').forEach(() => { depth += 3 })
    if (s.converted) depth += 6

    totals[src] = (totals[src] ?? 0) + depth
    counts[src] = (counts[src] ?? 0) + 1
  })

  return Object.entries(totals)
    .map(([source, total]) => ({
      source,
      avgDepth: parseFloat((total / counts[source]).toFixed(1)),
      sessions: counts[source],
    }))
    .sort((a, b) => b.avgDepth - a.avgDepth)
}

// ─── Rule engine ─────────────────────────────────────────────
export function runRules({ sessions, leads, funnel, unitScores, sourceDepth }) {
  const total        = sessions.length
  const formCount    = leads.length
  const compareCount = sessions.filter(s => Array.isArray(s.trail) && s.trail.some(e => e.type === 'compare_add' || e.page === '/compare')).length
  const configCount  = sessions.filter(s => Array.isArray(s.trail) && s.trail.some(e => e.page?.startsWith('/inmersion/'))).length
  const decisionCount= sessions.filter(s => Array.isArray(s.trail) && s.trail.some(e => e.page === '/decision')).length
  const uniqueVids   = new Set(sessions.map(s => s.visitor_id).filter(Boolean))
  const returningCount = [...uniqueVids].filter(vid =>
    sessions.filter(s => s.visitor_id === vid).length > 1
  ).length

  const rules = []

  // R1 — compare with no forms
  if (compareCount > 0 && formCount === 0) rules.push({
    priority: 5,
    insight:  `${compareCount} ${compareCount === 1 ? 'persona comparó' : 'personas compararon'}, pero nadie dejó formulario.`,
    action:   'Reforzar el CTA al final de la comparativa y en la ficha de vivienda.',
  })

  // R2 — configurator retains, not enough decision
  if (configCount > 0 && decisionCount < configCount * 0.3) rules.push({
    priority: 4,
    insight:  `El configurador está reteniendo (${configCount} sesiones), pero pocas avanzan a decisión.`,
    action:   'Añadir un CTA claro desde el configurador hacia ficha o formulario.',
  })

  // R3 — returning users, no leads
  if (returningCount >= 3 && formCount === 0) rules.push({
    priority: 5,
    insight:  `${returningCount} visitantes han vuelto, pero no hay formularios.`,
    action:   'Priorizar remarketing o mejorar el momento de contacto en segunda visita.',
  })

  // R4 — one unit dominates
  if (unitScores.length >= 2 && unitScores[0].score >= unitScores[1].score * 1.5) rules.push({
    priority: 3,
    insight:  `La vivienda ${unitScores[0].unitId} concentra el interés notablemente.`,
    action:   'Usarla como ancla comercial y revisar si el resto del catálogo tiene suficiente visibilidad.',
  })

  // R5 — direct traffic dominant
  if (sourceDepth.length > 0 && sourceDepth[0].source === 'directo' && sourceDepth[0].sessions > total * 0.65) rules.push({
    priority: 2,
    insight:  'El tráfico depende casi exclusivamente de acceso directo.',
    action:   'No invertir aún en tráfico de pago. Optimizar primero el recorrido actual.',
  })

  // R6 — high sessions, zero conversion
  if (total >= 10 && formCount === 0) rules.push({
    priority: 4,
    insight:  `${total} sesiones activas, cero formularios enviados.`,
    action:   'Revisar visibilidad del formulario y si el CTA está bien posicionado.',
  })

  // R7 — biggest funnel drop
  const biggestDrop = funnel
    .filter(f => f.drop != null && f.drop >= 50)
    .sort((a, b) => b.drop - a.drop)[0]
  if (biggestDrop) {
    const prev = funnel[funnel.findIndex(f => f.key === biggestDrop.key) - 1]
    rules.push({
      priority: 4,
      insight:  `La mayor pérdida es de "${prev?.label}" a "${biggestDrop.label}" (−${biggestDrop.drop}%).`,
      action:   `Revisar la transición: ¿falta motivación, contenido o claridad de siguiente paso?`,
    })
  }

  return rules.sort((a, b) => b.priority - a.priority)
}

// ─── Reading of the week ─────────────────────────────────────
export function generateReading({ sessions, leads, funnel, unitScores }) {
  const total        = sessions.length
  const formCount    = leads.length
  const compareCount = sessions.filter(s => Array.isArray(s.trail) && s.trail.some(e => e.type === 'compare_add' || e.page === '/compare')).length

  const biggestDrop = funnel
    .filter(f => f.drop != null && f.drop > 0)
    .sort((a, b) => b.drop - a.drop)[0]
  const prevOfBiggest = biggestDrop
    ? funnel[funnel.findIndex(f => f.key === biggestDrop.key) - 1]
    : null

  if (total === 0) return {
    quePasa:      'Aún no hay actividad registrada en el panel.',
    queSignifica: 'El panel se irá completando conforme lleguen visitantes.',
    queHarias:    'Asegúrate de que el enlace al site está circulando.',
  }

  let quePasa
  if (biggestDrop && biggestDrop.drop >= 50 && prevOfBiggest) {
    quePasa = `La gente llega y explora, pero hay una caída fuerte entre "${prevOfBiggest.label}" y "${biggestDrop.label}" (−${biggestDrop.drop}%).`
  } else if (compareCount > 0 && formCount === 0) {
    quePasa = `Hay exploración activa — ${compareCount} comparaciones — pero ningún formulario enviado todavía.`
  } else if (formCount > 0) {
    const rate = total > 0 ? ((formCount / total) * 100).toFixed(1) : '0'
    quePasa = `${formCount} ${formCount === 1 ? 'formulario recibido' : 'formularios recibidos'} sobre ${total} sesiones — tasa del ${rate}%.`
  } else {
    quePasa = `${total} sesiones con exploración activa. Sin conversiones registradas todavía.`
  }

  let queSignifica
  if (formCount > 0 && total > 0 && formCount / total > 0.05) {
    queSignifica = 'La tasa de conversión es sólida para un producto de alta consideración. El embudo está funcionando.'
  } else if (compareCount > 0 && formCount === 0) {
    queSignifica = 'Hay intención real — comparar es un gesto de alto interés — pero el recorrido no está cerrando en el último paso.'
  } else if (biggestDrop && biggestDrop.drop >= 60) {
    queSignifica = `La experiencia entre "${prevOfBiggest?.label}" y "${biggestDrop?.label}" está rompiendo el flujo. Ahí está la mayor pérdida de oportunidad.`
  } else {
    queSignifica = 'El tráfico llega, pero todavía no hay señales fuertes de intención de compra. Es pronto para sacar conclusiones.'
  }

  let queHarias
  if (compareCount > 0 && formCount === 0) {
    queHarias = 'Reforzar el CTA en la comparativa y en la ficha. ¿Es fácil llegar al formulario desde esas páginas?'
  } else if (biggestDrop && biggestDrop.drop >= 50) {
    queHarias = `Revisar la transición hacia "${biggestDrop.label}". Valorar si falta motivación, claridad o un empujón directo al contacto.`
  } else if (formCount === 0 && total >= 10) {
    queHarias = 'Revisar visibilidad del formulario y si el momento de contacto está bien ubicado en el recorrido.'
  } else {
    queHarias = 'Esperar más datos antes de cambiar nada estructural. Dejar que el tráfico orgánico genere señal.'
  }

  return { quePasa, queSignifica, queHarias }
}
