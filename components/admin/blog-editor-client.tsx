'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  Eye,
  Loader2,
  Upload,
  X,
  ImageIcon,
} from 'lucide-react'
import type { PostSection } from '@/app/blog/posts'

const CATEGORIES = ['Réseaux Sociaux', 'Stratégie', 'Contenu', 'SEO Local', 'Tendances']

const COVER_PRESETS = [
  { label: 'Corail', from: 'from-orange-400', to: 'to-rose-400' },
  { label: 'Bleu', from: 'from-blue-500', to: 'to-violet-600' },
  { label: 'Vert', from: 'from-emerald-400', to: 'to-teal-500' },
  { label: 'Violet', from: 'from-purple-500', to: 'to-indigo-600' },
  { label: 'Ambre', from: 'from-amber-400', to: 'to-orange-500' },
  { label: 'Cyan', from: 'from-cyan-500', to: 'to-blue-600' },
]

const BLOCK_TYPES: PostSection['type'][] = ['paragraph', 'heading', 'list', 'quote', 'callout']

const BLOCK_LABELS: Record<PostSection['type'], string> = {
  paragraph: 'Paragraphe',
  heading: 'Titre',
  list: 'Liste',
  quote: 'Citation',
  callout: 'Encadré',
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

function newBlock(type: PostSection['type']): PostSection {
  switch (type) {
    case 'list': return { type: 'list', items: [''] }
    case 'quote': return { type: 'quote', text: '', author: '' }
    default: return { type, text: '' } as PostSection
  }
}

type FormState = {
  title: string
  slug: string
  excerpt: string
  category: string
  coverImage: string | null
  coverEmoji: string
  coverFrom: string
  coverTo: string
  author: string
  authorRole: string
  readTime: number
  tags: string
  featured: boolean
  status: 'DRAFT' | 'PUBLISHED'
  content: PostSection[]
}

type Props = {
  mode: 'create' | 'edit'
  postId?: string
  initialData?: Partial<FormState>
}

// ── Image uploader ─────────────────────────────────────────────────────────

function CoverUploader({
  value,
  onChange,
  onUploadingChange,
}: {
  value: string | null
  onChange: (url: string | null) => void
  onUploadingChange?: (uploading: boolean) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  async function upload(file: File) {
    setUploading(true)
    onUploadingChange?.(true)
    setUploadError(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/blog/upload', { method: 'POST', body: fd })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error ?? 'Erreur upload')
      onChange(body.url)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setUploading(false)
      onUploadingChange?.(false)
    }
  }

  async function handleRemove() {
    if (!value) return
    onChange(null)
    // Best-effort delete from blob storage
    fetch('/api/blog/upload', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: value }),
    }).catch(() => undefined)
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (file) upload(file)
  }

  return (
    <div className="space-y-3">
      {/* Preview */}
      {value ? (
        <div className="group relative overflow-hidden rounded-[18px] border border-white/60 bg-neutral-100">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={value}
              alt="Couverture"
              fill
              unoptimized
              sizes="400px"
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-black/80"
            aria-label="Supprimer l'image"
          >
            <X size={14} />
          </button>
          <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
            Image uploadée ✓
          </div>
        </div>
      ) : (
        /* Drop zone */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            handleFiles(e.dataTransfer.files)
          }}
          disabled={uploading}
          className={[
            'flex w-full flex-col items-center justify-center gap-3 rounded-[18px] border-2 border-dashed py-10 transition',
            dragOver
              ? 'border-foreground/40 bg-white/80'
              : 'border-white/60 bg-white/40 hover:border-foreground/30 hover:bg-white/60',
            uploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          ].join(' ')}
        >
          {uploading ? (
            <>
              <Loader2 size={24} className="animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Upload en cours…</span>
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/70 shadow-sm">
                <ImageIcon size={22} className="text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">
                  Cliquez ou glissez une photo ici
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  JPG, PNG, WebP · Max 5 Mo
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-4 py-1.5 text-xs font-semibold shadow-sm">
                <Upload size={12} />
                Choisir un fichier
              </div>
            </>
          )}
        </button>
      )}

      {uploadError && (
        <p className="rounded-xl bg-red-50 px-4 py-2 text-xs text-red-600">{uploadError}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}

// ── Main editor ────────────────────────────────────────────────────────────

export default function BlogEditorClient({ mode, postId, initialData }: Props) {
  const router = useRouter()

  const [form, setForm] = useState<FormState>({
    title: '',
    slug: '',
    excerpt: '',
    category: CATEGORIES[0],
    coverImage: null,
    coverEmoji: '📝',
    coverFrom: COVER_PRESETS[0].from,
    coverTo: COVER_PRESETS[0].to,
    author: 'Amandine Veillard',
    authorRole: 'Fondatrice de Solea Socials',
    readTime: 5,
    tags: '',
    featured: false,
    status: 'DRAFT',
    content: [],
    ...initialData,
  })

  const [slugManual, setSlugManual] = useState(mode === 'edit')
  const [saving, setSaving] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [imageUploading, setImageUploading] = useState(false)

  const set = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  function handleTitleChange(value: string) {
    set('title', value)
    if (!slugManual) set('slug', slugify(value))
  }

  function addBlock(type: PostSection['type']) {
    set('content', [...form.content, newBlock(type)])
  }

  function removeBlock(index: number) {
    set('content', form.content.filter((_, i) => i !== index))
  }

  function moveBlock(index: number, direction: 'up' | 'down') {
    const next = [...form.content]
    const swapWith = direction === 'up' ? index - 1 : index + 1
    if (swapWith < 0 || swapWith >= next.length) return
    ;[next[index], next[swapWith]] = [next[swapWith], next[index]]
    set('content', next)
  }

  function updateBlock(index: number, updated: PostSection) {
    const next = [...form.content]
    next[index] = updated
    set('content', next)
  }

  async function handleSave(publishNow?: boolean) {
    setSaving(true)
    setApiError(null)
    const payload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      status: publishNow ? 'PUBLISHED' : form.status,
    }
    try {
      const url = mode === 'create' ? '/api/blog' : `/api/blog/${postId}`
      const method = mode === 'create' ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error ?? 'Une erreur est survenue.')
      }
      router.push('/admin/blog')
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Erreur inconnue.')
    } finally {
      setSaving(false)
    }
  }

  const selectedPreset = COVER_PRESETS.find(
    (p) => p.from === form.coverFrom && p.to === form.coverTo
  )

  return (
    <div className="flex flex-col gap-8">
      {/* ── Top bar ──────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/60 bg-white/60 p-5 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-white/90"
          >
            <ArrowLeft size={14} />
            Articles
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {mode === 'create' ? 'Nouveau' : 'Modifier'} article
            </p>
            <h2 className="text-xl font-semibold leading-tight">
              {form.title || 'Sans titre'}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={[
              'rounded-full px-3 py-1 text-xs font-semibold',
              form.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600',
            ].join(' ')}
          >
            {form.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
          </span>

          {apiError && (
            <span className="rounded-full bg-red-50 px-3 py-1 text-xs text-red-600">
              {apiError}
            </span>
          )}

          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={saving || imageUploading}
            title={imageUploading ? "Upload d'image en cours…" : undefined}
            className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-white/90 disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : imageUploading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {imageUploading ? 'Upload…' : 'Enregistrer'}
          </button>

          {form.status !== 'PUBLISHED' && (
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={saving || imageUploading}
              title={imageUploading ? "Upload d'image en cours…" : undefined}
              className="flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background shadow-[0_12px_30px_rgba(15,15,15,0.18)] transition hover:-translate-y-0.5 disabled:opacity-50"
            >
              <Eye size={14} />
              Publier
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        {/* ── Left: main fields + content ──────────────────── */}
        <div className="flex flex-col gap-6">
          {/* Basic info */}
          <section className="rounded-[28px] border border-white/60 bg-white/55 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Informations générales
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Titre de l&apos;article *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Ex: Comment Instagram peut booster votre artisanat"
                  className="w-full rounded-[14px] border border-white/60 bg-white/70 px-4 py-3 text-sm font-medium placeholder:text-muted-foreground/60 focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Slug (URL) *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">/blog/</span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => { setSlugManual(true); set('slug', e.target.value) }}
                    placeholder="mon-article-de-blog"
                    className="flex-1 rounded-[14px] border border-white/60 bg-white/70 px-4 py-3 text-sm font-mono placeholder:text-muted-foreground/60 focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Extrait (description) *
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => set('excerpt', e.target.value)}
                  rows={3}
                  placeholder="Une phrase ou deux qui résume l'article..."
                  className="w-full resize-none rounded-[14px] border border-white/60 bg-white/70 px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                />
              </div>
            </div>
          </section>

          {/* Content blocks */}
          <section className="rounded-[28px] border border-white/60 bg-white/55 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Contenu de l&apos;article
            </h3>

            <div className="space-y-3">
              {form.content.length === 0 && (
                <div className="rounded-[20px] border border-dashed border-white/60 bg-white/40 p-6 text-center text-sm text-muted-foreground">
                  Aucun bloc pour le moment. Ajoutez votre premier bloc ci-dessous.
                </div>
              )}
              {form.content.map((block, index) => (
                <BlockEditor
                  key={index}
                  block={block}
                  index={index}
                  total={form.content.length}
                  onChange={(updated) => updateBlock(index, updated)}
                  onRemove={() => removeBlock(index)}
                  onMove={(dir) => moveBlock(index, dir)}
                />
              ))}
            </div>

            <div className="mt-4 rounded-[20px] border border-dashed border-white/70 bg-white/40 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Ajouter un bloc
              </p>
              <div className="flex flex-wrap gap-2">
                {BLOCK_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => addBlock(type)}
                    className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5 hover:bg-white/90"
                  >
                    <Plus size={10} />
                    {BLOCK_LABELS[type]}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ── Right: cover + meta ──────────────────────────── */}
        <div className="flex flex-col gap-6">
          {/* Cover */}
          <section className="rounded-[28px] border border-white/60 bg-white/55 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Couverture
            </h3>

            <CoverUploader
              value={form.coverImage}
              onChange={(url) => set('coverImage', url)}
              onUploadingChange={setImageUploading}
            />

            {/* Fallback options shown when no image */}
            {!form.coverImage && (
              <div className="mt-4 space-y-4 rounded-[18px] border border-white/50 bg-white/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Couverture de secours (sans photo)
                </p>

                {/* Live preview of fallback */}
                <div
                  className={`flex h-16 items-center justify-center rounded-[14px] bg-gradient-to-br ${form.coverFrom} ${form.coverTo}`}
                >
                  <span className="text-3xl">{form.coverEmoji}</span>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Emoji
                  </label>
                  <input
                    type="text"
                    value={form.coverEmoji}
                    onChange={(e) => set('coverEmoji', e.target.value)}
                    className="w-full rounded-[12px] border border-white/60 bg-white/70 px-3 py-2 text-sm focus:border-foreground/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Dégradé
                  </label>
                  <div className="grid grid-cols-6 gap-1.5">
                    {COVER_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => { set('coverFrom', preset.from); set('coverTo', preset.to) }}
                        className={[
                          'h-8 rounded-[10px] bg-gradient-to-br transition',
                          preset.from, preset.to,
                          selectedPreset?.label === preset.label
                            ? 'ring-2 ring-foreground ring-offset-1'
                            : 'opacity-60 hover:opacity-100',
                        ].join(' ')}
                        aria-label={preset.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Metadata */}
          <section className="rounded-[28px] border border-white/60 bg-white/55 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Métadonnées
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Catégorie
                </label>
                <select
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  className="w-full rounded-[14px] border border-white/60 bg-white/70 px-4 py-2.5 text-sm focus:border-foreground/30 focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Temps de lecture (min)
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={form.readTime}
                  onChange={(e) => set('readTime', Number(e.target.value))}
                  className="w-full rounded-[14px] border border-white/60 bg-white/70 px-4 py-2.5 text-sm focus:border-foreground/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => set('tags', e.target.value)}
                  placeholder="Instagram, Stratégie, Suisse"
                  className="w-full rounded-[14px] border border-white/60 bg-white/70 px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:border-foreground/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Auteur
                </label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => set('author', e.target.value)}
                  className="w-full rounded-[14px] border border-white/60 bg-white/70 px-4 py-2.5 text-sm focus:border-foreground/30 focus:outline-none"
                />
              </div>

              <label className="flex cursor-pointer items-center justify-between rounded-[14px] border border-white/60 bg-white/70 px-4 py-3">
                <span className="text-sm font-medium">Article mis en avant ⭐</span>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => set('featured', e.target.checked)}
                  className="h-4 w-4 accent-foreground"
                />
              </label>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// ── Block editor ───────────────────────────────────────────────────────────

