'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { INITIAL_RESEARCH_RECORDS, ResearchRecord } from '@/lib/mock-data';
import { Search, Filter, BookOpen, Calendar, MapPin, ArrowRight, FileText } from 'lucide-react';

function VaultContent() {
  const searchParams = useSearchParams();
  const stationFilterParam = searchParams.get('station');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState<string>(stationFilterParam || 'All');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');
  const [records, setRecords] = useState<ResearchRecord[]>([]);

  useEffect(() => {
    // Read local storage added papers or fallback to initial records
    const localPapersStr = localStorage.getItem('polarquest_published_records');
    let publishedList = INITIAL_RESEARCH_RECORDS.filter(r => r.status === 'published');
    if (localPapersStr) {
      try {
        const customPapers = JSON.parse(localPapersStr);
        publishedList = [...customPapers.filter((p: any) => p.status === 'published'), ...publishedList];
      } catch (e) {}
    }
    setRecords(publishedList);
  }, []);

  const filteredRecords = records.filter((rec) => {
    const matchesQuery =
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.abstract.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStation =
      selectedStation === 'All' ||
      rec.station_name.toLowerCase() === selectedStation.toLowerCase();

    const matchesDiscipline =
      selectedDiscipline === 'All' ||
      rec.discipline.toLowerCase() === selectedDiscipline.toLowerCase();

    return matchesQuery && matchesStation && matchesDiscipline;
  });

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="bg-navy-900/90 border border-polar-500/30 rounded-2xl p-4 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-polar-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by title, lead author, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-navy-950 border border-polar-500/30 rounded-xl pl-10 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-aurora-cyan"
            />
          </div>

          {/* Station Filter Pills */}
          <div className="md:col-span-4 flex items-center space-x-1.5 overflow-x-auto">
            {['All', 'Bharati', 'Maitri', 'Himadri', 'Himansh'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStation(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedStation.toLowerCase() === st.toLowerCase()
                    ? 'bg-aurora-cyan text-navy-950 border-aurora-cyan shadow-glow-cyan'
                    : 'bg-navy-950 text-polar-300 border-polar-500/20 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Discipline Select */}
          <div className="md:col-span-2">
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full bg-navy-950 border border-polar-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-aurora-cyan font-semibold"
            >
              <option value="All">All Disciplines</option>
              <option value="Oceanography">Oceanography</option>
              <option value="Paleoclimatology">Paleoclimatology</option>
              <option value="Atmospheric Physics">Atmospheric Physics</option>
              <option value="Glaciology">Glaciology</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-navy-900/80 border border-polar-500/30 hover:border-aurora-cyan/60 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-polar-400 font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-polar-900 border border-polar-500/30 text-aurora-cyan font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {record.station_name} Station
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-polar-400" />
                    {record.expedition_year}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-aurora-cyan transition-colors mb-2 leading-snug">
                  {record.title}
                </h3>

                <div className="text-xs text-polar-400 font-medium mb-3">
                  Author: {record.author} | <span className="text-aurora-cyan">{record.discipline}</span>
                </div>

                <p className="text-xs text-polar-200 leading-relaxed line-clamp-3 mb-4">
                  {record.abstract}
                </p>

                {record.key_findings && record.key_findings.length > 0 && (
                  <div className="bg-navy-950/80 p-3 rounded-xl border border-polar-500/20 mb-4 space-y-1">
                    <div className="text-[10px] font-bold font-mono text-polar-400 uppercase">Key Finding Highlight:</div>
                    <div className="text-xs text-polar-200 line-clamp-1 font-medium">
                      • {record.key_findings[0]}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-polar-500/10 pt-4 text-xs">
                <span className="text-polar-400 flex items-center gap-1 font-mono">
                  <FileText className="w-3.5 h-3.5 text-aurora-cyan" />
                  PDF Available
                </span>

                <Link
                  href={`/research/${record.id}`}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-polar-900 border border-polar-500/30 text-aurora-cyan font-bold hover:bg-polar-600 hover:text-white transition-all shadow"
                >
                  <span>Explore Record & Media</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-16 text-center text-polar-400 space-y-2">
            <BookOpen className="w-12 h-12 text-polar-500 mx-auto animate-pulse" />
            <div className="text-lg font-bold text-white">No research records found</div>
            <div className="text-xs">Try adjusting your search terms or station filter.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResearchVaultPage() {
  return (
    <div className="min-h-screen bg-navy-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-polar-500/20 pb-6">
        <div className="flex items-center space-x-2 text-xs font-mono text-aurora-cyan font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>MoES Open Scientific Data Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Polar Scientific Research Vault
        </h1>
        <p className="text-sm text-polar-300 max-w-2xl mt-1">
          Explore peer-reviewed research papers, glaciological reports, and oceanographic datasets from Maitri, Bharati, Himadri, and Himansh.
        </p>
      </div>

      <Suspense fallback={
        <div className="py-12 text-center text-polar-300">
          <div className="w-8 h-8 border-2 border-aurora-cyan border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          Loading Scientific Vault...
        </div>
      }>
        <VaultContent />
      </Suspense>
    </div>
  );
}
