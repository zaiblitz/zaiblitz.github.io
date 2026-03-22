import { useState } from 'react'
import BootSequence from './legacy/BootSequence'
import TopBar from './legacy/TopBar'
import LeftPanel from './legacy/LeftPanel'
import CenterPanel from './legacy/CenterPanel'
import RightPanel from './legacy/RightPanel'
import BottomBar from './legacy/BottomBar'
import Particles from './legacy/Particles'
import GlowCursor from './legacy/GlowCursor'

export default function Legacy() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <Particles />
      <GlowCursor />
      <div className={`hud${booted ? '' : ' hidden'}`}>
        <TopBar />
        <main className="hud-grid">
          <LeftPanel />
          <CenterPanel />
          <RightPanel animate={booted} />
        </main>
        <BottomBar />
      </div>
    </>
  )
}
