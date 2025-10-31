import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function Contact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -12])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      subject: formData.get('subject') || 'Portfolio Contact',
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        toast.success('Message sent successfully! I\'ll get back to you soon.')
        e.target.reset()
      } else {
        throw new Error(result.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Failed to send message. Please try again.')
    }
  }

  return (
    <div ref={ref} className="relative">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold mb-6"
      >
        Contact
      </motion.h2>
      <motion.div
        style={{ y }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="glass rounded-2xl p-6"
      >
        <form
          onSubmit={handleSubmit}
          className="grid sm:grid-cols-2 gap-4"
        >
          <div className="sm:col-span-1">
            <label className="text-sm text-slate-300">Name</label>
            <input name="name" required className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-600" placeholder="Your name" />
          </div>
          <div className="sm:col-span-1">
            <label className="text-sm text-slate-300">Email</label>
            <input name="email" type="email" required className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-600" placeholder="you@example.com" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-slate-300">Message</label>
            <textarea name="message" rows={5} required className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-brand-600" placeholder="How can I help?" />
          </div>
          <input type="hidden" name="subject" value="Portfolio Contact" />
          <div className="sm:col-span-2 flex items-center justify-between gap-4">
            <button type="submit" className="btn btn-primary">Send Message</button>
            <div className="flex items-center gap-3 text-slate-300">
              <a href="https://github.com/rjayaprakashnarayanarao/rjayaprakashnarayanarao" target="_blank" rel="noreferrer" className="icon-btn">
                <FiGithub />
              </a>
              <a href="https://www.linkedin.com/in/rjpnarayanarao/" target="_blank" rel="noreferrer" className="icon-btn">
                <FiLinkedin />
              </a>
              <a href="https://www.instagram.com/jay_____0009/" target="_blank" rel="noreferrer" className="icon-btn">
                <FiInstagram />
              </a>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}


