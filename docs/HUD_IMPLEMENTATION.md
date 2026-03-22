# HUD Protocols Implementation Plan

## 1. Overview
The goal is to seamlessly integrate the four newly designed J.A.R.V.I.S./Iron Man HUD HTML templates into the existing React application, alongside the current portfolio design, bringing the total to **5 Selectable Protocols**. 

We will also introduce a persistent **Settings System** to handle boot preferences (whether to show the selector on startup or bypass it and load a default theme directly).

## 2. Available Protocols
1. **PROTOCOL ALPHA (Mark VII):** Classic Blue/Cyan HUD with holographic terminal popups.
2. **PROTOCOL OMEGA (Hulkbuster):** Aggressive Orange/Red tactical dark mode.
3. **PROTOCOL SHADOW (Stealth):** Asymmetric radar display with deep blues and terminal typing feeds.
4. **PROTOCOL DIAGNOSTIC (Wireframe):** Analytical targeting brackets, pure black mesh, and rigid monospace data.
5. **PROTOCOL LEGACY (Standard):** The current running UI of `zaiblitz.github.io` (Standard web portfolio view).

## 3. Architecture & Component Structure

We will refactor the App to use a centralized state (Context API) to control what is rendered on screen.

### Directory Structure Addition:
```text
src/
  ├── contexts/
  │    └── ProtocolContext.jsx       # Manages theme state, boot settings, and localStorage
  ├── hooks/
  │    └── useJarvisAudio.js         # Shared Web Audio API and Speech Synthesis logic
  ├── components/
  │    ├── ProtocolSelector.jsx      # The initial boot screen with the 5 options
  │    ├── TerminalManager.jsx       # Reusable typing terminal component
  │    ├── SettingsPanel.jsx         # HUD settings (change theme, skip boot sequence)
  │    └── protocols/                # The 5 layout components
  │         ├── MarkVII.jsx          (from option1)
  │         ├── Hulkbuster.jsx       (from option2)
  │         ├── Stealth.jsx          (from option3)
  │         ├── Diagnostic.jsx       (from option4)
  │         └── Legacy.jsx           (Your existing App layout)
```

## 4. State Management (Local Storage)
We will use `localStorage` under the key `zaiblitz_os_config` to remember user preferences across sessions.
```json
{
  "skipSelector": false, 
  "defaultProtocol": "legacy" 
}
```

**Boot Flow Logic:**
1. Upon loading `zaiblitz.github.io`, the `ProtocolContext` checks `localStorage`.
2. If `skipSelector` is `true`, the UI instantly mounts `<App activeProtocol={defaultProtocol} />`.
3. If `skipSelector` is `false`, it mounts the `<ProtocolSelector />` (the standby to boot screen).

## 5. The Settings Menu (Global Overlay)
A universal `[ SYS_CONFIG ]` button will be accessible in all 5 protocols (perhaps hidden subtly in the navigation or a bottom corner). Clicking it will trigger a unified menu allowing the user to:
* **Switch Protocol:** Hot-swap between the 5 designs without refreshing.
* **Toggle Boot Screen:** "Show Boot Selector on next launch: YES/NO".
* **Audio:** "Mute SYS_AUDIO".

## 6. Implementation Steps
1. **Context Setup:** Create `ProtocolContext.jsx` to wrap the app and handle `localStorage`.
2. **Audio Extraction:** Move all the vanilla JS `AudioContext` and `SpeechSynthesis` functions into a reusable React hook (`useJarvisAudio`).
3. **Template Conversion:** Translate the pure HTML/CSS from `selector.html`, `option1.html`, `option2.html`, `option3.html`, and `option4.html` into scoped React components.
4. **Current Design Migration:** Encapsulate the current codebase layout into the `Legacy` component.
5. **Terminal Componentization:** Create one standard `<Terminal />` React component that accepts props (title, text data, typing speed) to avoid repeating terminal logic 4 times.
6. **Deploy Settings UI:** Build the configuration panel and bind it to the context.

---
*Awaiting your approval to begin executing Phase 1 (State setup and Template Conversion).*