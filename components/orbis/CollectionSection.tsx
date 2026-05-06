'use client';

function ChevronRight({ size = 22, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

const NFTS = [
  {
    score: '8.7/10',
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4',
  },
  {
    score: '9/10',
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4',
  },
  {
    score: '8.2/10',
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4',
  },
];

export function CollectionSection() {
  return (
    <section
      className="relative w-full"
      style={{ background: '#010828' }}
    >
      <div className="max-w-[1831px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20 md:py-24 lg:py-32">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-12 md:mb-16">
          <h2 className="font-grotesk uppercase text-[#EFF4FF] text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] leading-[1.05]">
            Collection of
            <br />
            <span className="ml-12 md:ml-24 lg:ml-32 inline-block">
              <span
                className="font-condiment normal-case text-[#6FFF00]"
                style={{ mixBlendMode: 'exclusion' }}
              >
                Space
              </span>{' '}
              <span className="font-grotesk">objects</span>
            </span>
          </h2>

          {/* See all creators */}
          <div className="flex flex-col items-end">
            <div className="flex items-end gap-3">
              <span className="font-grotesk uppercase text-[#EFF4FF] text-[32px] sm:text-[44px] md:text-[52px] lg:text-[60px] leading-none">
                SEE
              </span>
              <div className="flex flex-col leading-none gap-1">
                <span className="font-grotesk uppercase text-[#EFF4FF] text-[20px] sm:text-[26px] md:text-[30px] lg:text-[36px]">
                  ALL
                </span>
                <span className="font-grotesk uppercase text-[#EFF4FF] text-[20px] sm:text-[26px] md:text-[30px] lg:text-[36px]">
                  CREATORS
                </span>
              </div>
            </div>
            <div
              className="w-full mt-3 h-[6px] sm:h-[8px] md:h-[10px]"
              style={{ background: '#6FFF00' }}
            />
          </div>
        </div>

        {/* NFT grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NFTS.map((nft, i) => (
            <article
              key={i}
              className="orbis-glass rounded-[32px] p-[18px] hover:bg-white/10 transition-colors"
            >
              {/* Square video */}
              <div className="relative w-full pb-[100%] rounded-[24px] overflow-hidden">
                <video
                  src={nft.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Score bar */}
              <div className="mt-[18px]">
                <div className="orbis-glass rounded-[20px] px-5 py-4 flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono uppercase text-[11px] text-[#EFF4FF]/70 tracking-wider">
                      Rarity Score:
                    </span>
                    <span className="font-grotesk uppercase text-[#EFF4FF] text-[16px]">
                      {nft.score}
                    </span>
                  </div>
                  <button
                    aria-label="View NFT"
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform flex items-center justify-center text-white"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
