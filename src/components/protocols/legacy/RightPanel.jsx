import { useEffect, useRef } from 'react'
import { skills, stats } from '../../../data/skills'

export default function RightPanel({ animate }) {
  return (
    <section className="panel panel--right fade-in-panel">
      <div className="panel__header">
        <span className="panel__label">CAPABILITIES</span>
        <span className="panel__decoration">━━━━━━━━━━</span>
      </div>

      <div className="skill-bars">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-bar">
            <div className="skill-bar__label">
              <span>{skill.name}</span>
              <span className="skill-bar__pct">{skill.level}%</span>
            </div>
            <div className="skill-bar__track">
              <div
                className={`skill-bar__fill${animate ? ' animate' : ''}`}
                style={{ '--level': `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatBox key={stat.label} target={stat.target} label={stat.label} animate={animate} />
        ))}
      </div>
    </section>
  )
}

function StatBox({ target, label, animate }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!animate || !ref.current) return
    let current = 0
    const step = Math.max(1, Math.floor(target / 40))
    const id = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(id)
      }
      if (ref.current) ref.current.textContent = current.toLocaleString()
    }, 30)
    return () => clearInterval(id)
  }, [animate, target])

  return (
    <div className="stat-box">
      <span className="stat-box__value" ref={ref}>0</span>
      <span className="stat-box__label">{label}</span>
    </div>
  )
}
