import { NextResponse } from 'next/server'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { verifyAdminSession } from '@/lib/auth'

export const runtime = 'nodejs'

async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return null
  return verifyAdminSession(token)
}

const blogPostSchema = z.object({
  coverImage: z.string().nullable().optional(),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets'),
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(600),
  category: z.string().min(1),
  coverEmoji: z.string().default('📝'),
  coverFrom: z.string().default('from-orange-400'),
  coverTo: z.string().default('to-rose-400'),
  author: z.string().default('Amandine Veillard'),
  authorRole: z.string().default('Fondatrice de Solea Socials'),
  readTime: z.number().int().min(1).max(60).default(5),
  tags: z.array(z.string()).default([]),
  content: z
    .array(
      z.object({
        type: z.enum(['paragraph', 'heading', 'list', 'quote', 'callout']),
        text: z.string().optional(),
        items: z.array(z.string()).optional(),
        author: z.string().optional(),
      })
    )
    .default([]),
  featured: z.boolean().default(false),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
})

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      coverEmoji: true,
      coverFrom: true,
      coverTo: true,
      author: true,
      authorRole: true,
      readTime: true,
      tags: true,
      featured: true,
      status: true,
      publishedAt: true,
      createdAt: true,
    },
  })

  return NextResponse.json({ data: posts })
}

export async function POST(request: Request) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json()
  const parsed = blogPostSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const existing = await prisma.blogPost.findUnique({
    where: { slug: parsed.data.slug },
    select: { id: true },
  })

  if (existing) {
    return NextResponse.json(
      { error: 'Ce slug est déjà utilisé par un autre article.' },
      { status: 409 }
    )
  }

  const post = await prisma.blogPost.create({
    data: {
      ...parsed.data,
      publishedAt: parsed.data.status === 'PUBLISHED' ? new Date() : null,
    },
  })

  return NextResponse.json({ data: post }, { status: 201 })
}
