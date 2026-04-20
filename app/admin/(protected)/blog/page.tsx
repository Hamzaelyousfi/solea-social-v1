import { getAllPostsForAdmin } from '@/app/blog/data'
import BlogListClient from '@/components/admin/blog-list-client'

export const dynamic = 'force-dynamic'

export default async function AdminBlogPage() {
  const posts = await getAllPostsForAdmin()

  const serialized = posts.map((p) => ({
    ...p,
    coverImage: p.coverImage ?? null,
    publishedAt: p.publishedAt?.toISOString() ?? null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    content: p.content as object,
  }))

  return <BlogListClient posts={serialized} />
}
