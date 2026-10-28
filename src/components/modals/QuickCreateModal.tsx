/* ═══════════════════════════════════════════════════════════
   QuickCreateModal — Landing Page "Create Work" Instant Flow
   3-step modal: Describe → Budget/Timeline → Account Creation
   First-time visitors can post work + sign up in ~90 seconds.
   ═══════════════════════════════════════════════════════════ */
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigation } from '../../context/NavigationContext';
import type { WorkCategory } from '../../types';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Globe,
  Smartphone,
  Layout,
  Palette,
  Megaphone,
  PenTool,
  Bot,
  Cpu,
  Video,
  Mail,
  Lock,
  User,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Building2,
  Calendar,
  CalendarDays,
  Clock,
  Coins,
  Briefcase,
  TrendingUp,
  Crown,
  Calculator,
  UtensilsCrossed
} from 'lucide-react';

interface QuickCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Step1Data {
  outcomeDescription: string;
  category: WorkCategory;
}

interface Step2Data {
  budgetType: 'under_50k' | '50k_1L' | '1L_3L' | '3L_plus' | 'estimate';
  timelineType: 'asap' | 'within_month' | 'within_3months' | 'flexible';
}

interface Step3Data {
  fullName: string;
  email: string;
  password: string;
  companyName: string;
}

const CATEGORIES: {
  category: WorkCategory;
  icon: React.ComponentType<{ size?: number; className?: string; color?: string }>;
  label: string;
  color: string;
  bg: string;
  darkBg: string;
}[] = [
  { category: 'Website Development', icon: Globe, label: 'Web Dev', color: '#6366F1', bg: '#EEF2FF', darkBg: 'rgba(99,102,241,0.15)' },
  { category: 'Mobile App Development', icon: Smartphone, label: 'Mobile App', color: '#3B82F6', bg: '#EFF6FF', darkBg: 'rgba(59,130,246,0.15)' },
  { category: 'UI/UX Design', icon: Layout, label: 'UI/UX', color: '#8B7CF8', bg: '#F5F3FF', darkBg: 'rgba(139,124,248,0.15)' },
  { category: 'AI & Automation', icon: Bot, label: 'AI / LLMs', color: '#10B981', bg: '#ECFDF5', darkBg: 'rgba(16,185,129,0.15)' },
  { category: 'Video Editing', icon: Video, label: 'Video / 3D', color: '#F59E0B', bg: '#FEF3C7', darkBg: 'rgba(245,158,11,0.15)' },
  { category: 'Graphic Design', icon: Palette, label: 'Design', color: '#EC4899', bg: '#FDF2F8', darkBg: 'rgba(236,72,153,0.15)' },
  { category: 'Digital Marketing', icon: Megaphone, label: 'Marketing', color: '#EF4444', bg: '#FEF2F2', darkBg: 'rgba(239,68,68,0.15)' },
  { category: 'Content Writing', icon: PenTool, label: 'Content', color: '#0891B2', bg: '#ECFEFF', darkBg: 'rgba(8,145,178,0.15)' },
  { category: 'Other', icon: Cpu, label: 'Other', color: '#475569', bg: '#F1F5F9', darkBg: 'rgba(71,85,105,0.15)' },
];

const BUDGET_OPTIONS: {
  id: Step2Data['budgetType'];
  label: string;
  sub: string;
  icon: React.ComponentType<{ size?: number; className?: string; color?: string }>;
}[] = [
  { id: 'under_50k', label: 'Under ₹50K', sub: 'Small task or MVP', icon: Coins },
  { id: '50k_1L', label: '₹50K – ₹1L', sub: 'Medium project', icon: Briefcase },
  { id: '1L_3L', label: '₹1L – ₹3L', sub: 'Full product build', icon: TrendingUp },
  { id: '3L_plus', label: '₹3L +', sub: 'Enterprise / large scale', icon: Crown },
  { id: 'estimate', label: 'Need estimate', sub: "I'll let AssignX suggest", icon: Calculator },
];

