/* Modern Create Work Flow - High-converting SaaS Job Wizard */
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigation } from '../../context/NavigationContext';
import type { WorkCategory, NewWorkRequest } from '../../types';
import {
  Globe,
  Smartphone,
  Layout,
  Palette,
  Megaphone,
  PenTool,
  Cpu,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  Check,
  Plus,
  Shield,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const CreateWorkFlow: React.FC = () => {
  const { createWorkRequest } = useApp();
  const { navigate } = useNavigation();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 6;

  // Form State
  const [formData, setFormData] = useState<NewWorkRequest>({
    outcomeDescription: '',
    category: 'Website Development',
    title: '',
    detailedDescription: '',
    requiredFeatures: [''],
    referenceLinks: [''],
    attachments: [],
    preferredTech: '',
    additionalNotes: '',
    budgetType: 'range',
    budgetMin: 50000,
    budgetMax: 90000,
    budgetFixed: 75000,
    currency: 'INR (₹)',
    timelineType: 'deadline',
    deadlineDate: '2026-10-30'
  });

  const [showOptionalFields, setShowOptionalFields] = useState(false);

  // Quick Inspiration Templates for Step 1
  const promptTemplates = [
    {
      icon: '🍽️',
      title: 'Restaurant Website & Table Booking',
      category: 'Website Development' as WorkCategory,
      prompt:
        'I need a modern, responsive website for my fine dining restaurant where customers can view our seasonal chef menu, reserve tables online with real-time confirmation, and browse private events with 3D interior photos.',
      details: 'Customer reservation flow (SevenRooms/custom), mobile-friendly menu filtering, SEO, and contact booking engine.',
      budget: 65000
    },
    {
      icon: '📱',
      title: 'Fintech Mobile App (iOS & Android)',
      category: 'Mobile App Development' as WorkCategory,
      prompt:
        'I need a secure iOS and Android mobile app for peer-to-peer payments with biometric authentication, instant bank transfers, spending analytics charts, and KYC verification.',
      details: 'Native React Native build, bank API webhook integrations, biometric login, and dark mode financial dashboard.',
      budget: 120000
    },
    {
      icon: '🎨',
      title: 'B2B SaaS Design System in Figma',
      category: 'UI/UX Design' as WorkCategory,
      prompt:
        'I need a complete enterprise design system and UI/UX prototype in Figma for a B2B analytics platform, including 35+ responsive dashboard screens, interactive states, and design tokens.',
      details: 'Atomic component library, Auto-layout tokens, light/dark mode variants, and clickable prototype for developer handoff.',
      budget: 80000
    },
    {
      icon: '⚡',
      title: 'Fullstack AI SaaS MVP Platform',
      category: 'Website Development' as WorkCategory,
      prompt:
        'I need a full-stack Next.js and Tailwind SaaS application with OpenAI API streaming, Stripe subscription billing, user auth via Clerk, and a responsive analytics workspace.',
      details: 'Next.js App Router, Postgres via Supabase, OpenAI streaming endpoints, Stripe Customer Portal, and role-based permissions.',
      budget: 95000
    }
  ];

  // Categories setup with theme colors
  const categories: {
    category: WorkCategory;
    icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
    color: string;
    bgColor: string;
    description: string;
  }[] = [
    {
      category: 'Website Development',
      icon: Globe,
      color: '#0052CC',
      bgColor: '#EFF6FF',
      description: 'Web applications, responsive company sites, e-commerce, and high-converting portals.'
    },
    {
      category: 'Mobile App Development',
      icon: Smartphone,
      color: '#7C3AED',
      bgColor: '#F5F3FF',
      description: 'Native iOS & Android apps, React Native systems, and App Store releases.'
    },
    {
      category: 'UI/UX Design',
      icon: Layout,
      color: '#059669',
      bgColor: '#ECFDF5',
      description: 'Figma interactive prototypes, design systems, wireframes, and UX research.'
    },
    {
      category: 'Graphic Design',
      icon: Palette,
      color: '#D97706',
      bgColor: '#FFFBEB',
      description: 'Brand identity, modern logo marks, marketing collateral, and 3D visual assets.'
    },
    {
      category: 'Digital Marketing',
      icon: Megaphone,
      color: '#DC2626',
      bgColor: '#FEF2F2',
      description: 'SEO strategy, performance marketing campaigns, and conversion optimization.'
    },
    {
      category: 'Content Writing',
      icon: PenTool,
      color: '#0891B2',
      bgColor: '#ECFEFF',
      description: 'Technical copywriting, product manuals, brand copy, and narrative positioning.'
    },
    {
      category: 'Other',
      icon: Cpu,
      color: '#475569',
      bgColor: '#F1F5F9',
      description: 'DevOps, cloud migration, data engineering, custom APIs, or multi-disciplinary.'
    }
  ];

  const stepTitles = [
    'Outcome',
    'Category',
    'Details',
    'Budget',
    'Timeline',
    'Review'
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectTemplate = (tmpl: typeof promptTemplates[0]) => {
    setFormData(prev => ({
      ...prev,
      outcomeDescription: tmpl.prompt,
      category: tmpl.category,
      title: tmpl.title,
      detailedDescription: tmpl.details,
      budgetFixed: tmpl.budget,
      budgetMin: Math.round(tmpl.budget * 0.8),
      budgetMax: Math.round(tmpl.budget * 1.2)
    }));
  };

  const handleSubmit = (isDraft = false) => {
    if (isDraft) {
      navigate('/work');
      return;
    }
    const newId = createWorkRequest({
      ...formData,
      title: formData.title || formData.outcomeDescription.slice(0, 45) + '...'
    });
    navigate(`/submitted/${newId}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-16">
      {/* ── Wide Modern Stepper Bar ── */}
      <div className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md border border-stone-200/80 dark:border-zinc-800/80 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <button
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white px-3 py-1.5 rounded-xl bg-stone-100/70 hover:bg-stone-200/70 dark:bg-zinc-800/60 dark:hover:bg-zinc-700/60 transition-all cursor-pointer"
            onClick={step === 1 ? () => navigate('/dashboard') : handlePrev}
          >
            <ArrowLeft size={14} />
            <span>{step === 1 ? 'Exit to Dashboard' : 'Previous Step'}</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              Step <strong className="text-slate-900 dark:text-white font-semibold">{step}</strong> of {totalSteps}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#0052CC] dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900">
              {Math.round((step / totalSteps) * 100)}% Complete
            </span>
          </div>
        </div>

        {/* 6-Segment Connected Step Progress Grid spanning full width */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5">
          {stepTitles.map((t, idx) => {
            const stepNum = idx + 1;
            const isActive = step === stepNum;
            const isPassed = step > stepNum;

            return (
              <div
                key={t}
                onClick={() => {
                  if (isPassed || isActive) {
                    setStep(stepNum);
                  }
                }}
                className={`flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl transition-all ${
                  isPassed ? 'cursor-pointer hover:bg-stone-50 dark:hover:bg-zinc-800/40' : ''
                } ${
                  isActive
                    ? 'bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 shadow-2xs'
                    : isPassed
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40'
                    : 'bg-stone-50/60 dark:bg-zinc-800/30 border border-transparent opacity-60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0052CC] text-white shadow-2xs'
                      : isPassed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-stone-200 text-slate-500 dark:bg-zinc-700 dark:text-zinc-400'
                  }`}
                >
                  {isPassed ? <Check size={12} strokeWidth={3} /> : stepNum}
                </div>

                <div className="min-w-0 flex-1">
                  <div
                    className={`text-xs font-semibold truncate ${
                      isActive
                        ? 'text-[#0052CC] dark:text-blue-400'
                        : isPassed
                        ? 'text-emerald-800 dark:text-emerald-300'
                        : 'text-slate-600 dark:text-zinc-400'
                    }`}
                  >
                    {t}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STEP 1: OBJECTIVE DEFINITION (Elevated AI Prompt Canvas)
          ───────────────────────────────────────────────────────────── */}
      {step === 1 && (
        <div className="flex flex-col gap-6">
          <div>
            <div className="h-[46px] flex items-center">
              <span className="text-xs font-semibold text-[#0052CC] dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-900">
                Step 1 of 6 • Objective Definition
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 dark:text-white leading-none mt-2">
              What would you like us to get done?
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed mt-1.5">
              Describe the business outcome you need in plain English. You don’t need to worry about the technical architecture.
            </p>
          </div>

          {/* Main Interactive Prompt Box */}
          <div className="bg-white dark:bg-[#121216] border border-stone-200/90 dark:border-zinc-800/90 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
            <div className="relative">
              <textarea
                className="w-full bg-stone-50/50 dark:bg-zinc-900/50 border border-stone-200/80 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 text-base sm:text-[17px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#0052CC] focus:ring-4 focus:ring-blue-500/10 transition-all resize-y min-h-[160px] leading-relaxed font-normal"
                placeholder="e.g. I need a modern, high-converting website for my restaurant where customers can see our menu, reserve a table, and view our private events space..."
                value={formData.outcomeDescription}
                onChange={(e) => setFormData({ ...formData, outcomeDescription: e.target.value })}
                autoFocus
              />
            </div>

            {/* Prompt Card Footer Actions */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-stone-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/60 dark:to-indigo-950/60 text-[#0052CC] dark:text-blue-300 hover:text-blue-700 dark:hover:text-white border border-blue-200 dark:border-blue-900 text-xs font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                  onClick={() => handleSelectTemplate(promptTemplates[0])}
                >
                  <Sparkles size={14} className="text-[#0052CC] dark:text-blue-400" />
                  <span>Use Sample Prompt</span>
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-zinc-500 font-normal">
                <span>{formData.outcomeDescription.length} characters</span>
                {formData.outcomeDescription.length > 20 && (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 size={13} /> Ready to scope
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Preset Inspiration Cards */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                Or pick a popular project starting point:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {promptTemplates.map((tmpl, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className="bg-white dark:bg-[#121216] border border-stone-200/80 dark:border-zinc-800/80 hover:border-blue-300 dark:hover:border-blue-800/80 rounded-2xl p-4 shadow-2xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-white group-hover:text-[#0052CC] dark:group-hover:text-blue-400 transition-colors">
                        <span className="text-base">{tmpl.icon}</span>
                        <span>{tmpl.title}</span>
                      </div>
                      <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
                        ₹{(tmpl.budget / 1000).toFixed(0)}k est.
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal leading-relaxed line-clamp-2">
                      {tmpl.prompt}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-stone-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium">
                    <span>Click to apply template</span>
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Value Pillars / Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-100/60 dark:bg-zinc-900/40 border border-stone-200/60 dark:border-zinc-800/60">
              <Shield size={18} className="text-[#0052CC] shrink-0" />
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">100% Escrow Protected</div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400">Funds released on milestone approval</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-100/60 dark:bg-zinc-900/40 border border-stone-200/60 dark:border-zinc-800/60">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Dedicated Supervisor</div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400">Direct technical lead manages QA</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-100/60 dark:bg-zinc-900/40 border border-stone-200/60 dark:border-zinc-800/60">
              <Clock size={18} className="text-amber-600 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Scoping within 2h</div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400">Milestone timeline formulated fast</div>
              </div>
            </div>
          </div>

          {/* Bottom Next Step Button */}
          <div className="flex justify-end pt-3">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0052CC] hover:bg-[#0047B3] text-white font-semibold text-sm shadow-sm hover:shadow-md disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
              disabled={!formData.outcomeDescription.trim()}
              onClick={handleNext}
            >
              <span>Continue to Category</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 2: CATEGORY SELECTION
          ───────────────────────────────────────────────────────────── */}
      {step === 2 && (
        <div className="flex flex-col gap-6">
          <div>
            <div className="h-[46px] flex items-center">
              <span className="text-xs font-semibold text-[#0052CC] dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-900">
                Step 2 of 6 • Specialization
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 dark:text-white leading-none mt-2">
              What type of work is this?
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed mt-1.5">
              AssignX pairs you with a specialized Supervisor who manages this exact discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isSelected = formData.category === cat.category;

              return (
                <div
                  key={cat.category}
                  onClick={() => setFormData({ ...formData, category: cat.category })}
                  className={`bg-white dark:bg-[#121216] border rounded-2xl p-4.5 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#0052CC] ring-2 ring-blue-500/20 shadow-md -translate-y-0.5'
                      : 'border-stone-200/80 dark:border-zinc-800/80 hover:border-stone-300 dark:hover:border-zinc-700 shadow-2xs hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: cat.bgColor, color: cat.color }}
                    >
                      <Icon size={20} />
                    </div>

                    {isSelected ? (
                      <span className="w-5 h-5 rounded-full bg-[#0052CC] text-white flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-stone-300 dark:border-zinc-700" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-950 dark:text-white mb-1">
                      {cat.category}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 dark:border-zinc-800">
            <button
              className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold text-sm hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              onClick={handlePrev}
            >
              Back
            </button>
            <button
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0047B3] text-white font-semibold text-sm shadow-xs transition-all cursor-pointer"
              onClick={handleNext}
            >
              <span>Continue to Details</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 3: WORK DETAILS & REQUIREMENTS
          ───────────────────────────────────────────────────────────── */}
      {step === 3 && (
        <div className="flex flex-col gap-6">
          <div>
            <div className="h-[46px] flex items-center">
              <span className="text-xs font-semibold text-[#0052CC] dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-900">
                Step 3 of 6 • Specifications
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 dark:text-white leading-none mt-2">
              Work Details & Requirements
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed mt-1.5">
              Help your supervisor formulate milestones, deliverables, and resource allocations.
            </p>
          </div>

          <div className="bg-white dark:bg-[#121216] border border-stone-200/90 dark:border-zinc-800/90 rounded-3xl p-6 shadow-xs flex flex-col gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1.5">
                Project Title
              </label>
              <input
                type="text"
                className="w-full bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0052CC] focus:ring-2 focus:ring-blue-500/10 font-medium"
                placeholder="e.g. Fine Dining Restaurant Website & Table Booking Engine"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1.5">
                Detailed Scope or Requirements
              </label>
              <textarea
                className="w-full bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800 rounded-xl p-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0052CC] focus:ring-2 focus:ring-blue-500/10 font-normal leading-relaxed"
                rows={4}
                placeholder="Mention specific features, target audience, integration needs, or success metrics..."
                value={formData.detailedDescription}
                onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
              />
            </div>

            {/* Progressive Disclosure for Links & Attachments */}
            {!showOptionalFields ? (
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0052CC] dark:text-blue-400 hover:underline cursor-pointer py-1 self-start"
                onClick={() => setShowOptionalFields(true)}
              >
                <Plus size={14} />
                <span>Add reference links, attachments, or tech preferences (Optional)</span>
              </button>
            ) : (
              <div className="flex flex-col gap-4 pt-3 border-t border-stone-100 dark:border-zinc-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1.5">
                    Reference Links or Inspiration (Optional)
                  </label>
                  <input
                    type="url"
                    className="w-full bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 font-normal"
                    placeholder="https://example.com or Figma prototype link"
                    value={formData.referenceLinks[0]}
                    onChange={(e) => setFormData({ ...formData, referenceLinks: [e.target.value] })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1.5">
                    Preferred Technologies (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 font-normal"
                    placeholder="e.g. Next.js, React, Node, Shopify, or Leave it to Supervisor"
                    value={formData.preferredTech}
                    onChange={(e) => setFormData({ ...formData, preferredTech: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1.5">
                    Attachments (Optional)
                  </label>
                  <div
                    onClick={() => {
                      const demoFile = `Scope_Brief_${Date.now().toString().slice(-4)}.pdf`;
                      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, demoFile] }));
                    }}
                    className="border-2 border-dashed border-stone-200 dark:border-zinc-800 rounded-2xl p-5 text-center bg-stone-50/50 dark:bg-zinc-900/30 hover:bg-blue-50/30 transition-colors cursor-pointer"
                  >
                    <UploadCloud size={24} className="text-[#0052CC] mx-auto mb-1.5" />
                    <div className="text-xs font-semibold text-slate-800 dark:text-white">Click to attach mockups, briefs, or assets</div>
                    <div className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">PDF, ZIP, PNG, DOCX up to 50MB</div>
                  </div>

                  {formData.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      {formData.attachments.map((att, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-100 dark:border-blue-900"
                        >
                          📎 {att}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 dark:border-zinc-800">
            <button
              className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold text-sm hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              onClick={handlePrev}
            >
              Back
            </button>
            <button
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0047B3] text-white font-semibold text-sm shadow-xs transition-all cursor-pointer"
              onClick={handleNext}
            >
              <span>Continue to Budget</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 4: BUDGET ALLOCATION
          ───────────────────────────────────────────────────────────── */}
      {step === 4 && (
        <div className="flex flex-col gap-6">
          <div>
            <div className="h-[46px] flex items-center">
              <span className="text-xs font-semibold text-[#0052CC] dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-900">
                Step 4 of 6 • Financial Allocation
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 dark:text-white leading-none mt-2">
              What budget do you have in mind?
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed mt-1.5">
              AssignX protects your funds in escrow. Payments are released only when you approve milestones.
            </p>
          </div>

          {/* Quick preset chips */}
          <div className="flex gap-2 flex-wrap">
            {[30000, 60000, 100000, 180000].map(amount => (
              <button
                key={amount}
                type="button"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  formData.budgetFixed === amount && formData.budgetType === 'fixed'
                    ? 'bg-[#0052CC] text-white shadow-xs'
                    : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border border-stone-200 dark:border-zinc-800 hover:bg-stone-50'
                }`}
                onClick={() => setFormData({ ...formData, budgetType: 'fixed', budgetFixed: amount })}
              >
                ₹{amount.toLocaleString('en-IN')}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {/* Range */}
            <label
              className={`flex items-start gap-4 p-5 bg-white dark:bg-[#121216] border rounded-2xl cursor-pointer transition-all ${
                formData.budgetType === 'range'
                  ? 'border-[#0052CC] ring-2 ring-blue-500/20 shadow-md'
                  : 'border-stone-200/80 dark:border-zinc-800/80 hover:border-stone-300'
              }`}
            >
              <input
                type="radio"
                name="budget_type"
                checked={formData.budgetType === 'range'}
                onChange={() => setFormData({ ...formData, budgetType: 'range' })}
                className="mt-1 accent-[#0052CC]"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white mb-0.5">
                  Budget Range
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal mb-3">
                  Give a flexible minimum and maximum for milestone structuring.
                </p>

                {formData.budgetType === 'range' && (
                  <div className="flex gap-3 items-center max-w-md">
                    <div className="flex-1">
                      <span className="text-[11px] text-slate-400 font-medium block mb-1">Min (₹)</span>
                      <input
                        type="number"
                        className="w-full bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white font-semibold"
                        value={formData.budgetMin}
                        onChange={(e) => setFormData({ ...formData, budgetMin: Number(e.target.value) })}
                      />
                    </div>
                    <span className="text-slate-400 font-bold mt-5">—</span>
                    <div className="flex-1">
                      <span className="text-[11px] text-slate-400 font-medium block mb-1">Max (₹)</span>
                      <input
                        type="number"
                        className="w-full bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white font-semibold"
                        value={formData.budgetMax}
                        onChange={(e) => setFormData({ ...formData, budgetMax: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                )}
              </div>
            </label>

            {/* Fixed */}
            <label
              className={`flex items-start gap-4 p-5 bg-white dark:bg-[#121216] border rounded-2xl cursor-pointer transition-all ${
                formData.budgetType === 'fixed'
                  ? 'border-[#0052CC] ring-2 ring-blue-500/20 shadow-md'
                  : 'border-stone-200/80 dark:border-zinc-800/80 hover:border-stone-300'
              }`}
            >
              <input
                type="radio"
                name="budget_type"
                checked={formData.budgetType === 'fixed'}
                onChange={() => setFormData({ ...formData, budgetType: 'fixed' })}
                className="mt-1 accent-[#0052CC]"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white mb-0.5">
                  Fixed Budget
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal mb-3">
                  A firm project ceiling for the entire scope.
                </p>

                {formData.budgetType === 'fixed' && (
                  <div className="max-w-[240px]">
                    <span className="text-[11px] text-slate-400 font-medium block mb-1">Amount (₹)</span>
                    <input
                      type="number"
                      className="w-full bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white font-semibold"
                      value={formData.budgetFixed}
                      onChange={(e) => setFormData({ ...formData, budgetFixed: Number(e.target.value) })}
                    />
                  </div>
                )}
              </div>
            </label>

            {/* Estimate by AssignX */}
            <label
              className={`flex items-start gap-4 p-5 bg-white dark:bg-[#121216] border rounded-2xl cursor-pointer transition-all ${
                formData.budgetType === 'estimate'
                  ? 'border-[#0052CC] ring-2 ring-blue-500/20 shadow-md'
                  : 'border-stone-200/80 dark:border-zinc-800/80 hover:border-stone-300'
              }`}
            >
              <input
                type="radio"
                name="budget_type"
                checked={formData.budgetType === 'estimate'}
                onChange={() => setFormData({ ...formData, budgetType: 'estimate' })}
                className="mt-1 accent-[#0052CC]"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white mb-0.5">
                  I need AssignX to estimate it
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal">
                  Your assigned supervisor will analyze the requirement and provide a transparent quotation.
                </p>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 dark:border-zinc-800">
            <button
              className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold text-sm hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              onClick={handlePrev}
            >
              Back
            </button>
            <button
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0047B3] text-white font-semibold text-sm shadow-xs transition-all cursor-pointer"
              onClick={handleNext}
            >
              <span>Continue to Timeline</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 5: TIMELINE
          ───────────────────────────────────────────────────────────── */}
      {step === 5 && (
        <div className="flex flex-col gap-6">
          <div>
            <div className="h-[46px] flex items-center">
              <span className="text-xs font-semibold text-[#0052CC] dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-900">
                Step 5 of 6 • Delivery Horizon
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 dark:text-white leading-none mt-2">
              When do you need this completed?
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed mt-1.5">
              Supervisors structure sprints and quality milestones around your release date.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <label
              className={`flex items-start gap-4 p-5 bg-white dark:bg-[#121216] border rounded-2xl cursor-pointer transition-all ${
                formData.timelineType === 'asap'
                  ? 'border-[#0052CC] ring-2 ring-blue-500/20 shadow-md'
                  : 'border-stone-200/80 dark:border-zinc-800/80 hover:border-stone-300'
              }`}
            >
              <input
                type="radio"
                name="timeline_type"
                checked={formData.timelineType === 'asap'}
                onChange={() => setFormData({ ...formData, timelineType: 'asap' })}
                className="mt-1 accent-[#0052CC]"
              />
              <div>
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white mb-0.5">
                  As soon as possible
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal">
                  Fastest delivery timeline under dedicated supervisor sprint management.
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-4 p-5 bg-white dark:bg-[#121216] border rounded-2xl cursor-pointer transition-all ${
                formData.timelineType === 'deadline'
                  ? 'border-[#0052CC] ring-2 ring-blue-500/20 shadow-md'
                  : 'border-stone-200/80 dark:border-zinc-800/80 hover:border-stone-300'
              }`}
            >
              <input
                type="radio"
                name="timeline_type"
                checked={formData.timelineType === 'deadline'}
                onChange={() => setFormData({ ...formData, timelineType: 'deadline' })}
                className="mt-1 accent-[#0052CC]"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white mb-0.5">
                  Specific Target Date
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal mb-3">
                  Pick your target launch or release milestone deadline.
                </p>

                {formData.timelineType === 'deadline' && (
                  <div className="max-w-[240px]">
                    <input
                      type="date"
                      className="w-full bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white font-semibold"
                      value={formData.deadlineDate}
                      onChange={(e) => setFormData({ ...formData, deadlineDate: e.target.value })}
                    />
                  </div>
                )}
              </div>
            </label>

            <label
              className={`flex items-start gap-4 p-5 bg-white dark:bg-[#121216] border rounded-2xl cursor-pointer transition-all ${
                formData.timelineType === 'flexible'
                  ? 'border-[#0052CC] ring-2 ring-blue-500/20 shadow-md'
                  : 'border-stone-200/80 dark:border-zinc-800/80 hover:border-stone-300'
              }`}
            >
              <input
                type="radio"
                name="timeline_type"
                checked={formData.timelineType === 'flexible'}
                onChange={() => setFormData({ ...formData, timelineType: 'flexible' })}
                className="mt-1 accent-[#0052CC]"
              />
              <div>
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white mb-0.5">
                  Flexible Timeline
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal">
                  Standard pace focused on thorough QA, security audits, and iterative reviews.
                </p>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 dark:border-zinc-800">
            <button
              className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold text-sm hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              onClick={handlePrev}
            >
              Back
            </button>
            <button
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0047B3] text-white font-semibold text-sm shadow-xs transition-all cursor-pointer"
              onClick={handleNext}
            >
              <span>Review Work Request</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 6: EXECUTIVE BRIEF & REVIEW
          ───────────────────────────────────────────────────────────── */}
      {step === 6 && (
        <div className="flex flex-col gap-6">
          <div>
            <div className="h-[46px] flex items-center">
              <span className="text-xs font-semibold text-[#0052CC] dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-900">
                Step 6 of 6 • Summary & Handoff
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-slate-950 dark:text-white leading-none mt-2">
              Confirm Your Work Request
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed mt-1.5">
              Upon submission, AssignX assigns a verified supervisor who will assemble the team and formulate milestones.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Scope Brief Box */}
            <div className="bg-white dark:bg-[#121216] border border-stone-200/90 dark:border-zinc-800/90 rounded-2xl p-5 shadow-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Scope Brief
                </span>
                <button
                  className="text-xs font-semibold text-[#0052CC] hover:underline cursor-pointer"
                  onClick={() => setStep(1)}
                >
                  Edit
                </button>
              </div>
              <h3 className="text-base font-semibold text-slate-950 dark:text-white mb-1.5">
                {formData.title || 'Untitled Work Request'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                {formData.outcomeDescription}
              </p>
            </div>

            {/* 3 Summary Pods */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-[#121216] border border-stone-200/90 dark:border-zinc-800/90 rounded-2xl p-4 shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Category
                  </span>
                  <button
                    className="text-xs font-semibold text-[#0052CC] hover:underline cursor-pointer"
                    onClick={() => setStep(2)}
                  >
                    Edit
                  </button>
                </div>
                <span className="inline-flex items-center text-xs font-semibold bg-blue-50 text-[#0052CC] dark:bg-blue-950/60 dark:text-blue-400 px-2.5 py-0.5 rounded-full">
                  {formData.category}
                </span>
              </div>

              <div className="bg-white dark:bg-[#121216] border border-stone-200/90 dark:border-zinc-800/90 rounded-2xl p-4 shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Budget
                  </span>
                  <button
                    className="text-xs font-semibold text-[#0052CC] hover:underline cursor-pointer"
                    onClick={() => setStep(4)}
                  >
                    Edit
                  </button>
                </div>
                <div className="text-sm font-semibold text-slate-950 dark:text-white">
                  {formData.budgetType === 'fixed' && `₹${formData.budgetFixed?.toLocaleString('en-IN')}`}
                  {formData.budgetType === 'range' &&
                    `₹${formData.budgetMin?.toLocaleString('en-IN')} – ₹${formData.budgetMax?.toLocaleString('en-IN')}`}
                  {formData.budgetType === 'estimate' && 'AssignX Proposal'}
                </div>
              </div>

              <div className="bg-white dark:bg-[#121216] border border-stone-200/90 dark:border-zinc-800/90 rounded-2xl p-4 shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Timeline
                  </span>
                  <button
                    className="text-xs font-semibold text-[#0052CC] hover:underline cursor-pointer"
                    onClick={() => setStep(5)}
                  >
                    Edit
                  </button>
                </div>
                <div className="text-sm font-semibold text-slate-950 dark:text-white">
                  {formData.timelineType === 'asap' && 'ASAP Sprint'}
                  {formData.timelineType === 'deadline' && (formData.deadlineDate || 'Target Date')}
                  {formData.timelineType === 'flexible' && 'Flexible Pace'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 dark:border-zinc-800">
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold text-sm hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              onClick={() => handleSubmit(true)}
            >
              Save as Draft
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#0052CC] hover:bg-[#0047B3] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleSubmit(false)}
            >
              <span>Submit Work Request</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
