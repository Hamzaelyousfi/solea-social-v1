'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/components/section-title'
import Container from '../container'
import Section from '../section'

const benefits = [
  {
    icon: '🎯',
    title: 'Spécialiste Local',
    description: 'Nous connaissons le marché suisse romand et ses particularités. Nous parlons votre langue et comprenons vos défis locaux.',
  },
  {
    icon: '⚡',
    title: 'Réactif & Disponible',
    description: 'Support en français, réponse rapide, suivi personnalisé. Pas de délais, pas de bureaucratie. Vous êtes prioritaire.',
  },
  {
    icon: '💡',
    title: 'Approche Authentique',
    description: 'Pas de robots, pas de templates générés par IA. Chaque stratégie et contenu est personnalisé pour votre marque unique.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export default function ProjectsSection() {
  return (
    <Section className="bg-background">
      <Container>
        <div className="space-y-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Pourquoi choisir Solea Socials
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ce qui nous rend différents des autres agences
            </p>
          </motion.div>

          {/* Main Visual + Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image - Left */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="hidden md:block"
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-accent/20 shadow-2xl group hover:shadow-accent/20 hover:border-accent/30 transition-all duration-500">
                <img
                  src="/solea/DSC00412.JPG"
                  alt="Flexible et réactif"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Benefits Cards - Right */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-6 rounded-2xl border border-border/30 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-muted/50 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Image - Below on small screens */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="block md:hidden"
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-accent/20 shadow-2xl group hover:shadow-accent/20 hover:border-accent/30 transition-all duration-500">
                <img
                  src="/solea/DSC00412.JPG"
                  alt="Flexible et réactif"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  )
}



