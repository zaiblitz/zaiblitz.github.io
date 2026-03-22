import { useState } from 'react'
import BootSequence from '../../components/BootSequence'
import TopBar from '../../components/TopBar'
import LeftPanel from '../../components/LeftPanel'
import CenterPanel from '../../components/CenterPanel'
import RightPanel from '../../components/RightPanel'
import BottomBar from '../../components/BottomBar'
import Particles from '../../components/Particles'
import GlowCursor from '../../components/GlowCursor'

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
