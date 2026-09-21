import React from 'react';
import {
  Code2,
  Video,
  Palette,
  Smartphone,
  Bot,
  TrendingUp,
  Layers,
  Sparkles,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useApp } from '../../context/AppContext';

interface HeroWorkflowProps {
  children: React.ReactNode;
}

export const HeroWorkflow: React.FC<HeroWorkflowProps> = ({ children }) => {
  const { navigate } = useNavigation();
  const { login } = useApp();

  const handleCategoryClick = () => {
    login();
    navigate('/create');
  };

  const workCategories = [
    {
      title: 'Web & SaaS Development',
      badge: 'Web Development',
      badgeBg: 'bg-[#D4F870]/70 text-slate-950',
      subtitle: 'Next.js, APIs & SaaS MVPs',
      cta: 'Start Project',
      icon: Code2,
      accentColor: '#10B981'
    },
    {
      title: 'Video Editing & Motion',
      badge: '4K & Reels',
      icon: Video,
      accentColor: '#F59E0B'
    },
    {
      title: 'UI/UX & Product Design',
      badge: 'Figma 3D',
      icon: Palette,
      accentColor: '#EE6B50'
    },
    {
      title: 'Mobile App Development',
      badge: 'iOS & Android',
      badgeBg: 'bg-[#FEF08A] text-slate-950',
      subtitle: 'React Native & Flutter Apps',
      cta: 'Build App',
      icon: Smartphone,
      accentColor: '#3B82F6'
    },
    {
      title: 'AI & Automations',
      badge: 'LLMs & Agents',
      badgeBg: 'bg-[#E0E7FF] text-indigo-950',
      subtitle: 'OpenAI, LangChain & n8n',
      cta: 'Deploy AI',
      icon: Bot,
      accentColor: '#6366F1'
    },
    {
      title: 'SEO & Growth Marketing',
      badge: 'High Converting',
      icon: TrendingUp,
      accentColor: '#EC4899'
    },
    {
      title: 'Cloud & DevOps Setup',
      badge: 'AWS & Vercel',
      icon: Layers,
      accentColor: '#06B6D4'
    },
    {
      title: 'Brand Identity & 3D',
      badge: 'Custom Visuals',
      icon: Sparkles,
      accentColor: '#EE6B50'
    },
    {
      title: 'APIs & Backend Systems',
      badge: 'Production APIs',
      badgeBg: 'bg-[#C7D2FE] text-slate-950',
      subtitle: 'Postgres, Supabase & Node',
      cta: 'Build Backend',
      icon: Code2,
      accentColor: '#EE6B50'
    }
  ];

  return (
    <div className="relative w-full max-w-[1780px] mx-auto py-0">
      {/* ─────────────────────────────────────────────────────────────
          Balanced Panoramic Workflow Canvas (1560 x 750 Aspect Ratio)
          Connected Category Nodes with Gradient Perimeter Circuit Lines
         ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-[1560/750] hidden lg:block overflow-visible">

        {/* SVG Curved Connecting Paths */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md"
          viewBox="0 0 1560 750"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Top Gradient (Coral -> Rose -> Purple) */}
            <linearGradient id="hw-wide-top-grad" gradientUnits="userSpaceOnUse" x1="220" y1="40" x2="1050" y2="40">
              <stop offset="0%" stopColor="#EE6B50" />
              <stop offset="50%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>

            {/* Top-Right to Right (Purple -> Indigo -> Pink) */}
            <linearGradient id="hw-wide-tr-grad" gradientUnits="userSpaceOnUse" x1="1010" y1="40" x2="1425" y2="200">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>

            {/* Right Gradient (Blue -> Pink -> Coral) */}
            <linearGradient id="hw-wide-right-grad" gradientUnits="userSpaceOnUse" x1="1425" y1="180" x2="1425" y2="680">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>

            {/* Bottom-Right to Bottom-Center (Pink -> Orange -> Cyan) */}
            <linearGradient id="hw-wide-bottom-grad" gradientUnits="userSpaceOnUse" x1="1425" y1="710" x2="600" y2="710">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="50%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            {/* Bottom-Left to Left-Top (Cyan -> Emerald -> Coral) */}
            <linearGradient id="hw-wide-left-grad" gradientUnits="userSpaceOnUse" x1="600" y1="710" x2="135" y2="160">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#EE6B50" />
            </linearGradient>
          </defs>

          {/* 1. Web Dev right (245, 95) -> Video Editing left (385, 40) */}
          <path
            d="M 245 95 C 310 95, 330 40, 385 40"
            stroke="url(#hw-wide-top-grad)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />

          {/* 2. Video Editing right (580, 40) -> UI/UX Design left (870, 40) */}
          <path
            d="M 580 40 L 870 40"
            stroke="url(#hw-wide-top-grad)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />

          {/* 3. UI/UX Design right (1010, 40) -> Mobile App top (1425, 110) */}
          <path
            d="M 1010 40 C 1220 40, 1425 45, 1425 110"
            stroke="url(#hw-wide-tr-grad)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />

          {/* 4. Mobile App bottom (1425, 200) -> AI & Automation top (1425, 555) */}
          <path
            d="M 1425 200 C 1425 320, 1530 390, 1530 450 C 1530 510, 1425 490, 1425 555"
            stroke="url(#hw-wide-right-grad)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />

          {/* 5. AI & Automation bottom (1425, 645) -> SEO & Growth right (1210, 710) */}
          <path
            d="M 1425 645 C 1425 710, 1320 710, 1210 710"
            stroke="url(#hw-wide-bottom-grad)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />

          {/* 6. SEO & Growth left (950, 710) -> Cloud & DevOps right (765, 715) */}
          <path
            d="M 950 710 C 890 710, 830 715, 765 715"
            stroke="url(#hw-wide-bottom-grad)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />

          {/* 7. Cloud & DevOps left (595, 715) -> Brand Identity right (445, 710) */}
          <path
            d="M 595 715 L 445 710"
            stroke="url(#hw-wide-left-grad)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />

          {/* 8. Brand Identity left (275, 710) -> Backend & Database bottom (135, 645) */}
          <path
            d="M 275 710 C 190 710, 135 690, 135 645"
            stroke="url(#hw-wide-left-grad)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />

          {/* 9. Backend & Database top (135, 555) -> Web Dev card bottom (135, 160) */}
          <path
            d="M 135 555 L 135 160"
            stroke="url(#hw-wide-left-grad)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />

          {/* High-Contrast Anchor Connection Pins with Glowing Core */}
          <circle cx="245" cy="95" r="3.5" fill="#EE6B50" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="385" cy="40" r="3.5" fill="#EE6B50" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="580" cy="40" r="3.5" fill="#F43F5E" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="870" cy="40" r="3.5" fill="#F43F5E" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="1010" cy="40" r="3.5" fill="#A855F7" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="1425" cy="110" r="3.5" fill="#3B82F6" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="1425" cy="200" r="3.5" fill="#3B82F6" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="1425" cy="555" r="3.5" fill="#EC4899" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="1425" cy="645" r="3.5" fill="#F43F5E" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="1210" cy="710" r="3.5" fill="#FB923C" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="950" cy="710" r="3.5" fill="#FB923C" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="765" cy="715" r="3.5" fill="#06B6D4" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="595" cy="715" r="3.5" fill="#06B6D4" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="445" cy="710" r="3.5" fill="#10B981" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="275" cy="710" r="3.5" fill="#10B981" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="135" cy="645" r="3.5" fill="#10B981" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="135" cy="555" r="3.5" fill="#EE6B50" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
          <circle cx="135" cy="160" r="3.5" fill="#EE6B50" stroke="#ffffff" strokeWidth="1.5" className="drop-shadow-xs" />
        </svg>

        {/* ─────────────────────────────────────────────────────────────
            Floating Category CTA Nodes Positioned at Exact Coordinates
           ───────────────────────────────────────────────────────────── */}

        {/* Node 1: Web & SaaS Development Card (cx = 135, cy = 95) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:-translate-y-[55%] hover:scale-105 cursor-pointer group"
          style={{ left: '8.65%', top: '12.67%' }}
          onClick={handleCategoryClick}
          title="Get Web & SaaS Development Done"
        >
          <div className="relative bg-white/95 dark:bg-[#0D0D0E]/95 backdrop-blur-md rounded-3xl p-4.5 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/60 group-hover:border-[#EE6B50] group-hover:shadow-[#EE6B50]/20 w-[230px] text-left transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#D4F870]/70 text-slate-950">
                Web Development
              </span>
              <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-[#EE6B50] group-hover:text-white transition-all">
                <ArrowUpRight size={13} />
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug tracking-tight">
              Next.js, APIs & SaaS MVPs
            </p>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sprint Guaranteed</span>
              </span>
              <span className="font-semibold text-[#EE6B50] group-hover:translate-x-0.5 transition-transform">Get Done ➔</span>
            </div>
            <div className="absolute -bottom-2 left-6 w-3.5 h-3.5 bg-white dark:bg-[#0D0D0E] border-r border-b border-slate-200/90 dark:border-white/10 rotate-45" />
          </div>
        </div>

        {/* Node 2: Video Editing & Motion Pill (cx = 480, cy = 40) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:-translate-y-[55%] hover:scale-105 cursor-pointer group"
          style={{ left: '30.77%', top: '5.33%' }}
          onClick={handleCategoryClick}
          title="Get Video Editing & Motion Done"
        >
          <div className="bg-white/95 dark:bg-[#0D0D0E]/95 backdrop-blur-md rounded-full px-4 py-2 border border-slate-200/90 dark:border-white/10 shadow-lg shadow-slate-200/40 dark:shadow-black/60 group-hover:border-[#F59E0B] flex items-center gap-2.5 whitespace-nowrap transition-all">
            <div className="w-7 h-7 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Video size={14} />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Video Editing & 3D</span>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                  Reels & YouTube
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                <span>Color Grading & Sound</span>
                <ArrowRight size={10} className="text-amber-500 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>

        {/* Node 3: UI/UX & Product Design Pill (cx = 940, cy = 40) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:-translate-y-[55%] hover:scale-105 cursor-pointer group"
          style={{ left: '60.25%', top: '5.33%' }}
          onClick={handleCategoryClick}
          title="Get UI/UX & Design Done"
        >
          <div className="bg-white/95 dark:bg-[#0D0D0E]/95 backdrop-blur-md border border-slate-200/90 dark:border-white/10 shadow-md group-hover:border-[#EE6B50] rounded-full px-4 py-2 flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all">
            <div className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <Palette size={13} />
            </div>
            <span className="text-[11.5px] font-bold text-slate-900 dark:text-white">UI/UX Design in Figma</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
              Prototypes ➔
            </span>
          </div>
        </div>

        {/* Node 4: Mobile App Development Card (cx = 1425, cy = 150) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:-translate-y-[55%] hover:scale-105 cursor-pointer group"
          style={{ left: '91.35%', top: '20.00%' }}
          onClick={handleCategoryClick}
          title="Get Mobile Apps Done"
        >
          <div className="bg-white/95 dark:bg-[#0D0D0E]/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/60 group-hover:border-[#EE6B50] w-[215px] text-left transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF08A] text-slate-950">
                Mobile Apps
              </span>
              <div className="w-5 h-5 rounded-full bg-orange-50 dark:bg-orange-950/60 flex items-center justify-center text-[#EE6B50] dark:text-orange-400 group-hover:bg-[#EE6B50] group-hover:text-white transition-all">
                <ArrowUpRight size={12} />
              </div>
            </div>
            <p className="text-xs text-slate-900 dark:text-white font-semibold leading-snug">
              iOS & Android React Native
            </p>
            <div className="mt-2 flex items-center justify-between text-[10.5px] text-slate-500 dark:text-slate-300 pt-1.5 border-t border-slate-100 dark:border-white/10">
              <span>App Store Ready</span>
              <span className="text-[#EE6B50] dark:text-orange-400 font-semibold group-hover:translate-x-0.5 transition-transform">Deploy ➔</span>
            </div>
          </div>
        </div>

        {/* Node 5: AI & Automations Card (cx = 1425, cy = 600) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:-translate-y-[55%] hover:scale-105 cursor-pointer group"
          style={{ left: '91.35%', top: '80.00%' }}
          onClick={handleCategoryClick}
          title="Get AI & Automations Done"
        >
          <div className="bg-white/95 dark:bg-[#0D0D0E]/95 backdrop-blur-md rounded-2xl px-4.5 py-3.5 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/60 group-hover:border-[#6366F1] flex items-center gap-3 whitespace-nowrap text-left transition-all">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Bot size={17} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight block">
                AI Agents & Workflows
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                <span>LLMs, LangChain & n8n</span>
                <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>

        {/* Node 6: SEO & Growth Marketing Pill (cx = 1080, cy = 710) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:-translate-y-[55%] hover:scale-105 cursor-pointer group"
          style={{ left: '69.23%', top: '94.67%' }}
          onClick={handleCategoryClick}
          title="Get SEO & Growth Done"
        >
          <div className="bg-white/95 dark:bg-[#0D0D0E]/95 backdrop-blur-md rounded-full px-4 py-2 border border-slate-200/90 dark:border-white/10 shadow-lg shadow-slate-200/40 dark:shadow-black/60 group-hover:border-pink-500 flex items-center gap-2 whitespace-nowrap transition-all">
            <div className="w-5 h-5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
              <TrendingUp size={12} />
            </div>
            <span className="text-xs font-semibold text-slate-900 dark:text-white">SEO & Funnel Optimization</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-pink-100 text-pink-800 dark:bg-pink-950/60 dark:text-pink-300">
              Organic ➔
            </span>
          </div>
        </div>

        {/* Node 7: Cloud & DevOps Setup Pill (cx = 680, cy = 715) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:-translate-y-[55%] hover:scale-105 cursor-pointer group"
          style={{ left: '43.59%', top: '95.33%' }}
          onClick={handleCategoryClick}
          title="Get Cloud & DevOps Done"
        >
          <div className="bg-white/95 dark:bg-[#0D0D0E]/95 backdrop-blur-md rounded-full px-3.5 py-1.5 border border-slate-200/90 dark:border-white/10 shadow-lg shadow-slate-200/40 dark:shadow-black/60 group-hover:border-cyan-500 flex items-center gap-2 transition-all">
            <div className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
              <Layers size={12} />
            </div>
            <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">Cloud & DevOps Setup</span>
            <span className="text-[10px] text-cyan-600 font-bold">AWS ➔</span>
          </div>
        </div>

        {/* Node 8: Brand & Graphic Design Pill (cx = 360, cy = 710) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:-translate-y-[55%] hover:scale-105 cursor-pointer group"
          style={{ left: '23.07%', top: '94.67%' }}
          onClick={handleCategoryClick}
          title="Get Brand Identity Done"
        >
          <div className="flex items-center gap-1.5 whitespace-nowrap bg-white/95 dark:bg-[#0D0D0E]/95 backdrop-blur-md py-1.5 px-3.5 rounded-full border border-slate-200/80 dark:border-white/10 shadow-xs group-hover:border-[#EE6B50] transition-all">
            <Sparkles size={13} className="text-[#EE6B50]" />
            <span className="text-[11px] font-semibold text-slate-900 dark:text-white">
              Brand Identity & 3D Assets ➔
            </span>
          </div>
        </div>

        {/* Node 9: APIs & Backend Systems Card (cx = 135, cy = 600) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:-translate-y-[55%] hover:scale-105 cursor-pointer group"
          style={{ left: '8.65%', top: '80.00%' }}
          onClick={handleCategoryClick}
          title="Get Backend & Databases Done"
        >
          <div className="bg-white/95 dark:bg-[#0D0D0E]/95 backdrop-blur-md rounded-2xl px-4 py-3.5 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/60 group-hover:border-[#EE6B50] flex items-center gap-3 whitespace-nowrap text-left transition-all">
            <div className="w-8 h-8 rounded-xl bg-[#EE6B50] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight block">
                APIs & Databases
              </span>
              <span className="text-[10px] text-[#EE6B50] font-semibold block group-hover:translate-x-0.5 transition-transform">
                PostgreSQL & Supabase ➔
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
      <div className="lg:hidden flex flex-col items-center justify-center text-center px-3 sm:px-4">
        {children}

        {/* Mobile Clean Structured Category Chips */}
        <div className="mt-4 sm:mt-5 w-full max-w-lg mx-auto">
          <p className="text-[10.5px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
            Popular Tasks
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {workCategories.slice(0, 6).map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <button
                  key={idx}
                  onClick={handleCategoryClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-[#121216]/95 border border-slate-200/90 dark:border-white/10 shadow-2xs hover:border-[#EE6B50] text-slate-800 dark:text-slate-200 active:scale-95 transition-all text-xs font-medium cursor-pointer"
                >
                  <Icon size={12} className="text-[#EE6B50]" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

