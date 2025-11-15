'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ClosingCTA() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-4 md:px-6 bg-muted/50"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-lg md:text-2xl text-muted-foreground mb-4 leading-relaxed">
            « Pour que votre savoir-faire ne reste plus dans l'ombre, il faut une stratégie digitale adaptée à votre réalité. »
          </p>
          <p className="text-sm md:text-base text-muted-foreground">
            Parlons de votre projet et de comment nous pouvons vous aider.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background font-bold rounded-full hover:bg-accent/90 transition-all duration-300 uppercase text-sm tracking-wider group"
          >
            Parler de votre projet
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
