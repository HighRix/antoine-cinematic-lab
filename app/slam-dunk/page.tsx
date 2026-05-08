'use client';

import dynamic from 'next/dynamic';

// Disable SSR — the app uses Three.js, AudioContext, and pointer events
// that only exist in the browser. Pure client-side render.
const SlamDunkApp = dynamic(
  () => import('@/components/slam-dunk/SlamDunkApp'),
  { ssr: false, loading: () => <div style={{ width: '100vw', height: '100vh', backgroundColor: '#FF5500' }} /> }
);

export default function SlamDunkPage() {
  return <SlamDunkApp />;
}
