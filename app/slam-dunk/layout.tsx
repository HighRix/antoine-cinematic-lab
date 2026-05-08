import type { Metadata } from 'next';
import { Anton, Inter } from 'next/font/google';
import './slam-dunk.css';

const anton = Anton({
  variable: '--font-anton',
  weight: '400',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter-slam',
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Slam Dunk Store — Premium Basketball',
  description:
    'A cinematic, high-end e-commerce hero section for a premium basketball, featuring a photorealistic 3D model and immersive UI.',
};

export default function SlamDunkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${anton.variable} ${inter.variable} slam-dunk-scope`}>
      {children}
    </div>
  );
}
