'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Erreur</p>
      <h1 className="mt-4 text-4xl font-bold">Un probleme est survenu</h1>
      <p className="mt-3 max-w-xl text-base text-muted-foreground">
        Essayez de recharger la page. Si le probleme persiste, contactez-nous.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white"
      >
        Reessayer
      </button>
    </main>
  )
}
