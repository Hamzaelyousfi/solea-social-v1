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

          {/* Bottom CTA Section */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 pt-12 border-t border-border/30 relative overflow-hidden rounded-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
              style={{
                backgroundImage: "url('/artisans-craftspeople-workshop-digital-transformat.png')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="text-lg text-foreground/70 max-w-2xl">
                Solea Socials accompagne les artisans et petites entreprises à devenir visibles et
                reconnus en ligne. Stratégie, contenus, événements : nous prenons en charge ce qui
                demande du temps pour que vous puissiez vous concentrer sur votre métier.
              </p>
              <div className="flex md:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
                >
                  Commencer maintenant
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}

