import React, { useState } from 'react';
import {
  ArrowRight,
  Table2,
  Calendar,
  Kanban,
  Plus,
  Home,
  Heart,
  Bell,
  Volume2,
  MoreHorizontal,
  Send,
  Code2,
  Smartphone,
  Bot,
  Palette,
  GraduationCap,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useApp } from '../../context/AppContext';

interface CategoryData {
  id: string;
  tabLabel: string;
  icon: React.ElementType;
  headingPrefix: string;
  highlightWord: string;
  description: string;
  projectTitle: string;
  doerName: string;
  doerRole: string;
  doerMetric: string;
  doerAvatar: string;
  userAvatar: string;
  userPrompt: string;
  doerStatus: string;
  doerActionTool: string;
  doerActionText: string;
  doerActionIconColor: string;
  tableRows: {
    title: string;
    tag: string;
    assignee: string;
    avatar: string;
    status: 'Done' | 'In Progress' | 'Review' | 'Queued';
    statusBg: string;
    statusText: string;
    escrow: string;
  }[];
}

const CATEGORIES: CategoryData[] = [
  {
    id: 'web-dev',
    tabLabel: 'Web Development',
    icon: Code2,
    headingPrefix: 'Web apps, APIs and SaaS platforms.',
    highlightWord: 'Done.',
    description:
      'Vetted full-stack doers build production-ready frontends, robust backend APIs, and scalable databases while your supervisor validates code milestones.',
    projectTitle: 'Enterprise Next.js SaaS Platform',
    doerName: 'Marcus Vance',
    doerRole: 'Lead Full-Stack Doer',
    doerMetric: '99% milestone pass rate',
    doerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    userPrompt: 'Build responsive auth flow, Stripe subscriptions & Supabase API.',
    doerStatus: 'Processing your request',
    doerActionTool: 'Vercel / GitHub',
    doerActionText: 'Deploying Next.js preview & running tests',
    doerActionIconColor: '#000000',
    tableRows: [
      {
        title: 'Supabase Auth & RBAC Schema',
        tag: 'Backend',
        assignee: 'Marcus V.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        status: 'Done',
        statusBg: 'bg-emerald-500 text-white',
        statusText: 'Completed',
        escrow: '$750'
      },
      {
        title: 'Stripe Billing & Webhook Endpoints',
        tag: 'Payments',
        assignee: 'Marcus V.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        status: 'In Progress',
        statusBg: 'bg-amber-400 text-slate-950 font-medium',
        statusText: 'In Progress',
        escrow: '$950'
      },
      {
        title: 'Interactive Dashboard & Analytics',
        tag: 'Frontend',
        assignee: 'Elena R.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
        status: 'Review',
        statusBg: 'bg-indigo-500 text-white',
        statusText: 'In Review',
        escrow: '$800'
      },
      {
        title: 'Automated CI/CD & Security Audit',
        tag: 'DevOps',
        assignee: 'Supervisor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
        status: 'Queued',
        statusBg: 'bg-slate-300 text-slate-700',
        statusText: 'Pending',
        escrow: '$500'
      }
    ]
  },
  {
    id: 'mobile',
    tabLabel: 'Mobile Apps',
    icon: Smartphone,
    headingPrefix: 'iOS, Android and cross-platform apps.',
    highlightWord: 'Done.',
    description:
      'Expert mobile doers develop fluid React Native and Flutter apps, connect native hardware APIs, and deliver store-ready submission builds.',
    projectTitle: 'Health & Fitness Mobile App v2',
    doerName: 'Elena Rostova',
    doerRole: 'Senior Mobile Architect',
    doerMetric: '42 apps shipped to stores',
    doerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    userPrompt: 'Implement Apple HealthKit sync, workout tracker & offline caching.',
    doerStatus: 'Processing your request',
    doerActionTool: 'Apple TestFlight',
    doerActionText: 'Building iOS release candidate #14',
    doerActionIconColor: '#007AFF',
    tableRows: [
      {
        title: 'Apple HealthKit & Google Fit Sync',
        tag: 'Native API',
        assignee: 'Elena R.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
        status: 'Done',
        statusBg: 'bg-emerald-500 text-white',
        statusText: 'Completed',
        escrow: '$1,200'
      },
      {
        title: 'Offline-First SQLite Cache Engine',
        tag: 'Architecture',
        assignee: 'Elena R.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
        status: 'In Progress',
        statusBg: 'bg-amber-400 text-slate-950 font-medium',
        statusText: 'In Progress',
        escrow: '$850'
      },
      {
        title: 'Push Notifications & Deep Linking',
        tag: 'Engagement',
        assignee: 'Kian P.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
        status: 'Review',
        statusBg: 'bg-indigo-500 text-white',
        statusText: 'In Review',
        escrow: '$600'
      },
      {
        title: 'App Store Review Certification',
        tag: 'Deploy',
        assignee: 'Supervisor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
        status: 'Queued',
        statusBg: 'bg-slate-300 text-slate-700',
        statusText: 'Pending',
        escrow: '$450'
      }
    ]
  },
  {
    id: 'ai-ml',
    tabLabel: 'AI & Machine Learning',
    icon: Bot,
    headingPrefix: 'Autonomous agents, RAG & LLMs.',
    highlightWord: 'Done.',
    description:
      'AI researchers and engineers build intelligent agents, connect vector search databases, fine-tune models, and deploy automated multi-step workflows.',
    projectTitle: 'Multi-Agent Support & Sales Pipeline',
    doerName: 'Dr. Kian Patel',
    doerRole: 'AI Systems Specialist',
    doerMetric: '50+ production LLM agents',
    doerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    userPrompt: 'Connect Pinecone vector store with Claude 3.5 Sonnet agent & Slack.',
    doerStatus: 'Processing your request',
    doerActionTool: 'LangChain & Pinecone',
    doerActionText: 'Indexing 14,000 vector embeddings',
    doerActionIconColor: '#10B981',
    tableRows: [
      {
        title: 'RAG Retrieval & Pinecone Index',
        tag: 'Vector DB',
        assignee: 'Dr. Kian',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
        status: 'Done',
        statusBg: 'bg-emerald-500 text-white',
        statusText: 'Completed',
        escrow: '$1,400'
      },
      {
        title: 'Autonomous Tool-Calling Agent',
        tag: 'Logic',
        assignee: 'Dr. Kian',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
        status: 'In Progress',
        statusBg: 'bg-amber-400 text-slate-950 font-medium',
        statusText: 'In Progress',
        escrow: '$1,100'
      },
      {
        title: 'Hallucination Guardrails & Eval Suite',
        tag: 'Quality',
        assignee: 'Marcus V.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        status: 'Review',
        statusBg: 'bg-indigo-500 text-white',
        statusText: 'In Review',
        escrow: '$700'
      },
      {
        title: 'Slack Bot & Live Webhook Bridge',
        tag: 'Integration',
        assignee: 'Supervisor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
        status: 'Queued',
        statusBg: 'bg-slate-300 text-slate-700',
        statusText: 'Pending',
        escrow: '$600'
      }
    ]
  },
  {
    id: 'design',
    tabLabel: 'UI/UX Design',
    icon: Palette,
    headingPrefix: 'Figma systems, UI/UX and wireframes.',
    highlightWord: 'Done.',
    description:
      'Product designers craft high-converting web layouts, mobile UI kits, interactive Figma components, and polished design token libraries.',
    projectTitle: 'Fintech Banking App & Web Redesign',
    doerName: 'Sophia Lindqvist',
    doerRole: 'Lead UI/UX Designer',
    doerMetric: 'Top 1% Figma Community Creator',
    doerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    userPrompt: 'Design a sleek dark/light mode banking interface with interactive flow.',
    doerStatus: 'Processing your request',
    doerActionTool: 'Figma Auto-Layout',
    doerActionText: 'Publishing Design System v2.4 (240+ components)',
    doerActionIconColor: '#A259FF',
    tableRows: [
      {
        title: 'Design System & Typography Tokens',
        tag: 'Tokens',
        assignee: 'Sophia L.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        status: 'Done',
        statusBg: 'bg-emerald-500 text-white',
        statusText: 'Completed',
        escrow: '$850'
      },
      {
        title: 'Interactive High-Fidelity Prototype',
        tag: 'Figma',
        assignee: 'Sophia L.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        status: 'In Progress',
        statusBg: 'bg-amber-400 text-slate-950 font-medium',
        statusText: 'In Progress',
        escrow: '$1,200'
      },
      {
        title: 'Responsive Tablet & Mobile Screens',
        tag: 'Layout',
        assignee: 'Elena R.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
        status: 'Review',
        statusBg: 'bg-indigo-500 text-white',
        statusText: 'In Review',
        escrow: '$750'
      },
      {
        title: 'Developer Handoff Specs & Assets',
        tag: 'Handoff',
        assignee: 'Supervisor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
        status: 'Queued',
        statusBg: 'bg-slate-300 text-slate-700',
        statusText: 'Pending',
        escrow: '$400'
      }
    ]
  },
  {
    id: 'academic',
    tabLabel: 'Assignments & Research',
    icon: GraduationCap,
    headingPrefix: 'Data models, papers and coursework.',
    highlightWord: 'Done.',
    description:
      'Domain scholars and academic mentors assist with rigorous empirical research, mathematical computations, statistical models, and LaTeX documents.',
    projectTitle: 'Econometric Forecasting & Research Paper',
    doerName: 'Prof. Arthur P.',
    doerRole: 'Quantitative Researcher',
    doerMetric: 'Ph.D. Economics • 100% On-Time',
    doerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    userPrompt: 'Run multivariate regression models in R & format IEEE LaTeX paper.',
    doerStatus: 'Processing your request',
    doerActionTool: 'R Studio & LaTeX',
    doerActionText: 'Fitting ARIMA model & generating confidence charts',
    doerActionIconColor: '#2563EB',
    tableRows: [
      {
        title: 'Dataset Cleaning & Outlier Removal',
        tag: 'Data Prep',
        assignee: 'Arthur P.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
        status: 'Done',
        statusBg: 'bg-emerald-500 text-white',
        statusText: 'Completed',
        escrow: '$400'
      },
      {
        title: 'Multivariate Regression & R Code',
        tag: 'Modeling',
        assignee: 'Arthur P.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
        status: 'In Progress',
        statusBg: 'bg-amber-400 text-slate-950 font-medium',
        statusText: 'In Progress',
        escrow: '$650'
      },
      {
        title: 'Literature Review & Citation Cross-check',
        tag: 'Review',
        assignee: 'Arthur P.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
        status: 'Review',
        statusBg: 'bg-indigo-500 text-white',
        statusText: 'In Review',
        escrow: '$500'
      },
      {
        title: 'Final Typeset PDF with Peer Review',
        tag: 'Verification',
        assignee: 'Supervisor',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        status: 'Queued',
        statusBg: 'bg-slate-300 text-slate-700',
        statusText: 'Pending',
        escrow: '$350'
      }
    ]
  },
  {
    id: 'custom',
    tabLabel: 'Post any task',
    icon: Layers,
    headingPrefix: 'Custom scripts, audits and migrations.',
    highlightWord: 'Done.',
    description:
      'Have an unconventional project? Submit any custom specification. AssignX matches you with vetted doers and protects your funds with milestone escrow.',
    projectTitle: 'Custom Multi-Cloud Migration & Security',
    doerName: 'David Chen',
    doerRole: 'DevOps & Cloud Specialist',
    doerMetric: 'AWS & GCP Certified Pro',
    doerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    userPrompt: 'Zero-downtime Kubernetes migration from AWS to GCP with Terraform.',
    doerStatus: 'Processing your request',
    doerActionTool: 'Terraform & Kubernetes',
    doerActionText: 'Applying infra plans & validating SSL certificates',
    doerActionIconColor: '#7C3AED',
    tableRows: [
      {
        title: 'Infrastructure as Code in Terraform',
        tag: 'DevOps',
        assignee: 'David C.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
        status: 'Done',
        statusBg: 'bg-emerald-500 text-white',
        statusText: 'Completed',
        escrow: '$1,300'
      },
      {
        title: 'PostgreSQL Live Replica Switchover',
        tag: 'Database',
        assignee: 'David C.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
        status: 'In Progress',
        statusBg: 'bg-amber-400 text-slate-950 font-medium',
        statusText: 'In Progress',
        escrow: '$1,600'
      },
      {
        title: 'DNS Failover & SSL Termination',
        tag: 'Networking',
        assignee: 'David C.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
        status: 'Review',
        statusBg: 'bg-indigo-500 text-white',
        statusText: 'In Review',
        escrow: '$800'
      },
      {
        title: 'Architecture Signoff & Documentation',
        tag: 'Audit',
        assignee: 'Supervisor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
        status: 'Queued',
        statusBg: 'bg-slate-300 text-slate-700',
        statusText: 'Pending',
        escrow: '$550'
      }
    ]
  }
];

