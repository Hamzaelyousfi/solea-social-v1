import Link from 'next/link'
import type { WorkProject } from '../projects'

type FeaturedCaseProps = {
  project: WorkProject
  onOpenVideo: (project: WorkProject, trigger: HTMLButtonElement) => void
}

export default function FeaturedCase({ project, onOpenVideo }: FeaturedCaseProps) {
  const { videoPlaceholder } = project
  const hasVideo = videoPlaceholder?.hasVideo

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
      <div className="grid gap-10 p-6 md:grid-cols-2 md:p-10">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
          <div className="aspect-[4/3]">
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              className="h-full w-full object-cover"
            />
          </div>
          {hasVideo ? (
            <div className="absolute inset-0 flex items-end justify-between p-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-800 shadow">
                <span className="inline-flex h-2 w-2 rounded-full bg-orange-500" />
                {videoPlaceholder.formatLabel ?? 'Video'}
              </div>
              {videoPlaceholder.durationLabel ? (
                <div className="rounded-full bg-neutral-900/80 px-3 py-1 text-xs font-semibold text-white">
                  {videoPlaceholder.durationLabel}
                </div>
              ) : null}
            </div>
          ) : null}
          {hasVideo ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 shadow-lg">
                Play
              </span>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col justify-center gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              Case phare
            </p>
            <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
              {project.client}
            </h2>
            <p className="text-lg text-neutral-600">{project.title}</p>
          </div>
          <p className="text-base text-neutral-600">{project.summary}</p>
          <div className="flex flex-wrap gap-2">
            {project.kpis.slice(0, 3).map((kpi) => (
              <span
                key={kpi.label}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-700"
              >
                {kpi.label}: {kpi.value}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:-translate-y-0.5 hover:bg-neutral-900 hover:text-white"
            >
              Voir le cas
            </Link>
            <button
              type="button"
              onClick={(event) => onOpenVideo(project, event.currentTarget)}
              disabled={!hasVideo}
              title={
                hasVideo
                  ? 'Voir un apercu video'
                  : 'Video bientot disponible'
              }
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500"
            >
              Voir un apercu video
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
