import React from 'react';
import { CheckCircle2, FileText, CheckSquare } from 'lucide-react';

interface HeroWorkflowProps {
  children: React.ReactNode;
}

export const HeroWorkflow: React.FC<HeroWorkflowProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-[1620px] mx-auto py-1">
      {/* ─────────────────────────────────────────────────────────────
          Wide Perimeter Workflow Canvas (1360 x 620 Aspect Ratio)
          Expands gracefully to fill the hero without excess side margins
         ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-[1360/620] hidden lg:block overflow-visible">

        {/* SVG Curved Connecting Paths */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1360 620"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Top Gradient (Coral -> Violet) */}
            <linearGradient id="hw-wide-top-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="55%" stopColor="#FF85A2" />
              <stop offset="100%" stopColor="#8B7CF8" />
            </linearGradient>

            {/* Right Gradient (Violet -> Rose) */}
            <linearGradient id="hw-wide-right-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B7CF8" />
              <stop offset="50%" stopColor="#C4B5FD" />
              <stop offset="100%" stopColor="#FF758F" />
            </linearGradient>

            {/* Bottom Gradient (Rose -> Slate) */}
            <linearGradient id="hw-wide-bottom-grad" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FF758F" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>

          {/* 1. Speech Bubble right (225, 80) -> Supervisor left (455, 45) */}
          <path
            d="M 225 80 C 320 80, 370 45, 455 45"
            stroke="url(#hw-wide-top-grad)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 2. Supervisor right (605, 45) -> ⚡ left (782, 65) */}
          <path
            d="M 605 45 C 680 45, 730 65, 782 65"
            stroke="url(#hw-wide-top-grad)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 3. ⚡ right (818, 65) -> Pricing Strategist top (1180, 95) */}
          <path
            d="M 818 65 C 980 65, 1180 50, 1180 95"
            stroke="#C4B5FD"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 4. Pricing Strategist bottom (1180, 175) -> Product Launched top (1180, 457) */}
          <path
            d="M 1180 175 C 1180 270, 1290 300, 1290 370 C 1290 440, 1180 410, 1180 457"
            stroke="url(#hw-wide-right-grad)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 5. Product Launched bottom (1180, 513) -> Approve Edits right (960, 565) */}
          <path
            d="M 1180 513 C 1180 565, 1060 565, 960 565"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 6. Approve Edits left (800, 565) -> Avatars right (618, 580) */}
          <path
            d="M 800 565 C 730 565, 680 580, 618 580"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 7. Avatars left (542, 580) -> Campaign Planner right (430, 580) */}
          <path
            d="M 542 580 L 430 580"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 8. Campaign Planner left (290, 580) -> Enablement bottom (120, 513) */}
          <path
            d="M 290 580 C 200 580, 120 560, 120 513"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 9. Enablement top (120, 457) -> Speech Bubble bottom (120, 125) */}
          <path
            d="M 120 457 L 120 125"
            stroke="#E2E8F0"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Precise Anchor Connection Dots */}
          <circle cx="225" cy="80" r="3.5" fill="#1E293B" />
          <circle cx="455" cy="45" r="3.5" fill="#1E293B" />
          <circle cx="605" cy="45" r="3.5" fill="#1E293B" />
          <circle cx="782" cy="65" r="3.5" fill="#1E293B" />
          <circle cx="818" cy="65" r="3.5" fill="#1E293B" />
          <circle cx="1180" cy="95" r="3.5" fill="#1E293B" />
          <circle cx="1180" cy="175" r="3.5" fill="#1E293B" />
          <circle cx="1180" cy="457" r="3.5" fill="#1E293B" />
          <circle cx="1180" cy="513" r="3.5" fill="#1E293B" />
          <circle cx="960" cy="565" r="3.5" fill="#1E293B" />
          <circle cx="800" cy="565" r="3.5" fill="#1E293B" />
          <circle cx="618" cy="580" r="3.5" fill="#1E293B" />
          <circle cx="542" cy="580" r="3.5" fill="#1E293B" />
          <circle cx="430" cy="580" r="3.5" fill="#1E293B" />
          <circle cx="290" cy="580" r="3.5" fill="#1E293B" />
          <circle cx="120" cy="513" r="3.5" fill="#1E293B" />
          <circle cx="120" cy="457" r="3.5" fill="#1E293B" />
          <circle cx="120" cy="125" r="3.5" fill="#1E293B" />
        </svg>

        {/* ─────────────────────────────────────────────────────────────
            Floating Nodes Positioned at Exact Coordinates (1360 x 620)
            left: (cx / 1360) * 100%, top: (cy / 620) * 100%
           ───────────────────────────────────────────────────────────── */}

        {/* Node 1: Speech Bubble (cx = 120, cy = 80) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '8.82%', top: '12.90%' }}
        >
          <div className="relative bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xl shadow-slate-200/40 w-[210px] text-left">
            <p className="text-sm font-semibold text-slate-900 leading-snug tracking-tight">
              Launch product<br />in 4 weeks
            </p>
            <div className="mt-2.5 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                ✦
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#D4F870] text-slate-950">
                Launch Planner
              </span>
            </div>
            <div className="absolute -bottom-2 left-6 w-3.5 h-3.5 bg-white border-r border-b border-slate-200/90 rotate-45" />
          </div>
        </div>

        {/* Node 2: Supervisor Pill (cx = 530, cy = 45) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '38.97%', top: '7.26%' }}
        >
          <div className="bg-white rounded-full px-4 py-2 border border-slate-200/90 shadow-lg shadow-slate-200/40 flex items-center gap-2.5 whitespace-nowrap">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
              alt="Tech Supervisor"
              className="w-7 h-7 rounded-full object-cover border border-white"
            />
            <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
              🤖
            </div>
            <div className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-bold">
              ⚙️
            </div>
            <span className="text-sm font-semibold text-slate-900 pr-1">Supervisor</span>
          </div>
        </div>

        {/* Node 3: Accelerator ⚡ (cx = 800, cy = 65) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '58.82%', top: '10.48%' }}
        >
          <div className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-sm">
            <span>⚡</span>
          </div>
        </div>

        {/* Node 4: Pricing Strategist (cx = 1180, cy = 135) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '86.76%', top: '21.77%' }}
        >
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xl shadow-slate-200/40 w-[185px] text-left">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[9px] font-bold">
                ✦
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF08A] text-slate-900">
                Pricing Strategist
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-snug">
              Sales and launch readiness
            </p>
          </div>
        </div>

        {/* Node 5: Product Launched (cx = 1180, cy = 485) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '86.76%', top: '78.23%' }}
        >
          <div className="bg-white rounded-2xl px-6 py-4 border border-slate-200/90 shadow-xl shadow-slate-200/40 flex items-center gap-3 whitespace-nowrap">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100 shrink-0" />
            <span className="text-base font-bold text-slate-900 tracking-tight">
              Product launched!
            </span>
          </div>
        </div>

        {/* Node 6: Approve Edits (cx = 880, cy = 565) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '64.71%', top: '91.13%' }}
        >
          <div className="bg-white rounded-full px-4.5 py-2.5 border border-slate-200/90 shadow-lg shadow-slate-200/40 flex items-center gap-2.5 whitespace-nowrap">
            <CheckSquare className="w-4.5 h-4.5 text-slate-700" />
            <span className="text-sm font-semibold text-slate-900">Approve edits</span>
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&auto=format&fit=crop&q=80"
              alt="Reviewer"
              className="w-6.5 h-6.5 rounded-full object-cover border border-white"
            />
          </div>
        </div>

        {/* Node 7: Avatars (cx = 580, cy = 580) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '42.65%', top: '93.55%' }}
        >
          <div className="bg-white rounded-full px-3 py-2 border border-slate-200/90 shadow-lg shadow-slate-200/40 flex items-center -space-x-1.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
              alt="Senior Engineer"
              className="w-7.5 h-7.5 rounded-full object-cover border-2 border-white"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
              alt="Product Designer"
              className="w-7.5 h-7.5 rounded-full object-cover border-2 border-white"
            />
          </div>
        </div>

        {/* Node 8: Campaign Planner (cx = 360, cy = 580) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '26.47%', top: '93.55%' }}
        >
          <div className="flex items-center gap-1.5 whitespace-nowrap bg-white/90 backdrop-blur-xs py-1 px-2 rounded-full border border-slate-200/60 shadow-xs">
            <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px]">
              👾
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E9D5FF] text-purple-900">
              Campaign Planner
            </span>
          </div>
        </div>

        {/* Node 9: Enablement (cx = 120, cy = 485) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:-translate-y-[54%]"
          style={{ left: '8.82%', top: '78.23%' }}
        >
          <div className="bg-white rounded-2xl px-5.5 py-3.5 border border-slate-200/90 shadow-xl shadow-slate-200/40 flex items-center gap-3 whitespace-nowrap">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900 tracking-tight">
              Enablement
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            Center Hero Content (Guaranteed Gap from Outer Lines & Nodes)
           ───────────────────────────────────────────────────────────── */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-[760px] xl:max-w-[800px] px-2 text-center pointer-events-auto flex flex-col items-center justify-center">
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
            <div className="bg-white rounded-2xl px-3.5 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#D4F870] text-slate-950 flex items-center justify-center text-[10px] font-bold">1</span>
              <span className="text-xs font-semibold text-slate-900">Launch in 4 weeks</span>
            </div>
            <span className="text-slate-300">→</span>

            <div className="bg-white rounded-2xl px-3.5 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">🤖</span>
              <span className="text-xs font-semibold text-slate-900">Supervisor Assigned</span>
            </div>
            <span className="text-slate-300">→</span>

            <div className="bg-white rounded-2xl px-3.5 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px]">✦</span>
              <span className="text-xs font-semibold text-slate-900">Pricing & Scope</span>
            </div>
            <span className="text-slate-300">→</span>

            <div className="bg-white rounded-2xl px-3.5 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-semibold text-slate-900">Product Launched!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
