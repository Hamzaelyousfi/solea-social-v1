import type { Metadata } from 'next'
import HeroSection from './hero-section'
import WorkPageContent from './work-page-content'
import { projects, type Project } from './projects'

export const metadata: Metadata = {
  title: 'Nos realisations | Solea Socials',
  description:
    'Decouvrez les resultats reels obtenus pour des artisans et petites entreprises en Suisse romande.',
}

async function getProjects(): Promise<Project[]> {
  return projects
}

export default async function WorkPage() {
  const projectList = await getProjects()
  return (
    <>
      <HeroSection clientNames={projectList.map((project) => project.title)} />
      <WorkPageContent projects={projectList} />
    </>
  )
}
