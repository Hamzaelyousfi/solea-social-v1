import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getPublishedPostBySlug,
  getPublishedPosts,
  serializeBlogPost,
} from '../data'
import PostContent from './post-content'
import JsonLd from '@/components/seo/json-ld'

const BASE_URL = 'https://soleasocials.ch'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Blog Solea Socials`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author],
      tags: post.tags,
      locale: 'fr_CH',
      siteName: 'Solea Socials',
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([
    getPublishedPostBySlug(slug),
    getPublishedPosts(),
  ])

  if (!post) notFound()

  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    inLanguage: 'fr-CH',
    keywords: post.tags.join(', '),
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Solea Socials',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon-light-32x32.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
    isPartOf: {
      '@type': 'Blog',
      name: 'Blog Solea Socials',
      url: `${BASE_URL}/blog`,
    },
  }

  return (
    <>
      <JsonLd data={articleJsonLd} id="article-jsonld" />
      <PostContent
        post={serializeBlogPost(post)}
        relatedPosts={related.map(serializeBlogPost)}
      />
    </>
  )
}
