import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '../container'
import Section from '../section'

const clients = [
  {
    name: 'Makemebeautiful',
    logoSrc: '/projects/logos/makemebeautifaul-logo.jpg',
    sector: 'Beauté & Esthétique',
  },
  {
    name: 'Ide Sport',
    logoSrc: '/projects/logos/175998262_934152537396667_569180.jpg',
    sector: 'Sport & Bien-être',
  },
  {
    name: 'Visitaly',
    logoSrc: '/projects/logos/visitaly-logo.svg',
    sector: 'Tourisme & Voyage',
  },
]

export default function ClientShowcase() {
  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="mb-12 md:mb-16">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Nos Clients
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl">
            Des entreprises locales de Suisse romande qui ont choisi de valoriser
            leur savoir-faire sur le digital.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex flex-col items-center gap-5 rounded-2xl border border-border/50 bg-background px-8 py-10 shadow-sm hover:border-accent/30 hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-14 w-full">
                <Image
                  src={client.logoSrc}
                  alt={`${client.name} logo`}
                  fill
                  sizes="240px"
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-px bg-border" />
              <div className="text-center">
                <p className="font-semibold text-foreground">{client.name}</p>
                <p className="text-sm text-accent font-medium mt-1">{client.sector}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 pt-10 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-base max-w-md">
            Votre secteur n'apparaît pas encore ? Voyons comment adapter
            notre approche à votre activité.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-background transition-all duration-300 uppercase text-sm tracking-wider group flex-shrink-0"
          >
            Discuter de votre projet
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </Section>
  )
}
