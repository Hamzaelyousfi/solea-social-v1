'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, BookOpen, TrendingUp } from 'lucide-react'
import type { BlogPostSerialized } from './data'

const ALL_CATEGORIES = 'Tous'

const CATEGORIES = [
  ALL_CATEGORIES,
  'Réseaux Sociaux',
  'Stratégie',
  'Contenu',
  'SEO Local',
  'Tendances',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Intl.DateTimeFormat('fr-CH', { dateStyle: 'long' }).format(new Date(iso))
}

function PostCard({ post }: { post: BlogPostSerialized }) {
  return (
    <motion.article
      variants={itemVariants}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-background transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:-translate-y-1"
    >
      <Link href={`/blog/${post.slug}`} className="contents">
        <div
          className={`relative flex h-48 items-center justify-center overflow-hidden ${post.coverImage ? 'bg-muted/30' : `bg-gradient-to-br ${post.coverFrom} ${post.coverTo}`}`}
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="text-6xl select-none" role="img" aria-hidden="true">
              {post.coverEmoji}
            </span>
          )}
          <div
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium ${post.categoryClass} ${post.coverImage ? 'backdrop-blur-sm' : ''}`}
          >
            {post.category}
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 text-xs text-white backdrop-blur-sm">
            <Clock size={10} />
            {post.readTime} min
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-2 font-bold leading-snug transition-colors duration-300 group-hover:text-accent line-clamp-2">
            {post.title}
          </h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground/70 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground/50">{formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1 text-sm font-medium text-accent transition-all duration-300 group-hover:gap-2">
              Lire <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

type Props = { posts: BlogPostSerialized[] }

export default function BlogPageContent({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)

  const featuredPost = posts.find((p) => p.featured) ?? posts[0] ?? null

  const otherPosts = posts.filter((p) => p.slug !== featuredPost?.slug)

  const filteredPosts =
    activeCategory === ALL_CATEGORIES
      ? otherPosts
      : otherPosts.filter((p) => p.category === activeCategory)

  const allFiltered =
    activeCategory === ALL_CATEGORIES
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  const showFeatured = activeCategory === ALL_CATEGORIES && featuredPost !== null

  return (
    <main>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 px-4 pb-16 pt-32 md:px-6 md:pb-20 md:pt-40">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
        <motion.div
          className="absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div
          className="relative mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8 inline-flex">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-5 py-2.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                Blog & Ressources
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
          >
            Conseils pour votre{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">croissance</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-2 left-0 h-3 w-full origin-left bg-accent/20"
              />
            </span>{' '}
            digitale
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-10 max-w-2xl text-lg leading-relaxed text-foreground/70 md:text-xl"
          >
            Stratégies concrètes, tendances et bonnes pratiques pour développer votre
            présence digitale en Suisse romande.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6 text-sm text-foreground/60"
          >
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-accent" />
              <span>
                <strong className="text-accent">{posts.length}</strong> article{posts.length !== 1 ? 's' : ''} publiés
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-accent" />
              <span>4–8 min de lecture</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-accent" />
              <span>Mis à jour mensuellement</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Empty state ─────────────────────────────────────── */}
      {posts.length === 0 && (
        <section className="px-4 py-24 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-4xl mb-4">✍️</p>
            <h2 className="text-2xl font-bold mb-3">Aucun article publié pour le moment</h2>
            <p className="text-foreground/60">
              Revenez bientôt, de nouveaux conseils arrivent prochainement.
            </p>
          </div>
        </section>
      )}

      {/* ── Featured post ───────────────────────────────────── */}
      {showFeatured && (
        <section className="px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-border/50" />
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
                  Article à la une
                </span>
                <div className="h-px flex-1 bg-border/50" />
              </div>

              <Link href={`/blog/${featuredPost.slug}`}>
                <article className="group grid overflow-hidden rounded-2xl border border-border/50 bg-background transition-all duration-300 hover:border-accent/30 hover:shadow-2xl md:grid-cols-5">
                  <div
                    className={`relative flex min-h-[240px] items-center justify-center overflow-hidden md:col-span-2 ${featuredPost.coverImage ? 'bg-muted/30' : `bg-gradient-to-br ${featuredPost.coverFrom} ${featuredPost.coverTo}`}`}
                  >
                    {featuredPost.coverImage ? (
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-8xl select-none" role="img" aria-hidden="true">
                        {featuredPost.coverEmoji}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  <div className="flex flex-col justify-center p-8 md:col-span-3 md:p-10">
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${featuredPost.categoryClass}`}
                      >
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-foreground/50">
                        <Clock size={12} /> {featuredPost.readTime} min de lecture
                      </span>
                    </div>

                    <h2 className="mb-3 text-2xl font-bold leading-snug transition-colors duration-300 group-hover:text-accent md:text-3xl">
                      {featuredPost.title}
                    </h2>

                    <p className="mb-6 leading-relaxed text-foreground/70 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 group-hover:bg-accent/90 group-hover:shadow-accent/30 group-hover:shadow-lg">
                        Lire l&apos;article <ArrowRight size={16} />
                      </span>
                      <span className="text-sm text-foreground/50">
                        {formatDate(featuredPost.publishedAt)}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Category filter + grid ───────────────────────────── */}
      {posts.length > 0 && (
        <section className="bg-muted/20 px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="mb-10 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? 'border-accent bg-accent text-white shadow-sm shadow-accent/30'
                      : 'border-border/50 bg-background text-foreground/70 hover:border-accent/40 hover:text-accent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            <div className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground/50">
                {activeCategory === ALL_CATEGORIES
                  ? `Tous les articles (${posts.length})`
                  : `${activeCategory} (${allFiltered.length})`}
              </h2>
            </div>

            {filteredPosts.length > 0 ? (
              <motion.div
                key={activeCategory}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center"
              >
                <p className="text-lg text-foreground/50">
                  Aucun article dans cette catégorie pour le moment.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="bg-foreground px-4 py-20 text-background md:px-6 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-block rounded-full border border-background/20 px-4 py-1">
            <span className="text-sm font-medium text-background/70">Audit gratuit</span>
          </div>
          <h2 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Prêt à passer à l&apos;action ?
          </h2>
          <p className="mb-8 text-lg text-background/70 md:text-xl">
            Ces conseils vous parlent ? Voyons ensemble comment les appliquer à votre
            situation concrète — sans engagement.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-accent/40"
          >
            Obtenir mon audit gratuit
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
