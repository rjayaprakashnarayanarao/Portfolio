import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function IntroScreen({ onComplete }) {
  const [showSkip, setShowSkip] = useState(false)
  const [shouldSkip, setShouldSkip] = useState(() => {
    return localStorage.getItem('skipIntro') === 'true'
  })

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 800)
    const introTimer = setTimeout(() => {
      if (!shouldSkip) {
        onComplete()
      }
    }, 1500)

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(introTimer)
    }
  }, [onComplete, shouldSkip])

  const handleSkip = () => {
    localStorage.setItem('skipIntro', 'true')
    setShouldSkip(true)
    onComplete()
  }

  if (shouldSkip) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 dark:bg-slate-950"
      >
        <div className="text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-brand-600 via-cyan-500 to-sky-500 flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.4)]">
              <span className="text-4xl font-bold text-white">JP</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-slate-400 text-sm"
          >
            Welcome to my portfolio
          </motion.p>

          {showSkip && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleSkip}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Skip intro
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

