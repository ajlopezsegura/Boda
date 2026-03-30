import { useLang } from '../../context/LangContext'

export default function LangToggle() {
  const { lang, toggle } = useLang()

  return (
    <button
      onClick={toggle}
      data-cursor="hover"
      className="label-luxury text-ink hover:text-gold transition-colors duration-500 flex items-center gap-2"
      aria-label="Toggle language"
    >
      <span style={{ opacity: lang === 'es' ? 1 : 0.35, transition: 'opacity 0.4s' }}>ES</span>
      <span className="text-gold" style={{ fontSize: '0.5rem' }}>|</span>
      <span style={{ opacity: lang === 'en' ? 1 : 0.35, transition: 'opacity 0.4s' }}>EN</span>
    </button>
  )
}
