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
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '1px 8px',
                    borderRadius: '9999px',
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    border: '1px solid #FCD34D'
                  }}
                >
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
            <div
              style={{
                backgroundColor: '#F8F8FB',
                borderRadius: 'var(--radius-lg)',
                padding: '16px 18px',
                border: '1px solid #E5E5EB',
                marginBottom: '14px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="var(--color-coral)" />
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Active Milestone Goal
                  </span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> Target: {activeMilestone.dueDate}
                </span>
              </div>

              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {activeMilestone.name}
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.45 }}>
                {activeMilestone.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', borderTop: '1px solid #EDEDF3', paddingTop: '10px' }}>
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
              Released: <strong style={{ color: '#166534' }}>₹{project.paidAmount.toLocaleString('en-IN')}</strong> / ₹{project.budget.toLocaleString('en-IN')}
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
                    backgroundColor: isDone ? '#10B981' : isActive ? 'var(--color-coral)' : '#E2E8F0',
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
                      style={{
                        fontSize: '9.5px',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        backgroundColor: isDone ? '#DCFCE7' : isActive ? '#FEF3C7' : '#F1F5F9',
                        color: isDone ? '#166534' : isActive ? '#92400E' : '#64748B'
                      }}
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
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '9999px',
                    backgroundColor: '#F0F9FF',
                    border: '1px solid #BAE6FD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '1px'
                  }}
                >
                  <FileCheck size={14} color="#0284C7" />
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
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#166534', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '4px' }}>
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
              <span style={{ fontWeight: 700, color: '#2563EB', fontFamily: 'var(--font-heading)' }}>
                ₹{(project.budget - project.paidAmount).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: '16px',
              padding: '11px 13px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#F0F7FF',
              border: '1px solid #BFDBFE',
              fontSize: '11.5px',
              color: '#1E40AF',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              lineHeight: 1.4
            }}
          >
            <ShieldCheck size={16} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              <strong>100% Escrow Guarantee:</strong> Funds remain securely in escrow until you verify and approve deliverables.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

