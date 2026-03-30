import { useLang } from '../../context/LangContext'

export default function SpaceHeader({ space }) {
  const { lang, t } = useLang()

  const label = lang === 'es' ? space.label : space.labelEN
  const description = lang === 'es' ? space.description : space.descriptionEN
  const typeLabel = t(`space_type_${space.type}`)

  return (
    <div className="text-center py-16 px-6">
      <p className="label-luxury text-gold mb-5">{typeLabel}</p>
      <h1
        className="font-serif font-light italic text-ink mb-6"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
      >
        {label}
      </h1>
      <div className="gold-rule mx-auto mb-8" />
      <p
        className="font-serif font-light text-ink/70 max-w-xl mx-auto"
        style={{ fontSize: '1.1rem', lineHeight: 1.8 }}
      >
        {description}
      </p>
    </div>
  )
}
