'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';
import { SEA_ICE_EXTENT_DATA, ICE_CORE_CO2_DATA } from '@/lib/mock-data';
import { LineChart as ChartIcon, Layers, BarChart2 } from 'lucide-react';

export default function DatasetChart() {
  const [activeTab, setActiveTab] = useState<'seaIce' | 'iceCore'>('seaIce');

  return (
    <div className="bg-white/90 dark:bg-navy-900/90 border border-slate-200 dark:border-polar-500/30 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 transition-colors duration-300">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-polar-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-mono tracking-widest text-sky-800 dark:text-aurora-cyan font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-polar-900 border border-sky-200 dark:border-polar-500/30">
              Interactive Dataset Playground
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide mt-1">
            Polar Climate Indicators & Telemetry Analytics
          </h3>
        </div>

        <div className="flex items-center bg-slate-100 dark:bg-navy-950 p-1 rounded-xl border border-slate-200 dark:border-polar-500/30">
          <button
            onClick={() => setActiveTab('seaIce')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'seaIce'
                ? 'bg-sky-600 dark:bg-polar-600 text-white shadow-md'
                : 'text-slate-600 dark:text-polar-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ChartIcon className="w-3.5 h-3.5" />
            <span>Sea Ice Extent (2000-2026)</span>
          </button>
          <button
            onClick={() => setActiveTab('iceCore')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'iceCore'
                ? 'bg-sky-600 dark:bg-polar-600 text-white shadow-md'
                : 'text-slate-600 dark:text-polar-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Ice Core CO2 Proxy</span>
          </button>
        </div>
      </div>

      {/* Chart Render */}
      <div className="h-[360px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'seaIce' ? (
            <AreaChart data={SEA_ICE_EXTENT_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorArctic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAntarctic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} unit="M km²" domain={[0, 22]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: 'rgba(56, 189, 248, 0.3)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#64748b' }} />
              <Area type="monotone" dataKey="arctic" name="Arctic Sea Ice (M km²)" stroke="#0284c7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorArctic)" />
              <Area type="monotone" dataKey="antarctic" name="Antarctic Sea Ice (M km²)" stroke="#a855f7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAntarctic)" />
            </AreaChart>
          ) : (
            <BarChart data={ICE_CORE_CO2_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
              <XAxis dataKey="depth" stroke="#64748b" fontSize={12} unit="m" label={{ value: 'Ice Core Depth (m)', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 10 }} />
              <YAxis yAxisId="left" stroke="#0284c7" fontSize={12} unit=" ppm" domain={[150, 320]} />
              <YAxis yAxisId="right" orientation="right" stroke="#e11d48" fontSize={12} unit="°C" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: 'rgba(56, 189, 248, 0.3)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#64748b' }} />
              <Bar yAxisId="left" dataKey="co2" name="Atmospheric CO2 (ppm)" fill="#0284c7" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="tempAnomaly" name="Temp Anomaly (°C)" stroke="#e11d48" strokeWidth={3} dot={{ r: 5 }} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-polar-400 font-mono border-t border-slate-200 dark:border-polar-500/10 pt-3">
        <span>Source: NCPOR / MoES Cryospheric Observation Repository</span>
        <span>Interactive Visualization Powered by Recharts</span>
      </div>
    </div>
  );
}
