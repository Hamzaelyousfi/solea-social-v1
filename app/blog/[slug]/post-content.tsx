'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clock, Tag, User } from 'lucide-react'
import type { BlogPostSerialized } from '../data'
import type { PostSection } from '../posts'

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Intl.DateTimeFormat('fr-CH', { dateStyle: 'long' }).format(new Date(iso))
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function renderSection(section: PostSection, index: number) {
  switch (section.type) {
    case 'paragraph':
      return (
        <p key={index} className="mb-6 text-base leading-relaxed text-foreground/80 md:text-lg">
          {section.text}
        </p>
      )
    case 'heading':
      return (
        <h2 key={index} className="mb-4 mt-10 text-2xl font-bold text-foreground first:mt-0 md:text-3xl">
          {section.text}
        </h2>
      )
    case 'list':
      return (
        <ul key={index} className="mb-6 space-y-3">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
              <span className="text-base leading-relaxed text-foreground/80 md:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote
          key={index}
          className="my-8 rounded-r-xl border-l-4 border-accent bg-accent/5 py-5 pl-6 pr-4"
        >
          <p className="text-base font-medium italic leading-relaxed text-foreground/90 md:text-lg">
            {section.text}
          </p>
          {section.author && (
            <footer className="mt-3 text-sm font-semibold text-accent">— {section.author}</footer>
          )}
        </blockquote>
      )
    case 'callout':
      return (
        <div key={index} className="my-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
          <p className="text-base leading-relaxed text-foreground/90 md:text-lg">{section.text}</p>
        </div>
      )
    default:
      return null
  }
}

type Props = {
  post: BlogPostSerialized
  relatedPosts: BlogPostSerialized[]
}

export default function PostContent({ post, relatedPosts }: Props) {
  return (
    <main>
      {/* ── Back ────────────────────────────────────────────── */}
      <div className="border-b border-border/30 px-4 py-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
            Retour au blog
          </Link>
        </div>
      </div>

      {/* ── Header ──────────────────────────────────────────── */}
      <section className="px-4 pb-0 pt-12 md:px-6 md:pt-16">
        <motion.div
          className="mx-auto max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          <motion.div variants={itemVariants} className="mb-4 flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${post.categoryClass}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-foreground/50">
              <Clock size={12} /> {post.readTime} min de lecture
            </span>
            <span className="text-xs text-foreground/40">{formatDate(post.publishedAt)}</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {post.title}
          </motion.h1>

          <motion.p variants={itemVariants} className="mb-8 text-lg leading-relaxed text-foreground/70 md:text-xl">
            {post.excerpt}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 rounded-xl border border-border/40 bg-muted/30 px-5 py-4"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
              <User size={18} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold">{post.author}</p>
              <p className="text-xs text-foreground/60">{post.authorRole}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Cover ───────────────────────────────────────────── */}
      <motion.section
        className="px-4 py-10 md:px-6"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="mx-auto max-w-3xl">
          <div
            className={`relative flex h-56 items-center justify-center overflow-hidden rounded-2xl md:h-72 ${post.coverImage ? 'bg-muted/30' : `bg-gradient-to-br ${post.coverFrom} ${post.coverTo}`}`}
          >
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            ) : (
              <span className="text-9xl select-none" role="img" aria-hidden="true">
                {post.coverEmoji}
              </span>
            )}
          </div>
        </div>
      </motion.section>

      {/* ── Body ────────────────────────────────────────────── */}
      <section className="px-4 pb-16 md:px-6">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {post.content.map((section, index) => renderSection(section, index))}
        </motion.div>
      </section>

      {/* ── Tags ────────────────────────────────────────────── */}
      {post.tags.length > 0 && (
        <section className="border-t border-border/30 px-4 py-8 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Tag size={14} className="text-foreground/40" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/40 bg-muted/30 px-3 py-1 text-xs text-foreground/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="px-4 py-10 md:px-6">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent p-8 text-center md:p-10"
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
              Passez à l&apos;action
            </p>
            <h3 className="mb-3 text-2xl font-bold md:text-3xl">
              Ces conseils s&apos;appliquent à votre situation ?
            </h3>
            <p className="mb-6 text-foreground/70">
              Obtenez un audit personnalisé de votre présence digitale — gratuit, sans engagement.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-accent/30 hover:shadow-lg"
            >
              Demander mon audit gratuit
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Related posts ───────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted/20 px-4 py-16 md:px-6 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-center gap-4">
              <h2 className="text-2xl font-bold">Lire aussi</h2>
              <div className="h-px flex-1 bg-border/40" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related, index) => (
                <motion.article
                  key={related.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group overflow-hidden rounded-2xl border border-border/50 bg-background transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <Link href={`/blog/${related.slug}`} className="contents">
                    <div
                      className={`relative flex h-36 items-center justify-center overflow-hidden ${related.coverImage ? 'bg-muted/30' : `bg-gradient-to-br ${related.coverFrom} ${related.coverTo}`}`}
                    >
                      {related.coverImage ? (
                        <Image
                          src={related.coverImage}
                          alt={related.title}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <span className="text-5xl select-none" role="img" aria-hidden="true">
                          {related.coverEmoji}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <span className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${related.categoryClass}`}>
                        {related.category}
                      </span>
                      <h3 className="mb-3 font-bold leading-snug transition-colors duration-300 group-hover:text-accent line-clamp-2">
                        {related.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground/50">{related.readTime} min</span>
                        <span className="flex items-center gap-1 text-sm font-medium text-accent">
                          Lire <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
