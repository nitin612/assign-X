import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Lock } from 'lucide-react';

interface HeroWorkflowProps {
  children: React.ReactNode;
}

export const HeroWorkflow: React.FC<HeroWorkflowProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-[1780px] mx-auto py-0">
      {/* ─────────────────────────────────────────────────────────────
          Balanced Panoramic Workflow Canvas (1560 x 750 Aspect Ratio)
          Mathematically symmetrical margins on left and right
         ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-[1560/750] hidden lg:block overflow-visible">

        {/* SVG Curved Connecting Paths */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1560 750"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Top Gradient (Coral -> Violet) with userSpaceOnUse */}
            <linearGradient id="hw-wide-top-grad" gradientUnits="userSpaceOnUse" x1="220" y1="40" x2="1050" y2="40">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="45%" stopColor="#FF85A2" />
              <stop offset="100%" stopColor="#8B7CF8" />
            </linearGradient>

            {/* Right Gradient (Violet -> Rose) */}
            <linearGradient id="hw-wide-right-grad" gradientUnits="userSpaceOnUse" x1="1425" y1="180" x2="1425" y2="680">
              <stop offset="0%" stopColor="#8B7CF8" />
              <stop offset="50%" stopColor="#C4B5FD" />
              <stop offset="100%" stopColor="#FF758F" />
            </linearGradient>

            {/* Bottom Gradient (Rose -> Slate) */}
            <linearGradient id="hw-wide-bottom-grad" gradientUnits="userSpaceOnUse" x1="1425" y1="710" x2="135" y2="710">
              <stop offset="0%" stopColor="#FF758F" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>

          {/* 1. Scope right (245, 95) -> Supervisor left (385, 40) */}
          <path
            d="M 245 95 C 310 95, 330 40, 385 40"
            stroke="url(#hw-wide-top-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* 2. Supervisor right (580, 40) -> Velocity left (870, 40) */}
          <path
            d="M 580 40 L 870 40"
            stroke="url(#hw-wide-top-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* 3. Velocity right (1010, 40) -> Specialist Pod top (1425, 110) */}
          <path
            d="M 1010 40 C 1220 40, 1425 45, 1425 110"
            stroke="#C4B5FD"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* 4. Specialist Pod bottom (1425, 200) -> Milestone Delivered top (1425, 555) */}
          <path
            d="M 1425 200 C 1425 320, 1530 390, 1530 450 C 1530 510, 1425 490, 1425 555"
            stroke="url(#hw-wide-right-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* 5. Milestone Delivered bottom (1425, 645) -> Escrow Released right (1210, 710) */}
          <path
            d="M 1425 645 C 1425 710, 1320 710, 1210 710"
            stroke="url(#hw-wide-bottom-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* 6. Escrow Released left (950, 710) -> Vetted Specialists right (765, 715) */}
          <path
            d="M 950 710 C 890 710, 830 715, 765 715"
            stroke="#CBD5E1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* 7. Vetted Specialists left (595, 715) -> Milestone 2 Next right (445, 710) */}
          <path
            d="M 595 715 L 445 710"
            stroke="#CBD5E1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* 8. Milestone 2 Next left (275, 710) -> Protected Escrow bottom (135, 645) */}
          <path
            d="M 275 710 C 190 710, 135 690, 135 645"
            stroke="#CBD5E1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* 9. Protected Escrow top (135, 555) -> Scope card bottom (135, 160) */}
          <path
            d="M 135 555 L 135 160"
            stroke="#E2E8F0"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Precise Anchor Connection Dots */}
          <circle cx="245" cy="95" r="3.5" fill="#1E293B" />
          <circle cx="385" cy="40" r="3.5" fill="#1E293B" />
          <circle cx="580" cy="40" r="3.5" fill="#1E293B" />
          <circle cx="870" cy="40" r="3.5" fill="#1E293B" />
          <circle cx="1010" cy="40" r="3.5" fill="#1E293B" />
          <circle cx="1425" cy="110" r="3.5" fill="#1E293B" />
          <circle cx="1425" cy="200" r="3.5" fill="#1E293B" />
          <circle cx="1425" cy="555" r="3.5" fill="#1E293B" />
          <circle cx="1425" cy="645" r="3.5" fill="#1E293B" />
          <circle cx="1210" cy="710" r="3.5" fill="#1E293B" />
          <circle cx="950" cy="710" r="3.5" fill="#1E293B" />
          <circle cx="765" cy="715" r="3.5" fill="#1E293B" />
          <circle cx="595" cy="715" r="3.5" fill="#1E293B" />
          <circle cx="445" cy="710" r="3.5" fill="#1E293B" />
          <circle cx="275" cy="710" r="3.5" fill="#1E293B" />
          <circle cx="135" cy="645" r="3.5" fill="#1E293B" />
          <circle cx="135" cy="555" r="3.5" fill="#1E293B" />
          <circle cx="135" cy="160" r="3.5" fill="#1E293B" />
        </svg>

        {/* ─────────────────────────────────────────────────────────────
            Floating Nodes Positioned at Symmetrical Coordinates (1560 x 750)
            Left nodes center at 8.65% (135px), Right nodes center at 91.35% (1425px)
           ───────────────────────────────────────────────────────────── */}

        {/* Node 1: Project Scope Card (cx = 135, cy = 95) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '8.65%', top: '12.67%' }}
        >
          <div className="relative bg-white dark:bg-[#0D0D0E] rounded-3xl p-5 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/60 w-[225px] text-left">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-5 h-5 rounded-full bg-[#D4F870] text-slate-950 flex items-center justify-center text-[10px] font-bold shadow-2xs">
                1
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#D4F870]/60 text-slate-950">
                Tell Us What You Need
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug tracking-tight">
              Create Work Request<br />& Share Vision
            </p>
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SLA & Scope Locked</span>
            </div>
            <div className="absolute -bottom-2 left-6 w-3.5 h-3.5 bg-white dark:bg-[#0D0D0E] border-r border-b border-slate-200/90 dark:border-white/10 rotate-45" />
          </div>
        </div>

        {/* Node 2: Dedicated Supervisor Pill (cx = 480, cy = 40) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '30.77%', top: '5.33%' }}
        >
          <div className="bg-white dark:bg-[#0D0D0E] rounded-full px-4 py-2 border border-slate-200/90 dark:border-white/10 shadow-lg shadow-slate-200/40 dark:shadow-black/60 flex items-center gap-2.5 whitespace-nowrap">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                alt="Supervisor Arjun"
                className="w-7 h-7 rounded-full object-cover border border-white"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Arjun Mehta</span>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-purple-100 text-purple-800">
                  Supervisor ⭐ 4.9
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-300 font-medium">2. Reviews Scope & Manages Pod</span>
            </div>
          </div>
        </div>

        {/* Node 3: Sprint Velocity Sparkle (cx = 940, cy = 40) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '60.25%', top: '5.33%' }}
        >
          <div className="bg-white dark:bg-[#0D0D0E] border border-slate-200 dark:border-white/10 shadow-md rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 dark:text-slate-200">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span className="text-[11px] font-bold text-slate-900 dark:text-white">3. Work Starts · 100% Velocity</span>
          </div>
        </div>

        {/* Node 4: Specialist Pod Widget (cx = 1425, cy = 150) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '91.35%', top: '20.00%' }}
        >
          <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl p-4 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/60 w-[210px] text-left">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[9px] font-bold">
                4
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF08A] text-slate-950 font-semibold">
                Managed Execution
              </span>
            </div>
            <p className="text-xs text-slate-900 dark:text-white font-semibold leading-snug">
              Frontend & Backend Pod
            </p>
            <div className="mt-2 flex items-center justify-between text-[10.5px] text-slate-500 dark:text-slate-300 pt-1.5 border-t border-slate-100 dark:border-white/10">
              <span>Sprint 1</span>
              <span className="text-emerald-600 font-semibold">68% Progress</span>
            </div>
          </div>
        </div>

        {/* Node 5: Milestone Delivered Badge (cx = 1425, cy = 600) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '91.35%', top: '80.00%' }}
        >
          <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl px-5 py-3.5 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/60 flex items-center gap-3 whitespace-nowrap text-left">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100 shrink-0" />
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight block">
                5. Deliverable Ready!
              </span>
              <span className="text-[10px] text-emerald-600 font-medium block">
                ✓ Supervisor QA Passed
              </span>
            </div>
          </div>
        </div>

        {/* Node 6: Escrow Released Pill (cx = 1080, cy = 710) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '69.23%', top: '94.67%' }}
        >
          <div className="bg-white dark:bg-[#0D0D0E] rounded-full px-4.5 py-2 border border-slate-200/90 dark:border-white/10 shadow-lg shadow-slate-200/40 dark:shadow-black/60 flex items-center gap-2.5 whitespace-nowrap">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
            <span className="text-xs font-semibold text-slate-900 dark:text-white">6. You Approve & Pay: ₹15,000</span>
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&auto=format&fit=crop&q=80"
              alt="Client Reviewer"
              className="w-6 h-6 rounded-full object-cover border border-white"
            />
          </div>
        </div>

        {/* Node 7: Vetted Specialists Pod (cx = 680, cy = 715) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '43.59%', top: '95.33%' }}
        >
          <div className="bg-white dark:bg-[#0D0D0E] rounded-full px-3 py-1.5 border border-slate-200/90 dark:border-white/10 shadow-lg shadow-slate-200/40 dark:shadow-black/60 flex items-center gap-2">
            <div className="flex items-center -space-x-1.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                alt="Senior Engineer"
                className="w-6.5 h-6.5 rounded-full object-cover border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80"
                alt="Product Designer"
                className="w-6.5 h-6.5 rounded-full object-cover border-2 border-white"
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 pr-1">Managed Team</span>
          </div>
        </div>

        {/* Node 8: Milestone Timeline (cx = 360, cy = 710) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '23.07%', top: '94.67%' }}
        >
          <div className="flex items-center gap-1.5 whitespace-nowrap bg-white/95 dark:bg-[#0D0D0E]/95 backdrop-blur-xs py-1 px-3 rounded-full border border-slate-200/80 dark:border-white/10 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-purple-900 dark:text-purple-200">
              Milestone 2 Next ➔
            </span>
          </div>
        </div>

        {/* Node 9: Protected Milestone Escrow (cx = 135, cy = 600) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '8.65%', top: '80.00%' }}
        >
          <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl px-5 py-3.5 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/60 flex items-center gap-3 whitespace-nowrap text-left">
            <div className="w-8 h-8 rounded-xl bg-[#8B7CF8] text-white flex items-center justify-center shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight block">
                Protected Escrow
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-300 font-medium block">
                Pay Only on Approval
              </span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            Center Hero Content (Guaranteed Gap from Outer Lines & Nodes)
           ───────────────────────────────────────────────────────────── */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-[800px] xl:max-w-[860px] px-2 text-center pointer-events-auto flex flex-col items-center justify-center">
          {children}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Mobile & Tablet Flow (Visible on < lg screens)
         ───────────────────────────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col items-center justify-center text-center px-4">
        {children}

        {/* Mobile Workflow Ribbon */}
        <div className="mt-8 w-full overflow-x-auto pb-4 pt-2">
          <div className="flex items-center gap-3 min-w-max mx-auto px-2">
            <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl px-3.5 py-2 border border-slate-200 dark:border-white/10 shadow-xs flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#D4F870] text-slate-950 flex items-center justify-center text-[10px] font-bold">1</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">Tell Us What You Need</span>
            </div>
            <span className="text-slate-300">→</span>

            <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl px-3.5 py-2 border border-slate-200 dark:border-white/10 shadow-xs flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px]">2</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">Supervisor Assigned</span>
            </div>
            <span className="text-slate-300">→</span>

            <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl px-3.5 py-2 border border-slate-200 dark:border-white/10 shadow-xs flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px]">3</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">Managed Team Builds</span>
            </div>
            <span className="text-slate-300">→</span>

            <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl px-3.5 py-2 border border-slate-200 dark:border-white/10 shadow-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-semibold text-slate-900 dark:text-white">4. Review, Approve & Pay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
