import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiDjango,
  SiGit,
  SiGithub,
  SiVite,
  SiFigma,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiLinux,
  SiKalilinux,
  SiSecurityscorecard,
} from 'react-icons/si'

const categories = [
  {
    name: 'Frontend',
    items: [
      { label: 'React', icon: SiReact, level: 90 },
      { label: 'Next.js', icon: SiNextdotjs, level: 75 },
      { label: 'TypeScript', icon: SiTypescript, level: 75 },
      { label: 'Tailwind', icon: SiTailwindcss, level: 80 },
    ],
  },
  {
    name: 'Backend',
    items: [
      { label: 'Node.js', icon: SiNodedotjs, level: 80 },
      { label: 'Python', icon: SiPython, level: 75 },
    ],
  },
  {
    name: 'Tools',
    items: [
      { label: 'Git', icon: SiGit, level: 85 },
      { label: 'GitHub', icon: SiGithub, level: 85 },
      { label: 'Vite', icon: SiVite, level: 80 },
      { label: 'Figma', icon: SiFigma, level: 65 },
    ],
  },
  {
    name: 'Others',
    items: [
      { label: 'MongoDB', icon: SiMongodb, level: 80 },
      { label: 'Linux', icon: SiLinux, level: 85 },
      { label: 'Ethical Hacking', icon: SiKalilinux, level: 75 },
      { label: 'Cyber Security', icon: SiSecurityscorecard, level: 70 },
    ],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -15])
  return (
    <div ref={ref} className="relative">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold mb-6"
      >
        Skills
      </motion.h2>
      <motion.div style={{ y }} className="grid md:grid-cols-2 gap-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors"
          >
            <h3 className="font-semibold mb-4">{cat.name}</h3>
            <div className="space-y-4">
              {cat.items.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                      <Icon className="text-slate-200" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-200">{item.label}</span>
                        <span className="text-slate-400">{item.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden border border-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.1 + idx * 0.05 }}
                          className="h-full bg-gradient-to-r from-brand-600 to-cyan-600"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}


