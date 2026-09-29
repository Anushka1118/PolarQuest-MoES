'use client';

import React, { useState } from 'react';
import GlobeComponent from '@/components/Globe';
import StationListChart from '@/components/StationListChart';
import StationPanel from '@/components/StationPanel';
import { Station, POLAR_STATIONS } from '@/lib/stations';
import { INITIAL_RESEARCH_RECORDS } from '@/lib/mock-data';
import { BookOpen, Sparkles, ArrowRight, ShieldCheck, Cpu, Radio, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const publishedRecords = INITIAL_RESEARCH_RECORDS.filter(r => r.status === 'published');

  return (
    <div className="relative min-h-screen bg-bg-main text-content-main transition-colors duration-300">

      {/* Hero Header Banner */}
      <section className="relative pt-8 pb-4 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto z-20 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-bg-secondary border border-stroke text-brand-primary text-xs font-mono font-medium shadow-sm">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>MoES Live Telemetry & Interactive 3D Globe Explorer</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-content-main tracking-tight leading-tight">
          Explore India&apos;s <span className="text-brand-primary font-black">Polar Frontier</span>
        </h1>
        <p className="text-xs sm:text-sm text-content-muted max-w-2xl mx-auto leading-relaxed font-medium">
          Discover real-time environmental telemetry, published cryosphere research papers, and AI-powered education across Maitri, Bharati, Himadri, and Himansh.
        </p>

        {/* Quick Station Selection Pill Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          {POLAR_STATIONS.map((station) => {
            const isSelected = selectedStation?.id === station.id;
            return (
              <button
                key={station.id}
                onClick={() => setSelectedStation(station)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border btn-game ${
                  isSelected
                    ? 'bg-brand-primary text-white border-brand-primary shadow-sm scale-105'
                    : 'bg-surface text-content-main border-stroke hover:border-brand-primary/50'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                <span>{station.name}</span>
                <span className="text-[10px] text-content-muted">({station.region})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3D Globe & Station Details Split View Layout */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column (Desktop): Station Telemetry & Details Chart */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <StationListChart
              onSelectStation={setSelectedStation}
              selectedStation={selectedStation}
            />
          </div>

          {/* Right Column (Desktop): Interactive 3D Globe (Bounded Square Box on Mobile with Side Padding) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="max-w-sm sm:max-w-md lg:max-w-none mx-auto">
              <GlobeComponent
                onSelectStation={setSelectedStation}
                selectedStation={selectedStation}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Published Research Spotlight Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 relative z-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stroke pb-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-brand-primary font-bold uppercase">
              <BookOpen className="w-4 h-4" />
              <span>Scientific Repository Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-content-main mt-1">
              Latest Published Polar Records
            </h2>
          </div>
          <Link
            href="/research"
            className="flex items-center space-x-2 text-brand-primary font-bold text-sm hover:underline"
          >
            <span>View Knowledge Vault</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publishedRecords.slice(0, 4).map((record) => (
            <Link
              key={record.id}
              href={`/research/${record.id}`}
              className="bg-surface border border-stroke hover:border-brand-primary/60 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-content-muted font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-bg-secondary border border-stroke text-brand-primary font-bold">
                    {record.station_name} Station
                  </span>
                  <span>{record.discipline} • {record.expedition_year}</span>
                </div>

                <h3 className="text-lg font-bold text-content-main group-hover:text-brand-primary transition-colors line-clamp-2">
                  {record.title}
                </h3>

                <p className="text-xs text-content-muted leading-relaxed line-clamp-3">
                  {record.abstract}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-stroke pt-3 text-xs mt-4">
                <span className="text-content-muted truncate max-w-[200px] font-medium">{record.author}</span>
                <span className="flex items-center space-x-1 text-brand-primary font-bold group-hover:underline">
                  <span>Read Paper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MoES Polar System Features Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-stroke p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-stroke flex items-center justify-center text-brand-primary">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-content-main">Gemini AI PDF Parser</h3>
            <p className="text-xs text-content-muted leading-relaxed font-medium">
              Researchers upload expedition PDFs to extract structured JSON metadata, Zod field schema, and geographic coordinate boundaries automatically.
            </p>
          </div>

          <div className="bg-surface border border-stroke p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-stroke flex items-center justify-center text-brand-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-content-main">Admin Controlled Publishing</h3>
            <p className="text-xs text-content-muted leading-relaxed font-medium">
              Multi-role Supabase authorization and RLS policies ensure scientific papers are verified by administrators before public distribution.
            </p>
          </div>

          <div className="bg-surface border border-stroke p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-stroke flex items-center justify-center text-brand-primary">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-content-main">Multi-Tier Smart Education</h3>
            <p className="text-xs text-content-muted leading-relaxed font-medium">
              Transforms complex cryospheric papers into engaging Junior Cadet facts, Social Media Carousels, and interactive climate simulators.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
