'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import PageTransition from '@/components/page-transition'
import MobileCtaBar from '@/components/mobile-cta-bar'

export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Header />}
      <PageTransition>{children}</PageTransition>
      {!isAdmin && <Footer />}
      {!isAdmin && <MobileCtaBar />}
    </>
  )
}
