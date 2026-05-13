import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LabHeader, LabFooter } from '@/components/lab/LabChrome';
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
    title: `${prompt.name} · cinematic.lab`,
    description: prompt.tagline,
  };
}

export default async function LabPromptPage({ params }: Props) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) notFound();

  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#F5F5F5] antialiased">
      <LabHeader />

      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-10 md:pt-14">
        <a
          href="/lab"
          className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/55 hover:text-white transition-colors"
        >
          ← Bibliothèque
        </a>
        <div className="mt-6">
          <PromptDetail prompt={prompt} lifetime={TIERS.lifetime} />
        </div>
      </div>

      <LabFooter />
    </main>
  );
}
