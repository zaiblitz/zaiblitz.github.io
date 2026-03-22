import { profile } from './profile'
import { projects } from './projects'
import { skills } from './skills'

function formatUptime(startTime) {
  const elapsed = Math.floor((Date.now() - startTime) / 1000)
  const h = String(Math.floor(elapsed / 3600)).padStart(2, '0')
  const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0')
  const s = String(elapsed % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}

const startTime = Date.now()

const quotes = [
  '"Any sufficiently advanced technology is indistinguishable from magic." — Arthur C. Clarke',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"The best way to predict the future is to invent it." — Alan Kay',
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Simplicity is the soul of efficiency." — Austin Freeman',
  '"Sometimes it is the people no one can imagine anything of who do the things no one can imagine." — Alan Turing',
]

export const commands = {
  help: () => [
    'AVAILABLE COMMANDS:',
    '  help      — Show this help menu',
    '  about     — Who am I?',
    '  career    — Mission log / career history',
    '  skills    — List core skills',
    '  projects  — List active projects',
    '  contact   — Get in touch',
    '  status    — System status report',
    '  clear     — Clear terminal',
    '  date      — Current date/time',
    '  quote     — Random quote',
  ].join('\n'),

  about: () => [
    'IDENTITY FILE:',
    `  Name     : ${profile.name}`,
    `  Role     : ${profile.title}`,
    '  Location : Philippines',
    '  Mission  : Building elegant, high-performance systems.',
    '  Focus    : Full-stack web dev (React, Laravel, Docker)',
    '  Status   : Building ZaiBlitz platform (Beacon, Atlas, Forge)',
  ].join('\n'),

  skills: () => {
    const bars = skills.map((s) => {
      const filled = Math.round(s.level / 10)
      const bar = '█'.repeat(filled) + '░'.repeat(10 - filled)
      return `  ▸ ${s.name.padEnd(22)} [${bar}] ${s.level}%`
    })
    return ['CORE CAPABILITIES:', ...bars].join('\n')
  },

  projects: () => {
    const lines = projects.map(
      (p) =>
        `  #${p.id}  ${p.name.padEnd(18)} — ${p.description.slice(0, 30)}...  [${p.status}]`
    )
    return ['PROJECT DATABASE:', ...lines].join('\n')
  },

  contact: () => [
    'COMMUNICATION CHANNELS:',
    ...profile.socialLinks.map((l) => `  ▸ ${l.label.padEnd(10)} : ${l.url}`),
  ].join('\n'),

  status: () => [
    'SYSTEM STATUS REPORT:',
    `  Uptime      : ${formatUptime(startTime)}`,
    '  Memory      : 42% utilized',
    '  CPU Load    : 17%',
    '  Encryption  : AES-256-GCM ACTIVE',
    '  Connections : SECURE',
    `  Timestamp   : ${new Date().toISOString()}`,
  ].join('\n'),

  date: () => new Date().toString(),

  quote: () => quotes[Math.floor(Math.random() * quotes.length)],
}
