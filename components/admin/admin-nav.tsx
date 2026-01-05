'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/messages', label: 'Messages' },
  { href: '/admin/settings', label: 'Settings' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-wrap items-center gap-3">
      {links.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={[
              'rounded-full border px-4 py-2 text-sm font-medium transition',
              'backdrop-blur-xl',
              isActive
                ? 'border-white/60 bg-white/70 text-foreground shadow-[0_12px_40px_rgba(15,15,15,0.12)]'
                : 'border-white/30 bg-white/40 text-foreground/70 hover:border-white/60 hover:bg-white/60',
            ].join(' ')}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
