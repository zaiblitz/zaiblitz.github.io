# Personal Website — Jarvis/Iron Man HUD Theme

## Vision

A futuristic, immersive single-page personal website inspired by the Iron Man / J.A.R.V.I.S. HUD interface. Think holographic displays, glowing neon elements, animated data streams, and a dark tactical command-center aesthetic.

---

## Design Language

### Color Palette

| Role        | Color                        |
| ----------- | ---------------------------- |
| Background  | `#0a0a0a` (near-black)       |
| Primary     | `#00d4ff` (arc-reactor cyan) |
| Secondary   | `#0088ff` (deep blue)        |
| Accent      | `#ff3e3e` (warning red)      |
| Text        | `#c0e8ff` (light ice-blue)   |
| Glow/Halo   | `rgba(0, 212, 255, 0.15)`    |
| Grid lines  | `rgba(0, 212, 255, 0.06)`    |

### Typography

- Primary font: `Rajdhani`, `Orbitron`, or `Share Tech Mono` (Google Fonts)
- Body/fallback: `monospace`
- All caps for headings and labels
- Letter-spacing: wide (`0.15em+`)

### Visual Effects

- **Scanlines**: subtle repeating horizontal lines over the background (CSS pseudo-element)
- **Grid overlay**: faint perspective grid on the background (CSS gradient)
- **Glow**: `text-shadow` and `box-shadow` with cyan for interactive elements
- **Flicker**: subtle CSS animation on key text to simulate holographic instability
- **Particles**: lightweight floating particle effect in the background (canvas or CSS)
- **Animated borders**: dashed/dotted borders that rotate or pulse
- **Data stream**: scrolling random hex or binary text in a sidebar or background layer
- **Boot sequence**: on page load, simulate a system boot / initialization animation before revealing content

---

## Page Structure

### 1. Boot Sequence (Intro Overlay)

- Full-screen dark overlay
- Sequentially typed lines simulating system initialization:
  ```
  > INITIALIZING SYSTEM...
  > LOADING MODULES... OK
  > ESTABLISHING SECURE CONNECTION...
  > WELCOME, MERWIN.
  ```
- After ~3 seconds, overlay fades out to reveal the main HUD

### 2. HUD Layout (Main Interface)

Use a CSS Grid layout to mimic a heads-up display with distinct panels:

```
┌──────────────────────────────────────────────┐
│  [TOP BAR — Name / Status / Clock]           │
├────────────┬─────────────────┬───────────────┤
│            │                 │               │
│  LEFT      │   CENTER        │   RIGHT       │
│  PANEL     │   PANEL         │   PANEL       │
│            │                 │               │
│  - Bio     │   - Featured    │   - Skills    │
│  - Photo   │     Projects    │     Radar     │
│  - Links   │   - Terminal    │   - Stats     │
│            │                 │               │
├────────────┴─────────────────┴───────────────┤
│  [BOTTOM BAR — Status / Quotes / Scrolling]  │
└──────────────────────────────────────────────┘
```

### 3. Sections & Content

#### Top Bar

- Name/alias in glowing text (left)
- Animated status indicator: `● SYSTEM ONLINE` with pulsing dot
- Live clock (JS `setInterval`, formatted `HH:MM:SS`)
- Location / coordinates styled label

#### Left Panel — Identity

- Circular avatar with animated rotating ring border (SVG or CSS)
- Name, title, tagline — typed or fade-in
- Social links as icon buttons with glow hover effect (GitHub, LinkedIn, etc.)

#### Center Panel — Projects Showcase

- Card-based grid for featured projects
- Each card:
  - Holographic border (animated gradient)
  - Project name, short description, tech stack tags
  - "ACCESS" button linking to repo/demo
- Optional: interactive terminal emulator area where visitors can type commands (`help`, `projects`, `contact`, `about`)

#### Right Panel — Skills & Stats

