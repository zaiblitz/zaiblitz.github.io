# Z.A.I.B.L.I.T.Z. Protocol System

## Overview

The portfolio features a **multi-protocol theme system** inspired by Iron Man HUD aesthetics. Users can select from 5 distinct visual protocols, each with unique styling, animations, and sound design. The system is fully integrated into the React app with persistent settings.

---

## Available Protocols

| # | Protocol | ID | Description |
|---|----------|----|-------------|
| 1 | **STANDARD VIEW** | `legacy` | Original portfolio layout — 3-column HUD grid with interactive terminal |
| 2 | **MARK VII HUD** | `mark_vii` | Classic cyan holographic interface with nav terminal popups |
| 3 | **HULKBUSTER OS** | `hulkbuster` | Aggressive orange/red tactical overlay with hexagonal grids |
| 4 | **NIGHT PROTOCOL** | `stealth` | Asymmetric deep-blue radar display with floating data columns |
| 5 | **DIAGNOSTIC MODE** | `diagnostic` | Wireframe schematic view with targeting brackets and monospace data |

---

## Architecture

### Directory Structure

```
src/
├── App.jsx                           ← Root: ProtocolProvider → AppContent
├── contexts/
│   └── ProtocolContext.jsx           ← Theme state, boot settings, localStorage
├── hooks/
│   ├── useZaiblitzAudio.js           ← Shared Web Audio API + Speech Synthesis
│   └── useVoiceCommand.js            ← Speech Recognition for voice commands
├── data/
│   └── settings.js                   ← Master protocol config (active/inactive, selector, defaults)
├── components/
│   ├── shared/                       ← System-level (used across all protocols)
│   │   ├── ProtocolSelector.jsx      ← Boot screen with 5 protocol cards + voice command
│   │   ├── SettingsPanel.jsx/.css    ← [ SYS_CONFIG ] overlay for hot-swapping
│   │   └── TerminalManager.jsx/.css  ← Reusable typing terminal popup with sound
│   └── protocols/
│       ├── Legacy.jsx                ← Standard View entry point
│       ├── MarkVII.jsx               ← Mark VII HUD
│       ├── Hulkbuster.jsx            ← Hulkbuster OS
│       ├── Stealth.jsx               ← Night Protocol
│       ├── Diagnostic.jsx            ← Diagnostic Mode
│       └── legacy/                   ← Sub-components only used by Legacy
│           ├── BootSequence.jsx
│           ├── TopBar.jsx
│           ├── LeftPanel.jsx
│           ├── CenterPanel.jsx
│           ├── RightPanel.jsx
│           ├── BottomBar.jsx
│           ├── Terminal.jsx
│           ├── Particles.jsx
│           ├── GlowCursor.jsx
│           └── ...
├── styles/
│   ├── index.css                     ← Legacy master stylesheet
│   ├── ProtocolSelector.css          ← Selector screen styles
│   └── protocols/
│       ├── MarkVII.css
│       ├── Hulkbuster.css
│       ├── Stealth.css
│       └── Diagnostic.css
└── prototypes/                       ← Original standalone HTML references
    ├── selector.html
    ├── option1.html
    ├── option2.html
    ├── option3.html
    └── option4.html
```

---

## Settings Configuration (`src/data/settings.js`)

The single source of truth for all protocol configuration:

```js
export const protocols = [
    {
        id: 'legacy',
        name: 'STANDARD VIEW',
        active: true,                         // toggle visibility
        voiceKeywords: ['standard', 'legacy'], // voice command triggers
        voiceLine: 'Loading standard portfolio matrix.',
        // ... cardClass, hoverType, etc.
    },
    // ...4 more protocols
];

export const systemSettings = {
    selectorEnabled: true,      // false = skip boot selector
    defaultProtocol: 'legacy',  // loaded when selector is disabled
};
```

- **`active: true/false`** — Toggle protocols on/off in selector and settings panel
- **`selectorEnabled`** — Master override (takes priority over localStorage)
- **`defaultProtocol`** — Which protocol boots when selector is skipped

---

## State Management

**Context:** `ProtocolContext.jsx` wraps the entire app.

**localStorage key:** `zaiblitz_os_config`

```json
{
  "skipSelector": false,
  "defaultProtocol": "legacy",
  "isMuted": false
}
```

**Boot flow:**
1. App loads → `ProtocolContext` reads `settings.js` + `localStorage`
2. If `selectorEnabled: false` → directly mount the default protocol
3. If `selectorEnabled: true` → show `<ProtocolSelector />`
4. User clicks a card (or uses voice command) → protocol activates
5. `[ SYS_CONFIG ]` button available in all protocols for hot-swapping

---

## Audio System

**Hook:** `useZaiblitzAudio.js`

- Uses a **shared module-level AudioContext** (not per-instance) so all components share one context
- `initAudio()` — Initialize on user gesture (required by browsers)
- `playBeep(freq, type, duration, vol, delay)` — Synthesized sound effects
- `speak(text, pitch, rate)` — Speech Synthesis with British voice preference (Daniel / UK English Male)

**Voice Commands:** `useVoiceCommand.js`
- Web Speech Recognition API (Chrome/Edge)
- Activated via mic button on the Protocol Selector
- Matches spoken words against `voiceKeywords` in each protocol config

---

## Settings Panel (`[ SYS_CONFIG ]`)

Accessible from any active protocol (bottom-right corner). Provides:
- **Active Protocol** — Switch between protocols instantly
- **Boot Sequence** — Toggle "Skip Protocol Selector on Startup"
- **Default Protocol** — Which protocol loads when selector is skipped
- **Audio** — Mute system audio
- **Reboot to Selector** — Return to the boot screen