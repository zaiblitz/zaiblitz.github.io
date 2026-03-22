import { ProtocolProvider, useProtocol } from './contexts/ProtocolContext'
import { getActiveProtocols } from './data/settings'
import ProtocolSelector from './components/shared/ProtocolSelector'
import SettingsPanel from './components/shared/SettingsPanel'
import TerminalManager from './components/shared/TerminalManager'
import Legacy from './components/protocols/Legacy'
import MarkVII from './components/protocols/MarkVII'
import Hulkbuster from './components/protocols/Hulkbuster'
import Stealth from './components/protocols/Stealth'
import Diagnostic from './components/protocols/Diagnostic'

const protocolComponents = {
  mark_vii: MarkVII,
  hulkbuster: Hulkbuster,
  stealth: Stealth,
  diagnostic: Diagnostic,
  legacy: Legacy,
}

function AppContent() {
  const { activeProtocol } = useProtocol()

  if (!activeProtocol) {
    return <ProtocolSelector />
  }

  const activeIds = getActiveProtocols().map(p => p.id)
  const ProtocolComponent = activeIds.includes(activeProtocol)
    ? protocolComponents[activeProtocol]
    : null

  return (
    <>
      <SettingsPanel />
      {ProtocolComponent && <ProtocolComponent />}
      <TerminalManager />
    </>
  )
}

export default function App() {
  return (
    <ProtocolProvider>
      <AppContent />
    </ProtocolProvider>
  )
}
