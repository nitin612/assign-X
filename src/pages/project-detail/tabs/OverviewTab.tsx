import type { Project } from '../../../types';
import { SupervisorCard } from '../../../components/supervisor/SupervisorCard';
import { ProgressBar } from '../../../components/common/ProgressBar';
import { ActionRequiredCard } from '../../../components/project/ActionRequiredCard';
import { useApp } from '../../../context/AppContext';
import {
  ArrowRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

interface OverviewTabProps {
  project: Project;
  onSelectTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ project, onSelectTab }) => {
  const { openModal } = useApp();

  const nextMilestone = project.milestones.find(
    m => m.status === 'Submitted' || m.status === 'In Progress' || m.status === 'Upcoming'
  );

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(310px, 1fr)',
        gap: 'var(--space-8)',
        alignItems: 'flex-start'
      }}
    >
      {/* Left Column: Progress, Current Phase, Action, Updates */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Action Required Banner if exists */}
        {project.nextAction && (
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
              Action Required
            </h3>
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
          </div>
        )}

        {/* Current Phase & Milestone Status Card */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Current Operational Phase
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                {project.currentPhase}
              </h3>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => onSelectTab('progress')}
              style={{ color: 'var(--brand-primary)' }}
            >
              <span>View Timeline</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Overall Project Completion</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{project.progress}%</span>
            </div>
            <ProgressBar progress={project.progress} height={8} />
          </div>

          {nextMilestone && (
            <div
              style={{
                backgroundColor: 'var(--bg-canvas)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                border: '1px solid var(--border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Target Milestone:</span>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {nextMilestone.name}
                </div>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Target: {nextMilestone.dueDate}
              </span>
            </div>
          )}
        </div>

        {/* Scope Overview */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
            Work Scope & Deliverable Brief
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => onSelectTab('milestones')}>
              View {project.milestones.length} Milestones
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => onSelectTab('deliverables')}>
              View {project.deliverables.length} Deliverables
            </button>
          </div>
        </div>

        {/* Recent Updates from Supervisor */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Latest Project Updates
            </h3>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => onSelectTab('activity')}
              style={{ color: 'var(--brand-primary)' }}
            >
              Full Log
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {project.activities.slice(0, 3).map(act => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontSize: '13px'
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  <FileCheck size={13} color="var(--brand-primary)" />
                </div>
                <div>
                  <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{act.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{act.description}</div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '11px', marginTop: '2px' }}>
                    {act.author} • {act.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Supervisor Card, Project Specs, Quick Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Supervisor Card */}
        <SupervisorCard supervisor={project.supervisor} projectId={project.id} />

        {/* Project Meta Card */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
            Project Specifications
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Category</span>
              <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{project.category}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Start Date</span>
              <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{project.startDate}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Target Delivery</span>
              <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{project.deadline}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Budget</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                ₹{project.budget.toLocaleString('en-IN')}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Paid to Date</span>
              <span style={{ fontWeight: 600, color: '#059669' }}>
                ₹{project.paidAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Remaining in Escrow</span>
              <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>
                ₹{(project.budget - project.paidAmount).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Managed Service Assurance */}
        <div
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}
        >
          <ShieldCheck size={18} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>AssignX Managed Service:</strong> You never have to supervise workers or manage technical sprint bottlenecks. Your supervisor handles all coordination.
          </div>
        </div>
      </div>
    </div>
  );
};
