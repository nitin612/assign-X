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
  Layers
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useApp } from '../../context/AppContext';
import { Tabs } from '../ui/tabs';

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
    tabLabel: '+ Post any task',
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
  const { navigate } = useNavigation();
  const { login } = useApp();
  const [activeView, setActiveView] = useState<'table' | 'gantt' | 'kanban'>('table');

  const handleAuthAndNavigate = (targetPath: string = '/dashboard') => {
    login();
    navigate(targetPath);
  };

  // Convert categories into Aceternity Tabs format with 3D stacked cards
  const tabItems = CATEGORIES.map((category) => ({
    title: category.tabLabel,
    value: category.id,
    content: (
      <div className="w-full h-full min-h-[460px] lg:min-h-[440px] bg-gradient-to-b from-white via-white to-slate-50/90 dark:from-[#0E0E12] dark:via-[#0E0E12] dark:to-[#09090C] border border-slate-200/90 dark:border-white/12 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.2),0_12px_24px_-6px_rgba(15,23,42,0.12),0_0_1px_1px_rgba(15,23,42,0.08)] dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85),0_0_1px_1px_rgba(255,255,255,0.1)] ring-1 ring-slate-900/5 dark:ring-white/5 relative overflow-hidden backdrop-blur-2xl flex flex-col justify-between">
        {/* Subtle Ambient Card Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EE6B50]/15 dark:bg-[#EE6B50]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center h-full">
          {/* Left Column: Heading, Description & CTA */}
          <div className="lg:col-span-5 text-left flex flex-col items-start justify-center pr-0 lg:pr-2">
            <h3 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-slate-950 dark:text-white tracking-tight leading-tight">
              {category.headingPrefix}{' '}
              <span className="text-[#EE6B50] dark:text-[#FA795C] font-bold">{category.highlightWord}</span>
            </h3>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {category.description}
            </p>

            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => handleAuthAndNavigate('/dashboard')}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-b from-[#FA795C] to-[#D95236] hover:brightness-105 active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

          {/* Right Column: High-Fidelity Interactive Dashboard Mockup */}
          <div className="lg:col-span-7 w-full h-full flex flex-col justify-center">
            {/* Outer Frame */}
            <div className="bg-[#ECEEF2] dark:bg-[#18181F]/90 rounded-2xl p-2.5 sm:p-3.5 border border-slate-300/80 dark:border-white/10 shadow-inner">
              {/* Inner Dashboard Card */}
              <div className="bg-white dark:bg-[#101015] rounded-xl border border-slate-200/90 dark:border-white/10 shadow-md shadow-slate-300/50 dark:shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[340px] sm:min-h-[360px]">

                {/* ─────────────────────────────────────────────────────
                    Left Pane: Workspace Table (60% width)
                   ───────────────────────────────────────────────────── */}
                <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 min-w-0 bg-white dark:bg-[#101015]">

                  {/* Top Workspace Header & Views Bar */}
                  <div className="p-3.5 sm:p-4 pb-0 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5">
                      {/* Left Multi-color mini 4-square App icon */}
                      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-400 p-0.5 shadow-2xs flex items-center justify-center shrink-0">
                        <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                          <div className="bg-white dark:bg-[#101015] rounded-[1px]" />
                          <div className="bg-white dark:bg-[#101015] rounded-[1px]" />
                          <div className="bg-white dark:bg-[#101015] rounded-[1px]" />
                          <div className="bg-white dark:bg-[#101015] rounded-[1px]" />
                        </div>
                      </div>

                      {/* Board Name */}
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white tracking-tight truncate">
                        {category.projectTitle}
                      </h4>
                    </div>

                    {/* View Switcher Bar (Main Table, Gantt, Kanban, +) */}
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 border-b border-slate-150 dark:border-white/10 pt-1.5">
                      <button
                        onClick={() => setActiveView('table')}
                        className={`pb-2 flex items-center gap-1 transition-colors relative cursor-pointer text-[11px] sm:text-xs ${activeView === 'table' ? 'text-[#EE6B50] dark:text-[#FA795C] font-semibold' : 'hover:text-slate-900 dark:hover:text-white'
                          }`}
                      >
                        <Table2 className="w-3.5 h-3.5" />
                        <span>Main table</span>
                        {activeView === 'table' && (
                          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#EE6B50] dark:bg-[#FA795C] rounded-full" />
                        )}
                      </button>

                      <button
                        onClick={() => setActiveView('gantt')}
                        className={`pb-2 flex items-center gap-1 transition-colors relative cursor-pointer text-[11px] sm:text-xs ${activeView === 'gantt' ? 'text-[#EE6B50] dark:text-[#FA795C] font-semibold' : 'hover:text-slate-900 dark:hover:text-white'
                          }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Gantt</span>
                        {activeView === 'gantt' && (
                          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#EE6B50] dark:bg-[#FA795C] rounded-full" />
                        )}
                      </button>

                      <button
                        onClick={() => setActiveView('kanban')}
                        className={`pb-2 flex items-center gap-1 transition-colors relative cursor-pointer text-[11px] sm:text-xs ${activeView === 'kanban' ? 'text-[#EE6B50] dark:text-[#FA795C] font-semibold' : 'hover:text-slate-900 dark:hover:text-white'
                          }`}
                      >
                        <Kanban className="w-3.5 h-3.5" />
                        <span>Kanban</span>
                        {activeView === 'kanban' && (
                          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#EE6B50] dark:bg-[#FA795C] rounded-full" />
                        )}
                      </button>

                      <button className="pb-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Table Content Area with Left Coral Indicator Line */}
                  <div className="flex-1 flex overflow-x-auto scrollbar-none">
                    {/* Tiny Left Vertical Icon Rail */}
                    <div className="hidden sm:flex w-7 py-3 flex-col items-center gap-3 border-r border-slate-100 dark:border-white/10 text-slate-400 dark:text-slate-500 shrink-0">
                      <Home className="w-3 h-3 hover:text-slate-800 dark:hover:text-white cursor-pointer" />
                      <Table2 className="w-3 h-3 text-[#EE6B50] cursor-pointer" />
                      <Heart className="w-3 h-3 hover:text-slate-800 dark:hover:text-white cursor-pointer" />
                      <Bell className="w-3 h-3 hover:text-slate-800 dark:hover:text-white cursor-pointer" />
                      <Volume2 className="w-3 h-3 hover:text-slate-800 dark:hover:text-white cursor-pointer" />
                      <div className="mt-auto">
                        <MoreHorizontal className="w-3 h-3 hover:text-slate-800 dark:hover:text-white cursor-pointer" />
                      </div>
                    </div>

                    {/* Table Rows & Columns */}
                    <div className="flex-1 flex flex-col w-full min-w-[240px] sm:min-w-[280px]">
                      {/* Column Headers */}
                      <div className="grid grid-cols-12 text-[10px] font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/10 py-1.5 px-2 bg-slate-50/70 dark:bg-white/5">
                        <div className="col-span-6 flex items-center gap-1 text-[#EE6B50] dark:text-[#FA795C] font-medium">
                          <span>Deliverables</span>
                        </div>
                        <div className="col-span-3">Status</div>
                        <div className="col-span-3 text-right">Escrow</div>
                      </div>

                      {/* Interactive Rows with Left Coral Border Accent */}
                      <div className="flex-1 flex flex-col divide-y divide-slate-100 dark:divide-white/10 relative">
                        {/* Coral Left Vertical Accent Bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FA795C] to-[#D95236]" />

                        {category.tableRows.map((row, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-12 items-center py-2 px-2 hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors pl-2.5 group text-left"
                          >
                            {/* Deliverable Title & Tag */}
                            <div className="col-span-6 pr-1">
                              <div className="flex items-center gap-1">
                                <span className="text-[11px] font-medium text-slate-900 dark:text-white truncate group-hover:text-[#EE6B50] dark:group-hover:text-[#FA795C] transition-colors">
                                  {row.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-[9px] px-1 py-0.2 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 rounded">
                                  {row.tag}
                                </span>
                                <span className="text-[9px] text-slate-400">·</span>
                                <span className="text-[9px] text-slate-500 dark:text-slate-400 truncate">{row.assignee}</span>
                              </div>
                            </div>

                            {/* Status Pill */}
                            <div className="col-span-3">
                              <span
                                className={`inline-block px-1.5 py-0.5 rounded text-[9.5px] font-medium leading-none text-center ${row.statusBg}`}
                              >
                                {row.statusText}
                              </span>
                            </div>

                            {/* Escrow Value */}
                            <div className="col-span-3 text-right">
                              <span className="text-[11px] font-semibold text-slate-900 dark:text-white font-mono">
                                {row.escrow}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────
                    Right Pane: Floating Doer Collaboration & Live Execution
                   ───────────────────────────────────────────────────── */}
                <div className="w-full md:w-[240px] lg:w-[260px] bg-[#FBFBFC] dark:bg-[#0A0A0E] p-3 flex flex-col justify-between shrink-0 border-t md:border-t-0 md:border-l border-slate-200 dark:border-white/10">
                  <div>
                    {/* Doer Top Profile Header */}
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/10">
                      <div className="relative">
                        <img
                          className="w-8 h-8 rounded-full object-cover border border-white dark:border-white/20 shadow-xs"
                          src={category.doerAvatar}
                          alt={category.doerName}
                        />
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white dark:border-[#0A0A0E] rounded-full" />
                      </div>

                      <div className="flex-1 min-w-0 text-left">
                        <h5 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {category.doerName}
                        </h5>
                        <p className="text-[9.5px] text-slate-500 dark:text-slate-400 truncate">{category.doerMetric}</p>
                      </div>
                    </div>

                    {/* Chat Bubble Thread */}
                    <div className="mt-2.5 space-y-2 text-left">
                      {/* User Request Bubble */}
                      <div className="flex items-end justify-end gap-1.5">
                        <div className="bg-[#FFE8E2] dark:bg-[#2A1815] text-slate-900 dark:text-orange-100 rounded-xl rounded-tr-xs p-2 text-[10.5px] font-normal leading-relaxed shadow-2xs max-w-[85%] border border-[#FA795C]/20">
                          {category.userPrompt}
                        </div>
                        <img
                          className="w-4 h-4 rounded-full object-cover shrink-0 border border-white dark:border-white/20 shadow-2xs"
                          src={category.userAvatar}
                          alt="User"
                        />
                      </div>

                      {/* Doer Response & Live Action Badge */}
                      <div className="flex items-start gap-1.5 pt-0.5">
                        <img
                          className="w-4 h-4 rounded-full object-cover shrink-0 border border-white dark:border-white/20 shadow-2xs mt-0.5"
                          src={category.doerAvatar}
                          alt="Doer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[9.5px] font-medium text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
                            <span>{category.doerStatus}</span>
                            <span className="flex h-1.5 w-1.5 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA795C] opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#EE6B50]" />
                            </span>
                          </p>

                          {/* Execution Step Chip */}
                          <div className="inline-flex items-center gap-1 bg-white dark:bg-[#15151A] border border-slate-200 dark:border-white/10 rounded-lg px-2 py-0.5 text-[9.5px] font-medium text-slate-800 dark:text-slate-200 shadow-2xs max-w-full">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: category.doerActionIconColor }}
                            />
                            <span className="truncate">{category.doerActionText}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Prompt Trigger Box at Bottom */}
                  <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-white/10">
                    <div className="bg-white dark:bg-[#15151A] rounded-lg border border-slate-200 dark:border-white/10 p-1 pl-2 flex items-center justify-between shadow-2xs">
                      <span className="text-[9.5px] text-slate-400 truncate">
                        Ask doer for a custom quote...
                      </span>
                      <button
                        onClick={() => handleAuthAndNavigate('/dashboard')}
                        className="bg-gradient-to-b from-[#FA795C] to-[#D95236] hover:brightness-105 active:scale-95 text-white p-1 rounded-md text-xs font-medium transition-all cursor-pointer shadow-xs ml-1"
                        title="Send task specification"
                      >
                        <Send className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }));

  return (
    <section id="work-categories" className="py-12 sm:py-16 lg:py-20 bg-transparent w-full text-center relative">
      <div className="w-full max-w-[1340px] mx-auto px-3 sm:px-6 lg:px-8 relative">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-semibold text-slate-950 dark:text-white tracking-tight leading-tight max-w-[760px] mx-auto text-center">
            Get more done with doers
          </h2>
          <p className="mt-2 sm:mt-4 text-xs sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-[560px] mx-auto leading-relaxed font-normal px-2">
            Turn tasks into completed milestones — from web development and mobile apps to AI workflows and design.
          </p>
        </div>

        {/* Ambient Glow Backdrop Behind 3D Card Stack */}
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-5xl h-[420px] bg-gradient-to-r from-orange-500/12 via-rose-500/8 to-indigo-500/12 rounded-[40px] blur-3xl pointer-events-none -z-10" />

        {/* Aceternity 3D Stacked Tabs Showcase */}
        <div className="h-[800px] sm:h-[700px] lg:h-[560px] [perspective:1000px] relative flex flex-col max-w-6xl mx-auto w-full items-center justify-start">
          <Tabs
            tabs={tabItems}
            containerClassName="justify-center gap-1.5 sm:gap-2 p-1 bg-[#F1F3F6]/90 dark:bg-[#0D0D0E] rounded-full border border-slate-200/90 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-none max-w-fit mx-auto"
            tabClassName="px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
            activeTabClassName="bg-[#FEF3F0] dark:bg-[#2A1713] border-2 border-[#EE6B50] dark:border-[#FA795C] shadow-xs"
            contentClassName="mt-12 sm:mt-16 lg:mt-20"
          />
        </div>
      </div>
    </section>
  );
};
