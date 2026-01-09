import Link from 'next/link'
import type { WorkProject } from '../projects'

type ProjectCardProps = {
  project: WorkProject
  onOpenVideo: (project: WorkProject, trigger: HTMLButtonElement) => void
}

export default function ProjectCard({ project, onOpenVideo }: ProjectCardProps) {
  const hasVideo = project.videoPlaceholder?.hasVideo

  return (
    <article className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
        <div className="aspect-[4/3]">
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            className="h-full w-full object-cover"
          />
        </div>
        {hasVideo ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-900 shadow">
              Play
            </span>
          </div>
        ) : null}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-700 shadow">
          {project.category}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
            {project.client}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-neutral-900">
            {project.title}
          </h3>
        </div>
        <p className="text-sm text-neutral-600">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.kpis.slice(0, 3).map((kpi) => (
            <span
              key={kpi.label}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700"
            >
              {kpi.label}: {kpi.value}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
          >
            Details
          </Link>
          <button
            type="button"
            onClick={(event) => onOpenVideo(project, event.currentTarget)}
            disabled={!hasVideo}
            title={hasVideo ? 'Voir la video' : 'Video bientot disponible'}
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500"
          >
            {hasVideo ? 'Video' : 'Video bientot'}
          </button>
        </div>
      </div>
    </article>
  )
}
