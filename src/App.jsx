import React, { Suspense, lazy } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from './context/ThemeContext.jsx'
import IntroScreen from './components/IntroScreen.jsx'
import ScrollIndicator from './components/ScrollIndicator.jsx'
import { Helmet } from 'react-helmet-async'

// Lazy load components
const Navbar = lazy(() => import('./components/Navbar.jsx'))
const Home = lazy(() => import('./components/Home.jsx'))
const About = lazy(() => import('./components/About.jsx'))
const Projects = lazy(() => import('./components/Projects.jsx'))
const Skills = lazy(() => import('./components/Skills.jsx'))
const Contact = lazy(() => import('./components/Contact.jsx'))
const BackToTop = lazy(() => import('./components/BackToTop.jsx'))
const Footer = lazy(() => import('./components/Footer.jsx'))
const ChatButton = lazy(() => import('./components/ChatButton.jsx'))

function AppContent() {
  const { theme } = useTheme()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="min-h-screen"
      >
        <Helmet>
          <title>Your Name – Frontend Developer</title>
          <meta name="description" content="Frontend developer crafting modern, accessible React apps with delightful motion." />
          <meta name="keywords" content="Frontend Developer, React, JavaScript, TypeScript, UI, Web Development, Portfolio" />
          <meta name="theme-color" content={theme === 'dark' ? '#0b0f19' : '#ffffff'} />
          <meta property="og:title" content="Your Name – Frontend Developer" />
          <meta property="og:description" content="Modern, responsive portfolio with projects, skills, and contact." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://your-domain.com" />
          <meta property="og:image" content="/favicon.svg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Your Name – Frontend Developer" />
          <meta name="twitter:description" content="Modern, responsive portfolio with projects, skills, and contact." />
          <meta name="twitter:image" content="/favicon.svg" />
        </Helmet>
        <Suspense fallback={<div className="h-20" />}>
          <Navbar />
        </Suspense>
        <main>
          <motion.section
            id="home"
            className="section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={<div className="h-96" />}>
              <Home />
            </Suspense>
          </motion.section>
          <motion.section
            id="about"
            className="section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={<div className="h-96" />}>
              <About />
            </Suspense>
          </motion.section>
          <motion.section
            id="projects"
            className="section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={<div className="h-96" />}>
              <Projects />
            </Suspense>
          </motion.section>
          <motion.section
            id="skills"
            className="section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={<div className="h-96" />}>
              <Skills />
            </Suspense>
          </motion.section>
          <motion.section
            id="contact"
            className="section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={<div className="h-96" />}>
              <Contact />
            </Suspense>
          </motion.section>
        </main>
        <Suspense fallback={<div className="h-32" />}>
          <Footer />
        </Suspense>
        <ScrollIndicator />
        <Suspense fallback={null}>
          <BackToTop />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [showIntro, setShowIntro] = React.useState(() => {
    return localStorage.getItem('skipIntro') !== 'true'
  })

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      </AnimatePresence>
      {!showIntro && <AppContent />}
    </>
  )
}