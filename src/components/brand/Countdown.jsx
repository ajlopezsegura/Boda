import { useCountdown } from '../../hooks/useCountdown'
import { useLang } from '../../i18n'

/**
 * Cuenta atrás hasta el gran día.
 *
 * props:
 *   tone   — 'ink' sobre papel (por defecto) · 'light' sobre imagen ·
 *            'cover' claro en móvil y marino a partir de escritorio
 *   align  — 'center' (por defecto) o 'start'
 */
const TONES = {
  ink:   { num: 'text-[#1E2A44]', lbl: 'text-[rgba(30,42,68,0.45)]',   sep: 'bg-[rgba(166,129,60,0.35)]',  hoy: 'text-[#A6813C]' },
  light: { num: 'text-[#F7F3EA]', lbl: 'text-[rgba(247,243,234,0.62)]', sep: 'bg-[rgba(217,190,122,0.45)]', hoy: 'text-[#D9BE7A]' },
  cover: {
    num: 'text-[#F7F3EA] md:text-[#1E2A44]',
    lbl: 'text-[rgba(247,243,234,0.62)] md:text-[rgba(30,42,68,0.45)]',
    sep: 'bg-[rgba(217,190,122,0.45)] md:bg-[rgba(166,129,60,0.35)]',
    hoy: 'text-[#D9BE7A] md:text-[#A6813C]',
  },
}

export default function Countdown({ tone = 'ink', align = 'center', compact = false, className = '', style }) {
  const { wedding, t: tr } = useLang()
  const { days, hours, minutes, seconds, done } = useCountdown(wedding.date)
  const t = TONES[tone] || TONES.ink

  if (done) {
    return (
      <p
        className={`${t.hoy} ${className}`}
        style={{
          fontFamily: '"EB Garamond", Georgia, serif',
          fontSize: 'clamp(1.3rem, 4vw, 1.7rem)',
          textAlign: align === 'start' ? 'left' : 'center',
          ...style,
        }}
      >
        {tr.countdown.today}
      </p>
    )
  }

  const units = [
    { v: days, l: days === 1 ? tr.countdown.day : tr.countdown.days },
    { v: hours, l: tr.countdown.hours },
    { v: minutes, l: tr.countdown.min },
    { v: seconds, l: tr.countdown.sec },
  ]

  const justify = compact
    ? 'justify-between'
    : align === 'start' ? 'justify-start' : 'justify-center'

  return (
    <div
      className={`flex items-start ${justify} ${className}`}
      style={style}
      role="timer"
      aria-label={`${days} ${tr.countdown.days} ${hours} ${tr.countdown.hours} ${minutes} ${tr.countdown.min} ${seconds} ${tr.countdown.sec}`}
    >
      {units.map((u, i) => (
        <div key={u.l} className={`flex items-start ${compact ? '' : ''}`}>
          <div
            className="flex flex-col items-center"
            style={{ minWidth: compact ? '2.3rem' : 'clamp(3.1rem, 12vw, 4.2rem)' }}
          >
            <span
              className={t.num}
              style={{
                fontFamily: '"EB Garamond", Georgia, serif',
                fontSize: compact ? 'clamp(1.05rem, 3.4vw, 1.3rem)' : 'clamp(1.7rem, 6vw, 2.5rem)',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '0.01em',
              }}
            >
              {i === 0 ? u.v : String(u.v).padStart(2, '0')}
            </span>
            <span
              className={t.lbl}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: compact ? '0.38rem' : '0.44rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginTop: compact ? '0.4rem' : '0.55rem',
              }}
            >
              {u.l}
            </span>
          </div>

          {i < units.length - 1 && (
            <span
              aria-hidden="true"
              className={t.sep}
              style={{
                width: 1,
                height: compact ? '0.95rem' : 'clamp(1.5rem, 5vw, 2.1rem)',
                marginTop: 2,
                marginLeft: compact ? '0.35rem' : 0,
                marginRight: compact ? '0.35rem' : 0,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
