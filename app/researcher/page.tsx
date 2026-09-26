'use client';

import React, { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import PDFUploader from '@/components/PDFUploader';
import ExtractionPreview from '@/components/ExtractionPreview';
import { ExtractedPaperData } from '@/lib/validation';
import { FileText, Send, Clock, CheckCircle2, XCircle, Plus, BookOpen, AlertCircle } from 'lucide-react';

export default function ResearcherConsolePage() {
  const [extractedResult, setExtractedResult] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'ingestion' | 'submissions'>('ingestion');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // Load researcher submissions from local storage
    const saved = localStorage.getItem('polarquest_all_submissions');
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleExtractionComplete = (result: any) => {
    setExtractedResult(result);
    setNotification('PDF Metadata successfully extracted by Gemini AI! Review and submit below.');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSaveDraft = (data: ExtractedPaperData) => {
    const newRecord = {
      id: `rec-${Date.now()}`,
      station_id: `${data.station.toLowerCase()}-station`,
      station_name: data.station,
      created_by: 'researcher-01',
      title: data.title,
      author: data.leadResearcher,
      discipline: data.discipline,
      expedition_year: data.expeditionYear,
      abstract: data.abstract,
      key_findings: data.keyFindings,
      latitude: data.latitude,
      longitude: data.longitude,
      file_url: '/samples/uploaded_report.pdf',
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [newRecord, ...submissions];
    setSubmissions(updated);
    localStorage.setItem('polarquest_all_submissions', JSON.stringify(updated));

    setNotification('Draft saved successfully! You can find it under My Submissions tab.');
    setExtractedResult(null);
    setActiveTab('submissions');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmitForReview = (data: ExtractedPaperData) => {
    const newRecord = {
      id: `rec-${Date.now()}`,
      station_id: `${data.station.toLowerCase()}-station`,
      station_name: data.station,
      created_by: 'researcher-01',
      title: data.title,
      author: data.leadResearcher,
      discipline: data.discipline,
      expedition_year: data.expeditionYear,
      abstract: data.abstract,
      key_findings: data.keyFindings,
      latitude: data.latitude,
      longitude: data.longitude,
      file_url: '/samples/uploaded_report.pdf',
      status: 'pending_review',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [newRecord, ...submissions];
    setSubmissions(updated);
    localStorage.setItem('polarquest_all_submissions', JSON.stringify(updated));

    setNotification('Research record submitted for Admin review! State transitioned to pending_review.');
    setExtractedResult(null);
    setActiveTab('submissions');
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <AuthGuard allowedRoles={['researcher', 'admin']}>
      <div className="min-h-screen bg-navy-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-polar-500/20 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-aurora-cyan font-bold uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4" />
              <span>Researcher Console</span>
            </div>
            <h1 className="text-3xl font-black text-white">
              AI Expedition Report Ingestion Engine
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center bg-navy-900 p-1 rounded-xl border border-polar-500/30">
            <button
              onClick={() => setActiveTab('ingestion')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'ingestion'
                  ? 'bg-aurora-cyan text-navy-950 shadow-glow-cyan'
                  : 'text-polar-300 hover:text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>New PDF Ingestion</span>
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'submissions'
                  ? 'bg-aurora-cyan text-navy-950 shadow-glow-cyan'
                  : 'text-polar-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>My Submissions ({submissions.length})</span>
            </button>
          </div>
        </div>

        {/* Banner Notification */}
        {notification && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm font-semibold flex items-center space-x-2 animate-in fade-in duration-300">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Tab 1: PDF Ingestion */}
        {activeTab === 'ingestion' && (
          <div className="space-y-8">
            <PDFUploader onExtractionComplete={handleExtractionComplete} />

            {extractedResult && (
              <ExtractionPreview
                extractedResult={extractedResult}
                onSubmitForReview={handleSubmitForReview}
                onSaveDraft={handleSaveDraft}
              />
            )}
          </div>
        )}

        {/* Tab 2: My Submissions */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Track Ingestion Submissions</h2>
            {submissions.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {submissions.map((item) => (
                  <div
                    key={item.id}
                    className="bg-navy-900/80 border border-polar-500/30 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-mono mb-1">
                        <span className="text-aurora-cyan font-bold">{item.station_name} Station</span>
                        <span className="text-polar-400">• {item.discipline}</span>
                      </div>
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-polar-300 line-clamp-1 mt-1">{item.abstract}</p>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold font-mono uppercase flex items-center gap-1 ${
                          item.status === 'published'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : item.status === 'pending_review'
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                            : item.status === 'rejected'
                            ? 'bg-red-950 text-red-400 border border-red-500/30'
                            : 'bg-polar-900 text-polar-300 border border-polar-500/30'
                        }`}
                      >
                        {item.status === 'pending_review' ? (
                          <>
                            <Clock className="w-3.5 h-3.5 animate-spin" />
                            Pending Review
                          </>
                        ) : (
                          item.status
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-polar-400 space-y-2 bg-navy-900/60 rounded-2xl border border-polar-500/20">
                <FileText className="w-10 h-10 text-polar-500 mx-auto" />
                <div className="text-base font-bold text-white">No submissions yet</div>
                <div className="text-xs">Upload a PDF paper above to submit your first record.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
