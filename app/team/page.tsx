'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import SectionTitle from '@/components/section-title'
import { Mail, Linkedin } from 'lucide-react'

const leadership = [
  {
    id: 1,
    name: 'Amandine Veillard',
    role: 'Fondatrice & consultante en communication digitale',
    location: 'Suisse romande',
    image: '/solea/DSC00488.webp',
    bio: 'J\'accompagne les artisans et les petites structures à clarifier leur message et à le traduire en contenus élégants, utiles et cohérents.',
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
            Incarner <span className="text-accent">Solea Socials</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Je m'appelle Amandine. Derrière Solea Socials, il y a une seule personne, une seule voix et un lien direct avec chaque projet.
          </p>
        </motion.div>
      </section>

      {/* Leadership */}
      <section ref={leadershipRef} className="py-20 md:py-32 px-4 md:px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Mon histoire" subtitle="Une trajectoire simple, des convictions profondes" />

          <p className="max-w-3xl mx-auto text-center text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
            Avant d'être CM, j'étais une fille qui filmait pour créer des souvenirs : voyages, couchers de soleil, moments simples. Puis je me suis dit : si je peux créer par passion pour moi, pourquoi pas pour les autres ? Cette envie est devenue un métier, puis une agence, avec une ligne claire : rester proche, sincère et attentive aux détails.
          </p>

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
                  <div className="relative aspect-square bg-gradient-to-br from-accent/10 to-accent/5">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
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
            Une communication qui ressemble à celles et ceux qu\'elle raconte : authentique, simple et inspirée. Je préfère le dialogue aux grandes promesses, la création au bruit, et la relation dans la durée.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'Authenticité', desc: 'Une parole vraie, sans artifices, avec respect pour chaque histoire' },
              { title: 'Proximité', desc: 'Un accompagnement attentif, et une présence à chaque étape' },
              { title: 'Création', desc: 'Des contenus pensés avec passion, pour marquer sans surjouer' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-background/10 rounded-lg">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-background/70">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-base md:text-lg text-background/80 mt-10">
            Je crois à la force des choses bien faites, et à la beauté des liens simples.
          </p>
        </motion.div>
      </section>
    </main>
  )
}







