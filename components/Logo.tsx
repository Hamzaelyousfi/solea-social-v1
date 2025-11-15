// Logo.tsx - New component file
'use client'

interface LogoProps {
  variant?: 'svg' | 'image'
  className?: string
}

export default function Logo({ variant = 'svg', className = '' }: LogoProps) {
  if (variant === 'image') {
    return (
      <div className={`relative ${className}`}>
        <img 
          src="/logo.png" 
          alt="Solea Socials Logo" 
          className="h-8 md:h-10 w-auto"
        />
      </div>
    )
  }

  // SVG recreation of the logo with improved flower
  return (
    <svg
      viewBox="0 0 300 105"
      className={`h-8 md:h-10 w-auto ${className}`}
      aria-label="Solea Socials"
      role="img"
    >
      {/* "s" */}
      <text
        x="5"
        y="68"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="72"
        fontWeight="900"
        fill="#2D2D2D"
      >
        s
      </text>

      {/* Orange flower (replacing 'o') - using image */}
      <image
        href="/flower.png"
        x="20"
        y="-40"
        width="120"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* "lea" */}
      <text
        x="122"
        y="68"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="72"
        fontWeight="900"
        fill="#2D2D2D"
      >
        lea
      </text>

      {/* "Socials" - lighter weight, positioned below */}
      <text
        x="122"
        y="95"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="20"
        fontWeight="300"
        fill="#FF6B1A"
        letterSpacing="1.5"
      >
        Socials
      </text>
    </svg>
  )
}