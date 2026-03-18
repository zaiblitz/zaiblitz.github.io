import { useState, useEffect, useRef } from 'react'

export function useTypingEffect(text, speed = 50, delay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let index = 0
    let cancelled = false
    setDisplayed('')
    setDone(false)

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (cancelled) return
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1))
          index++
        } else {
          setDone(true)
          clearInterval(interval)
        }
      }, speed)

      // cleanup interval
      if (cancelled) clearInterval(interval)
    }, delay)

    return () => {
      cancelled = true
      clearTimeout(startTimeout)
    }
  }, [text, speed, delay])

  return { displayed, done }
}
