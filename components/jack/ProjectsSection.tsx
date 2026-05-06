'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';

type Project = {
  n: string;
  category: string;
  name: string;
  col1Top: string;
  col1Bottom: string;
  col2: string;
};

const PROJECTS: Project[] = [
  {
    n: '01',
    category: 'Client',
    name: 'Nextlevel Studio',
    col1Top:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Bottom:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    n: '02',
    category: 'Personal',
    name: 'Aura Brand Identity',
    col1Top:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Bottom:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    n: '03',
    category: 'Client',
    name: 'Solaris Digital',
    col1Top:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Bottom:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={ref}
      className="h-[85vh] sticky"
      style={{ top: `calc(6rem + ${index * 28}px)` }}
    >
      <motion.div
        style={{ scale, background: '#0C0C0C', borderColor: '#D7E2EA' }}
        className="border-2 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 h-full flex flex-col overflow-hidden"
      >
        {/* Top row */}
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6 md:mb-8">
          <div className="flex items-center gap-4 md:gap-8 flex-wrap">
            <span
              className="font-black"
              style={{ color: '#D7E2EA', fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}
            >
              {project.n}
            </span>
            <div className="flex flex-col gap-1">
              <span
                className="uppercase tracking-widest font-light"
                style={{ color: '#D7E2EA', opacity: 0.6, fontSize: 'clamp(0.7rem, 1vw, 0.9rem)' }}
              >
                {project.category}
              </span>
              <span
                className="font-medium uppercase"
                style={{ color: '#D7E2EA', fontSize: 'clamp(1rem, 2.2vw, 2rem)', lineHeight: 1.1 }}
              >
                {project.name}
              </span>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        {/* Image grid */}
        <div className="flex-1 flex gap-3 sm:gap-4 md:gap-5 min-h-0">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 min-h-0" style={{ flex: '0 0 40%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col1Top}
              alt=""
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] min-h-0"
              style={{ flex: '2 1 0', height: 0 }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col1Bottom}
              alt=""
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] min-h-0"
              style={{ flex: '3 1 0', height: 0 }}
            />
          </div>
          <div className="flex-1 min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col2}
              alt=""
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="max-w-7xl mx-auto">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.n} project={p} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
}
