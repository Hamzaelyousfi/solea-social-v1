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
    sector: 'Institut de beaute',
    description:
      "Strategie social media et community management pour mettre en avant l'humain et les moments vrais. Les reels humoristiques et storytelling ont declenche une forte hausse de visibilite en deux mois.",
      mediaType: 'video',
      image: {
      src: '/projects/réel-laser.webm',
      alt: 'Makemebeautiful - visuels reels et storytelling',
    },
    metrics: [
      { label: 'Vues', value: '150K en 2 mois' },
      { label: 'Comptes touches', value: '+99%' },
      { label: 'Vues non-followers', value: '+30%' },
      { label: 'Visites profil', value: '+13%' },
      { label: 'Clics externes', value: '+7.1%' },
    ],
    contents: [
      {
        title: 'Reel humoristique - backstage institut',
        format: 'Reel Instagram',
        url: 'https://www.instagram.com/reel/makemebeautiful-1',
        note: 'Ton leger pour maximiser les partages',
      },
      {
        title: 'Reel humoristique - avant/apres',
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
        title: "Reel storytelling - equipe de l'institut",
        format: 'Reel Instagram',
        url: 'https://www.instagram.com/reel/makemebeautiful-4',
        note: 'Authenticite et proximite',
      },
    ],
  },
  {
    slug: 'ide-sport',
    title: 'Ide Sport',
    sector: 'Fondation IdeeSport - evenements sportifs',
    description:
      "Creation de contenu original (reels et videos) pour des evenements sportifs nocturnes. Une narration energique qui valorise l'ambiance locale et l'impact social du projet.",
      mediaType: 'video',
      image: {
      src: '/projects/ide-sport.webm',
      alt: 'ide-sport - contenus evenements sportifs',
    },
    metrics: [{ label: 'Vues', value: '+2 300' }],
    contents: [
      {
        title: 'Reel evenement - highlights terrain',
        format: 'Reel Instagram',
        url: 'https://www.instagram.com/reel/midnight-club-1',
        note: 'Cadences rapides et ambiance',
      },
      {
        title: 'Video recap - engagement jeunes',
        format: 'Video 9:16',
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
      'Strategie complete avec creation de contenu, gestion des reseaux et calendrier editorial pour renforcer la desirabilite et la reconnaissance locale.',
    mediaType: 'video',
    image: {
      src: '/projects/Visitaly.webm',
      alt: 'Visitaly - identite visuelle restaurant',
    },
    metrics: [
      { label: 'Followers', value: '+62% en 1 an' },
      { label: 'Vues TikTok', value: '+35K' },
    ],
    contents: [
      {
        title: 'Reel signature - experience en salle',
        format: 'Reel Instagram',
        url: 'https://www.instagram.com/reel/visitaly-1',
        note: 'Narration immersive',
      },
      {
        title: 'Video TikTok - focus cuisine',
        format: 'TikTok 9:16',
        url: 'https://www.tiktok.com/@visitaly/video/1',
        note: 'Identite graphique renforcee',
      },
    ],
  },
]
