import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import LazyImage from './LazyImage.jsx'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yImg = useTransform(scrollYProgress, [0, 1], [0, -20])
  const yText = useTransform(scrollYProgress, [0, 1], [0, 10])

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="relative glass rounded-2xl shadow-xl shadow-black/20 p-6 md:p-8"
    >
      <div className="grid md:grid-cols-5 gap-6 md:gap-8 items-center">
        <motion.div style={{ y: yImg }} className="md:col-span-2 flex justify-center">
          <div className="relative will-change-transform">
            <LazyImage
              src="/profile.jpg"
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border border-white/10"
            />
            <div className="hidden w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-brand-600/40 to-cyan-600/20 border border-white/10" />
          </div>
        </motion.div>
        <motion.div style={{ y: yText }} className="md:col-span-3 will-change-transform">
          <h2 className="text-2xl md:text-3xl font-semibold">Hi, I’m Jaya Prakash Narayana Rao</h2>
          <p className="text-slate-300 mt-2 leading-relaxed">
            I’m a passionate Frontend Developer with hands-on experience in building interactive and responsive web applications using React.js, HTML, CSS, and JavaScript.
            I specialize in creating seamless user experiences with modern UI/UX principles, integrating backend functionality, and optimizing performance for real-world scalability.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}


