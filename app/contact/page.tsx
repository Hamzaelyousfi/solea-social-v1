'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    projectType: '',
    message: '',
  })
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  )
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState('sending')
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
        projectType: '',
        message: '',
      })
      setSubmitState('success')
    } catch (error) {
      setSubmitState('error')
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 md:px-6 py-16 md:py-24">
        <div className="absolute inset-0">
          <Image
            src="/solea/DSC00456.webp"
            alt="Solea Socials"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-accent font-semibold mb-4">
              Contact & Audit
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Parlons de votre <span className="text-accent">projet</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
              Vous êtes artisan ou PME ? Dites-nous où vous en êtes et recevez un audit gratuit,
              clair et actionnable pour gagner en visibilité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#formulaire"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent/90 transition-all duration-300 uppercase text-sm tracking-wider shadow-lg hover:shadow-xl hover:scale-105"
              >
                Démarrer mon audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white transition-all duration-300 uppercase text-sm tracking-wider"
              >
                Voir les services
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-background/80 backdrop-blur-sm border border-border/30 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              Pourquoi nous contacter
            </p>
            <ul className="space-y-4 text-foreground/80">
              {[
                'Audit gratuit et conseils personnalisés',
                'Une seule interlocutrice, réponse rapide',
                'Contenu authentique, adapté aux artisans',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-sm text-foreground/70">
              Réponse sous 24h ouvrées • Basée en Suisse romande
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section ref={ref} className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          {/* Form */}
          <motion.div
            id="formulaire"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="bg-background border border-border/40 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Envoyez-nous un message</h2>
              <p className="text-foreground/70">
                Décrivez votre activité, vos objectifs et vos besoins. Nous vous répondons rapidement.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:border-accent focus:outline-none transition-colors bg-background"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:border-accent focus:outline-none transition-colors bg-background"
                    placeholder="votre@email.ch"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:border-accent focus:outline-none transition-colors bg-background"
                    placeholder="Votre entreprise"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider">
                    Budget estimé (CHF)
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:border-accent focus:outline-none transition-colors bg-background"
                  >
                    <option value="">Sélectionner un budget</option>
                    <option value="under-2k">Moins de 2000 CHF</option>
                    <option value="2-5k">2000 - 5000 CHF</option>
                    <option value="5-15k">5000 - 15000 CHF</option>
                    <option value="15k+">Plus de 15000 CHF</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider">
                  Type de projet
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:border-accent focus:outline-none transition-colors bg-background"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="social">Réseaux sociaux</option>
                  <option value="seo">Stratégie & SEO</option>
                  <option value="contenu">Création de contenu</option>
                  <option value="audit">Audit digital</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:border-accent focus:outline-none transition-colors bg-background resize-none"
                  placeholder="Parlez-nous de votre projet et de vos besoins..."
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitState === 'sending'}
                className="w-full px-8 py-4 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 transition-colors uppercase text-sm tracking-wider shadow-lg hover:shadow-xl"
              >
                {submitState === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
              </motion.button>

              {submitState === 'success' && (
                <div className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_rgba(255,107,26,0.18)]">
                  Merci, votre message a bien été envoyé. Nous revenons vers vous sous 24h.
                </div>
              )}
              {submitState === 'error' && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-foreground shadow-[0_12px_30px_rgba(220,38,38,0.18)]">
                  Une erreur est survenue. Réessayez plus tard.
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-muted/30 border border-border/40 rounded-2xl p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4">Entrez en contact</h3>
              <p className="text-foreground/70 mb-6">
                Choisissez le moyen le plus simple pour vous. Nous répondons rapidement.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:info@soleasocials.ch"
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                >
                  <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold group-hover:text-accent transition-colors">
                      info@soleasocials.ch
                    </p>
                    <p className="text-sm text-muted-foreground">Vos demandes</p>
                  </div>
                </a>

                <a
                  href="tel:+41244462001"
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                >
                  <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold group-hover:text-accent transition-colors">
                      +41 24 446 20 01
                    </p>
                    <p className="text-sm text-muted-foreground">Appel direct</p>
                  </div>
                </a>

                <a
                  href="tel:+41797000435"
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                >
                  <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold group-hover:text-accent transition-colors">
                      +41 79 700 04 35
                    </p>
                    <p className="text-sm text-muted-foreground">Urgence ou question rapide</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-lg">
                  <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-2">Notre siège</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Yverdon-les-Bains</span>
                      <br />
                      Rue des Champs-Lovats 13
                      <br />
                      1400 Yverdon-les-Bains, Suisse
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border border-border rounded-2xl bg-background">
              <h4 className="font-semibold mb-4">Horaires de bureau</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Lundi - Vendredi : 09h00 - 18h00</p>
                <p>Samedi - Dimanche : Fermé</p>
                <p className="text-xs mt-4">Réponse aux messages sous 24h</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

