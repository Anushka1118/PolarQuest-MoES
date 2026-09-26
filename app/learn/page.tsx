'use client';

import React from 'react';
import EducationSimulator from '@/components/EducationSimulator';
import { GraduationCap, Award, BookOpen, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-navy-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-polar-500/20 pb-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-polar-900 border border-polar-500/30 text-aurora-cyan text-xs font-mono mb-3 shadow-glow-cyan">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>MoES Smart Education Module (SIH26063)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Interactive Polar Learning Experience
        </h1>
        <p className="text-sm text-polar-200 mt-2 leading-relaxed">
          Democratizing complex polar climate science through dynamic simulation models, adaptive audience tiers, and interactive research flashcards.
        </p>
      </div>

      {/* Main Interactive Temperature / Sea-Level Simulator */}
      <EducationSimulator />

      {/* Educational Knowledge Flashcards Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-polar-500/20 pb-3">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-aurora-cyan" />
            <span>Polar Frontier Knowledge Cards</span>
          </h2>
          <span className="text-xs font-mono text-polar-400">MoES Educational Series</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-navy-900/80 border border-polar-500/30 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-lg font-bold text-white">The Third Pole (Himalayas)</h3>
            <p className="text-xs text-polar-200 leading-relaxed">
              The Himalayan cryosphere feeds 10 major Asian river systems providing water to over 1.4 billion people. Station Himansh at Sutri Dhaka measures seasonal glacier meltwater runoff.
            </p>
            <div className="pt-2 text-[11px] font-mono text-aurora-cyan font-bold">
              Featured Station: Himansh (4,000m Elev.)
            </div>
          </div>

          <div className="bg-navy-900/80 border border-polar-500/30 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-aurora-cyan/20 border border-aurora-cyan text-aurora-cyan flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-lg font-bold text-white">Larsemann Hills Oasis</h3>
            <p className="text-xs text-polar-200 leading-relaxed">
              Bharati Station in Prydz Bay, Antarctica, is built on stilts using recycled shipping containers to minimize environmental footprint while tracking Southern Ocean water stratification.
            </p>
            <div className="pt-2 text-[11px] font-mono text-aurora-cyan font-bold">
              Featured Station: Bharati (Antarctica)
            </div>
          </div>

          <div className="bg-navy-900/80 border border-polar-500/30 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-300 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-lg font-bold text-white">High-Arctic Svalbard Fjord</h3>
            <p className="text-xs text-polar-200 leading-relaxed">
              Himadri Station at Ny-Ålesund, Norway (78°N) investigates black carbon aerosols transported from mid-latitudes that darken snow and accelerate spring melt.
            </p>
            <div className="pt-2 text-[11px] font-mono text-aurora-cyan font-bold">
              Featured Station: Himadri (Arctic)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
