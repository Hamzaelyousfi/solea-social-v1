
import { Space_Grotesk as SpaceGrotesk, Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { MotionConfig } from 'framer-motion'
import { Suspense } from 'react'
import './globals.css'
import LayoutShell from '@/components/layout-shell'
import PageviewTracker from '@/components/analytics/pageview-tracker'
import JsonLd from '@/components/seo/json-ld'

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
  description: 'Solea Socials accompagne artisans et entreprises locales de Suisse romande (Yverdon, Neuchâtel, Lausanne) pour développer leur présence digitale et valoriser leur savoir-faire.',
  generator: 'Next.js',
  metadataBase: new URL('https://soleasocials.ch'),
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
  openGraph: {
    title: 'Solea Socials | Agence de Communication Digitale en Suisse Romande',
    description:
      'Solea Socials accompagne artisans et entreprises locales de Suisse romande pour developper leur presence digitale.',
    url: 'https://soleasocials.ch',
    siteName: 'Solea Socials',
    locale: 'fr_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solea Socials | Agence de Communication Digitale en Suisse Romande',
    description:
      'Solea Socials accompagne artisans et entreprises locales de Suisse romande pour developper leur presence digitale.',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Solea Socials',
  url: 'https://soleasocials.ch',
  email: 'info@soleasocials.ch',
  telephone: '+41244462001',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rue des Champs-Lovats 13',
    addressLocality: 'Yverdon-les-Bains',
    postalCode: '1400',
    addressCountry: 'CH',
  },
  areaServed: 'Suisse romande',
  sameAs: ['https://www.instagram.com/soleasocials/'],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Solea Socials',
  url: 'https://soleasocials.ch',
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
        <JsonLd data={organizationJsonLd} id="organization-jsonld" />
        <JsonLd data={websiteJsonLd} id="website-jsonld" />
        <Suspense fallback={null}>
          <PageviewTracker />
        </Suspense>
        <MotionConfig reducedMotion="user">
          <LayoutShell>{children}</LayoutShell>
        </MotionConfig>
        <Analytics />
      </body>
    </html>
  )
}
