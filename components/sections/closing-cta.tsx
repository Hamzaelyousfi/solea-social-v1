'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

export default function ClosingCTA() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const fadeInAnimations = {
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.8 },
  }

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 },
    transition: { delay: 0.3, duration: 0.6 },
  }

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/solea/DSC00467.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          {...fadeInAnimations}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
        >
          Prêt à donner de la visibilité à votre savoir-faire ?
        </motion.h2>

        <motion.p
          {...fadeInAnimations}
          transition={{ ...fadeInAnimations.transition, delay: 0.1 }}
          className="text-xl text-foreground/80 mb-4"
        >
          Commençons par un audit gratuit de votre présence en ligne
        </motion.p>

        <motion.p
          {...fadeInAnimations}
          transition={{ ...fadeInAnimations.transition, delay: 0.2 }}
          className="text-sm text-accent font-medium mb-10"
        >
          ⚡ Places limitées • 3 nouveaux clients par mois maximum
        </motion.p>

        <motion.div
          {...buttonVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          {/* Primary CTA */}
          <Link
            href="/contact"
            className="px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent/90 transition-all duration-300 uppercase text-sm tracking-wider shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Réserver mon audit gratuit
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/services"
            className="px-8 py-4 border-2 border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white transition-all duration-300 uppercase text-sm tracking-wider"
          >
            Voir les services & tarifs
          </Link>
        </motion.div>

        <motion.p
          {...fadeInAnimations}
          transition={{ ...fadeInAnimations.transition, delay: 0.4 }}
          className="text-sm text-foreground/60"
        >
          ✓ Sans engagement • ✓ Audit personnalisé • ✓ Conseils actionnables
        </motion.p>
      </div>
    </section>
  )
}
