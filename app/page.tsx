'use client';

import React, { useState } from 'react';
import GlobeComponent from '@/components/Globe';
import TelemetryHUD from '@/components/TelemetryHUD';
import StationPanel from '@/components/StationPanel';
import { Station, POLAR_STATIONS } from '@/lib/stations';
import { INITIAL_RESEARCH_RECORDS } from '@/lib/mock-data';
import { Globe, Compass, BookOpen, Sparkles, ArrowRight, ShieldCheck, Cpu, Radio, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const publishedRecords = INITIAL_RESEARCH_RECORDS.filter(r => r.status === 'published');

  return (
    <div className="relative min-h-screen bg-navy-950 overflow-hidden">
      {/* Hero Header Banner */}
      <section className="relative pt-8 pb-4 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto z-20">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-polar-900/80 border border-polar-500/30 text-aurora-cyan text-xs font-mono mb-4 shadow-glow-cyan animate-pulse">
          <Radio className="w-3.5 h-3.5" />
          <span>MoES Live Telemetry & Interactive 3D Globe Explorer</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Explore India&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan via-polar-300 to-aurora-teal">Polar Frontier</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-polar-200 max-w-2xl mx-auto leading-relaxed">
          Discover real-time environmental telemetry, published cryosphere research papers, and AI-powered education across Maitri, Bharati, Himadri, and Himansh.
        </p>

        {/* Quick Station Selection Pill Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {POLAR_STATIONS.map((station) => {
            const isSelected = selectedStation?.id === station.id;
            return (
              <button
                key={station.id}
                onClick={() => setSelectedStation(station)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border ${
                  isSelected
                    ? 'bg-aurora-cyan text-navy-950 border-aurora-cyan shadow-glow-cyan scale-105'
                    : 'bg-navy-900/80 text-polar-200 border-polar-500/30 hover:border-polar-400 hover:text-white'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{station.name}</span>
                <span className="text-[10px] opacity-75">({station.region})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3D Globe Explorer Viewport */}
      <section className="relative w-full z-10 border-y border-polar-500/20 shadow-2xl">
        <TelemetryHUD
          onSelectStation={setSelectedStation}
          selectedStation={selectedStation}
        />

        <GlobeComponent
          onSelectStation={setSelectedStation}
          selectedStation={selectedStation}
        />

        <StationPanel
          station={selectedStation}
          onClose={() => setSelectedStation(null)}
        />
      </section>

      {/* Published Research Spotlight Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 relative z-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-polar-500/20 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-aurora-cyan font-bold uppercase">
              <BookOpen className="w-4 h-4" />
              <span>Scientific Repository Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Latest Published Polar Records
            </h2>
          </div>
          <Link
            href="/research"
            className="flex items-center space-x-2 text-aurora-cyan font-bold text-sm hover:underline"
          >
            <span>View Full Knowledge Vault</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publishedRecords.slice(0, 4).map((record) => (
            <div
              key={record.id}
              className="bg-navy-900/80 border border-polar-500/30 hover:border-aurora-cyan/60 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-polar-400 font-mono mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-polar-900 border border-polar-500/30 text-aurora-cyan font-bold">
                    {record.station_name} Station
                  </span>
                  <span>{record.discipline} • {record.expedition_year}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-aurora-cyan transition-colors line-clamp-2 mb-2">
                  {record.title}
                </h3>

                <p className="text-xs text-polar-300 leading-relaxed line-clamp-3 mb-4">
                  {record.abstract}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-polar-500/10 pt-3 text-xs">
                <span className="text-polar-400 truncate max-w-[200px]">{record.author}</span>
                <Link
                  href={`/research/${record.id}`}
                  className="flex items-center space-x-1 text-aurora-cyan font-bold hover:underline"
                >
                  <span>Read Paper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MoES Polar System Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-navy-900/60 border border-polar-500/20 p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-polar-900 border border-polar-500/30 flex items-center justify-center text-aurora-cyan mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Gemini AI PDF Parser</h3>
            <p className="text-xs text-polar-300 leading-relaxed">
              Researchers upload expedition PDFs to extract structured JSON metadata, Zod field schema, and geographic coordinate boundaries automatically.
            </p>
          </div>

          <div className="bg-navy-900/60 border border-polar-500/20 p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-polar-900 border border-polar-500/30 flex items-center justify-center text-purple-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Admin Controlled Publishing</h3>
            <p className="text-xs text-polar-300 leading-relaxed">
              Multi-role Supabase authorization and RLS policies ensure scientific papers are verified by administrators before public distribution.
            </p>
          </div>

          <div className="bg-navy-900/60 border border-polar-500/20 p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-polar-900 border border-polar-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Multi-Tier Smart Education</h3>
            <p className="text-xs text-polar-300 leading-relaxed">
              Transforms complex cryospheric papers into engaging Junior Cadet facts, Social Media Carousels, and interactive temperature simulators.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