type BlockEditorProps = {
  block: PostSection
  index: number
  total: number
  onChange: (updated: PostSection) => void
  onRemove: () => void
  onMove: (dir: 'up' | 'down') => void
}

function BlockEditor({ block, index, total, onChange, onRemove, onMove }: BlockEditorProps) {
  const inputClass =
    'w-full rounded-[12px] border border-white/60 bg-white/80 px-3 py-2 text-sm placeholder:text-muted-foreground/60 focus:border-foreground/30 focus:outline-none focus:ring-1 focus:ring-foreground/10'

  return (
    <div className="rounded-[20px] border border-white/70 bg-white/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {BLOCK_LABELS[block.type]}
        </span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => onMove('up')} disabled={index === 0} className="rounded-full p-1 text-muted-foreground transition hover:bg-white/80 disabled:opacity-30">
            <ChevronUp size={14} />
          </button>
          <button type="button" onClick={() => onMove('down')} disabled={index === total - 1} className="rounded-full p-1 text-muted-foreground transition hover:bg-white/80 disabled:opacity-30">
            <ChevronDown size={14} />
          </button>
          <button type="button" onClick={onRemove} className="rounded-full p-1 text-muted-foreground transition hover:bg-red-50 hover:text-red-500">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {(block.type === 'paragraph' || block.type === 'heading' || block.type === 'callout') && (
        <textarea
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value } as PostSection)}
          rows={block.type === 'heading' ? 1 : 3}
          placeholder={
            block.type === 'heading' ? 'Titre de section...'
            : block.type === 'callout' ? '💡 Conseil ou information importante...'
            : 'Contenu du paragraphe...'
          }
          className={`${inputClass} resize-none`}
        />
      )}

      {block.type === 'list' && (
        <textarea
          value={block.items.join('\n')}
          onChange={(e) => onChange({ type: 'list', items: e.target.value.split('\n') })}
          rows={4}
          placeholder={'Élément 1\nÉlément 2\nÉlément 3'}
          className={`${inputClass} resize-none font-mono text-xs`}
        />
      )}

      {block.type === 'quote' && (
        <div className="space-y-2">
          <textarea
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            rows={3}
            placeholder='« Citation inspirante... »'
            className={`${inputClass} resize-none`}
          />
          <input
            type="text"
            value={block.author ?? ''}
            onChange={(e) => onChange({ ...block, author: e.target.value })}
            placeholder="Auteur de la citation (optionnel)"
            className={inputClass}
          />
        </div>
      )}
    </div>
  )
}
