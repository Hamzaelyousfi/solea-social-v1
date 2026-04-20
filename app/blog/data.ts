import { prisma } from '@/lib/prisma'
import type { BlogPost } from '@prisma/client'
import type { PostSection } from './posts'

export type BlogPostUI = Omit<BlogPost, 'content'> & {
  categoryClass: string
  content: PostSection[]
}

export type BlogPostSerialized = Omit<BlogPostUI, 'publishedAt' | 'createdAt' | 'updatedAt'> & {
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

const CATEGORY_CLASSES: Record<string, string> = {
  'Réseaux Sociaux': 'bg-orange-100 text-orange-700',
  Stratégie: 'bg-blue-100 text-blue-700',
  Contenu: 'bg-green-100 text-green-700',
  'SEO Local': 'bg-purple-100 text-purple-700',
  Tendances: 'bg-pink-100 text-pink-700',
}

export function getCategoryClass(category: string): string {
  return CATEGORY_CLASSES[category] ?? 'bg-gray-100 text-gray-700'
}

function toUI(post: BlogPost): BlogPostUI {
  return {
    ...post,
    categoryClass: getCategoryClass(post.category),
    content: (post.content ?? []) as PostSection[],
  }
}

export function serializeBlogPost(post: BlogPostUI): BlogPostSerialized {
  return {
    ...post,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }
}

export async function getPublishedPosts(): Promise<BlogPostUI[]> {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
  })
  return posts.map(toUI)
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPostUI | null> {
  const post = await prisma.blogPost.findFirst({
    where: { slug, status: 'PUBLISHED' },
  })
  return post ? toUI(post) : null
}

export async function getAllPostsForAdmin(): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function getPostByIdForAdmin(id: string): Promise<BlogPost | null> {
  return prisma.blogPost.findUnique({ where: { id } })
}
