import React from 'react'

export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <div className="text-xs uppercase tracking-wider text-slate-400">{subtitle}</div>
      <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
    </div>
  )
}


