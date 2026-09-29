'use client';

import React, { useEffect, useState } from 'react';
import { POLAR_STATIONS, Station } from '@/lib/stations';
import { TelemetryData } from '@/app/api/telemetry/route';
import { Radio, Thermometer, Wind, Gauge, MapPin, ArrowLeft, ChevronRight, BookOpen, ExternalLink, Cpu } from 'lucide-react';
import Link from 'next/link';

interface StationListChartProps {
  onSelectStation: (station: Station | null) => void;
  selectedStation: Station | null;
}

export default function StationListChart({ onSelectStation, selectedStation }: StationListChartProps) {
  const [telemetryMap, setTelemetryMap] = useState<Record<string, TelemetryData>>({});

  useEffect(() => {
    POLAR_STATIONS.forEach((station) => {
      fetch(`/api/telemetry?stationId=${station.id}`)
        .then((res) => res.json())
        .then((data: TelemetryData) => {
          setTelemetryMap((prev) => ({ ...prev, [station.id]: data }));
        })
        .catch((err) => console.error(err));
    });
  }, []);

  // Detailed View when a station is selected
  if (selectedStation) {
    const telemetry = telemetryMap[selectedStation.id];
    return (
      <div className="bg-surface border border-stroke rounded-3xl p-5 sm:p-6 shadow-xl space-y-5 flex flex-col justify-between h-full min-h-[500px] lg:min-h-[640px] transition-all animate-in fade-in duration-300">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between border-b border-stroke pb-3">
          <button
            onClick={() => onSelectStation(null)}
            className="px-3 py-1.5 rounded-xl bg-bg-secondary hover:bg-surface border border-stroke text-brand-primary text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Stations</span>
          </button>
          <span className="flex items-center space-x-1 text-[10px] text-semantic-success font-mono font-bold px-2.5 py-1 rounded-full bg-semantic-success/10 border border-semantic-success/30">
            <span className="w-1.5 h-1.5 rounded-full bg-semantic-success animate-ping"></span>
            <span>LIVE TELEMETRY</span>
          </span>
        </div>

        {/* Selected Station Core Info */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-primary animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-black text-content-main">{selectedStation.name}</h3>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-bg-secondary border border-stroke text-brand-primary">
                {selectedStation.region}
              </span>
            </div>
            <p className="text-xs text-content-muted flex items-center gap-1 mt-1.5 font-mono">
              <MapPin className="w-3.5 h-3.5 text-brand-primary" />
              {selectedStation.latitude}° {selectedStation.latitude < 0 ? 'S' : 'N'}, {selectedStation.longitude}° {selectedStation.longitude < 0 ? 'W' : 'E'} | Elev: {selectedStation.elevation}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-content-muted leading-relaxed font-medium bg-bg-secondary/60 p-3.5 rounded-2xl border border-stroke/80">
            {selectedStation.description}
          </p>

          {/* Real-Time Environmental Telemetry Sensor Bar */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-content-main font-mono flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-brand-primary" />
              <span>Real-Time Environmental Sensors</span>
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-2xl bg-bg-secondary border border-stroke">
                <div className="text-[10px] text-content-muted uppercase font-mono flex items-center justify-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Temp</span>
                </div>
                <div className="text-base font-black font-mono text-content-main mt-1">
                  {telemetry ? `${telemetry.temperature}°C` : '--'}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-bg-secondary border border-stroke">
                <div className="text-[10px] text-content-muted uppercase font-mono flex items-center justify-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Wind</span>
                </div>
                <div className="text-base font-black font-mono text-content-main mt-1">
                  {telemetry ? `${telemetry.windSpeed}` : '--'} <span className="text-[10px] font-normal">km/h</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-bg-secondary border border-stroke">
                <div className="text-[10px] text-content-muted uppercase font-mono flex items-center justify-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-purple-500" />
                  <span>Press</span>
                </div>
                <div className="text-base font-black font-mono text-content-main mt-1">
                  {telemetry ? `${telemetry.pressure}` : '--'} <span className="text-[10px] font-normal">hPa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Research Focus & Instruments */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-content-main font-mono flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-brand-primary" />
              <span>Research Focus Areas</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedStation.researchFocus.map((focus, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-lg bg-bg-secondary border border-stroke text-content-main font-medium"
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="pt-4 border-t border-stroke flex items-center justify-between text-xs">
          <span className="text-content-muted font-mono">Est. {selectedStation.established}</span>
          <Link
            href={`/research?station=${encodeURIComponent(selectedStation.name)}`}
            className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Station Research Papers</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    );
  }

  // Summary Mode: All 4 Stations Fixed & Compact (No vertical scrollbar)
  return (
    <div className="bg-surface border border-stroke rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between h-full min-h-[500px] lg:min-h-[640px] space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-stroke pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-bg-secondary border border-stroke text-brand-primary">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-content-main uppercase tracking-wider font-mono">
              MoES Stations Directory
            </h3>
            <p className="text-[11px] text-content-muted">Click any station to focus globe & open full details</p>
          </div>
        </div>
        <span className="flex items-center space-x-1.5 text-[10px] text-semantic-success font-mono font-bold px-2.5 py-1 rounded-full bg-semantic-success/10 border border-semantic-success/30">
          <span className="w-1.5 h-1.5 rounded-full bg-semantic-success animate-ping"></span>
          <span>4 LIVE</span>
        </span>
      </div>

      {/* Fixed 4 Stations Layout (No scrollbar needed) */}
      <div className="grid grid-cols-1 gap-3 my-auto overflow-hidden">
        {POLAR_STATIONS.map((station) => {
          const telemetry = telemetryMap[station.id];

          return (
            <div
              key={station.id}
              onClick={() => onSelectStation(station)}
              className="p-3.5 rounded-2xl bg-bg-secondary/70 hover:bg-bg-secondary border border-stroke hover:border-brand-primary/60 transition-all cursor-pointer space-y-2 group shadow-sm"
            >
              {/* Top Row: Name, Region, Click hint */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-primary shrink-0 group-hover:scale-125 transition-transform" />
                  <h4 className="text-sm sm:text-base font-bold text-content-main group-hover:text-brand-primary transition-colors">
                    {station.name}
                  </h4>
                  <span className="text-[10px] font-mono font-semibold text-content-muted px-2 py-0.5 rounded-full bg-surface border border-stroke">
                    {station.region}
                  </span>
                </div>

                <div className="flex items-center text-brand-primary font-bold text-xs gap-1 opacity-80 group-hover:opacity-100">
                  <span className="text-[11px]">Inspect</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom Row: Coordinates + Telemetry Mini Badges */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-stroke/60">
                <span className="text-[11px] text-content-muted font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-primary shrink-0" />
                  {station.latitude}° {station.latitude < 0 ? 'S' : 'N'}, {station.longitude}° {station.longitude < 0 ? 'W' : 'E'}
                </span>

                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-stroke text-content-main">
                    🌡️ {telemetry ? `${telemetry.temperature}°C` : '--'}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-surface border border-stroke text-content-main hidden sm:inline">
                    💨 {telemetry ? `${telemetry.windSpeed} km/h` : '--'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info note */}
      <div className="pt-2 border-t border-stroke text-[11px] text-content-muted text-center font-mono">
        Select a station to bring it in front on the 3D Globe
      </div>
    </div>
  );
}
