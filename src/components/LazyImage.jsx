import React from 'react'

export default function LazyImage({ src, alt, className, ...props }) {
  const [loaded, setLoaded] = React.useState(false)
  const [error, setError] = React.useState(false)

  return (
    <div className={`relative ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/30 to-cyan-600/20 animate-pulse rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        loading="lazy"
        {...props}
      />
    </div>
  )
}
