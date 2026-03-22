import { about } from '../../../data/about'

export default function AboutSection() {
  return (
    <section className="hud-section">
      <div className="panel__header">
        <span className="panel__label">ABOUT // DOSSIER</span>
        <span className="panel__decoration">━━━━━━━━━━━━━━━━</span>
      </div>

      <div className="about-content">
        {about.paragraphs.map((p, i) => (
          <p key={i} className="about-paragraph">{p}</p>
        ))}
      </div>

      <div className="about-focus-grid">
        {about.focus.map((item) => (
          <div key={item.label} className="about-focus-item">
            <span className="about-focus-label">{item.label}</span>
            <span className="about-focus-value">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
