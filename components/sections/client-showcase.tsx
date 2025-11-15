'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from '@/components/section-title'

const clients = [
  { name: 'TechVenture', logo: '🚀' },
  { name: 'Luna Beauty', logo: '✨' },
  { name: 'Flow Studios', logo: '🎬' },
  { name: 'Nexus Eco', logo: '🌿' },
  { name: 'Pulse Marketing', logo: '📊' },
  { name: 'Urban Design', logo: '🏙️' },
]

export default function ClientShowcase() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Ils nous font confiance"
          subtitle="Solea Socials accompagne artisans et petites entreprises en Suisse romande"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="flex flex-col items-center justify-center p-6 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl md:text-5xl mb-3">{client.logo}</div>
              <p className="text-xs md:text-sm font-semibold text-center text-foreground/80">
                {client.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
