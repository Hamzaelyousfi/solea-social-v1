'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
}: AnimatedButtonProps) {
  const variants = {
    primary:
      'px-8 py-3 bg-accent text-background font-semibold rounded-full hover:bg-accent/90 transition-all',
    secondary:
      'px-8 py-3 bg-muted text-foreground font-semibold rounded-full hover:bg-muted/80 transition-all',
    outline:
      'px-8 py-3 border-2 border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-background transition-all',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${variants[variant]} ${className} uppercase text-sm tracking-wider`}
    >
      {children}
    </motion.button>
  )
}
