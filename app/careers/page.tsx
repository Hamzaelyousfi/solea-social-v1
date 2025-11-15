'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import SectionTitle from '@/components/section-title'
import { MapPin, Briefcase, ChevronDown } from 'lucide-react'

const openPositions = [
  {
    id: 1,
    title: 'Social Media Manager Junior',
    department: 'Réseaux Sociaux',
    location: 'Yverdon-les-Bains',
    type: 'Freelance',
    description:
      'Nous cherchons quelqu\'un de passionné pour aider nos clients artisans et PME à développer leur présence Instagram et TikTok. Connaissance du digital et envie d\'apprentissage requis.',
  },
  {
    id: 2,
    title: 'Créateur Contenu Photo/Vidéo',
    department: 'Contenu',
    location: 'Suisse romande',
    type: 'Freelance/CDI',
    description:
      'Rejoignez-nous pour valoriser le savoir-faire artisanal grâce à des photos et vidéos professionnelles. Vous serez en atelier avec nos clients pour captuler l\'essence de leurs métiers.',
  },
  {
    id: 3,
    title: 'Spécialiste SEO Local',
    department: 'Stratégie',
    location: 'Remote',
    type: 'CDI/Freelance',
    description:
      'Expert en SEO avec expérience en visibilité locale ? Nous avons besoin de vous pour aider nos petites entreprises à être trouvées sur Google localement.',
  },
  {
    id: 4,
    title: 'Rédacteur/Copywriter',
    department: 'Contenu',
    location: 'Suisse romande',
    type: 'Freelance',
    description:
      'Créez des messages convaincants pour petites entreprises. Du contenu web au storytelling de savoir-faire artisanal. Plume claire et engageante requise.',
  },
]

export default function CareersPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
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
            Rejoindre <span className="text-accent">Solea</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Nous grandissons et cherchons des profils créatifs en Suisse romande pour nous aider à accompagner artisans et PME.
          </p>
        </motion.div>
      </section>

      {/* Open Positions */}
      <section ref={ref} className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="Postes ouverts" subtitle="Rejoignez-nous en tant que freelance ou collaborateur" />

          <div className="space-y-4 md:space-y-6">
            {openPositions.map((position, i) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <button
                  onClick={() =>
                    setExpandedId(expandedId === position.id ? null : position.id)
                  }
                  className="w-full text-left p-6 border border-border hover:border-accent/50 rounded-lg transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Briefcase size={16} />
                          {position.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {position.location}
                        </div>
                        <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-semibold">
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedId === position.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={24} className="text-accent" />
                    </motion.div>
                  </div>

                  {/* Expanded Content */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedId === position.id ? 'auto' : 0,
                      opacity: expandedId === position.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 mt-6 border-t border-border">
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {position.description}
                      </p>
                      <button className="px-6 py-2 bg-accent text-background font-semibold rounded-full hover:bg-accent/90 transition-colors uppercase text-sm tracking-wider">
                        Apply Now
                      </button>
                    </div>
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Pourquoi rejoindre Solea Socials ?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Impact local',
                desc: 'Vos efforts aident vraiment de petites entreprises à briller sur le digital',
              },
              {
                title: 'Liberté créative',
                desc: 'Pas de bureaucratie. Des projets authentiques, pas d\'ennui marketing',
              },
              {
                title: 'Communauté',
                desc: 'Équipe bienveillante, échanges réguliers, ambiance collaborative',
              },
              {
                title: 'Flexibilité',
                desc: 'Freelance ou CDI, adapté à vos préférences. Travail en atelier ou remote',
              },
              {
                title: 'Apprentissage continu',
                desc: 'Vous apprenez aux côtés d\'experts en communication digitale',
              },
              {
                title: 'Rémunération juste',
                desc: 'Tarifs compétitifs et transparents. Pas de négociations pénibles',
              },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 border border-border rounded-lg hover:border-accent/50 transition-colors"
              >
                <h3 className="text-xl font-bold text-accent mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-foreground text-background">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Pas de poste qui vous intéresse ?
          </h2>
          <p className="text-lg text-background/80 mb-8">
            Envoyez-nous votre profil. Nous adorons découvrir de nouveaux talents.
          </p>
          <a
            href="mailto:info@soleasocials.ch"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-bold rounded-full hover:bg-accent/90 transition-all duration-300 uppercase text-sm tracking-wider"
          >
            Nous écrire
          </a>
        </motion.div>
      </section>
    </main>
  )
}
