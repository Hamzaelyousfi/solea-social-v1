'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animation-variants'
import Container from '../container'
import Section from '../section'
import Link from 'next/link'

const services = [
  {
    title: 'Stratégie & Audit Digital',
    cta: 'En savoir plus',
    items: [
      'Audit complet web et réseaux',
      'Opportunités de visibilité locale',
      'Recommandations concrètes',
      'Feuille de route personnalisée',
    ],
  },
  {
    title: 'Création & Gestion de Contenus',
    cta: 'Voir nos créations',
    items: [
      'Posts attrayants et cohérents',
      'Gestion Google Business Profile',
      'Textes et visuels adaptés',
      'Planning mensuel clair',
    ],
  },
  {
    title: 'Événements & Accompagnement',
    cta: 'Planifier votre événement',
    items: [
      'Stratégie de communication',
      'Visuels et textes promotionnels',
      'Amplification réseaux sociaux',
      'Accompagnement disponible',
    ],
  },
]

export default function ServicesSection() {
  return (
    <Section>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
              Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Ce que nous faisons pour vous
            </h2>
          </motion.div>

          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group grid md:grid-cols-2 gap-12 md:gap-16 items-start pb-12 border-b border-border/30 last:border-b-0 last:pb-0"
              >
                {/* Left: Service Title and CTA */}
                <div className="flex flex-col">
                  <h3 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                    {service.title}
                  </h3>
                  <Link href="/services" className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all duration-300 group/btn">
                    <span>{service.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Right: Service Items List */}
                <div className="space-y-4 md:pt-2">
                  {service.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <p className="text-lg text-foreground/80 leading-relaxed">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Content Creation Visual Section */}
          <motion.div
            className="mt-16 relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Image - 40% */}
              <div className="w-full md:w-2/5">
                <div className="relative rounded-3xl overflow-hidden border-2 border-accent/20 shadow-2xl group">
                  <img
                    src="/solea/DSC00488.JPG"
                    alt="Création de contenu professionnel"
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Text - 60% */}
              <div className="w-full md:w-3/5">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
                >
                  Du contenu qui parle à vos clients
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-foreground/70 mb-6 leading-relaxed"
                >
                  Photos professionnelles, vidéos engageantes et textes authentiques qui reflètent vraiment votre savoir-faire artisanal.
                </motion.p>
                <motion.ul
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-foreground/80">Shooting photo sur site</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-foreground/80">Vidéos courtes optimisées pour Instagram & TikTok</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-foreground/80">Textes qui racontent votre histoire</span>
                  </li>
                </motion.ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
