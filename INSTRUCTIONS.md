# Personal Website — Jarvis/Iron Man HUD Theme

## Vision

A futuristic, immersive single-page personal website inspired by the Iron Man / J.A.R.V.I.S. HUD interface. Think holographic displays, glowing neon elements, animated data streams, and a dark tactical command-center aesthetic.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR MACHINE                             │
│                                                                 │
│   zaiblitz.github.io/                                           │
│   ├── src/              ← React source code (JSX, CSS, data)   │
│   ├── index.html        ← Entry point (Vite injects scripts)   │
│   ├── vite.config.js    ← Build configuration                  │
│   └── package.json      ← Dependencies & scripts               │
│                                                                 │
│   npm run dev     → localhost:4000 (live development)           │
│   npm run build   → dist/ folder (production-ready files)       │
│                                                                 │
│   git push        → pushes code to GitHub                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                     GITHUB REPOSITORY                           │
│         github.com/zaiblitz/zaiblitz.github.io                  │
│                                                                 │
│   Stores your source code (src/, package.json, etc.)            │
│   Does NOT store the built files (dist/ is gitignored)          │
│                                                                 │
│   On every push to master branch:                               │
│   → Triggers GitHub Actions workflow automatically              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GITHUB ACTIONS (CI/CD)                        │
│            .github/workflows/deploy.yml                         │
│                                                                 │
│   Step 1: Spins up a fresh Ubuntu server                        │
│   Step 2: Checks out your code (git clone)                      │
│   Step 3: Installs Node.js 20                                   │
│   Step 4: Runs `npm ci` (installs dependencies)                 │
│   Step 5: Runs `npm run build` (creates dist/ folder)           │
│   Step 6: Uploads dist/ as a "Pages artifact"                   │
│   Step 7: Deploys artifact to GitHub Pages                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GITHUB PAGES (HOSTING)                        │
│                  https://zaiblitz.github.io                     │
│                                                                 │
│   Serves the built static files (HTML, CSS, JS) to visitors     │
│   Free hosting for static sites on *.github.io domains          │
│   Automatically gets HTTPS certificate                          │
│   CDN-backed for fast global delivery                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## How GitHub Deployment Works (Step by Step)

### 1. You write code locally

Edit files in `src/` — React components, data files, styles. Test locally with:

```bash
npm run dev
```

This starts Vite's dev server at `http://localhost:4000` with hot-reload.

### 2. You commit and push

```bash
git add -A
git commit -m "your message here"
git push
```

This sends your code to the `master` branch on GitHub.

### 3. GitHub Actions detects the push

The workflow file `.github/workflows/deploy.yml` tells GitHub: *"Every time someone pushes to `master`, run these steps."*

You can watch it run in real time at:
**https://github.com/zaiblitz/zaiblitz.github.io/actions**

### 4. The workflow builds your site

On GitHub's servers (not your machine), it:
- Installs Node.js
- Runs `npm ci` (clean install of dependencies from `package-lock.json`)
- Runs `npm run build` (Vite compiles JSX → plain HTML/CSS/JS in `dist/`)

### 5. The built files are deployed

The `dist/` folder is uploaded to GitHub Pages. This replaces whatever was previously hosted.

### 6. Your site is live

Within ~1-2 minutes, **https://zaiblitz.github.io** serves the new version.

---

## Key Concepts

| Term | What it means |
|------|---------------|
| **Git** | Version control — tracks changes to your files |
| **GitHub** | Cloud hosting for git repositories |
| **GitHub Actions** | Automated workflows that run on GitHub's servers |
| **CI/CD** | Continuous Integration / Continuous Deployment — auto-build & auto-deploy on every push |
| **GitHub Pages** | Free static site hosting from a GitHub repo |
| **Vite** | Fast build tool — bundles React code into optimized static files |
| **`npm ci`** | Installs exact dependency versions from `package-lock.json` (used in CI) |
| **`npm run build`** | Compiles your React app into plain HTML/CSS/JS (the `dist/` folder) |
| **Artifact** | The built output uploaded during deployment |

---

## Common Commands

```bash
# Start local dev server (hot-reload)
npm run dev

# Build production files locally (to test)
npm run build

# Preview the production build locally
npm run preview

# Stage all changes
git add -A

# Commit with a message
git commit -m "describe what you changed"

# Push to GitHub (triggers auto-deploy)
git push

# Check deployment status
# → https://github.com/zaiblitz/zaiblitz.github.io/actions
```

---

## Project Structure

```
zaiblitz.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← GitHub Actions workflow (auto-deploy)
├── src/
│   ├── main.jsx              ← React entry point
│   ├── App.jsx               ← Root component (boot → HUD)
│   ├── components/
│   │   ├── BootSequence.jsx  ← Startup animation
│   │   ├── TopBar.jsx        ← Name, status, clock
│   │   ├── LeftPanel.jsx     ← Avatar, bio, social links
│   │   ├── CenterPanel.jsx   ← Project cards + terminal
│   │   ├── RightPanel.jsx    ← Skill bars + stat counters
│   │   ├── BottomBar.jsx     ← Scrolling marquee
│   │   ├── Terminal.jsx      ← Interactive command terminal
│   │   ├── Particles.jsx     ← Canvas particle background
│   │   └── SocialIcon.jsx    ← SVG social icons
│   ├── data/
│   │   ├── profile.js        ← Name, title, social links
│   │   ├── projects.js       ← Project cards data
│   │   ├── skills.js         ← Skill bars + stat numbers
│   │   ├── boot.js           ← Boot sequence lines + marquee text
│   │   └── commands.js       ← Terminal command definitions
│   └── styles/
│       └── index.css         ← All styles + animations
├── index.html                ← HTML shell (Vite entry)
├── vite.config.js            ← Vite build config
├── package.json              ← Dependencies & scripts
├── package-lock.json         ← Locked dependency versions
├── .gitignore                ← Files git should ignore
└── INSTRUCTIONS.md           ← This file
```

### Where to edit what

| Want to change...          | Edit this file          |
|----------------------------|-------------------------|
| Your name, title, links    | `src/data/profile.js`   |
| Projects list              | `src/data/projects.js`  |
| Skills & stats             | `src/data/skills.js`    |
| Boot sequence text         | `src/data/boot.js`      |
| Terminal commands           | `src/data/commands.js`  |
| Colors, fonts, layout      | `src/styles/index.css`  |
| Component behavior          | `src/components/*.jsx`  |

---

## Deployment Workflow File Explained

```yaml
# .github/workflows/deploy.yml

name: Deploy to GitHub Pages

on:
  push:
    branches: [master]        # Only runs when you push to master

permissions:
  contents: read              # Can read repo files
  pages: write                # Can deploy to Pages
  id-token: write             # Auth token for deployment

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest    # Uses a fresh Linux server

    steps:
      - uses: actions/checkout@v4           # Clone your repo
      - uses: actions/setup-node@v4         # Install Node.js
        with:
          node-version: 20
          cache: npm
      - run: npm ci                          # Install dependencies
      - run: npm run build                   # Build → dist/
      - uses: actions/configure-pages@v4     # Prep Pages
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist                         # Upload dist/ folder
      - uses: actions/deploy-pages@v4       # Deploy to Pages
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Site not updating | Check Actions tab for failed builds |
| Build fails on GitHub | Run `npm run build` locally to see the error |
| 404 on site | Verify Pages source is set to "GitHub Actions" in Settings → Pages |
| Blank page | Check browser console for JS errors |
| Old version showing | Hard refresh (`Cmd+Shift+R`) or wait for CDN cache (~2 min) |
| Git push rejected | Run `git pull --rebase` first, then push again |
