'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from '@/components/section-title'

const stats = [
  { label: 'Entreprises accompagnées', value: 15 },
  { label: 'Visibilité augmentée', value: 180, suffix: '%' },
  { label: 'Mois pour voir résultats', value: 3 },
  { label: 'Clients Suisse Romande', value: 100, suffix: '%' },
]

const Counter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  useEffect(() => {
    if (!inView) return

    let current = 0
    const increment = target / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 30)

    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-accent">
      {count}
      {suffix}
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Chiffres qui parlent
          </h2>
          <p className="text-lg text-background/80 mt-4 max-w-2xl">
            Résultats concrets pour artisans et PME qui misent sur la communication digitale
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="border-l-2 border-accent pl-6"
            >
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-background/70 mt-3 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
