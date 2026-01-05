'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animation-variants'
import Container from '../container'
import Section from '../section'

const steps = [
  {
    number: 1,
    icon: '📊',
    title: 'Audit Gratuit',
    description: 'Analyse complète de votre présence actuelle et identification des opportunités',
  },
  {
    number: 2,
    icon: '🎯',
    title: 'Stratégie Sur-Mesure',
    description: 'Plan personnalisé adapté à votre secteur et vos objectifs commerciaux',
  },
  {
    number: 3,
    icon: '✨',
    title: 'Création de Contenu',
    description: 'Photos, vidéos et textes authentiques qui reflètent votre savoir-faire',
  },
  {
    number: 4,
    icon: '📈',
    title: 'Résultats Mesurables',
    description: 'Rapport mensuel détaillé de vos progrès et ajustements stratégiques',
  },
]

export default function HowItWorksSection() {
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
      transition: { duration: 0.8 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  }

  return (
    <Section className="bg-muted/30">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Comment nous vous aidons à briller en ligne
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un processus clair et efficace, adapté à votre réalité d'artisan ou petite entreprise
            </p>
          </motion.div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Process Steps */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className="group p-6 rounded-2xl border border-border/30 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-background/50"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-accent text-white font-bold flex items-center justify-center text-xl flex-shrink-0 group-hover:shadow-lg group-hover:shadow-accent/50 transition-all">
                      {step.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                        <span>{step.icon}</span>
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right: Visual Assembly */}
            <div className="hidden lg:block space-y-6 relative h-[700px]">
              {/* Large Image - Sticky Notes */}
              <motion.div
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="absolute top-0 left-0 w-4/5 rounded-2xl border-2 border-accent/10 shadow-xl overflow-hidden"
              >
                <img
                  src="/solea/DSC00506.JPG"
                  alt="Stratégie avec sticky notes"
                  className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              {/* Small Image - Phone Recording */}
              <motion.div
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 right-0 w-3/5 rounded-2xl border-2 border-accent/10 shadow-xl overflow-hidden -rotate-3"
              >
                <img
                  src="/solea/DSC00452.JPG"
                  alt="Téléphone sur trépied"
                  className="w-full aspect-video object-cover hover:scale-135 transition-transform duration-700"
                />
              </motion.div>
            </div>

            {/* Mobile: Images Below Steps */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:hidden space-y-6"
            >
              <motion.div
                variants={imageVariants}
                className="rounded-2xl border-2 border-accent/10 shadow-xl overflow-hidden"
              >
                <img
                  src="/data-analytics-dashboard.png"
                  alt="Stratégie avec sticky notes"
                  className="w-full h-[300px] object-cover"
                />
              </motion.div>
              <motion.div
                variants={imageVariants}
                className="rounded-2xl border-2 border-accent/10 shadow-xl overflow-hidden"
              >
                <img
                  src="/creative-studio-content.jpg"
                  alt="Téléphone sur trépied"
                  className="w-full h-[250px] object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