const TIMELINE_OPTIONS: {
  id: Step2Data['timelineType'];
  label: string;
  sub: string;
  icon: React.ComponentType<{ size?: number; className?: string; color?: string }>;
}[] = [
  { id: 'asap', label: 'ASAP', sub: 'Start within a week', icon: Zap },
  { id: 'within_month', label: 'Within 1 month', sub: 'Flexible start', icon: Calendar },
  { id: 'within_3months', label: 'Within 3 months', sub: "We're planning ahead", icon: CalendarDays },
  { id: 'flexible', label: 'Flexible', sub: 'No hard deadline', icon: Clock },
];

const INSPIRATION_PILLS: {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string; color?: string }>;
  prompt: string;
}[] = [
  {
    label: 'Restaurant Website',
    icon: UtensilsCrossed,
    prompt: 'I need a modern website for my restaurant with online table reservations, menu showcase, and a photo gallery.',
  },
  {
    label: 'Mobile App MVP',
    icon: Smartphone,
    prompt: 'I need an iOS and Android mobile app MVP with user authentication, a home feed, and push notifications.',
  },
  {
    label: 'AI Chatbot',
    icon: Bot,
    prompt: 'I need a custom AI customer support chatbot integrated with our website and knowledge base using GPT-4.',
  },
  {
    label: 'Brand Identity',
    icon: Palette,
    prompt: 'I need a complete brand identity including logo, color palette, typography, and brand guidelines document.',
  },
];

