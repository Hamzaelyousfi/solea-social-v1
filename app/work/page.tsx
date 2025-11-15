'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '@/components/section-title'

const caseStudies = [
  {
    id: 'boulangerie-lac',
    slug: 'boulangerie-lac',
    title: 'Boulangerie du Lac - Refonte Instagram',
    category: 'Réseaux Sociaux',
    image: '/tech-startup-website.png',
    color: 'from-blue-500/10 to-cyan-500/10',
    stats: { visibilité: '180%', engagement: '+240%', clients: '35+' },
  },
  {
    id: 'atelier-bois',
    slug: 'atelier-bois',
    title: 'Atelier Bois & Matières - Stratégie Contenu',
    category: 'Stratégie',
    image: '/beauty-brand-design.png',
    color: 'from-rose-500/10 to-pink-500/10',
    stats: { portfolio: '+120', followers: '2.8K', taux: '12%' },
  },
  {
    id: 'clinique-dentaire',
    slug: 'clinique-dentaire',
    title: 'Clinique Dentaire du Centre - Campagne Locale',
    category: 'Réseaux Sociaux',
    image: '/creative-studio-content.jpg',
    color: 'from-purple-500/10 to-violet-500/10',
    stats: { rdv: '+85%', leads: '156', classement: '1er' },
  },
]

export default function WorkPage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
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
            Nos <span className="text-accent">réalisations</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Études de cas montrant comment nous aidons artisans et PME à développer leur visibilité digitale
          </p>
        </motion.div>
      </section>

      {/* Case Studies Grid */}
      <section ref={ref} className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12 md:space-y-20">
            {caseStudies.map((study, i) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
              >
                <Link
                  href={`/work/${study.slug}`}
                  className="group block"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-lg">
                      <div className={`aspect-square bg-gradient-to-br ${study.color} relative`}>
                        <motion.img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <p className="text-sm uppercase tracking-widest text-accent mb-4">
                        {study.category}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-accent transition-colors">
                        {study.title}
                      </h3>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {Object.entries(study.stats).map(([key, value]) => (
                          <div key={key}>
                            <p className="text-2xl font-bold text-accent">
                              {value}
                            </p>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground capitalize">
                              {key}
                            </p>
                          </div>
                        ))}
                      </div>

                      <motion.div
                        whileHover={{ x: 8 }}
                        className="inline-flex items-center gap-2 text-accent font-semibold uppercase text-sm tracking-wider"
                      >
                        Voir l'étude
                        <ArrowRight size={18} />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Vous avez un projet ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Parlons ensemble de comment nous pouvons aider votre entreprise à briller.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-bold rounded-full hover:bg-accent/90 transition-all duration-300 uppercase text-sm tracking-wider group"
          >
            Parlons du projet
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
