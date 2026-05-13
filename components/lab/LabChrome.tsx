import { Logo } from '@/components/cinematic/Logo';

export function LabHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0C0C0C]/80 border-b border-white/8">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 h-16 flex items-center justify-between gap-8">
        <a href="/lab" className="group inline-flex items-center" aria-label="cinematic.lab — Lab">
          <Logo size={28} gap={10} wordmarkClassName="text-[18px] md:text-[20px] text-white" />
        </a>

        <nav className="flex items-center gap-6 md:gap-8 text-[13px]">
          <a href="/lab/pricing" className="text-white/65 hover:text-white transition-colors">
            Pricing
          </a>
          <a href="/lab/contact" className="text-white/65 hover:text-white transition-colors">
            Contact
          </a>
          <a href="/" className="hidden sm:inline-flex text-white/65 hover:text-white transition-colors">
            Portfolio
          </a>
          <a
            href="/lab/pricing"
            className="inline-flex items-center bg-[#F27D26] hover:bg-[#FF8A2E] text-[#0C0C0C] text-[13px] font-medium px-4 py-1.5 rounded-full transition-colors"
          >
            Tout débloquer
          </a>
        </nav>
      </div>
    </header>
  );
}

export function LabFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#0a0a0a]">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <Logo size={24} gap={9} wordmarkClassName="text-[15px] text-white" />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-white/55">
          <a href="/lab/pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <a href="/lab/contact" className="hover:text-white transition-colors">
            Contact
          </a>
          <a href="/" className="hover:text-white transition-colors">
            Portfolio
          </a>
          <a
            href="https://www.linkedin.com/in/antoinescie/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
        <span className="text-[10px] tracking-[0.22em] uppercase font-mono text-white/30">
          © 2026 antoine scie
        </span>
      </div>
    </footer>
  );
}
