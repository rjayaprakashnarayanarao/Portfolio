import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactModal({ isOpen, onClose }) {
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
        onClose()
      } else {
        throw new Error(result.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Failed to send message. Please try again.')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl glass rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors" aria-label="Close">
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Send me a message</h3>
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
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
              <div className="sm:col-span-2 flex justify-end">
                <button type="submit" className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 transition-colors">Send</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


