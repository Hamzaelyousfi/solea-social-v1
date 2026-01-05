
import { Space_Grotesk as SpaceGrotesk, Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { MotionConfig, AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import './globals.css'
import Preloader from '@/components/preloader'
import LayoutShell from '@/components/layout-shell'
import PageviewTracker from '@/components/analytics/pageview-tracker'

const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Solea Socials | Agence de Communication Digitale en Suisse Romande',
  description: 'Solea Socials accompagne artisans et petites entreprises de Suisse romande (Yverdon, Neuchâtel, Lausanne) pour développer leur présence digitale et valoriser leur savoir-faire.',
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon-light-32x32.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            --font-sans: ${spaceGrotesk.style.fontFamily};
            --font-body: ${inter.style.fontFamily};
            --font-serif: ${playfairDisplay.style.fontFamily};
          }
        `}</style>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${playfairDisplay.variable} antialiased`}
        suppressHydrationWarning
      >
        <Suspense fallback={null}>
          <PageviewTracker />
        </Suspense>
        <MotionConfig reducedMotion="user">
          <AnimatePresence mode="wait">
            <Preloader />
          </AnimatePresence>
          <LayoutShell>{children}</LayoutShell>
        </MotionConfig>
        <Analytics />
      </body>
    </html>
  )
}
