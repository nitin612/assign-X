/* Modern Project Card Component — Jira/Linear-inspired SaaS Card */
import React from 'react';
import type { Project } from '../../types';
import {
  CheckCircle2,
  CreditCard,
  AlertCircle,
  FileCheck,
  Globe,
  Smartphone,
  Palette,
  Sparkles,
  BarChart3,
  PlusCircle,
  ArrowRight,
  Layers
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { navigate } = useNavigation();

  const hasActionRequired = project.status === 'Awaiting Action' || Boolean(project.nextAction);

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Website Development':
        return {
          pill: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
          icon: <Globe size={11} className="mr-1" />
        };
      case 'Mobile App Development':
        return {
          pill: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
          icon: <Smartphone size={11} className="mr-1" />
        };
      case 'UI/UX Design':
        return {
          pill: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300',
          icon: <Palette size={11} className="mr-1" />
        };
      case 'Graphic Design':
        return {
          pill: 'bg-pink-50 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300',
          icon: <Sparkles size={11} className="mr-1" />
        };
      case 'Digital Marketing':
        return {
          pill: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
          icon: <BarChart3 size={11} className="mr-1" />
        };
      default:
        return {
          pill: 'bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300',
          icon: <Layers size={11} className="mr-1" />
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Progress':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            In Progress
          </span>
        );
      case 'Awaiting Action':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Awaiting Action
          </span>
        );
      case 'Under Review':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            Under Review
          </span>
        );
      case 'Completed':
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Completed
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
            {status}
          </span>
        );
    }
  };

  const catTheme = getCategoryTheme(project.category);

  return (
    <div
      className="bg-white dark:bg-[#121216] border border-stone-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between cursor-pointer group"
      onClick={() => navigate(`/work/${project.id}`)}
    >
      <div className="flex flex-col gap-3">
        {/* ── Top Header Row: Category Pill + Status + (+) Icon ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full ${catTheme.pill}`}>
              {catTheme.icon}
              {project.category}
            </span>
            {getStatusBadge(project.status)}
          </div>

          <button className="text-slate-300 hover:text-slate-500 dark:text-zinc-600 dark:hover:text-zinc-400 p-0.5 transition-colors">
            <PlusCircle size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Title & Progress Percentage ── */}
        <div className="flex items-start justify-between gap-2 mt-1">
          <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 shrink-0">
            {project.progress}% Done
          </span>
        </div>

        {/* ── Description ── */}
        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-2 font-normal">
          {project.description}
        </p>

        {/* ── Metadata Chips Row ── */}
        <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-500 dark:text-zinc-400 font-normal pt-0.5">
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-zinc-800/50 px-2 py-1 rounded-md">
            <CreditCard size={11} />
            <span>₹{project.budget ? project.budget.toLocaleString('en-IN') : 'Custom'}</span>
          </div>

          {project.deliverables && project.deliverables.length > 0 && (
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-zinc-800/50 px-2 py-1 rounded-md">
              <FileCheck size={11} />
              <span>{project.deliverables.length} Deliverables</span>
            </div>
          )}

          {project.milestones && project.milestones.length > 0 && (
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-zinc-800/50 px-2 py-1 rounded-md">
              <Layers size={11} />
              <span>{project.milestones.length} Milestones</span>
            </div>
          )}
        </div>

        {/* ── Action Required Callout Banner (if applicable) ── */}
        {hasActionRequired && project.nextAction && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-[11.5px] text-rose-800 dark:text-rose-300 font-medium">
            <AlertCircle size={13} className="text-rose-600 shrink-0" />
            <span className="truncate">
              Action: {project.nextAction.title}
            </span>
          </div>
        )}

        {/* ── Milestone Progress Track ── */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] font-normal">
            <span className="text-slate-500 dark:text-zinc-400 truncate">
              Next: <strong className="text-slate-800 dark:text-zinc-200 font-medium">{project.currentMilestone}</strong>
            </span>
            <span className="font-medium text-slate-800 dark:text-zinc-200 shrink-0">
              {project.progress}%
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(Math.max(project.progress, 4), 100)}%`,
                backgroundColor:
                  project.progress === 100
                    ? '#22C55E'
                    : project.progress > 50
                    ? '#3B82F6'
                    : '#F59E0B'
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Card Footer: Supervisor Capsule + Action Button ── */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-zinc-800/60">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative flex items-center">
            <img
              src={project.supervisor.avatar}
              alt={project.supervisor.name}
              className="w-7 h-7 rounded-full object-cover border-2 border-white dark:border-zinc-900 shrink-0"
            />
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center -ml-2 border border-white dark:border-zinc-900">
              +2
            </div>
          </div>

          <div className="flex flex-col min-w-0 leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 truncate">
                {project.supervisor.name}
              </span>
              <CheckCircle2 size={11} className="text-blue-500 shrink-0" />
            </div>
            <span className="text-[10.5px] text-slate-400 dark:text-zinc-400 font-normal">
              Lead Supervisor
            </span>
          </div>
        </div>

        <button
          className="text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/work/${project.id}`);
          }}
        >
          <span>View Project</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
