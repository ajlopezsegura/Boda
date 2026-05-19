import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'

export default function ZoneHotspot({ space, containerWidth, containerHeight }) {
  const navigate = useNavigate()
  const { lang } = useLang()
  const [hovered, setHovered] = useState(false)

  const { hotspot } = space
  if (!hotspot) return null

  const x = `${hotspot.x}%`
  const y = `${hotspot.y}%`
  const w = `${hotspot.w}%`
  const h = `${hotspot.h}%`

  const label = lang === 'es' ? space.label : space.labelEN

  return (
    <g
      style={{ cursor: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/space/${space.id}`)}
      data-cursor="hover"
    >
      {/* Hit area */}
      <rect
        x={x} y={y} width={w} height={h}
        fill={hovered ? 'rgba(200,160,122,0.22)' : 'rgba(200,160,122,0)'}
        stroke={hovered ? 'rgba(200,160,122,0.6)' : 'rgba(200,160,122,0.25)'}
        strokeWidth="0.5"
        style={{ transition: 'fill 0.4s ease, stroke 0.4s ease' }}
        rx="0"
      />
      {/* Label on hover */}
      {hovered && (
        <text
          x={`${hotspot.x + hotspot.w / 2}%`}
          y={`${hotspot.y + hotspot.h / 2}%`}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#C8A07A"
          fontSize="1.8"
          fontFamily="Montserrat, sans-serif"
          fontWeight="300"
          letterSpacing="0.18em"
          style={{ textTransform: 'uppercase' }}
        >
          {label.toUpperCase()}
        </text>
      )}
    </g>
  )
}
