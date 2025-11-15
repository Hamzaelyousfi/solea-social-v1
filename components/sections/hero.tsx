'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  const words = ['Pour', 'que', 'votre', 'savoir-faire', 'ne', 'reste', 'plus', 'dans', 'l\'ombre']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 pt-20 md:pt-0 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-accent/3 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 md:mt-16 mb-8 md:mb-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            {words.map((word) => (
              <motion.span
                key={word}
                variants={wordVariants}
                className="text-4xl md:text-6xl lg:text-8xl font-bold leading-tight"
              >
                {word === 'l\'ombre' ? (
                  <span className="text-accent">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-lg md:text-xl text-muted-foreground mb-2">
            Donnez plus de visibilité à votre savoir-faire local
          </p>
          <p className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground">
            Scroll pour découvrir
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <Link href="/services" className="px-8 py-3 bg-accent text-background font-semibold rounded-full hover:bg-accent/90 transition-all duration-300 uppercase text-sm tracking-wider">
            Voir les services
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  )
}
