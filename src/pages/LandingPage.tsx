/* ═══════════════════════════════════════════════════════════
   AssignX — Managed Work & Project Delivery Platform
   UI Structure, Color Palette & Typography: 1:1 Match with Reference Design
   Branding: Pure Text Brand ("AssignX") · No Logo Marks · No Raw Pills in Hero
   Custom Content: Dedicated Tech Supervisors, Milestone Escrow & Vetted Talent
   ═══════════════════════════════════════════════════════════ */
import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import {
  Sun,
  Moon,
  Paperclip,
  MessageSquare,
  Zap,
  ShieldCheck,
  Lock,
  X,
  Menu,
  CheckSquare,
  Send,
  FileText
} from 'lucide-react';
import { IntegrationHub } from '../components/landing/IntegrationHub';
import { FiverrHeroSection } from '../components/landing/FiverrHeroSection';
import { WorkCategoriesShowcase } from '../components/landing/WorkCategoriesShowcase';
import { ScrollBlurSection } from '../components/landing/ScrollBlurSection';
import { BackgroundMesh } from '../components/landing/BackgroundMesh';

export const LandingPage: React.FC = () => {
  const { navigate } = useNavigation();
  const { login } = useApp();
  const { isDark, toggleTheme } = useTheme();

  const handleAuthAndNavigate = (targetPath: string = '/dashboard') => {
    login();
    navigate(targetPath);
  };

  // Mobile Hamburger Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Video Demo Modal
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Newsletter Form State for Priora-style Footer
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
    <div className="min-h-screen w-full bg-[#FAF8F5] dark:bg-[#000000] text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-200 dark:selection:bg-indigo-900 selection:text-slate-900 dark:selection:text-white overflow-x-clip relative transition-colors duration-300">
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
          ? 'bg-[#FAF8F5]/90 dark:bg-[#000000]/90 backdrop-blur-md shadow-xs border-b border-stone-200/60 dark:border-white/10'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full max-w-[1640px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          {/* Brand Wordmark — Pure Text, High Contrast */}
          <div
            onClick={() => navigate('/landing')}
            className="cursor-pointer group"
          >
            <span className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white group-hover:text-[#EE6B50] transition-colors">
              AssignX
            </span>
          </div>

          {/* Center Navigation Links — Highly Visible Slate-900 Text */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-900 dark:text-slate-100 dark:text-slate-200">
            <a href="#overview" className="text-slate-950 dark:text-white font-semibold hover:text-[#EE6B50] transition-colors">
              Home
            </a>
            <a href="#capabilities" className="text-slate-800 dark:text-slate-200 hover:text-[#EE6B50] dark:hover:text-white transition-colors flex items-center gap-1">
              <span>Features</span>
              <span className="text-[10px] text-slate-500">▾</span>
            </a>
            <a href="#work-categories" className="text-slate-800 dark:text-slate-200 hover:text-[#EE6B50] dark:hover:text-white transition-colors">
              Categories
            </a>
            <a href="#integrations" className="text-slate-800 dark:text-slate-200 hover:text-[#EE6B50] dark:hover:text-white transition-colors">
              Workflow
            </a>
            <a href="#insights" className="text-slate-800 dark:text-slate-200 hover:text-[#EE6B50] dark:hover:text-white transition-colors">
              Blog
            </a>
            <a href="#testimonials" className="text-slate-800 dark:text-slate-200 hover:text-[#EE6B50] dark:hover:text-white transition-colors">
              Testimonials
            </a>
          </nav>

          {/* Right Actions (Desktop): Theme Toggle + Login + Pill CTA */}
          <div className="hidden md:flex items-center gap-4 sm:gap-5">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-300 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs transition-all cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
            <button
              onClick={() => handleAuthAndNavigate('/dashboard')}
              className="text-[15px] font-semibold text-slate-900 dark:text-white hover:text-[#EE6B50] transition-colors cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => handleAuthAndNavigate('/create')}
              className="bg-gradient-to-b from-[#FA795C] to-[#D95236] hover:brightness-105 active:scale-98 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-xs hover:shadow transition-all cursor-pointer"
            >
              + Create Work
            </button>
          </div>

          {/* Right Actions (Mobile & Tablet): Quick + Create + Hamburger Menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleAuthAndNavigate('/create')}
              className="bg-gradient-to-b from-[#FA795C] to-[#D95236] hover:brightness-105 active:scale-95 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-2xs transition-all cursor-pointer"
            >
              + Create
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200/80 dark:border-white/10 shadow-2xs transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Slide-down Navigation Drawer ── */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-stone-200/80 dark:border-white/10 bg-[#FAF8F5]/98 dark:bg-[#0D0D0E]/98 backdrop-blur-2xl px-5 py-5 shadow-2xl animate-fade-in flex flex-col gap-4">
            <nav className="flex flex-col gap-2.5 text-[15px] font-semibold text-slate-800 dark:text-slate-200">
              <a
                href="#overview"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#EE6B50] transition-colors"
              >
                Home
              </a>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#EE6B50] transition-colors"
              >
                Features & Oversight
              </a>
              <a
                href="#work-categories"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#EE6B50] transition-colors"
              >
                Work Categories & Demo
              </a>
              <a
                href="#integrations"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#EE6B50] transition-colors"
              >
                Delivery Network
              </a>
              <a
                href="#insights"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#EE6B50] transition-colors"
              >
                Blog & Insights
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#EE6B50] transition-colors"
              >
                Client Reviews
              </a>
            </nav>

            <div className="pt-3 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAuthAndNavigate('/dashboard');
                }}
                className="text-xs font-semibold text-slate-900 dark:text-white hover:text-[#EE6B50] px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 cursor-pointer shadow-2xs"
              >
                Login to Dashboard
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to guarantee seamless layout flow under the fixed navbar */}
      <div className="h-16 w-full shrink-0" aria-hidden="true" />

      {/* ─────────────────────────────────────────────────────────────
          2. Fiverr / Upwork-Inspired Hero Section with Interactive Search & Live Video
             * Split 2-column layout (Search + Category suggestions + Video Showcase)
             * Real-time Supervisor & Escrow live badges
             * Trusted company logo cloud & popular service cards
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="overview" maxScale={1.03} maxBlur={6} minOpacity={0.4}>
        <FiverrHeroSection onOpenDemo={() => setShowDemoModal(true)} />
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
        <section className="py-6 sm:py-10 lg:py-12 bg-transparent w-full text-center border-t border-slate-200/50 dark:border-white/10">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-[#D4F870] text-slate-950 font-semibold mb-3.5 shadow-2xs">
              Client Panel Preview
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 dark:text-white dark:text-white tracking-tight leading-[1.15]">
              Real-time Oversight, Zero Micromanagement
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Track milestones, collaborate with your appointed supervisor, and monitor active deliverables inside an all-in-one execution hub.
            </p>

            {/* ─────────────────────────────────────────────────────────
              Floating UI Cards Spread (4 Clean White Interactive Cards)
              Fanned-out perspective with smooth bottom gradient fade
              ───────────────────────────────────────────────────────── */}
            <div className="mt-10 sm:mt-12 relative w-full max-w-[1300px] mx-auto pt-4 pb-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left relative z-0">
                {/* Card 1: Active Project with Progress */}
                <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl p-5 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/60 dark:shadow-black/60 hover:shadow-2xl hover:shadow-slate-300/80 transition-all duration-300 ease-out transform lg:-rotate-3 hover:lg:-rotate-6 hover:-rotate-3 hover:scale-105 hover:-translate-y-2 hover:z-20 cursor-pointer relative overflow-hidden flex flex-col justify-between">
                  {/* Purple/Violet Top Glow Border */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

                  <div>
                    <div className="flex items-center justify-between mb-3 pt-1">
                      <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[11px] font-medium">
                        <span>● In Progress</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-normal">Due: 24th Sep</span>
                      <span className="text-slate-400 font-normal text-sm leading-none cursor-pointer">⋮</span>
                    </div>

                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-snug mb-4">
                      Restaurant Website Redesign<br />& Online Ordering API
                    </h4>

                    <div className="mb-4">
                      <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-normal mb-1.5">
                        <span>Progress</span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">68%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[68%]" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex -space-x-1.5">
                        <img
                          className="w-6 h-6 rounded-full border-2 border-white object-cover"
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                          alt="Supervisor Arjun"
                        />
                        <img
                          className="w-6 h-6 rounded-full border-2 border-white object-cover"
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                          alt="Developer Elena"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal pl-2">Arjun Mehta (Lead)</span>
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

                {/* Card 2: Supervisor Communication Card */}
                <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl p-5 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/60 dark:shadow-black/60 hover:shadow-2xl hover:shadow-slate-300/80 transition-all duration-300 ease-out transform lg:-rotate-0.5 hover:lg:-rotate-3 hover:-rotate-2 hover:scale-105 hover:-translate-y-2 hover:z-20 cursor-pointer relative flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-slate-400 dark:text-slate-400 mb-3 font-normal">Tell your supervisor...</div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-white/10 text-slate-500 text-xs">
                      <div className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-300">
                        <span className="cursor-pointer hover:text-slate-900 dark:text-slate-100 font-bold">B</span>
                        <span className="cursor-pointer hover:text-slate-900 dark:text-slate-100 italic font-serif">I</span>
                        <span className="cursor-pointer hover:text-slate-900 dark:text-slate-100 underline">U</span>
                        <span className="cursor-pointer hover:text-slate-900 dark:text-slate-100 text-[11px]">@</span>
                        <Paperclip className="w-3 h-3 text-slate-400 hover:text-slate-700 cursor-pointer" />
                        <span className="cursor-pointer hover:text-slate-900 dark:text-slate-100 text-xs">😊</span>
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
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                      alt="Supervisor Arjun Mehta"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-medium text-slate-900 dark:text-slate-100 truncate">
                          Arjun Mehta <span className="text-[10px] font-normal text-slate-400">Supervisor</span>
                        </p>
                        <span className="text-[9px] text-emerald-600 font-normal shrink-0 ml-1">Active</span>
                      </div>
                      <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-normal">
                        Hey Alex, I completed the QA review on the online checkout flow. Deliverable preview is uploaded for your sign-off!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Milestone Stages (01 Requirement, 02 UI/UX, 03 Frontend, 04 Launch) */}
                <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl p-5 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/60 dark:shadow-black/60 hover:shadow-2xl hover:shadow-slate-300/80 transition-all duration-300 ease-out transform lg:rotate-1.5 hover:lg:rotate-3 hover:rotate-2 hover:scale-105 hover:-translate-y-2 hover:z-20 cursor-pointer relative flex flex-col justify-center">
                  <div className="space-y-3">
                    {/* 01 Requirement Review */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/30 transition-all">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded text-[11px] font-medium">
                          ✓
                        </span>
                        <span className="text-xs font-medium text-slate-800 dark:text-slate-200">01 Scope Scoped</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700">Done</span>
                    </div>

                    {/* 02 UI/UX Design */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/30 transition-all">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded text-[11px] font-medium">
                          ✓
                        </span>
                        <span className="text-xs font-medium text-slate-800 dark:text-slate-200">02 UI/UX Design</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700">₹15k Paid</span>
                    </div>

                    {/* 03 Frontend Dev */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-orange-200 bg-orange-50/40 transition-all">
                      <div className="flex items-center gap-2">
                        <span className="bg-orange-100 text-[#D95236] border border-orange-200 px-1.5 py-0.5 rounded text-[11px] font-medium">
                          03
                        </span>
                        <span className="text-xs font-medium text-orange-950 dark:text-orange-200">Frontend (68%)</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#EE6B50]">Review</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: Team Behind the Scenes Managed by Supervisor */}
                <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl p-5 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/60 dark:shadow-black/60 hover:shadow-2xl hover:shadow-slate-300/80 transition-all duration-300 ease-out transform lg:rotate-3 hover:lg:rotate-6 hover:rotate-3 hover:scale-105 hover:-translate-y-2 hover:z-20 cursor-pointer relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-200/80 dark:border-white/10 text-[11px] text-slate-500 mb-3">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Managed Team Behind Scenes</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-700 dark:text-slate-200 mb-3 pb-2 border-b border-slate-100 dark:border-white/10">
                      <span className="text-slate-900 dark:text-slate-100 font-bold">Your Supervisor</span>
                      <span className="text-purple-600 font-semibold">Arjun Mehta ⭐ 4.9</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-6 h-6 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                            alt="Elena"
                          />
                          <div>
                            <p className="text-[11px] font-medium text-slate-900 dark:text-slate-100 leading-tight">Frontend Specialist</p>
                            <p className="text-[9px] text-slate-400 font-normal">Managed by Arjun</p>
                          </div>
                        </div>
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-6 h-6 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80"
                            alt="Marcus"
                          />
                          <div>
                            <p className="text-[11px] font-medium text-slate-900 dark:text-slate-100 leading-tight">Backend Engineer</p>
                            <p className="text-[9px] text-slate-400 font-normal">Managed by Arjun</p>
                          </div>
                        </div>
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-center">
                    <p className="text-[10px] text-slate-500 font-medium">
                      Zero worker management for the client.
                    </p>
                  </div>
                </div>
              </div>

              {/* Subtle Gradient Fade at bottom of the cards matching screenshot */}
              <div className="pointer-events-none absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-10" />
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
        <section className="py-6 sm:py-10 lg:py-12 bg-transparent w-full text-center">
          <div className="w-full max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 font-semibold mb-3 shadow-2xs">
              Why Choose AssignX
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 dark:text-white tracking-tight leading-[1.15]">
              How Managed Delivery Protects Your Work
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Traditional marketplaces force you to become an unpaid project manager. AssignX pairs you with dedicated technical supervisors who oversee vetted talent and guarantee milestone delivery.
            </p>

            {/* 3 Value Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 sm:mt-10 text-left">
              {/* Card 1: Sunset Coral Accent */}
              <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl p-7 border border-[#FED7CF] dark:border-[#5E2A20] shadow-xs hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#FA795C] to-[#D95236] text-white flex items-center justify-center mb-5 shadow-xs">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-slate-950 dark:text-white tracking-tight mb-2">
                  1. Tell Us What You Need
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  No technical jargon or complicated job postings. Simply describe your vision in our 6-step guided intake, select a category, and specify your budget.
                </p>
              </div>

              {/* Card 2: Cyan Accent */}
              <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl p-7 border border-[#D9F4FD] dark:border-[#1E4158] shadow-xs hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#38BDF8] text-white flex items-center justify-center mb-5 shadow-xs">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-slate-950 dark:text-white tracking-tight mb-2">
                  2. Dedicated Supervisor Oversight
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  An experienced technical supervisor owns your project. They coordinate talent behind the scenes, enforce code quality, run QA, and keep you updated.
                </p>
              </div>

              {/* Card 3: Amber / Yellow Accent */}
              <div className="bg-white dark:bg-[#0D0D0E] rounded-2xl p-7 border border-[#FEEFC4] dark:border-[#4D3F1E] shadow-xs hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#F5CD52] text-slate-950 flex items-center justify-center mb-5 shadow-xs">
                  <Lock className="w-6 h-6 text-slate-950 dark:text-white" />
                </div>
                <h3 className="text-lg font-medium text-slate-950 dark:text-white tracking-tight mb-2">
                  3. Protected Milestone Escrow
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Never pay upfront for incomplete work. Funds are held safely in escrow and released strictly after you inspect, review, and approve each deliverable.
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
        <section className="py-6 sm:py-10 lg:py-12 bg-transparent w-full text-center">
          <div className="w-full max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 font-semibold mb-3 shadow-2xs">
              Client Panel Features
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 dark:text-white tracking-tight leading-[1.15]">
              Everything You Need to Track, Review & Approve
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
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
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 font-semibold w-fit mb-3">
                    Supervisor Channel
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white leading-tight">
                    Direct Communication <br />With Your Project Lead
                  </h3>
                  <p className="text-xs text-slate-200 mt-2 leading-relaxed font-normal">
                    Ask questions, provide feedback, and receive milestone previews directly from your assigned supervisor.
                  </p>
                </div>
              </div>

              {/* Right Column (7 cols): Split Top & Bottom */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Top Sub-Card: Supervisor Team Coordination */}
                <div className="bg-[#FDECE7] dark:bg-[#24130F] rounded-3xl p-6 sm:p-8 border border-[#FCD3C9] dark:border-[#4D2319] flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="w-full md:w-5/12">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-b from-[#FA795C] to-[#D95236] text-white mb-3">
                      Behind The Scenes
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-slate-950 dark:text-white leading-snug">
                      Your Supervisor Manages The Entire Team
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      You never need to source workers, manage tasks, or run daily standups.
                    </p>
                  </div>

                  {/* Floating Supervisor Match Preview */}
                  <div className="w-full md:w-7/12 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-150 text-[11px] text-slate-500 mb-3">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Assigned Project Supervisor</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FEF3F0] border border-[#FCD3C9] dark:bg-[#2A1713] dark:border-[#4E271D] mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          className="w-8 h-8 rounded-full object-cover border"
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                          alt="Arjun Mehta"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Arjun Mehta</p>
                          <p className="text-[10px] text-slate-500">Technical Supervisor ⭐ 4.9</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Active Lead
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-600">
                      <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-white/10">
                        <span>Frontend Implementation</span>
                        <span className="font-semibold text-emerald-600">QA Verified</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-white/10">
                        <span>Backend & Database APIs</span>
                        <span className="font-semibold text-[#EE6B50]">In Progress</span>
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
                  <div className="bg-white dark:bg-[#0D0D0E] rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                          <span>🔔 Action Required</span>
                          <span>Review Ready</span>
                        </div>
                        <span className="text-slate-400 text-sm">⋮</span>
                      </div>

                      <h4 className="text-sm font-medium text-slate-950 dark:text-white leading-snug">
                        Restaurant Website Homepage & Reservation System
                      </h4>

                      <div className="mt-4">
                        <div className="flex justify-between text-[11px] text-slate-500 font-normal mb-1">
                          <span>Milestone 2 Progress</span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">68%</span>
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
                  <div className="bg-[#E2F7FD] dark:bg-[#081B26] rounded-3xl p-6 border border-[#CEEFF8] dark:border-[#13425A] flex flex-col justify-center items-start">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#38BDF8] text-white mb-3">
                      Action Required Hub
                    </span>
                    <h3 className="text-xl font-normal text-slate-950 dark:text-white leading-snug">
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
             * Lime Badge: Sync With Others
             * Bold Heading & Symmetrical Connected Mind-Map Network
          ───────────────────────────────────────────────────────────── */}
      <ScrollBlurSection id="integrations" maxScale={1.04} maxBlur={6} minOpacity={0.4}>
        <section className="py-6 sm:py-10 lg:py-14 bg-transparent w-full text-center overflow-hidden">
          <div className="w-full max-w-[1640px] 2xl:max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-4 py-1 rounded-full text-xs sm:text-sm font-semibold bg-[#D4F870] text-slate-950 font-semibold mb-3.5 shadow-2xs">
              Full-Cycle Delivery Network
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 dark:text-white tracking-tight leading-[1.15]">
              How Your Work Gets Done on AssignX
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              From your initial request to final sign-off, AssignX coordinates vetted experts, enforces rigorous supervisor QA, and secures your funds with milestone escrow.
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
        <section className="py-6 sm:py-10 lg:py-12 bg-transparent w-full text-center">
          <div className="w-full max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12">
            {/* Lime Green Pill Badge */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 font-semibold mb-3 shadow-2xs">
              Knowledge & Insights
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-slate-950 dark:text-white tracking-tight leading-[1.15]">
              Get Smarter with Our Recent Posts
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
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
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D4F870] text-slate-950 font-semibold w-fit mb-2">
                    Managed Delivery
                  </span>
                  <h4 className="text-sm font-medium text-white leading-snug">
                    Why Managing Freelancers is Broken (And How Dedicated Supervisors Fix It)
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
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D4F870] text-slate-950 font-semibold w-fit mb-2">
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
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D4F870] text-slate-950 font-semibold w-fit mb-2">
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
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D4F870] text-slate-950 font-semibold w-fit mb-2">
                    Case Study
                  </span>
                  <h4 className="text-sm font-medium text-white leading-snug">
                    How Founders Build Scalable Software Without Tech Management Overhead
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            8. Testimonials Section (Dual-Row Marquee)
           ───────────────────────────────────────────────────────────── */}
        <section id="testimonials" className="py-6 sm:py-8 bg-transparent w-full overflow-hidden">
          {/* Left-Aligned Compact Header */}
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 mb-4 sm:mb-5 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium text-slate-950 dark:text-white tracking-tight leading-[1.15]">
              They Stopped Being <br />The Project Bottleneck
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed font-normal">
              Actual founder hours reclaimed, zero worker micromanagement, and verified deliverables shipped on time.
            </p>
          </div>

          {/* Dual Staggered Horizontal Marquee Rows with Edge Gradient Fades */}
          <div className="relative w-full overflow-hidden">
            {/* Edge Gradient Masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-20 lg:w-28 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-20 lg:w-28 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent z-10" />

            {/* Row 1 */}
            <div className="flex mb-2.5 sm:mb-3.5 overflow-hidden">
              <div className="animate-marquee-left flex gap-2.5 sm:gap-4 shrink-0 py-0.5">
                {[...row1Testimonials, ...row1Testimonials].map((item, idx) => (
                  <div
                    key={idx}
                    className="w-[210px] sm:w-[290px] md:w-[340px] shrink-0 p-3.5 sm:p-5 bg-[#F8F9FA] dark:bg-[#0D0D0E] rounded-xl sm:rounded-2xl border border-slate-200/60 dark:border-white/10 flex flex-col justify-between text-left hover:border-slate-300 dark:hover:border-slate-700 hover:bg-[#F5F6F8] dark:hover:bg-[#141416] transition-all cursor-default"
                  >
                    <p className="text-slate-800 dark:text-slate-200 text-[11px] sm:text-xs md:text-[12.5px] leading-relaxed font-normal mb-2.5 sm:mb-4">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-slate-200/50 dark:border-white/10 mt-auto">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <img
                          className="w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-full object-cover shrink-0"
                          src={item.avatar}
                          alt={item.author}
                        />
                        <div>
                          <h4 className="text-[11px] sm:text-xs font-medium text-slate-900 dark:text-white leading-tight">
                            {item.author}
                          </h4>
                          <p className="text-[9px] sm:text-[10px] text-slate-400 font-normal">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[10.5px] sm:text-xs font-semibold text-slate-900 dark:text-slate-200 opacity-90">
                        {item.companyIcon && <span className="text-[10px] sm:text-[11px]">{item.companyIcon}</span>}
                        <span>{item.companyName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 (Staggered Movement) */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee-right flex gap-2.5 sm:gap-4 shrink-0 py-0.5">
                {[...row2Testimonials, ...row2Testimonials].map((item, idx) => (
                  <div
                    key={idx}
                    className="w-[210px] sm:w-[290px] md:w-[340px] shrink-0 p-3.5 sm:p-5 bg-[#F8F9FA] dark:bg-[#0D0D0E] rounded-xl sm:rounded-2xl border border-slate-200/60 dark:border-white/10 flex flex-col justify-between text-left hover:border-slate-300 dark:hover:border-slate-700 hover:bg-[#F5F6F8] dark:hover:bg-[#161E31] transition-all cursor-default"
                  >
                    <p className="text-slate-800 dark:text-slate-200 text-[11px] sm:text-xs md:text-[12.5px] leading-relaxed font-normal mb-2.5 sm:mb-4">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-slate-200/50 dark:border-white/10 mt-auto">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <img
                          className="w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-full object-cover shrink-0"
                          src={item.avatar}
                          alt={item.author}
                        />
                        <div>
                          <h4 className="text-[11px] sm:text-xs font-medium text-slate-900 dark:text-white leading-tight">
                            {item.author}
                          </h4>
                          <p className="text-[9px] sm:text-[10px] text-slate-400 font-normal">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[10.5px] sm:text-xs font-semibold text-slate-900 dark:text-slate-200 opacity-90">
                        {item.companyIcon && <span className="text-[10px] sm:text-[11px]">{item.companyIcon}</span>}
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
      <footer className="w-full bg-transparent border-t border-slate-200/60 dark:border-white/10 pt-12 sm:pt-16 pb-0 relative overflow-hidden text-slate-900 dark:text-slate-100 dark:text-slate-100">
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
                  {/* Brand Logo & Wordmark */}
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
                      className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-105 transition-all cursor-pointer"
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
                      className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-105 transition-all cursor-pointer"
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
                      className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-105 transition-all cursor-pointer"
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
              <div className="w-full bg-white dark:bg-[#0D0D0E] rounded-[28px] border border-slate-200/80 dark:border-white/10 shadow-2xs overflow-hidden flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-150 h-full">

                  {/* Middle Column: Links & Copyright */}
                  <div className="p-7 sm:p-9 flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-6 sm:gap-8">
                      {/* Column 1: PRODUCT */}
                      <div>
                        <h4 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-4">
                          PRODUCT
                        </h4>
                        <ul className="space-y-3 text-xs sm:text-sm font-normal text-slate-700 dark:text-slate-300">
                          <li>
                            <button onClick={() => setShowDemoModal(true)} className="hover:text-slate-950 dark:hover:text-white dark:text-white transition-colors text-left cursor-pointer">
                              How it works
                            </button>
                          </li>
                          <li>
                            <a href="#capabilities" className="hover:text-slate-950 dark:hover:text-white dark:text-white transition-colors">
                              Features
                            </a>
                          </li>
                          <li>
                            <a href="#work-categories" className="hover:text-slate-950 dark:hover:text-white dark:text-white transition-colors">
                              Categories
                            </a>
                          </li>
                          <li>
                            <a href="#testimonials" className="hover:text-slate-950 dark:hover:text-white dark:text-white transition-colors">
                              Testimonials
                            </a>
                          </li>
                          <li>
                            <button onClick={() => handleAuthAndNavigate('/dashboard')} className="hover:text-slate-950 dark:hover:text-white dark:text-white transition-colors text-left cursor-pointer">
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
                        <ul className="space-y-3 text-xs sm:text-sm font-normal text-slate-700 dark:text-slate-300">
                          <li>
                            <button onClick={() => handleAuthAndNavigate('/create')} className="hover:text-slate-950 dark:hover:text-white dark:text-white transition-colors text-left cursor-pointer">
                              Create Work
                            </button>
                          </li>
                          <li>
                            <a href="#insights" className="hover:text-slate-950 dark:hover:text-white dark:text-white transition-colors">
                              Blog
                            </a>
                          </li>
                          <li>
                            <button onClick={() => setShowDemoModal(true)} className="hover:text-slate-950 dark:hover:text-white dark:text-white transition-colors text-left cursor-pointer">
                              About AssignX
                            </button>
                          </li>
                          <li>
                            <button onClick={() => handleAuthAndNavigate('/dashboard')} className="hover:text-slate-950 dark:hover:text-white dark:text-white transition-colors text-left cursor-pointer">
                              Privacy policy
                            </button>
                          </li>
                          <li>
                            <button onClick={() => handleAuthAndNavigate('/dashboard')} className="hover:text-slate-950 dark:hover:text-white dark:text-white transition-colors text-left cursor-pointer">
                              Terms of service
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Bottom horizontal hairline & Copyright */}
                    <div className="pt-6 mt-8 sm:mt-12 border-t border-slate-150 dark:border-white/10">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
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
                        <span className="text-xs font-semibold text-slate-800 dark:text-white">
                          AssignX Managed Delivery
                        </span>
                      </div>

                      {/* Newsletter Heading */}
                      <h3 className="text-xl sm:text-2xl font-medium text-slate-950 dark:text-white tracking-tight leading-snug mb-5 max-w-xs">
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
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-slate-100 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:border-slate-400 shadow-2xs transition-all"
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
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal max-w-xs">
                        *No spam. Founder-focused insights on managed project delivery, milestone workflows, and async execution.
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
          <span className="font-bold text-[17vw] sm:text-[18.5vw] lg:text-[20vw] xl:text-[21.5vw] bg-gradient-to-b from-slate-900/35 via-slate-800/20 to-slate-900/5 dark:from-slate-100/25 dark:via-slate-200/10 dark:to-transparent bg-clip-text text-transparent tracking-tighter leading-[0.85] select-none block w-full text-center whitespace-nowrap">
            AssignX
          </span>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          Video Walkthrough / Consultation Modal
          ───────────────────────────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────
          Enhanced Interactive Video Walkthrough Modal
          ───────────────────────────────────────────────────────────── */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-[#0E0E12] rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 dark:border-white/10 relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#D4F870] text-slate-950 mb-2.5">
              Supervised Delivery Walkthrough
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              How AssignX Manages Your Deliverables
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              From intake to final code review: See how a dedicated supervisor orchestrates vetted talent and releases escrow payments only on approval.
            </p>

            {/* Video Player Container */}
            <div className="mt-4 rounded-2xl bg-black aspect-video w-full relative overflow-hidden border border-slate-800 shadow-xl">
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                poster="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* 3 Interactive Walkthrough Steps */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
                <span className="text-[10px] font-bold text-[#EE6B50] uppercase tracking-wider block">Step 01</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Describe Your Task</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  Guided 6-step wizard locks in requirements & budget.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block">Step 02</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Supervisor Runs QA</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  Tech lead directs talent and verifies code & milestones.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">Step 03</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Approve & Release</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  100% escrow protection. Funds released on approval.
                </p>
              </div>
            </div>

            {/* Footer Modal CTA */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-150 dark:border-white/10">
              <span className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                Start your sprint with zero management hassle.
              </span>
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  handleAuthAndNavigate('/create');
                }}
                className="w-full sm:w-auto bg-gradient-to-b from-[#FA795C] to-[#D95236] hover:brightness-105 active:scale-98 text-white font-semibold px-6 py-2.5 rounded-full text-xs shadow-md shadow-[#EE6B50]/30 transition-all cursor-pointer"
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
