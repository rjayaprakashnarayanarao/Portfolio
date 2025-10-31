import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ParticlesBackground from './ParticlesBackground.jsx'
import ThreeBackground from './ThreeBackground.jsx'
import TechNetworkBackground from './TechNetworkBackground.jsx'

export default function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 20])

  const roles = useMemo(() => [
    'Frontend Developer',
    'UI Enthusiast',
    'React Enthusiast',
  ], [])
  const [roleIndex, setRoleIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex % roles.length]
    const delay = deleting ? 50 : 90
    const pauseAtFull = 1200
    const pauseAtEmpty = 300
    let timer

    if (!deleting && typed === current) {
      timer = setTimeout(() => setDeleting(true), pauseAtFull)
    } else if (deleting && typed === '') {
      timer = setTimeout(() => {
        setDeleting(false)
        setRoleIndex(i => (i + 1) % roles.length)
      }, pauseAtEmpty)
    } else {
      timer = setTimeout(() => {
        const next = deleting ? typed.slice(0, -1) : current.slice(0, typed.length + 1)
        setTyped(next)
      }, delay)
    }
    return () => clearTimeout(timer)
  }, [typed, deleting, roleIndex, roles])

  return (
    <div ref={ref} className="pt-20 md:pt-28 relative">
      <ParticlesBackground />
      <ThreeBackground />
      <TechNetworkBackground />
      <motion.div
        style={{ y: y1 }}
        aria-hidden
        className="pointer-events-none absolute -z-10 inset-0"
      >
        <div className="absolute -top-20 right-10 w-64 h-64 rounded-full blur-3xl bg-brand-600/10" />
        <div className="absolute top-10 -left-10 w-72 h-72 rounded-full blur-3xl bg-cyan-600/10" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex flex-col items-center gap-4">
          <span className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10">Welcome</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-brand-500 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
              Hi, I’m Jaya Prakash
            </span>
          </h1>
          <div className="text-lg sm:text-xl text-slate-300 h-7 sm:h-8">
            <span className="font-medium">{typed}</span>
            <span className="ml-1 inline-block w-2 h-5 sm:h-6 align-middle bg-slate-300 animate-pulse" />
          </div>
          <p className="text-slate-300 max-w-2xl">
            I build modern web experiences with React, motion, and clean, accessible UI.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#projects" className="btn btn-primary will-change-transform hover:-translate-y-0.5">
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline will-change-transform hover:-translate-y-0.5">
              Contact Me
            </a>
          </div>
        </div>
      </motion.div>

      {/* Removed tech badges grid from Home */}
    </div>
  )
}


