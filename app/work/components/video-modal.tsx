'use client'

import { useEffect, useRef } from 'react'
import type { WorkProject } from '../projects'

type VideoModalProps = {
  project: WorkProject | null
  isOpen: boolean
  onClose: () => void
}

export default function VideoModal({ project, isOpen, onClose }: VideoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  const poster = project.videoPlaceholder?.posterSrc ?? project.cover.src

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Video ${project.client}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-xl md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              {project.client}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700 transition hover:border-neutral-400"
          >
            Fermer
          </button>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl bg-neutral-100">
          <div className="relative aspect-video">
            <img
              src={poster}
              alt={project.cover.alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-900/40 text-white">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900">
                Play
              </span>
              <p className="text-sm font-medium">
                Video a ajouter (placeholder). Remplacer posterSrc par un fichier video plus tard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
