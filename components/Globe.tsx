'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Station } from '@/lib/stations';

// Dynamically import GlobeInner to disable SSR while keeping direct ref binding to react-globe.gl
const GlobeInner = dynamic(() => import('@/components/GlobeInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[640px] flex flex-col items-center justify-center bg-navy-950 text-polar-300 rounded-3xl border border-stroke">
      <div className="w-16 h-16 border-4 border-polar-500/30 border-t-aurora-cyan rounded-full animate-spin mb-4"></div>
      <p className="text-sm font-mono text-aurora-cyan animate-pulse">Initializing 3D Polar Earth Engine...</p>
    </div>
  ),
});

interface GlobeProps {
  onSelectStation: (station: Station | null) => void;
  selectedStation: Station | null;
}

export default function GlobeComponent({ onSelectStation, selectedStation }: GlobeProps) {
  return (
    <GlobeInner
      onSelectStation={onSelectStation}
      selectedStation={selectedStation}
    />
  );
}
