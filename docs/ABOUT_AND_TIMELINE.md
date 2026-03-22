# Content System — About, Career & Terminal Commands

## Overview

Content in Z.A.I.B.L.I.T.Z. is delivered through **terminal popups** rather than static page sections. In the Legacy protocol, typing `about`, `career`, or `contact` in the interactive terminal triggers a Z.A.I.B.L.I.T.Z.-style typing popup with sound effects. The other protocols (Mark VII, Stealth, Diagnostic) have dedicated nav buttons that open the same popup system.

---

## Data Sources

| File | Content |
|------|---------|
| `src/data/about.js` | Operator dossier — bio paragraphs, focus grid (Frontend, Backend, Infra, Philosophy) |
| `src/data/timeline.js` | Career history — 5 entries from 2012 to present with roles, orgs, tags, status |
| `src/data/commands.js` | Terminal command definitions — `help`, `about`, `career`, `skills`, `projects`, `contact`, `status`, `date`, `quote`, `clear` |
| `src/data/profile.js` | Name, title, social links |
| `src/data/projects.js` | Project cards data |
| `src/data/skills.js` | Skill bars and stat numbers |

---

## How Content is Displayed

### Legacy Protocol (Standard View)
- About, career, and contact are **not** rendered as static sections
- They are triggered by typing commands in the interactive terminal (`ZAIBLITZ>`)
- Commands `about`, `career`, `contact` open a `<TerminalManager>` popup with typing animation and sound
- Other commands (`skills`, `projects`, `status`, etc.) display inline in the terminal

### Mark VII / Stealth / Diagnostic Protocols
- Nav buttons (ABOUT, CAREERS, CONTACT) trigger the same `<TerminalManager>` popup
- Each protocol has its own `terminalData` object with themed text content

---

## Terminal Commands (Legacy)

```
ZAIBLITZ> help

AVAILABLE COMMANDS:
  help      — Show this help menu
  about     — Who am I?
  career    — Mission log / career history
  skills    — List core skills
  projects  — List active projects
  contact   — Get in touch
  status    — System status report
  clear     — Clear terminal
  date      — Current date/time
  quote     — Random quote
```

---

## Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `Terminal.jsx` | `components/protocols/legacy/` | Interactive command-line with `ZAIBLITZ>` prompt |
| `TerminalManager.jsx` | `components/shared/` | Reusable typing popup with sound effects |
| `CenterPanel.jsx` | `components/protocols/legacy/` | Hosts project grid + terminal, passes popup commands |

---

## Notes

- `AboutSection.jsx` and `TimelineSection.jsx` remain in `components/protocols/legacy/` but are no longer imported — kept as reference
- The `<TerminalManager>` uses a shared `AudioContext` so typing sounds work across all protocols
- Career data in `timeline.js` uses status indicators: `ACTIVE` (current role) and `COMPLETED`
