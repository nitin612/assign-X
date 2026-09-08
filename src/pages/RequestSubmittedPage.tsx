/* Calm & Reassuring Request Submitted Confirmation Page */
import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileSearch,
  UserCheck,
  CalendarCheck,
  PlayCircle
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const RequestSubmittedPage: React.FC = () => {
  const { currentRoute, navigate } = useNavigation();
  const { projects } = useApp();

  const requestId = currentRoute.params.requestId || 'proj-1';
  const project = projects.find(p => p.id === requestId) || projects[0];

  const steps = [
    {
      num: 1,
      title: 'Requirement review',
      desc: 'Our domain leads review scope complexity and requirements.',
      status: 'active',
      icon: FileSearch
    },
    {
      num: 2,
      title: 'Supervisor assignment',
      desc: `${project.supervisor.name} has been appointed as your single accountable lead.`,
      status: 'active',
      icon: UserCheck
    },
    {
      num: 3,
      title: 'Project plan and estimate',
      desc: 'Milestones, sprint architecture, and deliverables are structured.',
      status: 'upcoming',
      icon: CalendarCheck
    },
    {
      num: 4,
      title: 'Work begins',
      desc: 'Supervised execution starts upon your milestone sign-off.',
      status: 'upcoming',
      icon: PlayCircle
    }
  ];

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'var(--space-6) 0 var(--space-12)' }}>
      {/* Subtle reassurance icon */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '9999px',
          backgroundColor: 'var(--status-success-bg)',
          color: 'var(--status-success-text)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-4)',
          border: '1px solid var(--status-success-border)'
        }}
      >
        <CheckCircle2 size={28} />
      </div>

      <h1 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
        Your request is with us.
      </h1>

      <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-6)' }}>
        AssignX will review your requirement and assign the right supervisor to manage the work from start to finish.
      </p>

      {/* Summary Card */}
      <div
        className="card"
        style={{
          padding: 'var(--space-5)',
          marginBottom: 'var(--space-8)',
          backgroundColor: 'var(--bg-surface)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '14px',
            fontSize: '13px'
          }}
        >
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
              Request ID
            </span>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {project.id}
            </div>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
              Submitted Date
            </span>
            <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
              Today
            </div>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
              Current Status
            </span>
            <div style={{ marginTop: '2px' }}>
              <StatusBadge status="Under Review" size="sm" />
            </div>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
              Assigned Supervisor
            </span>
            <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
              {project.supervisor.name}
            </div>
          </div>
        </div>
      </div>

      {/* What Happens Next Section */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
          What happens next
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {steps.map((s) => {
            const Icon = s.icon;
            const isCompleted = s.status === 'active';

            return (
              <div
                key={s.num}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-4)',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isCompleted ? 'var(--bg-surface)' : 'var(--bg-canvas)',
                  border: `1px solid ${isCompleted ? 'var(--border-default)' : 'var(--border-subtle)'}`
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '9999px',
                    backgroundColor: isCompleted ? 'var(--brand-subtle)' : 'var(--bg-subtle)',
                    color: isCompleted ? 'var(--brand-primary)' : 'var(--text-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '13px',
                    flexShrink: 0
                  }}
                >
                  <Icon size={16} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {s.num}. {s.title}
                    </span>
                    {s.num === 1 && (
                      <span style={{ fontSize: '11px', color: '#059669', backgroundColor: '#ECFDF5', padding: '1px 6px', borderRadius: '4px' }}>
                        In Progress
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Escrow Guarantee Pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          marginBottom: 'var(--space-8)',
          fontSize: '13px',
          color: 'var(--text-secondary)'
        }}
      >
        <ShieldCheck size={18} color="#2563EB" style={{ flexShrink: 0 }} />
        <div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Managed Guarantee: </span>
          AssignX takes full accountability for worker coordination, milestone accuracy, and delivery deadlines.
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate(`/work/${project.id}`)}
        >
          <span>View Work Workspace</span>
          <ArrowRight size={16} />
        </button>

        <button
          className="btn btn-secondary btn-lg"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};
