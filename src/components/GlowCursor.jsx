import { useEffect, useRef } from 'react'

export default function GlowCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    let mouseX = 0, mouseY = 0
    let trailX = 0, trailY = 0

    function onMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`
    }

    function animate() {
      trailX += (mouseX - trailX) * 0.15
      trailY += (mouseY - trailY) * 0.15
      trail.style.transform = `translate(${trailX - 12}px, ${trailY - 12}px)`
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    const animId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      <div ref={cursorRef} className="glow-cursor" />
      <div ref={trailRef} className="glow-cursor-trail" />
    </>
  )
}
