import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ArrowRight,
  Code2,
  Video,
  Bot,
  Smartphone,
  Palette,
  X,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useApp } from '../../context/AppContext';
import heroBackgroundVideo from '../../assets/backvideo.mp4';

interface SuggestionItem {
  query: string;
  category: string;
  icon: React.ElementType;
  duration: string;
  budget: string;
  leadSupervisor: {
    name: string;
    role: string;
    avatar: string;
  };
}

const POPULAR_TAGS = [
  { label: 'Web & SaaS MVPs', category: 'Website Development' },
  { label: 'AI Agents & LLMs', category: 'AI & Automation' },
  { label: 'Video Editing & 3D', category: 'Video Editing' },
  { label: 'iOS & Android Apps', category: 'Mobile App Development' },
  { label: 'Figma UI/UX Design', category: 'UI/UX Design' },
  { label: 'Cloud & DevOps', category: 'Website Development' },
];

const TYPING_PHRASES = [
  'Next.js SaaS MVP with Stripe & Supabase...',
  '4K Commercial Video Editing & 3D Motion...',
  'AI Agent & LangChain Workflow Automation...',
  'iOS & Android Mobile App in React Native...',
  'Figma UI/UX Design System & Prototype...',
  'Cloud Architecture & AWS DevOps Setup...',
  'PostgreSQL Database & Supabase APIs...'
];

