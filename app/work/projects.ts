export type WorkProject = {
  slug: string
  title: string
  client: string
  category: string
  summary: string
  kpis: Array<{ label: string; value: string }>
  cover: { src: string; alt: string }
  videoPlaceholder: {
    hasVideo: boolean
    posterSrc: string
    durationLabel?: string
    formatLabel?: string
  }
  featured?: boolean
  publishedAt: string
  resultsScore: number
}

export const workProjects: WorkProject[] = [
  {
    slug: 'atelier-nomad',
    title: 'Reels artisanat moderne',
    client: 'Atelier Nomad',
    category: 'Reseaux Sociaux',
    summary:
      'Une serie de reels courts qui met en valeur les gestes metier et augmente la decouverte organique.',
    kpis: [
      { label: 'Reach', value: '+180%' },
      { label: 'Engagement', value: '+92%' },
      { label: 'DM', value: '+140%' },
    ],
    cover: {
      src: '/work/placeholder-1.jpg',
      alt: 'Atelier Nomad - apercu du reel',
    },
    videoPlaceholder: {
      hasVideo: true,
      posterSrc: '/work/placeholder-1.jpg',
      durationLabel: '0:12',
      formatLabel: 'Reel 9:16',
    },
    featured: true,
    publishedAt: '2025-11-12',
    resultsScore: 92,
  },
  {
    slug: 'studio-lumen',
    title: 'Campagne Meta Ads locale',
    client: 'Studio Lumen',
    category: 'Publicite',
    summary:
      'Un tunnel simple qui transforme les visites locales en reservations en moins de 7 jours.',
    kpis: [
      { label: 'CPL', value: '-28%' },
      { label: 'Leads', value: '214' },
      { label: 'ROAS', value: '4.2x' },
    ],
    cover: {
      src: '/work/placeholder-2.jpg',
      alt: 'Studio Lumen - visuel campagne locale',
    },
    videoPlaceholder: {
      hasVideo: false,
      posterSrc: '/work/placeholder-2.jpg',
      formatLabel: 'Story 9:16',
    },
    publishedAt: '2025-09-28',
    resultsScore: 88,
  },
  {
    slug: 'cafe-aurora',
    title: 'Lancement de marque et ton visuel',
    client: 'Cafe Aurora',
    category: 'Branding',
    summary:
      'Un univers tonal et une ligne editoriale coherente pour une ouverture remarque.',
    kpis: [
      { label: 'Followers', value: '+2.1k' },
      { label: 'UGC', value: '+64' },
      { label: 'Visites', value: '+38%' },
    ],
    cover: {
      src: '/work/placeholder-3.jpg',
      alt: 'Cafe Aurora - visuels de marque',
    },
    videoPlaceholder: {
      hasVideo: true,
      posterSrc: '/work/placeholder-3.jpg',
      durationLabel: '0:18',
      formatLabel: 'Reel 9:16',
    },
    publishedAt: '2025-08-05',
    resultsScore: 85,
  },
  {
    slug: 'clinique-eden',
    title: 'Contenu educatif pour confiance',
    client: 'Clinique Eden',
    category: 'Strategie',
    summary:
      'Des formats educatifs et rassurants qui augmentent les demandes de consultation.',
    kpis: [
      { label: 'CTR', value: '+22%' },
      { label: 'RDV', value: '+31%' },
      { label: 'Partages', value: '+46%' },
    ],
    cover: {
      src: '/work/placeholder-4.jpg',
      alt: 'Clinique Eden - posts educatifs',
    },
    videoPlaceholder: {
      hasVideo: false,
      posterSrc: '/work/placeholder-4.jpg',
      formatLabel: 'Carousel 1:1',
    },
    publishedAt: '2025-07-12',
    resultsScore: 80,
  },
  {
    slug: 'maison-cordee',
    title: 'Serie UGC et micro-influence',
    client: 'Maison Cordee',
    category: 'Reseaux Sociaux',
    summary:
      'Une activation UGC qui met en avant les usages reels du produit.',
    kpis: [
      { label: 'Vues', value: '380k' },
      { label: 'Save', value: '+71%' },
      { label: 'CPA', value: '-19%' },
    ],
    cover: {
      src: '/work/placeholder-5.jpg',
      alt: 'Maison Cordee - UGC reels',
    },
    videoPlaceholder: {
      hasVideo: true,
      posterSrc: '/work/placeholder-5.jpg',
      durationLabel: '0:15',
      formatLabel: 'Reel 9:16',
    },
    publishedAt: '2025-06-02',
    resultsScore: 90,
  },
  {
    slug: 'bloom-atelier',
    title: 'Campagne saisonniere multicanal',
    client: 'Bloom Atelier',
    category: 'Publicite',
    summary:
      'Un mix ads + social organique pour soutenir une collection capsule.',
    kpis: [
      { label: 'Panier', value: '+24%' },
      { label: 'ROAS', value: '3.6x' },
      { label: 'Taux conv.', value: '+18%' },
    ],
    cover: {
      src: '/work/placeholder-6.jpg',
      alt: 'Bloom Atelier - campagne capsule',
    },
    videoPlaceholder: {
      hasVideo: true,
      posterSrc: '/work/placeholder-6.jpg',
      durationLabel: '0:10',
      formatLabel: 'Story 9:16',
    },
    publishedAt: '2025-05-10',
    resultsScore: 87,
  },
  {
    slug: 'helios-lab',
    title: 'Positionnement et narration B2B',
    client: 'Helios Lab',
    category: 'Strategie',
    summary:
      'Un storytelling technique transforme en message clair pour les decideurs.',
    kpis: [
      { label: 'MQL', value: '+41%' },
      { label: 'Demos', value: '+19' },
      { label: 'Cycle', value: '-12%' },
    ],
    cover: {
      src: '/work/placeholder-7.jpg',
      alt: 'Helios Lab - presentation B2B',
    },
    videoPlaceholder: {
      hasVideo: false,
      posterSrc: '/work/placeholder-7.jpg',
      formatLabel: 'Slide 16:9',
    },
    publishedAt: '2025-04-18',
    resultsScore: 83,
  },
]
