'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Station } from '@/lib/stations';
import { TelemetryData } from '@/app/api/telemetry/route';
import { Thermometer, Wind, Gauge, Compass, MapPin, X, ArrowRight, Activity, Radio } from 'lucide-react';
import Link from 'next/link';

interface StationPanelProps {
  station: Station | null;
  onClose: () => void;
}

export default function StationPanel({ station, onClose }: StationPanelProps) {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close card when clicking outside or pressing Escape
  useEffect(() => {
    if (!station) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        // Allow station marker buttons / pill buttons to execute without double triggering
        const target = e.target as HTMLElement;
        if (!target.closest('button') && !target.closest('.pointer-events-auto')) {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [station, onClose]);

  useEffect(() => {
    if (!station) return;

    let isSubscribed = true;
    setLoading(true);

    fetch(`/api/telemetry?stationId=${station.id}`)
      .then((res) => res.json())
      .then((data: TelemetryData) => {
        if (isSubscribed) {
          setTelemetry(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load telemetry:', err);
        if (isSubscribed) setLoading(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, [station]);

  if (!station) return null;

  return (
    <div
      ref={panelRef}
      className="fixed bottom-6 right-6 z-40 w-full max-w-md bg-navy-950/95 backdrop-blur-2xl border border-polar-500/40 rounded-2xl p-6 shadow-2xl shadow-navy-950/90 animate-in slide-in-from-bottom-5 duration-300"
    >
      {/* Header Bar */}
      <div className="flex items-start justify-between border-b border-polar-500/20 pb-4 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-mono tracking-widest text-aurora-cyan font-bold px-2 py-0.5 rounded bg-polar-900 border border-polar-500/30">
              {station.region} STATION
            </span>
            <span className="flex items-center space-x-1 text-[11px] text-emerald-400 font-mono">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>ONLINE</span>
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide mt-1 flex items-center gap-2">
            {station.name}
          </h2>
          <p className="text-xs text-polar-300 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-polar-400" />
            {station.latitude}° {station.latitude < 0 ? 'S' : 'N'}, {station.longitude}° {station.longitude < 0 ? 'W' : 'E'} | Elev: {station.elevation}
          </p>
        </div>
        <button
          onClick={onClose}
          title="Close station info panel (Esc)"
          className="text-polar-400 hover:text-white bg-polar-900/60 hover:bg-polar-800 p-1.5 rounded-lg border border-polar-500/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Live Environmental Telemetry HUD */}
      <div className="bg-navy-900/90 border border-polar-500/20 rounded-xl p-4 mb-4 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-polar-300 font-mono mb-3 border-b border-polar-500/10 pb-2">
          <span className="flex items-center gap-1.5 font-bold text-white">
            <Activity className="w-4 h-4 text-aurora-cyan animate-pulse" />
            LIVE SENSOR TELEMETRY
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] ${telemetry?.isLive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
            {telemetry?.isLive ? 'Open-Meteo API' : 'Live Simulated Telemetry'}
          </span>
        </div>

        {loading ? (
          <div className="h-20 flex items-center justify-center space-x-2 text-polar-400 text-xs">
            <div className="w-4 h-4 border-2 border-polar-400 border-t-aurora-cyan rounded-full animate-spin"></div>
            <span>Fetching Telemetry Stream...</span>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {/* Temperature */}
            <div className="bg-navy-950/80 p-2.5 rounded-lg border border-polar-500/20 text-center">
              <div className="flex items-center justify-center text-aurora-cyan mb-1">
                <Thermometer className="w-4 h-4" />
              </div>
              <div className="text-lg font-black text-white font-mono">
                {telemetry?.temperature}°C
              </div>
              <div className="text-[10px] text-polar-400 uppercase">Temp</div>
            </div>

            {/* Wind Speed */}
            <div className="bg-navy-950/80 p-2.5 rounded-lg border border-polar-500/20 text-center">
              <div className="flex items-center justify-center text-polar-300 mb-1">
                <Wind className="w-4 h-4" />
              </div>
              <div className="text-lg font-black text-white font-mono">
                {telemetry?.windSpeed} <span className="text-[10px] font-normal text-polar-300">km/h</span>
              </div>
              <div className="text-[10px] text-polar-400 uppercase">Wind</div>
            </div>

            {/* Pressure */}
            <div className="bg-navy-950/80 p-2.5 rounded-lg border border-polar-500/20 text-center">
              <div className="flex items-center justify-center text-purple-400 mb-1">
                <Gauge className="w-4 h-4" />
              </div>
              <div className="text-lg font-black text-white font-mono">
                {telemetry?.pressure} <span className="text-[10px] font-normal text-polar-300">hPa</span>
              </div>
              <div className="text-[10px] text-polar-400 uppercase">Pressure</div>
            </div>
          </div>
        )}

        {telemetry && (
          <div className="mt-3 text-center text-xs text-aurora-cyan font-mono bg-polar-900/40 py-1 rounded border border-polar-500/20">
            {telemetry.conditionText}
          </div>
        )}
      </div>

      {/* Description & Research Focus */}
      <p className="text-xs text-polar-200 leading-relaxed mb-3 line-clamp-3">
        {station.description}
      </p>

      <div className="mb-4">
        <div className="text-[11px] font-semibold text-polar-300 uppercase tracking-wider mb-1.5 font-mono">
          Research Focus Areas:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {station.researchFocus.map((focus, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded-full bg-polar-900/80 border border-polar-500/30 text-polar-200"
            >
              {focus}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <Link
        href={`/research?station=${encodeURIComponent(station.name)}`}
        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-polar-600 to-aurora-cyan text-navy-950 font-bold py-2.5 px-4 rounded-xl shadow-glow-cyan hover:brightness-110 transition-all text-sm"
      >
        <span>Explore {station.name} Research</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
