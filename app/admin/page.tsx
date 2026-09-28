'use client';

import React, { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import { ShieldCheck, CheckCircle2, XCircle, Clock, FileText, Sparkles, Check, MapPin, Eye } from 'lucide-react';
import { INITIAL_RESEARCH_RECORDS, ResearchRecord } from '@/lib/mock-data';

export default function AdminConsolePage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // Load queued submissions or seed sample pending review paper if empty
    const saved = localStorage.getItem('polarquest_all_submissions');
    let list: any[] = [];
    if (saved) {
      try {
        list = JSON.parse(saved);
      } catch (e) {}
    }

    if (list.length === 0) {
      list = [
        {
          id: 'rec-pending-01',
          station_id: 'maitri-antarctica',
          station_name: 'Maitri',
          created_by: 'researcher-02',
          title: 'Schirmacher Oasis Paleoclimate Lake Sediment Isotope Chronology',
          author: 'Dr. Rajesh Kumar & NCPOR Cryosphere Division',
          discipline: 'Paleoclimatology',
          expedition_year: 2025,
          abstract: 'Sediment cores extracted from Lake Priyadarshini at Schirmacher Oasis provide a 12,000-year continuous isotope record of Holocene climate fluctuations in East Antarctica.',
          key_findings: [
            '12,000-year uninterrupted paleoclimate sediment record established.',
            'Distinct isotopic markers identified for Holocene Thermal Maximum.',
            'Cyanobacterial mat lipids indicate historic ice-free summer lake durations.'
          ],
          latitude: -70.7,
          longitude: 11.7,
          file_url: '/samples/schirmacher_lake_sediment.pdf',
          status: 'pending_review',
          created_at: new Date().toISOString(),
        }
      ];
      localStorage.setItem('polarquest_all_submissions', JSON.stringify(list));
    }

    setSubmissions(list);
  }, []);

  const handleApproveAndPublish = (recordId: string) => {
    const updated = submissions.map((rec) => {
      if (rec.id === recordId) {
        return { ...rec, status: 'published', updated_at: new Date().toISOString() };
      }
      return rec;
    });

    setSubmissions(updated);
    localStorage.setItem('polarquest_all_submissions', JSON.stringify(updated));

    // Update public records storage
    const published = updated.filter((r) => r.status === 'published');
    localStorage.setItem('polarquest_published_records', JSON.stringify(published));

    setNotification('Research Record APPROVED and PUBLISHED to Public Globe & Vault!');
    setSelectedRecord(null);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleRejectRecord = (recordId: string) => {
    const updated = submissions.map((rec) => {
      if (rec.id === recordId) {
        return { ...rec, status: 'rejected', updated_at: new Date().toISOString() };
      }
      return rec;
    });

    setSubmissions(updated);
    localStorage.setItem('polarquest_all_submissions', JSON.stringify(updated));

    setNotification('Research Record marked as REJECTED.');
    setSelectedRecord(null);
    setTimeout(() => setNotification(null), 4000);
  };

  const pendingList = submissions.filter((s) => s.status === 'pending_review');
  const publishedList = submissions.filter((s) => s.status === 'published');
  const rejectedList = submissions.filter((s) => s.status === 'rejected');

  return (
    <AuthGuard allowedRoles={['admin']}>
      <div className="min-h-screen bg-slate-50 dark:bg-navy-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 transition-colors duration-300">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-polar-500/20 pb-6">
          <div className="flex items-center space-x-2 text-xs font-mono text-purple-700 dark:text-purple-300 font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Administrator Control Console</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            MoES Scientific Review & Publishing Workflow
          </h1>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center space-x-2 animate-in fade-in duration-300 shadow-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}

        {/* Stats Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/90 dark:bg-navy-900/80 border border-amber-300 dark:border-amber-500/40 p-5 rounded-2xl flex items-center justify-between shadow-md shadow-slate-200/50 dark:shadow-none">
            <div>
              <div className="text-3xl font-black text-amber-600 dark:text-amber-300 font-mono">{pendingList.length}</div>
              <div className="text-xs text-slate-600 dark:text-polar-300 font-semibold uppercase mt-0.5">Pending Review</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-300">
              <Clock className="w-6 h-6 animate-spin" />
            </div>
          </div>

          <div className="bg-white/90 dark:bg-navy-900/80 border border-emerald-300 dark:border-emerald-500/40 p-5 rounded-2xl flex items-center justify-between shadow-md shadow-slate-200/50 dark:shadow-none">
            <div>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-300 font-mono">{publishedList.length}</div>
              <div className="text-xs text-slate-600 dark:text-polar-300 font-semibold uppercase mt-0.5 font-mono">Published Records</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-300">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white/90 dark:bg-navy-900/80 border border-red-300 dark:border-red-500/40 p-5 rounded-2xl flex items-center justify-between shadow-md shadow-slate-200/50 dark:shadow-none">
            <div>
              <div className="text-3xl font-black text-red-600 dark:text-red-400 font-mono">{rejectedList.length}</div>
              <div className="text-xs text-slate-600 dark:text-polar-300 font-semibold uppercase mt-0.5 font-mono">Rejected Records</div>
            </div>
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400">
              <XCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Pending Review Queue */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            <span>Pending Scientific Submissions</span>
          </h2>

          {pendingList.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {pendingList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/90 dark:bg-navy-900/90 border border-amber-300 dark:border-amber-500/30 hover:border-amber-500 dark:hover:border-amber-400 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-navy-950/50 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded bg-sky-100 dark:bg-polar-900 border border-sky-300 dark:border-polar-500/30 text-sky-900 dark:text-aurora-cyan font-bold">
                        {item.station_name} Station
                      </span>
                      <span className="text-slate-600 dark:text-polar-300">• {item.discipline}</span>
                      <span className="text-slate-500 dark:text-polar-400">• Expedition {item.expedition_year}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-polar-300 line-clamp-2">{item.abstract}</p>
                    <div className="text-xs text-slate-500 dark:text-polar-400">Submitted by: {item.author}</div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <button
                      onClick={() => setSelectedRecord(item)}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-polar-900 border border-slate-300 dark:border-polar-500/30 text-slate-700 dark:text-polar-200 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-all flex items-center space-x-1.5"
                    >
                      <Eye className="w-4 h-4 text-sky-600 dark:text-aurora-cyan" />
                      <span>Review Details</span>
                    </button>

                    <button
                      onClick={() => handleApproveAndPublish(item.id)}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Publish</span>
                    </button>

                    <button
                      onClick={() => handleRejectRecord(item.id)}
                      className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-500/40 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 text-xs font-bold transition-all flex items-center space-x-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 dark:text-polar-400 space-y-2 bg-white/80 dark:bg-navy-900/60 rounded-2xl border border-slate-200 dark:border-polar-500/20 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 dark:text-emerald-400 mx-auto" />
              <div className="text-base font-bold text-slate-900 dark:text-white">Review Queue Clear</div>
              <div className="text-xs">All submitted expedition research papers have been reviewed.</div>
            </div>
          )}
        </div>

        {/* Modal for Detailed Review */}
        {selectedRecord && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 dark:bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-polar-500/40 rounded-2xl p-6 max-w-2xl w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-polar-500/20 pb-3">
                <span className="text-xs font-mono font-bold text-sky-700 dark:text-aurora-cyan uppercase">
                  Admin Verification Inspector
                </span>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-slate-400 dark:text-polar-400 hover:text-slate-900 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedRecord.title}</h2>
              <div className="text-xs text-slate-600 dark:text-polar-300">
                Author: {selectedRecord.author} | Station: {selectedRecord.station_name} | Lat: {selectedRecord.latitude}°, Long: {selectedRecord.longitude}°
              </div>

              <div className="bg-slate-50 dark:bg-navy-950 p-4 rounded-xl border border-slate-200 dark:border-polar-500/20 text-xs text-slate-700 dark:text-polar-200 leading-relaxed">
                {selectedRecord.abstract}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-polar-500/20">
                <button
                  onClick={() => handleRejectRecord(selectedRecord.id)}
                  className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-500/40 text-red-700 dark:text-red-300 text-xs font-bold hover:bg-red-100 transition-colors"
                >
                  Reject Paper
                </button>
                <button
                  onClick={() => handleApproveAndPublish(selectedRecord.id)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-lg hover:bg-emerald-500 transition-colors"
                >
                  Approve & Publish Record
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