const SEARCH_SUGGESTIONS: SuggestionItem[] = [
  {
    query: 'Build a Fullstack Next.js SaaS MVP with Stripe & Supabase',
    category: 'Website Development',
    icon: Code2,
    duration: '5-7 Days Sprint',
    budget: '₹65,000',
    leadSupervisor: {
      name: 'Arjun Mehta',
      role: 'Principal Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    query: '4K Commercial Video Editing, 3D Motion & Viral Reels for Launch',
    category: 'Video Editing',
    icon: Video,
    duration: '3-4 Days Sprint',
    budget: '₹45,000',
    leadSupervisor: {
      name: 'Elena Rostova',
      role: 'Creative Director',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    query: 'Autonomous AI Customer Support Agent with LangChain & Vector RAG',
    category: 'AI & Automation',
    icon: Bot,
    duration: '4-6 Days Sprint',
    budget: '₹85,000',
    leadSupervisor: {
      name: 'Devansh Joshi',
      role: 'AI Systems Lead',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    query: 'Cross-Platform Mobile App in React Native with Biometric Auth',
    category: 'Mobile App Development',
    icon: Smartphone,
    duration: '8-12 Days Sprint',
    budget: '₹1,20,000',
    leadSupervisor: {
      name: 'Priya Sharma',
      role: 'Mobile Engineering Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    query: 'Figma UI/UX Design System & High-Fidelity Clickable Prototype',
    category: 'UI/UX Design',
    icon: Palette,
    duration: '3-5 Days Sprint',
    budget: '₹40,000',
    leadSupervisor: {
      name: 'Sophia Chen',
      role: 'Lead Product Designer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    },
  },
];

const TRUSTED_COMPANIES = [
  { name: 'Vercel', icon: '▲', color: 'text-slate-800 dark:text-white' },
  { name: 'Stripe', icon: 'S', color: 'text-indigo-600 dark:text-indigo-400 font-bold font-serif' },
  { name: 'Supabase', icon: '⚡', color: 'text-emerald-500' },
  { name: 'Databricks', icon: '▤', color: 'text-red-500' },
  { name: 'Linear', icon: '⌘', color: 'text-violet-500' },
  { name: 'Retool', icon: '⚙', color: 'text-sky-500' },
  { name: 'Loom', icon: '✳', color: 'text-pink-500' },
];

export const FiverrHeroSection: React.FC<{ onOpenDemo?: () => void }> = () => {
  const { navigate } = useNavigation();
  const { login } = useApp();

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Background Video State
  const videoRef = useRef<HTMLVideoElement>(null);

  // Dynamic Typewriter Effect for Input Placeholder
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
        setTypingSpeed(65);

        if (typedText.length + 1 >= currentPhrase.length) {
          // Pause when complete
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Backspacing
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
        setTypingSpeed(35);

        if (typedText.length - 1 <= 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex, typingSpeed]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    login();
    const queryParam = searchQuery.trim()
      ? `?prompt=${encodeURIComponent(searchQuery.trim())}`
      : '';
    navigate(`/create${queryParam}`);
  };

  const handleSelectSuggestion = (suggestion: SuggestionItem) => {
    login();
    const queryParam = `?category=${encodeURIComponent(
      suggestion.category
    )}&prompt=${encodeURIComponent(suggestion.query)}`;
    navigate(`/create${queryParam}`);
  };

  const handlePopularTagClick = (tag: (typeof POPULAR_TAGS)[0]) => {
    login();
    const queryParam = `?category=${encodeURIComponent(tag.category)}`;
    navigate(`/create${queryParam}`);
  };

  return (
    <section className="relative w-full pt-1 sm:pt-2 pb-6 sm:pb-8 overflow-visible">
      {/* ─────────────────────────────────────────────────────────────
          1. Clean Hero Panoramic Video Container
         ───────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-[1580px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-[32px] overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl shadow-slate-950/40 min-h-[480px] sm:min-h-[520px] lg:min-h-[550px] xl:min-h-[570px] flex flex-col justify-center py-10 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-14 text-white">
          
          {/* Background Video Element (src/assets/backvideo.mp4) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
            <video
              ref={videoRef}
              src={heroBackgroundVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105 filter brightness-110 contrast-105"
            />
            {/* Smooth Cinematic Gradient Overlays (Brightened) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#07070A]/85 via-[#0A0A0F]/65 to-[#07070A]/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070A]/70 via-transparent to-[#07070A]/20" />
          </div>

          {/* ─────────────────────────────────────────────────────────────
              Tagline & Dynamic Typing Search Bar
             ───────────────────────────────────────────────────────────── */}
          <div className="relative z-10 max-w-3xl text-left my-auto">
            
            {/* Proportional, Refined Tagline */}
            <h1 className="text-2.5xl sm:text-3.5xl lg:text-[38px] xl:text-[42px] font-semibold text-white tracking-tight leading-[1.14]">
              Assign any task. <br />
              Done by vetted talent. <br />
              <span className="bg-gradient-to-r from-[#FF758F] via-[#FA795C] to-[#F6CF57] bg-clip-text text-transparent font-bold">
                Supervised by tech leads.
              </span>
            </h1>

            {/* ─────────────────────────────────────────────────────────
                Fiverr-Style Search Bar with Dynamic Typing Effect
               ───────────────────────────────────────────────────────── */}
            <div className="mt-7 sm:mt-9 relative w-full max-w-2xl">
              <form
                onSubmit={handleSearchSubmit}
                className={`relative flex items-center bg-white/95 dark:bg-[#121216]/95 backdrop-blur-2xl rounded-2xl sm:rounded-full border transition-all duration-200 shadow-2xl ${isSearchFocused
                    ? 'border-[#EE6B50] ring-4 ring-[#EE6B50]/25'
                    : 'border-white/30 shadow-black/60'
                  }`}
              >
                <div className="pl-4 sm:pl-5 flex items-center justify-center text-slate-500 shrink-0">
                  <Search className="w-5 h-5" />
                </div>

                <div className="relative w-full py-3.5 sm:py-4 px-3 sm:px-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder=""
                    className="w-full bg-transparent text-sm sm:text-[15px] font-medium text-slate-900 dark:text-white focus:outline-hidden relative z-10"
                  />

                  {/* Dynamic Typing Effect Placeholder Display */}
                  {!searchQuery && (
                    <div className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-sm sm:text-[15px] text-slate-400 select-none z-0">
                      <span>{typedText}</span>
                      <span className="w-0.5 h-4 bg-[#EE6B50] ml-0.5 animate-pulse" />
                    </div>
                  )}
                </div>

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <div className="pr-2 sm:pr-2.5 shrink-0">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#FA795C] via-[#EE6B50] to-[#D95236] hover:brightness-110 active:scale-97 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm shadow-lg shadow-[#EE6B50]/40 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <span>Assign Work</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* ── Interactive Instant Suggestions Dropdown ── */}
              {isSearchFocused && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsSearchFocused(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#121216] rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl z-40 p-3 sm:p-4 animate-fade-in backdrop-blur-2xl text-slate-900 dark:text-white">
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100 dark:border-white/10">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                        ⚡ Quick Start Project Templates
                      </span>
                      <button
                        onClick={() => setIsSearchFocused(false)}
                        className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        Close ✕
                      </button>
                    </div>

                    <div className="space-y-1.5 max-h-72 overflow-y-auto">
                      {SEARCH_SUGGESTIONS.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setIsSearchFocused(false);
                              handleSelectSuggestion(item);
                            }}
                            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-zinc-800 text-[#EE6B50] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                <Icon size={16} />
                              </div>
                              <div className="min-w-0 text-left">
                                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-[#EE6B50] transition-colors">
                                  {item.query}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                                    {item.category}
                                  </span>
                                  <span>•</span>
                                  <span>{item.duration}</span>
                                  <span>•</span>
                                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                                    Est. {item.budget}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                                <img
                                  src={item.leadSupervisor.avatar}
                                  alt={item.leadSupervisor.name}
                                  className="w-4 h-4 rounded-full object-cover"
                                />
                                <span className="font-medium text-slate-700 dark:text-slate-300">
                                  {item.leadSupervisor.name}
                                </span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Popular / Trending Services Tags with Generous Gap */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5 gap-y-2.5">
                <span className="text-xs font-semibold text-slate-300 mr-0.5">
                  Popular:
                </span>
                {POPULAR_TAGS.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePopularTagClick(tag)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/15 hover:bg-white/25 border border-white/20 text-white backdrop-blur-md transition-all cursor-pointer shadow-xs hover:border-white/40"
                  >
                    <span>{tag.label}</span>
                  </button>
                ))}
              </div>

              {/* Subtle Trust Indicators */}
              <div className="mt-5 sm:mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Dedicated Tech Supervisor</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Escrow Protection</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Guaranteed Sprint Turnaround</span>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. Fiverr/Upwork Signature "Trusted By" Client Logo Cloud
         ───────────────────────────────────────────────────────────── */}
      <div className="mt-5 sm:mt-7 w-full max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="pt-3 sm:pt-4 border-t border-slate-200/70 dark:border-white/10 text-center">
          <p className="text-[11px] sm:text-xs font-bold text-slate-400 dark:text-zinc-500 tracking-wider uppercase mb-3.5">
            Trusted by founders & engineering teams building next-gen products
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 opacity-75 hover:opacity-100 transition-opacity">
            {TRUSTED_COMPANIES.map((company, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 group cursor-pointer"
                title={`Used by teams at ${company.name}`}
              >
                <span className={`text-base sm:text-lg ${company.color} group-hover:scale-110 transition-transform`}>
                  {company.icon}
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 tracking-tight group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
