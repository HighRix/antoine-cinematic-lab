'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // À brancher à un endpoint réel quand disponible
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 md:py-32 lg:py-40 bg-[#FAF7F0]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 md:gap-16">
          {/* Left — claim */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="w-8 h-px bg-[#0E7824]" />
              <span className="text-xs tracking-[0.22em] uppercase text-[#0E7824] font-medium">
                Nous écrire
              </span>
            </div>
            <h2 className="font-recoleta text-[#2D2D2F] text-[34px] sm:text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 sm:mb-8">
              Une question ?
              <br />
              <span className="italic text-[#0E7824]">Un grand merci.</span>
            </h2>
            <p className="text-[#2D2D2F]/75 text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
              Que vous soyez un particulier, un restaurateur, une AMAP ou un magasin partenaire,
              écrivez-nous. On répond à tout le monde.
            </p>

            {/* Contact direct */}
            <div className="mt-10 space-y-3">
              <a
                href="tel:+33610346373"
                className="flex items-center gap-3 text-sm font-medium text-[#2D2D2F] hover:text-[#0E7824] transition-colors group"
              >
                <span className="w-9 h-9 rounded-full border border-[#2D2D2F]/15 flex items-center justify-center group-hover:border-[#0E7824] transition-colors">
                  <span className="text-xs">☎</span>
                </span>
                <span className="border-b border-transparent group-hover:border-[#0E7824] transition-colors">
                  06 10 34 63 73
                </span>
              </a>
              <a
                href="mailto:legrenierbio31@gmail.com"
                className="flex items-center gap-3 text-sm font-medium text-[#2D2D2F] hover:text-[#0E7824] transition-colors group"
              >
                <span className="w-9 h-9 rounded-full border border-[#2D2D2F]/15 flex items-center justify-center group-hover:border-[#0E7824] transition-colors">
                  <span className="text-xs">✉</span>
                </span>
                <span className="border-b border-transparent group-hover:border-[#0E7824] transition-colors">
                  legrenierbio31@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="md:col-span-6 lg:col-span-5">
            {submitted ? (
              <div className="border-warm bg-white rounded-sm p-8 sm:p-10 md:p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-[#0E7824] mx-auto mb-5 flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-recoleta text-2xl text-[#2D2D2F] mb-2">Message envoyé</h3>
                <p className="text-[#2D2D2F]/70 text-sm">
                  Merci. Nous reviendrons vers vous d&rsquo;ici 48h.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border-warm bg-white rounded-sm p-6 sm:p-8 md:p-10 space-y-4 sm:space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs tracking-[0.18em] uppercase text-[#2D2D2F]/60 font-medium block mb-2"
                  >
                    Votre nom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-[#2D2D2F]/15 py-3 text-[#2D2D2F] focus:border-[#0E7824] focus:outline-none transition-colors"
                    placeholder="Marie Dupont"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs tracking-[0.18em] uppercase text-[#2D2D2F]/60 font-medium block mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full bg-transparent border-b border-[#2D2D2F]/15 py-3 text-[#2D2D2F] focus:border-[#0E7824] focus:outline-none transition-colors"
                    placeholder="vous@email.fr"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-xs tracking-[0.18em] uppercase text-[#2D2D2F]/60 font-medium block mb-2"
                  >
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-[#2D2D2F]/15 py-3 text-[#2D2D2F] focus:border-[#0E7824] focus:outline-none transition-colors resize-none"
                    placeholder="Votre besoin, votre question..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 rounded-full bg-[#0E7824] text-white text-sm font-medium px-7 py-3.5 hover:bg-[#0a5a1c] transition-colors"
                >
                  Envoyer le message
                  <Send className="w-4 h-4" strokeWidth={1.8} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