const SuccessConfetti: React.FC = () => {
  const colors = ['#FA795C', '#6366F1', '#10B981', '#F59E0B', '#EC4899', '#3B82F6', '#D4F870'];
  const particles = Array.from({ length: 32 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${(i * 3.2) % 100}%`,
    animDelay: `${(i * 0.05) % 0.8}s`,
    size: `${6 + (i % 5)}px`,
    isCircle: i % 3 === 0,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: '-10px',
            left: p.left,
            width: p.size,
            height: p.isCircle ? p.size : `${parseInt(p.size) * 0.4}px`,
            background: p.color,
            borderRadius: p.isCircle ? '50%' : '2px',
            animationDelay: p.animDelay,
            animation: `qcmConfettiFall 2.2s ${p.animDelay} ease-in both`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
};

const StepDots: React.FC<{ step: number; total: number }> = ({ step, total }) => (
  <div style={{ display: 'flex', gap: '5px' }}>
    {Array.from({ length: total }, (_, i) => (
      <div
        key={i}
        style={{
          height: '8px',
          borderRadius: '99px',
          transition: 'all 0.3s',
          width: i + 1 < step ? '16px' : i + 1 === step ? '20px' : '8px',
          background: i + 1 < step ? '#10b981' : i + 1 === step ? '#FA795C' : '#e2e8f0',
        }}
      />
    ))}
  </div>
);

export const QuickCreateModal: React.FC<QuickCreateModalProps> = ({ isOpen, onClose }) => {
  const { createWorkRequest, login } = useApp();
  const { navigate } = useNavigation();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOptional, setShowOptional] = useState(false);

  const [step1, setStep1] = useState<Step1Data>({ outcomeDescription: '', category: 'Website Development' });
  const [step2, setStep2] = useState<Step2Data>({ budgetType: '50k_1L', timelineType: 'within_month' });
  const [step3, setStep3] = useState<Step3Data>({ fullName: '', email: '', password: '', companyName: '' });

  const overlayRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => textareaRef.current?.focus(), 350);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep(1);
        setIsSubmitting(false);
        setIsSuccess(false);
        setShowPassword(false);
        setShowOptional(false);
        setStep1({ outcomeDescription: '', category: 'Website Development' });
        setStep2({ budgetType: '50k_1L', timelineType: 'within_month' });
        setStep3({ fullName: '', email: '', password: '', companyName: '' });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const budgetMap: Record<Step2Data['budgetType'], { min: number; max: number; fixed: number }> = {
      under_50k: { min: 20000, max: 49000, fixed: 35000 },
      '50k_1L': { min: 50000, max: 100000, fixed: 75000 },
      '1L_3L': { min: 100000, max: 300000, fixed: 200000 },
      '3L_plus': { min: 300000, max: 600000, fixed: 400000 },
      estimate: { min: 50000, max: 150000, fixed: 100000 },
    };
    const bm = budgetMap[step2.budgetType];
    await new Promise(r => setTimeout(r, 1200));
    login();
    createWorkRequest({
      outcomeDescription: step1.outcomeDescription,
      category: step1.category,
      title: step1.outcomeDescription.slice(0, 55) + (step1.outcomeDescription.length > 55 ? '\u2026' : ''),
      detailedDescription: step1.outcomeDescription,
      requiredFeatures: [''],
      referenceLinks: [''],
      attachments: [],
      preferredTech: '',
      additionalNotes: '',
      budgetType: step2.budgetType === 'estimate' ? 'estimate' : 'range',
      budgetMin: bm.min,
      budgetMax: bm.max,
      budgetFixed: bm.fixed,
      currency: 'INR (\u20b9)',
      timelineType: step2.timelineType === 'asap' ? 'asap' : step2.timelineType === 'flexible' ? 'flexible' : 'deadline',
      deadlineDate: step2.timelineType === 'within_month' ? '2026-11-28' : '2027-01-28',
    });
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => { onClose(); navigate('/dashboard'); }, 2600);
  };

  const canProceedStep1 = step1.outcomeDescription.trim().length >= 20;
  const canProceedStep3 =
    step3.fullName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step3.email) &&
    step3.password.length >= 6;
  const TOTAL = 3;

  if (!isOpen) return null;

  const STEP_TITLES = ['What do you need built?', 'Budget & timeline', 'Your details'];
  const STEP_SUBS = [
    'Plain English is fine. No specs needed.',
    'Rough numbers are okay — we quote before any payment.',
    'Takes 30 seconds. No credit card required.',
  ];

  const s: React.CSSProperties = {};
  void s;

  return (
    <>
      <style>{`
        @keyframes qcmOverlayIn { from { opacity:0; } to { opacity:1; } }
        @keyframes qcmPanelIn { from { opacity:0; transform:scale(0.93) translateY(18px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes qcmConfettiFall { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(420px) rotate(540deg);opacity:0} }
        @keyframes qcmSuccessRing { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes qcmSuccessIcon { from{transform:scale(0) rotate(-90deg);opacity:0} to{transform:scale(1) rotate(0);opacity:1} }
        @keyframes qcmSpin { to { transform:rotate(360deg); } }
        @keyframes qcmPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes qcmSlideIn { from{opacity:0;transform:translateX(22px)} to{opacity:1;transform:translateX(0)} }
        .qcm-slide-in { animation: qcmSlideIn 0.25s ease both; }
        .qcm-panel::-webkit-scrollbar { width:5px; }
        .qcm-panel::-webkit-scrollbar-thumb { background:#e2e8f0; border-radius:99px; }
      `}</style>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={e => { if (e.target === overlayRef.current) onClose(); }}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.58)',
          backdropFilter: 'blur(9px)',
          WebkitBackdropFilter: 'blur(9px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
          animation: 'qcmOverlayIn 0.25s ease',
        }}
      >
        {/* Panel */}
        <div
          className="qcm-panel"
          style={{
            position: 'relative',
            background: 'var(--qcm-bg, #fff)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '860px',
            minHeight: '560px',
            overflow: 'hidden',
            boxShadow: '0 32px 80px -12px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.06)',
            animation: 'qcmPanelIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Dark mode override via CSS var trick — panel uses inline bg, dark class on body adjusts */}
          <style>{`
            .dark .qcm-panel { background: #0F1117 !important; box-shadow: 0 32px 80px -12px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07) !important; }
          `}</style>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute', top: 16, right: 16, zIndex: 10,
              width: 32, height: 32, borderRadius: '50%',
              border: '1px solid #e2e8f0', background: '#f8fafc',
              color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9'; (e.currentTarget as HTMLButtonElement).style.color = '#0f172a'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc'; (e.currentTarget as HTMLButtonElement).style.color = '#64748b'; }}
          >
            <X size={17} />
          </button>

          {/* ── SUCCESS STATE ── */}
          {isSuccess && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '52px 32px', gap: 16, position: 'relative', overflow: 'hidden', minHeight: '380px' }}>
              <SuccessConfetti />
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#DCFCE7,#f0fdf4)', border: '2px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'qcmSuccessRing 0.5s cubic-bezier(0.34,1.56,0.64,1) both', zIndex: 1 }}>
                <CheckCircle2 size={40} style={{ color: '#10b981', animation: 'qcmSuccessIcon 0.4s 0.2s ease both' }} />
              </div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0, zIndex: 1 }}>Request submitted</h2>
              <p style={{ fontSize: 14.5, color: '#64748b', maxWidth: 340, lineHeight: 1.6, margin: 0, zIndex: 1 }}>
                We're reviewing your brief now. A supervisor will reach out within 24 hours.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', zIndex: 1 }}>
                {[<><ShieldCheck size={13} /> Payment held in escrow</>, <><Zap size={13} /> Supervisor assigned in 24h</>].map((tag, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#10b981', padding: '5px 12px', borderRadius: 99, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>{tag}</span>
                ))}
              </div>
              <p style={{ fontSize: 12.5, color: '#94a3b8', margin: 0, zIndex: 1, animation: 'qcmPulse 1.5s ease-in-out infinite' }}>Opening your dashboard…</p>
            </div>
          )}

          {/* ── NORMAL FLOW ── */}
          {!isSuccess && (
            <>
              {/* Header */}
              <div style={{ padding: '28px 28px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 99, background: 'rgba(250,121,92,0.08)', border: '1px solid rgba(250,121,92,0.25)', fontSize: 11, fontWeight: 700, color: '#FA795C', marginBottom: 8, letterSpacing: '0.03em' }}>
                    AssignX
                  </div>
                  <h2 style={{ fontSize: 21, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 4px' }} className="qcm-h2">{STEP_TITLES[step - 1]}</h2>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0, lineHeight: 1.5 }} className="qcm-p">{STEP_SUBS[step - 1]}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, paddingTop: 4, flexShrink: 0, paddingRight: 36 }}>
                  <StepDots step={step} total={TOTAL} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', whiteSpace: 'nowrap' }}>Step {step} of {TOTAL}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: 3, background: '#f1f5f9', margin: '18px 28px 0', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg,#FA795C,#6366F1)', borderRadius: 99, transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)', width: `${(step / TOTAL) * 100}%` }} />
              </div>

              {/* Body */}
              <div className="qcm-slide-in" key={step} style={{ padding: '20px 28px 4px', flex: 1 }}>

                {/* ── STEP 1 ── */}
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                    {/* Inspiration pills */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>Try:</span>
                      {INSPIRATION_PILLS.map(({ label, icon: PillIcon, prompt }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setStep1(p => ({ ...p, outcomeDescription: prompt }))}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#475569',
                            background: '#f1f5f9',
                            border: '1px solid #e2e8f0',
                            borderRadius: 99,
                            padding: '4px 11px',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            whiteSpace: 'nowrap',
                          }}
                          onMouseEnter={e => {
                            const b = e.currentTarget;
                            b.style.background = 'rgba(250,121,92,0.08)';
                            b.style.borderColor = 'rgba(250,121,92,0.5)';
                            b.style.color = '#FA795C';
                          }}
                          onMouseLeave={e => {
                            const b = e.currentTarget;
                            b.style.background = '#f1f5f9';
                            b.style.borderColor = '#e2e8f0';
                            b.style.color = '#475569';
                          }}
                        >
                          <PillIcon size={12} />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Textarea */}
                    <div style={{ position: 'relative' }}>
                      <textarea
                        ref={textareaRef}
                        value={step1.outcomeDescription}
                        onChange={e => setStep1(p => ({ ...p, outcomeDescription: e.target.value }))}
                        placeholder="I need a SaaS dashboard with real-time analytics, user auth, and a billing system on React + Supabase…"
                        rows={4}
                        style={{ width: '100%', minHeight: 110, resize: 'vertical', border: `1.5px solid ${step1.outcomeDescription.length >= 20 ? '#10b981' : '#e2e8f0'}`, borderRadius: 14, padding: '13px 16px', fontSize: 14, lineHeight: 1.6, color: '#0f172a', background: '#fafafa', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box' }}
                        onFocus={e => { if (step1.outcomeDescription.length < 20) { e.target.style.borderColor = '#FA795C'; e.target.style.boxShadow = '0 0 0 3px rgba(250,121,92,0.12)'; e.target.style.background = '#fff'; } }}
                        onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.background = '#fafafa'; if (step1.outcomeDescription.length < 20) e.target.style.borderColor = '#e2e8f0'; }}
                      />
                      <div style={{ position: 'absolute', bottom: 10, right: 12, fontSize: 11, color: step1.outcomeDescription.length >= 20 ? '#10b981' : '#94a3b8', display: 'flex', alignItems: 'center', gap: 3, transition: 'color 0.2s' }}>
                        {step1.outcomeDescription.length >= 20 ? <><CheckCircle2 size={11} /> Looks good!</> : `${Math.max(0, 20 - step1.outcomeDescription.length)} more chars to continue`}
                      </div>
                    </div>

                    {/* Category */}
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94a3b8' }}>Category</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: -6 }}>
                      {CATEGORIES.map(({ category, icon: Icon, label, color, bg, darkBg }) => {
                        const sel = step1.category === category;
                        void darkBg;
                        return (
                          <button
                            key={category}
                            onClick={() => setStep1(p => ({ ...p, category }))}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 5,
                              padding: '6px 12px', borderRadius: 99,
                              border: `1.5px solid ${sel ? color : '#e2e8f0'}`,
                              background: sel ? bg : '#f8fafc',
                              color: sel ? color : '#475569',
                              fontSize: 12.5, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                            }}
                          >
                            <Icon size={14} color={sel ? color : undefined} />
                            <span>{label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Social proof */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 12, marginTop: 2 }}>
                      <div style={{ display: 'flex' }}>
                        {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&auto=format&fit=crop',
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&auto=format&fit=crop',
                          'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&auto=format&fit=crop',
                          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&auto=format&fit=crop'].map((src, i) => (
                            <img key={i} src={src} alt="" style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid #fff', objectFit: 'cover', marginLeft: i === 0 ? 0 : -6 }} />
                          ))}
                      </div>
                      <span style={{ fontSize: 12.5, color: '#64748b' }}>
                        <strong style={{ color: '#0f172a' }}>2,400+ clients</strong> have shipped with AssignX
                      </span>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: side-by-side 2-col layout ── */}
                {step === 2 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    {/* LEFT — Budget */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94a3b8' }}>Budget</span>
                      {BUDGET_OPTIONS.map(opt => {
                        const sel = step2.budgetType === opt.id;
                        const OptIcon = opt.icon;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setStep2(p => ({ ...p, budgetType: opt.id }))}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: 10,
                              padding: '8px 12px',
                              borderRadius: 10,
                              border: `1.5px solid ${sel ? '#FA795C' : '#e2e8f0'}`,
                              background: sel ? 'rgba(250,121,92,0.06)' : '#fafafa',
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                              textAlign: 'left',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                              <div
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: 8,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: sel ? 'rgba(250,121,92,0.12)' : '#f1f5f9',
                                  color: sel ? '#FA795C' : '#64748b',
                                  flexShrink: 0,
                                  transition: 'all 0.15s',
                                }}
                              >
                                <OptIcon size={14} />
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: sel ? '#0f172a' : '#1e293b', lineHeight: 1.25 }}>{opt.label}</div>
                                <div style={{ fontSize: 11, color: sel ? '#64748b' : '#94a3b8', lineHeight: 1.25 }}>{opt.sub}</div>
                              </div>
                            </div>
                            <div
                              style={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                border: `2px solid ${sel ? '#FA795C' : '#cbd5e1'}`,
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.15s',
                              }}
                            >
                              {sel && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FA795C' }} />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* RIGHT — Timeline + escrow note */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94a3b8' }}>Timeline</span>
                      {TIMELINE_OPTIONS.map(opt => {
                        const sel = step2.timelineType === opt.id;
                        const OptIcon = opt.icon;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setStep2(p => ({ ...p, timelineType: opt.id }))}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: 10,
                              padding: '8px 12px',
                              borderRadius: 10,
                              border: `1.5px solid ${sel ? '#FA795C' : '#e2e8f0'}`,
                              background: sel ? 'rgba(250,121,92,0.06)' : '#fafafa',
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                              textAlign: 'left',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                              <div
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: 8,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: sel ? 'rgba(250,121,92,0.12)' : '#f1f5f9',
                                  color: sel ? '#FA795C' : '#64748b',
                                  flexShrink: 0,
                                  transition: 'all 0.15s',
                                }}
                              >
                                <OptIcon size={14} />
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: sel ? '#0f172a' : '#1e293b', lineHeight: 1.25 }}>{opt.label}</div>
                                <div style={{ fontSize: 11, color: sel ? '#64748b' : '#94a3b8', lineHeight: 1.25 }}>{opt.sub}</div>
                              </div>
                            </div>
                            <div
                              style={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                border: `2px solid ${sel ? '#FA795C' : '#cbd5e1'}`,
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.15s',
                              }}
                            >
                              {sel && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FA795C' }} />}
                            </div>
                          </button>
                        );
                      })}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#047857', padding: '9px 12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, lineHeight: 1.4, marginTop: 3 }}>
                        <ShieldCheck size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                        <span>Your money stays safely in escrow until you approve the work.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 3 ── */}
                {step === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                    {/* Login nudge */}
                    <div style={{ fontSize: 13, color: '#64748b', padding: '9px 14px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 10, textAlign: 'center' }}>
                      Have an account?{' '}
                      <button onClick={() => { onClose(); navigate('/login'); }} style={{ fontWeight: 700, color: '#FA795C', cursor: 'pointer', background: 'none', border: 'none', padding: 0, fontSize: 'inherit', transition: 'opacity 0.15s' }}>
                        Log in →
                      </button>
                    </div>

                    {/* Name */}
                    <FieldInput label="Your full name" icon={<User size={15} style={{ color: '#94a3b8' }} />} type="text" placeholder="Alex Johnson" value={step3.fullName} onChange={v => setStep3(p => ({ ...p, fullName: v }))} autoComplete="name" />

                    {/* Email */}
                    <FieldInput label="Work email" icon={<Mail size={15} style={{ color: '#94a3b8' }} />} type="email" placeholder="alex@company.com" value={step3.email} onChange={v => setStep3(p => ({ ...p, email: v }))} autoComplete="email" />

                    {/* Password */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <label style={{ fontSize: 12.5, fontWeight: 700, color: '#475569', letterSpacing: '0.01em' }}>Password</label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <span style={{ position: 'absolute', left: 13, pointerEvents: 'none' }}><Lock size={15} style={{ color: '#94a3b8' }} /></span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="At least 6 characters"
                          value={step3.password}
                          onChange={e => setStep3(p => ({ ...p, password: e.target.value }))}
                          autoComplete="new-password"
                          style={{ width: '100%', height: 44, padding: '0 42px 0 38px', border: '1.5px solid #e2e8f0', borderRadius: 12, background: '#fafafa', fontSize: 14, color: '#0f172a', fontFamily: 'inherit', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
                          onFocus={e => { e.target.style.borderColor = '#FA795C'; e.target.style.boxShadow = '0 0 0 3px rgba(250,121,92,0.12)'; e.target.style.background = '#fff'; }}
                          onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#fafafa'; }}
                        />
                        <button type="button" onClick={() => setShowPassword(v => !v)} tabIndex={-1} style={{ position: 'absolute', right: 12, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 4 }}>
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                      {step3.password.length > 0 && step3.password.length < 6 && (
                        <p style={{ fontSize: 11.5, color: '#ef4444', margin: 0 }}>Password must be at least 6 characters</p>
                      )}
                    </div>

                    {/* Optional company */}
                    <button onClick={() => setShowOptional(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 600, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.15s' }}>
                      {showOptional ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      Company name (optional)
                    </button>
                    {showOptional && (
                      <FieldInput label="" icon={<Building2 size={15} style={{ color: '#94a3b8' }} />} type="text" placeholder="Acme Corp" value={step3.companyName} onChange={v => setStep3(p => ({ ...p, companyName: v }))} autoComplete="organization" />
                    )}

                    {/* Trust badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {[<><ShieldCheck size={12} /> Escrow protection</>, <><Lock size={12} /> No spam</>, <><Zap size={12} /> Free</>].map((content, i) => (
                        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 600, color: '#64748b', padding: '4px 10px', borderRadius: 99, background: '#f1f5f9', border: '1px solid #e2e8f0' }}>{content}</span>
                      ))}
                    </div>

                    <p style={{ fontSize: 11.5, color: '#94a3b8', textAlign: 'center', margin: 0, lineHeight: 1.6 }}>
                      By continuing you agree to AssignX&apos;s{' '}
                      <a href="#" style={{ color: '#FA795C', textDecoration: 'none', fontWeight: 600 }}>Terms</a> and{' '}
                      <a href="#" style={{ color: '#FA795C', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a>.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px 20px', borderTop: '1px solid #f1f5f9', marginTop: 8, gap: 12 }}>
                {step > 1 ? (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: 13.5, fontWeight: 600, color: '#475569', cursor: 'pointer', transition: 'all 0.15s' }}
                  >
                    <ArrowLeft size={15} /> Back
                  </button>
                ) : <div />}

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {step < TOTAL && (
                    <button
                      disabled={step === 1 && !canProceedStep1}
                      onClick={() => setStep(s => s + 1)}
                      style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 22px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#FA795C,#D95236)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: step === 1 && !canProceedStep1 ? 'not-allowed' : 'pointer', transition: 'all 0.15s', boxShadow: '0 2px 8px rgba(250,121,92,0.35)', opacity: step === 1 && !canProceedStep1 ? 0.45 : 1 }}
                    >
                      Continue <ArrowRight size={15} />
                    </button>
                  )}
                  {step === TOTAL && (
                    <button
                      disabled={!canProceedStep3 || isSubmitting}
                      onClick={handleSubmit}
                      style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 22px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#FA795C,#D95236)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: !canProceedStep3 || isSubmitting ? 'not-allowed' : 'pointer', transition: 'all 0.15s', boxShadow: '0 2px 8px rgba(250,121,92,0.35)', opacity: !canProceedStep3 || isSubmitting ? 0.5 : 1, minWidth: 200, justifyContent: 'center' }}
                    >
                      {isSubmitting ? (
                        <><span style={{ width: 15, height: 15, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', animation: 'qcmSpin 0.7s linear infinite', flexShrink: 0 }} />Submitting…</>
                      ) : (
                        <>Submit &amp; Create Account</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

// ── Reusable inline field ──────────────────────────────────
const FieldInput: React.FC<{
  label: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}> = ({ label, icon, type, placeholder, value, onChange, autoComplete }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    {label && <label style={{ fontSize: 12.5, fontWeight: 700, color: '#475569', letterSpacing: '0.01em' }}>{label}</label>}
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <span style={{ position: 'absolute', left: 13, pointerEvents: 'none' }}>{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete={autoComplete}
        style={{ width: '100%', height: 44, padding: '0 14px 0 38px', border: '1.5px solid #e2e8f0', borderRadius: 12, background: '#fafafa', fontSize: 14, color: '#0f172a', fontFamily: 'inherit', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
        onFocus={e => { e.target.style.borderColor = '#FA795C'; e.target.style.boxShadow = '0 0 0 3px rgba(250,121,92,0.12)'; e.target.style.background = '#fff'; }}
        onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#fafafa'; }}
      />
    </div>
  </div>
);