- **Skill radar/spider chart** (Canvas or SVG) with animated draw-in
- Or: horizontal bar chart with animated fill, labeled with percentages
- Categories: Languages, Frameworks, Tools, Platforms
- Small animated counters: years of experience, projects completed, etc.

#### Bottom Bar

- Scrolling marquee of rotating quotes or status messages
- Subtle animated waveform or EQ visualizer (CSS/canvas)

---

## Interactions & Animations

| Element          | Effect                                                    |
| ---------------- | --------------------------------------------------------- |
| Page load        | Boot sequence → fade in HUD                               |
| Hover on panels  | Border glow intensifies, slight scale-up                  |
| Hover on buttons | Glow pulse + subtle sound (optional)                      |
| Scroll / nav     | Smooth panel transitions with slide or holographic wipe   |
| Cursor           | Custom crosshair or dot cursor with trailing glow         |
| Idle             | Ambient particle drift, subtle scanline flicker           |
| Click feedback   | Ripple + brief flash                                      |

---

## Tech Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Structure  | HTML5 (semantic)                        |
| Styling    | CSS3 (Grid, animations, custom props)   |
| Logic      | Vanilla JavaScript (no frameworks)      |
| Fonts      | Google Fonts (Orbitron, Share Tech Mono) |
| Icons      | Font Awesome or Lucide                  |
| Particles  | Lightweight canvas script or CSS-only   |
| Hosting    | GitHub Pages (zaiblitz.github.io)       |

Keep it **dependency-free** — no React, no build tools. Pure HTML/CSS/JS for fast load and easy deployment.

---

## File Structure

```
zaiblitz.github.io/
├── index.html          # Single-page app
├── css/
│   └── style.css       # All styles + animations
├── js/
│   ├── boot.js         # Boot sequence animation
│   ├── hud.js          # Clock, counters, interactivity
│   ├── terminal.js     # Interactive terminal (optional)
│   └── particles.js    # Background particle effect
├── assets/
│   ├── avatar.png      # Profile photo
│   └── sounds/         # Optional UI sound effects
├── favicon.ico
└── INSTRUCTIONS.md     # This file
```

---

## Implementation Order

1. **Scaffold** — `index.html` with HUD grid layout, link CSS/JS
2. **Dark base** — Global styles, background grid, scanlines, color variables
3. **Top bar** — Name, status dot, live clock
4. **Left panel** — Avatar with ring, bio text, social links
5. **Center panel** — Project cards with holographic borders
6. **Right panel** — Skill bars or radar chart with animations
7. **Bottom bar** — Scrolling marquee
8. **Boot sequence** — Overlay with typed init lines, then fade to HUD
9. **Particles** — Canvas-based floating particle background
10. **Polish** — Custom cursor, hover glows, sound effects, responsive tweaks

---

## Responsive Behavior

- **Desktop**: Full 3-column HUD grid
- **Tablet**: 2-column (left + center merge, right below)
- **Mobile**: Single column stack, boot sequence shortened, particles reduced for performance

---

## Key CSS Techniques

```css
/* Glow effect */
.glow {
  text-shadow: 0 0 10px #00d4ff, 0 0 40px #00d4ff, 0 0 80px #0088ff;
}

/* Scanline overlay */
.scanlines::after {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    transparent, transparent 2px,
    rgba(0, 0, 0, 0.05) 2px, rgba(0, 0, 0, 0.05) 4px
  );
  pointer-events: none;
  z-index: 9999;
}

/* Flicker animation */
@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}

/* Animated ring border */
@keyframes rotate-ring {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## Notes

- Keep total page weight under 500KB (no heavy libraries)
- Aim for 60fps on all animations (use `transform` and `opacity` only where possible)
- Add `prefers-reduced-motion` media query to disable animations for accessibility
- Ensure all text meets WCAG contrast ratios against the dark background
- Test on Chrome, Firefox, Safari, and mobile browsers
