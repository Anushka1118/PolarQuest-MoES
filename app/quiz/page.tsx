'use client';

import React from 'react';
import AIQuizGame from '@/components/AIQuizGame';
import { Trophy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-bg-main py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 transition-colors duration-300">
      {/* Header */}
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
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-content-main">
                Polar Science Quiz
              </h1>
              <p className="text-xs text-content-muted mt-0.5 font-medium">
                Test your climate, glaciology, and polar research knowledge across 10 interactive questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Quiz Component */}
      <div className="max-w-4xl mx-auto">
        <AIQuizGame />
      </div>
    </div>
  );
}
