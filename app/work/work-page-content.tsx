'use client'

import { useMemo, useRef, useState } from 'react'
import type { WorkProject } from './projects'
import FilterChips from './components/filter-chips'
import FeaturedCase from './components/featured-case'
import ProjectCard from './components/project-card'
import VideoModal from './components/video-modal'

type SortOption = 'recents' | 'resultats' | 'az'

type WorkPageContentProps = {
  projects: WorkProject[]
}

const accentButtonClass =
  'inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-600'

export default function WorkPageContent({ projects }: WorkPageContentProps) {
  const [activeCategory, setActiveCategory] = useState('Tout')
  const [sortOption, setSortOption] = useState<SortOption>('recents')
  const [activeProject, setActiveProject] = useState<WorkProject | null>(null)
  const lastActiveRef = useRef<HTMLElement | null>(null)

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((project) => project.category)))
    return ['Tout', ...unique]
  }, [projects])

  const featuredProject = projects.find((project) => project.featured) ?? projects[0]

  const filteredProjects = useMemo(() => {
    const pool = projects.filter((project) => project.slug !== featuredProject.slug)
    const filtered =
      activeCategory === 'Tout'
        ? pool
        : pool.filter((project) => project.category === activeCategory)

    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === 'az') {
        return a.title.localeCompare(b.title)
      }
      if (sortOption === 'resultats') {
        return b.resultsScore - a.resultsScore
      }
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })

    return sorted
  }, [activeCategory, featuredProject.slug, projects, sortOption])

  const openVideo = (project: WorkProject, trigger: HTMLButtonElement) => {
    lastActiveRef.current = trigger
    setActiveProject(project)
  }

  const closeVideo = () => {
    setActiveProject(null)
    requestAnimationFrame(() => {
      lastActiveRef.current?.focus()
    })
  }

  return (
    <main className="bg-gradient-to-b from-neutral-50 via-neutral-50 to-neutral-100">
      <section className="px-4 pb-12 pt-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
              Portfolio
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-neutral-900 md:text-6xl">
              Nos realisations
            </h1>
            <p className="mt-4 text-base text-neutral-600 md:text-lg">
              Un apercu de projets social media, publicite et branding, concus pour generer des resultats concrets.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 md:px-8">
        <div className="mx-auto max-w-6xl">
          <FilterChips
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <FeaturedCase project={featuredProject} onOpenVideo={openVideo} />
        </div>
      </section>

      <section className="px-4 pb-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-neutral-900">
              Tous les projets
            </h2>
            <span className="text-sm text-neutral-500">
              {filteredProjects.length} projets
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onOpenVideo={openVideo}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 md:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Ce que vous obtenez
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                Un process simple pour passer du brief aux resultats.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: 'Audit & strategie',
                  detail: 'Diagnostic clair et axe creatif priorise.',
                },
                {
                  title: 'Production premium',
                  detail: 'Formats video et statiques adaptes aux canaux.',
                },
                {
                  title: 'Pilotage KPI',
                  detail: 'Reporting simple et optimisation continue.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4"
                >
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-500">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-3xl border border-neutral-200 bg-neutral-900 px-8 py-10 text-white md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold">
              Envie de faire grandir votre presence ?
            </h2>
            <p className="mt-2 text-sm text-neutral-200">
              Reservez un audit gratuit pour cadrer vos prochaines actions.
            </p>
          </div>
          <a href="/contact" className={accentButtonClass}>
            Reserver un audit gratuit
          </a>
        </div>
      </section>

      <VideoModal
        project={activeProject}
        isOpen={Boolean(activeProject)}
        onClose={closeVideo}
      />
    </main>
  )
}
