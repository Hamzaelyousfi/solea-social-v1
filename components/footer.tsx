'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">Solea Socials</h3>
            <p className="text-sm text-background/80 leading-relaxed">
              Agence de communication digitale spécialisée dans l'accompagnement des artisans et entreprises locales de Suisse romande.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: 'Services', href: '/services' },
                { label: 'Notre Approche', href: '/work' },
                { label: 'A propos', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/80 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@soleasocials.ch" className="text-sm text-background/80 hover:text-background transition-colors flex items-center gap-2">
                  <Mail size={16} />
                  info@soleasocials.ch
                </a>
              </li>
              <li>
                <a href="tel:+41244462001" className="text-sm text-background/80 hover:text-background transition-colors flex items-center gap-2">
                  <Phone size={16} />
                  +41 24 446 20 01
                </a>
              </li>
              <li className="text-sm text-background/80 flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Yverdon-les-Bains, Suisse</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Suivez-nous</h4>
            <ul className="space-y-2">
              {['Instagram', 'LinkedIn'].map((social) => (
                <li key={social}>
                  <a href={social === 'Instagram' ? 'https://www.instagram.com/soleasocials/' : 'https://www.linkedin.com/in/amandine-veillard-26989518a'} className="text-sm text-background/80 hover:text-background transition-colors">
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-background/60">
            <p>&copy; {currentYear} Solea Socials. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
