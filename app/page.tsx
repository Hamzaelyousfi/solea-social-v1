'use client'

import Hero from '@/components/sections/hero'
import ClientShowcase from '@/components/sections/client-showcase'
import ServicesSection from '@/components/sections/services-section'
import ProjectsSection from '@/components/sections/projects-section'
import TeamPreview from '@/components/sections/team-preview'
import StatsSection from '@/components/sections/stats-section'
import ClosingCTA from '@/components/sections/closing-cta'

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <TeamPreview />
      <StatsSection />
      <ClientShowcase />
      <ClosingCTA />
    </main>
  )
}
