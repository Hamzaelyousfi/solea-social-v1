'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileCtaBar() {
  const pathname = usePathname()
  
  // Don't show on contact or admin pages
  if (pathname?.includes('/contact') || pathname?.includes('/admin')) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t border-border/50 z-50 md:hidden">
      <Link
        href="/contact"
        className="block w-full py-3 px-4 bg-accent text-white text-center font-bold rounded-full hover:bg-accent/90 transition-all active:scale-95"
      >
        Obtenir un audit gratuit
      </Link>
    </div>
  )
}
