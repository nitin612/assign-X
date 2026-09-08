import type { Project } from '../../../types';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { useApp } from '../../../context/AppContext';
import {
  CreditCard,
  FileCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface MilestonesTabProps {
  project: Project;
  onSelectTab: (tab: string) => void;
}

export const MilestonesTab: React.FC<MilestonesTabProps> = ({ project, onSelectTab }) => {
  const { openModal } = useApp();

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Project Milestones & Billing Gates
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Funds are held securely. You approve deliverables before any milestone payment is released to the team.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {project.milestones.map((milestone, idx) => {
          const isSubmitted = milestone.status === 'Submitted';
          const isPaid = milestone.status === 'Paid';
          const isActionRequired = !!milestone.actionRequired || isSubmitted;

          return (
            <div
              key={milestone.id}
              className="card"
              style={{
                padding: 'var(--space-5)',
                border: isActionRequired
                  ? '1.5px solid #FCD34D'
                  : '1px solid var(--border-default)',
                backgroundColor: isActionRequired ? '#FFFDF8' : 'var(--bg-surface)',
                boxShadow: isActionRequired ? '0 2px 8px rgba(245, 158, 11, 0.08)' : 'var(--shadow-subtle)'
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: 'var(--space-3)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                      Milestone {idx + 1}
                    </span>
                    <span style={{ color: 'var(--border-strong)' }}>•</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Due {milestone.dueDate}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {milestone.name}
                  </h4>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    ₹{milestone.amount.toLocaleString('en-IN')}
                  </span>
                  <StatusBadge status={milestone.status} size="sm" />
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
                {milestone.description}
              </p>

              {/* Deliverables Link / Count */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                  paddingTop: 'var(--space-3)',
                  borderTop: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <FileCheck size={14} color="var(--brand-primary)" />
                  <span>
                    {milestone.deliverablesCount > 0
                      ? `${milestone.deliverablesCount} deliverables linked`
                      : 'No files submitted yet'}
                  </span>
                  {milestone.deliverablesCount > 0 && (
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: '11px', padding: '2px 6px', color: 'var(--brand-primary)' }}
                      onClick={() => onSelectTab('deliverables')}
                    >
                      View in Deliverables Tab
                    </button>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isSubmitted && (
                    <>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          openModal('request_changes', {
                            projectId: project.id,
                            milestoneId: milestone.id,
                            milestoneName: milestone.name
                          })
                        }
                      >
                        <AlertCircle size={13} />
                        <span>Request Changes</span>
                      </button>

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          openModal('approve_milestone', {
                            projectId: project.id,
                            milestoneId: milestone.id,
                            milestoneName: milestone.name,
                            amount: milestone.amount
                          })
                        }
                      >
                        <CheckCircle2 size={13} />
                        <span>Approve Milestone</span>
                      </button>
                    </>
                  )}

                  {milestone.status === 'Approved' && !isPaid && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        openModal('pay_milestone', {
                          projectId: project.id,
                          milestoneId: milestone.id,
                          milestoneName: milestone.name,
                          amount: milestone.amount
                        })
                      }
                    >
                      <CreditCard size={13} />
                      <span>Release Payment (₹{milestone.amount.toLocaleString('en-IN')})</span>
                    </button>
                  )}

                  {isPaid && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '12px',
                        color: '#059669',
                        fontWeight: 500
                      }}
                    >
                      <CheckCircle2 size={14} /> Paid & Released
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
