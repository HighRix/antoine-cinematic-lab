'use client';

import { useEffect, useRef } from 'react';

const STATS = [
  { value: '120', unit: 'ha', label: 'de terres cultivées' },
  { value: '6', unit: '', label: 'productions en rotation' },
  { value: '900', unit: '', label: 'poules pondeuses bio en plein air' },
  { value: '0', unit: '', label: 'pesticide ni intrant chimique' },
];

const CERTS = [
  { name: 'Agriculture Biologique', image: '/grenier-bio/cert-ab.jpg' },
  { name: 'Eurofeuille UE', image: '/grenier-bio/cert-eu.jpg' },
];

export function Ferme() {
  const sectionRef = useRef<HTMLElement>(null);

  // Counters via IntersectionObserver — reliable with Lenis smooth scroll
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const counters = root.querySelectorAll<HTMLElement>('.counter');
    if (!counters.length) return;

    // Reduced motion : show final values immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      counters.forEach((el) => {
        el.textContent = el.dataset.target || '0';
      });
      return;
    }

    const animateCounter = (el: HTMLElement) => {
      const target = parseInt(el.dataset.target || '0', 10);
      if (target === 0) {
        el.textContent = '0';
        return;
      }
      const duration = 2000;
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = value.toString();
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' }
    );

    counters.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="ferme" className="relative py-20 sm:py-24 md:py-32 lg:py-40 bg-[#2D2D2F] text-[#FAF7F0] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2400&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(45,45,47,0.85) 0%, rgba(45,45,47,0.7) 50%, rgba(45,45,47,0.95) 100%)',
          }}
        />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-14 md:mb-20 lg:mb-28">
          <div className="md:col-span-2 flex md:flex-col items-start gap-3">
            <span className="w-8 h-px bg-[#D4A574] mt-3" />
            <span className="text-xs tracking-[0.22em] uppercase text-[#D4A574] font-medium">
              La ferme
            </span>
          </div>
          <div className="md:col-span-10">
            <h2 className="font-recoleta text-[34px] sm:text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl">
              Une exploitation
              <br />
              <span className="italic text-[#D4A574]">pensée pour le vivant.</span>
            </h2>
            <p className="mt-5 sm:mt-6 text-sm md:text-base opacity-70 max-w-xl leading-relaxed">
              Au lieu-dit Emberbail du bois, à Nailloux. 120 hectares en agriculture biologique
              certifiée, six cultures en rotation, un atelier de transformation sur place.
            </p>
          </div>
        </div>

        {/* Stats grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 border-y border-white/8 mb-16 md:mb-24">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#2D2D2F] p-5 sm:p-6 md:p-10 lg:p-12 flex flex-col justify-between min-h-[150px] sm:min-h-[180px] md:min-h-[200px]"
            >
              <div className="flex items-baseline gap-1">
                <span
                  className="counter font-recoleta text-4xl sm:text-5xl md:text-7xl text-[#FAF7F0] leading-none"
                  data-target={stat.value}
                >
                  0
                </span>
                {stat.unit && (
                  <span className="font-recoleta text-xl sm:text-2xl md:text-3xl text-[#D4A574]">
                    {stat.unit}
                  </span>
                )}
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.16em] sm:tracking-[0.18em] uppercase opacity-70 mt-3 sm:mt-4 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications + claim */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="font-recoleta text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.3] tracking-tight max-w-2xl">
              Six cultures qui s’épaulent. 900 poules pondeuses qui les valorisent.{' '}
              <span className="italic text-[#D4A574]">
                Un cycle complet, sans intrant import, sans intermédiaire.
              </span>
            </p>
          </div>

          <div className="lg:col-span-5">
            <p className="text-xs tracking-[0.22em] uppercase opacity-50 mb-5 sm:mb-6">Certifications</p>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              {CERTS.map((cert) => (
                <div
                  key={cert.name}
                  className="aspect-square bg-white border border-white/15 rounded-sm p-4 sm:p-5 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center hover:bg-white/95 transition-colors group"
                  title={cert.name}
                >
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-14 h-14 sm:w-20 sm:h-20 object-contain transition-transform group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="text-[9px] sm:text-[10px] tracking-[0.1em] uppercase text-[#2D2D2F]/70 leading-tight font-medium">
                    {cert.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
