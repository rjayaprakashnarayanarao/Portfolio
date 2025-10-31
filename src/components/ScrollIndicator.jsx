import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function ScrollIndicator() {
  const [showIndicator, setShowIndicator] = useState(false)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef(null)

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'skills', 'contact']
    
    const checkScrollPosition = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const threshold = 150 // Hide when within 150px of bottom
      
      // Check if we're near the bottom of the page
      if (scrollPosition >= documentHeight - threshold) {
        return false
      }

      // Check which section is currently in view
      const viewportMiddle = window.scrollY + window.innerHeight / 2
      let currentSectionIndex = -1
      
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i])
        if (!section) continue
        
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight
        
        if (viewportMiddle >= sectionTop && viewportMiddle <= sectionBottom) {
          currentSectionIndex = i
          break
        }
      }

      // Show indicator if:
      // 1. We're in a section that's not the last one (contact)
      // 2. And the section is more than 60% visible (user has seen it)
      if (currentSectionIndex >= 0 && currentSectionIndex < sections.length - 1) {
        const currentSection = document.getElementById(sections[currentSectionIndex])
        if (currentSection) {
          const rect = currentSection.getBoundingClientRect()
          const sectionVisible = rect.height - Math.max(0, -rect.top) - Math.max(0, rect.bottom - window.innerHeight)
          const visibilityRatio = sectionVisible / rect.height
          
          if (visibilityRatio > 0.6) {
            return true
          }
        }
      } else if (currentSectionIndex === -1 && window.scrollY < 500) {
        // Show at the top if we're near the beginning
        return true
      }
      
      return false
    }

    const onScroll = () => {
      // Immediately hide indicator when scrolling starts
      isScrollingRef.current = true
      setShowIndicator(false)

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set timeout to detect when scrolling has stopped
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
        // Check if we should show the indicator after scrolling stops
        const shouldShow = checkScrollPosition()
        if (shouldShow) {
          // Small delay before showing to ensure scroll has completely stopped
          setTimeout(() => {
            if (!isScrollingRef.current) {
              setShowIndicator(true)
            }
          }, 300)
        }
      }, 150) // Wait 150ms after last scroll event
    }

    // Initial check after a delay to allow page to load
    const initialTimeout = setTimeout(() => {
      if (!isScrollingRef.current) {
        const shouldShow = checkScrollPosition()
        setShowIndicator(shouldShow)
      }
    }, 1000)

    window.addEventListener('scroll', onScroll, { passive: true })
    
    const onResize = () => {
      if (!isScrollingRef.current) {
        const shouldShow = checkScrollPosition()
        setShowIndicator(shouldShow)
      }
    }
    
    window.addEventListener('resize', onResize)
    
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      if (initialTimeout) clearTimeout(initialTimeout)
    }
  }, [])

  if (!showIndicator) return null

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-2"
      >
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
          <ChevronDown 
            className="w-5 h-5 text-slate-300" 
            strokeWidth={2.5}
          />
        </div>
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-8 w-px bg-gradient-to-b from-slate-400/50 to-transparent"
        />
      </motion.div>
    </motion.div>
  )
}

