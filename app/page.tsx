'use client'

import Hero from '@/components/sections/hero'
import HowItWorksSection from '@/components/sections/how-it-works-section'
import ClientShowcase from '@/components/sections/client-showcase'
import ServicesSection from '@/components/sections/services-section'
import ProjectsSection from '@/components/sections/projects-section'
import AboutFounderSection from '@/components/sections/about-founder-section'
import StatsSection from '@/components/sections/stats-section'
import ClosingCTA from '@/components/sections/closing-cta'

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorksSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutFounderSection />
      <ClientShowcase />
      <ClosingCTA />
    </main>
  )
}
