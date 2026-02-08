export type ProjectMetric = {
  label: string
  value: string
}

export type ProjectContent = {
  title: string
  format: string
  url: string
  note?: string
}

export type Project = {
  slug: string
  title: string
  sector: string
  description: string
  mediaType?: 'image' | 'video'
  image: {
    src: string
    alt: string
  }
  metrics: ProjectMetric[]
  contents: ProjectContent[]
}

export const projects: Project[] = [
  {
    slug: 'makemebeautiful',
    title: 'Makemebeautiful',
    sector: 'Institut de beauté',
    description:
      "Stratégie social media et community management pour mettre en avant l'humain et les moments vrais. Les reels humoristiques et storytelling ont déclenché une forte hausse de visibilité en deux mois.",
      mediaType: 'video',
      image: {
      src: '/projects/réel-laser.webm',
      alt: 'Makemebeautiful - visuels Reels et storytelling',
    },
    metrics: [
      { label: 'Vues', value: '150K en 2 mois' },
      { label: 'Comptes touchés', value: '+99%' },
      { label: 'Vues non-followers', value: '+30%' },
      { label: 'Visites profil', value: '+13%' },
      { label: 'Clics externes', value: '+7.1%' },
    ],
    contents: [
      {
        title: 'Reel humoristique - backstage institut',
        format: 'Reel Instagram',
        url: 'https://www.instagram.com/reel/makemebeautiful-1',
        note: 'Ton léger pour maximiser les partages',
      },
      {
        title: 'Reel humoristique - avant/après',
        format: 'Reel Instagram',
        url: 'https://www.instagram.com/reel/makemebeautiful-2',
        note: 'Format court avec surprise',
      },
      {
        title: 'Reel storytelling - portrait cliente',
        format: 'Reel Instagram',
        url: 'https://www.instagram.com/reel/makemebeautiful-3',
        note: 'Focus sur la dimension humaine',
      },
      {
        title: "Reel storytelling - équipe de l'institut",
        format: 'Reel Instagram',
        url: 'https://www.instagram.com/reel/makemebeautiful-4',
        note: 'Authenticité et proximité',
      },
    ],
  },
  {
    slug: 'ide-sport',
    title: 'Idée Sport',
    sector: 'Fondation Idée Sport - événements sportifs',
    description:
      "Création de contenu pour une fondation qui utilise le sport pour promouvoir la santé, l'intégration et la prévention des dépendances chez les jeunes.",
      mediaType: 'video',
      image: {
      src: '/projects/ide-sport.webm',
      alt: 'Idée Sport - contenus événements sportifs',
    },
    metrics: [{ label: 'Vues', value: '+2 300' }],
    contents: [
      {
        title: 'Reel événement - highlights terrain',
        format: 'Reel Instagram',
        url: 'https://www.instagram.com/reel/midnight-club-1',
        note: 'Cadences rapides et ambiance',
      },
      {
        title: 'Vidéo recap - engagement jeunes',
        format: 'Vidéo 9:16',
        url: 'https://www.instagram.com/reel/midnight-club-2',
        note: 'Message positif et inclusif',
      },
    ],
  },
  {
    slug: 'visitaly',
    title: 'Visitaly',
    sector: 'Restaurant',
    description:
      'Stratégie complète avec création de contenu, gestion des réseaux et calendrier éditorial pour renforcer la désirabilité et la reconnaissance locale.',
    mediaType: 'video',
    image: {
      src: '/projects/Visitaly.webm',
      alt: 'Visitaly - identité visuelle restaurant',
    },
    metrics: [
      { label: 'Followers', value: '+62% en 1 an' },
      { label: 'Vues TikTok', value: '+35K' },
    ],
    contents: [
      {
        title: 'Reel signature - expérience en salle',
        format: 'Reel Instagram',
        url: 'https://www.instagram.com/reel/visitaly-1',
        note: 'Narration immersive',
      },
      {
        title: 'Vidéo TikTok - focus cuisine',
        format: 'TikTok 9:16',
        url: 'https://www.tiktok.com/@visitaly/video/1',
        note: 'Identité graphique renforcée',
      },
    ],
  },
]
