'use client';

import React, { useState } from 'react';
import { Sparkles, MessageCircle, Share2, Newspaper, Copy, Check } from 'lucide-react';
import { MediaPost } from '@/lib/mock-data';

interface MediaGeneratorProps {
  paperTitle: string;
  paperAuthor: string;
  station: string;
  abstract: string;
  keyFindings: string[];
}

export default function MediaGenerator({
  paperTitle,
  paperAuthor,
  station,
  abstract,
  keyFindings,
}: MediaGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [mediaData, setMediaData] = useState<MediaPost['social_carousel'] & { kids_fact: string; press_release: string } | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/generate-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: paperTitle,
          author: paperAuthor,
          station,
          abstract,
          keyFindings,
        }),
      });

      const result = await response.json();
      if (result.success && result.media) {
        setMediaData({
          slide1: result.media.socialCarousel.slide1,
          slide2: result.media.socialCarousel.slide2,
          slide3: result.media.socialCarousel.slide3,
          hashtags: result.media.socialCarousel.hashtags,
          kids_fact: result.media.kidsFact,
          press_release: result.media.pressRelease,
        });
      }
    } catch (err) {
      console.error('Failed to generate media:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="bg-white/90 dark:bg-navy-900/90 border border-slate-200 dark:border-polar-500/30 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 transition-colors duration-300">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-polar-500/20 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-600/30 border border-purple-300 dark:border-purple-400 text-purple-700 dark:text-purple-300">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">
              AI Paper-to-Post Communication Engine
            </h3>
            <p className="text-xs text-slate-600 dark:text-polar-300">
              Transform published polar research into multi-audience media content (Kids, Social Carousel, Press Release).
            </p>
          </div>
        </div>

        {!mediaData && (
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-sky-600 to-aurora-cyan text-white dark:text-navy-950 font-bold text-sm shadow-glow-cyan hover:brightness-110 transition-all flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white dark:border-navy-950 border-t-transparent rounded-full animate-spin"></div>
                <span>Generating AI Posts...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Media Content</span>
              </>
            )}
          </button>
        )}
      </div>

      {mediaData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {/* Card 1: Kids Fact */}
          <div className="bg-amber-50/60 dark:bg-navy-950/90 border border-amber-200 dark:border-polar-500/20 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-bold font-mono text-amber-700 dark:text-amber-400 uppercase">
                  <MessageCircle className="w-4 h-4" />
                  Junior Cadet (Ages 6-12)
                </span>
                <button
                  onClick={() => copyToClipboard(mediaData.kids_fact, 'kids')}
                  className="text-slate-400 dark:text-polar-400 hover:text-slate-900 dark:hover:text-white p-1 rounded transition-colors"
                >
                  {copiedSection === 'kids' ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-100/60 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-500/30 text-amber-950 dark:text-amber-100 text-sm leading-relaxed font-medium">
                {mediaData.kids_fact}
              </div>
            </div>
            <div className="mt-4 text-[10px] text-slate-500 dark:text-polar-400 font-mono">
              Designed for elementary education cards & interactive quizzes.
            </div>
          </div>

          {/* Card 2: Social Media Carousel */}
          <div className="bg-sky-50/60 dark:bg-navy-950/90 border border-sky-200 dark:border-polar-500/20 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-aurora-cyan/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-bold font-mono text-sky-800 dark:text-aurora-cyan uppercase">
                  <Share2 className="w-4 h-4" />
                  Social Media Carousel (3 Slides)
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${mediaData.slide1}\n\n${mediaData.slide2}\n\n${mediaData.slide3}\n\n${mediaData.hashtags.join(' ')}`,
                      'social'
                    )
                  }
                  className="text-slate-400 dark:text-polar-400 hover:text-slate-900 dark:hover:text-white p-1 rounded transition-colors"
                >
                  {copiedSection === 'social' ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/80 dark:bg-polar-900/60 border border-sky-200 dark:border-polar-500/20 text-slate-900 dark:text-white font-medium">
                  <span className="text-sky-700 dark:text-aurora-cyan font-mono font-bold mr-1">Slide 1:</span>
                  {mediaData.slide1}
                </div>
                <div className="p-2.5 rounded-lg bg-white/80 dark:bg-polar-900/60 border border-sky-200 dark:border-polar-500/20 text-slate-900 dark:text-white font-medium">
                  <span className="text-sky-700 dark:text-aurora-cyan font-mono font-bold mr-1">Slide 2:</span>
                  {mediaData.slide2}
                </div>
                <div className="p-2.5 rounded-lg bg-white/80 dark:bg-polar-900/60 border border-sky-200 dark:border-polar-500/20 text-slate-900 dark:text-white font-medium">
                  <span className="text-sky-700 dark:text-aurora-cyan font-mono font-bold mr-1">Slide 3:</span>
                  {mediaData.slide3}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {mediaData.hashtags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] text-sky-800 dark:text-aurora-cyan font-mono bg-sky-100 dark:bg-polar-900 px-1.5 py-0.5 rounded border border-sky-200 dark:border-polar-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 text-[10px] text-slate-500 dark:text-polar-400 font-mono">
              Ready to copy for Instagram, Twitter / X, and LinkedIn.
            </div>
          </div>

          {/* Card 3: MoES Official Press Release */}
          <div className="bg-purple-50/60 dark:bg-navy-950/90 border border-purple-200 dark:border-polar-500/20 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-bold font-mono text-purple-800 dark:text-purple-300 uppercase">
                  <Newspaper className="w-4 h-4" />
                  Official Press Bulletin
                </span>
                <button
                  onClick={() => copyToClipboard(mediaData.press_release, 'press')}
                  className="text-slate-400 dark:text-polar-400 hover:text-slate-900 dark:hover:text-white p-1 rounded transition-colors"
                >
                  {copiedSection === 'press' ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-100/60 dark:bg-purple-950/20 border border-purple-300 dark:border-purple-500/30 text-purple-950 dark:text-purple-100 text-xs leading-relaxed font-sans">
                {mediaData.press_release}
              </div>
            </div>
            <div className="mt-4 text-[10px] text-slate-500 dark:text-polar-400 font-mono">
              Formal release format for Ministry press distribution.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
