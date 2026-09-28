'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Plus, BookOpen, MapPin, Tag } from 'lucide-react';
import { PolarFactCard } from '@/lib/gemini';

export default function LearnCardsPage() {
  const [cards, setCards] = useState<PolarFactCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const fetchCards = async (offset: number = 0, count: number = 10) => {
    try {
      const res = await fetch('/api/generate-facts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count, offset })
      });
      const data = await res.json();
      if (data.cards && data.cards.length > 0) {
        if (offset === 0) {
          setCards(data.cards);
        } else {
          setCards(prev => [...prev, ...data.cards]);
        }
      }
    } catch (err) {
      console.error('Error fetching polar fact cards:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchCards(0, 10);
  }, []);

  const handleLoadMore = () => {
    setLoadingMore(true);
    fetchCards(cards.length, 10);
  };

  return (
    <div className="min-h-screen bg-bg-main py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 transition-colors duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stroke pb-6">
        <div className="space-y-2">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-xs font-medium text-brand-primary hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Smart Education</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-stroke text-brand-primary flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-content-main">
                Polar Frontier Educational Series
              </h1>
              <p className="text-xs text-content-muted mt-0.5 font-medium">
                Explore real polar wildlife, glaciology, oceanography, and atmospheric research cards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-surface border border-stroke animate-pulse p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-bg-secondary" />
              <div className="h-6 w-3/4 bg-bg-secondary rounded" />
              <div className="h-16 bg-bg-secondary rounded" />
            </div>
          ))}
        </div>
      ) : (
        /* Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              className="group relative overflow-hidden rounded-2xl border border-stroke shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between min-h-[300px]"
              style={{
                backgroundImage: `url(${card.bgImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Faint Dark Overlay for 100% Readable White Text */}
              <div className="absolute inset-0 bg-slate-950/75 dark:bg-black/80 backdrop-blur-[2px] transition-opacity group-hover:bg-slate-950/70" />

              {/* Card Content Layer */}
              <div className="relative z-10 p-6 space-y-4 text-white flex flex-col justify-between h-full">
                {/* Top Header: Badge Number & Category */}
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono font-extrabold text-sm flex items-center justify-center">
                    {card.number}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-cyan-300 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{card.category}</span>
                  </span>
                </div>

                {/* Main Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Station / Region Tag */}
                <div className="pt-2 border-t border-white/15 flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 font-bold">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{card.stationOrRegion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Generate 10 More Cards Button */}
      {!loading && (
        <div className="pt-6 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-8 py-4 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm shadow-lg transition-all flex items-center gap-3 disabled:opacity-50 btn-game"
          >
            {loadingMore ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating 10 New Fact Cards...</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>More</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
