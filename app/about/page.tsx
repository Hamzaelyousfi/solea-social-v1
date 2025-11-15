'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '@/components/section-title'

const timeline = [
  {
    year: '2022',
    title: 'Naissance d\'une passion',
    description: 'Solea Socials est créée avec une conviction : les artisans et PME locales méritent une vraie stratégie digitale adaptée à leurs réalités.',
  },
  {
    year: '2023',
    title: 'Premiers succès',
    description: 'Accompagnement de nos premiers clients en Suisse romande. Résultats probants sur visibilité locale et engagement.',
  },
  {
    year: '2024',
    title: 'Expansion régionale',
    description: 'Croissance rapide avec partenariats à Yverdon, Neuchâtel et Lausanne. Reconnaissance du savoir-faire local.',
  },
  {
    year: '2025',
    title: 'Leader de la communication digitale locale',
    description: 'Accompagnement de 45+ artisans et PME. Mission: rendre visible chaque savoir-faire.',
  },
]

const values = [
  {
    title: 'Proximité',
    description: 'Nous comprenons les réalités des artisans et PME locales. Pas de jargon, que de la clarté.',
  },
  {
    title: 'Authenticité',
    description: 'Mettre en valeur votre vrai savoir-faire, pas le maquiller. Votre identité d\'abord.',
  },
  {
    title: 'Pédagogie',
    description: 'Nous vous aidons à comprendre le digital. Vous n\'êtes jamais perdus.',
  },
  {
    title: 'Résultats',
    description: 'Stratégie mesurable. On rend des comptes. Votre visibilité augmente vraiment.',
  },
]

export default function AboutPage() {
  const { ref: timelineRef, inView: timelineInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const { ref: valuesRef, inView: valuesInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <main>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            À propos de <span className="text-accent">Solea Socials</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Agence de communication digitale spécialisée dans l'accompagnement des artisans et petites entreprises de Suisse romande.
          </p>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 md:py-32 px-4 md:px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Notre histoire"
            subtitle="De la passion pour les artisans à une véritable agence de communication"
          />

          <div className="space-y-12 md:space-y-16">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -40 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex gap-6 md:gap-12"
              >
                <div className="flex-shrink-0">
                  <div className="w-24 md:w-32 text-2xl md:text-3xl font-bold text-accent">
                    {item.year}
                  </div>
                </div>
                <div className="flex-grow pb-8 border-l-2 border-accent/30 pl-6 md:pl-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Nos principes"
            subtitle="Ce qui guide chaque projet, chaque interaction avec nos clients"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="p-8 rounded-lg border border-border hover:border-accent/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-accent">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-foreground text-background">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Prêt à donner plus de lumière à votre savoir-faire ?
          </h2>
          <p className="text-lg text-background/80 mb-8">
            Parlons de votre projet. Nous sommes à l'écoute de vos besoins.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-bold rounded-full hover:bg-accent/90 transition-all duration-300 uppercase text-sm tracking-wider group"
          >
            Entrez en contact
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
