import { notFound } from 'next/navigation'
import { getPostByIdForAdmin } from '@/app/blog/data'
import BlogEditorClient from '@/components/admin/blog-editor-client'
import type { PostSection } from '@/app/blog/posts'

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostByIdForAdmin(id)
  if (!post) notFound()

  return (
    <BlogEditorClient
      mode="edit"
      postId={id}
      initialData={{
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        category: post.category,
        coverImage: post.coverImage ?? null,
        coverEmoji: post.coverEmoji,
        coverFrom: post.coverFrom,
        coverTo: post.coverTo,
        author: post.author,
        authorRole: post.authorRole,
        readTime: post.readTime,
        tags: post.tags.join(', '),
        featured: post.featured,
        status: post.status as 'DRAFT' | 'PUBLISHED',
        content: (post.content ?? []) as PostSection[],
      }}
    />
  )
}
