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

export function useSpace(id) {
  const { spaces } = useProject()
  return spaces.find(s => s.id === id) ?? null
}
