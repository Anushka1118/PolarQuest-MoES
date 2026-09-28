'use client';

import React, { useState } from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Compass,
  BookOpen,
  ChevronRight,
  Flame,
  HelpCircle
} from 'lucide-react';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  funFact?: string;
}

const PRESET_TOPICS = [
  {
    id: 'antarctica',
    name: 'Antarctica & Bharati Station',
    icon: '❄️',
    desc: 'Larsemann Hills, Schirmacher Oasis, ice sheet dynamics, & krill ecosystems.'
  },
  {
    id: 'himalayas',
    name: 'Third Pole & Himalayan Glaciers',
    icon: '🏔️',
    desc: 'Station Himansh, mass balance, meltwater rivers, & GLOF monitoring.'
  },
  {
    id: 'arctic',
    name: 'High-Arctic Science & Svalbard',
    icon: '🌌',
    desc: 'Station Himadri (78°N), Arctic amplification, IndARC, & aurora borealis.'
  },
  {
    id: 'oceanography',
    name: 'Oceanography & Sea Level Rise',
    icon: '🌊',
    desc: 'Circumpolar currents, thermal stratification, ocean salinity, & coastline impacts.'
  },
  {
    id: 'climate',
    name: 'Climate Change & Polar Wildlife',
    icon: '🐧',
    desc: 'Albedo effect, methane permafrost release, emperor penguins, & polar bears.'
  }
];

