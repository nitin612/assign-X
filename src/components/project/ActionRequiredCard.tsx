/* Action Required Card Component */
import React from 'react';
import { AlertCircle, Clock, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface ActionRequiredCardProps {
  projectId: string;
  projectTitle: string;
  actionTitle: string;
  actionDescription: string;
  actionType: 'approve' | 'review' | 'pay' | 'info';
  deadline?: string;
  onActionClick?: () => void;
}

export const ActionRequiredCard: React.FC<ActionRequiredCardProps> = ({
  projectId,
  projectTitle,
  actionTitle,
  actionDescription,
  actionType,
  deadline,
  onActionClick
}) => {
  const { navigate } = useNavigation();

  const getActionLabel = () => {
    switch (actionType) {
      case 'approve': return 'Approve Milestone';
      case 'pay': return 'Pay Now';
      case 'review': return 'Review Work';
      case 'info': return 'Provide Information';
      default: return 'Take Action';
    }
  };

  const handleClick = () => {
    if (onActionClick) {
      onActionClick();
    } else {
      navigate(`/work/${projectId}`);
    }
  };

  return (
    <div className="action-required-card">
      <div className="action-required-left">
        <div className="action-required-icon">
          <AlertCircle size={18} />
        </div>
        <div className="action-required-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-subtle)',
                padding: '2px 8px',
                borderRadius: '6px'
              }}
            >
              {projectTitle}
            </span>
            {deadline && (
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Clock size={11} /> Deadline: {deadline}
              </span>
            )}
          </div>
          <h4>{actionTitle}</h4>
          <p>{actionDescription}</p>
        </div>
      </div>

      <button
        className="btn btn-primary btn-sm"
        style={{
          marginLeft: 'var(--space-4)',
          flexShrink: 0
        }}
        onClick={handleClick}
      >
        <span>{getActionLabel()}</span>
        <ArrowRight size={13} />
      </button>
    </div>
  );
};
