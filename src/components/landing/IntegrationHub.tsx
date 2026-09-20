import React from 'react';

export const IntegrationHub: React.FC = () => {
  return (
    <div className="mt-8 sm:mt-12 w-full max-w-[1600px] mx-auto relative overflow-x-auto overflow-y-visible py-6 scrollbar-none select-none">
      {/* Aspect Ratio Canvas for the panoramic root network */}
      <div className="relative min-w-[1080px] max-w-[1500px] mx-auto aspect-[1500/480]">
        {/* ─────────────────────────────────────────────────────────────
            1. Organic Root SVG Network with Gradient Strokes & Branching Paths
           ───────────────────────────────────────────────────────────── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1500 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Left Root Gradient */}
            <linearGradient id="root-grad-left" x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#EE6B50" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#FA795C" stopOpacity="0.65" />
              <stop offset="80%" stopColor="#FDBA74" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FED7AA" stopOpacity="0.3" />
            </linearGradient>

            {/* Right Root Gradient */}
            <linearGradient id="root-grad-right" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#EE6B50" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#FA795C" stopOpacity="0.65" />
              <stop offset="80%" stopColor="#FDBA74" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FED7AA" stopOpacity="0.3" />
            </linearGradient>

            {/* Center Radial Glow Aura */}
            <radialGradient id="center-root-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EE6B50" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#EE6B50" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#EE6B50" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central Root Aura Glow */}
          <circle cx="750" cy="240" r="140" fill="url(#center-root-glow)" />

          {/* ── LEFT ROOT BRANCHES ───────────────────────────────────── */}
          {/* Main Left Trunk: Center -> Async Orchestration */}
          <path
            d="M 680 240 L 580 240"
            stroke="url(#root-grad-left)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 680 240 L 580 240"
            stroke="#EE6B50"
            strokeWidth="2"
            strokeDasharray="5 7"
            strokeOpacity="0.8"
          />

          {/* Branch: Center curve up-left -> Dedicated Supervisor */}
          <path
            d="M 720 185 C 700 110, 630 75, 545 75"
            stroke="url(#root-grad-left)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 720 185 C 700 110, 630 75, 545 75"
            stroke="#FA795C"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeOpacity="0.75"
          />

          {/* Branch: Center curve down-left -> Milestone Scrubber */}
          <path
            d="M 720 295 C 700 370, 630 405, 545 405"
            stroke="url(#root-grad-left)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 720 295 C 700 370, 630 405, 545 405"
            stroke="#FA795C"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeOpacity="0.75"
          />

          {/* Async Orchestration -> Outer Branch Split */}
          <path
            d="M 450 240 L 390 240"
            stroke="url(#root-grad-left)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Branch -> Vetted Doers (upper-left) */}
          <path
            d="M 390 240 C 330 240, 310 145, 255 145"
            stroke="url(#root-grad-left)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 390 240 C 330 240, 310 145, 255 145"
            stroke="#FDBA74"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            strokeOpacity="0.7"
          />

          {/* Branch -> Automated QA (lower-left) */}
          <path
            d="M 390 240 C 330 240, 310 335, 255 335"
            stroke="url(#root-grad-left)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 390 240 C 330 240, 310 335, 255 335"
            stroke="#FDBA74"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            strokeOpacity="0.7"
          />

          {/* Outer Left Tendril: Vetted Doers -> AI Task Briefing (far edge root) */}
          <path
            d="M 160 145 C 120 145, 100 210, 75 230"
            stroke="url(#root-grad-left)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            strokeOpacity="0.6"
          />

          {/* Outer Left Tendril: Automated QA -> AI Task Briefing (far edge root) */}
          <path
            d="M 160 335 C 120 335, 100 270, 75 250"
            stroke="url(#root-grad-left)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            strokeOpacity="0.6"
          />

          {/* ── RIGHT ROOT BRANCHES ──────────────────────────────────── */}
          {/* Main Right Trunk: Center -> Protected Escrow */}
          <path
            d="M 820 240 L 920 240"
            stroke="url(#root-grad-right)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 820 240 L 920 240"
            stroke="#EE6B50"
            strokeWidth="2"
            strokeDasharray="5 7"
            strokeOpacity="0.8"
          />

          {/* Branch: Center curve up-right -> Production-Ready Code */}
          <path
            d="M 780 185 C 800 110, 870 75, 955 75"
            stroke="url(#root-grad-right)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 780 185 C 800 110, 870 75, 955 75"
            stroke="#FA795C"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeOpacity="0.75"
          />

          {/* Branch: Center curve down-right -> Invoicing & GST */}
          <path
            d="M 780 295 C 800 370, 870 405, 955 405"
            stroke="url(#root-grad-right)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 780 295 C 800 370, 870 405, 955 405"
            stroke="#FA795C"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeOpacity="0.75"
          />

          {/* Escrow -> Outer Branch Split */}
          <path
            d="M 1050 240 L 1110 240"
            stroke="url(#root-grad-right)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Escrow branch -> Zero Overhead (upper-right) */}
          <path
            d="M 1110 240 C 1170 240, 1190 145, 1245 145"
            stroke="url(#root-grad-right)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 1110 240 C 1170 240, 1190 145, 1245 145"
            stroke="#FDBA74"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            strokeOpacity="0.7"
          />

          {/* Escrow branch -> Supervisor Channel (lower-right) */}
          <path
            d="M 1110 240 C 1170 240, 1190 335, 1245 335"
            stroke="url(#root-grad-right)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 1110 240 C 1170 240, 1190 335, 1245 335"
            stroke="#FDBA74"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            strokeOpacity="0.7"
          />

          {/* Outer Right Tendril: Zero Overhead -> 1-Click Approval (far edge root) */}
          <path
            d="M 1340 145 C 1380 145, 1400 210, 1425 230"
            stroke="url(#root-grad-right)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            strokeOpacity="0.6"
          />

          {/* Outer Right Tendril: Supervisor Channel -> 1-Click Approval (far edge root) */}
          <path
            d="M 1340 335 C 1380 335, 1400 270, 1425 250"
            stroke="url(#root-grad-right)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            strokeOpacity="0.6"
          />
        </svg>

        {/* ─────────────────────────────────────────────────────────────
            2. Center Hub: AssignX Core AI Node
           ───────────────────────────────────────────────────────────── */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="relative group">
            {/* Outer Pulsing Glow */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#EE6B50] via-[#FA795C] to-[#D95236] opacity-30 blur-lg group-hover:opacity-60 transition-opacity" />
            <div className="w-[112px] h-[112px] rounded-full bg-white dark:bg-[#111726] border-[10px] border-[#EE6B50] shadow-2xl shadow-[#EE6B50]/30 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer relative z-10">
              <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
                <path
                  d="M23.5 9.5L34.5 16V25.5L28 21.5V17L23.5 14.5L16.5 18.5L16 15L23.5 9.5Z"
                  fill="#EE6B50"
                />
                <path
                  d="M12.5 24L20 19.5L27 23.5V32L21 28.5V24L15.5 27L12.5 24Z"
                  fill="#EE6B50"
                />
                <path
                  d="M12.5 32.5L20 28V36L12.5 32.5Z"
                  fill="#EE6B50"
                />
              </svg>
              <span className="text-[11px] font-extrabold text-slate-900 dark:text-white tracking-tight -mt-1">
                AssignX
              </span>
            </div>
          </div>
        </div>

        {/* ── LEFT FLANK NODES (AI Modern Minimalist Capsule Pills) ──── */}
        
        {/* Node 1: AI Task Briefing (Outer Left Flank) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '6%', top: '50%' }}
        >
          <div className="bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_-4px_rgba(238,107,80,0.22)] hover:border-[#EE6B50]/80 hover:scale-105 transition-all duration-200 cursor-pointer group text-left whitespace-nowrap">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FA795C] to-[#D95236] group-hover:scale-125 transition-transform" />
              <span className="text-[12.5px] font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#EE6B50] transition-colors">
                AI Task Briefing
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal pl-3 block leading-none">
              Outcome-based scoping
            </span>
          </div>
        </div>

        {/* Node 2: Vetted Senior Doers (Upper Left) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '18%', top: '30%' }}
        >
          <div className="bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_-4px_rgba(238,107,80,0.22)] hover:border-[#EE6B50]/80 hover:scale-105 transition-all duration-200 cursor-pointer group text-left whitespace-nowrap">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
              <span className="text-[12.5px] font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#EE6B50] transition-colors">
                Vetted Senior Doers
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal pl-3 block leading-none">
              Top 1% specialized talent
            </span>
          </div>
        </div>

        {/* Node 3: Dedicated Supervisor (Top Left Inner) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '36%', top: '15.5%' }}
        >
          <div className="bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_-4px_rgba(238,107,80,0.22)] hover:border-[#EE6B50]/80 hover:scale-105 transition-all duration-200 cursor-pointer group text-left whitespace-nowrap">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
              <span className="text-[12.5px] font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#EE6B50] transition-colors">
                Dedicated Supervisor
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal pl-3 block leading-none">
              Owns quality & timeline
            </span>
          </div>
        </div>

        {/* Node 4: Async Orchestration (Middle Left Trunk) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '34%', top: '50%' }}
        >
          <div className="bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_-4px_rgba(238,107,80,0.22)] hover:border-[#EE6B50]/80 hover:scale-105 transition-all duration-200 cursor-pointer group text-left whitespace-nowrap">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FA795C] to-[#D95236] group-hover:scale-125 transition-transform" />
              <span className="text-[12.5px] font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#EE6B50] transition-colors">
                Async Orchestration
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal pl-3 block leading-none">
              Zero daily standups for you
            </span>
          </div>
        </div>

        {/* Node 5: Automated QA Review (Lower Left) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '18%', top: '70%' }}
        >
          <div className="bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_-4px_rgba(238,107,80,0.22)] hover:border-[#EE6B50]/80 hover:scale-105 transition-all duration-200 cursor-pointer group text-left whitespace-nowrap">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
              <span className="text-[12.5px] font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#EE6B50] transition-colors">
                Automated QA Review
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal pl-3 block leading-none">
              Supervisor-verified passes
            </span>
          </div>
        </div>

        {/* Node 6: Milestone Scrubber (Bottom Left Inner) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '36%', top: '84.5%' }}
        >
          <div className="bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_-4px_rgba(238,107,80,0.22)] hover:border-[#EE6B50]/80 hover:scale-105 transition-all duration-200 cursor-pointer group text-left whitespace-nowrap">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-125 transition-transform" />
              <span className="text-[12.5px] font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#EE6B50] transition-colors">
                Milestone Scrubber
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal pl-3 block leading-none">
              Live deliverable tracking
            </span>
          </div>
        </div>

        {/* ── RIGHT FLANK NODES (AI Modern Minimalist Capsule Pills) ─── */}

        {/* Node 7: Production-Ready Code (Top Right Inner) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '64%', top: '15.5%' }}
        >
          <div className="bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_-4px_rgba(238,107,80,0.22)] hover:border-[#EE6B50]/80 hover:scale-105 transition-all duration-200 cursor-pointer group text-left whitespace-nowrap">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
              <span className="text-[12.5px] font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#EE6B50] transition-colors">
                Production-Ready Code
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal pl-3 block leading-none">
              Clean architecture & repos
            </span>
          </div>
        </div>

        {/* Node 8: Zero Management Overhead (Upper Right) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '82%', top: '30%' }}
        >
          <div className="bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_-4px_rgba(238,107,80,0.22)] hover:border-[#EE6B50]/80 hover:scale-105 transition-all duration-200 cursor-pointer group text-left whitespace-nowrap">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-125 transition-transform" />
              <span className="text-[12.5px] font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#EE6B50] transition-colors">
                Zero Management Overhead
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal pl-3 block leading-none">
              Save 20+ hrs per week
            </span>
          </div>
        </div>

        {/* Node 9: Protected Milestone Escrow (Middle Right Trunk) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '66%', top: '50%' }}
        >
          <div className="bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_-4px_rgba(238,107,80,0.22)] hover:border-[#EE6B50]/80 hover:scale-105 transition-all duration-200 cursor-pointer group text-left whitespace-nowrap">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-125 transition-transform" />
              <span className="text-[12.5px] font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#EE6B50] transition-colors">
                Protected Escrow
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal pl-3 block leading-none">
              Funds safe until approval
            </span>
          </div>
        </div>

        {/* Node 10: Supervisor Channel (Lower Right) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '82%', top: '70%' }}
        >
          <div className="bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_-4px_rgba(238,107,80,0.22)] hover:border-[#EE6B50]/80 hover:scale-105 transition-all duration-200 cursor-pointer group text-left whitespace-nowrap">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FA795C] to-[#D95236] group-hover:scale-125 transition-transform" />
              <span className="text-[12.5px] font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#EE6B50] transition-colors">
                Supervisor Channel
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal pl-3 block leading-none">
              Single point of contact
            </span>
          </div>
        </div>

        {/* Node 11: Automated Invoicing (Bottom Right Inner) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '64%', top: '84.5%' }}
        >
          <div className="bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_-4px_rgba(238,107,80,0.22)] hover:border-[#EE6B50]/80 hover:scale-105 transition-all duration-200 cursor-pointer group text-left whitespace-nowrap">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
              <span className="text-[12.5px] font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#EE6B50] transition-colors">
                Automated Invoicing
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal pl-3 block leading-none">
              Instant receipts & GST
            </span>
          </div>
        </div>

        {/* Node 12: 1-Click Approval (Outer Right Flank) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '94%', top: '50%' }}
        >
          <div className="bg-white/95 dark:bg-[#111726]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_-4px_rgba(238,107,80,0.22)] hover:border-[#EE6B50]/80 hover:scale-105 transition-all duration-200 cursor-pointer group text-left whitespace-nowrap">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
              <span className="text-[12.5px] font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-[#EE6B50] transition-colors">
                1-Click Approval
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal pl-3 block leading-none">
              Instant sign-off & release
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
