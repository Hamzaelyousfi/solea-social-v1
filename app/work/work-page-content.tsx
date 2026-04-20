'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
  animate,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Project } from './projects'
import ClientShowcase from '@/components/sections/client-showcase'

type WorkPageContentProps = {
  projects: Project[]
}

type ProjectNarrative = {
  challengeHeadline: string
  challenge: string
  approach: string
  resultsNote: string
  services: string[]
  quote: string
  supportImages: string[]
  approachImages: string[]
  poster?: string
}

type ShowcaseCard = {
  title: string
  format: string
  note?: string
}

const accentButtonClass =
  'inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-accent/90'

const sectionPadding = 'px-6 md:px-10 lg:px-16'

const projectNarratives: Record<string, ProjectNarrative> = {
  makemebeautiful: {
    challengeHeadline: "Repositionner l'institut comme une référence locale",
    challenge:
      "Repositionner l'institut comme une référence locale en valorisant la proximité, les soins sur-mesure et la personnalité de l'équipe.",
    approach:
      'Reels narratifs, humour subtil et contenus éducatifs courts pour multiplier les points de contact. Une présence quotidienne qui humanise la marque.',
    resultsNote:
      'Une dynamique virale construite sur des séquences courtes, des reels à fort taux de partage et une signature visuelle douce.',
    services: [
      'Branding + Social Media Management',
      'Content Creation + Community Management',
    ],
    quote: '« Une ligne éditoriale qui nous ressemble et qui performe. »',
    supportImages: ['/projects/makemebeautiful/image-1.jpg', '/projects/makemebeautiful/image-2.jpg'],
    approachImages: ['/solea/DSC00429.webp', '/solea/DSC00443.webp'],
    poster: '/creative-studio-content.jpg',
  },
  visitaly: {
    challengeHeadline: "Visitaly devait s'humaniser",
    challenge:
      "Réveiller la désirabilité du restaurant avec un storytelling gourmand et régulier, capable de convertir l'audience locale en réservations.",
    approach:
      'Shooting culinaire premium, reels immersifs en salle et calendrier éditorial précis pour stabiliser la croissance.',
    resultsNote:
      'Une présence fluide sur Instagram et TikTok, avec des formats courts qui mettent en scène la convivialité et le savoir-faire.',
    services: [
      'Content Creation + Community Management',
      'Stratégie éditoriale + Calendrier social',
    ],
    quote:
      '« On a découvert ce restaurant grâce à une vidéo Instagram et on a adoré ! On reviendra »',
    supportImages: ['/projects/visitaly/width_800.webp', '/projects/visitaly/width800.webp'],
    approachImages: ['/solea/DSC00437.webp', '/solea/DSC00452.webp'],
    poster: '/creative-studio-content.jpg',
  },
  'ide-sport': {
    challengeHeadline: 'Le Midnight Echallens devait se dynamiser',
    challenge:
      "Générer une énergie collective autour des événements nocturnes et incarner l'impact social du projet.",
    approach:
      'Captations vidéo dynamiques, reels 9:16 et teasing en amont pour renforcer la participation sur le terrain.',
    resultsNote:
      "Des séquences rythmées, une tonalité jeune et une mise en avant de l'ambiance locale.",
    services: ['Production vidéo + Coverage événementiel', 'Strategy + Social'],
    quote: '« Une narration authentique qui mobilise toute la communauté. »',
    supportImages: [
      '/projects/ideesport/CoachProgramm.jpg',
      '/projects/ideesport/ideesport_CoachProgr.png',
    ],
    approachImages: ['/solea/DSC00456.webp', '/solea/DSC00473.webp'],
    poster: '/creative-studio-content.jpg',
  },
}

const numberFormatter = new Intl.NumberFormat('fr-CH')

type ImageFrameProps = {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  className?: string
}

