import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminNav from '@/components/admin/admin-nav'
import { verifyAdminSession } from '@/lib/auth'

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value

  if (!session) {
    redirect('/admin/login')
  }

  const isValid = await verifyAdminSession(session)
  if (!isValid) {
    redirect('/admin/login')
  }

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-sm font-semibold shadow-[0_16px_40px_rgba(15,15,15,0.14)] backdrop-blur-xl">
            SS
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              Admin space
            </p>
            <h1 className="text-2xl font-semibold">Solea Socials</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70 shadow-[0_18px_45px_rgba(15,15,15,0.14)] backdrop-blur-xl">
            Live preview
          </div>
          <Link
            href="/contact"
            className="rounded-full border border-white/60 bg-white/70 px-5 py-2 text-sm font-semibold text-foreground shadow-[0_18px_45px_rgba(15,15,15,0.14)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/90"
          >
            Voir le site
          </Link>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-full border border-white/60 bg-white/70 px-5 py-2 text-sm font-semibold text-foreground shadow-[0_18px_45px_rgba(15,15,15,0.14)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Deconnexion
            </button>
          </form>
        </div>
      </header>

      <AdminNav />

      <div>{children}</div>
    </>
  )
}
