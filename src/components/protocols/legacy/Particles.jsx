import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 60

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const mouse = { x: -1000, y: -1000 }

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    window.addEventListener('resize', resize)
    const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    document.addEventListener('mousemove', onMouse)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const count = prefersReduced ? 10 : PARTICLE_COUNT

    class Particle {
      constructor() { this.reset() }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.radius = Math.random() * 1.5 + 0.5
        this.opacity = Math.random() * 0.5 + 0.1
        this.life = Math.random() * 300 + 200
        this.age = 0
        this.currentOpacity = 0
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.age++

        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150 && dist > 0) {
          this.vx += (dx / dist) * 0.01
          this.vy += (dy / dist) * 0.01
        }

        this.vx *= 0.999
        this.vy *= 0.999

        const ratio = this.age / this.life
        if (ratio < 0.1) this.currentOpacity = this.opacity * (ratio / 0.1)
        else if (ratio > 0.8) this.currentOpacity = this.opacity * ((1 - ratio) / 0.2)
        else this.currentOpacity = this.opacity

        if (this.age > this.life || this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
          this.reset()
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${this.currentOpacity})`
        ctx.fill()
      }
    }

    const particles = Array.from({ length: count }, () => new Particle())

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => { p.update(); p.draw() })
      drawConnections()
      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return <canvas id="particles" ref={canvasRef} />
}
