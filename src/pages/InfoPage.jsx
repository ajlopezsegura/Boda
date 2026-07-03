import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import { SectionLabel } from '../components/brand/decor'
import wedding from '../data/wedding'

const ease = [0.43, 0.13, 0.23, 0.96]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid var(--hairline)' }}>
      <button onClick={onToggle} data-cursor="hover" className="w-full flex items-center gap-3 py-5 text-left">
        <span className="flex-1 display" style={{ color: 'var(--navy)', fontSize: '1.35rem' }}>{item.q}</span>
        <span style={{ color: 'var(--gold)', fontSize: '1.2rem', lineHeight: 1, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}>
            <p className="pb-5" style={{ fontSize: '1.02rem', lineHeight: 1.75, color: 'var(--ink-muted)', maxWidth: 620 }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function InfoPage() {
  const { info } = wedding
  const [openFaq, setOpenFaq] = useState(0)
  const [copied, setCopied] = useState(false)

  function copyAccount() {
    navigator.clipboard?.writeText(info.gift.account.replace(/\s/g, ''))
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PageScaffold
      index="04"
      eyebrow="Antes de volar"
      title={<>Buen <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>viaje</span></>}
      subtitle="Los detalles que te ayudarán a disfrutar del día sin sorpresas."
      maxWidth={760}
    >
      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12 mb-16">
        {/* Dress code */}
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}>
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Dress code</span>
          <p className="display my-3" style={{ color: 'var(--navy)', fontSize: 'clamp(2rem, 6vw, 2.6rem)', lineHeight: 1 }}>{info.dressCode.value}</p>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>{info.dressCode.note}</p>
        </motion.div>

        {/* Regalo */}
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08, ease }} className="flex flex-col">
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Un detalle</span>
          <p className="mt-3 mb-5" style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>{info.gift.note}</p>
          <div className="mt-auto p-4" style={{ border: '1px solid var(--hairline)' }}>
            <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.42rem' }}>{info.gift.concept}</span>
            <div className="flex items-center justify-between gap-2 mt-2">
              <span className="data" style={{ color: 'var(--navy)', fontSize: '0.72rem' }}>{info.gift.account}</span>
              <button onClick={copyAccount} data-cursor="hover" aria-label="Copiar cuenta" style={{ color: 'var(--gold)', flexShrink: 0 }}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <SectionLabel>Preguntas frecuentes</SectionLabel>
      <div className="mt-6">
        {info.faq.map((item, i) => (
          <FaqItem key={item.q} item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
        ))}
      </div>
    </PageScaffold>
  )
}
