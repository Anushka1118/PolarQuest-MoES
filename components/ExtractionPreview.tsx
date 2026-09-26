'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Edit3, Send, Save, MapPin, ShieldCheck, Sparkles, X } from 'lucide-react';
import { ExtractedPaperData } from '@/lib/validation';

interface ExtractionPreviewProps {
  extractedResult: {
    data: ExtractedPaperData;
    validation: {
      isValid: boolean;
      stationMatched: string;
      expectedRegion: string;
      errors: string[];
    };
    fileName: string;
    isAiGenerated: boolean;
  };
  onSubmitForReview: (formData: ExtractedPaperData) => void;
  onSaveDraft: (formData: ExtractedPaperData) => void;
}

export default function ExtractionPreview({
  extractedResult,
  onSubmitForReview,
  onSaveDraft,
}: ExtractionPreviewProps) {
  const [formData, setFormData] = useState<ExtractedPaperData>(extractedResult.data);
  const [isEditing, setIsEditing] = useState(false);

  const validation = extractedResult.validation;

  return (
    <div className="bg-navy-900/90 border border-polar-500/30 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-polar-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-mono tracking-widest text-aurora-cyan font-bold px-2 py-0.5 rounded bg-polar-900 border border-polar-500/30">
              AI Extraction Preview
            </span>
            <span className="text-xs text-polar-400 font-mono">
              File: {extractedResult.fileName}
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-white mt-1">
            Verify & Submit Scientific Metadata
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-polar-900 border border-polar-500/30 text-polar-200 hover:text-white hover:border-aurora-cyan transition-all text-xs font-semibold"
          >
            <Edit3 className="w-4 h-4 text-aurora-cyan" />
            <span>{isEditing ? 'Done Editing' : 'Edit Fields'}</span>
          </button>
        </div>
      </div>

      {/* Validation Status Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Zod Schema Validation Badge */}
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-emerald-300 font-mono uppercase">
              Zod Schema Validated
            </div>
            <div className="text-xs text-polar-200 mt-0.5">
              All 9 required scientific metadata fields match MoES portal data specification.
            </div>
          </div>
        </div>

        {/* Geographic Coordinate Validation Badge */}
        <div
          className={`p-3.5 rounded-xl border flex items-start space-x-3 ${
            validation.isValid
              ? 'bg-polar-900/60 border-aurora-cyan/40 text-aurora-cyan'
              : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
          }`}
        >
          {validation.isValid ? (
            <ShieldCheck className="w-5 h-5 text-aurora-cyan shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="text-xs font-bold font-mono uppercase">
              Geographic Boundary Check: {validation.isValid ? 'PASSED ✓' : 'WARNING'}
            </div>
            <div className="text-xs text-polar-200 mt-0.5">
              {validation.isValid
                ? `Coordinates [Lat: ${formData.latitude}°, Long: ${formData.longitude}°] verified within expected ${validation.expectedRegion} boundary for ${formData.station}.`
                : validation.errors.join('; ')}
            </div>
          </div>
        </div>
      </div>

      {/* Extracted Metadata Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-polar-300 uppercase tracking-wider mb-1 font-mono">
              Research Paper Title
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-navy-950 border border-polar-500/30 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-aurora-cyan disabled:opacity-90"
            />
          </div>

          {/* Lead Researcher */}
          <div>
            <label className="block text-xs font-semibold text-polar-300 uppercase tracking-wider mb-1 font-mono">
              Lead Researcher / Authors
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.leadResearcher}
              onChange={(e) => setFormData({ ...formData, leadResearcher: e.target.value })}
              className="w-full bg-navy-950 border border-polar-500/30 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-aurora-cyan disabled:opacity-90"
            />
          </div>

          {/* Station */}
          <div>
            <label className="block text-xs font-semibold text-polar-300 uppercase tracking-wider mb-1 font-mono">
              Target Station
            </label>
            <select
              disabled={!isEditing}
              value={formData.station}
              onChange={(e) => setFormData({ ...formData, station: e.target.value })}
              className="w-full bg-navy-950 border border-polar-500/30 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-aurora-cyan disabled:opacity-90"
            >
              <option value="Maitri">Maitri (Antarctica)</option>
              <option value="Bharati">Bharati (Antarctica)</option>
              <option value="Himadri">Himadri (Arctic)</option>
              <option value="Himansh">Himansh (Himalayas)</option>
            </select>
          </div>

          {/* Latitude & Longitude */}
          <div>
            <label className="block text-xs font-semibold text-polar-300 uppercase tracking-wider mb-1 font-mono">
              Latitude (Degrees)
            </label>
            <input
              type="number"
              step="0.1"
              disabled={!isEditing}
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
              className="w-full bg-navy-950 border border-polar-500/30 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-aurora-cyan disabled:opacity-90"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-polar-300 uppercase tracking-wider mb-1 font-mono">
              Longitude (Degrees)
            </label>
            <input
              type="number"
              step="0.1"
              disabled={!isEditing}
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
              className="w-full bg-navy-950 border border-polar-500/30 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-aurora-cyan disabled:opacity-90"
            />
          </div>

          {/* Expedition Year */}
          <div>
            <label className="block text-xs font-semibold text-polar-300 uppercase tracking-wider mb-1 font-mono">
              Expedition Year
            </label>
            <input
              type="number"
              disabled={!isEditing}
              value={formData.expeditionYear}
              onChange={(e) => setFormData({ ...formData, expeditionYear: parseInt(e.target.value) || 2025 })}
              className="w-full bg-navy-950 border border-polar-500/30 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-aurora-cyan disabled:opacity-90"
            />
          </div>

          {/* Discipline */}
          <div>
            <label className="block text-xs font-semibold text-polar-300 uppercase tracking-wider mb-1 font-mono">
              Scientific Discipline
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.discipline}
              onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
              className="w-full bg-navy-950 border border-polar-500/30 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-aurora-cyan disabled:opacity-90"
            />
          </div>
        </div>

        {/* Abstract */}
        <div>
          <label className="block text-xs font-semibold text-polar-300 uppercase tracking-wider mb-1 font-mono">
            Scientific Abstract
          </label>
          <textarea
            rows={3}
            disabled={!isEditing}
            value={formData.abstract}
            onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
            className="w-full bg-navy-950 border border-polar-500/30 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-aurora-cyan disabled:opacity-90"
          />
        </div>

        {/* Key Findings */}
        <div>
          <label className="block text-xs font-semibold text-polar-300 uppercase tracking-wider mb-1 font-mono">
            Key Findings (3 Points)
          </label>
          <div className="space-y-2">
            {formData.keyFindings.map((finding, idx) => (
              <input
                key={idx}
                type="text"
                disabled={!isEditing}
                value={finding}
                onChange={(e) => {
                  const updated = [...formData.keyFindings];
                  updated[idx] = e.target.value;
                  setFormData({ ...formData, keyFindings: updated });
                }}
                className="w-full bg-navy-950 border border-polar-500/30 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-aurora-cyan disabled:opacity-90"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 border-t border-polar-500/20 pt-4">
        <button
          onClick={() => onSaveDraft(formData)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-navy-950 border border-polar-500/30 text-polar-200 hover:text-white hover:border-polar-400 font-semibold text-sm transition-all flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save as Draft</span>
        </button>

        <button
          onClick={() => onSubmitForReview(formData)}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-polar-600 to-aurora-cyan text-navy-950 font-bold text-sm transition-all shadow-glow-cyan hover:brightness-110 flex items-center justify-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Submit for Admin Review</span>
        </button>
      </div>
    </div>
  );
}
