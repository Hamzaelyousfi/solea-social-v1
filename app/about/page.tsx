'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

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
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/solea/DSC00456.JPG"
            alt="Solea Socials"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/80" />
        </div>

        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <p className="text-sm md:text-base uppercase tracking-widest text-accent mb-4 font-medium">
            L'histoire derrière Solea Socials
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Tout a commencé par une <span className="text-accent">conviction simple</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
            Les artisans créent des merveilles avec leurs mains. Mais dans un monde numérique, leur
            talent reste souvent invisible. C'est là que tout change.
          </p>
          <div className="flex flex-col items-center gap-2 mt-12">
            <p className="text-sm text-foreground/60">Découvrez notre histoire</p>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className="w-6 h-6 text-accent" />
            </motion.div>
          </div>
        </motion.div>
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
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1 bg-accent/10 rounded-full mb-4">
              <span className="text-sm font-medium text-accent">La réalisation</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Le problème que personne ne résolvait vraiment
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              En rencontrant des artisans, des restaurateurs, des coiffeurs, j'ai compris un
              paradoxe cruel : un talent immense, mais une visibilité trop faible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {problemCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="p-6 bg-background rounded-xl border border-border/50 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-bold mb-2 text-lg">{card.title}</h3>
                <p className="text-sm text-foreground/70">{card.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="aspect-video rounded-2xl overflow-hidden border-2 border-accent/20 shadow-2xl">
              <img
                src="/solea/DSC00410.JPG"
                alt="Stratégie Solea Socials"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-8 text-center">
              <blockquote className="text-xl md:text-2xl font-medium text-foreground/90 italic">
                "Le talent seul ne suffit plus. Il faut une voix digitale."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-block px-4 py-1 bg-accent/10 rounded-full mb-4">
              <span className="text-sm font-medium text-accent">La solution</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Solea Socials est née de cette conviction
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Une agence qui comprend vraiment les artisans. Pas une usine à contenu, mais un
              partenaire qui raconte leur histoire avec authenticité.
            </p>
          </motion.div>

          {differentiators.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              <div className={`order-2 ${item.textOrder}`}>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  {item.description.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              </div>
              <div className={`order-1 ${item.imageOrder}`}>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-accent/10 shadow-xl">
                  <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Mission */}
      <section className="py-20 md:py-28 px-4 md:px-6 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 bg-accent/20 rounded-full mb-6">
              <span className="text-sm font-medium text-accent">Notre mission</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Rendre visible le savoir-faire qui mérite d'être vu
            </h2>
            <p className="text-xl md:text-2xl text-background/80 leading-relaxed font-light">
              Solea Socials existe pour une raison simple : les artisans et petites entreprises
              créent la richesse culturelle et économique de nos régions. Ils méritent d'être aussi
              visibles que les grandes marques.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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

