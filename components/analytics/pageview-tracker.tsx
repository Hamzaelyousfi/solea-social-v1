'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function PageviewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) {
      return
    }

    const query = searchParams?.toString()
    const fullPath = query ? `${pathname}?${query}` : pathname
    if (lastPath.current === fullPath) {
      return
    }

    lastPath.current = fullPath

    const payload = {
      path: fullPath,
      referrer: document.referrer || null,
      utmSource: searchParams?.get('utm_source'),
      utmMedium: searchParams?.get('utm_medium'),
    }

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  }, [pathname, searchParams])

  return null
}
