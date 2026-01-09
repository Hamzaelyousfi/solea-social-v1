import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">404</p>
      <h1 className="mt-4 text-4xl font-bold">Page introuvable</h1>
      <p className="mt-3 max-w-xl text-base text-muted-foreground">
        La page que vous cherchez n&apos;existe pas ou a ete deplacee.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white"
      >
        Retour a l&apos;accueil
      </Link>
    </main>
  )
}
