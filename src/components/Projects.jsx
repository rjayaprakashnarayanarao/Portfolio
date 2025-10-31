import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { FiX, FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import LazyImage from './LazyImage.jsx'

const projects = [
  {
    title: 'BuyIt',
    desc: 'responsive e-commerce website using HTML, CSS, and JavaScript! Features include dynamic UI, modern design, and seamless user experience.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '/project-images/buyit.jpg',
    demo: 'https://rjayaprakashnarayanarao.github.io/e-commerce-website/',
    github: 'https://github.com/rjayaprakashnarayanarao/e-commerce-website',
    category: 'Web Apps',
    fullDesc: 'This project is a fully responsive e-commerce website built using HTML, CSS, and JavaScript, designed to provide a modern, dynamic, and seamless online shopping experience. The site features a clean and intuitive user interface, optimized for performance and accessibility across all devices — from desktops to smartphones.',
    features: [
      'Modern, Responsive Design',
      'Dynamic User Interface',
      'Shopping Cart Functionality',
      'Product Search & Filtering',
      'Interactive UI Components'
    ],
    techStack: ['HTML', 'CSS', 'JavaScript'],
    screenshots: ['/project-images/buyit-1.png', '/project-images/buyit-2.png', '/project-images/buyit-3.png', '/project-images/buyit-4.png'],
  },
  {
    title: 'Movies Reviewer',
    desc: 'movies-reviewer is a modern React application that enables users to discover, search, and explore movies with ease. Built with a focus on performance and maintainability, it leverages Vite for rapid development, Tailwind CSS for responsive styling, and integrates external APls for dynamic content.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'API'],
    image: '/project-images/movies-reviewer.png',
    demo: 'https://movies-reviewer.netlify.app/',
    github: 'https://github.com/rjayaprakashnarayanarao/movies-reviewer',
    category: 'Web Apps',
    fullDesc: 'Movies Reviewer is a modern React-based web application that allows users to discover, search, and explore movies effortlessly. Designed with a focus on performance, scalability, and maintainability, this app offers a smooth and engaging user experience. Built using Vite for fast development and optimized builds, and styled with Tailwind CSS for a fully responsive, modern interface, it integrates external movie APIs to deliver real-time, dynamic content such as movie details, ratings, and posters.',
    features: [
      'Movie Search & Discovery',
      'Detailed Movie Information',
      'High Performance',
      'Dynamic API Integration',
      'Responsive Design'
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'API'],
    screenshots: ['/project-images/movies-reviewer-1.png', '/project-images/movies-reviewer-2.png', '/project-images/movies-reviewer-3.png'],
  },
  {
    title: 'Spin2Earn',
    desc: 'Spin2Earn is an engaging Telegram-based spin game where users spin a digital wheel to earn coins. These coins can be accumulated through various actions and later converted into real money at a 1000:1 ratio. The platform is designed for mobile use and integrates directly with Telegram via a bot, offering tasks, daily check-ins, ad rewards, and referral benefits.',
    tags: ['html', 'css', 'javascript', 'mongodb', 'nodejs'],
    image: '/project-images/s2e.png',
    demo: 'https://t.me/spin_2_Earn_bot?start=cd24d117dd877ff42d46',
    github: 'https://github.com/rjayaprakashnarayanarao/Telegram-Bot-with-Web-Integration',
    category: 'Web Apps',
    fullDesc: 'Spin2Earn is an interactive Telegram-based spin game where users can spin a digital wheel to earn virtual coins. The platform offers a fun and rewarding experience by integrating directly with Telegram bots, allowing users to engage in activities such as daily check-ins, completing tasks, watching ads, and inviting friends to boost their earnings. Coins accumulated within the game can be converted into real money at a 1000:1 exchange ratio, creating an engaging incentive-driven ecosystem. Designed specifically for mobile users, Spin2Earn delivers a seamless experience within the Telegram interface—no external app installation required. The system ensures secure transactions, user-friendly navigation, and smooth performance through optimized bot interactions.',
    features: [
      'Telegram Integration',
      'Daily Rewards & Check-ins',
      'Ad Rewards System',
      'Referral Program',
      'Coin Conversion & Withdrawals',
      'Tasks & Challenges',
    ],
    techStack: ['html', 'css', 'javascript', 'mongodb', 'nodejs'],
    screenshots: ['/project-images/s2e-1.png', '/project-images/s2e-2.png', '/project-images/s2e-3.png'],
  },
  {
    title: 'SemMate',
    desc: 'SemMate is an interactive online study platform designed to enhance collaborative learning. It allows users to create or join study rooms, access shared materials, chat with peers, utilize AI-powered help, and track progress. Whether your preparing for exams, organizing study groups, or exploring new topics, SemMate offers the tools you need — all in one place.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    image: '/project-images/semmate.jpg',
    demo: 'https://github.com/rjayaprakashnarayanarao/online-study-platform',
    github: 'https://github.com/rjayaprakashnarayanarao/online-study-platform',
    category: 'Web Apps',
    fullDesc: 'SemMate is an innovative online study platform designed to make collaborative learning smarter and more engaging. It enables users to create or join study rooms, share learning materials, chat with peers, and access AI-powered study assistance — all within a single, unified interface.Whether students are preparing for exams, organizing group studies, or exploring new academic topics, SemMate provides the right set of tools to learn efficiently, communicate effectively, and track progress seamlessly.',
    features: [
      'Study Room Creation',
      'Shared Study Materials',
      'Real-time Chat & Collaboration',
      'AI-Powered Study Assistance',
      'Progress Tracking & Analytics',
      'User Authentication & Authorization',
      'Inbuilt Library of Books',
      'Certificate Generation',
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB', 'API', 'websocket'],
    screenshots: ['/project-images/semmate-1.png', '/project-images/semmate-2.png', '/project-images/semmate-3.png', '/project-images/semmate-4.png'],
  },
  {
    title: 'Blockfall',
    desc: 'Blockfall is a simple, fun game where blocks fall from the top and the player must avoid or catch them. The project uses plain web technologies for easy customization and deployment.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '/project-images/blockfall.png',
    demo: 'https://rjayaprakashnarayanarao.github.io/Blockfall/',
    github: 'https://github.com/rjayaprakashnarayanarao/Blockfall',
    category: 'Games',
    fullDesc: 'Blockfall is a classic, simple, and addictive arcade-style game built entirely with plain web technologies (HTML, CSS, and JavaScript). This project serves as a showcase of fundamental front-end development skills and provides a clean, easily customizable codebase perfect for beginners or for quick deployment.',
    features: [
      'Simple & Addictive Gameplay',
      'Customizable Game Elements',
      'Easy Deployment & Modification',
      'Basic Web Technologies',
      'Fun for All Ages',
    ],
    techStack: ['HTML', 'CSS', 'JavaScript'],
    screenshots: ['/project-images/blockfall-1.png', '/project-images/blockfall-2.png', '/project-images/blockfall-3.jpg'],
  },
]

function ProjectCard({ p, i, onClick }) {
  const ref = useRef(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sRotX = useSpring(rotX, { stiffness: 180, damping: 22 })
  const sRotY = useSpring(rotY, { stiffness: 180, damping: 22 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = x / rect.width
    const py = y / rect.height
    const tilt = 5
    rotY.set((px - 0.5) * tilt)
    rotX.set((0.5 - py) * tilt)
  }

  const reset = () => { rotX.set(0); rotY.set(0) }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={() => onClick(p)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: i * 0.05 }}
      style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: 'preserve-3d' }}
      className="group relative overflow-hidden glass rounded-2xl p-5 flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(124,58,237,0.25)] cursor-pointer"
    >
      <div className="pointer-events-none absolute -inset-16 opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500"
           aria-hidden
           style={{ background: 'radial-gradient(40% 40% at 50% 50%, rgba(124,58,237,0.35), rgba(6,182,212,0.15), transparent 70%)' }} />
      <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-brand-600/30 to-cyan-600/20" style={{ transform: 'translateZ(20px)' }}>
        <LazyImage
          src={p.image}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.25),transparent_60%)]" />
      </div>
      <h3 className="font-semibold text-lg" style={{ transform: 'translateZ(12px)' }}>{p.title}</h3>
      <p className="text-slate-300 text-sm mt-1 flex-1" style={{ transform: 'translateZ(10px)' }}>{p.desc}</p>
      <div className="flex flex-wrap gap-2 mt-3" style={{ transform: 'translateZ(8px)' }}>
        {p.tags.map(t => (
          <span key={t} className="badge">{t}</span>
        ))}
      </div>
      <div className="mt-4" style={{ transform: 'translateZ(8px)' }}>
        <span className="text-sm text-slate-300 group-hover:text-white/90 underline-offset-4 hover:underline">
          Know more →
        </span>
      </div>
    </motion.article>
  )
}

