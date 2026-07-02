import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shirt, Gift, ChevronDown, Copy, Check } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import wedding from '../data/wedding'

const ease = [0.43, 0.13, 0.23, 0.96]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(184,152,72,0.14)' }}>
      <button
        onClick={onToggle}
        data-cursor="hover"
        className="w-full flex items-center gap-3 py-4 text-left"
      >
        <span className="flex-1 text-text" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', fontWeight: 500 }}>
          {item.q}
        </span>
        <ChevronDown
          size={15}
          style={{ color: 'var(--color-accent)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="font-sans font-light pb-4" style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--color-text-muted)' }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function InfoPage() {
  const { info } = wedding
  const [openFaq, setOpenFaq] = useState(null)
  const [copied, setCopied] = useState(false)

  function copyAccount() {
    navigator.clipboard?.writeText(info.gift.account.replace(/\s/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PageScaffold
      kicker="Antes de embarcar"
      title="Información práctica"
      subtitle="Los detalles que te ayudarán a disfrutar del día sin sorpresas."
      maxWidth={760}
    >
      {/* Dress code + gift */}
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="p-6"
          style={{ border: '1px solid rgba(184,152,72,0.2)', backgroundColor: 'var(--color-bg-card)' }}
        >
          <Shirt size={18} strokeWidth={1.3} style={{ color: 'var(--color-accent)' }} />
          <h3 className="label-luxury text-accent mt-3 mb-2" style={{ fontSize: '0.58rem' }}>{info.dressCode.title}</h3>
          <p className="text-text mb-2" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontWeight: 500 }}>
            {info.dressCode.value}
          </p>
          <p className="font-sans font-light" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
            {info.dressCode.note}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease }}
          className="p-6 flex flex-col"
          style={{ border: '1px solid rgba(184,152,72,0.2)', backgroundColor: 'var(--color-bg-card)' }}
        >
          <Gift size={18} strokeWidth={1.3} style={{ color: 'var(--color-accent)' }} />
          <h3 className="label-luxury text-accent mt-3 mb-2" style={{ fontSize: '0.58rem' }}>{info.gift.title}</h3>
          <p className="font-sans font-light mb-4" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
            {info.gift.note}
          </p>
          <div className="mt-auto p-3" style={{ border: '1px dashed rgba(184,152,72,0.35)' }}>
            <span className="label-luxury" style={{ fontSize: '0.44rem', color: 'var(--color-accent)' }}>{info.gift.concept}</span>
            <div className="flex items-center justify-between gap-2 mt-1.5">
              <span className="text-text" style={{ fontSize: '0.78rem', letterSpacing: '0.04em', fontFamily: 'monospace' }}>
                {info.gift.account}
              </span>
              <button onClick={copyAccount} data-cursor="hover" aria-label="Copiar cuenta"
                style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FAQ */}
      <span className="label-luxury text-accent" style={{ fontSize: '0.58rem', letterSpacing: '0.22em' }}>Preguntas frecuentes</span>
      <div className="mt-4">
        {info.faq.map((item, i) => (
          <FaqItem
            key={item.q}
            item={item}
            isOpen={openFaq === i}
            onToggle={() => setOpenFaq(openFaq === i ? null : i)}
          />
        ))}
      </div>
    </PageScaffold>
  )
}
