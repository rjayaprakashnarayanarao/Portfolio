import React, { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

const TECH_ICONS = [
  { name: 'React', emoji: '⚛️' },
  { name: 'JS', emoji: '📜' },
  { name: 'HTML', emoji: '🌐' },
  { name: 'CSS', emoji: '🎨' },
  { name: 'TS', emoji: '🔷' },
  { name: 'Node', emoji: '🟢' },
  { name: 'Git', emoji: '🔀' },
  { name: 'Vite', emoji: '⚡' },
]

class TechNetwork {
  constructor(canvas, theme) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.theme = theme
    this.particles = []
    this.animationId = null
    this.resize = this.resize.bind(this)
    
    this.resize()
    window.addEventListener('resize', this.resize, { passive: true })
    
    this.initParticles()
    this.animate()
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect()
    this.canvas.width = rect.width
    this.canvas.height = rect.height
    this.width = rect.width
    this.height = rect.height
  }

  initParticles() {
    this.particles = TECH_ICONS.map((icon, i) => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      icon: icon.emoji,
      name: icon.name,
      size: 24 + Math.random() * 8,
    }))
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    
    const color = this.theme === 'dark' ? 'rgba(148, 163, 184, 0.15)' : 'rgba(71, 85, 105, 0.15)'
    const lineColor = this.theme === 'dark' ? 'rgba(124, 58, 237, 0.2)' : 'rgba(59, 130, 246, 0.2)'
    
    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x
        const dy = this.particles[i].y - this.particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.3
          this.ctx.strokeStyle = `rgba(${this.theme === 'dark' ? '124, 58, 237' : '59, 130, 246'}, ${opacity})`
          this.ctx.lineWidth = 1
          this.ctx.beginPath()
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y)
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y)
          this.ctx.stroke()
        }
      }
    }
    
    // Draw particles
    this.ctx.font = `${this.particles[0].size}px Arial`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    
    this.particles.forEach(particle => {
      this.ctx.globalAlpha = 0.6
      this.ctx.fillText(particle.icon, particle.x, particle.y)
      this.ctx.globalAlpha = 1
    })
  }

  update() {
    this.particles.forEach(particle => {
      particle.x += particle.vx
      particle.y += particle.vy
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > this.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > this.height) particle.vy *= -1
      
      // Keep within bounds
      particle.x = Math.max(0, Math.min(this.width, particle.x))
      particle.y = Math.max(0, Math.min(this.height, particle.y))
    })
  }

  animate() {
    this.update()
    this.draw()
    this.animationId = requestAnimationFrame(() => this.animate())
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener('resize', this.resize)
  }
}

export default function TechNetworkBackground() {
  const canvasRef = useRef(null)
  const networkRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (canvasRef.current && !networkRef.current) {
      networkRef.current = new TechNetwork(canvasRef.current, theme)
    }
    
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (networkRef.current) {
      networkRef.current.theme = theme
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  )
}

