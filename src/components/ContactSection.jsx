import { useState } from 'react'
import { profile } from '../data/profile'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    // Construct mailto link as a simple no-backend solution
    const subject = encodeURIComponent(`[ZAIBLITZ] Message from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )
    const mailtoUrl = `mailto:${profile.socialLinks.find(l => l.icon === 'email').url.replace('mailto:', '')}?subject=${subject}&body=${body}`

    window.location.href = mailtoUrl
    setStatus('sent')
    setTimeout(() => setStatus(null), 4000)
  }

  return (
    <section className="hud-section">
      <div className="panel__header">
        <span className="panel__label">COMMS // CONTACT</span>
        <span className="panel__decoration">━━━━━━━━━━━━━━━━</span>
      </div>

      <p className="contact-intro">
        Open a communication channel. Send a transmission and I'll respond within 24 hours.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-field">
          <label className="contact-label" htmlFor="contact-name">CALLSIGN</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className="contact-input"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contact-field">
          <label className="contact-label" htmlFor="contact-email">FREQUENCY</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="contact-input"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contact-field">
          <label className="contact-label" htmlFor="contact-message">TRANSMISSION</label>
          <textarea
            id="contact-message"
            name="message"
            className="contact-input contact-textarea"
            placeholder="Your message..."
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="contact-submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'TRANSMITTING...' : status === 'sent' ? '✓ CHANNEL OPENED' : 'TRANSMIT ▸'}
        </button>
      </form>

      <div className="contact-alt">
        <span className="contact-alt-label">DIRECT CHANNELS:</span>
        <div className="contact-alt-links">
          {profile.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-alt-link"
            >
              [{link.label.toUpperCase()}]
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
