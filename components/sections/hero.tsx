'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const words = [
    { text: 'Pour', color: 'text-foreground' },
    { text: 'que', color: 'text-foreground' },
    { text: 'votre', color: 'text-foreground' },
    { text: 'savoir-faire', color: 'text-accent' },
    { text: 'ne', color: 'text-foreground' },
    { text: 'reste', color: 'text-foreground' },
    { text: 'plus', color: 'text-foreground' },
    { text: 'dans', color: 'text-foreground' },
    { text: "l'ombre", color: 'text-accent font-extrabold' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      },
    },
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orbs */}
        <motion.div
          style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          style={{ x: mousePosition.x * -0.3, y: mousePosition.y * -0.3 }}
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 pb-16 pt-24 md:px-6 md:pb-20 md:pt-32 lg:pt-20"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Text Content */}
            <motion.div
              className="flex flex-col justify-center space-y-6 md:space-y-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Top badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                </span>
                <span className="text-sm font-medium text-foreground">
                  Agence digitale en Suisse Romande
                </span>
              </motion.div>

              {/* Main Heading with word animation */}
              <motion.h1
                variants={containerVariants}
                className="relative"
              >
                <span className="flex flex-wrap items-start gap-2 md:gap-3">
                  {words.map((word, index) => (
                    <motion.span
                      key={`${word.text}-${index}`}
                      variants={wordVariants}
                      className={`text-4xl font-bold leading-tight md:text-5xl lg:text-6xl xl:text-7xl ${word.color}`}
                      style={{ display: 'inline-block' }}
                    >
                      {word.text}
                    </motion.span>
                  ))}
                </span>

                {/* Decorative underline for "l'ombre" */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="absolute -bottom-2 right-0 h-1 w-32 origin-left rounded-full bg-accent/30 md:w-40"
                />
              </motion.h1>

              {/* Subheading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="space-y-3"
              >
                <p className="text-lg leading-relaxed text-muted-foreground md:text-xl lg:text-2xl">
                  Nous gérons vos réseaux sociaux pendant que vous gérez votre métier
                </p>
                <p className="text-base text-muted-foreground/80 md:text-lg">
                  Stratégies concrètes, résultats mesurables, accompagnement personnalisé.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-accent px-8 py-4 font-bold text-background shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-accent/50"
                >
                  <span className="relative z-10 flex items-center gap-2 text-sm uppercase tracking-wider">
                    Obtenir un audit gratuit
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent via-accent/90 to-accent"
                    animate={{
                      x: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </Link>

                <Link
                  href="#realisations"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-accent/30 bg-background/50 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent/5"
                >
                  <span className="text-sm uppercase tracking-wider">Voir nos réalisations</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="flex flex-wrap items-center gap-6 pt-4"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-accent"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-medium">5.0 satisfaction client</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Image with 3D effect */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="relative lg:block"
            >
              {/* Decorative elements behind image */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -right-8 -top-8 h-64 w-64 rounded-full border-2 border-dashed border-accent/20"
              />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-8 -bottom-8 h-48 w-48 rounded-full bg-accent/10 blur-2xl"
              />

              {/* Main Image Container */}
              <motion.div
                className="group relative overflow-hidden rounded-3xl border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent shadow-2xl transition-all duration-500 hover:border-accent/40 hover:shadow-accent/20"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                style={{
                  transformStyle: 'preserve-3d',
                  x: mousePosition.x * 0.5,
                  y: mousePosition.y * 0.5,
                }}
              >
                <div className="relative h-[400px] overflow-hidden md:h-[500px] lg:h-[600px]">
                  <Image
                    src="/solea/DSC00437.JPG"
                    alt="Professionnelle travaillant sur son ordinateur - Solea Socials"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

                  {/* Floating badge on image */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">Résultats mesurables</p>
                        <p className="text-2xl font-bold text-white">+150K vues</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating elements around image */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -right-4 top-20 rounded-2xl border border-accent/20 bg-background/90 p-4 shadow-lg backdrop-blur-sm"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">62%</p>
                  <p className="text-xs text-muted-foreground">Croissance</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                className="absolute -left-4 bottom-32 rounded-2xl border border-accent/20 bg-background/90 p-4 shadow-lg backdrop-blur-sm"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">2+</p>
                  <p className="text-xs text-muted-foreground">Clients</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
