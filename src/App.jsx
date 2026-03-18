import { useState } from 'react'
import BootSequence from './components/BootSequence'
import TopBar from './components/TopBar'
import LeftPanel from './components/LeftPanel'
import CenterPanel from './components/CenterPanel'
import RightPanel from './components/RightPanel'
import BottomBar from './components/BottomBar'
import Particles from './components/Particles'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <Particles />
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
