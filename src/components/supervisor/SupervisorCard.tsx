import type { Supervisor } from '../../types';
import { MessageSquare, Star, CheckCircle2 } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface SupervisorCardProps {
  supervisor: Supervisor;
  projectId?: string;
  compact?: boolean;
}

export const SupervisorCard: React.FC<SupervisorCardProps> = ({
  supervisor,
  projectId,
  compact = false
}) => {
  const { navigate } = useNavigation();

  const handleMessage = () => {
    if (projectId) {
      navigate(`/messages?project=${projectId}`);
    } else {
      navigate('/messages');
    }
  };

  if (compact) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <img
          src={supervisor.avatar}
          alt={supervisor.name}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '9999px',
            objectFit: 'cover',
            border: '1px solid var(--border-default)'
          }}
        />
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
            {supervisor.name}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Supervisor
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 'var(--space-5)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={supervisor.avatar}
            alt={supervisor.name}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '9999px',
              objectFit: 'cover',
              border: '2px solid var(--bg-surface)',
              boxShadow: 'var(--shadow-subtle)'
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: 1,
              right: 1,
              width: '10px',
              height: '10px',
              borderRadius: '9999px',
              backgroundColor: supervisor.status === 'Available' ? '#10B981' : '#F59E0B',
              border: '2px solid var(--bg-surface)'
            }}
            title={supervisor.status}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {supervisor.name}
            </h3>
            <span
              style={{
                fontSize: '11px',
                color: '#2563EB',
                backgroundColor: '#EFF6FF',
                padding: '1px 6px',
                borderRadius: '4px',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <CheckCircle2 size={11} /> Lead
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            {supervisor.specialization}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 500, color: '#B45309' }}>
              <Star size={13} fill="#F59E0B" color="#F59E0B" /> {supervisor.rating}
            </span>
            <span>•</span>
            <span>{supervisor.reviewsCount} completed jobs</span>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 12px',
          marginBottom: 'var(--space-4)',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          lineHeight: 1.4
        }}
      >
        <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Point of Accountability: </span>
        {supervisor.responseTime}. Oversees team delivery, milestone gates, and quality verification.
      </div>

      <button
        className="btn btn-secondary"
        style={{ width: '100%', justifyContent: 'center' }}
        onClick={handleMessage}
      >
        <MessageSquare size={15} /> Message Supervisor
      </button>

      <div
        style={{
          marginTop: '10px',
          fontSize: '11px',
          textAlign: 'center',
          color: 'var(--text-tertiary)'
        }}
      >
        Your main point of contact for this project.
      </div>
    </div>
  );
};
