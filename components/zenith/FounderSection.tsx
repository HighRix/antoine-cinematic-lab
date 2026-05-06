'use client';
import { motion } from 'framer-motion';

export function FounderSection() {
  return (
    <section
      id="cabinet"
      className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24"
      style={{ background: '#0A0A0A' }}
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 relative">
        {/* Eyebrow row */}
        <div className="flex items-center gap-3 mb-8 md:mb-10">
          <span className="block h-px w-10 bg-white/30" />
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/60">
            Le fondateur
          </span>
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/30 ml-auto hidden md:block">
            04 / 04
          </span>
        </div>

        {/* Editorial layout — split: left = numero + name + bio, right = portrait */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start relative">
          {/* LEFT — copy block */}
          <div className="md:col-span-6 lg:col-span-7 relative">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="block text-[12px] font-medium tracking-[0.2em] uppercase text-white/40 mb-4"
            >
              01
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-medium text-white leading-[0.95] tracking-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(3rem, 8vw, 7rem)',
              }}
            >
              Ferhat
              <br />
              Tanli
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/55 text-[15px] md:text-[17px] leading-[1.5] mt-6 max-w-[520px] italic"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Designer & maître d&apos;œuvre.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-12 max-w-[520px] flex flex-col gap-5"
            >
              <p className="text-white/85 text-[15px] md:text-[16px] leading-[1.65]">
                Vingt années à imaginer, dessiner et bâtir des espaces de vie en Haute-Savoie. Chaque projet est l&apos;occasion d&apos;un dialogue patient entre un terrain, une famille et une intention architecturale.
              </p>
              <p className="text-white/55 text-[14px] md:text-[15px] leading-[1.65]">
                Je conduis vos projets de la première esquisse à la remise des clés, sans jamais déléguer la conception ni le suivi de chantier.
              </p>
            </motion.div>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center gap-6 md:gap-10"
            >
              <div className="flex items-center gap-3">
                <span className="block h-px w-6 bg-white" />
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/65">
                  Cluses, Haute-Savoie
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="block h-px w-6 bg-white/40" />
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/65">
                  20 ans d&apos;expérience
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — portrait, blend into the dark section background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:col-span-6 lg:col-span-5 relative aspect-[3/4]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ft/founder.jpg"
              alt="Ferhat Tanli, designer et maître d'œuvre"
              className="w-full h-full object-cover"
              draggable={false}
              style={{
                // Subtle multiply-style blend so the portrait's blacks merge into the section bg
                mixBlendMode: 'lighten',
              }}
            />

            {/* Soft edge vignette : feathered fade on every side so the portrait dissolves into the section background */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 80% 90% at 50% 45%, transparent 50%, rgba(10,10,10,0.4) 75%, rgba(10,10,10,1) 100%)',
              }}
            />

            {/* Caption strip — minimal, sits over the bottom of the portrait */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
              <div className="flex items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-white/50 text-[10px] font-medium tracking-[0.22em] uppercase">
                    Portrait
                  </span>
                  <span className="text-white text-[14px] font-medium">
                    Ferhat Tanli
                  </span>
                </div>
                <span className="text-white/40 text-[10px] font-medium tracking-[0.18em] uppercase">
                  Cluses · 2026
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Watermark — giant first name behind, very faded, light on dark */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none flex items-center justify-center overflow-hidden"
        >
          <span
            className="italic leading-none whitespace-nowrap"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(10rem, 28vw, 32rem)',
              letterSpacing: '-0.04em',
              color: 'rgba(255, 255, 255, 0.04)',
            }}
          >
            Ferhat
          </span>
        </div>
      </div>
    </section>
  );
}