export const WorkCategoriesShowcase: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('web-dev');
  const [activeView, setActiveView] = useState<'table' | 'gantt' | 'kanban'>('table');
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; height: number; opacity: number }>({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0
  });

  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const { navigate } = useNavigation();
  const { login } = useApp();

  const handleAuthAndNavigate = (targetPath: string = '/dashboard') => {
    login();
    navigate(targetPath);
  };

  const activeIndex = CATEGORIES.findIndex((c) => c.id === activeTabId);
  const activeCategory = CATEGORIES[activeIndex !== -1 ? activeIndex : 0];

  // Update sliding pill position dynamically on active tab change or resize
  const updatePillPosition = React.useCallback(() => {
    const currentTab = tabRefs.current[activeIndex];
    const container = containerRef.current;

    if (currentTab && container) {
      const tabRect = currentTab.getBoundingClientRect();

      setPillStyle({
        left: currentTab.offsetLeft,
        width: tabRect.width,
        height: tabRect.height,
        opacity: 1
      });
    }
  }, [activeIndex]);

  React.useLayoutEffect(() => {
    updatePillPosition();
  }, [updatePillPosition, activeTabId]);

  React.useEffect(() => {
    const handleResize = () => updatePillPosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updatePillPosition]);

  return (
    <section id="work-categories" className="py-16 sm:py-24 bg-transparent w-full overflow-hidden text-center">
      <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─────────────────────────────────────────────────────────────
            1. Title Section: Exact Match to Hero / Reference Typography
           ───────────────────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-medium text-slate-950 dark:text-white tracking-tight leading-[1.14] max-w-[760px] mx-auto text-center">
            Get more done with doers
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-[560px] mx-auto leading-relaxed font-normal">
            Assign is the platform where people turn ideas and tasks into finished work — from web development and mobile apps to AI workflows, assignments, and design.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. Pill Segmented Filter Tabs (Centered floating bar with sliding magic pill)
           ───────────────────────────────────────────────────────────── */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div
            ref={containerRef}
            className="relative inline-flex items-center p-1 bg-[#F1F3F6]/90 dark:bg-[#0D0D0E] rounded-full border border-slate-200/80 dark:border-white/10 shadow-xs max-w-full overflow-x-auto scrollbar-none"
          >
            {/* Sliding Magic Pill Indicator */}
            <div
              className="absolute top-1 bottom-1 rounded-full bg-[#ECEBFF] dark:bg-[#1E1A38] border-2 border-[#1E6FFB] dark:border-[#8B7CF8] shadow-xs pointer-events-none transition-all duration-350 ease-[cubic-bezier(0.25,1,0.3,1)]"
              style={{
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`,
                opacity: pillStyle.opacity,
                transform: 'translateZ(0)'
              }}
            />

            {CATEGORIES.map((category, index) => {
              const isActive = category.id === activeTabId;
              const isLast = category.id === 'custom';

              return (
                <button
                  key={category.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  onClick={() => setActiveTabId(category.id)}
                  className={`relative z-10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-250 whitespace-nowrap cursor-pointer flex items-center gap-1.5 select-none ${
                    isActive
                      ? 'text-[#4338CA] font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {isLast && <Plus className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-500 dark:text-slate-400'}`} />}
                  <span>{category.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. Main 2-Column Showcase Area (Left Copy / Right Board Mockup)
           ───────────────────────────────────────────────────────────── */}
        <div
          key={activeCategory.id}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center animate-showcase-fade"
        >
          {/* Left Column: Heading, Description, CTA */}
          <div className="lg:col-span-4 text-left flex flex-col items-start pr-0 lg:pr-4">
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-medium text-slate-950 dark:text-white tracking-tight leading-[1.14]">
              {activeCategory.headingPrefix}{' '}
              <span className="text-[#5452F6] font-semibold">{activeCategory.highlightWord}</span>
            </h3>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {activeCategory.description}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => handleAuthAndNavigate('/dashboard')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5452F6] hover:bg-[#4338CA] text-white font-medium text-sm sm:text-base shadow-md shadow-indigo-500/25 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Milestone escrow protected</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Interactive Dashboard Mockup */}
          <div className="lg:col-span-8 w-full">
            {/* Outer Gray Frame (Exact match to screenshot container) */}
            <div className="bg-[#EAEBED]/70 dark:bg-[#141416] rounded-[26px] p-3 sm:p-5 border border-slate-200 dark:border-white/10 dark:border-white/10 shadow-inner">
              {/* Inner White Dashboard Card */}
              <div className="bg-white dark:bg-[#0B0B0D] rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col md:flex-row min-h-[420px]">
                
                {/* ─────────────────────────────────────────────────────
                    Left Pane: Workspace Table (60% width)
                   ───────────────────────────────────────────────────── */}
                <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-slate-150 min-w-0 bg-white dark:bg-[#0B0B0D]">
                  
                  {/* Top Workspace Header & Views Bar */}
                  <div className="p-4 sm:p-5 pb-0 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      {/* Left Multi-color mini 4-square App icon */}
                      <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-400 p-0.5 shadow-2xs flex items-center justify-center shrink-0">
                        <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                          <div className="bg-white dark:bg-[#0B0B0D] rounded-[1px]" />
                          <div className="bg-white dark:bg-[#0B0B0D] rounded-[1px]" />
                          <div className="bg-white dark:bg-[#0B0B0D] rounded-[1px]" />
                          <div className="bg-white dark:bg-[#0B0B0D] rounded-[1px]" />
                        </div>
                      </div>

                      {/* Board Name */}
                      <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight truncate">
                        {activeCategory.projectTitle}
                      </h4>
                    </div>

                    {/* View Switcher Bar (Main Table, Gantt, Kanban, +) */}
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 border-b border-slate-150 dark:border-white/10 pt-2">
                      <button
                        onClick={() => setActiveView('table')}
                        className={`pb-2 flex items-center gap-1.5 transition-colors relative cursor-pointer ${
                          activeView === 'table' ? 'text-[#0073EA] dark:text-[#38BDF8] font-semibold' : 'hover:text-slate-800 dark:hover:text-white'
                        }`}
                      >
                        <Table2 className="w-3.5 h-3.5" />
                        <span>Main table</span>
                        {activeView === 'table' && (
                          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#0073EA] dark:bg-[#38BDF8] rounded-full" />
                        )}
                      </button>

                      <button
                        onClick={() => setActiveView('gantt')}
                        className={`pb-2 flex items-center gap-1.5 transition-colors relative cursor-pointer ${
                          activeView === 'gantt' ? 'text-[#0073EA] dark:text-[#38BDF8] font-semibold' : 'hover:text-slate-800 dark:hover:text-white'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Gantt</span>
                        {activeView === 'gantt' && (
                          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#0073EA] dark:bg-[#38BDF8] rounded-full" />
                        )}
                      </button>

                      <button
                        onClick={() => setActiveView('kanban')}
                        className={`pb-2 flex items-center gap-1.5 transition-colors relative cursor-pointer ${
                          activeView === 'kanban' ? 'text-[#0073EA] dark:text-[#38BDF8] font-semibold' : 'hover:text-slate-800 dark:hover:text-white'
                        }`}
                      >
                        <Kanban className="w-3.5 h-3.5" />
                        <span>Kanban</span>
                        {activeView === 'kanban' && (
                          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#0073EA] dark:bg-[#38BDF8] rounded-full" />
                        )}
                      </button>

                      <button className="pb-2 text-slate-400 hover:text-slate-700 cursor-pointer">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Table Content Area with Left Blue Indicator Line */}
                  <div className="flex-1 flex overflow-x-auto">
                    {/* Tiny Left Vertical Icon Rail (Matching reference) */}
                    <div className="w-10 py-4 flex flex-col items-center gap-4 border-r border-slate-100 dark:border-white/10 text-slate-400 shrink-0">
                      <Home className="w-3.5 h-3.5 hover:text-slate-700 cursor-pointer" />
                      <Table2 className="w-3.5 h-3.5 text-indigo-600 cursor-pointer" />
                      <Heart className="w-3.5 h-3.5 hover:text-slate-700 cursor-pointer" />
                      <Bell className="w-3.5 h-3.5 hover:text-slate-700 cursor-pointer" />
                      <Volume2 className="w-3.5 h-3.5 hover:text-slate-700 cursor-pointer" />
                      <div className="mt-auto">
                        <MoreHorizontal className="w-3.5 h-3.5 hover:text-slate-700 cursor-pointer" />
                      </div>
                    </div>

                    {/* Table Rows & Columns */}
                    <div className="flex-1 flex flex-col min-w-[320px]">
                      {/* Column Headers */}
                      <div className="grid grid-cols-12 text-[11px] font-semibold text-slate-500 dark:text-slate-300 border-b border-slate-100 dark:border-white/10 py-2.5 px-3 bg-slate-50/50 dark:bg-white/5">
                        <div className="col-span-6 flex items-center gap-1.5 text-[#0073EA] dark:text-[#38BDF8] font-medium">
                          <span>Deliverables</span>
                        </div>
                        <div className="col-span-3">Status</div>
                        <div className="col-span-3 text-right">Escrow</div>
                      </div>

                      {/* Interactive Rows with Left Blue Border Accent */}
                      <div className="flex-1 flex flex-col divide-y divide-slate-100 dark:divide-white/10 relative">
                        {/* Blue Left Vertical Accent Bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0073EA] dark:bg-[#38BDF8]" />

                        {activeCategory.tableRows.map((row, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-12 items-center py-2.5 px-3 hover:bg-slate-50/80 transition-colors pl-3.5 group text-left"
                          >
                            {/* Deliverable Title & Tag */}
                            <div className="col-span-6 pr-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                  {row.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 rounded">
                                  {row.tag}
                                </span>
                                <span className="text-[10px] text-slate-400">·</span>
                                <span className="text-[10px] text-slate-400 dark:text-slate-400 truncate">{row.assignee}</span>
                              </div>
                            </div>

                            {/* Status Pill */}
                            <div className="col-span-3">
                              <span
                                className={`inline-block px-2.5 py-1 rounded text-[10.5px] font-medium leading-none text-center shadow-2xs ${row.statusBg}`}
                              >
                                {row.statusText}
                              </span>
                            </div>

                            {/* Escrow Value */}
                            <div className="col-span-3 text-right">
                              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 font-mono">
                                {row.escrow}
                              </span>
                            </div>
                          </div>
                        ))}

                        {/* Faded Ghost Row to match modern UI mockup */}
                        <div className="grid grid-cols-12 items-center py-2.5 px-3 pl-3.5 opacity-40">
                          <div className="col-span-6">
                            <div className="h-3 w-32 bg-slate-200 dark:bg-white/10 rounded-sm animate-pulse" />
                          </div>
                          <div className="col-span-3">
                            <div className="h-4 w-16 bg-slate-200 dark:bg-white/10 rounded-sm" />
                          </div>
                          <div className="col-span-3 text-right">
                            <div className="h-3 w-10 bg-slate-200 dark:bg-white/10 rounded-sm ml-auto" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────
                    Right Pane: Floating Doer Collaboration & Live Execution
                   ───────────────────────────────────────────────────── */}
                <div className="w-full md:w-[320px] lg:w-[340px] bg-[#FBFBFC] dark:bg-[#0E0E11] p-4 sm:p-5 flex flex-col justify-between shrink-0 dark:border-l dark:border-white/10">
                  <div>
                    {/* Doer Top Profile Header */}
                    <div className="flex items-center gap-3 pb-3.5 border-b border-slate-200 dark:border-white/10 dark:border-white/10">
                      <div className="relative">
                        <img
                          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                          src={activeCategory.doerAvatar}
                          alt={activeCategory.doerName}
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                      </div>

                      <div className="flex-1 min-w-0 text-left">
                        <h5 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {activeCategory.doerName}
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{activeCategory.doerMetric}</p>
                      </div>
                    </div>

                    {/* Chat Bubble Thread */}
                    <div className="mt-4 space-y-3.5 text-left">
                      {/* User Request Bubble (Light Sky Blue matching screenshot) */}
                      <div className="flex items-end justify-end gap-2">
                        <div className="bg-[#DCEFFE] dark:bg-[#18202F] text-slate-900 dark:text-slate-100 dark:text-slate-100 rounded-2xl rounded-tr-xs p-3 text-xs font-normal leading-relaxed shadow-2xs max-w-[85%]">
                          {activeCategory.userPrompt}
                        </div>
                        <img
                          className="w-6 h-6 rounded-full object-cover shrink-0 border border-white shadow-2xs"
                          src={activeCategory.userAvatar}
                          alt="User"
                        />
                      </div>

                      {/* Doer Response & Live Action Badge */}
                      <div className="flex items-start gap-2 pt-1">
                        <img
                          className="w-6 h-6 rounded-full object-cover shrink-0 border border-white shadow-2xs mt-1"
                          src={activeCategory.doerAvatar}
                          alt="Doer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                            <span>{activeCategory.doerStatus}</span>
                            <span className="flex h-1.5 w-1.5 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-600" />
                            </span>
                          </p>

                          {/* Execution Step Chip (LinkedIn / Vercel / Figma style badge) */}
                          <div className="inline-flex items-center gap-1.5 bg-white dark:bg-[#0B0B0D] border border-slate-200 dark:border-white/10/90 rounded-xl px-2.5 py-1.5 text-[11px] font-medium text-slate-800 dark:text-slate-200 shadow-xs max-w-full">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: activeCategory.doerActionIconColor }}
                            />
                            <span className="truncate">{activeCategory.doerActionText}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Prompt Trigger Box at Bottom */}
                  <div className="mt-6 pt-3 border-t border-slate-200 dark:border-white/10/70">
                    <div className="bg-white dark:bg-[#0B0B0D] rounded-xl border border-slate-200 dark:border-white/10 p-1.5 pl-3 flex items-center justify-between shadow-2xs">
                      <span className="text-[11px] text-slate-400 truncate">
                        Ask doer for a custom quote...
                      </span>
                      <button
                        onClick={() => handleAuthAndNavigate('/dashboard')}
                        className="bg-[#5452F6] hover:bg-[#4338CA] text-white p-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                        title="Send task specification"
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
