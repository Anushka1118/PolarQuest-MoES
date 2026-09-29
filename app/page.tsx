'use client';
import React, { useState } from 'react';
import GlobeComponent from '@/components/Globe';
import StationListChart from '@/components/StationListChart';
import { Station, POLAR_STATIONS } from '@/lib/stations';
import { INITIAL_RESEARCH_RECORDS } from '@/lib/mock-data';
import { ArrowRight, ShieldCheck, Cpu, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const publishedRecords = INITIAL_RESEARCH_RECORDS.filter(r => r.status === 'published');

  return (
    <div className="min-h-screen text-content-main">

      {/* HERO */}
      <section className="relative pt-12 pb-8 px-6 lg:px-12 max-w-6xl mx-auto text-center space-y-7">

        {/* Live badge */}
        <div className="flex justify-center">
          <span className="polar-badge">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="polar-ping absolute inset-0 rounded-full bg-[#58C9F3]" />
              <span className="relative rounded-full h-1.5 w-1.5 bg-[#58C9F3]" />
            </span>
            MoES Live Telemetry &middot; 3D Earth Engine &middot; AI Research Vault
          </span>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tight">
            <span className="text-[#061826] dark:text-[#BDE5FF]">POLAR</span><span className="text-polar">QUEST</span>
          </h1>
          <p className="text-[0.7rem] tracking-[0.30em] uppercase font-medium text-[#2FA0C6] dark:text-[#58C9F3]/70">
            Ministry of Earth Sciences &middot; Global Polar Frontier
          </p>
        </div>

        {/* Tagline */}
        <p className="text-sm sm:text-base text-[#1C4E75] dark:text-[#94CBE4] max-w-xl mx-auto leading-relaxed font-light">
          Real-time telemetry, interactive 3D expedition mapping, and AI-powered climate science from Earth&apos;s frozen frontiers.
        </p>

        {/* Station chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {POLAR_STATIONS.map(station => {
            const sel = selectedStation?.id === station.id;
            return (
              <button key={station.id} onClick={() => setSelectedStation(station)}
                className={[
                  'btn-game flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all',
                  sel
                    ? 'bg-[#2FA0C6] text-white border-[#58C9F3]/50 shadow-[0_0_16px_-4px_rgba(88,201,243,0.55)]'
                    : 'bg-white/10 dark:bg-white/[0.04] border-white/25 dark:border-[#58C9F3]/12 text-[#061826] dark:text-[#BDE5FF]/70 hover:border-[#2FA0C6]/40 hover:text-[#2FA0C6] dark:hover:text-[#58C9F3]'
                ].join(' ')}>
                <MapPin className="w-3 h-3 shrink-0" />
                {station.name}
                <span className="opacity-40">&middot;</span>
                <span className="opacity-50 text-[0.6rem]">{station.region}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* GLOBE + TELEMETRY */}
      <section id="globe-section" className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <StationListChart onSelectStation={setSelectedStation} selectedStation={selectedStation} />
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="max-w-sm sm:max-w-md lg:max-w-none mx-auto">
              <GlobeComponent onSelectStation={setSelectedStation} selectedStation={selectedStation} />
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH SPOTLIGHT */}
      <section className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto py-16 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[0.65rem] tracking-[0.18em] uppercase font-semibold text-[#2FA0C6] dark:text-[#58C9F3]">Scientific Repository</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#061826] dark:text-[#BDE5FF]">Latest Published Records</h2>
          </div>
          <Link href="/research" className="group flex items-center gap-1.5 text-sm font-medium text-[#2FA0C6] dark:text-[#58C9F3] hover:opacity-75 transition-opacity">
            View all records <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="tidal-divider" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {publishedRecords.slice(0,4).map(record => (
            <Link key={record.id} href={`/research/${record.id}`} className="pq-card p-6 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[0.62rem] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#58C9F3]/10 border border-[#58C9F3]/18 text-[#2FA0C6] dark:text-[#58C9F3] tracking-wider">
                    {record.station_name}
                  </span>
                  <span className="text-[0.62rem] font-mono text-[#1C4E75]/60 dark:text-[#58C9F3]/40">
                    {record.discipline} &middot; {record.expedition_year}
                  </span>
                </div>
                <h3 className="text-sm font-semibold leading-snug text-[#061826] dark:text-[#BDE5FF] group-hover:text-[#2FA0C6] dark:group-hover:text-[#58C9F3] transition-colors line-clamp-2">
                  {record.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#1C4E75]/80 dark:text-[#58C9F3]/55 font-light line-clamp-3">
                  {record.abstract}
                </p>
              </div>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#1C4E75]/10 dark:border-[#58C9F3]/08 text-xs">
                <span className="text-[#1C4E75]/50 dark:text-[#58C9F3]/35 truncate max-w-[160px]">{record.author}</span>
                <span className="flex items-center gap-1 font-semibold text-[#2FA0C6] dark:text-[#58C9F3] group-hover:gap-2 transition-all">
                  Read paper <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto pb-24 space-y-8">
        <div className="text-center space-y-1">
          <p className="text-[0.65rem] tracking-[0.18em] uppercase font-semibold text-[#2FA0C6] dark:text-[#58C9F3]">Platform</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#061826] dark:text-[#BDE5FF]">Built for Polar Science</h2>
        </div>
        <div className="tidal-divider" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Cpu, title: 'Gemini AI PDF Parser', desc: 'Upload expedition PDFs to auto-extract structured metadata, field schema, and geographic coordinates via Google Gemini.' },
            { icon: ShieldCheck, title: 'Admin-Controlled Publishing', desc: 'Multi-role Supabase RLS authorization ensures papers are administrator-verified before public release.' },
            { icon: Sparkles, title: 'Multi-Tier Smart Education', desc: 'Transforms complex polar research into Junior Cadet facts, social carousels, and interactive climate simulators.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="pq-card p-6 space-y-4">
              <div className="pq-icon-box w-10 h-10 rounded-xl flex items-center justify-center text-[#2FA0C6] dark:text-[#58C9F3]">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-[#061826] dark:text-[#BDE5FF]">{title}</h3>
                <p className="text-xs leading-relaxed text-[#1C4E75]/75 dark:text-[#58C9F3]/55 font-light">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}