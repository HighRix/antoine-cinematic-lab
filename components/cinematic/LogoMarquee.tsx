export function LogoMarquee({ logos }: { logos: string[] }) {
  return (
    <div
      className="overflow-hidden py-8"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...logos, ...logos].map((src, i) => (
          <span key={i} className="text-white/60 text-2xl tracking-tight shrink-0">
            {src}
          </span>
        ))}
      </div>
    </div>
  );
}
