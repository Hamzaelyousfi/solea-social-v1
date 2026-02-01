'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown, Heart, Lightbulb, Sparkles } from 'lucide-react'

const problemCards = [
  {
    icon: '⏰',
    title: 'Pas le temps',
    description:
      'Créer du contenu, répondre aux messages, suivre les stats. Difficile quand on gère déjà tout.',
  },
  {
    icon: '🤷',
    title: 'Pas les codes',
    description:
      'Algorithmes, formats, tendances. Le digital parle une autre langue pour beaucoup.',
  },
  {
    icon: '👻',
    title: 'Invisibles',
    description:
      'Un vrai savoir-faire, mais une présence en ligne trop faible pour être trouvé.',
  },
]

const differentiators = [
  {
    title: 'Une approche humaine, pas industrielle',
    description: [
      'Chez Solea Socials, vous travaillez directement avec moi, Amandine.',
      'Pas de templates génériques. Chaque projet reçoit une attention personnelle.',
    ],
    image: '/solea/DSC00443.JPG',
    alt: 'Approche personnelle',
    imageOrder: 'md:order-2',
    textOrder: 'md:order-1',
  },
  {
    title: 'Du contenu qui raconte, pas qui vend',
    description: [
      'Les clients veulent du vrai, pas du marketing agressif.',
      'Photos sur site, vidéos du processus, textes simples et authentiques.',
    ],
    image: '/solea/DSC00473.JPG',
    alt: 'Contenu authentique',
    imageOrder: 'md:order-1',
    textOrder: 'md:order-2',
  },
  {
    title: 'Stratégie claire, résultats mesurables',
    description: [
      'Audit initial gratuit, plan d\'action simple, suivi régulier.',
      'Vous gardez le contrôle, je m\'occupe de l\'exécution.',
    ],
    image: '/solea/DSC00437.JPG',
    alt: 'Stratégie et résultats',
    imageOrder: 'md:order-2',
    textOrder: 'md:order-1',
  },
]

const principles = [
  {
    icon: '🤝',
    title: 'Proximité',
    description: 'Une relation directe, un suivi attentif, un vrai partenaire.',
  },
  {
    icon: '💎',
    title: 'Authenticité',
    description: 'Du contenu qui vous ressemble, sans faux-semblants.',
  },
  {
    icon: '🎯',
    title: 'Impact réel',
    description: 'Visibilité mesurable, clients concrets, croissance durable.',
  },
]

