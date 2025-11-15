'use client'

interface DividerProps {
  variant?: 'full' | 'accent' | 'muted'
  className?: string
}

export default function Divider({
  variant = 'muted',
  className = '',
}: DividerProps) {
  const variants = {
    full: 'bg-border',
    accent: 'bg-accent/20',
    muted: 'bg-border/50',
  }

  return <div className={`h-px w-full ${variants[variant]} ${className}`} />
}
