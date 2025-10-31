import React, { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

export default function ParticlesBackground() {
  const init = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={init}
        className="absolute inset-0"
        options={{
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 40, density: { enable: true, area: 800 } },
          color: { value: ['#7c3aed', '#06b6d4', '#38bdf8'] },
          links: { enable: true, color: '#94a3b8', opacity: 0.15, distance: 120, width: 1 },
          move: { enable: true, speed: 0.6, outModes: { default: 'out' } },
          opacity: { value: 0.25 },
          size: { value: { min: 1, max: 3 } },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: 'repulse' }, resize: true },
          modes: { repulse: { distance: 80, duration: 0.4 } },
        },
        detectRetina: true,
      }}
    />
    </div>
  )
}


