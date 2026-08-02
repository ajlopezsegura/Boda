import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import { SectionLabel } from '../components/brand/decor'
import { useLang } from '../i18n'

const ease = [0.43, 0.13, 0.23, 0.96]

export default function InfoPage() {
  const { wedding, t } = useLang()
  const { info } = wedding
  const [copied, setCopied] = useState(false)

  function copyAccount() {
    navigator.clipboard?.writeText(info.gift.account.replace(/\s/g, ''))
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PageScaffold
      align="center"
      title={<>{t.titles.info[0]}<span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{t.titles.info[1]}</span></>}
      subtitle={t.subtitles.info}
      maxWidth={760}
    >
      {/* Mismo ritmo que El viaje: rótulo de sección centrado, el contenido
          debajo y aire entre bloques. */}
      <div><SectionLabel>{t.dressCode}</SectionLabel></div>
      <motion.div
        initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        className="mt-6 text-center"
      >
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--navy)' }}>
          {info.dressCode.value}
        </p>
        {info.dressCode.note && (
          <p className="mt-4 mx-auto" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-muted)', maxWidth: 560 }}>
            {info.dressCode.note}
          </p>
        )}
      </motion.div>

      <div className="mt-16"><SectionLabel>{t.gift}</SectionLabel></div>
      <motion.div
        initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        className="mt-6 flex flex-col items-center"
      >
        <p className="text-center mx-auto" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-muted)', maxWidth: 560 }}>
          {info.gift.note}
        </p>
        <div className="mt-7 p-4" style={{ border: '1px solid var(--hairline)', width: 'min(100%, 340px)' }}>
          <span className="eyebrow block text-center" style={{ color: 'var(--gold)', fontSize: '0.42rem' }}>{info.gift.concept}</span>
          <div className="flex items-center justify-between gap-2 mt-2">
            <span className="data" style={{ color: 'var(--navy)', fontSize: '0.72rem' }}>{info.gift.account}</span>
            <button onClick={copyAccount} data-cursor="hover" aria-label={t.copyAccount} style={{ color: 'var(--gold)', flexShrink: 0 }}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </motion.div>
    </PageScaffold>
  )
}
