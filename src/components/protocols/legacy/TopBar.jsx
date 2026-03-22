import { useEffect, useState } from 'react'
import { profile } from '../../../data/profile'

export default function TopBar() {
  const [time, setTime] = useState(formatTime())

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="top-bar">
      <div className="top-bar__left">
        <span className="logo glow">{profile.name}</span>
        <span className="tagline">// PERSONAL INTERFACE</span>
      </div>
      <div className="top-bar__center">
        <span className="status-dot"></span>
        <span className="status-text">SYSTEM ONLINE</span>
      </div>
      <div className="top-bar__right">
        <span className="coordinates">{profile.location}</span>
        <span className="clock">{time}</span>
      </div>
    </header>
  )
}

function formatTime() {
  const now = new Date()
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, '0'))
    .join(':')
}
