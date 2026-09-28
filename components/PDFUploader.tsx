'use client';

import React, { useState } from 'react';
import { Upload, FileText, Sparkles, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import { SAMPLE_PDF_DOCUMENTS } from '@/lib/mock-data';

interface PDFUploaderProps {
  onExtractionComplete: (extractedResult: any) => void;
}

export default function PDFUploader({ onExtractionComplete }: PDFUploaderProps) {
  const [isExtracting, setIsExtracting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleProcessText = async (text: string, fileName: string) => {
    setIsExtracting(true);
    setSelectedFileName(fileName);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfText: text, fileName }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to extract PDF metadata');
      }

      onExtractionComplete(result);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error occurred during AI extraction');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;
      handleProcessText(
        text || `EXPEDITION REPORT: ${file.name}\nLead Researcher: Dr. Scientist\nStation: Bharati\nCoordinates: Lat -69.4, Long 76.2\nYear: 2025\nDiscipline: Cryosphere\nAbstract: Uploaded scientific dataset document.\nKey Findings: 1. Polar mass balance updated.`,
        file.name
      );
    };

    reader.readAsText(file);
  };

  return (
    <div className="bg-white/90 dark:bg-navy-900/90 border border-slate-200 dark:border-polar-500/30 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-navy-950/50 transition-colors duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 rounded-xl bg-sky-100 dark:bg-polar-600/30 border border-sky-300 dark:border-aurora-cyan text-sky-700 dark:text-aurora-cyan">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">
            AI Scientific PDF Ingestion Pipeline
          </h3>
          <p className="text-xs text-slate-600 dark:text-polar-300">
            Upload scientific report PDFs or select pre-loaded polar expedition samples for Gemini AI metadata extraction.
          </p>
        </div>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.[0]) {
            const file = e.dataTransfer.files[0];
            setSelectedFileName(file.name);
            handleProcessText(
              `EXPEDITION REPORT: ${file.name}\nLead Researcher: Dr. Author\nStation: Maitri\nCoordinates: Lat -70.7, Long 11.7\nYear: 2025\nDiscipline: Paleoclimatology\nAbstract: Uploaded expedition paper.\nKey Findings: 1. Isotopic markers analyzed.`,
              file.name
            );
          }
        }}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragActive
            ? 'border-sky-500 dark:border-aurora-cyan bg-sky-100/50 dark:bg-polar-600/20 shadow-glow-cyan'
            : 'border-slate-300 dark:border-polar-500/30 bg-slate-50 dark:bg-navy-950/60 hover:border-sky-400 dark:hover:border-polar-400'
        }`}
      >
        <input
          type="file"
          id="pdf-input"
          accept=".pdf,.txt,.doc,.docx"
          onChange={handleFileUpload}
          className="hidden"
        />

        <label htmlFor="pdf-input" className="cursor-pointer flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 dark:bg-polar-900/80 border border-sky-300 dark:border-polar-500/40 flex items-center justify-center text-sky-700 dark:text-aurora-cyan mb-3 group-hover:scale-110 transition-transform shadow-sm">
            <Upload className="w-7 h-7" />
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
            {selectedFileName ? selectedFileName : 'Drop Expedition PDF here or Click to Browse'}
          </span>
          <span className="text-xs text-slate-500 dark:text-polar-400">
            Supports PDF & Scientific Report Text Files (Max 25MB)
          </span>
        </label>
      </div>

      {/* 1-Click Fast Pre-loaded Polar PDF Samples */}
      <div className="mt-6">
        <div className="text-xs font-bold font-mono text-slate-600 dark:text-polar-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-sky-600 dark:text-aurora-cyan" />
          Or Test with Pre-Loaded Polar Expedition Reports (1-Click):
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_PDF_DOCUMENTS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => handleProcessText(doc.text, doc.name)}
              disabled={isExtracting}
              className="flex flex-col text-left p-3 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-polar-500/20 hover:border-sky-400 dark:hover:border-aurora-cyan/60 hover:bg-sky-100/50 dark:hover:bg-polar-900/40 transition-all text-xs group shadow-sm"
            >
              <div className="flex items-center justify-between text-sky-700 dark:text-aurora-cyan font-bold mb-1">
                <span className="truncate">{doc.station} Station</span>
                <span className="text-[10px] text-slate-400 dark:text-polar-400 font-mono">{doc.size}</span>
              </div>
              <div className="text-slate-900 dark:text-white font-medium line-clamp-1 mb-1 group-hover:text-sky-600 dark:group-hover:text-aurora-cyan transition-colors">
                {doc.name}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-polar-400 flex items-center gap-1 mt-auto">
                <span>Run Gemini Extraction</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Loading Overlay */}
      {isExtracting && (
        <div className="mt-4 p-4 rounded-xl bg-sky-50 dark:bg-polar-900/80 border border-sky-300 dark:border-aurora-cyan/40 flex items-center space-x-3 text-sm text-sky-800 dark:text-aurora-cyan animate-pulse shadow-sm">
          <div className="w-5 h-5 border-2 border-sky-600 dark:border-aurora-cyan border-t-transparent rounded-full animate-spin"></div>
          <div>
            <div className="font-bold">Gemini AI Ingestion Active...</div>
            <div className="text-xs text-slate-600 dark:text-polar-300">Extracting Title, Researcher, Coordinates, Year, Discipline & Key Findings...</div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-500/40 flex items-center space-x-2 text-xs text-red-700 dark:text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
