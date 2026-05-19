import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import ZoneHotspot from './ZoneHotspot'
import { useProject } from '../../context/ProjectContext'

export default function FloorPlanMap() {
  const { project, spaces } = useProject()
  const floorPlan = project?.floorPlan

  if (!floorPlan?.src) return null

  return (
    <div className="relative w-full" style={{ maxHeight: '55vh' }}>
      <TransformWrapper
        initialScale={1}
        minScale={0.8}
        maxScale={3}
        wheel={{ step: 0.1 }}
        panning={{ velocityDisabled: true }}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          contentStyle={{ position: 'relative' }}
        >
          {/* Floor plan image */}
          <img
            src={floorPlan.src}
            alt="Planta del proyecto"
            className="block max-h-[55vh] w-auto select-none"
            style={{
              filter: 'drop-shadow(0 8px 32px rgba(26,23,20,0.12))',
              maxWidth: '90vw',
            }}
            draggable={false}
          />

          {/* SVG overlay for hotspots */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            style={{ top: 0, left: 0 }}
          >
            {spaces.map(space => (
              <ZoneHotspot key={space.id} space={space} />
            ))}
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}
