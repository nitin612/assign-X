/* ═══════════════════════════════════════════════════════════
   AssignX — Managed Work & Project Delivery Platform (Client Side)
   UI Structure, Color Palette & Typography: 1:1 Match with Design System
   Branding: Pure Text Brand ("AssignX") · No Logo Marks · No Raw Pills in Hero
   Custom Content: Dedicated Tech Supervisors, Milestone Escrow & Vetted Talent
   ═══════════════════════════════════════════════════════════ */
import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useApp } from '../context/AppContext';
import {
  Play,
  Paperclip,
  MessageSquare,
  Zap,
  ShieldCheck,
  Lock,
  X,
  CheckSquare,
  Send,
  FileText
} from 'lucide-react';
import { IntegrationHub } from '../components/landing/IntegrationHub';
import { HeroWorkflow } from '../components/landing/HeroWorkflow';
import { WorkCategoriesShowcase } from '../components/landing/WorkCategoriesShowcase';
import { ScrollBlurSection } from '../components/landing/ScrollBlurSection';
import { BackgroundMesh } from '../components/landing/BackgroundMesh';

export const LandingPage: React.FC = () => {
  const { navigate } = useNavigation();
  const { login } = useApp();

  const handleAuthAndNavigate = (targetPath: string = '/dashboard') => {
    login();
    navigate(targetPath);
  };

  // Video Demo Modal
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Newsletter Form State for Footer
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Scroll listener to activate sticky navbar styling
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonials Row 1
  const row1Testimonials = [
    {
      quote:
        "I used to spend every morning fielding the same questions from three freelancers — 'what should I build next?' With AssignX, our supervisor Arjun coordinates the whole team and delivers ready-to-approve milestones.",
      author: 'Sophia Chen',
      role: 'Co-founder & CEO',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      companyIcon: '▲',
      companyName: 'Vercel Ecosystem'
    },
    {
      quote:
        'The technical supervisor runs automated test suites and architectural audits before asking for milestone sign-off. My team doesn\'t just review deliverables, we trust them completely.',
      author: 'Dan Lowe',
      role: 'Founder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      companyIcon: '◩',
      companyName: 'DB Analytics'
    },
    {
      quote:
        'The milestone escrow gave us complete peace of mind. We approved our restaurant web app milestone by milestone, only paying when results met our acceptance criteria.',
      author: 'Daniel Samantha',
      role: 'Restaurant Group CEO',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      companyIcon: '▤',
      companyName: 'Bistro Hospitality'
    },
    {
      quote:
        'AssignX caught an authentication edge case before our launch because the supervisor reviewed the code PRs behind the scenes. We never had to chase a single developer.',
      author: 'Robert Helios',
      role: 'Founder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      companyIcon: '✳',
      companyName: 'Loom Scale'
    }
  ];

  // Testimonials Row 2
  const row2Testimonials = [
    {
      quote:
        'Whenever we need changes, we just click Request Changes and our supervisor handles the coordination. We never have to debate scope or micromanage workers.',
      author: 'Marcus Kim',
      role: 'Product Lead',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      companyIcon: '⚡',
      companyName: 'Linear Partner'
    },
    {
      quote:
        'Milestone escrow completely eliminated our payment anxiety. Funds are only released when both our team and the technical supervisor verify acceptance criteria. Zero financial risk.',
      author: 'Elena Rostova',
      role: 'Co-founder',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      companyIcon: '⚡',
      companyName: 'Supabase Studio'
    },
    {
      quote:
        'We deployed a complete mobile app in three 2-week milestones. Having a single point of contact who understands software engineering is 100x better than managing contractors.',
      author: 'Aisha Patel',
      role: 'Head of Engineering',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
      companyIcon: '⚙',
      companyName: 'Retool Apps'
    },
    {
      quote:
        'Not once did we have to deal with freelance excuses or missed deadlines. Estimates were locked upfront, milestones were tracked live, and delivery was guaranteed.',
      author: 'David Vance',
      role: 'Director of Tech',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      companyIcon: 'S',
      companyName: 'Stripe Verified'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-slate-900 font-sans selection:bg-amber-200 selection:text-slate-900 overflow-x-clip relative">
      {/* Whole Background Ambient Mesh Gradient & Micro-Grid Canvas */}
      <BackgroundMesh />

      {/* ─────────────────────────────────────────────────────────────
          1. Clean Navbar (Fixed Top, Sticking Reliably During Scroll)
             * Brand: Pure text "AssignX" (No Logo Icon, No Subtitle)
             * Navigation: Home, Features ▾, Integrations, Blog, Testimonials
             * Actions: Login + Pill CTA ("+ Create Work")
          ───────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200 ${isScrolled
          ? 'bg-[#FAF8F5]/85 backdrop-blur-md shadow-xs border-b border-stone-200/60'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full max-w-[1640px] mx-auto px-6 sm:px-10 lg:px-12 h-16 flex items-center justify-between">
          {/* Brand Wordmark — Pure Text, High Contrast */}
          <div
            onClick={() => navigate('/landing')}
            className="cursor-pointer group"
          >
            <span className="text-2xl font-bold tracking-tight text-slate-950 group-hover:text-[#7B61FF] transition-colors">
              AssignX
            </span>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-900">
            <a href="#overview" className="text-slate-950 font-semibold hover:text-[#7B61FF] transition-colors">
              Home
            </a>
            <a href="#capabilities" className="hover:text-[#7B61FF] transition-colors flex items-center gap-1">
              <span>Features</span>
              <span className="text-[10px] text-slate-500">▾</span>
            </a>
            <a href="#work-categories" className="hover:text-[#7B61FF] transition-colors">
              Categories
            </a>
            <a href="#workspace-preview" className="hover:text-[#7B61FF] transition-colors">
              Client Panel
            </a>
            <a href="#testimonials" className="hover:text-[#7B61FF] transition-colors">
              Testimonials
            </a>
          </nav>

          {/* Right Actions: Login + Purple Pill CTA */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => handleAuthAndNavigate('/dashboard')}
              className="text-[15px] font-semibold text-slate-900 hover:text-[#7B61FF] transition-colors cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => handleAuthAndNavigate('/create')}
              className="bg-[#8B7CF8] hover:bg-[#7867f6] text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>+ Create Work</span>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to guarantee seamless layout flow under the fixed navbar */}
      <div className="h-16 w-full shrink-0" aria-hidden="true" />

      {/* ─────────────────────────────────────────────────────────────
          2. Hero Section with Orbital Badges & Luminous Product Mockup
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="overview" maxScale={1.05} maxBlur={8} minOpacity={0.35}>
        <section className="relative pt-6 pb-12 sm:pb-16 w-full bg-transparent overflow-hidden">
          <div className="w-full max-w-[1440px] mx-auto text-center">
            <HeroWorkflow
              onOpenDemo={() => setShowDemoModal(true)}
              onNavigate={handleAuthAndNavigate}
            />
          </div>
        </section>
      </ScrollBlurSection>

      {/* ─────────────────────────────────────────────────────────────
          2a. Social Proof Logo Strip
         ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection maxScale={1.03} maxBlur={5} minOpacity={0.5}>
        <section className="py-12 sm:py-16 bg-transparent w-full border-t border-slate-200/50">
          <div className="w-full max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#F8F9FA] rounded-3xl py-7 px-8 border border-slate-150/80 max-w-[1360px] 2xl:max-w-[1440px] mx-auto">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 mb-6 text-center">
                Trusted by founders and companies getting work done without freelance headaches
              </p>
              <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
                {/* Contentful */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border-[3.5px] border-t-[#0040C8] border-r-[#FFBC00] border-b-[#E62C4E] border-l-transparent -rotate-45" />
                  <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">contentful</span>
                </div>

                {/* Haskell */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center font-mono font-black text-[#5D4F85] text-lg tracking-tighter">
                    <span>&gt;&gt;</span>
                    <span className="text-sm font-bold ml-0.5">=</span>
                  </div>
                  <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">Haskell</span>
                </div>

                {/* Eventbrite */}
                <div className="flex items-center">
                  <span className="font-bold text-[#F05537] tracking-tight text-base sm:text-lg lowercase">eventbrite</span>
                </div>

                {/* Airwallex */}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M4 17L10 6L14 13L18 6L21 17H17L14 10L10 17H4Z" fill="#FF4D4D" />
                  </svg>
                  <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">Airwallex</span>
                </div>

                {/* Meteor */}
                <div className="flex items-center gap-0.5">
                  <span className="font-extrabold text-slate-900 tracking-wider text-base sm:text-lg flex items-center">
                    METE
                    <span className="inline-flex items-center justify-center text-[#DE4F4F] mx-0.5">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="3.5" fill="#DE4F4F" />
                        <path d="M12 4L12 7M12 17L12 20M4 12L7 12M17 12L20 12M6 6L8 8M16 16L18 18M6 18L8 16M16 8L18 6" stroke="#DE4F4F" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                    R
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollBlurSection>

      {/* ─────────────────────────────────────────────────────────────
          2. Category Work Showcase (Interactive Tabs & Client Intake)
         ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="work-categories" maxScale={1.04} maxBlur={6} minOpacity={0.4}>
        <WorkCategoriesShowcase />
      </ScrollBlurSection>

      {/* ─────────────────────────────────────────────────────────────
          2b. Inside the AssignX Workspace (Interactive Platform Preview)
             * Lime Green Badge: Workspace Preview
             * Heading & Subtitle
             * 4 Interactive Fanned-Out Perspective Cards
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="workspace-preview" maxScale={1.04} maxBlur={6} minOpacity={0.4}>
        <section className="py-12 sm:py-16 bg-transparent w-full text-center border-t border-slate-200/50">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-[#D4F870] text-slate-950 mb-3.5 shadow-2xs">
              Client Panel Preview
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 tracking-tight leading-[1.15]">
              Real-time Oversight, Zero Micromanagement
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Track milestones, communicate with your dedicated supervisor, and review verified deliverables inside an all-in-one execution hub.
            </p>

            {/* ─────────────────────────────────────────────────────────
              Floating UI Cards Spread (4 Clean White Interactive Cards)
              ───────────────────────────────────────────────────────── */}
            <div className="mt-10 sm:mt-12 relative w-full max-w-[1300px] mx-auto pt-4 pb-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left relative z-0">
                
                {/* Card 1: Active Project with Progress */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-slate-300/80 transition-all duration-300 ease-out transform lg:-rotate-3 hover:lg:-rotate-6 hover:-rotate-3 hover:scale-105 hover:-translate-y-2 hover:z-20 cursor-pointer relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

                  <div>
                    <div className="flex items-center justify-between mb-3 pt-1">
                      <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[11px] font-medium">
                        <span>● In Progress</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-normal">Deadline: 24 Sep</span>
                      <span className="text-slate-400 font-normal text-sm leading-none cursor-pointer">⋮</span>
                    </div>

                    <h4 className="text-sm font-medium text-slate-900 leading-snug mb-4">
                      Restaurant Website Redesign<br />& Online Ordering API
                    </h4>

                    <div className="mb-4">
                      <div className="flex justify-between text-[11px] text-slate-500 font-normal mb-1.5">
                        <span>Overall Progress</span>
                        <span className="font-medium text-slate-900">68%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[68%]" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-6 h-6 rounded-full border-2 border-white object-cover"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                        alt="Supervisor Arjun"
                      />
                      <span className="text-[11px] font-semibold text-slate-800">Arjun Mehta (Lead)</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3 text-slate-400" /> 8
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-slate-400" /> 14
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Direct Supervisor Communication & Change Request */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-slate-300/80 transition-all duration-300 ease-out transform lg:-rotate-0.5 hover:lg:-rotate-3 hover:-rotate-2 hover:scale-105 hover:-translate-y-2 hover:z-20 cursor-pointer relative flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-slate-400 mb-3 font-normal">Tell your supervisor...</div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-slate-500 text-xs">
                      <div className="flex items-center gap-2 font-medium text-slate-600">
                        <span className="cursor-pointer hover:text-slate-900 font-bold">B</span>
                        <span className="cursor-pointer hover:text-slate-900 italic font-serif">I</span>
                        <span className="cursor-pointer hover:text-slate-900 underline">U</span>
                        <Paperclip className="w-3 h-3 text-slate-400 hover:text-slate-700 cursor-pointer" />
                        <span className="cursor-pointer hover:text-slate-900 text-xs">😊</span>
                      </div>
                      <button className="bg-[#10B981] hover:bg-emerald-600 text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-xs transition-all cursor-pointer">
                        <Send className="w-2.5 h-2.5" />
                        <span>Send</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-1 flex items-start gap-2.5 text-left">
                    <img
                      className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                      alt="Supervisor Arjun Mehta"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-medium text-slate-900 truncate">
                          Arjun Mehta <span className="text-[10px] font-normal text-slate-400">Supervisor</span>
                        </p>
                        <span className="text-[9px] text-emerald-600 font-medium shrink-0 ml-1">Active</span>
                      </div>
                      <p className="text-[10.5px] text-slate-500 mt-1 leading-relaxed font-normal">
                        &ldquo;I reviewed the checkout flow test suite. Deliverable is uploaded and ready for your sign-off!&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Milestone Stages (Requirement Review, Planning, UI/UX, Development) */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-slate-300/80 transition-all duration-300 ease-out transform lg:rotate-1.5 hover:lg:rotate-3 hover:rotate-2 hover:scale-105 hover:-translate-y-2 hover:z-20 cursor-pointer relative flex flex-col justify-center">
                  <div className="space-y-2.5">
                    {/* 01 Requirement Review */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/40 transition-all">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px] font-bold">
                          ✓
                        </span>
                        <span className="text-xs font-medium text-slate-900">01 Requirement Review</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700">Completed</span>
                    </div>

                    {/* 02 UI/UX Design */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/40 transition-all">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px] font-bold">
                          ✓
                        </span>
                        <span className="text-xs font-medium text-slate-900">02 UI/UX Design</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700">₹15k Paid</span>
                    </div>

                    {/* 03 Development */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-blue-200 bg-blue-50/40 transition-all">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 border border-blue-200 px-1.5 py-0.5 rounded text-[10px] font-bold">
                          03
                        </span>
                        <span className="text-xs font-medium text-blue-900">Frontend Dev (68%)</span>
                      </div>
                      <span className="text-[10px] font-bold text-blue-700">Review</span>
                    </div>

                    {/* 04 Testing & Launch */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 transition-all">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-medium">
                          04
                        </span>
                        <span className="text-xs font-medium text-slate-600">Testing & Launch</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Upcoming</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: Team Behind the Scenes Managed by Supervisor */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-slate-300/80 transition-all duration-300 ease-out transform lg:rotate-3 hover:lg:rotate-6 hover:rotate-3 hover:scale-105 hover:-translate-y-2 hover:z-20 cursor-pointer relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-800 mb-3 pb-2 border-b border-slate-100">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Managed Team
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">Zero Client Effort</span>
                    </div>

                    <div className="space-y-2.5">
                      {/* Supervisor */}
                      <div className="flex items-center justify-between bg-purple-50/60 p-2 rounded-xl border border-purple-100">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-6 h-6 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                            alt="Arjun"
                          />
                          <div>
                            <p className="text-[11px] font-bold text-slate-900 leading-tight">Arjun Mehta</p>
                            <p className="text-[9px] text-[#7B61FF] font-semibold">Your Supervisor</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-amber-600">⭐ 4.9</span>
                      </div>

                      {/* Vetted Doer 1 */}
                      <div className="flex items-center justify-between p-1.5 text-left">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-5 h-5 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                            alt="Elena"
                          />
                          <div>
                            <p className="text-[10.5px] font-medium text-slate-800 leading-tight">Frontend Specialist</p>
                            <p className="text-[8.5px] text-slate-400">Managed by Arjun</p>
                          </div>
                        </div>
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                      </div>

                      {/* Vetted Doer 2 */}
                      <div className="flex items-center justify-between p-1.5 text-left">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-5 h-5 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80"
                            alt="Marcus"
                          />
                          <div>
                            <p className="text-[10.5px] font-medium text-slate-800 leading-tight">Backend Engineer</p>
                            <p className="text-[8.5px] text-slate-400">Managed by Arjun</p>
                          </div>
                        </div>
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-center">
                    <p className="text-[10px] text-slate-500">
                      The client never has to manage individual workers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Subtle Gradient Fade at bottom of the cards */}
              <div className="pointer-events-none absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" />
            </div>
          </div>
        </section>
      </ScrollBlurSection>

      {/* ─────────────────────────────────────────────────────────────
          3. Section: "The 3 Pillars of Managed Client Delivery" (3-Card Section)
              * Lime Badge: Why Choose Us
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="capabilities" maxScale={1.04} maxBlur={6} minOpacity={0.4}>
        <section className="py-10 sm:py-14 bg-transparent w-full text-center">
          <div className="w-full max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 mb-3 shadow-2xs">
              Why Choose AssignX
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 tracking-tight leading-[1.15]">
              How Managed Delivery Protects Your Work
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Traditional marketplaces leave you stranded managing freelancers, dealing with delays, and fixing bad code. AssignX gives you dedicated supervisors and guaranteed milestone results.
            </p>

            {/* 3 Value Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 sm:mt-10 text-left">
              {/* Card 1: Purple Accent */}
              <div className="bg-white rounded-2xl p-7 border border-[#E9E4FD] shadow-xs hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#8B7CF8] text-white flex items-center justify-center mb-5 shadow-xs">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-slate-950 tracking-tight mb-2">
                  1. Tell Us What You Need
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  No complex briefs or technical jargon required. Just describe your goal, select a category, and specify your deadline or budget in a simple 6-step guided intake.
                </p>
              </div>

              {/* Card 2: Cyan Accent */}
              <div className="bg-white rounded-2xl p-7 border border-[#D9F4FD] shadow-xs hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#38BDF8] text-white flex items-center justify-center mb-5 shadow-xs">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-slate-950 tracking-tight mb-2">
                  2. Dedicated Supervisor Oversight
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  An experienced technical supervisor owns your project. They coordinate vetted talent, enforce code quality, run QA, and serve as your single point of contact.
                </p>
              </div>

              {/* Card 3: Amber / Yellow Accent */}
              <div className="bg-white rounded-2xl p-7 border border-[#FEEFC4] shadow-xs hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#F5CD52] text-slate-950 flex items-center justify-center mb-5 shadow-xs">
                  <Lock className="w-6 h-6 text-slate-950" />
                </div>
                <h3 className="text-lg font-medium text-slate-950 tracking-tight mb-2">
                  3. Protected Milestone Payments
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Never pay upfront for incomplete work. Funds are held safely in escrow and only released after you inspect and approve each milestone deliverable.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollBlurSection>

      {/* ─────────────────────────────────────────────────────────────
          4. Section: "Adopt a More Intelligent Work Approach" (Bento Grid)
             * Lime Badge: Features
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="features" maxScale={1.04} maxBlur={6} minOpacity={0.4}>
        <section className="py-10 sm:py-14 bg-transparent w-full text-center">
          <div className="w-full max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 mb-3 shadow-2xs">
              Client Panel Features
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 tracking-tight leading-[1.15]">
              Everything You Need to Track, Review & Approve
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              The AssignX client panel reduces your work to 5 simple steps: Request, Understand, Track, Approve, and Pay. Everything else is handled by AssignX behind the scenes.
            </p>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8 sm:mt-10 text-left">
              {/* Left Column (5 cols): Tall Workspace Photo Card */}
              <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[480px] lg:min-h-[580px] shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
                  alt="Client and Supervisor Collaboration"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-8">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 w-fit mb-3">
                    Supervisor Channel
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white leading-tight">
                    Direct Communication <br />With Your Project Lead
                  </h3>
                  <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                    Ask questions, provide feedback, and receive milestone previews directly from your assigned supervisor.
                  </p>
                </div>
              </div>

              {/* Right Column (7 cols): Split Top & Bottom */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Top Sub-Card: Supervisor Team Coordination */}
                <div className="bg-[#EBE7FD] rounded-3xl p-6 sm:p-8 border border-[#DFD9FC] flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="w-full md:w-5/12">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#8B7CF8] text-white mb-3">
                      Behind The Scenes
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-slate-950 leading-snug">
                      Your Supervisor Manages The Entire Team
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      You never need to source workers, manage tasks, or run daily standups.
                    </p>
                  </div>

                  {/* Floating Supervisor Match Preview */}
                  <div className="w-full md:w-7/12 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-150 text-[11px] text-slate-500 mb-3">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Assigned Project Supervisor</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          className="w-8 h-8 rounded-full object-cover border"
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                          alt="Arjun Mehta"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Arjun Mehta</p>
                          <p className="text-[10px] text-slate-500">Technical Supervisor ⭐ 4.9</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Active Lead
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-600">
                      <div className="flex items-center justify-between py-1 border-b border-slate-100">
                        <span>Frontend Implementation</span>
                        <span className="font-semibold text-emerald-600">QA Verified</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-slate-100">
                        <span>Backend & Database APIs</span>
                        <span className="font-semibold text-blue-600">In Progress</span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span>Automated CI/CD Pipeline</span>
                        <span className="font-semibold text-slate-500">Scheduled</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Sub-Row: 2 Cards (White Task Card + Cyan Overview Card) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                  {/* Card 1: Detailed Milestone Deliverable Card */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                          <span>🔔 Action Required</span>
                          <span>Review Ready</span>
                        </div>
                        <span className="text-slate-400 text-sm">⋮</span>
                      </div>

                      <h4 className="text-sm font-medium text-slate-950 leading-snug">
                        Restaurant Website Homepage & Reservation System
                      </h4>

                      <div className="mt-4">
                        <div className="flex justify-between text-[11px] text-slate-500 font-normal mb-1">
                          <span>Milestone 2 Progress</span>
                          <span className="font-semibold text-slate-900">68%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full w-[68%]" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-slate-600 font-medium">Supervisor: Arjun Mehta</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3 text-slate-400" /> 8 Files
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Soft Cyan Overview Card */}
                  <div className="bg-[#E2F7FD] rounded-3xl p-6 border border-[#CEEFF8] flex flex-col justify-center items-start">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#38BDF8] text-white mb-3">
                      Action Required Hub
                    </span>
                    <h3 className="text-xl font-normal text-slate-950 leading-snug">
                      Instant Visibility Into Work Requiring Your Input
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Review designs, approve completed milestones, or release payments in one click.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollBlurSection>

      {/* ─────────────────────────────────────────────────────────────
          5. Section: "Integrate with Your Favorite Tools" (Network Hub)
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="integrations" maxScale={1.04} maxBlur={6} minOpacity={0.4}>
        <section className="py-12 sm:py-20 bg-transparent w-full text-center overflow-hidden">
          <div className="w-full max-w-[1640px] 2xl:max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-[#D4F870] text-slate-950 mb-3.5 shadow-2xs">
              Ecosystem & Tools
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 tracking-tight leading-[1.15]">
              Seamless Integration with Your Workflow
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Connect your existing tools to AssignX. Access Figma files, preview Vercel deployments, receive Slack notifications, and download itemized tax invoices effortlessly.
            </p>

            {/* Full-Width Integration Network Canvas */}
            <IntegrationHub />
          </div>
        </section>
      </ScrollBlurSection>

      {/* ─────────────────────────────────────────────────────────────
          7. Section: "Get Smarter with Our Recent Posts" (Blog Grid)
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="insights" maxScale={1.04} maxBlur={6} minOpacity={0.4}>
        <section className="py-10 sm:py-14 bg-transparent w-full text-center">
          <div className="w-full max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 mb-3 shadow-2xs">
              Knowledge & Insights
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 tracking-tight leading-[1.15]">
              Get Smarter with Our Recent Posts
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Actionable guides on managed project delivery, milestone escrow protection, and scaling products without the headache of managing contractors.
            </p>

            {/* 5-Card Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 sm:mt-10 text-left">
              {/* Blog Post 1 */}
              <div className="rounded-3xl overflow-hidden relative min-h-[260px] shadow-xs group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
                  alt="Post 1"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D4F870] text-slate-950 w-fit mb-2">
                    Managed Delivery
                  </span>
                  <h4 className="text-sm font-medium text-white leading-snug">
                    Why Managing Freelancers is Broken (And How Dedicated Supervisors Fix It)
                  </h4>
                </div>
              </div>

              {/* Blog Post 2 (Center Tall Post) */}
              <div className="rounded-3xl overflow-hidden relative min-h-[260px] lg:row-span-2 lg:min-h-[544px] shadow-xs group">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80"
                  alt="Post 2"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D4F870] text-slate-950 w-fit mb-2">
                    Client Guide
                  </span>
                  <h4 className="text-base sm:text-lg font-medium text-white leading-snug">
                    The 5-Step Client Journey: From Plain-English Requirement to Production Launch
                  </h4>
                </div>
              </div>

              {/* Blog Post 3 */}
              <div className="rounded-3xl overflow-hidden relative min-h-[260px] shadow-xs group">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=80"
                  alt="Post 3"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D4F870] text-slate-950 w-fit mb-2">
                    Budget Security
                  </span>
                  <h4 className="text-sm font-medium text-white leading-snug">
                    Milestone Escrow: How Smart Founders Protect Their Project Budget
                  </h4>
                </div>
              </div>

              {/* Blog Post 4 */}
              <div className="rounded-3xl overflow-hidden relative min-h-[260px] shadow-xs group">
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80"
                  alt="Post 4"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D4F870] text-slate-950 w-fit mb-2">
                    Quality Assurance
                  </span>
                  <h4 className="text-sm font-medium text-white leading-snug">
                    How Technical QA and Automated Tests Save Months of Rework
                  </h4>
                </div>
              </div>

              {/* Blog Post 5 */}
              <div className="rounded-3xl overflow-hidden relative min-h-[260px] shadow-xs group">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80"
                  alt="Post 5"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D4F870] text-slate-950 w-fit mb-2">
                    Product Scaling
                  </span>
                  <h4 className="text-sm font-medium text-white leading-snug">
                    Building Custom Mobile & Web Apps Without Hiring In-House Engineers
                  </h4>
                </div>
              </div>
            </div>

            {/* Read More Articles Button */}
            <div className="mt-8">
              <button
                onClick={() => handleAuthAndNavigate('/dashboard')}
                className="bg-[#8B7CF8] hover:bg-[#7867f6] text-white font-medium px-8 py-3 rounded-full text-sm shadow-xs hover:shadow transition-all cursor-pointer"
              >
                Read More Articles
              </button>
            </div>
          </div>
        </section>
      </ScrollBlurSection>

      {/* ─────────────────────────────────────────────────────────────
          8. Section: "They Stopped Managing Freelancers" (Testimonials)
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="testimonials" maxScale={1.04} maxBlur={6} minOpacity={0.4}>
        <section className="py-8 sm:py-10 bg-transparent w-full overflow-hidden">
          {/* Left-Aligned Header */}
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 mb-4 sm:mb-5 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium text-slate-950 tracking-tight leading-[1.15]">
              They Stopped Being <br />The Project Bottleneck
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed font-normal">
              Reclaimed founder hours, zero worker micromanagement, and verified deliverables shipped on time.
            </p>
          </div>

          {/* Dual Staggered Horizontal Marquee Rows */}
          <div className="relative w-full overflow-hidden">
            {/* Edge Gradient Masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-14 sm:w-28 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-28 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" />

            {/* Row 1 */}
            <div className="flex mb-3.5 overflow-hidden">
              <div className="animate-marquee-left flex gap-4 shrink-0 py-0.5">
                {[...row1Testimonials, ...row1Testimonials].map((item, idx) => (
                  <div
                    key={idx}
                    className="w-[290px] sm:w-[345px] shrink-0 p-5 sm:p-5.5 bg-[#F8F9FA] rounded-xl sm:rounded-2xl border border-slate-200/60 flex flex-col justify-between text-left hover:border-slate-300 hover:bg-[#F5F6F8] transition-all cursor-default"
                  >
                    <p className="text-slate-800 text-xs sm:text-[12.5px] leading-relaxed font-normal mb-4">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 mt-auto">
                      <div className="flex items-center gap-2">
                        <img
                          className="w-7 h-7 rounded-full object-cover shrink-0"
                          src={item.avatar}
                          alt={item.author}
                        />
                        <div>
                          <h4 className="text-xs font-medium text-slate-900 leading-tight">
                            {item.author}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-normal">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 opacity-90">
                        {item.companyIcon && <span className="text-[11px]">{item.companyIcon}</span>}
                        <span>{item.companyName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 (Staggered Movement) */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee-right flex gap-4 shrink-0 py-0.5">
                {[...row2Testimonials, ...row2Testimonials].map((item, idx) => (
                  <div
                    key={idx}
                    className="w-[290px] sm:w-[345px] shrink-0 p-5 sm:p-5.5 bg-[#F8F9FA] rounded-xl sm:rounded-2xl border border-slate-200/60 flex flex-col justify-between text-left hover:border-slate-300 hover:bg-[#F5F6F8] transition-all cursor-default"
                  >
                    <p className="text-slate-800 text-xs sm:text-[12.5px] leading-relaxed font-normal mb-4">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 mt-auto">
                      <div className="flex items-center gap-2">
                        <img
                          className="w-7 h-7 rounded-full object-cover shrink-0"
                          src={item.avatar}
                          alt={item.author}
                        />
                        <div>
                          <h4 className="text-xs font-medium text-slate-900 leading-tight">
                            {item.author}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-normal">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 opacity-90">
                        {item.companyIcon && <span className="text-[11px]">{item.companyIcon}</span>}
                        <span>{item.companyName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollBlurSection>

      {/* ─────────────────────────────────────────────────────────────
          9. Modern Editorial Footer
          ───────────────────────────────────────────────────────────── */}
      <footer className="w-full bg-transparent border-t border-slate-200/60 pt-12 sm:pt-16 pb-0 relative overflow-hidden text-slate-900">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch pb-4 sm:pb-6">

            {/* ── Left Column: Gradient Aurora Card (4 cols) ───────── */}
            <div className="lg:col-span-4 flex">
              <div
                className="w-full rounded-[28px] p-7 sm:p-8 flex flex-col justify-between shadow-sm border border-white/40 relative overflow-hidden flex-1 min-h-[380px]"
                style={{
                  background: 'linear-gradient(165deg, #E6A222 0%, #D48E28 20%, #687BB8 52%, #4964B0 82%, #38539E 100%)'
                }}
              >
                <div className="relative z-10">
                  {/* Brand Wordmark */}
                  <div className="flex items-center gap-2.5">
                    <div className="grid grid-cols-2 gap-1 w-5 h-5">
                      <div className="w-2 h-2 rounded-[2px] bg-white shadow-xs" />
                      <div className="w-2 h-2 rounded-[2px] bg-white shadow-xs" />
                      <div className="w-2 h-2 rounded-[2px] bg-white shadow-xs" />
                      <div className="w-2 h-2 rounded-[2px] bg-white shadow-xs" />
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
                      AssignX
                    </span>
                  </div>
                </div>

                {/* Middle Value Proposition Copy */}
                <div className="relative z-10 my-8">
                  <p className="text-white text-base sm:text-lg font-medium leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] max-w-[270px]">
                    Tell AssignX what you need. Track progress. Approve results.
                  </p>
                </div>

                {/* Bottom Row: Follow us + 3 Social Buttons */}
                <div className="relative z-10 flex items-center justify-between pt-2">
                  <span className="text-white font-medium text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                    Follow us
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Instagram */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-xl bg-white text-slate-800 flex items-center justify-center shadow-md hover:bg-slate-50 hover:scale-105 transition-all cursor-pointer"
                      aria-label="Instagram"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-xl bg-white text-slate-800 flex items-center justify-center shadow-md hover:bg-slate-50 hover:scale-105 transition-all cursor-pointer"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0-.03-3.2 1.6 1.6 0 0 0 .03 3.2m1.37 9.74v-8.37H5.09v8.37h2.74z" />
                      </svg>
                    </a>
                    {/* X (Twitter) */}
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-xl bg-white text-slate-800 flex items-center justify-center shadow-md hover:bg-slate-50 hover:scale-105 transition-all cursor-pointer"
                      aria-label="X"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Bordered Container: Product & Company Links + Newsletter (8 cols) ─── */}
            <div className="lg:col-span-8 flex">
              <div className="w-full bg-white rounded-[28px] border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-150 h-full">

                  {/* Middle Column: Links & Copyright */}
                  <div className="p-7 sm:p-9 flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-6 sm:gap-8">
                      {/* Column 1: PRODUCT */}
                      <div>
                        <h4 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-4">
                          PRODUCT
                        </h4>
                        <ul className="space-y-3 text-xs sm:text-sm font-normal text-slate-700">
                          <li>
                            <button onClick={() => setShowDemoModal(true)} className="hover:text-slate-950 transition-colors text-left cursor-pointer">
                              How it works
                            </button>
                          </li>
                          <li>
                            <a href="#capabilities" className="hover:text-slate-950 transition-colors">
                              Features
                            </a>
                          </li>
                          <li>
                            <a href="#work-categories" className="hover:text-slate-950 transition-colors">
                              Categories
                            </a>
                          </li>
                          <li>
                            <a href="#testimonials" className="hover:text-slate-950 transition-colors">
                              Testimonials
                            </a>
                          </li>
                          <li>
                            <button onClick={() => handleAuthAndNavigate('/dashboard')} className="hover:text-slate-950 transition-colors text-left cursor-pointer">
                              Client Panel
                            </button>
                          </li>
                        </ul>
                      </div>

                      {/* Column 2: COMPANY */}
                      <div>
                        <h4 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-4">
                          COMPANY
                        </h4>
                        <ul className="space-y-3 text-xs sm:text-sm font-normal text-slate-700">
                          <li>
                            <button onClick={() => handleAuthAndNavigate('/create')} className="hover:text-slate-950 transition-colors text-left cursor-pointer">
                              Create Work
                            </button>
                          </li>
                          <li>
                            <a href="#insights" className="hover:text-slate-950 transition-colors">
                              Blog
                            </a>
                          </li>
                          <li>
                            <button onClick={() => setShowDemoModal(true)} className="hover:text-slate-950 transition-colors text-left cursor-pointer">
                              About AssignX
                            </button>
                          </li>
                          <li>
                            <button onClick={() => handleAuthAndNavigate('/dashboard')} className="hover:text-slate-950 transition-colors text-left cursor-pointer">
                              Privacy policy
                            </button>
                          </li>
                          <li>
                            <button onClick={() => handleAuthAndNavigate('/dashboard')} className="hover:text-slate-950 transition-colors text-left cursor-pointer">
                              Terms of service
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Bottom hairline & Copyright */}
                    <div className="pt-6 mt-8 sm:mt-12 border-t border-slate-150">
                      <p className="text-xs text-slate-500 font-normal">
                        © 2026 AssignX. All rights reserved.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Newsletter & Tagline */}
                  <div className="p-7 sm:p-9 flex flex-col justify-between">
                    <div>
                      {/* AssignX Badge */}
                      <div className="inline-flex items-center gap-2 mb-6">
                        <div className="w-5 h-5 bg-[#FF6600] rounded-xs flex items-center justify-center text-white font-bold text-xs leading-none">
                          A
                        </div>
                        <span className="text-xs font-medium text-slate-800">
                          AssignX Managed Delivery
                        </span>
                      </div>

                      {/* Newsletter Heading */}
                      <h3 className="text-xl sm:text-2xl font-medium text-slate-950 tracking-tight leading-snug mb-5 max-w-xs">
                        Product Delivery Insights, Straight To Your Inbox
                      </h3>

                      {/* Newsletter Form */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (newsletterEmail) {
                            setNewsletterSubscribed(true);
                            setTimeout(() => setNewsletterSubscribed(false), 4000);
                          }
                        }}
                        className="space-y-2.5 max-w-sm"
                      >
                        <input
                          type="email"
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="your @email.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-400 shadow-2xs transition-all"
                        />
                        <button
                          type="submit"
                          className="w-full py-3 px-5 rounded-xl text-white text-xs sm:text-sm font-medium bg-gradient-to-b from-[#3B3A49] via-[#2A2938] to-[#1C1B26] hover:from-[#474558] hover:to-[#22212E] border-t border-white/20 shadow-md transition-all cursor-pointer flex items-center justify-center"
                        >
                          {newsletterSubscribed ? '✓ You’re In The Loop!' : 'Stay In The Loop'}
                        </button>
                      </form>
                    </div>

                    {/* Bottom Microcopy */}
                    <div className="pt-4 sm:pt-6">
                      <p className="text-[11px] text-slate-500 leading-relaxed font-normal max-w-xs">
                        *No spam. Founder-focused insights on managed project delivery, milestone workflows, and async execution.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Brand Watermark Typography */}
        <div className="w-full flex items-center justify-center overflow-hidden select-none pointer-events-none mt-2 sm:mt-4 -mb-2 sm:-mb-3">
          <span className="font-bold text-[17vw] sm:text-[18.5vw] lg:text-[20vw] xl:text-[21.5vw] bg-gradient-to-b from-slate-900/35 via-slate-800/20 to-slate-900/5 bg-clip-text text-transparent tracking-tighter leading-[0.85] select-none block w-full text-center whitespace-nowrap">
            AssignX
          </span>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          Video Walkthrough / Platform Overview Modal
          ───────────────────────────────────────────────────────────── */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 mb-3">
              Platform Walkthrough
            </div>

            <h3 className="text-2xl font-normal text-slate-950 tracking-tight">
              How AssignX Works
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Tell AssignX what you need → Track work → Communicate with your supervisor → Approve results → Make milestone payments. Zero freelancer management on your side.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-950 aspect-video flex flex-col items-center justify-center text-white relative overflow-hidden border border-slate-800">
              <div className="w-14 h-14 rounded-full bg-[#F5CD52] text-slate-950 flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <span className="text-xs text-slate-400 mt-3 font-medium">Click to Play 2-Min Interactive Overview</span>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-150">
              <span className="text-xs text-slate-500">Ready to start your project?</span>
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  handleAuthAndNavigate('/create');
                }}
                className="bg-[#8B7CF8] hover:bg-[#7867f6] text-white font-medium px-6 py-2.5 rounded-full text-xs shadow-xs transition-all cursor-pointer"
              >
                + Create Work Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
