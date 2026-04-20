import type { Metadata } from 'next'
import HeroSection from './hero-section'
import WorkPageContent from './work-page-content'
import { projects, type Project } from './projects'

export const metadata: Metadata = {
  title: 'Nos réalisations | Solea Socials',
  description:
    'Découvrez les résultats réels obtenus pour des artisans et entreprises locales en Suisse romande.',
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
