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
      className="flex items-center gap-3 label-luxury text-ink hover:text-gold transition-colors duration-500 group"
    >
      <ArrowLeft
        size={12}
        className="transition-transform duration-500 group-hover:-translate-x-1"
        strokeWidth={1.5}
      />
      {t('cta_back_map')}
    </button>
  )
}
