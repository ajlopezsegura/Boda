import { useLang } from '../../context/LangContext'

export default function SpaceHeader({ space }) {
  const { lang, t } = useLang()

  const label       = lang === 'es' ? space.label       : space.labelEN
  const description = lang === 'es' ? space.description : space.descriptionEN
  const typeLabel   = t(`space_type_${space.type}`)

  return (
    <div className="py-16 px-6 md:px-16">
      <p className="label-luxury mb-5" style={{ color: 'var(--color-accent)' }}>{typeLabel}</p>
      <h1
        className="display-heading text-text mb-6"
        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.08em' }}
      >
        {label.toUpperCase()}
      </h1>
      <div className="h-px mb-8" style={{ width: 48, backgroundColor: 'var(--color-accent)' }} />
      <p
        className="font-sans font-light max-w-xl"
        style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--color-text-muted)' }}
      >
        {description}
      </p>
    </div>
  )
}
