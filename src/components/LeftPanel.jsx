import { profile } from '../data/profile'
import SocialIcon from './SocialIcon'

export default function LeftPanel() {
  return (
    <section className="panel panel--left">
      <div className="panel__header">
        <span className="panel__label">IDENTITY</span>
        <span className="panel__decoration">━━━━━━━━</span>
      </div>

      <div className="avatar-container">
        <div className="avatar-ring">
          <svg viewBox="0 0 120 120" className="avatar-ring__svg">
            <circle cx="60" cy="60" r="56" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--secondary)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />
          </svg>
        </div>
        <div className="avatar-placeholder">{profile.avatarInitial}</div>
      </div>

      <h2 className="identity__name glow">{profile.name}</h2>
      <p className="identity__title">{profile.title}</p>
      <p className="identity__tagline">{profile.tagline}</p>

      <div className="social-links">
        {profile.socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label={link.label}
          >
            <SocialIcon name={link.icon} />
          </a>
        ))}
      </div>
    </section>
  )
}