const ImageFrame = ({
  src,
  alt,
  sizes,
  priority = false,
  className = '',
}: ImageFrameProps) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className} ${
        loaded ? '' : 'animate-pulse bg-neutral-200'
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoadingComplete={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

const parseMetricValue = (value: string) => {
  const match = value.match(/([-+]?\d[\d\s.,]*)(\s?K)?/i)
  if (!match || match.index === undefined) {
    return null
  }
  const rawNumber = match[1]
  const rawSuffix = match[2] ?? ''
  const sign = rawNumber.trim().startsWith('-')
    ? '-'
    : rawNumber.trim().startsWith('+')
      ? '+'
      : ''
  const numberPart = rawNumber.replace(/[^\d.,]/g, '').replace(',', '.')
  const numericValue = Number(numberPart)
  if (Number.isNaN(numericValue)) {
    return null
  }
  const prefix = value.slice(0, match.index) + sign
  const suffix = value.slice(match.index + rawNumber.length + rawSuffix.length)

  return {
    value: numericValue,
    prefix,
    suffix,
    hasK: Boolean(rawSuffix),
  }
}

const formatMetricValue = (
  current: number,
  parsed: ReturnType<typeof parseMetricValue>
) => {
  if (!parsed) {
    return ''
  }
  const rounded = Math.round(current)
  const formatted = numberFormatter.format(rounded)
  return `${parsed.prefix}${formatted}${parsed.hasK ? 'K' : ''}${parsed.suffix}`
}

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
      <motion.div
        className="h-full origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  )
}

type MetricStatProps = {
  label: string
  value: string
}

const MetricStat = ({ label, value }: MetricStatProps) => {
  const prefersReducedMotion = useReducedMotion()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 })
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    if (!inView) {
      return
    }
    const parsed = parseMetricValue(value)
    if (!parsed || prefersReducedMotion) {
      setDisplayValue(value)
      return
    }
    const controls = animate(0, parsed.value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(formatMetricValue(latest, parsed))
      },
    })

    return () => controls.stop()
  }, [inView, prefersReducedMotion, value])

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-neutral-200 bg-white/80 p-6 shadow-[0_18px_40px_rgba(15,15,15,0.08)]"
      aria-label={`${label} ${value}`}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-neutral-900 md:text-4xl">
        {displayValue}
      </p>
    </div>
  )
}

const getVideoType = (src: string) => {
  const lower = src.toLowerCase()
  if (lower.endsWith('.webm')) return 'video/webm'
  if (lower.endsWith('.mov')) return 'video/quicktime'
  return 'video/mp4'
}

type VideoSurfaceProps = {
  src: string
  label: string
  preload?: 'auto' | 'metadata' | 'none'
  className?: string
}

const VideoSurface = ({
  src,
  label,
  preload = 'metadata',
  className = '',
}: VideoSurfaceProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const [containerRef, inView] = useInView({ threshold: 0.35 })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (!inView) {
      video.pause()
      return
    }
    video
      .play()
      .catch(() => undefined)
  }, [inView, prefersReducedMotion])

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload={preload}
          aria-label={label}
        >
          <source src={src} type={getVideoType(src)} />
          <track
            kind="captions"
            src="/captions/portfolio.vtt"
            srcLang="fr"
            label="Français"
            default
          />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
    </div>
  )
}

const useParallax = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-40, 40]
  )
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1.02, 1.1]
  )

  return { ref, y, scale }
}

const usePreloadVideo = (src: string | null, enabled: boolean) => {
  useEffect(() => {
    if (!enabled || !src) return
    if (typeof document === 'undefined') return
    const existing = document.querySelector(`link[data-preload=\"${src}\"]`)
    if (existing) return
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'video'
    link.href = src
    link.setAttribute('data-preload', src)
    document.head.appendChild(link)
  }, [enabled, src])
}

type ProjectHeroProps = {
  project: Project
  narrative: ProjectNarrative
  pattern: 'overlay' | 'split' | 'center' | 'dual'
  preload: 'auto' | 'metadata'
  nextVideo?: string
}

