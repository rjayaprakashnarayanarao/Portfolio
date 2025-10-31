import React, { useEffect, useState } from 'react'
import { FiArrowUp } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 glass rounded-full p-3 hover:bg-white/10 transition-colors will-change-transform hover:-translate-y-0.5"
        >
          <FiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  )
}


