import { useEffect, useState } from 'react'

function diff(target) {
  const ms = Math.max(0, target - Date.now())
  const days = Math.floor(ms / 86400000)
  const hours = Math.floor((ms % 86400000) / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return { days, hours, minutes, seconds, done: ms === 0 }
}

// Live countdown to an ISO date string (e.g. '2026-12-12T12:00:00')
export function useCountdown(dateString) {
  const target = new Date(dateString).getTime()
  const [time, setTime] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return time
}
