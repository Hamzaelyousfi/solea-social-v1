'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import SectionTitle from '@/components/section-title'
import { Mail, Linkedin } from 'lucide-react'

const leadership = [
  {
    id: 1,
    name: 'Sophie Moreau',
    role: 'Fondatrice & Directrice Stratégie',
    location: 'Yverdon-les-Bains',
    image: '/placeholder.svg?key=sophie',
    bio: 'Expert en communication digitale avec 8+ ans d\'expérience. Passionnée par l\'accompagnement des artisans locaux.',
  },
  {
    id: 2,
    name: 'Marc Bourgeois',
    role: 'Co-fondateur & Expert SEO/SEM',
    location: 'Neuchâtel',
    image: '/placeholder.svg?key=marc',
    bio: 'Spécialiste en stratégie digitale et visibilité locale. Amoureux de la Suisse romande.',
  },
  {
    id: 3,
    name: 'Clara Dupont',
    role: 'Directrice Réseaux Sociaux',
    location: 'Lausanne',
    image: '/placeholder.svg?key=clara',
    bio: 'Créative passionnée par les histoires authentiques. Experte en contenu qui engage.',
  },
]

const team = [
  {
    id: 4,
    name: 'Ana Gutierrez',
    role: 'Senior Strategist',
    location: 'Buenos Aires',
    image: '/placeholder.svg?key=ana',
  },
  {
    id: 5,
    name: 'Pedro Ortiz',
    role: 'Lead Designer',
    location: 'São Paulo',
    image: '/placeholder.svg?key=pedro',
  },
  {
    id: 6,
    name: 'Laura Sánchez',
    role: 'Content Director',
    location: 'Buenos Aires',
    image: '/placeholder.svg?key=laura',
  },
  {
    id: 7,
    name: 'Carlos Mendez',
    role: 'Performance Marketing Lead',
    location: 'Santiago',
    image: '/placeholder.svg?key=carlos',
  },
  {
    id: 8,
    name: 'Valentina Ruiz',
    role: 'Social Media Manager',
    location: 'São Paulo',
    image: '/placeholder.svg?key=valentina',
  },
  {
    id: 9,
    name: 'Miguel Torres',
    role: 'Brand Strategist',
    location: 'Buenos Aires',
    image: '/placeholder.svg?key=miguel',
  },
]

export default function TeamPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { ref: leadershipRef, inView: leadershipInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })
  const { ref: teamRef, inView: teamInView } = useInView({
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
            L'<span className="text-accent">équipe</span> Solea
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Petite équipe à taille humaine, très proche de ses clients, spécialisée en communication digitale pour artisans et PME.
          </p>
        </motion.div>
      </section>

      {/* Leadership */}
      <section ref={leadershipRef} className="py-20 md:py-32 px-4 md:px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Direction" subtitle="Les personnes à l'origine de Solea Socials" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {leadership.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                animate={leadershipInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <div className="aspect-square bg-gradient-to-br from-accent/10 to-accent/5">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.div
                    animate={{
                      opacity: hoveredId === member.id ? 1 : 0,
                      y: hoveredId === member.id ? 0 : 20,
                    }}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                  >
                    <a href={`mailto:${member.name.replace(' ', '.').toLowerCase()}@soleasocials.com`}
                      className="p-2 bg-white rounded-full hover:bg-accent transition-colors"
                    >
                      <Mail size={20} className="text-black" />
                    </a>
                    <a href="#" className="p-2 bg-white rounded-full hover:bg-accent transition-colors">
                      <Linkedin size={20} className="text-black" />
                    </a>
                  </motion.div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                <p className="text-accent font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.location}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Nos collaborateurs" subtitle="Profils créatifs en Suisse romande" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={teamInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg mb-3 aspect-square cursor-pointer">
                  <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent/5">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.div
                    animate={{
                      opacity: hoveredId === member.id ? 1 : 0,
                      y: hoveredId === member.id ? 0 : 10,
                    }}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center"
                  >
                    <span className="text-white font-semibold text-xs text-center">
                      {member.role}
                    </span>
                  </motion.div>
                </div>
                <h4 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                  {member.name}
                </h4>
                <p className="text-xs text-muted-foreground">{member.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-foreground text-background">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Notre culture
          </h2>
          <p className="text-lg text-background/80 mb-8 leading-relaxed">
            Nous croyons en une approche humaine et pédagogique. Chaque membre de l'équipe a une voix, et nous écoutons nos clients comme nos partenaires.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'Proximité', desc: 'Proches de nos clients, connaisseurs de leurs réalités locales' },
              { title: 'Pédagogie', desc: 'Nous expliquons, nous n\'imposons pas. Transparence totale' },
              { title: 'Impact', desc: 'Nos actions doivent produire des résultats mesurables et tangibles' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-background/10 rounded-lg">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-background/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  )
}
