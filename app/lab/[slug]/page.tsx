import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Logo } from '@/components/cinematic/Logo';
import { getPromptBySlug, PROMPTS, TIERS } from '@/data/prompts';
import { PromptDetail } from '@/components/lab/PromptDetail';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PROMPTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) return { title: 'Prompt introuvable' };
  return {
    title: `${prompt.name} · cinematic.lab/lab`,
    description: prompt.tagline,
  };
}

export default async function LabPromptPage({ params }: Props) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) notFound();

  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#F5F5F5] antialiased">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Header */}
        <header className="pt-10 md:pt-14 pb-10 flex items-center justify-between gap-8">
          <a
            href="/lab"
            className="group inline-flex items-center transition-opacity hover:opacity-80"
            aria-label="Retour au Lab"
          >
            <Logo
              size={32}
              gap={11}
              wordmarkClassName="text-[20px] md:text-[22px] text-white"
            />
          </a>
          <a
            href="/lab"
            className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/55 hover:text-white transition-colors"
          >
            ← Bibliothèque
          </a>
        </header>

        <PromptDetail prompt={prompt} lab={TIERS.lab} />
      </div>

      <footer className="border-t border-white/8 bg-[#0a0a0a] mt-16 md:mt-24">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Logo size={26} gap={10} wordmarkClassName="text-[16px] text-white" />
          <span className="text-[10px] tracking-[0.22em] uppercase font-mono text-white/30">
            © 2026 antoine scie
          </span>
        </div>
      </footer>
    </main>
  );
}
