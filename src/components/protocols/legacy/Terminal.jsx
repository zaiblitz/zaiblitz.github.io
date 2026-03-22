import { useState, useRef, useEffect } from 'react'
import { commands } from '../../../data/commands'

export default function Terminal({ onPopupCommand }) {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Type "help" for available commands. Try "about", "career", or "contact".' },
  ])
  const [input, setInput] = useState('')
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history])

  function handleSubmit(e) {
    if (e.key !== 'Enter') return
    const raw = input
    const cmd = raw.trim().toLowerCase()
    setInput('')

    const newHistory = [...history, { type: 'command', text: raw }]

    if (cmd === 'clear') {
      setHistory([])
      return
    }

    // Check if this command should open a popup
    if (onPopupCommand && onPopupCommand(cmd)) {
      newHistory.push({ type: 'output', text: `> Opening ${cmd.toUpperCase()} terminal...` })
      setHistory(newHistory)
      return
    }

    if (cmd && commands[cmd]) {
      newHistory.push({ type: 'output', text: commands[cmd]() })
    } else if (cmd) {
      newHistory.push({
        type: 'output',
        text: `ERROR: Unknown command "${cmd}". Type "help" for available commands.`,
      })
    }

    setHistory(newHistory)
  }

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal__header">
        <span className="terminal__label">TERMINAL v2.1</span>
        <span className="terminal__controls">
          <span className="terminal__dot terminal__dot--red"></span>
          <span className="terminal__dot terminal__dot--yellow"></span>
          <span className="terminal__dot terminal__dot--green"></span>
        </span>
      </div>

      <div className="terminal__body" ref={bodyRef}>
        {history.map((entry, i) => (
          <div key={i} className="terminal__line">
            {entry.type === 'command' ? (
              <>
                <span className="terminal__prompt">ZAIBLITZ&gt;</span> {entry.text}
              </>
            ) : (
              <span style={{ whiteSpace: 'pre' }}>{entry.text}</span>
            )}
          </div>
        ))}
      </div>

      <div className="terminal__input-row">
        <span className="terminal__prompt">ZAIBLITZ&gt;</span>
        <input
          ref={inputRef}
          type="text"
          className="terminal__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleSubmit}
          autoComplete="off"
          spellCheck="false"
          aria-label="Terminal input"
        />
      </div>
    </div>
  )
}
