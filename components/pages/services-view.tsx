'use client'

import Link from 'next/link'
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import ClientShowcase from '@/components/sections/client-showcase'

type ServiceCardContent = {
  id: string
  title: string
  description: string
  features: string[]
  tag: string
  cta: {
    label: string
    href: string
  }
  accent: string
  background: string
}

const services: ServiceCardContent[] = [
  {
    id: '01',
    title: 'Stratégie & Audit Digital',
    description:
      'Élaborez une stratégie digitale personnalisée grâce à nos audits de présence en ligne, nos analyses de performance et nos plans éditoriaux adaptés à vos objectifs business.',
    features: [
      'Audit complet de présence en ligne',
      'Analyse de performance & insights',
      'Planification stratégique trimestrielle',
      'Veille concurrentielle continue',
    ],
    tag: 'Audit premium',
    cta: { label: 'Demander un audit', href: '/contact' },
    accent: 'from-accent/70 to-orange-400/40',
    background: 'bg-gradient-to-br from-background via-white to-secondary/30',
  },
  {
    id: '02',
    title: 'Création & Gestion de Contenus',
    description:
      'Nous produisons photos, vidéos et textes qui incarnent votre marque. Chaque contenu est optimisé pour votre audience, votre SEO et vos campagnes sociales.',
    features: [
      'Création de contenus visuels',
      'Rédaction et SEO éditorial',
      'Calendrier éditorial pilote',
      'Community management premium',
    ],
    tag: 'Studios',
    cta: { label: 'Découvrir', href: '/work' },
    accent: 'from-amber-200/60 to-accent/60',
    background: 'bg-gradient-to-br from-secondary/40 via-white to-background',
  },
  {
    id: '03',
    title: 'Événements & Accompagnement',
    description:
      "Bénéficiez d'un accompagnement personnalisé pour vos lancements, salons et campagnes locales afin d'offrir des expériences phygitales mémorables.",
    features: [
      'Accompagnement événementiel',
      'Campagnes digitales locales',
      'Stratégie 360° sur mesure',
    ],
    tag: 'Live',
    cta: { label: 'Planifier', href: '/contact' },
    accent: 'from-orange-300/60 via-accent/50 to-orange-500/30',
    background: 'bg-gradient-to-br from-white via-background to-secondary/20',
  },
  {
    id: '04',
    title: 'Graphisme & Design',
    description:
      "Création d'une identité visuelle de marque, branding et supports graphiques cohérents pour valoriser votre univers.",
    features: [
      'Identité visuelle & logo',
      'Branding & charte graphique',
      'Templates pour réseaux sociaux',
      'Supports print & digitaux',
    ],
    tag: 'Design',
    cta: { label: 'Parler design', href: '/contact' },
    accent: 'from-orange-200/70 via-amber-200/60 to-accent/40',
    background: 'bg-gradient-to-br from-background via-white to-secondary/20',
  },
]

const processSteps = [
  {
    title: 'Immersion',
    copy: 'Consultation initiale, compréhension de votre métier, identification des points bloquants.',
    duration: 'Semaine 01',
  },
  {
    title: 'Stratégie',
    copy: 'Audit, positionnement et feuille de route opérationnelle sur 90 jours.',
    duration: 'Semaines 02-03',
  },
  {
    title: 'Création',
    copy: 'Production des contenus, préparation des assets, raffinage des messages clés.',
    duration: 'Semaines 04-07',
  },
  {
    title: 'Activation',
    copy: 'Déploiement multi-plateformes, automatisations et reporting live.',
    duration: 'Semaines 08-09',
  },
  {
    title: 'Suivi',
    copy: 'Optimisation continue, ateliers internes et nouvelles opportunités de croissance.',
    duration: 'Continu',
  },
]

const heroHighlights = [
  { title: '+120%', copy: 'de portée moyenne après 3 mois' },
  { title: '2', copy: 'marques accompagnées en 2025' },
  { title: '360°', copy: 'vision stratégique & créative' },
]

const gradientMask =
  'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.0) 55%)'

