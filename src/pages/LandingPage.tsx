/* ═══════════════════════════════════════════════════════════
   AssignX — Managed Work & Project Delivery Platform
   UI Structure, Color Palette & Typography: 1:1 Match with Reference Design
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
  Search,
  CheckSquare,
  Square,
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

  // Newsletter Form State for Priora-style Footer
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Member checklist interactive state for Hero & Feature Cards
  const [selectedMembers, setSelectedMembers] = useState<Record<string, boolean>>({
    momina: true,
    lisa: false,
    marcus: true,
    elena: true,
    aisha: false
  });

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Scroll listener to activate sticky navbar styling
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonials Row 1 (Direct match to reference Image 1)
  const row1Testimonials = [
    {
      quote:
        "I used to start every morning fielding the same question from three contractors — 'what should I work on?' That question doesn't exist in our team anymore.",
      author: 'Sophia Chen',
      role: 'Co-founder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      companyIcon: '▲',
      companyName: 'Vercel'
    },
    {
      quote:
        'The technical supervisor runs automated test suites and architectural audits before asking for milestone sign-off. My team doesn\'t just review deliverables, they trust them. That\'s the difference.',
      author: 'Dan Lowe',
      role: 'Founder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      companyIcon: '◩',
      companyName: 'DB금융투자'
    },
    {
      quote:
        'Our team feels more aligned because priorities and acceptance criteria live in one verifiable place—not scattered across five messy tools.',
      author: 'Daniel Samantha',
      role: 'CEO',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      companyIcon: '▤',
      companyName: 'databricks'
    },
    {
      quote:
        'AssignX caught an authentication race condition before our investor demo because of how the supervisor validated dependencies. That single catch justified the whole year.',
      author: 'Robert Helios',
      role: 'Founder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      companyIcon: '✳',
      companyName: 'loom'
    }
  ];

  // Testimonials Row 2 (Direct match to reference Image 1)
  const row2Testimonials = [
    {
      quote:
        'It caught a customer-facing schema regression that would\'ve delayed our launch. The architectural reasoning behind every supervisor review made it easy to trust.',
      author: 'Marcus Kim',
      role: 'Product Lead',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      companyIcon: '⚡',
      companyName: 'Linear'
    },
    {
      quote:
        'Milestone escrow completely eliminated our payment anxiety. Funds are only released when both our team and the technical supervisor verify acceptance criteria. Zero financial risk.',
      author: 'Elena Rostova',
      role: 'Co-founder',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      companyIcon: '⚡',
      companyName: 'Supabase'
    },
    {
      quote:
        'We deployed a complete multi-tenant AI workflow in three 2-week sprints. The daily async standups and PR sign-offs felt like having an elite in-house engineering team.',
      author: 'Aisha Patel',
      role: 'Head of Engineering',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
      companyIcon: '⚙',
      companyName: 'retool'
    },
    {
      quote:
        'Not once did we have to debate scope creep or missing requirements. Scopes are scored upfront, milestones are locked, and delivery is guaranteed.',
      author: 'David Vance',
      role: 'Director of Tech',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      companyIcon: 'S',
      companyName: 'stripe'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-slate-900 font-sans selection:bg-amber-200 selection:text-slate-900 overflow-x-clip relative">
      {/* Whole Background Ambient Mesh Gradient & Micro-Grid Canvas */}
      <BackgroundMesh />

      {/* ─────────────────────────────────────────────────────────────
          1. Clean Navbar (Fixed Top, Sticking Reliably During Scroll)
             * Brand: Pure text "AssignX" (No Logo Icon, No Subtitle)
             * Navigation: Home, Feature ▾, Pricing, Contact, Blog
             * Actions: Login + Purple Pill CTA ("Try 7 Day Trial" / "Get Started")
             * Dynamic scroll transition: seamless at top, frosted glass on scroll
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

          {/* Center Navigation Links — Highly Visible Slate-900 Text */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-900">
            <a href="#overview" className="text-slate-950 font-semibold hover:text-[#7B61FF] transition-colors">
              Home
            </a>
            <a href="#capabilities" className="hover:text-[#7B61FF] transition-colors flex items-center gap-1">
              <span>Features</span>
              <span className="text-[10px] text-slate-500">▾</span>
            </a>
            <a href="#integrations" className="hover:text-[#7B61FF] transition-colors">
              Integrations
            </a>
            <a href="#insights" className="hover:text-[#7B61FF] transition-colors">
              Blog
            </a>
            <a href="#testimonials" className="hover:text-[#7B61FF] transition-colors">
              Testimonials
            </a>
          </nav>

          {/* Right Actions: Login + Soft Purple Pill CTA */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => handleAuthAndNavigate('/dashboard')}
              className="text-[15px] font-semibold text-slate-900 hover:text-[#7B61FF] transition-colors cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => handleAuthAndNavigate('/create')}
              className="bg-[#8B7CF8] hover:bg-[#7867f6] text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-xs hover:shadow transition-all cursor-pointer"
            >
              Try 7 Day Trial
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to guarantee seamless layout flow under the fixed navbar */}
      <div className="h-16 w-full shrink-0" aria-hidden="true" />

      {/* ─────────────────────────────────────────────────────────────
          2. Hero Section with Orbital Badges & Luminous Product Mockup
             * Exact 1:1 Match with Reference Design
             * Y Combinator W25 Badge, Clean Headline, Dual CTAs, Orbital Badges
             * Interactive 3-Panel Product Mockup Canvas
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
          2a. Social Proof Logo Strip (Dedicated Section Below Hero Fold)
         ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection maxScale={1.03} maxBlur={5} minOpacity={0.5}>
        <section className="py-12 sm:py-16 bg-transparent w-full border-t border-slate-200/50">
          <div className="w-full max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#F8F9FA] rounded-3xl py-7 px-8 border border-slate-150/80 max-w-[1360px] 2xl:max-w-[1440px] mx-auto">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 mb-6 text-center">
                Trusted by the world&apos;s most innovative teams
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
          2. Category Work Showcase (Interactive Tabs & Doer Dashboard Mockup)
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
              Workspace Preview
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 tracking-tight leading-[1.15]">
              Real-time Oversight, Zero Micromanagement
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Track milestones, collaborate with your appointed supervisor, and monitor active deliverables inside an all-in-one execution hub.
            </p>

            {/* ─────────────────────────────────────────────────────────
              Floating UI Cards Spread (4 Clean White Interactive Cards)
              Fanned-out perspective with smooth bottom gradient fade
              ───────────────────────────────────────────────────────── */}
            <div className="mt-10 sm:mt-12 relative w-full max-w-[1300px] mx-auto pt-4 pb-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left relative z-0">
                {/* Card 1: Review of Cutting-Edge Plugin Capabilities */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-slate-300/80 transition-all duration-300 ease-out transform lg:-rotate-3 hover:lg:-rotate-6 hover:-rotate-3 hover:scale-105 hover:-translate-y-2 hover:z-20 cursor-pointer relative overflow-hidden flex flex-col justify-between">
                  {/* Purple/Violet Top Glow Border */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

                  <div>
                    <div className="flex items-center justify-between mb-3 pt-1">
                      <div className="flex items-center gap-1 bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded-full text-[11px] font-medium">
                        <span>🔥 High</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-normal">Due: 30th June...</span>
                      <span className="text-slate-400 font-normal text-sm leading-none cursor-pointer">⋮</span>
                    </div>

                    <h4 className="text-sm font-medium text-slate-900 leading-snug mb-4">
                      Review of Cutting-Edge<br />Plugin Capabilities and Fu...
                    </h4>

                    <div className="mb-4">
                      <div className="flex justify-between text-[11px] text-slate-500 font-normal mb-1.5">
                        <span>Progress</span>
                        <span className="font-medium text-slate-900">60%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[60%]" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex -space-x-1.5">
                        <img
                          className="w-6 h-6 rounded-full border-2 border-white object-cover"
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                          alt="Avatar 1"
                        />
                        <img
                          className="w-6 h-6 rounded-full border-2 border-white object-cover"
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                          alt="Avatar 2"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal pl-2">+4</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3 text-slate-400" /> 12
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-slate-400" /> 16
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Write Here Editor & Momina Message Card */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-slate-300/80 transition-all duration-300 ease-out transform lg:-rotate-0.5 hover:lg:-rotate-3 hover:-rotate-2 hover:scale-105 hover:-translate-y-2 hover:z-20 cursor-pointer relative flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-slate-400 mb-3 font-normal">Write here..</div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-slate-500 text-xs">
                      <div className="flex items-center gap-2 font-medium text-slate-600">
                        <span className="cursor-pointer hover:text-slate-900 font-bold">B</span>
                        <span className="cursor-pointer hover:text-slate-900 italic font-serif">I</span>
                        <span className="cursor-pointer hover:text-slate-900 underline">U</span>
                        <span className="cursor-pointer hover:text-slate-900 text-[11px]">@</span>
                        <Paperclip className="w-3 h-3 text-slate-400 hover:text-slate-700 cursor-pointer" />
                        <span className="cursor-pointer hover:text-slate-900 text-xs">😊</span>
                      </div>
                      <button className="bg-[#10B981] hover:bg-emerald-600 text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-xs transition-all cursor-pointer">
                        <Send className="w-2.5 h-2.5" />
                        <span>Submit</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-1 flex items-start gap-2.5 text-left">
                    <img
                      className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                      alt="Momina Mustehsan"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-medium text-slate-900 truncate">
                          Momina Mustehsan <span className="text-[10px] font-normal text-slate-400">25 minutes ago</span>
                        </p>
                        <span className="text-[9px] text-slate-400 font-normal shrink-0 ml-1">Most Recent ↓↑</span>
                      </div>
                      <p className="text-[10.5px] text-slate-500 mt-1 leading-relaxed font-normal">
                        Hey, I just completed the initial draft for the marketing campaign before the deadline. Should I move onto the next task? 😊
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Kanban Columns Card (03 To Do, 04 Work In Progress, 04 Under Review) */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-slate-300/80 transition-all duration-300 ease-out transform lg:rotate-1.5 hover:lg:rotate-3 hover:rotate-2 hover:scale-105 hover:-translate-y-2 hover:z-20 cursor-pointer relative flex flex-col justify-center">
                  <div className="space-y-3">
                    {/* 03 To Do */}
                    <div className="flex items-center justify-between p-3 rounded-xl border border-blue-200/80 bg-white hover:bg-blue-50/20 transition-all">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded text-[11px] font-medium">
                          03
                        </span>
                        <span className="text-xs font-medium text-slate-800">To Do</span>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-[#8B7CF8] text-white text-xs font-medium flex items-center justify-center shadow-xs">
                        +
                      </span>
                    </div>

                    {/* 04 Work In Progress */}
                    <div className="flex items-center justify-between p-3 rounded-xl border border-rose-200/80 bg-white hover:bg-rose-50/20 transition-all">
                      <div className="flex items-center gap-2">
                        <span className="bg-rose-50 text-rose-600 border border-rose-200 px-1.5 py-0.5 rounded text-[11px] font-medium">
                          04
                        </span>
                        <span className="text-xs font-medium text-rose-600">Work In Progress</span>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-xs font-medium flex items-center justify-center shadow-xs">
                        +
                      </span>
                    </div>

                    {/* 04 Under Review */}
                    <div className="flex items-center justify-between p-3 rounded-xl border border-amber-200/80 bg-white hover:bg-amber-50/20 transition-all">
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded text-[11px] font-medium">
                          04
                        </span>
                        <span className="text-xs font-medium text-amber-600">Under Review</span>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-white text-xs font-medium flex items-center justify-center shadow-xs">
                        +
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 4: Invite & Assign Member Checklist Card */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-slate-300/80 transition-all duration-300 ease-out transform lg:rotate-3 hover:lg:rotate-6 hover:rotate-3 hover:scale-105 hover:-translate-y-2 hover:z-20 cursor-pointer relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/80 text-[11px] text-slate-400 mb-3">
                      <Search className="w-3 h-3 text-slate-400" />
                      <span>Search name...</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-700 mb-3 pb-2 border-b border-slate-100">
                      <span className="flex items-center gap-1.5">
                        <Square className="w-3.5 h-3.5 text-slate-400" /> Assign All
                      </span>
                      <span className="text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer font-medium">
                        <span>+</span> Invite Team Member
                      </span>
                    </div>

                    <div className="space-y-3">
                      {/* Member 1: Momina Mustehsan */}
                      <div
                        onClick={() => toggleMember('momina')}
                        className="flex items-center gap-2.5 text-left cursor-pointer"
                      >
                        {selectedMembers.momina ? (
                          <CheckSquare className="w-4 h-4 text-[#7B61FF]" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300" />
                        )}
                        <img
                          className="w-6 h-6 rounded-full object-cover"
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                          alt="Momina"
                        />
                        <div>
                          <p className="text-[11px] font-medium text-slate-900 leading-tight">Momina Mustehsan</p>
                          <p className="text-[9px] text-slate-400 font-normal">UX UI Designer</p>
                        </div>
                      </div>

                      {/* Member 2: Lisa Brenan */}
                      <div
                        onClick={() => toggleMember('lisa')}
                        className="flex items-center gap-2.5 text-left cursor-pointer"
                      >
                        {selectedMembers.lisa ? (
                          <CheckSquare className="w-4 h-4 text-[#7B61FF]" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300" />
                        )}
                        <img
                          className="w-6 h-6 rounded-full object-cover"
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&auto=format&fit=crop&q=80"
                          alt="Lisa"
                        />
                        <div>
                          <p className="text-[11px] font-medium text-slate-900 leading-tight">Lisa Brenan</p>
                          <p className="text-[9px] text-slate-400 font-normal">Digital Marketer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle Gradient Fade at bottom of the cards matching screenshot */}
              <div className="pointer-events-none absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" />
            </div>
          </div>
        </section>
      </ScrollBlurSection>

      {/* ─────────────────────────────────────────────────────────────
          3. Section: "Enhanced Work Methodologies" (3-Card Section)
              * Lime Badge: Why Choose Us
              * Harmonized font-normal Heading & font-medium Card Titles
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="capabilities" maxScale={1.04} maxBlur={6} minOpacity={0.4}>
        <section className="py-10 sm:py-14 bg-transparent w-full text-center">
          <div className="w-full max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 mb-3 shadow-2xs">
              Why Choose Us
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 tracking-tight leading-[1.15]">
              Enhanced Work Methodologies
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              By adopting structured frameworks like Agile milestones with dedicated supervisor oversight,
              businesses eliminate traditional freelance risk and establish a culture of guaranteed continuous delivery.
            </p>

            {/* 3 Value Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 sm:mt-10 text-left">
              {/* Card 1: Purple Accent */}
              <div className="bg-white rounded-2xl p-7 border border-[#E9E4FD] shadow-xs hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#8B7CF8] text-white flex items-center justify-center mb-5 shadow-xs">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-slate-950 tracking-tight mb-2">
                  Increased productivity
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Our platform streamlines your workflow, helping you prioritize tasks, set deadlines, and focus on what truly matters.
                </p>
              </div>

              {/* Card 2: Cyan Accent */}
              <div className="bg-white rounded-2xl p-7 border border-[#D9F4FD] shadow-xs hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#38BDF8] text-white flex items-center justify-center mb-5 shadow-xs">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-slate-950 tracking-tight mb-2">
                  Better project oversight
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Gain clear visibility into project progress, identify bottlenecks, and make informed decisions with comprehensive dashboards.
                </p>
              </div>

              {/* Card 3: Amber / Yellow Accent */}
              <div className="bg-white rounded-2xl p-7 border border-[#FEEFC4] shadow-xs hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#F5CD52] text-slate-950 flex items-center justify-center mb-5 shadow-xs">
                  <Lock className="w-6 h-6 text-slate-950" />
                </div>
                <h3 className="text-lg font-medium text-slate-950 tracking-tight mb-2">
                  Enhanced collaboration
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Our platform facilitates seamless collaboration among team members, ensuring everyone is on the same page and working towards common goals.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollBlurSection>

      {/* ─────────────────────────────────────────────────────────────
          4. Section: "Adopt a More Intelligent Work Approach" (Bento Grid)
             * Lime Badge: Features
             * Harmonized font-normal Heading & Clean Card Typography
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="features" maxScale={1.04} maxBlur={6} minOpacity={0.4}>
        <section className="py-10 sm:py-14 bg-transparent w-full text-center">
          <div className="w-full max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 mb-3 shadow-2xs">
              Features
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 tracking-tight leading-[1.15]">
              Adopt a More Intelligent Work Approach
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              It means cultivating a mindset of continuous learning and adaptation, where automated checkoffs handle
              repetitive tasks, freeing up human capital for creative problem-solving and strategic initiatives.
            </p>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8 sm:mt-10 text-left">
              {/* Left Column (5 cols): Tall Workspace Photo Card */}
              <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[480px] lg:min-h-[580px] shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
                  alt="Real-time Collaboration"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-8">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 w-fit mb-3">
                    Messaging Feature
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white leading-tight">
                    Real-time Collaboration <br />with Team Members
                  </h3>
                </div>
              </div>

              {/* Right Column (7 cols): Split Top & Bottom */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Top Sub-Card: Soft Lavender Card with Team Checklist */}
                <div className="bg-[#EBE7FD] rounded-3xl p-6 sm:p-8 border border-[#DFD9FC] flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="w-full md:w-5/12">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#8B7CF8] text-white mb-3">
                      Task Assigning Feature
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-slate-950 leading-snug">
                      Invite or Assign Existing Team Member
                    </h3>
                  </div>

                  {/* Floating Member Assignment Box */}
                  <div className="w-full md:w-7/12 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-150 text-[11px] text-slate-400 mb-3">
                      <Search className="w-3 h-3 text-slate-400" />
                      <span>Search name...</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-2 pb-1.5 border-b border-slate-100">
                      <span className="flex items-center gap-1.5">
                        <Square className="w-3 h-3 text-slate-400" /> Assign All
                      </span>
                      <span className="text-[#7B61FF] cursor-pointer font-medium">+ Invite Team Member</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-6 h-6 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                            alt="Momina"
                          />
                          <div>
                            <p className="text-[11px] font-medium text-slate-900">Momina Mustehsan</p>
                            <p className="text-[9px] text-slate-400 font-normal">UX UI Designer</p>
                          </div>
                        </div>
                        <CheckSquare className="w-3.5 h-3.5 text-[#7B61FF]" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-6 h-6 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&auto=format&fit=crop&q=80"
                            alt="Lisa"
                          />
                          <div>
                            <p className="text-[11px] font-medium text-slate-900">Lisa Brenan</p>
                            <p className="text-[9px] text-slate-400 font-normal">Digital Marketer</p>
                          </div>
                        </div>
                        <CheckSquare className="w-3.5 h-3.5 text-[#7B61FF]" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-6 h-6 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                            alt="Cristopher"
                          />
                          <div>
                            <p className="text-[11px] font-medium text-slate-900">Cristopher Nolan</p>
                            <p className="text-[9px] text-slate-400 font-normal">Product Manager</p>
                          </div>
                        </div>
                        <Square className="w-3.5 h-3.5 text-slate-300" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Sub-Row: 2 Cards (White Task Card + Cyan Overview Card) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                  {/* Card 1: Detailed Task Card */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 border border-rose-100 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                          <span>🔥 High</span>
                          <span>Deadline: 25th...</span>
                        </div>
                        <span className="text-slate-400 text-sm">⋮</span>
                      </div>

                      <h4 className="text-sm font-medium text-slate-950 leading-snug">
                        Investigating New Plugin Features and Their Econo...
                      </h4>

                      <div className="mt-4">
                        <div className="flex justify-between text-[11px] text-slate-500 font-normal mb-1">
                          <span>Progress</span>
                          <span className="font-semibold text-slate-900">40%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full w-[40%]" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-1.5">
                          <img
                            className="w-5 h-5 rounded-full border border-white object-cover"
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                            alt="Av1"
                          />
                          <img
                            className="w-5 h-5 rounded-full border border-white object-cover"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                            alt="Av2"
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">+4</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Paperclip className="w-3 h-3 text-slate-400" /> 12
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-slate-400" /> 16
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Soft Cyan Overview Card */}
                  <div className="bg-[#E2F7FD] rounded-3xl p-6 border border-[#CEEFF8] flex flex-col justify-center items-start">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#38BDF8] text-white mb-3">
                      Task Overview
                    </span>
                    <h3 className="text-xl font-normal text-slate-950 leading-snug">
                      Complete Task Overview at a Glance
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollBlurSection>

      {/* ─────────────────────────────────────────────────────────────
          5. Section: "Integrate with Your Favorite Tools" (Network Hub)
             * Lime Badge: Sync With Others
             * Bold Heading & Symmetrical Connected Mind-Map Network
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="integrations" maxScale={1.04} maxBlur={6} minOpacity={0.4}>
        <section className="py-12 sm:py-20 bg-transparent w-full text-center overflow-hidden">
          <div className="w-full max-w-[1640px] 2xl:max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-[#D4F870] text-slate-950 mb-3.5 shadow-2xs">
              Sync With Others
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 tracking-tight leading-[1.15]">
              Integrate with Your Favorite Tools
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              By centralizing information and enabling data to flow freely between systems, our solution enhances
              communication, breaks down data silos, and provides a unified view of your projects.
            </p>

            {/* Full-Width Organic Root Integration Network */}
            <IntegrationHub />
          </div>
        </section>
      </ScrollBlurSection>



      {/* ─────────────────────────────────────────────────────────────
          7. Section: "Get Smarter with Our Recent Posts" (Blog Grid)
             * Lime Badge: Our Blog
             * Editorial Blog Titles & Dynamic Grid
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="insights" maxScale={1.04} maxBlur={6} minOpacity={0.4}>
        <section className="py-10 sm:py-14 bg-transparent w-full text-center">
          <div className="w-full max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 mb-3 shadow-2xs">
              Our Blog
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 tracking-tight leading-[1.15]">
              Get Smarter with Our Recent Posts
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Our recent posts are crafted to be more than just content—they are a resource designed to empower you
              with actionable knowledge and fresh perspectives.
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
                    Latest
                  </span>
                  <h4 className="text-sm font-medium text-white leading-snug">
                    The Synergy Equation: Unlocking Your Team&apos;s Collective Power
                  </h4>
                </div>
              </div>

              {/* Blog Post 2 (Center Tall Post spanning rows) */}
              <div className="rounded-3xl overflow-hidden relative min-h-[260px] lg:row-span-2 lg:min-h-[544px] shadow-xs group">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80"
                  alt="Post 2"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D4F870] text-slate-950 w-fit mb-2">
                    Latest
                  </span>
                  <h4 className="text-base sm:text-lg font-medium text-white leading-snug">
                    The Art of Alignment: How Great Teams Achieve Goals
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
                    Latest
                  </span>
                  <h4 className="text-sm font-medium text-white leading-snug">
                    The Art of Alignment: How Great Teams Achieve Shared Goals
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
                    Latest
                  </span>
                  <h4 className="text-sm font-medium text-white leading-snug">
                    5 Actionable Strategies to Prevent Team Burnout
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
                    Latest
                  </span>
                  <h4 className="text-sm font-medium text-white leading-snug">
                    Building Bridges: Enhancing Cross-Functional Teamwork
                  </h4>
                </div>
              </div>
            </div>

            {/* Purple Pill Button: Read More Articles */}
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
          8. Section: "They Stopped Being The Bottleneck" (Testimonials)
             * Compact Layout & Typography from Reference Image 1
             * Reduced vertical padding, margins and card sizes
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="testimonials" maxScale={1.04} maxBlur={6} minOpacity={0.4}>
        <section className="py-8 sm:py-10 bg-transparent w-full overflow-hidden">
          {/* Left-Aligned Compact Header */}
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 mb-4 sm:mb-5 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium text-slate-950 tracking-tight leading-[1.15]">
              They Stopped Being <br />The Bottleneck
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed font-normal">
              Not productivity metrics. Actual founder hours reclaimed — and teams that move without being pushed.
            </p>
          </div>

          {/* Dual Staggered Horizontal Marquee Rows with Edge Gradient Fades */}
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
          9. Modern Editorial Footer (1:1 Match with Reference Design: Priora style)
             * Layout:
               - Left Column: Vibrant Soft Aurora Gradient Card
                 (AssignX mark, Value Prop, "Follow us", 3 Rounded White Social Buttons: IG, LinkedIn, X)
               - Middle Columns: PRODUCT & COMPANY Links with subtle top border for Copyright
               - Right Column: Vertical divider border, Y Combinator W25 Badge,
                 "Design Clarity, Straight To Your Inbox" headline,
                 Newsletter Email Input + Metallic Dark "Stay In The Loop" Button + Microcopy
               - Bottom: Huge faint typographic brand watermark "AssignX" partially cropped
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
                  {/* Brand Logo & Wordmark: 4-square grid + AssignX in pure white */}
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

                {/* Middle Value Proposition Copy — High contrast & crisp */}
                <div className="relative z-10 my-8">
                  <p className="text-white text-base sm:text-lg font-medium leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] max-w-[270px]">
                    Your team always knows what to build next, without asking you!
                  </p>
                </div>

                {/* Bottom Row: Follow us + 3 Squircle Social Buttons */}
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
                            <a href="#integrations" className="hover:text-slate-950 transition-colors">
                              Integrations
                            </a>
                          </li>
                          <li>
                            <a href="#testimonials" className="hover:text-slate-950 transition-colors">
                              Testimonials
                            </a>
                          </li>
                          <li>
                            <button onClick={() => handleAuthAndNavigate('/dashboard')} className="hover:text-slate-950 transition-colors text-left cursor-pointer">
                              Changelog
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
                              For founders
                            </button>
                          </li>
                          <li>
                            <a href="#insights" className="hover:text-slate-950 transition-colors">
                              Blog
                            </a>
                          </li>
                          <li>
                            <button onClick={() => setShowDemoModal(true)} className="hover:text-slate-950 transition-colors text-left cursor-pointer">
                              About
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

                    {/* Bottom horizontal hairline & Copyright */}
                    <div className="pt-6 mt-8 sm:mt-12 border-t border-slate-150">
                      <p className="text-xs text-slate-500 font-normal">
                        © 2026 AssignX. All rights reserved.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Newsletter & YC Badge */}
                  <div className="p-7 sm:p-9 flex flex-col justify-between">
                    <div>
                      {/* AssignX Badge */}
                      <div className="inline-flex items-center gap-2 mb-6">
                        <div className="w-5 h-5 bg-[#FF6600] rounded-xs flex items-center justify-center text-white font-bold text-xs leading-none">
                          A
                        </div>
                        <span className="text-xs font-medium text-slate-800">
                          AssignX · W25
                        </span>
                      </div>

                      {/* Newsletter Heading */}
                      <h3 className="text-xl sm:text-2xl font-medium text-slate-950 tracking-tight leading-snug mb-5 max-w-xs">
                        Design Clarity, Straight<br />To Your Inbox
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
                        *No fluff. Founder-focused insights on async decision-making, AI prioritization, and building faster teams.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            Giant Brand Watermark Typography Across the Bottom
            * Prominently highlighted with crisp gradient depth
            ───────────────────────────────────────────────────────── */}
        <div className="w-full flex items-center justify-center overflow-hidden select-none pointer-events-none mt-2 sm:mt-4 -mb-2 sm:-mb-3">
          <span className="font-bold text-[17vw] sm:text-[18.5vw] lg:text-[20vw] xl:text-[21.5vw] bg-gradient-to-b from-slate-900/35 via-slate-800/20 to-slate-900/5 bg-clip-text text-transparent tracking-tighter leading-[0.85] select-none block w-full text-center whitespace-nowrap">
            AssignX
          </span>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          Video Walkthrough / Consultation Modal
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
              Discover how our dedicated supervisors translate your goals into verifiable milestones, conduct QA, and protect your budget through protected escrow.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-950 aspect-video flex flex-col items-center justify-center text-white relative overflow-hidden border border-slate-800">
              <div className="w-14 h-14 rounded-full bg-[#F5CD52] text-slate-950 flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <span className="text-xs text-slate-400 mt-3 font-medium">Click to Play 2-Min Interactive Overview</span>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-150">
              <span className="text-xs text-slate-500">Ready to discuss your scope?</span>
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  handleAuthAndNavigate('/create');
                }}
                className="bg-[#F5CD52] hover:bg-[#eec23d] text-slate-950 font-medium px-6 py-2.5 rounded-full text-xs shadow-xs transition-all cursor-pointer"
              >
                Post a Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
