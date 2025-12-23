'use client'

import { motion } from 'framer-motion'

const clientLogos = ['Atelier Nova', 'Maison Sora', 'Valdore', 'Luna Hotels', 'Atelier des Cimes', 'TerraViva', 'Studio Folio']

export default function ClientShowcase() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(255,107,26,0.12)_0%,_transparent_55%)]" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 rounded-[2.5rem] border border-white/20 bg-background/80 p-10 text-center backdrop-blur-3xl">
        <p className="text-sm uppercase tracking-[0.4em] text-foreground/60">Ils nous font confiance</p>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-16 whitespace-nowrap text-2xl font-semibold text-foreground/60"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          >
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <span key={`${logo}-${index}`} className="uppercase tracking-[0.4em] text-foreground/30">
                {logo}
              </span>
            ))}
          </motion.div>
        </div>
        <p className="mx-auto max-w-3xl text-lg text-foreground/70">
          Des maisons artisanales, des start-ups et des acteurs institutionnels pilotent leurs campagnes avec Solea Socials pour beneficier d'une vision orchestree des contenus et des activations.
        </p>
      </div>
    </section>
  )
}
