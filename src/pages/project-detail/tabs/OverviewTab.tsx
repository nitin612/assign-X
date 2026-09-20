import type { Project } from '../../../types';
import { SupervisorCard } from '../../../components/supervisor/SupervisorCard';
import { ActionRequiredCard } from '../../../components/project/ActionRequiredCard';
import { useApp } from '../../../context/AppContext';
import {
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Layers,
  Sparkles,
  Calendar
} from 'lucide-react';

interface OverviewTabProps {
  project: Project;
  onSelectTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ project, onSelectTab }) => {
  const { openModal } = useApp();

  const completedMilestones = project.milestones.filter(
    m => m.status === 'Approved' || m.status === 'Paid'
  );

  const activeMilestone = project.milestones.find(
    m => m.status === 'Submitted' || m.status === 'In Progress'
  ) || project.milestones[0];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(310px, 1fr)',
        gap: 'var(--space-6)',
        alignItems: 'flex-start'
      }}
    >
      {/* Left Column: Sprint Execution, Scope, Activity */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', minWidth: 0 }}>
        {/* Action Required Callout Banner (If Pending Action) */}
        {project.nextAction && (
          <ActionRequiredCard
            projectId={project.id}
            projectTitle={project.title}
            actionTitle={project.nextAction.title}
            actionDescription={project.nextAction.description}
            actionType={project.nextAction.type}
            deadline={project.nextAction.deadline}
            onActionClick={() => {
              if (project.nextAction?.type === 'approve' && project.nextAction.milestoneId) {
                openModal('approve_milestone', {
                  projectId: project.id,
                  milestoneId: project.nextAction.milestoneId,
                  milestoneName: project.currentMilestone,
                  amount: project.milestones.find(m => m.id === project.nextAction?.milestoneId)?.amount
                });
              } else {
                onSelectTab('milestones');
              }
            }}
          />
        )}

        {/* Active Phase & Milestone Sprint Card */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Current Operational Phase
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/80">
                  ● Active Sprint
                </span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {project.currentPhase}
              </h3>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => onSelectTab('milestones')}
              style={{ color: 'var(--text-secondary)', gap: '4px', paddingRight: 0 }}
            >
              <span>Roadmap Details</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Active Target Milestone Box */}
          {activeMilestone && (
            <div className="bg-slate-50 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 mb-3.5 shadow-2xs">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="var(--brand-primary)" />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Active Milestone Goal
                  </span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> Target: {activeMilestone.dueDate}
                </span>
              </div>

              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {activeMilestone.name}
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.45 }}>
                {activeMilestone.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>
                  Milestone Gate Allocation: <strong style={{ color: 'var(--text-primary)' }}>₹{activeMilestone.amount.toLocaleString('en-IN')}</strong>
                </span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {activeMilestone.deliverablesCount} Deliverables in review
                </span>
              </div>
            </div>
          )}

          {/* Milestone Step Progress Tracker */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px', marginTop: '12px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              Milestone Gates: <strong>{completedMilestones.length} of {project.milestones.length} Approved</strong>
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              Released: <strong style={{ color: '#047857' }}>₹{project.paidAmount.toLocaleString('en-IN')}</strong> / ₹{project.budget.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Segmented Visual Track */}
          <div style={{ display: 'flex', gap: '5px', height: '5px', borderRadius: '4px', overflow: 'hidden', margin: '8px 0 12px' }}>
            {project.milestones.map((m, idx) => {
              const isDone = m.status === 'Approved' || m.status === 'Paid';
              const isActive = m.id === activeMilestone?.id;
              return (
                <div
                  key={m.id || idx}
                  style={{
                    flex: 1,
                    backgroundColor: isDone ? '#10B981' : isActive ? 'var(--brand-primary)' : 'var(--border-default)',
                    borderRadius: '2px'
                  }}
                  title={`${m.name}: ${m.status}`}
                />
              );
            })}
          </div>

          <div className="milestone-stepper">
            {project.milestones.map((m, idx) => {
              const isDone = m.status === 'Approved' || m.status === 'Paid';
              const isActive = m.id === activeMilestone?.id;
              return (
                <div
                  key={m.id}
                  className={`milestone-step-item ${isDone ? 'completed' : isActive ? 'active' : 'upcoming'}`}
                  title={`${m.name} - ₹${m.amount.toLocaleString('en-IN')}`}
                  style={{ minWidth: 0 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 800, fontSize: '10.5px' }}>M{idx + 1}</span>
                    <span
                      className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                          : isActive
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                          : 'bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700'
                      }`}
                    >
                      {isDone ? '✓ Paid' : isActive ? '● Active' : 'Pending'}
                    </span>
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%',
                      fontSize: '12px'
                    }}
                  >
                    {m.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    ₹{m.amount.toLocaleString('en-IN')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Work Scope & Core Objectives Card */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
            <Layers size={16} color="var(--color-blue)" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Work Scope & Objectives
            </h3>
          </div>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="scope-tag-pill">✦ Responsive Dining Experience</span>
            <span className="scope-tag-pill">✦ Interactive Menu & Dietary Filters</span>
            <span className="scope-tag-pill">✦ Real-time Table Reservation Engine</span>
            <span className="scope-tag-pill">✦ Lighthouse 95+ Performance Target</span>
          </div>
        </div>

        {/* Recent Updates from Supervisor */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Latest Sprint Activity
            </h3>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => onSelectTab('activity')}
              style={{ color: 'var(--text-secondary)', paddingRight: 0 }}
            >
              Full Log
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {project.activities.slice(0, 3).map(act => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontSize: '13px'
                }}
              >
                <div className="w-7 h-7 rounded-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-900/60 flex items-center justify-center shrink-0 mt-0.5">
                  <FileCheck size={14} className="text-[#EE6B50] dark:text-orange-400" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{act.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px', marginTop: '1px', lineHeight: 1.4 }}>
                    {act.description}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '3px' }}>
                    {act.author} • {act.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Supervisor Card, Project Specs, Escrow Protection */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {/* Supervisor Card */}
        <SupervisorCard supervisor={project.supervisor} projectId={project.id} />

        {/* Project Meta & Escrow Card */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Project Specifications
            </h4>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-2 py-0.5 rounded-full">
              Escrow Active
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Category</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{project.category}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Start Date</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{project.startDate}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Target Delivery</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{project.deadline}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Contract Budget</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                ₹{project.budget.toLocaleString('en-IN')}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Released to Date</span>
              <span style={{ fontWeight: 700, color: '#059669', fontFamily: 'var(--font-heading)' }}>
                ₹{project.paidAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Protected in Escrow</span>
              <span style={{ fontWeight: 700, color: '#EE6B50', fontFamily: 'var(--font-heading)' }}>
                ₹{(project.budget - project.paidAmount).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-orange-50/80 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-900/60 text-[11.5px] text-orange-900 dark:text-orange-200 flex items-start gap-2 leading-snug">
            <ShieldCheck size={16} className="text-[#EE6B50] dark:text-orange-400 shrink-0 mt-0.5" />
            <span>
              <strong>100% Escrow Guarantee:</strong> Funds remain securely in escrow until you verify and approve deliverables.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

