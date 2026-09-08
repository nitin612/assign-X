import type { Project } from '../../../types';
import { FileCheck, MessageSquare, CreditCard, Briefcase, Clock } from 'lucide-react';

interface ActivityTabProps {
  project: Project;
}

export const ActivityTab: React.FC<ActivityTabProps> = ({ project }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'deliverable': return <FileCheck size={14} color="#2563EB" />;
      case 'comment': return <MessageSquare size={14} color="#64748B" />;
      case 'payment': return <CreditCard size={14} color="#059669" />;
      case 'supervisor': return <Briefcase size={14} color="#7C3AED" />;
      default: return <Clock size={14} color="#94A3B8" />;
    }
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Project Activity & Audit Trail
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Chronological record of all milestone submissions, sign-offs, feedback exchanges, and payments.
        </p>
      </div>

      <div className="card" style={{ padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {project.activities.map((act, index) => (
            <div
              key={act.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                position: 'relative'
              }}
            >
              {index !== project.activities.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: '15px',
                    top: '32px',
                    bottom: '-20px',
                    width: '1px',
                    backgroundColor: 'var(--border-subtle)'
                  }}
                />
              )}

              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  zIndex: 1,
                  border: '1px solid var(--border-default)'
                }}
              >
                {getActivityIcon(act.type)}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {act.title}
                  </h4>
                  <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', flexShrink: 0 }}>
                    {act.timestamp}
                  </span>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.5 }}>
                  {act.description}
                </p>

                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Logged by: {act.author} {act.authorRole ? `(${act.authorRole})` : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