export default function ServicesView() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const glowY = useTransform(heroScroll, [0, 1], ['0%', '45%'])
  const glowOpacity = useTransform(heroScroll, [0, 1], [0.9, 0.2])

  return (
    <main className="relative overflow-hidden bg-background text-foreground scroll-smooth">
      <motion.div
        aria-hidden
        className="fixed left-0 top-0 z-40 h-1 w-full origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />

      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center sm:px-12 lg:px-20"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-90"
          style={{
            background: 'radial-gradient(circle at 20% 20%, rgba(255,107,26,0.18), transparent 55%)',
            mixBlendMode: 'screen',
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: gradientMask,
            filter: 'blur(40px)',
            y: glowY,
            opacity: glowOpacity,
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-sm uppercase tracking-[0.4em] text-foreground/60"
        >
          Nos Services
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-black uppercase leading-tight sm:text-6xl lg:text-7xl"
        >
          Des solutions digitales complètes
          <br className="hidden sm:block" /> pour propulser votre marque
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 max-w-3xl text-base text-foreground/70 sm:text-lg"
        >
          Solea Socials orchestre stratégie, création et activation avec un niveau de précision digne des studios les plus exigeants.
          Inspirez, engagez et convertissez grâce à des expériences digitales immersives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid w-full max-w-4xl gap-6 text-left sm:grid-cols-3"
        >
          {heroHighlights.map((highlight) => (
            <div
              key={highlight.title}
              className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.08)]"
            >
              <div className="text-4xl font-black text-accent">{highlight.title}</div>
              <p className="mt-2 text-sm uppercase tracking-wide text-foreground/60">{highlight.copy}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.4em]"
        >
          <span className="text-foreground/60">Scroll to explore</span>
          <ArrowDownRight className="h-5 w-5 text-accent" />
        </motion.div>
      </section>

      <section className="space-y-24 px-6 pb-32 pt-10 sm:px-10 lg:px-24">
        {services.map((service, index) => (
          <ServiceCard key={service.id} data={service} reverse={index % 2 === 1} />
        ))}
      </section>

      <section className="relative px-6 py-24 sm:px-10 lg:px-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-black/5 bg-white/80 p-10 shadow-[0_25px_120px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
          <div className="flex flex-col gap-16">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-foreground/50">Notre Processus</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-foreground sm:text-5xl">
                Une trajectoire maîtrisée, du brief jusqu'au suivi continu
              </h2>
            </div>
            <div className="space-y-10">
              {processSteps.map((step, index) => (
                <ProcessRow key={step.title} index={index} {...step} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClientShowcase />

      <section className="relative px-6 pb-32 pt-10 sm:px-10 lg:px-24">
        <div className="rounded-[3rem] border border-transparent bg-gradient-to-br from-accent via-orange-500 to-amber-400 p-[1px]">
          <div className="rounded-[3rem] bg-background px-10 py-16 text-center sm:px-16">
            <p className="text-sm uppercase tracking-[0.4em] text-foreground/60">Travaillons ensemble</p>
            <h2 className="mt-6 text-4xl font-black uppercase leading-tight text-foreground sm:text-5xl">
              Prêt à transformer votre présence digitale ?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-foreground/80 sm:text-lg">
              Réservez une session stratégique avec notre équipe pour cartographier vos priorités et activer la bonne combinaison de services.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="https://calendly.com/soleasocials-info/30min"
                className="inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-background transition hover:bg-foreground/90"
              >
                Discutons de votre projet
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-3 rounded-full border border-foreground/30 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-foreground transition hover:border-foreground hover:text-foreground"
              >
                Voir nos réalisations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ServiceCard({ data, reverse }: { data: ServiceCardContent; reverse?: boolean }) {
  return (
    <MagneticCard
      className={`group relative grid gap-12 overflow-hidden rounded-[3rem] border border-white/10 p-10 text-left backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.08)] ${
        reverse ? 'md:grid-cols-[1fr_0.9fr] md:text-right' : 'md:grid-cols-[0.9fr_1fr]'
      } ${data.background}`}
    >
      <div className={`space-y-6 ${reverse ? 'md:order-2' : ''}`}>
        <div className="flex items-center gap-4 text-sm uppercase tracking-[0.4em] text-foreground/60">
          <AnimatedCounter value={parseInt(data.id, 10)} />
          <span className="rounded-full border border-white/20 px-4 py-1 text-xs tracking-[0.3em] text-foreground/60">
            {data.tag}
          </span>
        </div>
        <h3 className="text-3xl font-black uppercase leading-tight text-foreground sm:text-5xl">{data.title}</h3>
        <p className="text-base text-foreground/70 sm:text-lg">{data.description}</p>
        <motion.ul className="space-y-3">
          {data.features.map((feature, index) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: reverse ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true, margin: '-10%' }}
              className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-foreground/60"
            >
              <span className="h-px w-10 bg-foreground/30" />
              {feature}
            </motion.li>
          ))}
        </motion.ul>
        <Link
          href={data.cta.href}
          className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-foreground transition hover:text-accent"
        >
          {data.cta.label}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className={`${reverse ? 'md:order-1' : ''}`}>
        <ServiceMediaMock id={data.id} accent={data.accent} reverse={reverse} />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 ease-out group-hover:opacity-100" style={{ backgroundImage: gradientMask }} />
    </MagneticCard>
  )
}

function ServiceMediaMock({ id, accent, reverse }: { id: string; accent: string; reverse?: boolean }) {
  const baseClass =
    'absolute inset-0 rounded-[2.5rem] border border-white/20 bg-white/10 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.12)]'

  if (id === '01') {
    return (
      <div className="relative min-h-[320px]">
        <motion.div
          className={`${baseClass} ${reverse ? 'ml-auto' : ''}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8 }}
        >
          <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${accent} opacity-80`} />
          <div className="relative flex h-full flex-col justify-between p-8 text-black">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-black/70">Audit</p>
              <p className="mt-2 text-3xl font-black">360°</p>
            </div>
            <div className="space-y-3 text-sm text-black/70">
              <p>Visibilité locale</p>
              <p>Positionnement</p>
              <p>Mix média</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (id === '02') {
    return (
      <div className="relative flex flex-col gap-6">
        <motion.div
          className="relative z-10 w-full rounded-3xl border border-white/30 bg-white/40 p-6 backdrop-blur-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">Calendrier</p>
          <div className="mt-4 space-y-3">
            {['Lundi - preview atelier', 'Mercredi - étude matières', 'Vendredi - live Q&A'].map((item) => (
              <div key={item} className="rounded-2xl bg-white/60 px-4 py-3 text-sm font-semibold text-foreground/80">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="relative w-full rounded-[2rem] border border-white/30 bg-gradient-to-br from-background/60 to-white/80 p-5 backdrop-blur-3xl"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">Stories pack</p>
          <div className="mt-4 space-y-3">
            {['Avant / Après', 'Gros plan produit', 'Call-to-action'].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 text-xs font-semibold text-foreground/70">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  if (id === '04') {
    return (
      <div className="relative min-h-[320px]">
        <motion.div
          className="absolute left-0 top-0 w-full rounded-[2.5rem] border border-white/30 bg-white/40 p-6 backdrop-blur-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-foreground/60">
            <span>Branding</span>
            <span>Design</span>
          </div>
          <div className="mt-6 space-y-4">
            {['Logo & identité', 'Charte graphique', 'Templates réseaux sociaux'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm font-semibold text-foreground/70"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    )
  }  return (
    <div className="relative min-h-[320px]">
      <motion.div
        className="absolute left-0 top-0 w-full rounded-[2.5rem] border border-white/30 bg-white/30 p-6 backdrop-blur-3xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
      >
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-foreground/60">
          <span>Événement</span>
          <span>Live</span>
        </div>
        <div className="mt-6 space-y-4">
          {['Brief & scénographie', 'Activation social live', 'Wrap-up & données'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm font-semibold text-foreground/70"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function ProcessRow({
  index,
  title,
  copy,
  duration,
}: {
  index: number
  title: string
  copy: string
  duration: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <motion.div
      ref={ref}
      className="grid gap-6 rounded-3xl border border-black/5 bg-white/70 px-6 py-6 text-left shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:grid-cols-[0.4fr_1fr_0.4fr]"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <div className="text-sm uppercase tracking-[0.4em] text-foreground/40">0{index + 1}</div>
      <div>
        <p className="text-lg font-semibold text-foreground">{title}</p>
        <p className="mt-2 text-base text-foreground/70">{copy}</p>
      </div>
      <div className="text-sm text-right uppercase tracking-[0.3em] text-foreground/40">{duration}</div>
    </motion.div>
  )
}

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 90, damping: 20 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return () => {
      unsubscribe()
    }
  }, [spring])

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  return (
    <span ref={ref} aria-label={`Étape ${displayValue}`} className="text-2xl font-black text-foreground">
      {displayValue.toString().padStart(2, '0')}
    </span>
  )
}

function MagneticCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 })
  const [isCoarse, setIsCoarse] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const media = window.matchMedia('(pointer: coarse)')
    const update = () => setIsCoarse(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isCoarse) return
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return
    const x = event.clientX - bounds.left - bounds.width / 2
    const y = event.clientY - bounds.top - bounds.height / 2
    rotateX.set((-y / bounds.height) * 8)
    rotateY.set((x / bounds.width) * 8)
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.article
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX: springX, rotateY: springY }}
      className={className}
    >
      {children}
    </motion.article>
  )
}






