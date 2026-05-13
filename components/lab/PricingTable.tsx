import { TIERS } from '@/data/prompts';

const ORDER = ['starter', 'lab', 'agency', 'drop'] as const;

export function PricingTable() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 border border-white/8 rounded-[20px] overflow-hidden">
      {ORDER.map((key) => {
        const tier = TIERS[key];
        const isFeatured = key === 'lab';

        return (
          <div
            key={key}
            className={`relative bg-[#0C0C0C] p-7 md:p-8 flex flex-col gap-6 ${
              isFeatured ? 'ring-1 ring-[#F27D26]/50 ring-inset' : ''
            }`}
          >
            {'badge' in tier && tier.badge && (
              <span className="absolute -top-3 left-7 inline-flex items-center text-[10px] tracking-[0.22em] uppercase font-mono bg-[#F27D26] text-black px-3 py-1.5 rounded-full">
                {tier.badge}
              </span>
            )}

            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/45">
                {tier.name}
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                {'anchorPrice' in tier && tier.anchorPrice && (
                  <span className="text-white/30 text-lg line-through font-serif italic">
                    €{tier.anchorPrice}
                  </span>
                )}
                <span className="font-serif italic text-4xl md:text-[44px] text-white tracking-[-0.02em]">
                  €{tier.price}
                </span>
                {'priceSuffix' in tier && tier.priceSuffix && (
                  <span className="text-white/55 text-sm">{tier.priceSuffix}</span>
                )}
              </div>
              <p className="mt-3 text-white/65 text-[13px] leading-relaxed">
                {tier.description}
              </p>
            </div>

            <ul className="flex flex-col gap-3 flex-1">
              {tier.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-[13px] text-white/75 leading-relaxed"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[#F27D26] shrink-0"
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={'stanUrl' in tier ? tier.stanUrl : tier.stripeUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium transition-all hover:scale-[1.02] ${
                isFeatured
                  ? 'bg-[#F27D26] hover:bg-[#FF8A2E] text-black shadow-[0_8px_24px_rgba(242,125,38,0.35)]'
                  : 'bg-white/8 hover:bg-white/15 text-white border border-white/15'
              }`}
            >
              <span>{tier.cta}</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        );
      })}
    </div>
  );
}
