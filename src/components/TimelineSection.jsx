import { timeline } from '../data/timeline'

export default function TimelineSection() {
  return (
    <section className="hud-section">
      <div className="panel__header">
        <span className="panel__label">MISSION LOG // CAREER</span>
        <span className="panel__decoration">━━━━━━━━━━━━━━━━</span>
      </div>

      <div className="timeline">
        {timeline.map((entry, i) => (
          <div key={i} className="timeline-entry">
            <div className="timeline-marker">
              <div className={`timeline-dot${entry.status === 'ACTIVE' ? ' timeline-dot--active' : ''}`} />
              {i < timeline.length - 1 && <div className="timeline-line" />}
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="timeline-year">{entry.year}</span>
                <span className={`timeline-status${entry.status === 'ACTIVE' ? ' timeline-status--active' : ''}`}>
                  ● {entry.status}
                </span>
              </div>
              <h3 className="timeline-role">{entry.role}</h3>
              <span className="timeline-org">{entry.org}</span>
              <p className="timeline-desc">{entry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
