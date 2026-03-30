import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLang } from '../../context/LangContext'

export default function BackButton() {
  const navigate = useNavigate()
  const { t } = useLang()

  return (
    <button
      onClick={() => navigate('/map')}
      data-cursor="hover"
      className="flex items-center gap-3 label-luxury transition-colors duration-500 group"
      style={{ color: 'var(--color-text-muted)' }}
      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
    >
      <ArrowLeft
        size={12}
        strokeWidth={1.5}
        className="transition-transform duration-500 group-hover:-translate-x-1"
      />
      {t('cta_back_map')}
    </button>
  )
}
