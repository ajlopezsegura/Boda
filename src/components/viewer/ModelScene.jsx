import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function ModelScene({ path }) {
  const { scene } = useGLTF(path)

  useEffect(() => {
    return () => {
      // Cleanup: release GPU memory when unmounted
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          mats.forEach(m => {
            Object.values(m).forEach(v => {
              if (v && typeof v.dispose === 'function') v.dispose()
            })
            m.dispose()
          })
        }
      })
    }
  }, [scene])

  return <primitive object={scene} />
}
