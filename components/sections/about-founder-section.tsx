'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animation-variants'
import Container from '../container'
import Section from '../section'
import Link from 'next/link'

export default function AboutFounderSection() {
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  }

  return (
    <Section className="bg-muted/30">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column - Image (on desktop, or bottom on mobile via flex-col-reverse) */}
            <motion.div
              variants={imageVariants}
              className="order-2 md:order-1"
            >
              <div className="relative rounded-3xl border-2 border-accent/15 shadow-2xl overflow-hidden group">
                <img
                  src="/solea/DSC00429.JPG"
                  alt="Fondatrice Solea Socials"
                  className="w-full h-[800px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Optional secondary image overlay */}
              {/* <div className="absolute bottom-4 right-4 w-48 rounded-2xl border-4 border-background shadow-xl overflow-hidden">
                <img
                  src="/modern-architecture.png"
                  alt="Secondary"
                  className="w-full h-40 object-cover"
                />
              </div> */}
            </motion.div>

            {/* Right Column - Text Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 md:order-2 flex flex-col justify-center"
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <p className="text-sm font-medium text-accent tracking-widest uppercase mb-2">
                  Qui suis-je
                </p>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
              >
                Votre partenaire digital en Suisse Romande
              </motion.h2>

              <motion.div
                variants={fadeInUp}
                className="space-y-4 mb-8 text-lg leading-relaxed text-foreground/70"
              >
                <p>
                  Je suis spécialisée en communication digitale pour artisans et entreprises locales. 
                  Après plusieurs années dans le marketing digital, j'ai fondé Solea Socials avec une 
                  mission simple : aider les talents locaux à être vus et reconnus en ligne.
                </p>
                <p>
                  Je comprends vos défis : le temps manque, la technique intimide, et vous préférez 
                  vous concentrer sur votre métier. C'est exactement pour ça que j'existe. Je prends 
                  en charge ce qui demande du temps et de l'expertise pour que vous puissiez vous 
                  concentrer sur ce que vous faites le mieux.
                </p>
              </motion.div>

              {/* Trust Elements */}
              <motion.div
                variants={fadeInUp}
                className="space-y-3 mb-10 pb-10 border-b border-border/30"
              >
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl flex-shrink-0">✓</span>
                  <span className="text-foreground/80">Basée en Suisse Romande</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl flex-shrink-0">✓</span>
                  <span className="text-foreground/80">Spécialisée en stratégie locale et réseaux sociaux</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl flex-shrink-0">✓</span>
                  <span className="text-foreground/80">Support en français, réponse rapide, accompagnement personnalisé</span>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent/90 transition-all duration-300 uppercase text-sm tracking-wider shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white transition-all duration-300 uppercase text-sm tracking-wider"
                >
                  Réserver un appel
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

