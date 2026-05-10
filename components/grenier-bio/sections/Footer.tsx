import { Logo } from '@/components/grenier-bio/Logo';
import { Mail, Phone, MapPin } from 'lucide-react';

// Inline SVG socials
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function Footer() {
  return (
    <footer className="relative bg-[#2D2D2F] text-[#FAF7F0]">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24">
        {/* Top — big claim */}
        <div className="border-b border-white/10 pb-12 sm:pb-16 mb-12 sm:mb-16">
          <p className="font-recoleta text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] max-w-3xl italic">
            «&nbsp;Bio et local, c&rsquo;est idéal.&nbsp;»
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm tracking-[0.22em] uppercase opacity-50 mt-5 sm:mt-6">
            Nicole &amp; Philippe SCIÉ · Nailloux (31)
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Logo block */}
          <div className="sm:col-span-2 md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <Logo className="w-12 h-12" onDark />
              <div className="flex flex-col leading-none">
                <span className="font-recoleta text-lg">Le Grenier Bio</span>
                <span className="text-[11px] tracking-[0.18em] uppercase opacity-60">
                  d'Emberbail
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-70 max-w-sm">
              Exploitation bio française. Céréales, huiles, farines et œufs cultivés et transformés
              sur place, dans le respect du vivant.
            </p>
          </div>

          {/* Plan */}
          <div className="md:col-span-3">
            <h4 className="text-xs tracking-[0.22em] uppercase opacity-50 mb-5">Plan du site</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '#histoire', label: 'Notre histoire' },
                { href: '#ferme', label: 'La ferme' },
                { href: '#produits', label: 'Nos produits' },
                { href: '#processus', label: 'Le processus' },
                { href: '#ou-trouver', label: 'Où nous trouver' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="opacity-80 hover:opacity-100 hover:text-[#D4A574] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-xs tracking-[0.22em] uppercase opacity-50 mb-5">Nous joindre</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 opacity-60" strokeWidth={1.5} />
                <span className="opacity-80 leading-relaxed">
                  Chemin de Douyssat
                  <br />
                  Emberbail du bois
                  <br />
                  31560 Nailloux
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 opacity-60" strokeWidth={1.5} />
                <a
                  href="tel:+33610346373"
                  className="opacity-80 hover:opacity-100 hover:text-[#D4A574] transition-colors"
                >
                  06 10 34 63 73
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 opacity-60" strokeWidth={1.5} />
                <a
                  href="mailto:legrenierbio31@gmail.com"
                  className="opacity-80 hover:opacity-100 hover:text-[#D4A574] transition-colors"
                >
                  legrenierbio31@gmail.com
                </a>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex gap-5 mt-8">
              <a
                href="https://www.facebook.com/share/14fqcjg3KQC/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#0E7824] hover:border-[#0E7824] transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/legrenierbio?igsh=dnhmbDVieG02MDkz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#0E7824] hover:border-[#0E7824] transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <p className="text-[10px] sm:text-xs tracking-[0.18em] uppercase opacity-40">
            © 2026 Le Grenier Bio d&rsquo;Emberbail · Tous droits réservés
          </p>
          <div className="flex gap-5 sm:gap-6 text-[10px] sm:text-xs opacity-50">
            <a href="#" className="hover:opacity-100 transition-opacity">
              Mentions légales
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
