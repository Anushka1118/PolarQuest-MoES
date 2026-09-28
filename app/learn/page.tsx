'use client';

import React from 'react';
import EducationSimulator from '@/components/EducationSimulator';
import { GraduationCap, Sparkles, Trophy, ArrowRight, Gamepad2, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-bg-main py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-stroke pb-6 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-bg-secondary border border-stroke text-brand-primary text-xs font-mono font-medium">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>MoES Smart Education Module (SIH26063)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-content-main">
          Interactive Polar Learning Experience
        </h1>
        <p className="text-sm text-content-muted leading-relaxed font-medium">
          Democratizing complex polar climate science through dynamic simulation models, adaptive audience tiers, and interactive quiz challenges.
        </p>
      </div>

      {/* Sleek Quiz Banner */}
      <div className="rounded-2xl bg-surface border border-stroke p-6 sm:p-8 text-content-main shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-primary">
            <Trophy className="w-4 h-4 text-brand-primary" />
            <span>Interactive Knowledge Challenge</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-content-main">
            Polar Science Quiz
          </h2>
          <p className="text-xs text-content-muted leading-relaxed max-w-xl font-medium">
            Test your knowledge on Antarctica, the Himalayas, the Arctic, or oceanography with 10 questions and instant answer explanations.
          </p>
        </div>

        <Link
          href="/quiz"
          className="px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 shrink-0 btn-game"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Take Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Interactive Temperature / Sea-Level Simulator */}
      <EducationSimulator />

      {/* Educational Knowledge Cards Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stroke pb-3">
          <div>
            <h2 className="text-2xl font-bold text-content-main flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-primary" />
              <span>Polar Frontier Knowledge Cards</span>
            </h2>
            <p className="text-xs text-content-muted mt-0.5 font-medium">
              Explore real polar wildlife, glaciology, oceanography, and atmospheric research cards.
            </p>
          </div>

          <Link
            href="/learn/cards"
            className="px-4 py-2 rounded-xl bg-bg-secondary hover:bg-surface border border-stroke text-brand-primary font-bold text-xs transition-all flex items-center gap-2 shrink-0 btn-game"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            className="group relative overflow-hidden rounded-2xl border border-stroke shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between min-h-[280px]"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-slate-950/75 dark:bg-black/80 backdrop-blur-[2px]" />
            <div className="relative z-10 p-6 space-y-3 text-white flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono font-extrabold text-xs flex items-center justify-center">
                  01
                </span>
                <span className="text-[11px] font-mono font-bold text-cyan-300">Glaciology</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-white">The Third Pole (Himalayas)</h3>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  The Himalayan cryosphere feeds 10 major Asian river systems providing water to over 1.4 billion people. Station Himansh at Sutri Dhaka measures seasonal glacier meltwater runoff.
                </p>
              </div>
              <div className="pt-2 border-t border-white/15 flex items-center gap-1 text-[11px] font-mono text-cyan-400 font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Station Himansh (4,000m Elev.)</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="group relative overflow-hidden rounded-2xl border border-stroke shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between min-h-[280px]"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1517783999520-f068d7431a60?auto=format&fit=crop&w=1000&q=80)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-slate-950/75 dark:bg-black/80 backdrop-blur-[2px]" />
            <div className="relative z-10 p-6 space-y-3 text-white flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono font-extrabold text-xs flex items-center justify-center">
                  02
                </span>
                <span className="text-[11px] font-mono font-bold text-cyan-300">Polar Infrastructure</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-white">Larsemann Hills Oasis</h3>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  Bharati Station in Prydz Bay, Antarctica, is built on stilts using recycled shipping containers to minimize environmental footprint while tracking Southern Ocean water stratification.
                </p>
              </div>
              <div className="pt-2 border-t border-white/15 flex items-center gap-1 text-[11px] font-mono text-cyan-400 font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Bharati Station (Antarctica)</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="group relative overflow-hidden rounded-2xl border border-stroke shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between min-h-[280px]"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=80)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-slate-950/75 dark:bg-black/80 backdrop-blur-[2px]" />
            <div className="relative z-10 p-6 space-y-3 text-white flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono font-extrabold text-xs flex items-center justify-center">
                  03
                </span>
                <span className="text-[11px] font-mono font-bold text-cyan-300">Atmospheric Physics</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-white">High-Arctic Svalbard Fjord</h3>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  Himadri Station at Ny-Ålesund, Norway (78°N) investigates black carbon aerosols transported from mid-latitudes that darken snow and accelerate spring melt.
                </p>
              </div>
              <div className="pt-2 border-t border-white/15 flex items-center gap-1 text-[11px] font-mono text-cyan-400 font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Himadri Station (Arctic)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
