'use client';

import React, { useEffect, useRef, useState } from 'react';
import GlobeGl from 'react-globe.gl';
import { Station, POLAR_STATIONS } from '@/lib/stations';

interface GlobeInnerProps {
  onSelectStation: (station: Station | null) => void;
  selectedStation: Station | null;
}

export default function GlobeInner({ onSelectStation, selectedStation }: GlobeInnerProps) {
  const globeRef = useRef<any>(null);
  const [globeTexture, setGlobeTexture] = useState<'blue-marble' | 'night'>('blue-marble');
  const animFrameRef = useRef<number | null>(null);

  // Configure OrbitControls on initial load
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.enableZoom = true;
        controls.zoomSpeed = 0.8;
        controls.enableRotate = true;
        controls.rotateSpeed = 0.6;
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
      }
    }
  }, []);

  // Smooth Ease-in-out 1.5s camera rotation to bring station pinpoint front & center!
  const animateCameraTo = (targetLat: number, targetLng: number, targetAltitude: number, duration: number = 1500) => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    const camera = globeRef.current.camera();
    if (!controls || !camera) return;

    // Disable auto-rotation immediately when station is selected
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0;

    // Cancel any ongoing frame animation on rapid clicking
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    // Convert target lat/lng/altitude to 3D Cartesian coordinates (Globe radius R = 100 in three-globe)
    const R = 100;
    const dist = R * (1 + targetAltitude);
    const phi = (90 - targetLat) * (Math.PI / 180);
    const theta = (targetLng + 180) * (Math.PI / 180);

    const targetX = -dist * Math.sin(phi) * Math.cos(theta);
    const targetZ = dist * Math.sin(phi) * Math.sin(theta);
    const targetY = dist * Math.cos(phi);

    const startX = camera.position.x;
    const startY = camera.position.y;
    const startZ = camera.position.z;

    const startTime = performance.now();
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const animateFrame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      camera.position.x = startX + (targetX - startX) * ease;
      camera.position.y = startY + (targetY - startY) * ease;
      camera.position.z = startZ + (targetZ - startZ) * ease;

      controls.target.set(0, 0, 0);
      controls.update();

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animateFrame);
      }
    };

    animFrameRef.current = requestAnimationFrame(animateFrame);

    // Keep react-globe.gl internal state synced
    try {
      globeRef.current.pointOfView({ lat: targetLat, lng: targetLng, altitude: targetAltitude }, duration);
    } catch (e) {}
  };

  // Trigger camera rotation whenever selectedStation changes
  useEffect(() => {
    if (!globeRef.current) return;

    if (selectedStation) {
      animateCameraTo(selectedStation.latitude, selectedStation.longitude, 0.65, 1500);
    } else {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
      }
      animateCameraTo(15, 50, 2.2, 1500);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [selectedStation]);

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

  // Points Data for Stations - Selected station marker scales larger
  const pointsData = POLAR_STATIONS.map((st) => ({
    ...st,
    size: selectedStation?.id === st.id ? 1.2 : 0.45,
    color: selectedStation?.id === st.id ? '#00f2fe' : st.region === 'Antarctica' ? '#38bdf8' : st.region === 'Arctic' ? '#00ffb3' : '#a855f7',
  }));

  // Concentric Radar Target Ripple Rings around selected station pinpoint
  const ringsData = selectedStation
    ? [
        {
          lat: selectedStation.latitude,
          lng: selectedStation.longitude,
          maxR: 12,
          propagationSpeed: 5,
          repeatPeriod: 800,
        },
        {
          lat: selectedStation.latitude,
          lng: selectedStation.longitude,
          maxR: 6,
          propagationSpeed: 3,
          repeatPeriod: 1200,
        }
      ]
    : [];

  const globeTextureUrl =
    globeTexture === 'blue-marble'
      ? '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
      : '//unpkg.com/three-globe/example/img/earth-night.jpg';

  return (
    <div className="relative bg-navy-950 overflow-hidden flex items-center justify-center transition-all duration-300 w-full h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[640px] rounded-3xl border border-stroke shadow-2xl">
      {/* Ambient Aurora Glow Backdrop */}
      <div className="absolute inset-0 bg-aurora-glow pointer-events-none z-10"></div>

      {/* Globe Map Texture Mode Toggle (Day / Night View) */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-1 bg-slate-950/85 border border-slate-700/80 p-1 rounded-xl shadow-2xl backdrop-blur-md">
        <button
          onClick={() => setGlobeTexture('blue-marble')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
            globeTexture === 'blue-marble'
              ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          ☀️ Blue Marble
        </button>
        <button
          onClick={() => setGlobeTexture('night')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
            globeTexture === 'night'
              ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          🌙 Night City
        </button>
      </div>

      <GlobeGl
        ref={globeRef}
        globeImageUrl={globeTextureUrl}
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Atmosphere styling
        atmosphereColor="#00f2fe"
        atmosphereAltitude={0.25}
        
        // Click on empty ocean dismisses station selection
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

        // Concentric Radar Target Ripple Rings over selected station pinpoint
        ringsData={ringsData}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => '#00f2fe'}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
        
        // Floating Marker Dot & Glowing Target Halo
        htmlElementsData={pointsData}
        htmlLat="latitude"
        htmlLng="longitude"
        htmlAltitude={0.08}
        htmlElement={(d: any) => {
          const isSelected = selectedStation?.id === d.id;
          const el = document.createElement('div');
          el.className = 'cursor-pointer group select-none pointer-events-auto';
          el.innerHTML = `
            <div class="flex items-center gap-2 transition-transform duration-300 ${isSelected ? 'scale-125' : 'hover:scale-110'}">
              <div class="relative flex h-5 w-5 items-center justify-center shrink-0">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full ${isSelected ? 'bg-cyan-400 opacity-90' : getBeaconColor(d.region) + ' opacity-60'}"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 ${
                  isSelected
                    ? 'bg-cyan-300 ring-4 ring-cyan-400/90 shadow-[0_0_15px_rgba(0,242,254,1)] scale-110'
                    : getBeaconColor(d.region)
                }"></span>
              </div>
              <div class="flex items-center gap-1.5 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                <span class="${isSelected ? 'text-cyan-300 font-black text-sm tracking-widest underline decoration-cyan-400' : 'text-white font-bold text-xs uppercase tracking-wider'} font-sans">
                  ${d.name}
                </span>
                <span class="text-[10px] font-mono font-bold text-slate-200 opacity-90">(${d.region})</span>
              </div>
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

function getBeaconColor(region: string) {
  if (region === 'Antarctica') return 'bg-sky-400';
  if (region === 'Arctic') return 'bg-emerald-400';
  return 'bg-purple-400';
}
