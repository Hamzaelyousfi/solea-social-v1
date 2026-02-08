'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

export default function ClosingCTA() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const decorativeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: prefersReducedMotion ? 0 : 1.2, ease: 'easeOut' },
    },
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[#FCEAE2] via-[#F7DCCF] to-[#E67E50] px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <motion.div
        className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/20 blur-3xl"
        variants={decorativeVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[460px] w-[460px] rounded-full bg-gradient-to-tr from-orange-100/40 to-pink-100/30 blur-3xl"
        variants={decorativeVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.h2
          variants={textVariants}
          className="mb-6 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl lg:text-6xl"
        >
          Prêt à donner de la{' '}
          <span className="relative inline-block">
            <span className="relative z-10">visibilité</span>
            <span className="absolute bottom-2 left-0 h-3 w-full bg-[#E67E50]/30 -skew-y-1" />
          </span>{' '}
          à votre savoir-faire ?
        </motion.h2>

        <motion.p
          variants={textVariants}
          className="mb-4 text-base leading-relaxed text-neutral-600 md:text-lg"
        >
          Commençons par un audit gratuit de votre présence en ligne.
        </motion.p>

        <motion.p
          variants={textVariants}
          className="mb-10 text-sm font-semibold uppercase tracking-[0.2em] text-[#E67E50] md:text-base"
        >
          Places limitées • 3 nouveaux clients par mois maximum
        </motion.p>

        <motion.div
          variants={textVariants}
          className="mb-8 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-[#E67E50] px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
          >
            <span className="relative z-10">Réserver mon audit gratuit</span>
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#E67E50] to-[#d86a3f] transition-transform duration-300 group-hover:translate-x-0"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/services"
            className="rounded-full border-2 border-[#E67E50] px-8 py-4 font-semibold text-[#E67E50] transition-all duration-300 hover:bg-[#E67E50] hover:text-white"
          >
            Voir les services & tarifs
          </Link>
        </motion.div>

        <motion.p variants={textVariants} className="text-sm text-neutral-600">
          ✓ Sans engagement • ✓ Audit personnalisé • ✓ Conseils actionnables
        </motion.p>
      </motion.div>
    </section>
  )
}
