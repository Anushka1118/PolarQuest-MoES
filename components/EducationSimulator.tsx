'use client';

import React, { useState } from 'react';
import { Thermometer, Droplets, Waves, GraduationCap, Award, BookOpen, ShieldAlert, Sparkles } from 'lucide-react';

export type AudienceTier = 'cadet' | 'apprentice' | 'fellow';

export default function EducationSimulator() {
  const [tempAnomaly, setTempAnomaly] = useState<number>(1.5);
  const [tier, setTier] = useState<AudienceTier>('apprentice');

  // Calculated simulation variables
  const seaLevelRiseCm = Math.round(tempAnomaly * 18.5); // ~27.75 cm at 1.5C
  const iceLossPercent = Math.min(100, Math.max(0, Math.round(tempAnomaly * 14.2)));

  return (
    <div className="space-y-8 transition-colors duration-300">
      {/* Audience Tier Switcher Bar */}
      <div className="bg-white/90 dark:bg-navy-900/90 border border-slate-200 dark:border-polar-500/30 rounded-2xl p-4 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-sky-100 dark:bg-aurora-cyan/20 border border-sky-300 dark:border-aurora-cyan text-sky-700 dark:text-aurora-cyan">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-sky-800 dark:text-aurora-cyan uppercase tracking-wider">
              Smart Education Portal
            </div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white">
              Adaptive Learning Experience
            </div>
          </div>
        </div>

        <div className="flex items-center bg-slate-100 dark:bg-navy-950 p-1 rounded-xl border border-slate-200 dark:border-polar-500/30 w-full md:w-auto">
          <button
            onClick={() => setTier('cadet')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              tier === 'cadet'
                ? 'bg-amber-500 text-white dark:text-navy-950 shadow-md'
                : 'text-slate-600 dark:text-polar-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Junior Cadet (6-12)</span>
          </button>

          <button
            onClick={() => setTier('apprentice')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              tier === 'apprentice'
                ? 'bg-sky-600 dark:bg-aurora-cyan text-white dark:text-navy-950 shadow-md'
                : 'text-slate-600 dark:text-polar-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Field Apprentice (13-18)</span>
          </button>

          <button
            onClick={() => setTier('fellow')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              tier === 'fellow'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-polar-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Research Fellow (Adult/Press)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Simulator Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Controls & Metrics */}
        <div className="lg:col-span-5 bg-white/90 dark:bg-navy-900/90 border border-slate-200 dark:border-polar-500/30 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold font-mono text-sky-800 dark:text-aurora-cyan uppercase tracking-wider flex items-center gap-1.5">
                <Thermometer className="w-4 h-4" />
                Global Temperature Anomaly Simulation
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-100 dark:bg-polar-900 border border-sky-200 dark:border-polar-500/30 text-slate-700 dark:text-polar-300 font-mono">
                Interactive Model
              </span>
            </div>

            {/* Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Temperature Anomaly:</span>
                <span className={`text-2xl font-black font-mono ${tempAnomaly > 2 ? 'text-red-600 dark:text-red-400' : tempAnomaly > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-sky-700 dark:text-aurora-cyan'}`}>
                  {tempAnomaly > 0 ? `+${tempAnomaly.toFixed(1)}` : tempAnomaly.toFixed(1)}°C
                </span>
              </div>

              <input
                type="range"
                min="-2.0"
                max="5.0"
                step="0.1"
                value={tempAnomaly}
                onChange={(e) => setTempAnomaly(parseFloat(e.target.value))}
                className="w-full h-3 bg-slate-100 dark:bg-navy-950 rounded-lg appearance-none cursor-pointer accent-sky-600 dark:accent-aurora-cyan border border-slate-300 dark:border-polar-500/30"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-polar-400">
                <span>-2.0°C (Ice Age)</span>
                <span>0.0°C (Baseline)</span>
                <span>+1.5°C (Paris Goal)</span>
                <span>+5.0°C (High Emission)</span>
              </div>
            </div>
          </div>

          {/* Metric Outputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-sky-50 dark:bg-navy-950 p-4 rounded-xl border border-sky-200 dark:border-polar-500/20 text-center">
              <Droplets className="w-5 h-5 text-sky-600 dark:text-aurora-cyan mx-auto mb-1" />
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{seaLevelRiseCm} cm</div>
              <div className="text-xs text-slate-600 dark:text-polar-300">Est. Global Sea Level Rise</div>
            </div>

            <div className="bg-amber-50 dark:bg-navy-950 p-4 rounded-xl border border-amber-200 dark:border-polar-500/20 text-center">
              <Waves className="w-5 h-5 text-red-600 dark:text-red-400 mx-auto mb-1" />
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{iceLossPercent}%</div>
              <div className="text-xs text-slate-600 dark:text-polar-300">Polar Ice Volume Loss</div>
            </div>
          </div>

          {/* Disclaimer Banner */}
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-polar-900/60 border border-slate-200 dark:border-polar-500/20 flex items-center space-x-2 text-xs text-slate-600 dark:text-polar-300">
            <ShieldAlert className="w-4 h-4 text-sky-600 dark:text-aurora-cyan shrink-0" />
            <span>Educational simulation model for conceptual understanding of Earth system feedback.</span>
          </div>
        </div>

        {/* Right Column: Visual Animation Canvas & Tiered Text */}
        <div className="lg:col-span-7 bg-white/90 dark:bg-navy-900/90 border border-slate-200 dark:border-polar-500/30 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 flex flex-col justify-between">
          {/* Animated SVG Simulation Graphic */}
          <div className="relative h-64 rounded-xl bg-gradient-to-b from-sky-100 via-sky-50 to-blue-100 dark:from-navy-950 dark:via-polar-950 dark:to-polar-900 border border-sky-200 dark:border-polar-500/20 overflow-hidden flex items-end justify-center">
            {/* Sun Thermal Glow */}
            <div
              className="absolute top-4 right-8 rounded-full transition-all duration-500"
              style={{
                width: `${40 + tempAnomaly * 10}px`,
                height: `${40 + tempAnomaly * 10}px`,
                backgroundColor: tempAnomaly > 2 ? '#ef4444' : '#f59e0b',
                boxShadow: `0 0 ${20 + tempAnomaly * 15}px ${tempAnomaly > 2 ? '#ef4444' : '#f59e0b'}`,
              }}
            ></div>

            {/* Melting Glacier Vector */}
            <div
              className="absolute left-6 bottom-0 bg-white dark:bg-white/90 border-t-2 border-r-2 border-slate-200 dark:border-polar-200 transition-all duration-700 shadow-sm"
              style={{
                width: `${Math.max(40, 160 - tempAnomaly * 20)}px`,
                height: `${Math.max(30, 180 - tempAnomaly * 25)}px`,
                clipPath: 'polygon(0% 100%, 0% 0%, 70% 30%, 100% 100%)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-sky-100 to-sky-300 dark:from-polar-100 dark:to-polar-300 opacity-60"></div>
            </div>

            {/* Rising Sea Water Level */}
            <div
              className="w-full bg-gradient-to-t from-sky-500/80 via-cyan-400/70 to-sky-300/60 dark:from-polar-600/80 dark:to-aurora-cyan/60 transition-all duration-700 relative backdrop-blur-sm"
              style={{
                height: `${Math.min(180, 40 + seaLevelRiseCm * 1.5)}px`,
              }}
            >
              <div className="absolute inset-x-0 top-0 h-2 bg-cyan-400 dark:bg-aurora-cyan animate-pulse"></div>
              <div className="p-3 text-center text-xs font-mono font-bold text-slate-900 dark:text-navy-950 tracking-wider">
                SEA LEVEL RISE (+{seaLevelRiseCm} cm)
              </div>
            </div>
          </div>

          {/* Tier-Specific Explanation Content */}
          <div className="bg-slate-50 dark:bg-navy-950 p-5 rounded-xl border border-slate-200 dark:border-polar-500/20 space-y-2">
            {tier === 'cadet' && (
              <div>
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-1">
                  <Award className="w-4 h-4" />
                  Junior Cadet Expedition Briefing
                </div>
                <p className="text-xs text-slate-700 dark:text-polar-200 leading-relaxed font-medium">
                  Imagine Earth is wearing a warm winter blanket! When global temperatures go up by {tempAnomaly}°C, big polar glaciers melt like ice cream in summer. The melted ice turns into water, making sea levels rise by {seaLevelRiseCm} cm. Keep learning to earn your MoES Cadet Badge! 🐧❄️
                </p>
              </div>
            )}

            {tier === 'apprentice' && (
              <div>
                <div className="flex items-center gap-2 text-sky-700 dark:text-aurora-cyan font-bold text-sm mb-1">
                  <BookOpen className="w-4 h-4" />
                  Field Apprentice Cryosphere Physics
                </div>
                <p className="text-xs text-slate-700 dark:text-polar-200 leading-relaxed font-medium">
                  Polar ice sheets store over 68% of Earth&apos;s freshwater. A {tempAnomaly}°C atmospheric warming drives thermal expansion of sea water combined with land-ice basal discharge. At current projections, this leads to approximately {seaLevelRiseCm} cm of global sea-level adjustment, altering coastal estuarine dynamics.
                </p>
              </div>
            )}

            {tier === 'fellow' && (
              <div>
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-sm mb-1">
                  <Sparkles className="w-4 h-4" />
                  Research Fellow Technical Summary
                </div>
                <p className="text-xs text-slate-800 dark:text-polar-200 leading-relaxed font-mono">
                  Feedback Mechanics: ΔT = +{tempAnomaly}°C triggers albedo reduction from 0.85 to 0.45, intensifying shortwave radiative absorption. Sub-ice shelf basal melt rates accelerate dynamically, contributing to an estimated eustatic sea-level displacement of ΔH ≈ {seaLevelRiseCm} cm.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
