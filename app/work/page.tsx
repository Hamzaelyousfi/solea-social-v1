import type { Metadata } from 'next'
import WorkPageContent from './work-page-content'
import { workProjects } from './projects'

export const metadata: Metadata = {
  title: 'Nos realisations | Solea Socials',
  description:
    'Decouvrez nos projets et les resultats obtenus pour les marques en social media.',
}

export default function WorkPage() {
  return <WorkPageContent projects={workProjects} />
}
