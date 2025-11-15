'use client'

import { cn } from '@/lib/utils'

interface BadgeProps {
  children: string
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md'
  className?: string
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
}: BadgeProps) {
  const variants = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent/10 text-accent',
  }

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }

  return (
    <span
      className={cn(
        `inline-block rounded-full font-semibold uppercase tracking-wider ${variants[variant]} ${sizes[size]}`,
        className
      )}
    >
      {children}
    </span>
  )
}
