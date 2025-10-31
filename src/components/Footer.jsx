import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-10">
      <div className="container-px mx-auto max-w-6xl pb-8">
        <div className="glass rounded-2xl px-4 py-5 flex items-center justify-center">
          <div className="text-sm text-slate-400 text-center">© {year} Jaya Prakash Narayana Rao Ravi. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}


