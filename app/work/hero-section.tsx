'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

type HeroSectionProps = {
  founderImage?: string
  founderName?: string
  founderTitle?: string
}

export default function HeroSection({
  founderImage = '/solea/amandine-bg.webp',
  founderName = 'Amandine',
  founderTitle = 'Fondatrice de Solea Socials'
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const photoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      x: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const decorativeVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#FCEAE2] via-[#F7DCCF] to-[#E67E50] px-6 py-20 md:px-10 lg:px-16">
      {/* Decorative background elements */}
      <motion.div
        className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/20 blur-3xl"
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-orange-100/40 to-pink-100/30 blur-3xl"
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left side - Text content */}
          <motion.div className="order-2 lg:order-1" variants={textVariants}>
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 shadow-sm backdrop-blur-sm"
              variants={textVariants}
            >
              <span className="h-2 w-2 rounded-full bg-[#E67E50]" />
              <span className="text-sm font-medium text-neutral-700">
                Agence de communication digitale
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl lg:text-6xl"
              variants={textVariants}
            >
              Nous révélons{' '}
              <span className="relative inline-block">
                <span className="relative z-10">l'âme</span>
                <span className="absolute bottom-2 left-0 h-3 w-full bg-[#E67E50]/30 -skew-y-1" />
              </span>{' '}
              de votre marque
            </motion.h1>

            <motion.p
              className="mb-8 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg"
              variants={textVariants}
            >
              Des stratégies concrètes et mesurables pour accompagner les artisans
              et entreprises locales de Suisse romande dans leur transformation digitale.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              variants={textVariants}
            >
              <motion.button
                className="group relative overflow-hidden rounded-full bg-[#E67E50] px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                <Link href="/contact" className="relative z-10">Demander un audit gratuit</Link>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#E67E50] to-[#d86a3f]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                onClick={() => document.getElementById('realisations')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 font-medium text-neutral-700 transition-colors hover:text-[#E67E50]"
                whileHover={prefersReducedMotion ? {} : { x: 5 }}
              >
                <span>Voir nos réalisations</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </motion.button>
            </motion.div>

            {/* Stats/Social proof */}
            <motion.div
              className="mt-12 grid grid-cols-3 gap-6"
              variants={textVariants}
            >
              <div>
                <div className="text-2xl font-bold text-neutral-900 md:text-3xl">3+</div>
                <div className="text-sm text-neutral-600">Clients satisfaits</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900 md:text-3xl">150K+</div>
                <div className="text-sm text-neutral-600">Vues générées</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900 md:text-3xl">+62%</div>
                <div className="text-sm text-neutral-600">Croissance moy.</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-wider text-neutral-600"
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span className="font-medium">Scroll</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-400/50">
          <ArrowDown className="h-4 w-4" />
        </div>
      </motion.div>
    </section>
  )
}
