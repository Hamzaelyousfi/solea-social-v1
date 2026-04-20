import type { Metadata } from 'next'
import { getPublishedPosts, serializeBlogPost } from './data'
import BlogPageContent from './blog-page-content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog & Ressources | Solea Socials',
  description:
    'Stratégies concrètes, tendances et bonnes pratiques pour développer votre présence digitale en Suisse romande. Conseils par Amandine, fondatrice de Solea Socials.',
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()
  const serialized = posts.map(serializeBlogPost)
  return <BlogPageContent posts={serialized} />
}
