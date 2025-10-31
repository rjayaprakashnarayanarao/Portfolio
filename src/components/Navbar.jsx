import React, { useEffect, useState } from 'react'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'
import { useTransitionOverlay } from '../context/TransitionContext.jsx'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { triggerTransition } = useTransitionOverlay()

  useEffect(() => {
    const sectionIds = LINKS.map(l => l.id)

    const determineActive = () => {
      const midpoint = window.scrollY + window.innerHeight / 2
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.offsetTop
        const height = el.offsetHeight
        if (midpoint >= top && midpoint < top + height) {
          current = id
          break
        }
      }
      setActive(current)
    }

    const onScroll = () => determineActive()
    const onResize = () => determineActive()
    determineActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const handleNav = id => {
    const el = document.getElementById(id)
    if (el) {
      setActive(id)
      triggerTransition(0.4)
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="container-px mx-auto max-w-6xl py-3">
        <div className="glass rounded-2xl px-4 py-3 flex items-center justify-between">
          <div onClick={() => handleNav('home')} className="font-semibold tracking-tight cursor-pointer">
            <span className="text-brand-400">&lt;/&gt;</span> Portfolio
          </div>
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`${
                  active === link.id ? 'nav-link nav-link-active' : 'nav-link'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="ml-2 btn btn-outline will-change-transform hover:-translate-y-0.5 gap-2"
              title="Download Resume"
            >
              <FiDownload />
              Resume
            </a>
          </div>
          <button className="md:hidden" aria-label="menu" onClick={() => setOpen(o => !o)}>
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-2 flex flex-col">
            {LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
              className={`text-left ${active === link.id ? 'nav-link nav-link-active' : 'nav-link'}`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-1 btn btn-outline gap-2"
              title="Download Resume"
              onClick={() => setOpen(false)}
            >
              <FiDownload />
              Resume
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}


