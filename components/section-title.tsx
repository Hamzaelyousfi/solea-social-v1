'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SectionTitleProps {
  title: string
  subtitle?: string
  accent?: boolean
}

export default function SectionTitle({ title, subtitle, accent = false }: SectionTitleProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12 md:mb-16"
    >
      <h2 className="text-section-title">
        {accent && <span className="text-accent">✦ </span>}
        {title}
      </h2>
      {subtitle && (
        <p className="text-large text-muted-foreground mt-4 max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
