import { useEffect, useRef, useState } from 'react'
import { bootLines } from '../../../data/boot'

export default function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([])
  const overlayRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    let index = 0
    let cancelled = false

    function typeLine() {
      if (cancelled) return

      if (index >= bootLines.length) {
        setTimeout(() => {
          if (cancelled) return
          overlayRef.current?.classList.add('fade-out')
          setTimeout(() => {
            if (!cancelled) onCompleteRef.current()
          }, 800)
        }, 600)
        return
      }

      const text = bootLines[index]
      setLines((prev) => [...prev, text])
      index++
      const delay = text === '' ? 200 : 180 + Math.random() * 120
      setTimeout(typeLine, delay)
    }

    setTimeout(typeLine, 300)
    return () => { cancelled = true }
  }, [])

  return (
    <div id="boot-overlay" ref={overlayRef}>
      <div id="boot-log">
        {lines.map((line, i) => (
          <div
            key={i}
            className="boot-line"
            style={
              line && line.includes('WELCOME')
                ? { color: '#00ff88', fontWeight: 'bold', marginTop: '0.5rem' }
                : undefined
            }
          >
            {line}
          </div>
        ))}
      </div>
      <div id="boot-cursor">_</div>
    </div>
  )
}
