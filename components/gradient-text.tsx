'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: ReactNode
  className?: string
}

export default function GradientText({
  children,
  className = '',
}: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  )
}
