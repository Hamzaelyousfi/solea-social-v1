// Logo.tsx
'use client'

import { useState } from 'react'

interface LogoProps {
  variant?: 'svg' | 'image'
  className?: string
}

export default function Logo({ variant = 'svg', className = '' }: LogoProps) {
  const [imageError, setImageError] = useState(false)

  // Taille par défaut si le parent ne passe rien
  const sizeClass = className || 'h-10 w-auto'

  if (variant === 'image' && !imageError) {
    return (
      <img
        src="/logo.png"
        alt="Solea Socials Logo"
        className={sizeClass}
        onError={() => setImageError(true)}
      />
    )
  }

  return (
    <svg
      viewBox="0 0 300 105"
      className={sizeClass}
      aria-label="Solea Socials"
      role="img"
    >
      {/* ... ton SVG inchangé ... */}
    </svg>
  )
}