const ProjectHero = ({
  project,
  narrative,
  pattern,
  preload,
  nextVideo,
}: ProjectHeroProps) => {
  const prefersReducedMotion = useReducedMotion()
  const [heroRef, heroInView] = useInView({ threshold: 0.25 })
  usePreloadVideo(nextVideo ?? null, heroInView)
  const parallax = useParallax()
  const hideOverlay = project.slug === 'visitaly'

  const InfoBlock = (
    <motion.div
      className="max-w-xl text-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
    >
      <p className="text-xs uppercase tracking-[0.35em] text-white/70">
        {project.sector}
      </p>
      <h2 className="mt-4 text-4xl font-semibold md:text-6xl">
        {project.title}
      </h2>
      <p className="mt-4 text-base text-white/80 md:text-lg">
        {project.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {narrative.services.map((service) => (
          <span
            key={service}
            className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80"
          >
            {service}
          </span>
        ))}
      </div>
    </motion.div>
  )

  if (hideOverlay) {
    return (
      <section
        ref={heroRef}
        className="relative flex min-h-[80vh] items-center overflow-hidden md:min-h-screen"
      >
        <motion.div
          ref={parallax.ref}
          style={{ y: parallax.y, scale: parallax.scale }}
          className="absolute inset-0"
        >
          <VideoSurface
            src={project.image.src}
            label={project.image.alt}
            preload={preload}
          />
        </motion.div>
      </section>
    )
  }

  if (pattern === 'split') {
    return (
      <section
        ref={heroRef}
        className="grid min-h-[80vh] w-full grid-cols-1 bg-[#F5F3EF] md:min-h-screen lg:grid-cols-[60%_40%]"
      >
        <motion.div
          ref={parallax.ref}
          style={{ y: parallax.y, scale: parallax.scale }}
          className="relative min-h-[50vh] overflow-hidden md:min-h-screen"
        >
          <VideoSurface
            src={project.image.src}
            label={project.image.alt}
            preload={preload}
          />
        </motion.div>
        <div className="flex items-center bg-[#F5F3EF] px-6 py-16 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
            className="max-w-md text-neutral-900"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              {project.sector}
            </p>
            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              {project.title}
            </h2>
            <p className="mt-4 text-base text-neutral-600 md:text-lg">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {narrative.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-600"
                >
                  {service}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  if (pattern === 'center') {
    return (
      <section
        ref={heroRef}
        className="relative flex min-h-[80vh] items-center justify-center overflow-hidden md:min-h-screen"
      >
        <motion.div
          ref={parallax.ref}
          style={{ y: parallax.y, scale: parallax.scale }}
          className="absolute inset-0"
        >
          <VideoSurface
            src={project.image.src}
            label={project.image.alt}
            preload={preload}
          />
        </motion.div>
        <div className="relative z-10 mx-auto px-6 text-center md:px-10 lg:px-16">
          {InfoBlock}
        </div>
      </section>
    )
  }

  if (pattern === 'dual') {
    return (
      <section
        ref={heroRef}
        className="grid min-h-[80vh] w-full grid-cols-1 bg-[#F5F3EF] md:min-h-screen lg:grid-cols-[52%_48%]"
      >
        <div className="flex items-center px-6 py-16 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
            className="max-w-md text-neutral-900"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              {project.sector}
            </p>
            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              {project.title}
            </h2>
            <p className="mt-4 text-base text-neutral-600 md:text-lg">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {narrative.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-600"
                >
                  {service}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="relative grid grid-cols-1 gap-4 p-6 md:p-10 lg:grid-cols-2">
          <motion.div
            ref={parallax.ref}
            style={{ y: parallax.y, scale: parallax.scale }}
            className="relative overflow-hidden rounded-[32px] border border-white/30 shadow-[0_22px_50px_rgba(15,15,15,0.15)]"
          >
            <VideoSurface
              src={project.image.src}
              label={project.image.alt}
              preload={preload}
            />
          </motion.div>
          <div className="relative flex items-center justify-center rounded-[32px] border border-neutral-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,15,15,0.1)]">
            <ImageFrame
              src={narrative.approachImages[0]}
              alt={`${project.title} Instagram`}
              sizes="(max-width: 1024px) 70vw, 280px"
              className="h-full w-full max-w-[280px] rounded-[28px] border border-neutral-200 bg-black"
            />
            <div className="absolute bottom-4 right-4 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
              Instagram
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[80vh] items-center overflow-hidden md:min-h-screen"
    >
      <motion.div
        ref={parallax.ref}
        style={{ y: parallax.y, scale: parallax.scale }}
        className="absolute inset-0"
      >
        <VideoSurface
          src={project.image.src}
          label={project.image.alt}
          preload={preload}
        />
      </motion.div>
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl">{InfoBlock}</div>
      </div>
    </section>
  )
}

const ChallengeSection = ({
  project,
  narrative,
}: {
  project: Project
  narrative: ProjectNarrative
}) => {
  const prefersReducedMotion = useReducedMotion()
  return (
    <section
      className={`bg-white ${sectionPadding} flex min-h-[60vh] flex-col gap-10 py-20 md:min-h-[70vh] lg:flex-row lg:items-center`}
      aria-labelledby={`${project.slug}-challenge`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
        className="flex-1"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
          Challenge / Contexte
        </p>
        <h3
          id={`${project.slug}-challenge`}
          className="mt-4 text-3xl font-semibold text-neutral-900 md:text-4xl"
        >
          {narrative.challengeHeadline}
        </h3>
        <p className="mt-4 text-base text-neutral-600 md:text-lg">
          {narrative.challenge}
        </p>
      </motion.div>
      <div className="grid flex-1 grid-cols-2 gap-4">
        {narrative.supportImages.map((image) => (
          <ImageFrame
            key={image}
            src={image}
            alt={`${project.title} - contexte`}
            sizes="(max-width: 1024px) 45vw, 320px"
            className="min-h-[180px] rounded-[24px] border border-neutral-200 bg-neutral-100 shadow-[0_14px_30px_rgba(15,15,15,0.08)]"
          />
        ))}
      </div>
    </section>
  )
}

const ResultsSection = ({
  project,
  narrative,
}: {
  project: Project
  narrative: ProjectNarrative
}) => {
  const prefersReducedMotion = useReducedMotion()
  return (
    <section
      className={`bg-[#F5F3EF] ${sectionPadding} flex min-h-[60vh] flex-col gap-10 py-20 md:min-h-[70vh] lg:flex-row lg:items-center`}
      aria-labelledby={`${project.slug}-results`}
    >
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
            Résultats
          </p>
          <h3
            id={`${project.slug}-results`}
            className="mt-4 text-3xl font-semibold text-neutral-900 md:text-4xl"
          >
            Des chiffres qui parlent.
          </h3>
          <p className="mt-4 text-base text-neutral-600 md:text-lg">
            {narrative.resultsNote}
          </p>
        </motion.div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <MetricStat
              key={metric.label}
              label={metric.label}
              value={metric.value}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          {[narrative.approachImages[0], narrative.approachImages[1]].map((image) => (
            <div
              key={image}
              className="relative min-h-[180px] rounded-[24px] border border-neutral-200 bg-white shadow-[0_14px_30px_rgba(15,15,15,0.08)]"
            >
              <ImageFrame
                src={image}
                alt={`${project.title} avant après`}
                sizes="(max-width: 1024px) 45vw, 260px"
                className="rounded-[24px]"
              />
            </div>
          ))}
        </div>
        <div className="rounded-[28px] border border-neutral-200 bg-white px-6 py-6 text-sm text-neutral-600 shadow-[0_12px_30px_rgba(15,15,15,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            Citation client
          </p>
          <p className="mt-3 text-base text-neutral-700">{narrative.quote}</p>
        </div>
      </div>
    </section>
  )
}

const buildShowcaseCards = (project: Project): ShowcaseCard[] => {
  const baseCards = project.contents.map((content) => ({
    title: content.title,
    format: content.format,
    note: content.note,
  }))

  const extras: ShowcaseCard[] = [
    {
      title: 'Carousel storytelling',
      format: 'Carousel Instagram',
      note: 'Narration et éducation en 6 slides.',
    },
    {
      title: 'Reel teaser',
      format: 'Reel 9:16',
      note: 'Accroche rapide pour booster la portée.',
    },
    {
      title: 'Story de lancement',
      format: 'Stories',
      note: 'CTA clair pour générer des actions.',
    },
  ]

  return [...baseCards, ...extras].slice(0, 6)
}


export default function WorkPageContent({ projects }: WorkPageContentProps) {
  const patterns: ProjectHeroProps['pattern'][] = [
    'overlay',
    'split',
    'center',
    'dual',
  ]

  return (
    <main id="realisations" className="scroll-smooth bg-[#F5F3EF] text-neutral-900">
      <ScrollProgress />

      {projects.map((project, index) => {
        const narrative = projectNarratives[project.slug]
        const pattern =
          project.slug === 'ide-sport'
            ? 'overlay'
            : patterns[index % patterns.length]
        const nextVideo = projects[index + 1]?.image?.src
        if (!narrative) {
          return null
        }

        return (
          <article key={project.slug} className="border-b border-neutral-200">
            <ProjectHero
              project={project}
              narrative={narrative}
              pattern={pattern}
              preload={index === 0 ? 'auto' : 'metadata'}
              nextVideo={nextVideo}
            />
            <ChallengeSection project={project} narrative={narrative} />
            <ResultsSection project={project} narrative={narrative} />
          </article>
        )
      })}

      <section className={`bg-neutral-900 ${sectionPadding} py-24 text-white`}>
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Audit gratuit
            </p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
              Prêt à faire briller votre marque ?
            </h2>
            <p className="mt-4 max-w-2xl text-base text-white/75 md:text-lg">
              Un diagnostic clair pour définir les priorités, le ton et les
              actions qui feront la différence.
            </p>
          </div>
          <Link href="/contact" className={accentButtonClass}>
            Demander un audit gratuit
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  )
}
