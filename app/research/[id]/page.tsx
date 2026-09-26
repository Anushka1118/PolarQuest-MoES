'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { INITIAL_RESEARCH_RECORDS, MOCK_MEDIA_POSTS, ResearchRecord } from '@/lib/mock-data';
import DatasetChart from '@/components/DatasetChart';
import MediaGenerator from '@/components/MediaGenerator';
import { ArrowLeft, BookOpen, MapPin, Calendar, Download, Share2, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ResearchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [record, setRecord] = useState<ResearchRecord | null>(null);

  useEffect(() => {
    // Search in default initial records or local storage
    let found = INITIAL_RESEARCH_RECORDS.find((r) => r.id === id);
    if (!found) {
      const saved = localStorage.getItem('polarquest_published_records');
      if (saved) {
        try {
          const list: ResearchRecord[] = JSON.parse(saved);
          found = list.find((r) => r.id === id);
        } catch (e) {}
      }
    }
    setRecord(found || INITIAL_RESEARCH_RECORDS[0]);
  }, [id]);

  if (!record) return null;

  return (
    <div className="min-h-screen bg-navy-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center space-x-2 text-xs font-mono text-polar-300 hover:text-aurora-cyan transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Research Vault</span>
      </button>

      {/* Paper Main Header Card */}
      <div className="bg-navy-900/90 border border-polar-500/30 rounded-2xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-aurora-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-polar-900 border border-polar-500/30 text-aurora-cyan text-xs font-bold font-mono flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {record.station_name} Station
          </span>
          <span className="px-3 py-1 rounded-full bg-navy-950 border border-polar-500/30 text-polar-300 text-xs font-mono">
            {record.discipline}
          </span>
          <span className="px-3 py-1 rounded-full bg-navy-950 border border-polar-500/30 text-polar-300 text-xs font-mono flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Expedition Year: {record.expedition_year}
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Peer-Reviewed & Admin Verified
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          {record.title}
        </h1>

        <div className="text-sm text-polar-300 font-medium border-y border-polar-500/10 py-3 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-polar-400">Lead Investigator:</span>{' '}
            <span className="text-white font-bold">{record.author}</span>
          </div>
          <div className="text-xs font-mono text-aurora-cyan">
            Coordinates: {record.latitude}° {record.latitude < 0 ? 'S' : 'N'}, {record.longitude}° {record.longitude < 0 ? 'W' : 'E'}
          </div>
        </div>

        {/* Abstract */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold font-mono text-polar-300 uppercase tracking-wider">
            Abstract Overview
          </h3>
          <p className="text-sm text-polar-200 leading-relaxed bg-navy-950 p-5 rounded-xl border border-polar-500/20">
            {record.abstract}
          </p>
        </div>

        {/* Key Findings */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold font-mono text-polar-300 uppercase tracking-wider">
            Key Scientific Findings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {record.key_findings.map((finding, idx) => (
              <div key={idx} className="bg-navy-950/80 p-4 rounded-xl border border-polar-500/20 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-aurora-cyan shrink-0 mt-0.5" />
                <span className="text-xs text-polar-200 leading-relaxed">{finding}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-polar-500/20 pt-6">
          <a
            href={record.file_url || '#'}
            download
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-polar-600 to-aurora-cyan text-navy-950 font-bold text-sm shadow-glow-cyan hover:brightness-110 transition-all flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Scientific PDF Report</span>
          </a>
        </div>
      </div>

      {/* Dataset Playground Component */}
      <DatasetChart />

      {/* AI Paper-to-Post Communication Engine Component */}
      <MediaGenerator
        paperTitle={record.title}
        paperAuthor={record.author}
        station={record.station_name}
        abstract={record.abstract}
        keyFindings={record.key_findings}
      />
    </div>
  );
}
