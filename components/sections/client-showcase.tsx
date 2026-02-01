'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const clients = [
  { name: 'Makemebeautiful', logoSrc: '/projects/logos/makemebeautifaul-logo.jpg' },
  { name: 'Ide Sport', logoSrc: '/projects/logos/175998262_934152537396667_569180.jpg' },
  { name: 'Visitaly', logoSrc: '/projects/logos/visitaly-logo.svg' },
]

const duplicatedClients = [...clients, ...clients]

const rowTransition = {
  duration: 40,
  repeat: Infinity,
  ease: 'linear',
}

function ClientRow({
  direction = 'rtl',
}: {
  direction?: 'rtl' | 'ltr'
}) {
  const animateX =
    direction === 'rtl'
      ? ['0%', '-50%']
      : ['-50%', '0%']

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-4 sm:gap-6 w-max"
        animate={{ x: animateX }}
        transition={rowTransition}
      >
        {duplicatedClients.map((client, index) => (
          <motion.div
            key={`${client.name}-${index}`}
            whileHover={{ scale: 1.04, y: -6 }}
            className="w-56 h-28 sm:w-64 sm:h-32 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center gap-3 sm:gap-4 px-4 sm:px-6 text-foreground/90"
          >
            <div className="relative h-10 w-24 sm:h-12 sm:w-28">
              <Image
                src={client.logoSrc}
                alt={`${client.name} logo`}
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-contain"
              />
            </div>
            <span className="text-sm sm:text-base md:text-lg font-semibold">
              {client.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default function ClientShowcase() {
  return (
    <section className="relative w-full py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-accent font-medium mb-2">
            Nos Clients
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un éventail de secteurs locaux et B2B qui misent sur une présence
            digitale claire et efficace.
          </p>
        </motion.div>

        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-muted/80 via-muted/40 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-muted/80 via-muted/40 to-transparent z-10" />

          <ClientRow direction="rtl" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 text-lg text-muted-foreground max-w-3xl mx-auto"
        >
          Votre secteur n'apparaît pas encore ? Contactez-nous et voyons
          comment adapter notre approche à votre activité.
        </motion.p>
      </div>
    </section>
  )
}
