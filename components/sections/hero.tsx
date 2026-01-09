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
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { delay: 1.2, duration: 0.8 },
    },
  }

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 pt-20 md:pt-0 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-accent/3 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen">
          {/* Left Column - Text Content */}
          <motion.div className="flex flex-col justify-center">
            {/* Main Heading */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-8 md:mb-12"
            >
              <span className="flex flex-wrap items-start gap-2 md:gap-3">
                {words.map((word) => (
                  <motion.span
                    key={word}
                    variants={wordVariants}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  >
                    {word === 'l\'ombre' ? (
                      <span className="text-accent">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mb-8 md:mb-12"
            >
              <p className="text-lg md:text-xl text-muted-foreground mb-2">
                Nous gérons vos réseaux sociaux pendant que vous gérez votre métier
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-6 md:mb-8"
            >
              <Link href="/contact" className="inline-block px-8 py-4 bg-accent text-background font-bold rounded-full hover:bg-accent/90 transition-all duration-300 uppercase text-sm tracking-wider shadow-xl hover:shadow-2xl hover:scale-105">
                Obtenir un audit gratuit
              </Link>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-sm text-muted-foreground"
            >
              <p>✓ 15+ entreprises artisanales accompagnées en Suisse Romande</p>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:block relative lg:pt-6"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-accent/20 shadow-2xl hover:shadow-accent/20 hover:border-accent/30 transition-all duration-500 group w-full lg:w-[110%] lg:-mr-[10%]">
              <img
                src="/solea/DSC00437.JPG"
                alt="Femme avec laptop, mur rouge"
                className="w-full h-[460px] lg:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Mobile Image - Below Text on Small Screens */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="block lg:hidden mt-12 relative"
        >
          <div className="relative rounded-3xl overflow-hidden border-2 border-accent/20 shadow-2xl hover:shadow-accent/20 hover:border-accent/30 transition-all duration-500 group">
            <img
              src="/solea/DSC00437.JPG"
              alt="Femme avec laptop, mur rouge"
              className="w-full h-[350px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 block lg:hidden"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  )
}