const indicators = [
  { value: '2024', label: 'Année de création', accent: true },
  { value: '100%', label: 'Dédiée à vous', accent: false },
  { value: 'CH', label: 'Basée en Suisse', accent: false },
  { value: '1:1', label: 'Relation directe', accent: true },
]

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <main>
      {/* Hero Section - Redesigned */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 md:px-6">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative h-full w-full">
            <Image
              src="/solea/DSC00456.JPG"
              alt="Solea Socials - Notre équipe"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              quality={90}
            />
            {/* Enhanced gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="relative z-10 mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-background/80 px-5 py-2.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent md:text-base">
              L'histoire derrière Solea Socials
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
          >
            Tout a commencé par une{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">conviction simple</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -bottom-2 left-0 h-3 w-full origin-left bg-accent/30"
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-10">
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-foreground/90 md:text-xl lg:text-2xl">
              Les artisans créent des merveilles avec leurs mains. Mais dans un monde numérique, leur
              talent reste souvent invisible.{' '}
              <span className="font-semibold text-accent">C'est là que tout change.</span>
            </p>
          </motion.div>

          {/* Stats/Values */}
          <motion.div 
            variants={itemVariants}
            className="mb-12 flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            <div className="group rounded-2xl border border-accent/20 bg-background/70 px-6 py-4 backdrop-blur-md transition-all hover:border-accent/40 hover:bg-background/90">
              <div className="text-3xl font-bold text-accent md:text-4xl">2024</div>
              <div className="text-sm text-foreground/70">Année de création</div>
            </div>
            
            <div className="group rounded-2xl border border-accent/20 bg-background/70 px-6 py-4 backdrop-blur-md transition-all hover:border-accent/40 hover:bg-background/90">
              <div className="text-3xl font-bold text-accent md:text-4xl">15+</div>
              <div className="text-sm text-foreground/70">Artisans accompagnés</div>
            </div>
            
            <div className="group rounded-2xl border border-accent/20 bg-background/70 px-6 py-4 backdrop-blur-md transition-all hover:border-accent/40 hover:bg-background/90">
              <div className="text-3xl font-bold text-accent md:text-4xl">100%</div>
              <div className="text-sm text-foreground/70">Passion & engagement</div>
            </div>
          </motion.div>

          {/* Call to Action - Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-sm font-medium text-foreground/70 md:text-base">
              Découvrez notre histoire
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-12 w-8 items-start justify-center rounded-full border-2 border-accent/50 bg-background/30 p-2 backdrop-blur-sm"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-accent"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 z-[5] h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* The Spark */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-5 gap-8 md:gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-accent/10 shadow-xl">
                  <img
                    src="/solea/DSC00488.JPG"
                    alt="Amandine Veillard"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl -z-10" />
              </motion.div>
            </div>

            <div className="md:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-block px-4 py-1 bg-accent/10 rounded-full">
                  <span className="text-sm font-medium text-accent">Le début</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  De la passion pour l'image à la mission pour les artisans
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  <p>
                    Je m'appelle <strong>Amandine</strong>, et avant de créer Solea Socials, je
                    capturais des moments pour le plaisir. Chaque image racontait une histoire.
                  </p>
                  <p>
                    Un jour, une question s'est imposée : si je peux créer pour moi, pourquoi pas
                    pour celles et ceux qui ont quelque chose d'authentique à partager ?
                  </p>
                  <p>
                    C'est là que tout a commencé. Pas avec un plan complexe, mais avec une
                    conviction :{' '}
                    <strong className="text-accent">les artisans méritent d'être vus</strong>.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1 bg-accent/10 rounded-full mb-4">
              <span className="text-sm font-medium text-accent">Le problème</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi tant d'artisans restent invisibles
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Ce n'est pas un manque de talent. C'est un manque de temps, de codes, et de
              visibilité.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {problemCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-background rounded-xl border border-border/50 hover:border-accent/30 transition-all hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-bold text-xl mb-3">{card.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Answer */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 bg-accent/10 rounded-full mb-4">
              <span className="text-sm font-medium text-accent">La réponse</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ce qui rend Solea Socials différente
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Pas une agence de plus. Une approche conçue pour les artisans, par quelqu'un qui
              comprend leurs défis.
            </p>
          </motion.div>

          <div className="space-y-16">
            {differentiators.map((diff, index) => (
              <motion.div
                key={diff.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className={`${diff.imageOrder}`}
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-accent/10 shadow-xl">
                    <img src={diff.image} alt={diff.alt} className="w-full h-full object-cover" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className={`space-y-4 ${diff.textOrder}`}
                >
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight">{diff.title}</h3>
                  <div className="space-y-3">
                    {diff.description.map((para, i) => (
                      <p key={i} className="text-foreground/80 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Principles */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-accent text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-background rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Les principes qui guident tout</h2>
            <p className="text-lg text-background/80 max-w-2xl mx-auto">
              Chaque décision, chaque projet, chaque interaction est guidée par ces valeurs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-background/10 backdrop-blur-sm rounded-xl border border-background/20 hover:bg-background/15 transition-all"
              >
                <div className="text-4xl mb-3">{principle.icon}</div>
                <h3 className="font-bold text-xl mb-2">{principle.title}</h3>
                <p className="text-sm text-background/70 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Wins */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1 bg-accent/10 rounded-full mb-4">
              <span className="text-sm font-medium text-accent">Où nous en sommes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Une agence qui commence, mais pas de zéro
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Solea Socials est jeune, mais pas inexpérimentée. Des années de passion pour la
              création de contenu, transformées en expertise pour vous.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {indicators.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-background rounded-xl border border-border/50"
              >
                <div
                  className={`text-3xl md:text-4xl font-bold mb-2 ${
                    stat.accent ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {stat.value}
                </div>
                <p className="text-sm text-foreground/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-base text-foreground/70 leading-relaxed">
              Pas de portfolio de 100 clients. Pas de décennie d'existence. Mais une{' '}
              <strong className="text-accent">expertise réelle</strong>, une{' '}
              <strong className="text-accent">passion authentique</strong>, et un{' '}
              <strong className="text-accent">engagement total</strong> envers chaque projet.
            </p>
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="py-12 px-4 md:px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent text-center"
          >
            <p className="text-lg md:text-xl text-foreground/80 mb-6 leading-relaxed">
              Cette histoire résonne avec vous ?
              <br />
              Parlons de la vôtre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/30 hover:scale-105"
              >
                Obtenir un audit gratuit
              </Link>
              <Link
                href="/services"
                className="px-6 py-3 border-2 border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white transition-all"
              >
                Voir comment on travaille
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1 bg-accent/10 rounded-full mb-6">
                <span className="text-sm font-medium text-accent">Vision</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Construire la référence de la communication artisanale
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  L'objectif de Solea Socials n'est pas de devenir la plus grande agence. C'est de
                  devenir <strong>la plus pertinente</strong> pour les artisans et PME de Suisse
                  romande.
                </p>
                <p>
                  Celle qu'on recommande entre commerçants. Celle qui comprend les défis du local.
                  Celle qui transforme des talents invisibles en success stories.
                </p>
                <p>
                  Et ça commence maintenant, <strong className="text-accent">un projet à la fois</strong>.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-accent/10 shadow-2xl">
                <img
                  src="/solea/DSC00506.JPG"
                  alt="Vision Solea Socials"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Prêt à écrire votre histoire digitale ?
          </h2>
          <p className="text-xl md:text-2xl text-background/80 mb-8 leading-relaxed">
            Commençons par un audit gratuit de votre présence en ligne.
            <br />
            Sans engagement, sans jargon, juste une conversation honnête.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contact"
              className="group px-8 py-4 bg-accent text-background font-bold rounded-full hover:bg-accent/90 transition-all duration-300 uppercase text-sm tracking-wider hover:shadow-2xl hover:shadow-accent/40 hover:scale-105"
            >
              Réserver mon audit gratuit
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              href="/team"
              className="px-8 py-4 border-2 border-background text-background font-semibold rounded-full hover:bg-background hover:text-foreground transition-all duration-300 uppercase text-sm tracking-wider"
            >
              En savoir plus sur moi
            </Link>
          </div>
          <p className="text-sm text-background/60">
            Audit personnalisé • Conseils actionnables • Sans engagement
          </p>
        </motion.div>
      </section>
    </main>
  )
}