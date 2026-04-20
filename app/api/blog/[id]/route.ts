import { NextResponse } from 'next/server'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { unlink } from 'fs/promises'
import path from 'path'
import { prisma } from '@/lib/prisma'
import { verifyAdminSession } from '@/lib/auth'

export const runtime = 'nodejs'

async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return null
  return verifyAdminSession(token)
}

const updateSchema = z.object({
  coverImage: z.string().nullable().optional(),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  title: z.string().min(1).max(200).optional(),
  excerpt: z.string().min(1).max(600).optional(),
  category: z.string().min(1).optional(),
  coverEmoji: z.string().optional(),
  coverFrom: z.string().optional(),
  coverTo: z.string().optional(),
  author: z.string().optional(),
  authorRole: z.string().optional(),
  readTime: z.number().int().min(1).max(60).optional(),
  tags: z.array(z.string()).optional(),
  content: z
    .array(
      z.object({
        type: z.enum(['paragraph', 'heading', 'list', 'quote', 'callout']),
        text: z.string().optional(),
        items: z.array(z.string()).optional(),
        author: z.string().optional(),
      })
    )
    .optional(),
  featured: z.boolean().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
})

type RouteContext = { params: Promise<{ id: string }> | { id: string } }

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await Promise.resolve(context.params)

  const post = await prisma.blogPost.findUnique({ where: { id } })
  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ data: post })
}

export async function PUT(request: Request, context: RouteContext) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await Promise.resolve(context.params)
  const payload = await request.json()
  const parsed = updateSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  if (parsed.data.slug) {
    const conflict = await prisma.blogPost.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
      select: { id: true },
    })
    if (conflict) {
      return NextResponse.json(
        { error: 'Ce slug est déjà utilisé par un autre article.' },
        { status: 409 }
      )
    }
  }

  const current = await prisma.blogPost.findUnique({
    where: { id },
    select: { status: true, publishedAt: true },
  })
  if (!current) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const wasPublished = current.status === 'PUBLISHED'
  const willBePublished = parsed.data.status === 'PUBLISHED'
  const publishedAt =
    !wasPublished && willBePublished
      ? new Date()
      : parsed.data.status === 'DRAFT'
        ? null
        : current.publishedAt

  const post = await prisma.blogPost.update({
    where: { id },
    data: { ...parsed.data, publishedAt },
  })

  return NextResponse.json({ data: post })
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await Promise.resolve(context.params)

  const current = await prisma.blogPost.findUnique({
    where: { id },
    select: { status: true },
  })
  if (!current) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const newStatus = current.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      status: newStatus,
      publishedAt: newStatus === 'PUBLISHED' ? new Date() : null,
    },
  })

  return NextResponse.json({ data: post })
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await Promise.resolve(context.params)

  const existing = await prisma.blogPost.findUnique({
    where: { id },
    select: { id: true, coverImage: true },
  })
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await prisma.blogPost.delete({ where: { id } })

  if (existing.coverImage?.startsWith('/uploads/blog/')) {
    const filePath = path.join(process.cwd(), 'public', existing.coverImage.slice(1))
    unlink(filePath).catch(() => undefined)
  }

  return NextResponse.json({ success: true })
}
