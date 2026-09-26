'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Station, POLAR_STATIONS } from '@/lib/stations';

// Dynamically import Globe to avoid SSR window/document execution issues
const GlobeGl = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-navy-950 text-polar-300">
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
  const globeRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Configure smooth damping & camera controls on load
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.rotateSpeed = 0.7;
        controls.zoomSpeed = 1.2;
      }
    }
  }, [mounted]);

  // Smooth camera zoom transition when station selected
  useEffect(() => {
    if (globeRef.current) {
      if (selectedStation) {
        // Pause auto rotate when focusing a station
        if (globeRef.current.controls()) {
          globeRef.current.controls().autoRotate = false;
        }
        globeRef.current.pointOfView(
          {
            lat: selectedStation.latitude,
            lng: selectedStation.longitude,
            altitude: 1.05, // Dramatic close-up zoom into target station
          },
          2000 // 2 second smooth transition
        );
      } else {
        // Resume auto rotate in global view
        if (globeRef.current.controls()) {
          globeRef.current.controls().autoRotate = true;
          globeRef.current.controls().autoRotateSpeed = 0.6;
        }
        globeRef.current.pointOfView({ lat: 15, lng: 50, altitude: 2.2 }, 1800);
      }
    }
  }, [selectedStation, mounted]);

  if (!mounted) return null;

  // Connection Arcs between New Delhi (MoES HQ) and Stations
  const DELHI = { lat: 28.6139, lng: 77.2090 };
  const arcsData = POLAR_STATIONS.map((st) => ({
    startLat: DELHI.lat,
    startLng: DELHI.lng,
    endLat: st.latitude,
    endLng: st.longitude,
    color: st.region === 'Antarctica' ? ['#00f2fe', '#0ea5e9'] : st.region === 'Arctic' ? ['#00ffb3', '#7dd3fc'] : ['#a855f7', '#38bdf8'],
    name: `MoES HQ -> ${st.name}`
  }));

  // Points / Pins Data for Stations
  const pointsData = POLAR_STATIONS.map((st) => ({
    ...st,
    size: selectedStation?.id === st.id ? 0.7 : 0.4,
    color: selectedStation?.id === st.id ? '#00f2fe' : st.region === 'Antarctica' ? '#38bdf8' : st.region === 'Arctic' ? '#00ffb3' : '#a855f7',
  }));

  return (
    <div className="relative w-full h-[650px] lg:h-[750px] bg-navy-950 overflow-hidden flex items-center justify-center">
      {/* Ambient Aurora Glow Backdrop */}
      <div className="absolute inset-0 bg-aurora-glow pointer-events-none z-10"></div>
      
      <GlobeGl
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Atmosphere styling
        atmosphereColor="#00f2fe"
        atmosphereAltitude={0.25}
        
        // Click on empty space / ocean on Earth dismisses station selection
        onGlobeClick={() => onSelectStation(null)}

        // Points / Markers
        pointsData={pointsData}
        pointLat="latitude"
        pointLng="longitude"
        pointColor="color"
        pointRadius="size"
        pointAltitude={0.06}
        pointResolution={32}
        onPointClick={(point: any) => onSelectStation(point as Station)}

        // Permanent 3D Text Labels permanently floating on Globe
        labelsData={pointsData}
        labelLat="latitude"
        labelLng="longitude"
        labelText={(d: any) => `${d.name} (${d.region})`}
        labelSize={(d: any) => selectedStation?.id === d.id ? 1.6 : 1.2}
        labelDotRadius={0.4}
        labelColor={(d: any) => selectedStation?.id === d.id ? '#00f2fe' : '#ffffff'}
        labelResolution={3}
        labelAltitude={0.08}
        onLabelClick={(label: any) => onSelectStation(label as Station)}
        
        // Permanent Custom HTML Badge Cards permanently visible above stations
        htmlElementsData={pointsData}
        htmlLat="latitude"
        htmlLng="longitude"
        htmlAltitude={0.12}
        htmlElement={(d: any) => {
          const isSelected = selectedStation?.id === d.id;
          const el = document.createElement('div');
          el.className = 'cursor-pointer group select-none pointer-events-auto';
          el.innerHTML = `
            <div className="flex flex-col items-center transition-transform hover:scale-115">
              <div className="px-3 py-1.5 rounded-xl ${
                isSelected 
                  ? 'bg-polar-900/95 border-2 border-aurora-cyan shadow-glow-cyan text-aurora-cyan scale-110' 
                  : 'bg-navy-950/90 border border-polar-400/60 text-white hover:border-aurora-cyan'
              } text-xs font-black tracking-wider backdrop-blur-md shadow-2xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-aurora-cyan animate-ping' : stColor(d.region)}"></span>
                <span className="font-extrabold uppercase">${d.name}</span>
                <span className="text-[10px] font-mono opacity-80 font-normal">(${d.region})</span>
              </div>
              <div className="w-0.5 h-5 bg-gradient-to-b ${isSelected ? 'from-aurora-cyan' : 'from-polar-400'} to-transparent"></div>
            </div>
          `;
          el.onclick = () => onSelectStation(d as Station);
          return el;
        }}
        
        // Arcs telemetry lines
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2500}
        arcStroke={1.2}
      />
    </div>
  );
}

function stColor(region: string) {
  if (region === 'Antarctica') return 'bg-sky-400';
  if (region === 'Arctic') return 'bg-emerald-400';
  return 'bg-purple-400';
}
