'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from '@/components/section-title'

const projects = [
  {
    id: 1,
    title: 'Boulangerie du Lac - Instagram & Google Business',
    category: 'Réseaux Sociaux',
    image: '/tech-startup-website.png',
    description: 'Refonte de présence Instagram et optimisation Google Business pour une boulangerie à Yverdon',
  },
  {
    id: 2,
    title: 'Atelier Bois & Matières - Contenu Photo/Vidéo',
    category: 'Stratégie',
    image: '/beauty-brand-design.png',
    description: 'Création de contenu et stratégie éditoriale pour un atelier artisanal à Neuchâtel',
  },
  {
    id: 3,
    title: 'Clinique Dentaire du Centre - Campagne Locale',
    category: 'Réseaux Sociaux',
    image: '/creative-studio-content.jpg',
    description: 'Campagne de visibilité locale et optimisation prise de rendez-vous en ligne à Lausanne',
  },
  {
    id: 4,
    title: 'Restaurant Au Cœur - Stratégie Digitale',
    category: 'Stratégie',
    image: '/sustainable-eco-brand.jpg',
    description: 'Audit digital et planification de contenu pour restaurant familial en Suisse romande',
  },
  {
    id: 5,
    title: 'Coiffure Le Style - Engagement Local',
    category: 'Réseaux Sociaux',
    image: '/modern-architecture.png',
    description: 'Stratégie de contenu et engagement communautaire pour coiffure artisanale',
  },
  {
    id: 6,
    title: 'Agence Immobilière Romande - SEO Local',
    category: 'Stratégie',
    image: '/data-analytics-dashboard.png',
    description: 'Optimisation SEO et stratégie de contenu pour améliorer visibilité locale',
  },
]

const categories = ['Tous', 'Stratégie', 'Réseaux Sociaux']

export default function ProjectsSection() {
  const [selected, setSelected] = useState('Tous')
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const filtered =
    selected === 'Tous' ? projects : projects.filter((p) => p.category === selected)

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 md:px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Nos réalisations"
          subtitle="Découvrez comment nous aidons artisans et PME à développer leur présence digitale"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelected(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                selected === cat
                  ? 'bg-accent text-background'
                  : 'border border-border hover:border-accent text-foreground'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <div className="aspect-square bg-gradient-to-br from-accent/10 to-accent/5 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Voir le projet
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
