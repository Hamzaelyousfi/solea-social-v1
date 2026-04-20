'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Eye, EyeOff, Clock, Star } from 'lucide-react'
import { getCategoryClass } from '@/app/blog/data'

type SerializedPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  coverImage: string | null
  coverEmoji: string
  coverFrom: string
  coverTo: string
  author: string
  readTime: number
  tags: string[]
  featured: boolean
  status: 'DRAFT' | 'PUBLISHED'
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  content: object
}

function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('fr-CH', { dateStyle: 'medium' }).format(new Date(iso))
}

export default function BlogListClient({ posts: initial }: { posts: SerializedPost[] }) {
  const [posts, setPosts] = useState(initial)
  const [selectedId, setSelectedId] = useState<string | null>(initial[0]?.id ?? null)
  const [pendingDelete, setPendingDelete] = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const selected = posts.find((p) => p.id === selectedId) ?? null

  async function handleToggleStatus(id: string) {
    setToggling(id)
    setError(null)
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'PATCH' })
      if (!res.ok) throw new Error()
      const { data } = await res.json()
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, status: data.status, publishedAt: data.publishedAt }
            : p
        )
      )
    } catch {
      setError('Impossible de modifier le statut.')
    } finally {
      setToggling(null)
    }
  }

  async function handleDelete(id: string) {
    if (pendingDelete !== id) {
      setPendingDelete(id)
      return
    }
    setError(null)
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setPosts((prev) => prev.filter((p) => p.id !== id))
      if (selectedId === id) setSelectedId(posts.find((p) => p.id !== id)?.id ?? null)
    } catch {
      setError('Impossible de supprimer cet article.')
    } finally {
      setPendingDelete(null)
    }
  }

  const published = posts.filter((p) => p.status === 'PUBLISHED').length
  const drafts = posts.filter((p) => p.status === 'DRAFT').length

  return (
    <div className="flex flex-col gap-8">
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="rounded-[28px] border border-white/60 bg-white/60 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Gestion du contenu
            </p>
            <h2 className="text-3xl font-semibold">Articles de blog</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {published} publié{published !== 1 ? 's' : ''} · {drafts} brouillon{drafts !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-[0_18px_45px_rgba(15,15,15,0.18)] transition hover:-translate-y-0.5"
          >
            <Plus size={16} />
            Nouvel article
          </Link>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* ── Post list ────────────────────────────────────── */}
        <div className="rounded-[28px] border border-white/60 bg-white/55 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold">Tous les articles</h3>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {posts.length} article{posts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-[22px] border border-white/50 bg-white/50 p-8 text-center">
              <p className="text-3xl mb-3">✍️</p>
              <p className="font-semibold mb-1">Aucun article pour le moment</p>
              <p className="text-sm text-muted-foreground mb-4">
                Créez votre premier article pour commencer.
              </p>
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:-translate-y-0.5"
              >
                <Plus size={14} /> Créer un article
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => {
                const isActive = post.id === selectedId
                const isPublished = post.status === 'PUBLISHED'

                return (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => setSelectedId(post.id)}
                    className={[
                      'w-full text-left rounded-[22px] border p-4 transition',
                      isActive
                        ? 'border-white/80 bg-white/70 shadow-[0_18px_45px_rgba(15,15,15,0.14)]'
                        : 'border-white/50 bg-white/50 hover:-translate-y-0.5',
                    ].join(' ')}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-lg flex-shrink-0">{post.coverEmoji}</span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{post.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{post.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {post.featured && (
                          <Star size={12} className="text-amber-500 fill-amber-500" />
                        )}
                        <span
                          className={[
                            'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                            isPublished
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600',
                          ].join(' ')}
                        >
                          {isPublished ? 'Publié' : 'Brouillon'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {post.readTime} min
                      </span>
                      <span>{isPublished ? `Publié le ${formatDate(post.publishedAt)}` : `Modifié le ${formatDate(post.updatedAt)}`}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Detail panel ─────────────────────────────────── */}
        <div className="rounded-[28px] border border-white/60 bg-white/55 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Aperçu</p>
          <h3 className="mt-2 text-2xl font-semibold">Article sélectionné</h3>

          {!selected ? (
            <div className="mt-6 rounded-[22px] border border-white/50 bg-white/55 p-5 text-sm text-muted-foreground">
              Sélectionnez un article pour voir les détails.
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {/* Cover preview */}
              <div
                className={`relative flex h-28 items-center justify-center overflow-hidden rounded-[20px] ${selected.coverImage ? 'bg-muted/30' : `bg-gradient-to-br ${selected.coverFrom} ${selected.coverTo}`}`}
              >
                {selected.coverImage ? (
                  <Image
                    src={selected.coverImage}
                    alt={selected.title}
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-5xl">{selected.coverEmoji}</span>
                )}
              </div>

              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryClass(selected.category)}`}
                  >
                    {selected.category}
                  </span>
                  <span
                    className={[
                      'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                      selected.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600',
                    ].join(' ')}
                  >
                    {selected.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
                <h4 className="font-bold text-base leading-snug">{selected.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {selected.excerpt}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-white/60 p-3">
                  <p className="uppercase tracking-[0.2em] text-muted-foreground mb-1">Lecture</p>
                  <p className="font-semibold">{selected.readTime} min</p>
                </div>
                <div className="rounded-xl bg-white/60 p-3">
                  <p className="uppercase tracking-[0.2em] text-muted-foreground mb-1">Tags</p>
                  <p className="font-semibold">{selected.tags.length} tag{selected.tags.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="rounded-xl bg-white/60 p-3">
                  <p className="uppercase tracking-[0.2em] text-muted-foreground mb-1">Mis en avant</p>
                  <p className="font-semibold">{selected.featured ? 'Oui ⭐' : 'Non'}</p>
                </div>
                <div className="rounded-xl bg-white/60 p-3">
                  <p className="uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    {selected.status === 'PUBLISHED' ? 'Publié le' : 'Créé le'}
                  </p>
                  <p className="font-semibold">
                    {formatDate(selected.status === 'PUBLISHED' ? selected.publishedAt : selected.createdAt)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-1">
                <Link
                  href={`/admin/blog/${selected.id}/edit`}
                  className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:bg-white/90"
                >
                  <Pencil size={12} />
                  Modifier
                </Link>

                <button
                  type="button"
                  onClick={() => handleToggleStatus(selected.id)}
                  disabled={toggling === selected.id}
                  className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:bg-white/90 disabled:opacity-50"
                >
                  {selected.status === 'PUBLISHED' ? (
                    <><EyeOff size={12} /> Dépublier</>
                  ) : (
                    <><Eye size={12} /> Publier</>
                  )}
                </button>

                {selected.status === 'PUBLISHED' && (
                  <Link
                    href={`/blog/${selected.slug}`}
                    target="_blank"
                    className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:bg-white/90"
                  >
                    <Eye size={12} />
                    Voir sur le site
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(selected.id)}
                  className={[
                    'flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5',
                    pendingDelete === selected.id
                      ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                      : 'border-white/60 bg-white/70 text-foreground hover:bg-white/90',
                  ].join(' ')}
                >
                  <Trash2 size={12} />
                  {pendingDelete === selected.id ? 'Confirmer ?' : 'Supprimer'}
                </button>
              </div>

              {pendingDelete === selected.id && (
                <button
                  type="button"
                  onClick={() => setPendingDelete(null)}
                  className="w-full rounded-full border border-white/60 bg-white/70 py-2 text-xs font-medium text-muted-foreground transition hover:bg-white/90"
                >
                  Annuler
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
