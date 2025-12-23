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
    role: 'Fondatrice & Directrice Strategie',
    location: 'Yverdon-les-Bains',
    image: '/placeholder.svg?key=sophie',
    bio: 'Experte en communication digitale avec 8+ ans d\'experience. Accompagnement sur-mesure pour artisans et PME.',
  },
]
export default function TeamPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { ref: leadershipRef, inView: leadershipInView } = useInView({
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
            La <span className="text-accent">fondatrice</span> Solea Socials
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Une fondatrice independante, proche de ses clients et specialisee en communication digitale pour artisans et PME.
          </p>
        </motion.div>
      </section>

      {/* Leadership */}
      <section ref={leadershipRef} className="py-20 md:py-32 px-4 md:px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Fondatrice" subtitle="Une seule interlocutrice, un accompagnement sur-mesure" />

          <div className="grid grid-cols-1 gap-8 md:gap-12 max-w-3xl mx-auto">
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
            Ma vision
          </h2>
          <p className="text-lg text-background/80 mb-8 leading-relaxed">
            Je privilege une approche humaine et pedagogique. Un seul contact, une ecoute attentive, et des actions utiles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'Proximite', desc: 'Proche de mes clients, ancree dans leurs realites locales' },
              { title: 'Pedagogie', desc: "J'explique, je n'impose pas. Transparence totale" },
              { title: 'Impact', desc: 'Des actions utiles, des resultats mesurables' },
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






