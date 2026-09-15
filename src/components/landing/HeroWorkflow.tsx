import React, { useState } from 'react';
import {
  Play,
  RotateCw,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Check,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Users,
  Code2,
  FileCheck2,
  User,
  Zap,
  RefreshCw,
  VolumeX
} from 'lucide-react';

interface HeroWorkflowProps {
  onOpenDemo?: () => void;
  onNavigate?: (path: string) => void;
}

export const HeroWorkflow: React.FC<HeroWorkflowProps> = ({ onOpenDemo, onNavigate }) => {
  const [activeTask, setActiveTask] = useState<'checkout' | 'pricing'>('checkout');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 700);
  };

  return (
    <div className="relative w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8">

      {/* ─────────────────────────────────────────────────────────────
          1. Hero Header & Orbital Badges (1:1 Pixel Match to Reference)
         ───────────────────────────────────────────────────────────── */}
      <div className="relative text-center max-w-[860px] mx-auto">


        {/* ── Left Orbit Dashed Ring & Badges ── */}
        <div className="hidden xl:block absolute -left-28 top-8 w-52 h-52 pointer-events-none">
          {/* Dashed Orbit Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-slate-300/80 animate-[spin_80s_linear_infinite]" />

          {/* Top-Left Avatar + "On it! 👊" Bubble */}
          <div className="absolute -top-2 left-6 pointer-events-auto flex items-center gap-2 group">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=90&auto=format&fit=crop&q=80"
              alt="Team member"
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-md shadow-slate-200/60 group-hover:scale-105 transition-transform"
            />
            <div className="bg-white rounded-xl px-2.5 py-1 border border-slate-200 shadow-sm text-xs font-medium text-slate-800 flex items-center gap-1">
              <span>On it!</span>
              <span>👊</span>
            </div>
          </div>

          {/* Bottom-Right "High certainty · 6 signals" Pill */}
          <div className="absolute -bottom-1 right-2 pointer-events-auto">
            <div className="bg-white rounded-full px-3 py-1.5 border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-[10px] font-bold">
                92
              </span>
              <span className="text-[11.5px] font-semibold text-slate-800 whitespace-nowrap">
                High certainty <span className="text-slate-400 font-normal">· 6 signals</span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Orbit Dashed Ring & Badges ── */}
        <div className="hidden xl:block absolute -right-28 top-8 w-52 h-52 pointer-events-none">
          {/* Dashed Orbit Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-slate-300/80 animate-[spin_70s_linear_infinite_reverse]" />

          {/* Top-Right "92% QA verified" Chip */}
          <div className="absolute -top-3 left-10 pointer-events-auto">
            <div className="bg-white rounded-full px-3 py-1 border border-slate-200/90 shadow-xs flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>92% QA verified</span>
            </div>
          </div>

          {/* Right "✓ Open Decision" Pill */}
          <div className="absolute top-16 -right-8 pointer-events-auto">
            <div className="bg-white rounded-xl px-3 py-1.5 border border-slate-200/90 shadow-md flex items-center gap-1.5 text-xs font-semibold text-slate-800 whitespace-nowrap">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Open Decision</span>
            </div>
          </div>

          {/* Bottom Avatar + "• Merged" Chip */}
          <div className="absolute -bottom-3 left-6 pointer-events-auto flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=90&auto=format&fit=crop&q=80"
              alt="Developer"
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-md shadow-slate-200/60"
            />
            <div className="bg-white rounded-full px-2.5 py-0.5 border border-slate-200/90 shadow-2xs text-[11px] font-semibold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Merged</span>
            </div>
          </div>
        </div>

        {/* ── Main Headline ── */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-normal text-slate-950 tracking-[-0.03em] leading-[1.12] mb-5">
          Your Team Always Knows <br className="hidden sm:inline" />
          What to Build Next.
        </h1>

        {/* ── Subtitle ── */}
        <p className="text-sm sm:text-base md:text-[16px] text-slate-600 max-w-[620px] mx-auto leading-relaxed font-normal mb-8">
          Not another task list. AssignX gives every team member a ranked, AI-reasoned priority view, updated every morning, without asking you.
        </p>

        {/* ── Dual CTAs: Dark Pill + Glass Action Button ── */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => onNavigate?.('/create')}
            className="bg-gradient-to-b from-[#383747] via-[#262534] to-[#181724] hover:from-[#434254] hover:to-[#1f1e2c] text-white text-sm sm:text-[15px] font-semibold px-7 py-3 rounded-full shadow-md shadow-slate-900/15 border-t border-white/25 transition-all cursor-pointer"
          >
            Start Free 14 Days
          </button>
          <button
            onClick={() => onOpenDemo?.()}
            className="bg-white hover:bg-slate-50 text-slate-900 text-sm sm:text-[15px] font-semibold px-6 py-3 rounded-full border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
            <span>See It In Action</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. Product Cards Layout (Directly on canvas, no big outer wrapper card)
         ───────────────────────────────────────────────────────────── */}
      <div className="mt-12 sm:mt-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start text-left max-w-[1280px] mx-auto">

          {/* ── Left Column: "Today" Focus Panel (3.5 cols) ── */}
          <div className="lg:col-span-4 xl:col-span-3.5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between min-h-[410px]">
            <div>
              {/* Header */}
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-950 tracking-tight">
                  Today
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Thu · Jul 15 · 2026
                </p>
              </div>

              {/* Section: FOCUS */}
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                  FOCUS
                </span>
                <div className="space-y-2">
                  {/* Focus Item 1 (Checkout Bug) */}
                  <div
                    onClick={() => setActiveTask('checkout')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${activeTask === 'checkout'
                      ? 'bg-slate-50/90 border-slate-300 shadow-2xs border-l-3 border-l-blue-500'
                      : 'bg-white border-transparent hover:bg-slate-50/60'
                      }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs font-semibold text-slate-400 mt-0.5">1</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5">
                          <h4 className="text-xs sm:text-[13px] font-semibold text-slate-950 truncate">
                            Checkout Bug
                          </h4>
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60">
                            High
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-normal mt-0.5">
                          Investor demo · Today
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Focus Item 2 (Approve Pricing) */}
                  <div
                    onClick={() => setActiveTask('pricing')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${activeTask === 'pricing'
                      ? 'bg-slate-50/90 border-slate-300 shadow-2xs border-l-3 border-l-blue-500'
                      : 'bg-white border-transparent hover:bg-slate-50/60'
                      }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs font-semibold text-slate-400 mt-0.5">2</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-[13px] font-semibold text-slate-950 truncate">
                          Approve Pricing
                        </h4>
                        <p className="text-[11px] text-slate-400 font-normal mt-0.5">
                          Investor demo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: CHANGES */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                CHANGES
              </span>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/60 flex items-start gap-2.5">
                  <RefreshCw className="w-3.5 h-3.5 text-slate-600 mt-0.5 shrink-0" />
                  <div>
                    <h5 className="text-xs font-semibold text-slate-900">Priority Updated</h5>
                    <p className="text-[11px] text-slate-400">Investor demo · Today</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/60 flex items-start gap-2.5">
                  <VolumeX className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <h5 className="text-xs font-semibold text-slate-900">Marketing Blocked</h5>
                    <p className="text-[11px] text-slate-400">Waiting on copy approval</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Middle Column: "AI Priority Analysis" (5.5 cols) ── */}
          <div className="lg:col-span-5 xl:col-span-5.5 space-y-4">

            {/* Main AI Priority Analysis Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative">
              {/* Header Pill & Refresh Action */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/60">
                  <span className="w-4 h-4 rounded bg-[#FFB800] text-slate-950 flex items-center justify-center text-[9px] font-black">
                    AI
                  </span>
                  <span>Priority Analysis</span>
                </div>
                <button
                  onClick={handleRefresh}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  title="Refresh analysis"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Task Title & Narrative */}
              <div className="mb-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  TOP PRIORITY
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight mb-1.5">
                  {activeTask === 'checkout' ? 'Checkout Bug' : 'Approve Pricing Model'}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                  {activeTask === 'checkout'
                    ? 'Critical blocker surfaced before an investor demo. Founder escalated - fix window is narrow'
                    : 'Finalize tier limits and discount curves for launch partners before the product debut.'}
                </p>
              </div>

              {/* Context Tags */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-100/80 text-amber-900 border border-amber-300/60">
                  <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>Investor Demo</span>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 underline decoration-slate-300 cursor-pointer">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>Founder mentioned</span>
                </div>
              </div>
            </div>

            {/* Sub-Metrics: Impact + Confidence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Impact Card */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
                    <span>Impact</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="my-1">
                  <span className="text-2xl font-bold text-slate-950">2/5</span>
                </div>
                {/* Mini Sparkline Chart */}
                <div className="flex items-end justify-between mt-2 pt-2 border-t border-slate-100">
                  <svg className="w-24 h-7 overflow-visible" viewBox="0 0 100 30" fill="none">
                    <path
                      d="M0 22 L15 18 L30 25 L45 15 L60 20 L75 10 L100 8"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 22 L15 18 L30 25 L45 15 L60 20 L75 10 L100 8 L100 30 L0 30 Z"
                      fill="url(#sparkline-grad)"
                      opacity="0.25"
                    />
                    <defs>
                      <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                    +2 pts this week
                  </span>
                </div>
              </div>

              {/* Confidence Card */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Confidence</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 my-1">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] flex items-center justify-center">
                    92
                  </span>
                  <span className="text-2xl font-bold text-slate-950">92%</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Up to 92% High certainty
                  </p>
                  <p className="text-[10.5px] text-slate-400">
                    Based on <span className="underline decoration-slate-300 font-medium text-slate-700 cursor-pointer">6 signals</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ── Right Column: "Deadline & Depends" (3 cols) ── */}
          <div className="lg:col-span-3 xl:col-span-3 space-y-4">

            {/* Deadline Widget */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Deadline</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-slate-950">Today</h4>
                <span className="text-[10.5px] font-bold text-rose-600 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-rose-600" /> No buffer
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden my-2">
                <div className="bg-[#8B7CF8] h-full rounded-full w-[75%]" />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>TW</span>
                <span>Elapsed 8h</span>
              </div>
            </div>

            {/* Depends Widget */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>Depends</span>
              </div>
              <h4 className="text-sm font-bold text-slate-950 mb-2.5">
                2 teams blocked
              </h4>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
                  <span className="flex items-center gap-1.5 text-[11px] text-slate-600 font-mono">
                    <Code2 className="w-3 h-3 text-slate-400" /> Engineering
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
                  <span className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <FileCheck2 className="w-3 h-3 text-slate-400" /> QA
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => setIsWorking(!isWorking)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${isWorking
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 shadow-2xs'
                  }`}
              >
                {isWorking ? '✓ In Progress' : 'Start Working'}
              </button>
              <button
                onClick={() => onNavigate?.('/dashboard')}
                className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 transition-colors cursor-pointer"
              >
                Reassign Task
              </button>
            </div>

          </div>

        </div>
    </div>
  );
};
