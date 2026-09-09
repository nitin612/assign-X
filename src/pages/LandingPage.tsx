/* ═══════════════════════════════════════════════════════════
   AssignX — Landing Page Component
   Reference: Freelance Match Modern Editorial / Neo-Brutalist SaaS Aesthetic
   ═══════════════════════════════════════════════════════════ */
import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useApp } from '../context/AppContext';
import '../styles/landing.css';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  CreditCard,
  Briefcase,
  X,
  Play,
  ChevronDown,
  ArrowUpRight,
  Send,
  MessageSquare,
  Check
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate } = useNavigation();
  const { login } = useApp();

  const handleAuthAndNavigate = (targetPath: string = '/dashboard') => {
    login();
    navigate(targetPath);
  };

  // Role toggle: 'client' | 'freelancer'
  const [activeRole, setActiveRole] = useState<'client' | 'freelancer'>('client');

  // Video Demo Modal
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Interactive Estimator State
  const [selectedCategory, setSelectedCategory] = useState<'web' | 'mobile' | 'cloud' | 'design'>('web');
  const [sprintCount, setSprintCount] = useState<number>(2);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Newsletter Subscription State (Sculpted Footer)
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setIsSubscribed(false);
      }, 4000);
    }
  };

  // Partners List for the Tilted Running Marquee Belt
  const partnersList = [
    {
      name: 'PRECISION',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      )
    },
    {
      name: 'MIT ENGINE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="4" width="4" height="16" />
          <rect x="8" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
          <rect x="20" y="4" width="3" height="10" />
        </svg>
      )
    },
    {
      name: 'ArsenalBio',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
        </svg>
      )
    },
    {
      name: 'VERCEL',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 19.5h20L12 2z" />
        </svg>
      )
    },
    {
      name: 'SUPABASE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m13 2-2 2.5h3L11 22l8-11h-4l3-9Z" />
        </svg>
      )
    },
    {
      name: 'LINEAR',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
    },
    {
      name: 'STRIPE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h16v4H8v4h10v4H8v4H4V4z" />
        </svg>
      )
    },
    {
      name: 'RAYCAST',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    }
  ];

  // Category Estimator Data
  const estimatorData = {
    web: {
      title: 'Full-Stack Web App Redesign & MVP',
      supervisor: 'Arjun Mehta (Lead Architect)',
      milestones: ['UI/UX & Interactive Design System', 'Frontend & API Integration', 'QA & Production Launch'],
      basePricePerSprint: 45000,
      turnaround: `${sprintCount * 2} weeks`
    },
    mobile: {
      title: 'Native iOS / Flutter Mobile Application',
      supervisor: 'Priya Sharma (Mobile Systems Lead)',
      milestones: ['Architecture & Plaid Sync Mockups', 'Core Features & Offline Sync', 'App Store Submission & Audit'],
      basePricePerSprint: 55000,
      turnaround: `${sprintCount * 2} weeks`
    },
    cloud: {
      title: 'AWS Cloud Infrastructure & CI/CD DevOps',
      supervisor: 'Vikram Verma (DevOps & Security)',
      milestones: ['Terraform VPC & IAM Architecture', 'ECS Cluster Migration & Secrets', 'Load Testing & 99.9% Uptime Sign-off'],
      basePricePerSprint: 40000,
      turnaround: `${sprintCount * 2} weeks`
    },
    design: {
      title: 'Brand Identity & Design System Package',
      supervisor: 'Ananya Roy (Creative Director)',
      milestones: ['Brand Guidelines & 3D Assets', 'Figma Component Library', 'Production Guidelines & Handoff'],
      basePricePerSprint: 35000,
      turnaround: `${sprintCount * 2} weeks`
    }
  };

  const currentEstimate = estimatorData[selectedCategory];
  const estimatedTotal = currentEstimate.basePricePerSprint * sprintCount;

  // FAQ items
  const faqs = [
    {
      q: 'What is the role of an AssignX Supervisor?',
      a: 'Unlike unmanaged freelance platforms where you must coordinate individual engineers, an AssignX supervisor is an accountable senior engineering lead who scopes your sprints, assigns pre-vetted specialists, reviews every line of code, and takes 100% accountability for meeting deadlines.'
    },
    {
      q: 'How does the milestone escrow payment work?',
      a: 'When a sprint milestone starts, you fund only that specific milestone into protected escrow. Funds are never released to the team until your supervisor validates the deliverable meets quality standards and you explicitly approve it.'
    },
    {
      q: 'Can I request revisions if I am not satisfied?',
      a: 'Yes. With one click you can trigger a formal Revision Request specifying the blocker or feedback. Your supervisor immediately coordinates adjustments with the team without extra charges within the sprint scope.'
    },
    {
      q: 'How do I access my Client Dashboard?',
      a: 'Click "Sign in" or "Explore Client Panel" anywhere on this page to instantly access your workspace, track ongoing sprints, approve milestones, and chat with your supervisors.'
    }
  ];

  return (
    <div className="landing-viewport">
      {/* ── Main White Container (Reference Design) ─────────── */}
      <div className="landing-main-card">

        {/* ── Top Navbar ────────────────────────────────────── */}
        <header className="landing-topbar">
          <div className="landing-topbar-inner">
            <div className="landing-brand" onClick={() => navigate('/landing')}>
              <div className="landing-brand-mark">A</div>
              <div className="landing-brand-text">AssignX</div>
            </div>

            <nav className="landing-nav-links">
              <a href="#how-it-works" className="landing-nav-link">
                <span className="landing-nav-dot" />
                <span>Platform</span>
              </a>
              <a href="#features" className="landing-nav-link">
                <span className="landing-nav-dot" />
                <span>Features</span>
              </a>
              <a href="#estimator" className="landing-nav-link">
                <span className="landing-nav-dot" />
                <span>Estimator</span>
              </a>
              <a href="#comparison" className="landing-nav-link">
                <span className="landing-nav-dot" />
                <span>Why AssignX</span>
              </a>
              <a href="#faq" className="landing-nav-link">
                <span className="landing-nav-dot" />
                <span>FAQ</span>
              </a>
            </nav>

            <div className="landing-topbar-actions">
              {/* Toggle: CLIENT | FREELANCER */}
              <div className="landing-role-switch">
                <button
                  className={`landing-role-pill ${activeRole === 'client' ? 'active' : 'inactive'}`}
                  onClick={() => setActiveRole('client')}
                >
                  Client
                </button>
                <button
                  className={`landing-role-pill ${activeRole === 'freelancer' ? 'active' : 'inactive'}`}
                  onClick={() => setActiveRole('freelancer')}
                >
                  Freelancer
                </button>
              </div>

              {/* Direct Link to Dashboard */}
              <button
                className="landing-sign-btn"
                onClick={() => handleAuthAndNavigate('/dashboard')}
                title="Sign in to your Client Dashboard"
              >
                Sign up
              </button>
            </div>
          </div>
        </header>

        {/* ── Hero Section (Direct Reference to Freelance Match) ── */}
        <section className="landing-hero">
          <div className="landing-hero-left">
            <h1 className="landing-hero-title">
              Freelance
              <span className="tilted-hero-badge">Managed</span>
              <br />
              Connecting Pros
            </h1>

            <p className="landing-hero-subtext">
              Empowering businesses and fast-moving teams with accountable freelance execution. Every project is appointed a dedicated <strong>technical supervisor</strong> who guarantees milestones, code quality, and delivery.
            </p>

            <div className="landing-hero-cta-group">
              <button
                className="btn-hero-coral"
                onClick={() => handleAuthAndNavigate('/create')}
              >
                <span>CREATE PROFILE & WORK</span>
                <ArrowRight size={16} />
              </button>

              <button
                className="btn-hero-white"
                onClick={() => handleAuthAndNavigate('/dashboard')}
              >
                <span>OPEN DASHBOARD</span>
                <span>→</span>
              </button>
            </div>

            {/* Overlapping Avatar Stack */}
            <div className="hero-social-proof">
              <div className="hero-avatar-stack">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Talent 1"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Talent 2"
                />
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                  alt="Talent 3"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Talent 4"
                />
              </div>
              <span className="hero-social-text">
                +3,021 TOP Freelancers Profile
              </span>
            </div>
          </div>

          {/* Right Floating Canvas (Reference Pill Showcase) */}
          <div className="hero-interactive-canvas">
            {/* Top Right Floating Pill: Monica */}
            <div
              className="floating-capsule"
              style={{ top: '10px', right: '30px' }}
              onClick={() => handleAuthAndNavigate('/dashboard')}
            >
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                alt="Monica"
              />
              <div className="floating-capsule-info">
                <span className="floating-capsule-name">Monica</span>
                <span className="floating-capsule-role">Influencer</span>
              </div>
            </div>

            {/* Left Center Floating Pill: Thomas */}
            <div
              className="floating-capsule"
              style={{ top: '90px', left: '10px' }}
              onClick={() => handleAuthAndNavigate('/dashboard')}
            >
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80"
                alt="Thomas"
              />
              <div className="floating-capsule-info">
                <span className="floating-capsule-name">Thomas</span>
                <span className="floating-capsule-role">UX Designer</span>
              </div>
            </div>

            {/* Center Signature Neon Lime Play Button */}
            <div
              className="hero-play-button"
              onClick={() => setShowDemoModal(true)}
              title="Watch How AssignX Supervised Delivery Works"
            >
              <div className="hero-play-triangle" />
            </div>

            {/* Mid Right Floating Pill: Philipp */}
            <div
              className="floating-capsule"
              style={{ bottom: '110px', right: '15px' }}
              onClick={() => handleAuthAndNavigate('/dashboard')}
            >
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
                alt="Philipp"
              />
              <div className="floating-capsule-info">
                <span className="floating-capsule-name">Philipp</span>
                <span className="floating-capsule-role">Photographer</span>
              </div>
            </div>

            {/* Bottom Floating Pill: Emma */}
            <div
              className="floating-capsule"
              style={{ bottom: '20px', left: '80px' }}
              onClick={() => handleAuthAndNavigate('/dashboard')}
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                alt="Emma"
              />
              <div className="floating-capsule-info">
                <span className="floating-capsule-name">Emma</span>
                <span className="floating-capsule-role">Entrepreneur</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Running Tilted Marquee Belt (Bit Tilted & Runy) ── */}
        <div className="partner-belt-wrapper">
          <div className="partner-tilted-belt">
            <div className="partner-marquee-track">
              {partnersList.map((partner, i) => (
                <React.Fragment key={i}>
                  <div className="partner-logo-item">
                    <div className="partner-logo-icon">{partner.icon}</div>
                    <span>{partner.name}</span>
                  </div>
                  <span className="partner-belt-star">★</span>
                </React.Fragment>
              ))}
            </div>
            <div className="partner-marquee-track" aria-hidden="true">
              {partnersList.map((partner, i) => (
                <React.Fragment key={`dup-${i}`}>
                  <div className="partner-logo-item">
                    <div className="partner-logo-icon">{partner.icon}</div>
                    <span>{partner.name}</span>
                  </div>
                  <span className="partner-belt-star">★</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3 Peek Cards (Directly Below Hero As In Reference) ─ */}
        <section className="landing-peek-cards-container">
          <div className="landing-peek-card">
            <div className="landing-peek-icon-box" style={{ backgroundColor: 'var(--color-blue-light)' }}>
              <ShieldCheck size={22} color="var(--color-blue)" />
            </div>
            <h3>Supervised Delivery Guarantee</h3>
            <p>
              Your appointed technical lead coordinates the sprint, enforces architecture standards, and guarantees milestones on time.
            </p>
          </div>

          <div className="landing-peek-card">
            <div className="landing-peek-icon-box" style={{ backgroundColor: 'var(--color-coral-light)' }}>
              <CreditCard size={22} color="var(--color-coral)" />
            </div>
            <h3>100% Milestone Escrow</h3>
            <p>
              Deposit funds only when a milestone begins. Money is securely released only after you and your supervisor verify the code.
            </p>
          </div>

          <div className="landing-peek-card">
            <div className="landing-peek-icon-box" style={{ backgroundColor: 'var(--color-lime-light)' }}>
              <Sparkles size={22} color="#111111" />
            </div>
            <h3>Top 1% Vetted Talent Pool</h3>
            <p>
              Pre-vetted developers, designers, and DevOps engineers matched specifically to your technology stack within 24 hours.
            </p>
          </div>
        </section>

        {/* ── Section: What Features Make Our Platform Distinctive & Popular (Direct from Reference 1) ── */}
        <section id="features" className="distinctive-section">
          <div className="distinctive-left">
            <div className="distinctive-header-pill">
              <span>From 2026</span>
              <span className="distinctive-switch-toggle">
                <span className="distinctive-switch-knob" />
              </span>
            </div>

            <h2 className="distinctive-title">
              What Features Make Our <br />
              Platform <span className="highlight-purple">Distinctive</span> <br />
              And <span className="highlight-purple">Popular</span> ?
            </h2>

            <p className="distinctive-desc">
              According to the needs of modern high-growth tech teams, AssignX introduced an accountable supervisory framework tailored to eliminate the uncertainty of unmanaged freelancing.
            </p>

            <div className="distinctive-features-grid">
              <div className="distinctive-feature-item">
                <div className="distinctive-badge-circle">1</div>
                <div className="distinctive-feature-content">
                  <h4>Personalization Features</h4>
                  <p>Custom tech stack matching and tailored sprint milestone roadmaps designed specifically for your codebase.</p>
                </div>
              </div>

              <div className="distinctive-feature-item">
                <div className="distinctive-badge-circle">2</div>
                <div className="distinctive-feature-content">
                  <h4>Ease Of Use</h4>
                  <p>1-click milestone review, live automated staging links, and central communication without Slack chaos.</p>
                </div>
              </div>

              <div className="distinctive-feature-item">
                <div className="distinctive-badge-circle">3</div>
                <div className="distinctive-feature-content">
                  <h4>Supervised Delivery Guarantee</h4>
                  <p>Dedicated technical lead personally guarantees sprint deadlines, clean architecture, and code quality.</p>
                </div>
              </div>

              <div className="distinctive-feature-item">
                <div className="distinctive-badge-circle">4</div>
                <div className="distinctive-feature-content">
                  <h4>Low Flat Fee</h4>
                  <p>0% client deposit markups and transparent fixed milestone pricing with zero hidden hourly overruns.</p>
                </div>
              </div>

              <div className="distinctive-feature-item">
                <div className="distinctive-badge-circle">5</div>
                <div className="distinctive-feature-content">
                  <h4>Broad Acceptance & Talent</h4>
                  <p>Top 1% pre-screened engineers and designers matched to your exact framework within 24 hours.</p>
                </div>
              </div>

              <div className="distinctive-feature-item">
                <div className="distinctive-badge-circle">6</div>
                <div className="distinctive-feature-content">
                  <h4>100% Escrow Protection</h4>
                  <p>Funds remain protected in escrow until your supervisor verifies standards and you explicitly approve.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="distinctive-radar-container">
            <svg className="radar-canvas-svg" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Concentric orbit rings with dotted dash strokes */}
              <circle cx="220" cy="220" r="190" stroke="#111111" strokeWidth="2.5" strokeDasharray="3 14" opacity="0.35" />
              <circle cx="220" cy="220" r="140" stroke="#111111" strokeWidth="3" strokeDasharray="3 12" opacity="0.6" />
              <circle cx="220" cy="220" r="90" stroke="#111111" strokeWidth="3" strokeDasharray="3 10" opacity="0.8" />

              {/* Radiating spoke dotted lines */}
              <line x1="220" y1="220" x2="355" y2="85" stroke="#111111" strokeWidth="2" strokeDasharray="4 6" />
              <line x1="220" y1="220" x2="400" y2="175" stroke="#111111" strokeWidth="2" strokeDasharray="4 6" />
              <line x1="220" y1="220" x2="375" y2="330" stroke="#111111" strokeWidth="2" strokeDasharray="4 6" />
              <line x1="220" y1="220" x2="320" y2="390" stroke="#111111" strokeWidth="2" strokeDasharray="4 6" />
              <line x1="220" y1="220" x2="220" y2="420" stroke="#111111" strokeWidth="2" strokeDasharray="4 6" />

              {/* Orbital nodes matching Reference 1 */}
              <circle cx="355" cy="85" r="9" fill="#111111" />
              <circle cx="360" cy="180" r="6" stroke="var(--color-lime)" strokeWidth="2.5" fill="none" />
              <circle cx="400" cy="175" r="9" fill="var(--color-lime)" stroke="#111111" strokeWidth="1.5" />
              <circle cx="340" cy="310" r="6" fill="var(--color-purple)" />
              <circle cx="375" cy="330" r="9" fill="var(--color-purple)" stroke="#111111" strokeWidth="1.5" />
              <circle cx="320" cy="390" r="7" fill="var(--color-purple)" />

              {/* Central Planetary Disc */}
              <circle cx="220" cy="220" r="48" fill="#111111" stroke="#111111" strokeWidth="2" />
              {/* Glowing inner colored dots inside central disc */}
              <circle cx="206" cy="228" r="8" fill="var(--color-purple)" />
              <circle cx="228" cy="235" r="7" fill="var(--color-lime)" />
              <circle cx="218" cy="210" r="6" stroke="var(--color-lime)" strokeWidth="2" fill="none" />
              <circle cx="236" cy="216" r="6" stroke="var(--color-purple)" strokeWidth="2" fill="none" />
              <circle cx="202" cy="212" r="4" fill="#6C8BFF" />
            </svg>
          </div>
        </section>

        {/* ── Section 2: How It Works ──────────────────────── */}
        <section id="how-it-works" className="landing-section">
          <div className="landing-section-header">
            <span className="landing-section-badge">How It Works</span>
            <h2 className="landing-section-title">The 3-Step Supervised Flow</h2>
            <p className="landing-section-desc">
              We took the chaos and uncertainty out of freelancing by inserting an accountable senior engineering layer.
            </p>
          </div>

          <div className="landing-steps-grid">
            <div className="landing-step-card">
              <div className="landing-step-num">01</div>
              <h4>Submit Your Work Scope</h4>
              <p>
                Describe your project, desired deliverables, and deadline. Our scoping engine generates structured milestones with transparent budgets.
              </p>
            </div>

            <div className="landing-step-card">
              <div className="landing-step-num">02</div>
              <h4>Dedicated Supervisor Appointed</h4>
              <p>
                A verified supervisor takes ownership of your sprint, hand-picks vetted specialists, and provides live daily progress updates.
              </p>
            </div>

            <div className="landing-step-card">
              <div className="landing-step-num">03</div>
              <h4>Inspect, Sign Off & Ship</h4>
              <p>
                Preview live staging links, inspect code packages, and sign off on completed milestones. Escrow funds unlock only upon your approval.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 3: Interactive Scope & Budget Estimator ── */}
        <section id="estimator" className="landing-section" style={{ backgroundColor: '#FAF9FB' }}>
          <div className="landing-section-header">
            <span className="landing-section-badge">Interactive Tool</span>
            <h2 className="landing-section-title">Estimate Your Project & Sprint</h2>
            <p className="landing-section-desc">
              Select your domain and sprint length to see real-time milestone structures and supervisor allocation.
            </p>
          </div>

          <div className="estimator-card">
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666', marginBottom: '10px' }}>
                1. Select Project Domain
              </div>
              <div className="estimator-pills">
                <button
                  className={`estimator-pill-btn ${selectedCategory === 'web' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('web')}
                >
                  🌐 Web App Redesign
                </button>
                <button
                  className={`estimator-pill-btn ${selectedCategory === 'mobile' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('mobile')}
                >
                  📱 Fintech iOS / Mobile
                </button>
                <button
                  className={`estimator-pill-btn ${selectedCategory === 'cloud' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('cloud')}
                >
                  ☁️ AWS Cloud & DevOps
                </button>
                <button
                  className={`estimator-pill-btn ${selectedCategory === 'design' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('design')}
                >
                  🎨 Brand Identity & 3D
                </button>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666', marginBottom: '10px' }}>
                2. Sprint Scope Duration
              </div>
              <div className="estimator-pills">
                {[1, 2, 3, 4].map(sprints => (
                  <button
                    key={sprints}
                    className={`estimator-pill-btn ${sprintCount === sprints ? 'active' : ''}`}
                    onClick={() => setSprintCount(sprints)}
                  >
                    {sprints} Sprint{sprints > 1 ? 's' : ''} ({sprints * 2} wks)
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Milestone Deliverables Included:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {currentEstimate.milestones.map((m, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#444' }}>
                      <CheckCircle2 size={14} color="var(--color-blue)" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimator Result Box */}
            <div className="estimator-result-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-blue)', marginBottom: '6px' }}>
                <Briefcase size={14} />
                <span>Supervised Estimate</span>
              </div>

              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 800, color: '#111111', letterSpacing: '-0.03em', marginBottom: '4px' }}>
                ₹{estimatedTotal.toLocaleString('en-IN')}
              </div>

              <div style={{ fontSize: '12px', color: '#666', marginBottom: '18px' }}>
                Protected in Milestone Escrow · 100% Refund Guarantee
              </div>

              <div style={{ borderTop: '1px solid #EAEAEF', paddingTop: '14px', marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', color: '#888' }}>Assigned Supervisor:</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#111' }}>
                  {currentEstimate.supervisor}
                </div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>Estimated Delivery:</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#111' }}>
                  {currentEstimate.turnaround}
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => handleAuthAndNavigate('/create')}
              >
                <span>Launch This Work</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── Section 4: AssignX vs Unmanaged Freelance Marketplaces ── */}
        <section id="comparison" className="landing-section">
          <div className="landing-section-header">
            <span className="landing-section-badge">Comparison</span>
            <h2 className="landing-section-title">Why Founders Prefer AssignX</h2>
            <p className="landing-section-desc">
              Traditional freelance boards leave all the risk, hiring vetting, and project management on your plate.
            </p>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>Feature & Experience</th>
                  <th style={{ width: '32.5%' }}>Traditional Marketplaces</th>
                  <th className="highlight" style={{ width: '32.5%' }}>AssignX Supervised</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Project Accountability</strong></td>
                  <td>You must coordinate and manage individual freelancers</td>
                  <td className="highlight">Dedicated Senior Supervisor owns the deadline</td>
                </tr>
                <tr>
                  <td><strong>Code & Deliverable Audit</strong></td>
                  <td>None. You need your own engineers to review code</td>
                  <td className="highlight">100% peer-reviewed code and QA verified staging links</td>
                </tr>
                <tr>
                  <td><strong>Payment Protection</strong></td>
                  <td>Complex dispute arbitration with platform support</td>
                  <td className="highlight">Escrow released only when supervisor & client sign off</td>
                </tr>
                <tr>
                  <td><strong>Missed Deadlines & Ghosting</strong></td>
                  <td>Frequent. You start all over from scratch</td>
                  <td className="highlight">Guaranteed replacement and sprint milestone continuity</td>
                </tr>
                <tr>
                  <td><strong>Client Interface</strong></td>
                  <td>Generic messaging and invoice receipts</td>
                  <td className="highlight">Modern editorial Client Panel with real-time sprint tracking</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 5: FAQ Accordion ──────────────────────── */}
        <section id="faq" className="landing-section" style={{ backgroundColor: '#FAF9FB' }}>
          <div className="landing-section-header">
            <span className="landing-section-badge">Common Questions</span>
            <h2 className="landing-section-title">Frequently Asked Questions</h2>
          </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #111111',
                    borderRadius: '16px',
                    boxShadow: isOpen ? '3px 3px 0px #111111' : '2px 2px 0px #111111',
                    overflow: 'hidden',
                    transition: 'all 150ms ease'
                  }}
                >
                  <button
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#111111' }}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 200ms ease',
                        flexShrink: 0
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 24px 20px', fontSize: '14px', color: '#555555', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Section 6: Bottom CTA Banner ─────────────────── */}
        <div className="landing-cta-banner">
          <div>
            <h2>Ready to get your work done without the headaches?</h2>
            <p>Post your project in under 3 minutes. Your dedicated supervisor will scope your sprint today.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-coral btn-lg"
              style={{ padding: '14px 28px', fontSize: '15px', boxShadow: '3px 3px 0 #111' }}
              onClick={() => handleAuthAndNavigate('/create')}
            >
              <span>Create New Work</span>
              <span>→</span>
            </button>
            <button
              className="btn btn-secondary btn-lg"
              style={{ padding: '14px 24px', fontSize: '15px' }}
              onClick={() => handleAuthAndNavigate('/dashboard')}
            >
              <span>Launch Dashboard</span>
            </button>
          </div>
        </div>

        {/* ── Signature Sculpted Black Footer (Direct from Reference 1) ── */}
        <footer className="landing-footer-sculpted">
          <div className="footer-top-grid">
            {/* Col 1: Brand & Mission */}
            <div className="footer-brand-col">
              <div className="footer-geom-logo" onClick={() => navigate('/landing')}>
                <div className="footer-geom-block" />
                <div className="footer-geom-block" />
                <span className="footer-brand-title">AssignX</span>
              </div>
              <p className="footer-brand-tagline">
                A Modern Supervised Freelance Platform For Fast-Moving Tech Teams. Accountable sprint milestones, verified engineers, and protected escrow execution.
              </p>
            </div>

            {/* Col 2: Quick Access */}
            <div className="footer-links-col">
              <h4 className="footer-col-heading">Quick Access</h4>
              <div className="footer-links-duo">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="#how-it-works" className="footer-link-item">About Us</a>
                  <a href="#features" className="footer-link-item">
                    <span className="footer-dot-purple" />
                    <span>Services</span>
                  </a>
                  <span className="footer-link-item" onClick={() => handleAuthAndNavigate('/dashboard')}>
                    Careers
                  </span>
                  <span className="footer-link-item" onClick={() => handleAuthAndNavigate('/dashboard')}>
                    Learn
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="#estimator" className="footer-link-item">Branches</a>
                  <a href="#faq" className="footer-link-item">Faq</a>
                  <a href="#comparison" className="footer-link-item">Blog</a>
                  <span className="footer-link-item" onClick={() => navigate('/support')}>
                    Support
                  </span>
                </div>
              </div>
            </div>

            {/* Col 3: Newsletter & Contact */}
            <div className="footer-news-col">
              <p className="footer-news-label">
                To Know The Latest News And Updates, Enter Your Work Email So That We Can Contact You
              </p>

              <form className="footer-news-pill-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="footer-news-input"
                  placeholder="Enter Email Address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className="footer-news-btn">
                  <span>{isSubscribed ? 'Subscribed!' : 'Subscribe'}</span>
                  {isSubscribed ? <Check size={14} /> : <ArrowUpRight size={14} />}
                </button>
              </form>

              <div className="footer-contact-row">
                <span className="footer-contact-label">Contact Us :</span>
                <div className="footer-social-icons">
                  <div className="footer-social-pill highlight" title="Telegram">
                    <Send size={15} />
                  </div>
                  <div className="footer-social-pill" title="WhatsApp">
                    <MessageSquare size={15} />
                  </div>
                  <div className="footer-social-pill" title="Twitter / X">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div className="footer-social-pill" title="Instagram">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div className="footer-social-pill" title="LinkedIn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Checkered Mosaic Border (Signature pixel styling from Reference 1) */}
          <div className="footer-mosaic-strip">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`mosaic-cell ${i % 3 === 0 ? 'white' : i % 2 === 0 ? 'gray' : 'dark'}`}
              />
            ))}
          </div>

          {/* Bottom Copyright */}
          <div className="footer-bottom-copyright">
            Copyright © 2026 AssignX Inc. All Rights Reserved.
          </div>
        </footer>
      </div>

      {/* ── Interactive Demo Video Modal ───────────────────── */}
      {showDemoModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(17, 17, 17, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            padding: '24px'
          }}
          onClick={() => setShowDemoModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2.5px solid #111111',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              boxShadow: '8px 8px 0px #111111',
              overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '2px solid #111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--color-blue-light)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Play size={18} color="#111111" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#111111' }}>
                  How AssignX Works in 60 Seconds
                </h3>
              </div>
              <button
                className="topbar-icon-btn"
                style={{ width: '32px', height: '32px' }}
                onClick={() => setShowDemoModal(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '28px 24px' }}>
              <div
                style={{
                  backgroundColor: '#111111',
                  borderRadius: '16px',
                  height: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  padding: '20px',
                  marginBottom: '20px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--color-lime)',
                    border: '2px solid #FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    cursor: 'pointer'
                  }}
                >
                  <div className="hero-play-triangle" />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800 }}>
                  Interactive Walkthrough Video
                </div>
                <div style={{ fontSize: '13px', color: '#AAAAAA', maxWidth: '380px', marginTop: '6px' }}>
                  See how an appointed supervisor manages your sprint deliverables, code quality checks, and escrow milestone release.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDemoModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowDemoModal(false);
                    handleAuthAndNavigate('/dashboard');
                  }}
                >
                  <span>Go to Client Panel</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
