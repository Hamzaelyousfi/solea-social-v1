'use client'

import { motion } from 'framer-motion'

const industries = [
  '🥐 Boulangeries & Pâtisseries',
  '🍽️ Restaurants & Cafés',
  '✂️ Salons de Coiffure & Beauté',
  '🛠️ Artisans & Ateliers',
  '⚕️ Professionnels de Santé',
  '🏪 Commerces Locaux',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function ClientShowcase() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-accent font-medium mb-2">
            Nos secteurs
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nous travaillons avec
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tous types d'artisans et petites entreprises de Suisse Romande
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 rounded-2xl border border-border/30 hover:border-accent/50 hover:shadow-lg hover:bg-background/80 transition-all duration-300 bg-background/50"
            >
              <p className="text-lg md:text-xl font-semibold text-foreground">
                {industry}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-lg text-muted-foreground max-w-3xl mx-auto"
        >
          Si votre secteur n'est pas listé, pas de problème ! Contactez-nous pour voir comment 
          nous pouvons adapter notre approche à votre réalité.
        </motion.p>
      </div>
    </section>
  )
}