export default function AIQuizGame() {
  const [selectedTopic, setSelectedTopic] = useState<string>('Antarctica & Bharati Station');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'Novice' | 'Specialist' | 'Master'>('Specialist');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [gameStage, setGameStage] = useState<'setup' | 'playing' | 'results'>('setup');
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [streak, setStreak] = useState<number>(0);

  const activeTopicName = customTopic.trim() || selectedTopic;

  const handleGenerateQuiz = async () => {
    setLoading(true);
    setGameStage('setup');
    setUserAnswers([]);
    setCurrentQuestionIdx(0);
    setStreak(0);
    setSelectedOption(null);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: activeTopicName,
          difficulty,
          count: 10
        })
      });

      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setGameStage('playing');
      } else {
        alert('Could not load quiz questions. Please try again.');
      }
    } catch (err) {
      console.error('Quiz fetch error:', err);
      alert('Failed to connect to Quiz service.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    const currentQ = questions[currentQuestionIdx];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    
    if (isCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    const updatedAnswers = [...userAnswers, selectedOption];
    setUserAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setGameStage('results');
    }
  };

  const calculateScore = () => {
    let score = 0;
    userAnswers.forEach((ans, idx) => {
      if (questions[idx] && ans === questions[idx].correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const getRankBadge = (score: number, total: number) => {
    const pct = (score / total) * 100;
    if (pct >= 90) return { title: 'Polar Chief Scientist 🏅', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' };
    if (pct >= 70) return { title: 'Expedition Senior Specialist 🌟', color: 'text-brand-primary bg-brand-primary/10 border-brand-primary/30' };
    if (pct >= 50) return { title: 'Cryosphere Scholar 📘', color: 'text-brand-accent bg-brand-accent/10 border-brand-accent/30' };
    return { title: 'Polar Cadet ❄️', color: 'text-content-muted bg-bg-secondary border-stroke' };
  };

  return (
    <div className="bg-surface border border-stroke rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stroke pb-5">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-content-main flex items-center gap-2">
            <span>Polar Science Quiz</span>
          </h2>
          <p className="text-xs text-content-muted">
            Select a research domain or enter a custom topic to take a 10-question quiz.
          </p>
        </div>

        {gameStage === 'playing' && (
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Streak: {streak}x</span>
            </div>
            <div className="px-3 py-1 rounded-lg bg-bg-secondary border border-stroke text-brand-primary font-mono text-xs font-semibold">
              Question {currentQuestionIdx + 1} / {questions.length}
            </div>
          </div>
        )}
      </div>

      {/* STAGE 1: SETUP / TOPIC SELECTION */}
      {gameStage === 'setup' && (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-bold text-content-main uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-primary" />
              <span>1. Choose a Research Domain</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PRESET_TOPICS.map(topic => {
                const isSelected = selectedTopic === topic.name && !customTopic.trim();
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic.name);
                      setCustomTopic('');
                    }}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'bg-bg-secondary border-brand-primary text-content-main ring-1 ring-brand-primary'
                        : 'bg-surface border-stroke text-content-main hover:border-brand-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{topic.icon}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-content-main">{topic.name}</h4>
                      <p className="text-[11px] text-content-muted mt-1 line-clamp-2 leading-relaxed">
                        {topic.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Topic Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-content-main uppercase tracking-wider">
              Or Enter a Custom Topic
            </label>
            <input
              type="text"
              value={customTopic}
              onChange={e => setCustomTopic(e.target.value)}
              placeholder="e.g. Penguin adaptation, Glacial outbursts, Ocean currents..."
              className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-stroke text-content-main placeholder:text-content-muted text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary font-medium"
            />
            {customTopic.trim() && (
              <p className="text-xs text-brand-primary font-mono font-medium">
                Generating quiz topic: &quot;{customTopic}&quot;
              </p>
            )}
          </div>

          {/* Difficulty Selector */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-bold text-content-main uppercase tracking-wider">
              2. Select Difficulty
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Novice', 'Specialist', 'Master'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                    difficulty === lvl
                      ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                      : 'bg-bg-secondary border-stroke text-content-muted hover:text-content-main'
                  }`}
                >
                  {lvl === 'Novice' && '🌱 Cadet'}
                  {lvl === 'Specialist' && '⚡ Specialist'}
                  {lvl === 'Master' && '🎓 Chief Scientist'}
                </button>
              ))}
            </div>
          </div>

          {/* Start Quiz Button */}
          <button
            onClick={handleGenerateQuiz}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 btn-game"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Preparing Questions...</span>
              </>
            ) : (
              <>
                <span>Start Quiz (10 Questions)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* STAGE 2: PLAYING THE QUIZ */}
      {gameStage === 'playing' && questions.length > 0 && (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-bg-secondary h-2 rounded-full overflow-hidden border border-stroke">
            <div
              className="bg-brand-primary h-full transition-all duration-300"
              style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="bg-bg-secondary border border-stroke rounded-xl p-5 space-y-2">
            <span className="text-[11px] font-mono font-semibold text-brand-primary uppercase">
              Question #{currentQuestionIdx + 1}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-content-main leading-relaxed">
              {questions[currentQuestionIdx].question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {questions[currentQuestionIdx].options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOption === idx;
              const isCorrectChoice = idx === questions[currentQuestionIdx].correctAnswer;

              let optionStyle = 'bg-surface border-stroke text-content-main hover:border-brand-primary/60';
              
              if (selectedOption !== null) {
                if (isCorrectChoice) {
                  optionStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold';
                } else {
                  optionStyle = 'opacity-40 border-stroke';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={selectedOption !== null}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${optionStyle}`}
                >
                  <span className={`w-6 h-6 rounded text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-brand-primary text-white' : 'bg-bg-secondary text-content-muted'
                  }`}>
                    {letter}
                  </span>
                  <span className="text-sm font-medium leading-relaxed pt-0.5">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Scientific Explanation Box */}
          {selectedOption !== null && (
            <div className="bg-bg-secondary border border-stroke rounded-xl p-4 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-primary">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explanation</span>
              </div>
              <p className="text-xs text-content-muted leading-relaxed font-medium">
                {questions[currentQuestionIdx].explanation}
              </p>
              {questions[currentQuestionIdx].funFact && (
                <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 pt-1">
                  💡 {questions[currentQuestionIdx].funFact}
                </p>
              )}
            </div>
          )}

          {/* Next Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              className="px-6 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm btn-game"
            >
              <span>{currentQuestionIdx + 1 === questions.length ? 'View Results' : 'Next Question'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: RESULTS & ANSWER KEY */}
      {gameStage === 'results' && (
        <div className="space-y-6 animate-fadeIn">
          {(() => {
            const score = calculateScore();
            const total = questions.length;
            const pct = Math.round((score / total) * 100);
            const rank = getRankBadge(score, total);

            return (
              <div className="bg-bg-secondary p-6 sm:p-8 rounded-2xl text-center space-y-4 border border-stroke shadow-sm">
                <div className="w-16 h-16 mx-auto rounded-full bg-brand-primary/10 border border-brand-primary flex items-center justify-center text-brand-primary font-black text-xl font-mono">
                  {pct}%
                </div>
                
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold ${rank.color}`}>
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{rank.title}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-content-main mt-3">
                    Scored {score} / {total} Correct
                  </h3>
                  <p className="text-xs text-content-muted mt-1 max-w-md mx-auto font-medium">
                    {pct >= 70
                      ? 'Great job! You demonstrated solid knowledge of polar climate science.'
                      : 'Review the question breakdown below to strengthen your understanding.'}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleGenerateQuiz}
                    className="px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm btn-game"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>

                  <button
                    onClick={() => setGameStage('setup')}
                    className="px-5 py-2.5 rounded-xl bg-surface border border-stroke text-content-main font-bold text-xs hover:bg-bg-secondary transition-all flex items-center gap-2 btn-game"
                  >
                    <span>Change Topic</span>
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Answer Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stroke pb-3">
              <h3 className="text-base font-bold text-content-main flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Question Breakdown</span>
              </h3>
              <span className="text-xs font-mono text-content-muted">10 Questions</span>
            </div>

            <div className="space-y-3">
              {questions.map((q, qIdx) => {
                const userAns = userAnswers[qIdx];
                const isCorrect = userAns === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border space-y-3 ${
                      isCorrect
                        ? 'bg-emerald-500/5 border-emerald-500/30'
                        : 'bg-rose-500/5 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-bg-secondary text-content-main text-xs font-mono font-bold flex items-center justify-center shrink-0">
                          {qIdx + 1}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-content-main leading-snug">
                          {q.question}
                        </h4>
                      </div>
                      {isCorrect ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-bold flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] font-mono font-bold flex items-center gap-1 shrink-0">
                          <XCircle className="w-3 h-3" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIdx) => {
                        const isCorrectOption = optIdx === q.correctAnswer;
                        const isUserChoice = optIdx === userAns;

                        let optBadge = 'bg-surface border-stroke text-content-muted';
                        if (isCorrectOption) {
                          optBadge = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
                        } else if (isUserChoice && !isCorrect) {
                          optBadge = 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 font-bold';
                        }

                        return (
                          <div key={optIdx} className={`p-2 rounded-lg border flex items-center justify-between ${optBadge}`}>
                            <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                            {isCorrectOption && <span className="text-[10px] font-mono text-emerald-600 font-bold">✔ Correct</span>}
                            {isUserChoice && !isCorrectOption && <span className="text-[10px] font-mono text-rose-600 font-bold">Your Choice</span>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-xs text-content-muted bg-surface p-3 rounded-lg border border-stroke font-medium leading-relaxed">
                      <span className="font-bold text-content-main">Explanation: </span>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
