'use client';

import React, { useEffect, useState } from 'react';
import { POLAR_STATIONS, Station } from '@/lib/stations';
import { TelemetryData } from '@/app/api/telemetry/route';
import { Radio, Thermometer, Wind, Zap } from 'lucide-react';

interface TelemetryHUDProps {
  onSelectStation: (station: Station) => void;
  selectedStation: Station | null;
}

export default function TelemetryHUD({ onSelectStation, selectedStation }: TelemetryHUDProps) {
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

  return (
    <div className="absolute top-6 left-6 z-30 hidden md:block">
      <div className="bg-white/90 dark:bg-navy-950/85 backdrop-blur-xl border border-sky-200 dark:border-polar-500/30 rounded-2xl p-4 shadow-2xl shadow-sky-900/10 dark:shadow-navy-950/80 max-w-xs transition-colors">
        <div className="flex items-center justify-between border-b border-sky-100 dark:border-polar-500/20 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-sky-600 dark:text-aurora-cyan animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-wider text-slate-900 dark:text-white uppercase">
              MoES Stations Telemetry
            </span>
          </div>
          <span className="flex items-center space-x-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-ping"></span>
            <span>LIVE STREAM</span>
          </span>
        </div>

        <div className="space-y-2">
          {POLAR_STATIONS.map((station) => {
            const data = telemetryMap[station.id];
            const isSelected = selectedStation?.id === station.id;

            return (
              <button
                key={station.id}
                onClick={() => onSelectStation(station)}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-sky-100 dark:bg-polar-600/30 border-sky-400 dark:border-aurora-cyan shadow-none dark:shadow-glow-cyan text-slate-900 dark:text-white font-semibold'
                    : 'bg-slate-50 dark:bg-navy-900/60 border-sky-200 dark:border-polar-500/10 hover:border-sky-300 dark:hover:border-polar-500/40 text-slate-700 dark:text-polar-200'
                }`}
              >
                <div>
                  <div className="text-xs font-bold tracking-wide flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-aurora-cyan"></span>
                    {station.name}
                    <span className="text-[10px] font-mono font-normal text-slate-500 dark:text-polar-400">
                      ({station.region})
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-polar-400 font-mono truncate max-w-[140px]">
                    {data?.conditionText || 'Syncing...'}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black font-mono text-sky-600 dark:text-aurora-cyan flex items-center justify-end gap-1">
                    <Thermometer className="w-3 h-3" />
                    {data ? `${data.temperature}°C` : '--'}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-polar-300 font-mono flex items-center justify-end gap-1">
                    <Wind className="w-2.5 h-2.5" />
                    {data ? `${data.windSpeed} km/h` : '--'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
