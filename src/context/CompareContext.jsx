import { createContext, useContext, useState } from 'react'

const CompareContext = createContext(null)
const MAX = 3

export function CompareProvider({ children }) {
  const [ids, setIds] = useState([])

  const toggle  = (id) => setIds(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : prev.length < MAX ? [...prev, id] : prev
  )
  const remove  = (id) => setIds(prev => prev.filter(x => x !== id))
  const clear   = ()   => setIds([])
  const isIn    = (id) => ids.includes(id)
  const canAdd  = (id) => !ids.includes(id) && ids.length < MAX

  return (
    <CompareContext.Provider value={{ ids, toggle, remove, clear, isIn, canAdd }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used within CompareProvider')
  return ctx
}
