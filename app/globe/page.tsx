'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import GlobeComponent from '@/components/Globe';
import { Station, POLAR_STATIONS } from '@/lib/stations';
import { ArrowLeft, MapPin, Radio, Thermometer, Wind, Gauge, ExternalLink } from 'lucide-react';
import { TelemetryData } from '@/app/api/telemetry/route';

export default function GlobeExplorerPage() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);

  const handleSelectStation = (station: Station | null) => {
    setSelectedStation(station);
    if (station) {
      fetch(`/api/telemetry?stationId=${station.id}`)
        .then((res) => res.json())
        .then((data) => setTelemetry(data))
        .catch((err) => console.error(err));
    } else {
      setTelemetry(null);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-navy-950 text-white font-sans">
      {/* Top Floating Control Bar */}
      <header className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between gap-4 bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-3 sm:p-4 rounded-2xl shadow-2xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </Link>
          <div className="h-5 w-px bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black text-white uppercase tracking-wider font-mono">
                3D Polar Globe Explorer
              </h1>
              <p className="text-[10px] text-slate-400 hidden sm:block">Full-Screen Interactive Earth Explorer • MoES Stations</p>
            </div>
          </div>
        </div>

        {/* Quick Station Selection Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[50vw] sm:max-w-none no-scrollbar">
          {POLAR_STATIONS.map((st) => {
            const isSelected = selectedStation?.id === st.id;
            return (
              <button
                key={st.id}
                onClick={() => handleSelectStation(st)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg scale-105'
                    : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-cyan-500/50'
                }`}
              >
                {st.name}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main 3D Globe View Canvas */}
      <div className="w-full h-full">
        <GlobeComponent
          onSelectStation={handleSelectStation}
          selectedStation={selectedStation}
        />
      </div>

      {/* Selected Station Bottom/Side Floating Drawer */}
      {selectedStation && (
        <aside className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 bg-slate-950/90 backdrop-blur-2xl border border-slate-700/80 p-5 rounded-3xl shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h2 className="text-xl font-black text-white">{selectedStation.name}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 font-bold">
                  {selectedStation.region}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-mono flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {selectedStation.latitude}° N/S, {selectedStation.longitude}° E/W • Elev: {selectedStation.elevation}
              </p>
            </div>
            <button
              onClick={() => handleSelectStation(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-xs font-mono font-bold"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
            {selectedStation.description}
          </p>

          {/* Telemetry Sensor Bar */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center justify-center gap-1">
                <Thermometer className="w-3 h-3 text-cyan-400" />
                <span>Temp</span>
              </div>
              <div className="text-sm font-black font-mono text-cyan-300 mt-0.5">
                {telemetry ? `${telemetry.temperature}°C` : '--'}
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center justify-center gap-1">
                <Wind className="w-3 h-3 text-emerald-400" />
                <span>Wind</span>
              </div>
              <div className="text-sm font-black font-mono text-emerald-300 mt-0.5">
                {telemetry ? `${telemetry.windSpeed}` : '--'} <span className="text-[9px] font-normal">km/h</span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono flex items-center justify-center gap-1">
                <Gauge className="w-3 h-3 text-purple-400" />
                <span>Pressure</span>
              </div>
              <div className="text-sm font-black font-mono text-purple-300 mt-0.5">
                {telemetry ? `${telemetry.pressure}` : '--'} <span className="text-[9px] font-normal">hPa</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px] font-mono">Est: {selectedStation.established}</span>
            <Link
              href={`/research?station=${encodeURIComponent(selectedStation.name)}`}
              className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors"
            >
              <span>Explore Research Papers</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}
