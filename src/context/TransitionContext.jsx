import React, { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from './ThemeContext.jsx'

const TransitionContext = createContext({ triggerTransition: () => {} })

export function TransitionProvider({ children }) {
  const [active, setActive] = useState(false)

  const triggerTransition = useCallback((duration = 0.4) => {
    setActive(true)
    window.setTimeout(() => setActive(false), duration * 1000)
  }, [])

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      <TransitionOverlay active={active} />
    </TransitionContext.Provider>
  )
}

export function useTransitionOverlay() {
  return useContext(TransitionContext)
}

function TransitionOverlay({ active }) {
  const { theme } = useTheme()
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="route-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 z-[60] ${theme === 'dark' ? 'bg-slate-950/70' : 'bg-white/70'}`}
        />
      )}
    </AnimatePresence>
  )
}


