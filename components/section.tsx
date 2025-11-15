'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'muted' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export default function Section({
  children,
  className = '',
  variant = 'default',
  size = 'lg',
}: SectionProps) {
  const variants = {
    default: 'bg-background',
    muted: 'bg-muted/30',
    dark: 'bg-foreground text-background',
  }

  const sizes = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-20 md:py-32',
  }

  return (
    <section className={cn(`${variants[variant]} ${sizes[size]}`, className)}>
      {children}
    </section>
  )
}
