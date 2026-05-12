'use client';

const ABOUT_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260322_011532_86f9b93a-2ffc-42fd-8735-12a4c55ab536.mp4';

export function AboutSection() {
  return (
    <section
      id="about"
      className="px-6 sm:px-8 lg:px-16 pt-12 lg:pt-16 pb-24 lg:pb-32"
      style={{ background: '#000000' }}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
        {/* Left : video — no rounded edges so the video blends with the pure-black bg */}
        <div className="lg:w-[45%]" style={{ background: '#000000' }}>
          <video
            src={ABOUT_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto block"
          />
        </div>

        {/* Right : copy + CTA */}
        <div className="flex-1 flex flex-col justify-between min-h-[500px] lg:min-h-[600px]">
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight font-normal"
            style={{ color: '#F5F5F5' }}
          >
            Électricité résidentielle haut de gamme, pensée comme une œuvre du quotidien.
          </h2>

          <div className="mt-12 lg:mt-auto flex flex-col gap-8 max-w-2xl">
            <p className="text-base lg:text-lg leading-[1.6]" style={{ color: '#BBBBBB' }}>
              Tanli Elec accompagne particuliers et professionnels du Haut-Faucigny dans leurs projets électriques. De la rénovation de chalet à la villa neuve, chaque chantier est traité avec la précision et l&apos;exigence d&apos;une signature horlogère.
            </p>
            <p className="text-sm leading-[1.6]" style={{ color: '#999999' }}>
              Basés à Marignier, nous intervenons sur tout le bassin Cluses · Bonneville · Sallanches · Genève frontière, avec une astreinte 7j/7 pour nos clients sous contrat.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg font-semibold uppercase text-[11px] tracking-[0.18em] px-10 h-11 self-start transition-all active:scale-[0.97]"
              style={{ background: '#03E840', color: '#0A0A0A' }}
            >
              Devis gratuit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
