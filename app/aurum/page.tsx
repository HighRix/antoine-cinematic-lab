import { AnimatedHeading } from '@/components/aurum/AnimatedHeading';
import { FadeIn } from '@/components/aurum/FadeIn';
import { DarkGlass } from '@/components/aurum/DarkGlass';

const NAV_LINKS = ['Thesis', 'Portfolio', 'Build', 'Contact'];

export default function AurumPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        .aurum-page {
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>

      <main className="aurum-page relative h-screen w-screen overflow-hidden bg-black text-white">
        {/* Background video — raw, no overlay */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/aurum-poster.jpg"
        >
          {/* Antoine: replace with your own Higgsfield-generated video. Place at /public/videos/hero-aurum.mp4 */}
          <source src="/videos/hero-aurum.mp4" type="video/mp4" />
          {/* Fallback for missing video */}
        </video>

        {/* Fallback gradient if video missing — sits behind <video>, only visible if video fails */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at top, #1a1a1a 0%, #000 70%)',
          }}
          aria-hidden
        />

        {/* Content layer */}
        <div className="relative z-10 h-full w-full flex flex-col px-6 md:px-12 lg:px-16">
          {/* Navbar */}
          <div className="pt-6">
            <DarkGlass
              as="nav"
              className="rounded-xl px-4 py-2 flex items-center justify-between"
            >
              <span className="text-2xl font-semibold tracking-tight">
                AURUM
              </span>

              <div className="hidden md:flex gap-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm text-white hover:text-gray-300 transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>

              <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                Talk to us
              </button>
            </DarkGlass>
          </div>

          {/* Hero content — pushed to bottom */}
          <div className="flex-1 flex flex-col justify-end pb-12 lg:pb-16">
            <div className="lg:grid lg:grid-cols-2 lg:items-end gap-8">
              {/* Left column */}
              <div>
                <AnimatedHeading
                  text={'Tomorrow is built\none decision at a time.'}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4"
                  initialDelay={200}
                  charDelay={30}
                  charDuration={500}
                />

                <FadeIn delay={800} duration={1000}>
                  <p className="text-base md:text-lg text-gray-300 mb-5 max-w-xl">
                    We back the founders nobody else sees yet — and stay long
                    enough to matter.
                  </p>
                </FadeIn>

                <FadeIn delay={1200} duration={1000}>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                      Talk to us
                    </button>
                    <button
                      className="px-8 py-3 rounded-lg font-medium relative cursor-pointer text-white border border-white/20 hover:bg-white hover:text-black transition-colors"
                      style={{
                        background: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                      }}
                    >
                      View Portfolio
                    </button>
                  </div>
                </FadeIn>
              </div>

              {/* Right column — tag */}
              <div className="flex items-end justify-start lg:justify-end mt-10 lg:mt-0">
                <FadeIn delay={1400} duration={1000}>
                  <DarkGlass className="px-6 py-3 rounded-xl border border-white/20 inline-block">
                    <span className="text-lg md:text-xl lg:text-2xl font-light">
                      Capital. Conviction. Compounding.
                    </span>
                  </DarkGlass>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
