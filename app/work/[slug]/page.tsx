'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const caseStudies: Record<string, any> = {
  'boulangerie-lac': {
    title: 'Boulangerie du Lac - Refonte Présence Instagram',
    category: 'Réseaux Sociaux',
    client: 'Boulangerie du Lac, Yverdon-les-Bains',
    image: '/tech-startup-website.png',
    challenge:
      'La Boulangerie du Lac, famille depuis 3 générations, avait peu de présence digitale. Peu de clients connaissaient leur présence Instagram qui était peu actualisée et engageante.',
    idea:
      'Audit complet de la présence digitale, refonte stratégie Instagram avec contenu local authentique, optimisation Google Business et engagement communautaire.',
    execution:
      'Création du planning éditorial, photographies professionnelles des produits, mise en place de calendrier de publication, gestion des commentaires et engagement local.',
    results: [
      { metric: '+180%', label: 'Visibilité locale' },
      { metric: '2.4K', label: 'Nouveaux followers' },
      { metric: '+240%', label: 'Engagement moyen' },
      { metric: '+35 clients', label: 'Par mois' },
    ],
  },
  'atelier-bois': {
    title: 'Atelier Bois & Matières - Stratégie Contenu Photo/Vidéo',
    category: 'Stratégie',
    client: 'Atelier Bois & Matières, Neuchâtel',
    image: '/beauty-brand-design.png',
    challenge:
      'Cet atelier artisanal avait un savoir-faire exceptionnel mais invisible sur le web. Pas de stratégie de contenu, peu de visibilité en ligne malgré un excellent portfolio de projets réalisés.',
    idea:
      'Création d\'une stratégie éditoriale basée sur la valorisation du savoir-faire artisanal. Production de contenu photo et vidéo montrant le processus créatif et les réalisations.',
    execution:
      'Sessions photo et vidéo en atelier, création de portfolio digital, mise en place sur LinkedIn et Instagram, storytelling authentique du processus artisanal.',
    results: [
      { metric: '+120', label: 'Projets visibles' },
      { metric: '2.8K', label: 'Followers gagnés' },
      { metric: '+12%', label: 'Taux engagement' },
      { metric: '8 projets', label: 'Nouveaux clients' },
    ],
  },
  'clinique-dentaire': {
    title: 'Clinique Dentaire du Centre - Campagne Locale Lausanne',
    category: 'Réseaux Sociaux',
    client: 'Clinique Dentaire du Centre, Lausanne',
    image: '/creative-studio-content.jpg',
    challenge:
      'Clinique bien établie mais peu visible sur le web. Nombreux cabinets dentaires concurrents à Lausanne. Besoin d\'augmenter les prises de rendez-vous en ligne et la visibilité locale.',
    idea:
      'Stratégie SEO local et réseaux sociaux ciblée. Optimisation Google My Business, campagnes Google Ads locales, contenu éducatif sur les services dentaires, gestion avis client.',
    execution:
      'Audit SEO complet, optimisation fiche Google, création de contenu éducatif, gestion campagnes Google Ads pour Lausanne, monitoring avis client et réponses.',
    results: [
      { metric: '+85%', label: 'Prises de RDV' },
      { metric: '156', label: 'Leads qualifiés' },
      { metric: '1er résultat', label: 'Google local' },
      { metric: '4.8/5 ★', label: 'Avis client' },
    ],
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = caseStudies[slug] || caseStudies['boulangerie-lac']

  const { ref: challengeRef, inView: challengeInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const { ref: ideaRef, inView: ideaInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const { ref: executionRef, inView: executionInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const { ref: resultsRef, inView: resultsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <main>
      {/* Back Link */}
      <div className="fixed top-24 left-4 md:left-6 z-30">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-semibold uppercase tracking-wider">Retour</span>
        </Link>
      </div>

      {/* Hero Image */}
      <section className="h-96 md:h-screen flex items-center justify-center px-4 md:px-6 pt-20 md:pt-0 relative overflow-hidden">
        <motion.img
          src={study.image}
          alt={study.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* Title Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-foreground text-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-sm uppercase tracking-widest text-accent mb-4">
            {study.category}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{study.title}</h1>
          <p className="text-lg text-background/80">Client : {study.client}</p>
        </motion.div>
      </section>

      {/* Challenge Section */}
      <section
        ref={challengeRef}
        className="py-20 md:py-32 px-4 md:px-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={challengeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Le défi</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {study.challenge}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Idea Section */}
      <section
        ref={ideaRef}
        className="py-20 md:py-32 px-4 md:px-6 bg-muted/30"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ideaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre approche</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {study.idea}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Execution Section */}
      <section
        ref={executionRef}
        className="py-20 md:py-32 px-4 md:px-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={executionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Mise en place</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {study.execution}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section
        ref={resultsRef}
        className="py-20 md:py-32 px-4 md:px-6 bg-foreground text-background"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-12"
          >
            Les résultats
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {study.results.map((result: any, i: number) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 20 }}
                animate={resultsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="border-l-2 border-accent pl-6"
              >
                <p className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {result.metric}
                </p>
                <p className="text-sm text-background/70 font-medium">
                  {result.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project Link */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
            Vous avez un projet similaire en tête ?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background font-bold rounded-full hover:bg-accent/90 transition-all duration-300 uppercase text-sm tracking-wider group"
          >
            Parlons de votre projet
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
