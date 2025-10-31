import React, { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import ContactModal from './ContactModal.jsx'

export default function ChatButton() {
  const [open, setOpen] = useState(false)
  const [backToTopVisible, setBackToTopVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setBackToTopVisible(window.scrollY > 300)
    }
    
    handleScroll() // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed right-6 z-40 group"
        style={{ bottom: backToTopVisible ? '5rem' : '1.5rem' }}
        animate={{ bottom: backToTopVisible ? '5rem' : '1.5rem' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        aria-label="Chat with me"
      >
        <span className="absolute inset-0 -z-10 rounded-full shadow-[0_0_24px_rgba(124,58,237,0.45)] opacity-0 group-hover:opacity-100 transition-opacity"></span>
        <div className="relative">
          <span className="absolute -top-1 -right-1 inline-flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
          <div className="glass rounded-full p-3 border border-white/10 hover:bg-white/10 transition-colors will-change-transform group-hover:-translate-y-0.5">
            <MessageCircle size={20} />
          </div>
        </div>
      </motion.button>

      <ContactModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}