function ProjectModal({ project, isOpen, onClose }) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % project.screenshots.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length)

  // Reset to first image when project changes
  useEffect(() => {
    if (!project) return
    setCurrentImage(0)
  }, [project])

  // Auto-advance slideshow when modal is open
  useEffect(() => {
    if (!isOpen || !project || !project.screenshots || project.screenshots.length <= 1) return
    const id = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % project.screenshots.length)
    }, 3000)
    return () => clearInterval(id)
  }, [isOpen, project])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <FiX />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-slate-300 mb-4">{project.fullDesc}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Features</h4>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {project.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded-lg text-xs bg-white/10 border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 transition-colors"
                  >
                    <FiExternalLink />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <FiGithub />
                    GitHub
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Screenshots</h4>
                <div className="relative">
                  <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-brand-600/30 to-cyan-600/20 relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${project.title}-${currentImage}`}
                        initial={{ opacity: 0.0, scale: 1.015 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.995 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="absolute inset-0"
                      >
                        <LazyImage
                          src={project.screenshots[currentImage]}
                          alt={`${project.title} screenshot ${currentImage + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  {project.screenshots.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors"
                      >
                        <FiChevronLeft />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors"
                      >
                        <FiChevronRight />
                      </button>
                    </>
                  )}
                </div>
                
                {project.screenshots.length > 1 && (
                  <div className="flex gap-2 mt-3 justify-center">
                    {project.screenshots.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === currentImage ? 'bg-brand-600' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -25])
  const categories = useMemo(() => ['All', 'Web Apps', 'Games', 'Python'], [])
  const [active, setActive] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const filtered = useMemo(() => (
    active === 'All' ? projects : projects.filter(p => p.category === active)
  ), [active])
  return (
    <div ref={ref} className="relative">
      <motion.div style={{ y: yBg }} aria-hidden className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute -top-10 left-1/3 w-64 h-64 rounded-full blur-3xl bg-white/5" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold mb-6"
      >
        Projects
      </motion.h2>
      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${active === cat ? 'bg-white/10 border-white/20 text-white' : 'border-white/10 text-slate-300 hover:bg-white/10'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 [perspective:1000px]">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <ProjectCard p={p} i={i} onClick={setSelectedProject} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}


