export type PostSection =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'callout'; text: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryClass: string
  coverFrom: string
  coverTo: string
  coverEmoji: string
  author: string
  authorRole: string
  date: string
  readTime: number
  tags: string[]
  featured: boolean
  content: PostSection[]
}

export const posts: BlogPost[] = [
  {
    slug: 'instagram-artisanat-suisse',
    title: 'Comment Instagram peut transformer votre artisanat en business florissant',
    excerpt:
      'Découvrez les stratégies concrètes pour utiliser Instagram comme levier de croissance pour votre activité artisanale en Suisse romande.',
    category: 'Réseaux Sociaux',
    categoryClass: 'bg-orange-100 text-orange-700',
    coverFrom: 'from-orange-400',
    coverTo: 'to-rose-400',
    coverEmoji: '📸',
    author: 'Amandine Veillard',
    authorRole: 'Fondatrice de Solea Socials',
    date: '15 janvier 2025',
    readTime: 5,
    tags: ['Instagram', 'Artisanat', 'Stratégie', 'Suisse'],
    featured: true,
    content: [
      {
        type: 'paragraph',
        text: "En Suisse romande, des centaines d'artisans talentueux restent invisibles en ligne. Leur travail est exceptionnel, mais leur présence sur Instagram est quasi inexistante. Pourtant, cette plateforme représente une opportunité unique de toucher des clients locaux prêts à valoriser l'artisanat authentique.",
      },
      { type: 'heading', text: "Pourquoi Instagram est l'outil idéal pour les artisans" },
      {
        type: 'paragraph',
        text: "Instagram est avant tout une vitrine visuelle. Et qu'est-ce qui est plus visuel qu'un beau travail artisanal ? Que vous soyez boulanger, ébéniste, bijoutier ou créateur textile, votre métier produit des images qui captivent naturellement.",
      },
      {
        type: 'list',
        items: [
          'Plus de 4 millions d\'utilisateurs actifs en Suisse',
          '70% des utilisateurs découvrent de nouvelles marques sur Instagram',
          'Les publications avec stories génèrent 3x plus d\'engagement',
          'Le contenu local est favorisé par l\'algorithme dans les recherches géolocalisées',
        ],
      },
      { type: 'heading', text: '5 stratégies concrètes pour démarrer' },
      {
        type: 'paragraph',
        text: "La clé n'est pas de poster tous les jours, mais de poster stratégiquement. Voici les actions qui font réellement la différence pour un artisan en Suisse romande.",
      },
      {
        type: 'list',
        items: [
          'Documentez votre processus de création : les coulisses fascinent votre audience',
          'Utilisez les hashtags locaux (#YverdonlesBains, #SuisseRomande, #ArtisanatSuisse)',
          "Répondez à chaque commentaire dans les 2 premières heures (signal positif pour l'algorithme)",
          'Publiez 3-4 fois par semaine en Reels pour maximiser la portée organique',
          "Collaborez avec d'autres artisans locaux pour cross-promouvoir",
        ],
      },
      {
        type: 'quote',
        text: '« Avant de travailler avec Solea Socials, je postais sans stratégie. Maintenant chaque publication a un but précis et mes demandes de devis ont doublé en 3 mois. »',
        author: 'Client Make Me Beautiful',
      },
      { type: 'heading', text: 'Le contenu qui convertit vraiment' },
      {
        type: 'paragraph',
        text: "Il existe une différence fondamentale entre le contenu qui génère des likes et le contenu qui génère des clients. Pour un artisan, la conversion passe par la démonstration de l'expertise et la construction de confiance.",
      },
      {
        type: 'callout',
        text: "💡 Astuce : Montrez une commande en cours de réalisation avec une mini série de stories. Ce format séquentiel crée de l'engagement et donne envie de suivre la suite.",
      },
      {
        type: 'paragraph',
        text: "Le secret ultime ? L'authenticité. Les clients en Suisse romande valorisent énormément les relations humaines et la confiance. Montrez votre visage, racontez votre histoire, partagez vos valeurs. C'est ce qui différencie un artisan local d'une grande enseigne.",
      },
    ],
  },
  {
    slug: 'erreurs-reseaux-sociaux-pme',
    title: 'Les 7 erreurs à éviter sur les réseaux sociaux pour les PME romandes',
    excerpt:
      'Identifiez les pièges les plus communs sur les réseaux sociaux et apprenez comment les éviter pour maximiser votre présence digitale.',
    category: 'Stratégie',
    categoryClass: 'bg-blue-100 text-blue-700',
    coverFrom: 'from-blue-500',
    coverTo: 'to-violet-600',
    coverEmoji: '🚫',
    author: 'Amandine Veillard',
    authorRole: 'Fondatrice de Solea Socials',
    date: '28 janvier 2025',
    readTime: 7,
    tags: ['Erreurs', 'PME', 'Stratégie', 'Best Practices'],
    featured: false,
    content: [
      {
        type: 'paragraph',
        text: "Après avoir accompagné plusieurs entreprises locales en Suisse romande, j'ai identifié des patterns d'erreurs qui reviennent systématiquement. Ces erreurs coûtent cher en temps, en énergie et en opportunités manquées.",
      },
      { type: 'heading', text: 'Erreur #1 : Vouloir être partout à la fois' },
      {
        type: 'paragraph',
        text: 'Facebook, Instagram, TikTok, LinkedIn, Pinterest, Twitter... Il est tentant de créer un compte partout. Mais cette approche dilue vos efforts et produit du contenu médiocre sur tous les fronts. Mieux vaut exceller sur 1-2 plateformes adaptées à votre audience.',
      },
      { type: 'heading', text: 'Erreur #2 : Ignorer les analytics' },
      {
        type: 'paragraph',
        text: "Les données sont votre meilleur outil de décision. Regardez chaque semaine : quel contenu performe ? À quelle heure votre audience est-elle active ? D'où viennent vos followers ? Ces réponses guident chaque décision éditoriale.",
      },
      {
        type: 'list',
        items: [
          'Poster sans stratégie ni objectif défini',
          'Ne jamais regarder les statistiques et insights',
          'Ignorer les commentaires et messages privés',
          "Supprimer les publications qui performent mal sans analyser pourquoi",
          "Copier le style d'autres entreprises sans l'adapter à son identité",
          'Négliger la biographie et les liens en bio',
          'Oublier de géolocaliser les publications locales',
        ],
      },
      {
        type: 'callout',
        text: '🎯 Règle d\'or : Chaque publication doit répondre à une question simple : "Pourquoi mon audience devrait-elle s\'arrêter et regarder ceci ?"',
      },
      {
        type: 'paragraph',
        text: "Corriger ces erreurs ne demande pas plus de budget, juste plus de méthode. Commencez par auditer votre présence actuelle avec un regard critique et identifiez les 2-3 erreurs les plus impactantes à corriger en priorité.",
      },
    ],
  },
  {
    slug: 'contenu-video-artisans',
    title: 'Créer du contenu vidéo qui convertit : le guide complet pour les artisans',
    excerpt:
      "La vidéo est le format roi du digital. Voici comment créer des Reels et vidéos qui attirent des clients pour votre activité artisanale.",
    category: 'Contenu',
    categoryClass: 'bg-green-100 text-green-700',
    coverFrom: 'from-emerald-400',
    coverTo: 'to-teal-500',
    coverEmoji: '🎬',
    author: 'Amandine Veillard',
    authorRole: 'Fondatrice de Solea Socials',
    date: '10 février 2025',
    readTime: 8,
    tags: ['Vidéo', 'Reels', 'Contenu', 'Conversion'],
    featured: false,
    content: [
      {
        type: 'paragraph',
        text: "En 2025, les Reels représentent 30% du temps passé sur Instagram. Cette statistique seule devrait suffire à vous convaincre d'investir dans la création vidéo. Mais comment créer des vidéos professionnelles sans budget colossal ?",
      },
      { type: 'heading', text: "L'équipement minimal pour démarrer" },
      {
        type: 'paragraph',
        text: "La bonne nouvelle : votre smartphone suffit. Les iPhone et Android récents filment en qualité excellente. Ce qui fait vraiment la différence, c'est l'éclairage et le son.",
      },
      {
        type: 'list',
        items: [
          'Lumière naturelle ou ring light basique (30-50 CHF)',
          'Microphone-cravate pour smartphone (20-40 CHF)',
          'Trépied flexible (15-25 CHF)',
          'Application CapCut pour le montage (gratuit)',
        ],
      },
      { type: 'heading', text: 'Les formats qui marchent en Suisse' },
      {
        type: 'paragraph',
        text: 'Le contenu "process" (montrez votre travail en accéléré) génère en moyenne 4x plus d\'engagement que les photos produits. Les artisans suisses bénéficient d\'un avantage naturel : leur travail est fascinant à regarder.',
      },
      {
        type: 'callout',
        text: '📱 Format gagnant : Filmez votre processus en time-lapse avec une musique tendance, ajoutez des sous-titres avec votre localisation, et terminez par un appel à l\'action vers votre lien en bio.',
      },
      {
        type: 'quote',
        text: "« Une vidéo de 30 secondes qui montre vos mains en train de travailler vaut mille mots sur votre expertise. C'est instinctif, authentique, et irrésistible. »",
        author: 'Amandine, Solea Socials',
      },
    ],
  },
  {
    slug: 'referencement-local-suisse',
    title: "Référencement local : pourquoi votre présence Google est cruciale en Suisse",
    excerpt:
      "Le SEO local est souvent négligé par les PME romandes. Pourtant, c'est l'un des leviers les plus puissants pour attirer des clients de votre région.",
    category: 'SEO Local',
    categoryClass: 'bg-purple-100 text-purple-700',
    coverFrom: 'from-purple-500',
    coverTo: 'to-indigo-600',
    coverEmoji: '🗺️',
    author: 'Amandine Veillard',
    authorRole: 'Fondatrice de Solea Socials',
    date: '20 février 2025',
    readTime: 6,
    tags: ['SEO', 'Google', 'Local', 'Suisse Romande'],
    featured: false,
    content: [
      {
        type: 'paragraph',
        text: "Saviez-vous que 46% des recherches Google ont une intention locale ? Quand quelqu'un tape \"boulanger Yverdon\" ou \"ébéniste Lausanne\", Google affiche en priorité les entreprises avec une fiche locale optimisée.",
      },
      { type: 'heading', text: 'Google Business Profile : votre priorité #1' },
      {
        type: 'paragraph',
        text: "Si vous n'avez pas encore créé et optimisé votre fiche Google Business Profile, c'est la première chose à faire aujourd'hui. C'est gratuit, et l'impact sur votre visibilité locale est immédiat.",
      },
      {
        type: 'list',
        items: [
          'Ajoutez toutes vos informations (horaires, photos, description, services)',
          'Répondez à tous vos avis (positifs et négatifs) dans les 48h',
          'Publiez régulièrement des posts sur votre fiche Google',
          'Utilisez les mots-clés locaux dans votre description',
          'Ajoutez des photos de qualité de votre établissement et productions',
        ],
      },
      {
        type: 'callout',
        text: '🔍 Conseil : Mentionnez systématiquement votre ville et région dans vos descriptions. "Artisan chocolatier à Neuchâtel" vaut mieux que "artisan chocolatier" pour le référencement local.',
      },
      {
        type: 'paragraph',
        text: "Le SEO local, c'est un investissement de long terme. Les résultats ne sont pas immédiats, mais une fois que vous êtes bien positionné, vous bénéficiez d'un flux constant de clients locaux qualifiés sans dépenser en publicité.",
      },
    ],
  },
  {
    slug: 'calendrier-editorial-2025',
    title: "Calendrier éditorial 2025 : l'outil secret des marques qui cartonnent",
    excerpt:
      "Un calendrier éditorial bien construit peut transformer votre communication digitale. Voici comment en créer un adapté aux PME romandes.",
    category: 'Stratégie',
    categoryClass: 'bg-blue-100 text-blue-700',
    coverFrom: 'from-amber-400',
    coverTo: 'to-orange-500',
    coverEmoji: '📅',
    author: 'Amandine Veillard',
    authorRole: 'Fondatrice de Solea Socials',
    date: '5 mars 2025',
    readTime: 4,
    tags: ['Planning', 'Organisation', 'Calendrier', 'Contenu'],
    featured: false,
    content: [
      {
        type: 'paragraph',
        text: "La plus grande différence entre les marques qui réussissent sur les réseaux sociaux et celles qui luttent ? La planification. Un calendrier éditorial simple vous permet de publier régulièrement sans y passer des heures chaque semaine.",
      },
      { type: 'heading', text: 'La structure simple qui fonctionne' },
      {
        type: 'list',
        items: [
          'Lundi : Contenu éducatif (astuces, conseils de votre métier)',
          'Mercredi : Contenu authentique (coulisses, processus de création)',
          'Vendredi : Contenu commercial (promotions, nouveautés, témoignages)',
          'Week-end : Reels ou stories pour maintenir la visibilité',
        ],
      },
      {
        type: 'callout',
        text: '📋 Template gratuit : Créez un tableau avec 4 colonnes (Date, Format, Thème, Légende) dans Google Sheets. Planifiez minimum 2 semaines en avance.',
      },
      {
        type: 'paragraph',
        text: "Commencez petit. Même 3 publications par semaine bien planifiées et régulières valent mieux que 7 publications chaotiques et discontinues. La régularité est la clé de la croissance organique.",
      },
      {
        type: 'quote',
        text: "« Un calendrier éditorial ne bride pas la créativité, il la libère. Quand la structure est posée, vous pouvez vous concentrer sur ce qui compte : le message. »",
        author: 'Amandine, Solea Socials',
      },
    ],
  },
  {
    slug: 'tiktok-vs-instagram-reels',
    title: 'TikTok vs Instagram Reels : quel format choisir pour votre entreprise ?',
    excerpt:
      "Deux plateformes, deux algorithmes, deux audiences. Comment choisir la meilleure stratégie vidéo pour votre PME ou activité artisanale ?",
    category: 'Tendances',
    categoryClass: 'bg-pink-100 text-pink-700',
    coverFrom: 'from-cyan-500',
    coverTo: 'to-blue-600',
    coverEmoji: '📱',
    author: 'Amandine Veillard',
    authorRole: 'Fondatrice de Solea Socials',
    date: '18 mars 2025',
    readTime: 6,
    tags: ['TikTok', 'Instagram', 'Reels', 'Vidéo', 'Tendances'],
    featured: false,
    content: [
      {
        type: 'paragraph',
        text: 'La question revient souvent : "Faut-il être sur TikTok ou se concentrer sur Instagram Reels ?" La réponse dépend de votre audience, vos objectifs et vos ressources disponibles.',
      },
      { type: 'heading', text: 'Instagram Reels : idéal pour les artisans établis' },
      {
        type: 'paragraph',
        text: "Si vous avez déjà une audience sur Instagram, les Reels sont le moyen le plus rapide d'accroître votre portée. L'algorithme Instagram favorise actuellement ce format et l'expose massivement aux non-abonnés.",
      },
      { type: 'heading', text: "TikTok : pour toucher une audience plus jeune et plus large" },
      {
        type: 'paragraph',
        text: "TikTok offre une portée organique extraordinaire, même pour les nouveaux comptes. Un seul contenu viral peut vous apporter des milliers de nouveaux followers en une nuit. Mais l'audience est plus jeune et le format plus exigeant en créativité.",
      },
      {
        type: 'list',
        items: [
          'Instagram Reels : meilleur pour les conversions et clients locaux',
          'TikTok : meilleur pour la notoriété et les audiences 18-34 ans',
          'Les deux : si vous avez une équipe ou de l\'aide externe',
          "Commencez par un seul : là où votre audience cible est déjà présente",
        ],
      },
      {
        type: 'quote',
        text: '« Pour nos clients artisans, nous recommandons presque toujours de commencer par Instagram. La proximité et la géolocalisation y sont plus naturelles pour le marché suisse. »',
        author: 'Amandine, Solea Socials',
      },
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getFeaturedPost(): BlogPost {
  return posts.find((p) => p.featured) ?? posts[0]
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  return posts.filter((p) => p.slug !== currentSlug).slice(0, count)
}
