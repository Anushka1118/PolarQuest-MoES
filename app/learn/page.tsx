'use client';

import React from 'react';
import EducationSimulator from '@/components/EducationSimulator';
import { GraduationCap, Award, BookOpen, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-sky-200 dark:border-polar-500/20 pb-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-polar-900 border border-sky-300 dark:border-polar-500/30 text-sky-800 dark:text-aurora-cyan text-xs font-mono mb-3 shadow-sm dark:shadow-glow-cyan">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>MoES Smart Education Module (SIH26063)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Interactive Polar Learning Experience
        </h1>
        <p className="text-sm text-slate-600 dark:text-polar-200 mt-2 leading-relaxed font-medium">
          Democratizing complex polar climate science through dynamic simulation models, adaptive audience tiers, and interactive research flashcards.
        </p>
      </div>

      {/* Main Interactive Temperature / Sea-Level Simulator */}
      <EducationSimulator />

      {/* Educational Knowledge Flashcards Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-sky-200 dark:border-polar-500/20 pb-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-600 dark:text-aurora-cyan" />
            <span>Polar Frontier Knowledge Cards</span>
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-polar-400">MoES Educational Series</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/90 dark:bg-navy-900/80 border border-slate-200 dark:border-polar-500/30 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold font-mono">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">The Third Pole (Himalayas)</h3>
            <p className="text-xs text-slate-600 dark:text-polar-200 leading-relaxed font-medium">
              The Himalayan cryosphere feeds 10 major Asian river systems providing water to over 1.4 billion people. Station Himansh at Sutri Dhaka measures seasonal glacier meltwater runoff.
            </p>
            <div className="pt-2 text-[11px] font-mono text-sky-700 dark:text-aurora-cyan font-bold">
              Featured Station: Himansh (4,000m Elev.)
            </div>
          </div>

          <div className="bg-white/90 dark:bg-navy-900/80 border border-slate-200 dark:border-polar-500/30 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-aurora-cyan/20 border border-sky-300 dark:border-aurora-cyan text-sky-700 dark:text-aurora-cyan flex items-center justify-center font-bold font-mono">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Larsemann Hills Oasis</h3>
            <p className="text-xs text-slate-600 dark:text-polar-200 leading-relaxed font-medium">
              Bharati Station in Prydz Bay, Antarctica, is built on stilts using recycled shipping containers to minimize environmental footprint while tracking Southern Ocean water stratification.
            </p>
            <div className="pt-2 text-[11px] font-mono text-sky-700 dark:text-aurora-cyan font-bold">
              Featured Station: Bharati (Antarctica)
            </div>
          </div>

          <div className="bg-white/90 dark:bg-navy-900/80 border border-slate-200 dark:border-polar-500/30 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold font-mono">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">High-Arctic Svalbard Fjord</h3>
            <p className="text-xs text-slate-600 dark:text-polar-200 leading-relaxed font-medium">
              Himadri Station at Ny-Ålesund, Norway (78°N) investigates black carbon aerosols transported from mid-latitudes that darken snow and accelerate spring melt.
            </p>
            <div className="pt-2 text-[11px] font-mono text-sky-700 dark:text-aurora-cyan font-bold">
              Featured Station: Himadri (Arctic)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
