'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from '@/components/section-title'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const teamHighlights = [
  { number: '45+', label: 'Team Members' },
  { number: '150+', label: 'Successful Projects' },
  { number: '8', label: 'Years of Excellence' },
  { number: '15+', label: 'Industry Awards' },
]

export default function TeamPreview() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="L'équipe Solea Socials"
          subtitle="Une équipe à taille humaine, proche de ses clients, spécialisée en communication digitale"
        />

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {teamHighlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {item.number}
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA to Team Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-background transition-all duration-300 uppercase text-sm tracking-wider group"
          >
            Rencontrer l'équipe
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
