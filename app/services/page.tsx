import type { Metadata } from 'next'
import ServicesView from '@/components/pages/services-view'

export const metadata: Metadata = {
  title: 'Nos Services | Solea Socials',
  description:
    'Decouvrez les services premium de Solea Socials : strategie & audit digital, creation de contenus et accompagnement evenementiel pour propulser votre marque en Suisse romande.',
  openGraph: {
    title: 'Nos Services | Solea Socials',
    description:
      'Des solutions digitales completes : audit, creation et accompagnement pour artisans, PME et marques premium.',
    url: 'https://solea-socials.com/services',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Solea Socials - Services',
  areaServed: 'Suisse Romande',
  provider: {
    '@type': 'Organization',
    name: 'Solea Socials',
    url: 'https://solea-socials.com',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Solutions digitales premium',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Strategie & Audit Digital',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Creation & Gestion de Contenus',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Evenements & Accompagnement',
        },
      },
    ],
  },
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesView />
    </>
  )
}
