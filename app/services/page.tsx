import type { Metadata } from 'next'
import ServicesView from '@/components/pages/services-view'

export const metadata: Metadata = {
  title: 'Nos Services | Solea Socials',
  description:
    'Découvrez les services premium de Solea Socials : stratégie & audit digital, création de contenus et accompagnement événementiel pour propulser votre marque en Suisse romande.',
  openGraph: {
    title: 'Nos Services | Solea Socials',
    description:
      'Des solutions digitales complètes : audit, création et accompagnement pour artisans, PME et marques premium.',
    url: 'https://soleasocials.ch/services',
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
    url: 'https://soleasocials.ch',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Solutions digitales premium',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Stratégie & Audit Digital',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Création & Gestion de Contenus',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Événements & Accompagnement',
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
