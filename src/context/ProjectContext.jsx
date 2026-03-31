import { createContext, useContext } from 'react'
import projectData from '../data/project.json'

const ProjectContext = createContext(null)

export function ProjectProvider({ children }) {
  return (
    <ProjectContext.Provider value={projectData}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProject must be used within ProjectProvider')
  return ctx
}

export function useUnit(id) {
  const { units } = useProject()
  return units?.find(u => u.id === id) ?? null
}
